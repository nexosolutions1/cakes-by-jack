declare const fetch: any;

// Server functions mapping the NEW Google Sheet to the UI types.
// Spreadsheet: 1NYQBaQ9JXnLxm6Gj9z6wqnagHBZadZRx3_VFCXKFCq0
// Tabs (única fonte da verdade):
//   Configuracoes  -> key/value (Campo|Valor)
//   Usuarios       -> ID Usuario | Nome | WhatsApp | Perfil | Status
//   Clientes       -> ID Cliente | Nome | WhatsApp | Endereco | Observacoes
//   Produtos       -> ID Produto | Categoria | Produto | Descricao | Preco | Imagem | Ativo
//   Pedidos        -> ID Pedido | Data Pedido | ID Cliente | Cliente | WhatsApp |
//                     Produto | Quantidade | Valor Unitario | Valor Total | Status |
//                     Data Entrega | Hora Entrega | Valor Entrada | Valor Pago |
//                     Saldo Restante | Situacao Financeira | Forma Pagamento | Observacoes
//   Pagamentos     -> ID Pagamento | ID Pedido | Data | Valor | Forma Pagamento | Observacao

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  appendRecord,
  findRow,
  getMetadata,
  getValues,
  readTable,
  setValues,
  updateRecord,
} from "./sheets.server";

const REQUIRED_TABS = [
  "Configuracoes",
  "Usuarios",
  "Clientes",
  "Produtos",
  "Pedidos",
  "Pagamentos",
] as const;

const newId = (prefix: string) =>
  `${prefix}-${Date.now().toString(36)}${Math.floor(Math.random() * 100)
    .toString(36)
    .padStart(2, "0")}`.toUpperCase();

const todayISO = () => new Date().toISOString().slice(0, 10);

function normalizePhone(v: string) {
  return (v ?? "").replace(/\D+/g, "");
}

const parseNum = (v: unknown) => {
  if (typeof v === "number") return Number.isFinite(v) ? v : 0;
  const s = String(v ?? "")
    .replace(/R\$\s?/gi, "")
    .replace(/\s+/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
};

const normalizeHeader = (v: string) =>
  String(v ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();

const get = (row: string[], headers: string[], col: string) => {
  const target = normalizeHeader(col);
  const i = headers.findIndex((h) => normalizeHeader(h) === target);
  return i < 0 ? "" : (row[i] ?? "");
};

// -------- Types (kept stable so existing routes don't break) --------
export type Cliente = {
  id: string;
  nome: string;
  telefone: string;
  whatsapp: string;
  endereco: string;
  cidade: string;
  bairro: string;
  observacoes: string;
  criadoEm: string;
};

export type Produto = {
  id: string;
  categoria: string;
  tipo: string;
  nome: string;
  unidade: string;
  preco: string;
  descricao: string;
  imagem: string;
  observacoes: string;
};

export type Pedido = {
  id: string;
  numero: string;
  clienteId: string;
  clienteNome: string;
  produto: string;
  quantidade: string;
  peso: string;
  valorTotal: string;
  entrada: string;
  saldo: string;
  formaPagamento: string;
  situacaoPagamento: string;
  dataPedido: string;
  dataEntrega: string;
  horaEntrega: string;
  status: string;
  observacoes: string;
};

export type Insumo = {
  id: string;
  nome: string;
  unidade: string;
  estoqueAtual: string;
  estoqueMinimo: string;
  valorUnitario: string;
  observacoes: string;
  ativo: string;
};

export type Ficha = {
  id: string;
  produtoId: string;
  produtoNome: string;
  ingredientes: string;
  custoTotal: string;
  precoVenda: string;
  lucroBruto: string;
  margem: string;
  observacoes: string;
  rendimento: string;
  ativo: string;
};

export type CustoAdicional = {
  idReceita: string;
  item: string;
  categoria: string;
  valor: string;
  observacoes: string;
};

export type Financeiro = {
  id: string;
  pedidoId: string;
  pedidoNumero: string;
  clienteNome: string;
  tipo: string;
  valor: string;
  formaPagamento: string;
  data: string;
  observacoes: string;
};

// -------- Setup --------
export const checkSetup = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const meta = await getMetadata();
    const titles = new Set<string>(
      (meta.sheets ?? []).map(
        (s: { properties: { title: string } }) => s.properties.title,
      ),
    );
    const missing = REQUIRED_TABS.filter((n) => !titles.has(n));
    return {
      ok: missing.length === 0,
      missing: missing as unknown as string[],
      configured: true,
      error: "",
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, missing: [] as string[], configured: false, error: msg };
  }
});

export const initSpreadsheet = createServerFn({ method: "POST" }).handler(async () => ({
  ok: true,
  note: "A planilha já está pronta — nenhuma estrutura precisa ser criada.",
}));

// -------- Clientes --------
export const listClientes = createServerFn({ method: "GET" }).handler(
  async (): Promise<Cliente[]> => {
    const { headers, rows } = await readTable("Clientes");
    return rows
      .map((r): Cliente => {
        const wa = get(r, headers, "WhatsApp");
        return {
          id: get(r, headers, "ID Cliente"),
          nome: get(r, headers, "Nome"),
          telefone: wa,
          whatsapp: wa,
          endereco: get(r, headers, "Endereco"),
          cidade: "",
          bairro: "",
          observacoes: get(r, headers, "Observacoes"),
          criadoEm: "",
        };
      })
      .filter((c) => c.nome);
  },
);

export const createCliente = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      nome: z.string().min(1),
      telefone: z.string().default(""),
      whatsapp: z.string().default(""),
      endereco: z.string().default(""),
      cidade: z.string().default(""),
      bairro: z.string().default(""),
      observacoes: z.string().default(""),
    }),
  )
  .handler(async ({ data }) => {
    const id = newId("CLI");
    const wa = normalizePhone(data.whatsapp || data.telefone);
    await appendRecord("Clientes", {
      "ID Cliente": id,
      Nome: data.nome,
      WhatsApp: wa,
      Endereco: data.endereco,
      Observacoes: data.observacoes,
    });
    return { id };
  });

// -------- Produtos --------
function isAtivo(v: string): boolean {
  const s = (v || "Sim").toString().trim().toLowerCase();
  return s !== "não" && s !== "nao" && s !== "false" && s !== "0" && s !== "";
}

export const listProdutos = createServerFn({ method: "GET" }).handler(
  async (): Promise<Produto[]> => {
    const { headers, rows } = await readTable("Produtos");
    return rows
      .filter((r) => get(r, headers, "Produto") && isAtivo(get(r, headers, "Ativo")))
      .map((r): Produto => ({
        id: get(r, headers, "ID Produto"),
        categoria: get(r, headers, "Categoria"),
        tipo: "",
        nome: get(r, headers, "Produto"),
        unidade: "unidade",
        preco: get(r, headers, "Preco"),
        descricao: get(r, headers, "Descricao"),
        imagem: get(r, headers, "Imagem"),
        observacoes: "",
      }));
  },
);

const produtoInput = z.object({
  categoria: z.string().min(1),
  tipo: z.string().default(""),
  nome: z.string().min(1),
  unidade: z.string().default("unidade"),
  preco: z.number(),
  descricao: z.string().default(""),
  imagem: z.string().default(""),
  observacoes: z.string().default(""),
});

export const createProduto = createServerFn({ method: "POST" })
  .inputValidator(produtoInput)
  .handler(async ({ data }) => {
    const id = newId("PRD");
    await appendRecord("Produtos", {
      "ID Produto": id,
      Categoria: data.categoria,
      Produto: data.nome,
      Descricao: data.descricao,
      Preco: data.preco,
      Imagem: data.imagem,
      Ativo: "Sim",
    });
    return { id };
  });

export const updateProduto = createServerFn({ method: "POST" })
  .inputValidator(produtoInput.extend({ id: z.string().min(1) }))
  .handler(async ({ data }) => {
    const row = await findRow("Produtos", "ID Produto", data.id);
    if (row < 0) throw new Error("Produto não encontrado na planilha");
    await updateRecord("Produtos", row, {
      Categoria: data.categoria,
      Produto: data.nome,
      Descricao: data.descricao,
      Preco: data.preco,
      Imagem: data.imagem,
    });
    return { ok: true };
  });

export const deleteProduto = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().min(1) }))
  .handler(async ({ data }) => {
    const row = await findRow("Produtos", "ID Produto", data.id);
    if (row < 0) throw new Error("Produto não encontrado");
    await updateRecord("Produtos", row, { Ativo: "Não" });
    return { ok: true };
  });

// -------- Pedidos --------
export const listPedidos = createServerFn({ method: "GET" }).handler(
  async (): Promise<Pedido[]> => {
    const { headers, rows } = await readTable("Pedidos");
    return rows
      .map((r): Pedido => {
        const id = get(r, headers, "ID Pedido");
        const total = get(r, headers, "Valor Total");
        const entrada = get(r, headers, "Valor Entrada");
        const pago = get(r, headers, "Valor Pago") || entrada;
        const saldo =
          get(r, headers, "Saldo Restante") ||
          String(parseNum(total) - parseNum(pago));
        return {
          id,
          numero: id,
          clienteId: get(r, headers, "ID Cliente"),
          clienteNome: get(r, headers, "Cliente"),
          produto: get(r, headers, "Produto"),
          quantidade: get(r, headers, "Quantidade"),
          peso: "",
          valorTotal: total,
          entrada: pago,
          saldo,
          formaPagamento: get(r, headers, "Forma Pagamento"),
          situacaoPagamento: get(r, headers, "Situacao Financeira"),
          dataPedido: get(r, headers, "Data Pedido"),
          dataEntrega: get(r, headers, "Data Entrega"),
          horaEntrega: get(r, headers, "Hora Entrega"),
          status: get(r, headers, "Status"),
          observacoes: get(r, headers, "Observacoes"),
        };
      })
      .filter((p) => p.id);
  },
);

function computeSit(total: number, pago: number): string {
  if (total > 0 && pago >= total - 0.0049) return "Pago integral";
  if (pago > 0) return "Entrada recebida";
  return "Não pago";
}

export const createPedido = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      clienteId: z.string(),
      clienteNome: z.string(),
      whatsapp: z.string().default(""),
      produto: z.string(),
      quantidade: z.number().default(0),
      peso: z.number().default(0),
      valorTotal: z.number(),
      entrada: z.number().default(0),
      formaPagamento: z.string().default("Pix"),
      situacaoPagamento: z.string().default("Não pago"),
      dataPedido: z.string(),
      dataEntrega: z.string(),
      horaEntrega: z.string().default(""),
      status: z.string().default("Orçamento"),
      observacoes: z.string().default(""),
    }),
  )
  .handler(async ({ data }) => {
    const id = newId("PED");
    const qty = data.quantidade > 0 ? data.quantidade : 1;
    const preco = data.valorTotal / qty;
    const pago = data.entrada;
    const saldo = Math.max(0, data.valorTotal - pago);
    const sit = data.situacaoPagamento || computeSit(data.valorTotal, pago);

    await appendRecord("Pedidos", {
      "ID Pedido": id,
      "Data Pedido": data.dataPedido,
      "ID Cliente": data.clienteId,
      Cliente: data.clienteNome,
      WhatsApp: normalizePhone(data.whatsapp),
      Produto: data.produto,
      Quantidade: qty,
      "Valor Unitario": preco,
      "Valor Total": data.valorTotal,
      Status: data.status,
      "Data Entrega": data.dataEntrega,
      "Hora Entrega": data.horaEntrega,
      "Valor Entrada": data.entrada,
      "Valor Pago": pago,
      "Saldo Restante": saldo,
      "Situacao Financeira": sit,
      "Forma Pagamento": data.formaPagamento,
      Observacoes: data.observacoes,
    });

    if (pago > 0) {
      await appendRecord("Pagamentos", {
        "ID Pagamento": newId("PAG"),
        "ID Pedido": id,
        Data: data.dataPedido || todayISO(),
        Valor: pago,
        "Forma Pagamento": data.formaPagamento,
        Observacao: "Entrada",
      });
    }
    return { id, numero: id };
  });

export const updatePedidoStatus = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string(), status: z.string() }))
  .handler(async ({ data }) => {
    const row = await findRow("Pedidos", "ID Pedido", data.id);
    if (row < 0) throw new Error("Pedido não encontrado na planilha");
    await updateRecord("Pedidos", row, { Status: data.status });
    return { ok: true };
  });

export const updatePedidoPagamento = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      id: z.string(),
      entrada: z.number().default(0),
      situacaoPagamento: z.enum(["Não pago", "Entrada recebida", "Pago integral"]),
      formaPagamento: z.string().default("Pix"),
    }),
  )
  .handler(async ({ data }) => {
    const { headers, rows, rowOffset } = await readTable("Pedidos");
    const idIdx = headers.indexOf("ID Pedido");
    const i = rows.findIndex((r) => r[idIdx] === data.id);
    if (i < 0) throw new Error("Pedido não encontrado na planilha");
    const row = rowOffset + i;
    const total = parseNum(get(rows[i], headers, "Valor Total"));

    // Regras de status financeiro (fonte única)
    let entrada = data.entrada;
    let pagoFinal = data.entrada;
    if (data.situacaoPagamento === "Não pago") {
      entrada = 0;
      pagoFinal = 0;
    } else if (data.situacaoPagamento === "Pago integral") {
      entrada = total;
      pagoFinal = total;
    } else {
      // Entrada recebida — valor informado, mas garantir > 0 e <= total
      entrada = Math.max(0, Math.min(total, data.entrada));
      pagoFinal = entrada;
    }
    const saldo = Math.max(0, total - pagoFinal);

    await updateRecord("Pedidos", row, {
      "Valor Entrada": entrada,
      "Valor Pago": pagoFinal,
      "Saldo Restante": saldo,
      "Forma Pagamento": data.formaPagamento,
      "Situacao Financeira": data.situacaoPagamento,
    });

    if (pagoFinal > 0) {
      const clienteNome = get(rows[i], headers, "Cliente");
      await appendRecord("Pagamentos", {
        "ID Pagamento": newId("PAG"),
        "ID Pedido": data.id,
        Data: todayISO(),
        Valor: pagoFinal,
        "Forma Pagamento": data.formaPagamento,
        Observacao: `${data.situacaoPagamento} — ${clienteNome}`,
      });
    }

    return { ok: true };
  });

// -------- Insumos / Ficha Técnica --------
export const listInsumos = createServerFn({ method: "GET" }).handler(
  async (): Promise<Insumo[]> => {
    const { headers, rows } = await readTable("Insumos");

    return rows
      .map((r): Insumo => ({
        id: get(r, headers, "ID Insumo"),
        nome: get(r, headers, "Insumo"),
        unidade: get(r, headers, "Unidade Uso"),
        estoqueAtual: get(r, headers, "Estoque Atual"),
        estoqueMinimo: get(r, headers, "Estoque Minimo"),
        valorUnitario: get(r, headers, "Custo Unitario"),
        observacoes: get(r, headers, "Observacoes"),
        ativo: get(r, headers, "ativo"),
      }))
      .filter((i) => i.id && i.nome);
  },
);

export const createInsumo = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      nome: z.string().min(1),
      categoria: z.string().optional(),
      unidadeCompra: z.string().optional(),
      quantidadeCompra: z.number().optional(),
      valorPago: z.number().optional(),
      unidadeUso: z.string().optional(),
      valorUnitario: z.number().optional(),
      estoqueAtual: z.number().optional(),
      estoqueMinimo: z.number().optional(),
      fornecedor: z.string().optional(),
      observacoes: z.string().optional(),
    }),
  )  .handler(async ({ data }) => {
    const id = newId("INS");

    await appendRecord("Insumos", {
      "ID Insumo": id,
      Insumo: data.nome ?? "",
      Categoria: data.categoria ?? "",
      "Unidade Compra": data.unidadeCompra ?? "un",
      "Quantidade Compra": data.quantidadeCompra ?? 0,
      "Valor Pago": data.valorPago ?? 0,
      "Unidade Uso": data.unidadeUso ?? "un",
      "Custo Unitario": data.valorUnitario ?? 0,
      "Estoque Atual": data.estoqueAtual ?? 0,
      "Estoque Minimo": data.estoqueMinimo ?? 0,
      Fornecedor: data.fornecedor ?? "",
      "Data Compra": todayISO(),
      Ativo: "Sim",
      Observacoes: data.observacoes ?? "",
    });

    return { id };
  });

export const updateInsumoEstoque = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string(), estoqueAtual: z.number() }))
  .handler(async ({ data }) => {
    const row = await findRow("Insumos", "ID Insumo", data.id);
    if (row < 0) throw new Error("Insumo não encontrado");

    await updateRecord("Insumos", row, {
      "Estoque Atual": data.estoqueAtual,
    });

    return { ok: true };
  });

  export const deleteInsumo = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().min(1) }))
  .handler(async ({ data }) => {
    const row = await findRow("Insumos", "ID Insumo", data.id);
    if (row < 0) throw new Error("Insumo não encontrado");

    await updateRecord("Insumos", row, {
      Ativo: "Não",
    });

    return { ok: true };
  });

export const deleteFicha = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().min(1) }))
  .handler(async ({ data }) => {
    const row = await findRow("Receitas", "ID Receita", data.id);
    if (row < 0) throw new Error("Ficha não encontrada");

    await updateRecord("Receitas", row, {
      Ativo: "Não",
    });

    return { ok: true };
  });

export const listFichas = createServerFn({ method: "GET" }).handler(
  async (): Promise<Ficha[]> => {
    const { headers, rows } = await readTable("Receitas");

    return rows
      .map((r): Ficha => {
        const custoTotal = parseNum(get(r, headers, "Custo Total"));
        const precoVenda =
          parseNum(get(r, headers, "Preco Sugerido")) ||
          parseNum(get(r, headers, "Preço Sugerido"));

        const lucroBruto = precoVenda - custoTotal;
        const margem = precoVenda > 0 ? (lucroBruto / precoVenda) * 100 : 0;

return {
  id: get(r, headers, "ID Receita"),
  produtoId: get(r, headers, "ID Produto"),
  produtoNome: get(r, headers, "Produto"),
  ingredientes: get(r, headers, "Observacoes"),
  custoTotal: custoTotal.toFixed(2),
  precoVenda: precoVenda.toFixed(2),
  lucroBruto: lucroBruto.toFixed(2),
  margem: margem.toFixed(1),
  observacoes: get(r, headers, "Observacoes"),
  rendimento: get(r, headers, "Rendimento") || "1",
  ativo: get(r, headers, "Ativo"),
};      })
.filter((f) => f.id && f.produtoNome && f.ativo !== "Não");
  },
);

export const upsertFicha = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      produtoId: z.string().min(1),
      produtoNome: z.string().min(1).default(""),
      ingredientes: z.string().default(""),
      custoTotal: z.number().default(0),
      precoVenda: z.number().default(0),
      observacoes: z.string().default(""),
    }),
  )
  .handler(async ({ data }) => {
    const id = newId("REC");
    const lucro = data.precoVenda - data.custoTotal;
    const margem = data.precoVenda > 0 ? (lucro / data.precoVenda) * 100 : 0;

    await appendRecord("Receitas", {
      "ID Receita": id,
      "ID Produto": data.produtoId,
      Produto: data.produtoNome,
      Rendimento: 1,
      "Margem Lucro %": margem.toFixed(1),
      "Custo Ingredientes": data.custoTotal,
      "Custo Adicional": 0,
      "Custo Total": data.custoTotal,
      "Preco Sugerido": data.precoVenda,
      Ativo: "Sim",
      Observacoes: data.ingredientes || data.observacoes,
    });

    if (data.ingredientes) {
      await appendRecord("Receita_Insumos", {
        "ID Receita": id,
        "ID Insumo": "",
        Insumo: data.ingredientes,
        "Quantidade Usada": "",
        "Unidade Uso": "",
        "Custo Calculado": data.custoTotal,
        Observacoes: "Lançamento manual pela ficha técnica",
      });
    }

    return { id, lucro, margem };
  });

// -------- Financeiro (feed Pagamentos) --------
export const listCustosAdicionais = createServerFn({ method: "GET" }).handler(
  async (): Promise<CustoAdicional[]> => {
    const { headers, rows } = await readTable("Custos_Adicionais");

    return rows
      .map((r): CustoAdicional => ({
        idReceita: get(r, headers, "ID Receita"),
        item: get(r, headers, "Item"),
        categoria: get(r, headers, "Categoria"),
        valor: get(r, headers, "Valor"),
        observacoes: get(r, headers, "Observacoes"),
      }))
      .filter((c) => c.item);
  },
);

export const listFinanceiro = createServerFn({ method: "GET" }).handler(
  async (): Promise<Financeiro[]> => {
    const { headers, rows } = await readTable("Pagamentos");
    return rows
      .map((r): Financeiro => ({
        id: get(r, headers, "ID Pagamento"),
        pedidoId: get(r, headers, "ID Pedido"),
        pedidoNumero: get(r, headers, "ID Pedido"),
        clienteNome: "",
        tipo: get(r, headers, "Observacao"),
        valor: get(r, headers, "Valor"),
        formaPagamento: get(r, headers, "Forma Pagamento"),
        data: get(r, headers, "Data"),
        observacoes: get(r, headers, "Observacao"),
      }))
      .filter((f) => f.id);
  },
);

// -------- Diagnóstico --------
export const testWrite = createServerFn({ method: "POST" }).handler(async () => {
  try {
    const stamp = `OK ${new Date().toISOString()}`;
    await setValues("Configuracoes!Z100", [[stamp]]);
    await setValues("Configuracoes!Z100", [[""]]);
    return { ok: true, message: "Escrita confirmada. Conexão com permissão de Editor." };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, message: msg };
  }
});

// -------- Catálogo público --------
export type ProdutoPublico = {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  imagem: string;
  preco: string;
  unidade: string;
};

export const listProdutosPublico = createServerFn({ method: "GET" }).handler(
  async (): Promise<ProdutoPublico[]> => {
    const { headers, rows } = await readTable("Produtos");

    return rows
      .filter((r) => {
        const nome = get(r, headers, "Produto");
        const ativo = String(get(r, headers, "Ativo") || "Sim")
          .trim()
          .toLowerCase();

        return (
          nome &&
          ativo !== "não" &&
          ativo !== "nao" &&
          ativo !== "false" &&
          ativo !== "0" &&
          ativo !== "inativo"
        );
      })
      .map((r) => ({
        id: get(r, headers, "ID Produto"),
        nome: get(r, headers, "Produto"),
        categoria: get(r, headers, "Categoria"),
        descricao: get(r, headers, "Descricao") || get(r, headers, "Descrição"),
        imagem: get(r, headers, "Imagem"),
        preco: get(r, headers, "Preco") || get(r, headers, "Preço"),
        unidade: "unidade",
      }));
  },
);

const pedidoPublicoInput = z.object({
  produtoId: z.string().min(1).max(120),
  produtoNome: z.string().min(1).max(255),
  preco: z.number().min(0).max(1_000_000).default(0),
  quantidade: z.number().min(1).max(999).default(1),
  clienteNome: z.string().min(2).max(120),
  whatsapp: z.string().min(8).max(40),
  dataDesejada: z.string().max(40).default(""),
  horaDesejada: z.string().max(10).default(""),
  rua: z.string().max(120).default(""),
  numero: z.string().max(20).default(""),
  bairro: z.string().max(80).default(""),
  cidade: z.string().max(80).default(""),
  observacoes: z.string().max(800).default(""),
});

export const createPedidoPublico = createServerFn({ method: "POST" })
  .inputValidator(pedidoPublicoInput)
  .handler(async ({ data }) => {
    const qty = data.quantidade > 0 ? data.quantidade : 1;
    const preco = data.preco > 0 ? data.preco : 0;
    const total = preco * qty;

    if (total <= 0) {
      throw new Error("Valor total inválido. Verifique o preço do produto.");
    }

    const waNorm = normalizePhone(data.whatsapp);

    const enderecoFmt = [
      [data.rua, data.numero].filter(Boolean).join(", "),
      data.bairro,
      data.cidade,
    ]
      .filter(Boolean)
      .join(" - ");

    let clienteId = "";

    try {
      const { headers, rows, rowOffset } = await readTable("Clientes");

      const idxId = headers.findIndex((h) => normalizeHeader(h) === "id cliente");
      const idxNome = headers.findIndex((h) => normalizeHeader(h) === "nome");
      const idxWhats = headers.findIndex((h) => normalizeHeader(h) === "whatsapp");

      const foundIndex = rows.findIndex((r) => {
        const whatsLinha = normalizePhone(r[idxWhats] || "");
        return whatsLinha && whatsLinha === waNorm;
      });

      if (foundIndex >= 0) {
        const row = rows[foundIndex];
        clienteId = row[idxId] || newId("CLI");

        await updateRecord("Clientes", rowOffset + foundIndex, {
          "ID Cliente": clienteId,
          Nome: data.clienteNome || row[idxNome] || "",
          WhatsApp: waNorm,
          Endereco: enderecoFmt,
        });
      }
    } catch (e) {
      console.error("Erro ao buscar/atualizar cliente existente:", e);
    }

    if (!clienteId) {
      clienteId = newId("CLI");

      await appendRecord("Clientes", {
        "ID Cliente": clienteId,
        Nome: data.clienteNome,
        WhatsApp: waNorm,
        Endereco: enderecoFmt,
        Observacoes: "Cliente do catálogo público",
      });
    }

    try {
      const { headers, rows } = await readTable("Usuarios");
      const idxWhats = headers.findIndex((h) => normalizeHeader(h) === "whatsapp");

      const usuarioExiste = rows.some((r) => normalizePhone(r[idxWhats] || "") === waNorm);

      if (!usuarioExiste) {
        await appendRecord("Usuarios", {
          "ID Usuario": newId("USR"),
          Nome: data.clienteNome,
          WhatsApp: waNorm,
          Perfil: "CLIENTE",
          Status: "Ativo",
        });
      }
    } catch (e) {
      console.error("Erro não fatal ao criar usuário público:", e);
    }

    const id = newId("PED");

    await appendRecord("Pedidos", {
      "ID Pedido": id,
      "Data Pedido": todayISO(),
      "ID Cliente": clienteId,
      Cliente: data.clienteNome,
      WhatsApp: waNorm,
      Produto: data.produtoNome,
      Quantidade: qty,
      "Valor Unitario": preco,
      "Valor Total": total,
      Status: "Aguardando confirmação",
      "Data Entrega": data.dataDesejada,
      "Hora Entrega": data.horaDesejada,
      "Valor Entrada": 0,
      "Valor Pago": 0,
      "Saldo Restante": total,
      "Situacao Financeira": "Não pago",
      "Forma Pagamento": "Pix",
      Observacoes: data.observacoes,
    });

    return { id, total, entradaMinima: total * 0.5 };
  });

// -------- Configuracoes (chave/valor) --------
const CFG_KEYS = [
  "nome",
  "whatsapp",
  "instagram",
  "endereco",
  "chavePix",
  "tipoPix",
  "nomeRecebedor",
  "banco",
] as const;
export type ConfigKey = (typeof CFG_KEYS)[number];
export type ConfigData = Record<ConfigKey, string>;

const CFG_LABELS: Record<ConfigKey, string> = {
  nome: "Nome Confeitaria",
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  endereco: "Endereço",
  chavePix: "Chave Pix",
  tipoPix: "Tipo Chave Pix",
  nomeRecebedor: "Nome Recebedor",
  banco: "Banco",
};

const defaultConfig = (): ConfigData => ({
  nome: "Cakes By Jack",
  whatsapp: "",
  instagram: "",
  endereco: "",
  chavePix: "",
  tipoPix: "",
  nomeRecebedor: "",
  banco: "",
});

export const getConfig = createServerFn({ method: "GET" }).handler(
  async (): Promise<ConfigData> => {
    const cfg = defaultConfig();
    try {
      const rows = await getValues("Configuracoes!A2:B40");
      const byLabel: Record<string, string> = {};
      for (const r of rows) {
        const label = (r[0] ?? "").toString().trim();
        const value = (r[1] ?? "").toString();
        if (label) byLabel[label] = value;
      }
      for (const key of CFG_KEYS) {
        const lbl = CFG_LABELS[key];
        if (byLabel[lbl] !== undefined) cfg[key] = byLabel[lbl];
      }
    } catch {
      /* missing — return defaults */
    }
    return cfg;
  },
);

export const updateConfig = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      nome: z.string().max(120).default(""),
      whatsapp: z.string().max(40).default(""),
      instagram: z.string().max(120).default(""),
      endereco: z.string().max(255).default(""),
      chavePix: z.string().max(255).default(""),
      tipoPix: z.string().max(40).default(""),
      nomeRecebedor: z.string().max(120).default(""),
      banco: z.string().max(120).default(""),
    }),
  )
  .handler(async ({ data }) => {
    // Rewrite the entire key/value block as Campo|Valor pairs.
    const values: (string | number)[][] = CFG_KEYS.map((k) => [
      CFG_LABELS[k],
      data[k] ?? "",
    ]);
    while (values.length < 20) values.push(["", ""]);
    await setValues("Configuracoes!A2:B21", values);
    return { ok: true };
  });

// -------- Usuarios --------
export type Usuario = {
  id: string;
  nome: string;
  whatsapp: string;
  perfil: "ADMIN" | "OWNER" | "CLIENTE" | string;
  status: string;
  observacoes: string;
};

const USUARIOS_TAB = "Usuarios";

async function listUsuariosRaw(): Promise<Usuario[]> {
  try {
    const { headers, rows } = await readTable(USUARIOS_TAB);
    return rows
      .map((r): Usuario => ({
        id: get(r, headers, "ID Usuario"),
        nome: get(r, headers, "Nome"),
        whatsapp: get(r, headers, "WhatsApp"),
        perfil: (get(r, headers, "Perfil") || "CLIENTE").toUpperCase(),
        status: get(r, headers, "Status") || "Ativo",
        observacoes: "",
      }))
      .filter((u) => u.id || u.nome);
  } catch {
    return [];
  }
}

export const listUsuarios = createServerFn({ method: "GET" }).handler(
  async (): Promise<Usuario[]> => listUsuariosRaw(),
);

const usuarioInput = z.object({
  nome: z.string().min(1).max(120),
  whatsapp: z.string().min(8).max(40),
  perfil: z.enum(["ADMIN", "OWNER", "CLIENTE"]).default("CLIENTE"),
  status: z.string().max(40).default("Ativo"),
  observacoes: z.string().max(500).default(""),
});

export const createUsuario = createServerFn({ method: "POST" })
  .inputValidator(usuarioInput)
  .handler(async ({ data }) => {
    const id = newId("USR");
    await appendRecord(USUARIOS_TAB, {
      "ID Usuario": id,
      Nome: data.nome,
      WhatsApp: normalizePhone(data.whatsapp),
      Perfil: data.perfil,
      Status: data.status,
    });
    return { id };
  });

export const updateUsuario = createServerFn({ method: "POST" })
  .inputValidator(usuarioInput.extend({ id: z.string().min(1) }))
  .handler(async ({ data }) => {
    const row = await findRow(USUARIOS_TAB, "ID Usuario", data.id);
    if (row < 0) throw new Error("Usuário não encontrado");
    await updateRecord(USUARIOS_TAB, row, {
      Nome: data.nome,
      WhatsApp: normalizePhone(data.whatsapp),
      Perfil: data.perfil,
      Status: data.status,
    });
    return { ok: true };
  });

export const deleteUsuario = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().min(1) }))
  .handler(async ({ data }) => {
    const row = await findRow(USUARIOS_TAB, "ID Usuario", data.id);
    if (row < 0) throw new Error("Usuário não encontrado");
    await updateRecord(USUARIOS_TAB, row, {
      Status: "Removido",
      Nome: "",
      WhatsApp: "",
    });
    return { ok: true };
  });
