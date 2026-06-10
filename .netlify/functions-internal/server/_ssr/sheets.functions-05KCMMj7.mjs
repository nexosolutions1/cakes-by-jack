import { T as TSS_SERVER_FUNCTION, c as createServerFn } from "./server-CBnRcYXi.mjs";
import { g as getMetadata, r as readTable, a as appendRecord, f as findRow, u as updateRecord, s as setValues, b as getValues } from "./sheets.server-e71hR5JP.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType, n as numberType, e as enumType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const REQUIRED_TABS = ["Configuracoes", "Usuarios", "Clientes", "Produtos", "Pedidos", "Pagamentos"];
const newId = (prefix) => `${prefix}-${Date.now().toString(36)}${Math.floor(Math.random() * 100).toString(36).padStart(2, "0")}`.toUpperCase();
const todayISO = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
function normalizePhone(v) {
  return (v ?? "").replace(/\D+/g, "");
}
const parseNum = (v) => {
  if (typeof v === "number") return Number.isFinite(v) ? v : 0;
  const s = String(v ?? "").replace(/R\$\s?/gi, "").replace(/\s+/g, "").replace(/\./g, "").replace(",", ".");
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
};
const normalizeHeader = (v) => String(v ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
const get = (row, headers, col) => {
  const target = normalizeHeader(col);
  const i = headers.findIndex((h) => normalizeHeader(h) === target);
  return i < 0 ? "" : row[i] ?? "";
};
const checkSetup_createServerFn_handler = createServerRpc({
  id: "663c6b8df3f2452ef44143a8c7e68c6a255c6e8cdeb2159dd4e2a290e6dda770",
  name: "checkSetup",
  filename: "src/lib/sheets.functions.ts"
}, (opts) => checkSetup.__executeServer(opts));
const checkSetup = createServerFn({
  method: "GET"
}).handler(checkSetup_createServerFn_handler, async () => {
  try {
    const meta = await getMetadata();
    const titles = new Set((meta.sheets ?? []).map((s) => s.properties.title));
    const missing = REQUIRED_TABS.filter((n) => !titles.has(n));
    return {
      ok: missing.length === 0,
      missing,
      configured: true,
      error: ""
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return {
      ok: false,
      missing: [],
      configured: false,
      error: msg
    };
  }
});
const initSpreadsheet_createServerFn_handler = createServerRpc({
  id: "30f335ac158e11d5ced31c6ac9fad02ca9456cdc278156df26a6ce4bdd7be5e5",
  name: "initSpreadsheet",
  filename: "src/lib/sheets.functions.ts"
}, (opts) => initSpreadsheet.__executeServer(opts));
const initSpreadsheet = createServerFn({
  method: "POST"
}).handler(initSpreadsheet_createServerFn_handler, async () => ({
  ok: true,
  note: "A planilha já está pronta — nenhuma estrutura precisa ser criada."
}));
const listClientes_createServerFn_handler = createServerRpc({
  id: "76923029291ef37c7c4735fb308ac9f1cc7d3dacf696f29dc5677df508c05078",
  name: "listClientes",
  filename: "src/lib/sheets.functions.ts"
}, (opts) => listClientes.__executeServer(opts));
const listClientes = createServerFn({
  method: "GET"
}).handler(listClientes_createServerFn_handler, async () => {
  const {
    headers,
    rows
  } = await readTable("Clientes");
  return rows.map((r) => {
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
      criadoEm: ""
    };
  }).filter((c) => c.nome);
});
const createCliente_createServerFn_handler = createServerRpc({
  id: "edc205e6b3b56ae8c658246baa56ad0c9ec364524148126449582cdc97a0071a",
  name: "createCliente",
  filename: "src/lib/sheets.functions.ts"
}, (opts) => createCliente.__executeServer(opts));
const createCliente = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  nome: stringType().min(1),
  telefone: stringType().default(""),
  whatsapp: stringType().default(""),
  endereco: stringType().default(""),
  cidade: stringType().default(""),
  bairro: stringType().default(""),
  observacoes: stringType().default("")
})).handler(createCliente_createServerFn_handler, async ({
  data
}) => {
  const id = newId("CLI");
  const wa = normalizePhone(data.whatsapp || data.telefone);
  await appendRecord("Clientes", {
    "ID Cliente": id,
    Nome: data.nome,
    WhatsApp: wa,
    Endereco: data.endereco,
    Observacoes: data.observacoes
  });
  return {
    id
  };
});
function isAtivo(v) {
  const s = (v || "Sim").toString().trim().toLowerCase();
  return s !== "não" && s !== "nao" && s !== "false" && s !== "0" && s !== "";
}
const listProdutos_createServerFn_handler = createServerRpc({
  id: "79e05e594fc4eaddafbc32c27467784ee46b2cc4d44cdc3b0a1183e891f5be3d",
  name: "listProdutos",
  filename: "src/lib/sheets.functions.ts"
}, (opts) => listProdutos.__executeServer(opts));
const listProdutos = createServerFn({
  method: "GET"
}).handler(listProdutos_createServerFn_handler, async () => {
  const {
    headers,
    rows
  } = await readTable("Produtos");
  return rows.filter((r) => get(r, headers, "Produto") && isAtivo(get(r, headers, "Ativo"))).map((r) => ({
    id: get(r, headers, "ID Produto"),
    categoria: get(r, headers, "Categoria"),
    tipo: "",
    nome: get(r, headers, "Produto"),
    unidade: "unidade",
    preco: get(r, headers, "Preco"),
    descricao: get(r, headers, "Descricao"),
    imagem: get(r, headers, "Imagem"),
    observacoes: ""
  }));
});
const produtoInput = objectType({
  categoria: stringType().min(1),
  tipo: stringType().default(""),
  nome: stringType().min(1),
  unidade: stringType().default("unidade"),
  preco: numberType(),
  descricao: stringType().default(""),
  imagem: stringType().default(""),
  observacoes: stringType().default("")
});
const createProduto_createServerFn_handler = createServerRpc({
  id: "66da5a9083ee0ccae00a50b0252005b2760192a1528ea3c1415b3ef03a6f2854",
  name: "createProduto",
  filename: "src/lib/sheets.functions.ts"
}, (opts) => createProduto.__executeServer(opts));
const createProduto = createServerFn({
  method: "POST"
}).inputValidator(produtoInput).handler(createProduto_createServerFn_handler, async ({
  data
}) => {
  const id = newId("PRD");
  await appendRecord("Produtos", {
    "ID Produto": id,
    Categoria: data.categoria,
    Produto: data.nome,
    Descricao: data.descricao,
    Preco: data.preco,
    Imagem: data.imagem,
    Ativo: "Sim"
  });
  return {
    id
  };
});
const updateProduto_createServerFn_handler = createServerRpc({
  id: "b2fd925b6e069543ffa0d03cdc0b6f2b21c3809fa27871930f2fca2ae4c250c4",
  name: "updateProduto",
  filename: "src/lib/sheets.functions.ts"
}, (opts) => updateProduto.__executeServer(opts));
const updateProduto = createServerFn({
  method: "POST"
}).inputValidator(produtoInput.extend({
  id: stringType().min(1)
})).handler(updateProduto_createServerFn_handler, async ({
  data
}) => {
  const row = await findRow("Produtos", "ID Produto", data.id);
  if (row < 0) throw new Error("Produto não encontrado na planilha");
  await updateRecord("Produtos", row, {
    Categoria: data.categoria,
    Produto: data.nome,
    Descricao: data.descricao,
    Preco: data.preco,
    Imagem: data.imagem
  });
  return {
    ok: true
  };
});
const deleteProduto_createServerFn_handler = createServerRpc({
  id: "17ebbafaaa679a189568fd20d67f1940b1e32ede2029204290093c3eda1e892d",
  name: "deleteProduto",
  filename: "src/lib/sheets.functions.ts"
}, (opts) => deleteProduto.__executeServer(opts));
const deleteProduto = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().min(1)
})).handler(deleteProduto_createServerFn_handler, async ({
  data
}) => {
  const row = await findRow("Produtos", "ID Produto", data.id);
  if (row < 0) throw new Error("Produto não encontrado");
  await updateRecord("Produtos", row, {
    Ativo: "Não"
  });
  return {
    ok: true
  };
});
const listPedidos_createServerFn_handler = createServerRpc({
  id: "214dca84ef8840793c433690db86b81940040986ff4020423705b650da2328e3",
  name: "listPedidos",
  filename: "src/lib/sheets.functions.ts"
}, (opts) => listPedidos.__executeServer(opts));
const listPedidos = createServerFn({
  method: "GET"
}).handler(listPedidos_createServerFn_handler, async () => {
  const {
    headers,
    rows
  } = await readTable("Pedidos");
  return rows.map((r) => {
    const id = get(r, headers, "ID Pedido");
    const total = get(r, headers, "Valor Total");
    const entrada = get(r, headers, "Valor Entrada");
    const pago = get(r, headers, "Valor Pago") || entrada;
    const saldo = get(r, headers, "Saldo Restante") || String(parseNum(total) - parseNum(pago));
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
      observacoes: get(r, headers, "Observacoes")
    };
  }).filter((p) => p.id);
});
function computeSit(total, pago) {
  if (total > 0 && pago >= total - 49e-4) return "Pago integral";
  if (pago > 0) return "Entrada recebida";
  return "Não pago";
}
const createPedido_createServerFn_handler = createServerRpc({
  id: "1827d6ee5a2316d4b5c8376d740d5fffe2d07a573d87d7a9bf336a5727da3a28",
  name: "createPedido",
  filename: "src/lib/sheets.functions.ts"
}, (opts) => createPedido.__executeServer(opts));
const createPedido = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  clienteId: stringType(),
  clienteNome: stringType(),
  whatsapp: stringType().default(""),
  produto: stringType(),
  quantidade: numberType().default(0),
  peso: numberType().default(0),
  valorTotal: numberType(),
  entrada: numberType().default(0),
  formaPagamento: stringType().default("Pix"),
  situacaoPagamento: stringType().default("Não pago"),
  dataPedido: stringType(),
  dataEntrega: stringType(),
  horaEntrega: stringType().default(""),
  status: stringType().default("Orçamento"),
  observacoes: stringType().default("")
})).handler(createPedido_createServerFn_handler, async ({
  data
}) => {
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
    Observacoes: data.observacoes
  });
  if (pago > 0) {
    await appendRecord("Pagamentos", {
      "ID Pagamento": newId("PAG"),
      "ID Pedido": id,
      Data: data.dataPedido || todayISO(),
      Valor: pago,
      "Forma Pagamento": data.formaPagamento,
      Observacao: "Entrada"
    });
  }
  return {
    id,
    numero: id
  };
});
const updatePedidoStatus_createServerFn_handler = createServerRpc({
  id: "49ea7a124a3752bb56337e063cc0a065ac064e6dcdd109ec559161ac42947242",
  name: "updatePedidoStatus",
  filename: "src/lib/sheets.functions.ts"
}, (opts) => updatePedidoStatus.__executeServer(opts));
const updatePedidoStatus = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType(),
  status: stringType()
})).handler(updatePedidoStatus_createServerFn_handler, async ({
  data
}) => {
  const row = await findRow("Pedidos", "ID Pedido", data.id);
  if (row < 0) throw new Error("Pedido não encontrado na planilha");
  await updateRecord("Pedidos", row, {
    Status: data.status
  });
  return {
    ok: true
  };
});
const updatePedidoPagamento_createServerFn_handler = createServerRpc({
  id: "a0d29e2340371b4f56c86c45bf67e96be0aa556b02a9fa89834fd5a0e3e21d2f",
  name: "updatePedidoPagamento",
  filename: "src/lib/sheets.functions.ts"
}, (opts) => updatePedidoPagamento.__executeServer(opts));
const updatePedidoPagamento = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType(),
  entrada: numberType().default(0),
  situacaoPagamento: enumType(["Não pago", "Entrada recebida", "Pago integral"]),
  formaPagamento: stringType().default("Pix")
})).handler(updatePedidoPagamento_createServerFn_handler, async ({
  data
}) => {
  const {
    headers,
    rows,
    rowOffset
  } = await readTable("Pedidos");
  const idIdx = headers.indexOf("ID Pedido");
  const i = rows.findIndex((r) => r[idIdx] === data.id);
  if (i < 0) throw new Error("Pedido não encontrado na planilha");
  const row = rowOffset + i;
  const total = parseNum(get(rows[i], headers, "Valor Total"));
  let entrada = data.entrada;
  let pagoFinal = data.entrada;
  if (data.situacaoPagamento === "Não pago") {
    entrada = 0;
    pagoFinal = 0;
  } else if (data.situacaoPagamento === "Pago integral") {
    entrada = total;
    pagoFinal = total;
  } else {
    entrada = Math.max(0, Math.min(total, data.entrada));
    pagoFinal = entrada;
  }
  const saldo = Math.max(0, total - pagoFinal);
  await updateRecord("Pedidos", row, {
    "Valor Entrada": entrada,
    "Valor Pago": pagoFinal,
    "Saldo Restante": saldo,
    "Forma Pagamento": data.formaPagamento,
    "Situacao Financeira": data.situacaoPagamento
  });
  if (pagoFinal > 0) {
    const clienteNome = get(rows[i], headers, "Cliente");
    await appendRecord("Pagamentos", {
      "ID Pagamento": newId("PAG"),
      "ID Pedido": data.id,
      Data: todayISO(),
      Valor: pagoFinal,
      "Forma Pagamento": data.formaPagamento,
      Observacao: `${data.situacaoPagamento} — ${clienteNome}`
    });
  }
  return {
    ok: true
  };
});
const listInsumos_createServerFn_handler = createServerRpc({
  id: "a426cbc758e0edfda05b763c48156f4a7314ad4f4ba640d12f5b01e02c481132",
  name: "listInsumos",
  filename: "src/lib/sheets.functions.ts"
}, (opts) => listInsumos.__executeServer(opts));
const listInsumos = createServerFn({
  method: "GET"
}).handler(listInsumos_createServerFn_handler, async () => {
  const {
    headers,
    rows
  } = await readTable("Insumos");
  return rows.map((r) => ({
    id: get(r, headers, "ID Insumo"),
    nome: get(r, headers, "Insumo"),
    unidade: get(r, headers, "Unidade Uso"),
    estoqueAtual: get(r, headers, "Estoque Atual"),
    estoqueMinimo: get(r, headers, "Estoque Minimo"),
    valorUnitario: get(r, headers, "Custo Unitario"),
    observacoes: get(r, headers, "Observacoes")
  })).filter((i) => i.id && i.nome);
});
const createInsumo_createServerFn_handler = createServerRpc({
  id: "d12402f2c6a1cd4ca968e95a2c80f69f5b865cc361e164cb5c7a83eb2eb340c1",
  name: "createInsumo",
  filename: "src/lib/sheets.functions.ts"
}, (opts) => createInsumo.__executeServer(opts));
const createInsumo = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  nome: stringType().min(1),
  categoria: stringType().optional(),
  unidadeCompra: stringType().optional(),
  quantidadeCompra: numberType().optional(),
  valorPago: numberType().optional(),
  unidadeUso: stringType().optional(),
  valorUnitario: numberType().optional(),
  estoqueAtual: numberType().optional(),
  estoqueMinimo: numberType().optional(),
  fornecedor: stringType().optional(),
  observacoes: stringType().optional()
})).handler(createInsumo_createServerFn_handler, async ({
  data
}) => {
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
    Observacoes: data.observacoes ?? ""
  });
  return {
    id
  };
});
const updateInsumoEstoque_createServerFn_handler = createServerRpc({
  id: "279013415d8879536663bc71bf748c2c0049951730b66306c6e37bb4c6410fab",
  name: "updateInsumoEstoque",
  filename: "src/lib/sheets.functions.ts"
}, (opts) => updateInsumoEstoque.__executeServer(opts));
const updateInsumoEstoque = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType(),
  estoqueAtual: numberType()
})).handler(updateInsumoEstoque_createServerFn_handler, async ({
  data
}) => {
  const row = await findRow("Insumos", "ID Insumo", data.id);
  if (row < 0) throw new Error("Insumo não encontrado");
  await updateRecord("Insumos", row, {
    "Estoque Atual": data.estoqueAtual
  });
  return {
    ok: true
  };
});
const listFichas_createServerFn_handler = createServerRpc({
  id: "a91e44fdae2e28f9adad8d93a522aab354ab117801ad67604577ec2e113ecce2",
  name: "listFichas",
  filename: "src/lib/sheets.functions.ts"
}, (opts) => listFichas.__executeServer(opts));
const listFichas = createServerFn({
  method: "GET"
}).handler(listFichas_createServerFn_handler, async () => {
  const {
    headers,
    rows
  } = await readTable("Receitas");
  return rows.map((r) => {
    const custoTotal = parseNum(get(r, headers, "Custo Total"));
    const precoVenda = parseNum(get(r, headers, "Preco Sugerido")) || parseNum(get(r, headers, "Preço Sugerido"));
    const lucroBruto = precoVenda - custoTotal;
    const margem = precoVenda > 0 ? lucroBruto / precoVenda * 100 : 0;
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
      rendimento: get(r, headers, "Rendimento") || "1"
    };
  }).filter((f) => f.id && f.produtoNome);
});
const upsertFicha_createServerFn_handler = createServerRpc({
  id: "cd5bc80bb9779c63b05c13cd0fa78c591f2f020001ac59f2ddf46df0ce53f542",
  name: "upsertFicha",
  filename: "src/lib/sheets.functions.ts"
}, (opts) => upsertFicha.__executeServer(opts));
const upsertFicha = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  produtoId: stringType().min(1),
  produtoNome: stringType().min(1).default(""),
  ingredientes: stringType().default(""),
  custoTotal: numberType().default(0),
  precoVenda: numberType().default(0),
  observacoes: stringType().default("")
})).handler(upsertFicha_createServerFn_handler, async ({
  data
}) => {
  const id = newId("REC");
  const lucro = data.precoVenda - data.custoTotal;
  const margem = data.precoVenda > 0 ? lucro / data.precoVenda * 100 : 0;
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
    Observacoes: data.ingredientes || data.observacoes
  });
  if (data.ingredientes) {
    await appendRecord("Receita_Insumos", {
      "ID Receita": id,
      "ID Insumo": "",
      Insumo: data.ingredientes,
      "Quantidade Usada": "",
      "Unidade Uso": "",
      "Custo Calculado": data.custoTotal,
      Observacoes: "Lançamento manual pela ficha técnica"
    });
  }
  return {
    id,
    lucro,
    margem
  };
});
const listCustosAdicionais_createServerFn_handler = createServerRpc({
  id: "ee83c3007db522ec49cc5fc8a2389a5ceb65d20da6f75cbc654db47d8c89c37b",
  name: "listCustosAdicionais",
  filename: "src/lib/sheets.functions.ts"
}, (opts) => listCustosAdicionais.__executeServer(opts));
const listCustosAdicionais = createServerFn({
  method: "GET"
}).handler(listCustosAdicionais_createServerFn_handler, async () => {
  const {
    headers,
    rows
  } = await readTable("Custos_Adicionais");
  return rows.map((r) => ({
    idReceita: get(r, headers, "ID Receita"),
    item: get(r, headers, "Item"),
    categoria: get(r, headers, "Categoria"),
    valor: get(r, headers, "Valor"),
    observacoes: get(r, headers, "Observacoes")
  })).filter((c) => c.item);
});
const listFinanceiro_createServerFn_handler = createServerRpc({
  id: "f91c62f5276b7bcf04d1696112413e74991ca62f78b3d767587c8a629b15c0be",
  name: "listFinanceiro",
  filename: "src/lib/sheets.functions.ts"
}, (opts) => listFinanceiro.__executeServer(opts));
const listFinanceiro = createServerFn({
  method: "GET"
}).handler(listFinanceiro_createServerFn_handler, async () => {
  const {
    headers,
    rows
  } = await readTable("Pagamentos");
  return rows.map((r) => ({
    id: get(r, headers, "ID Pagamento"),
    pedidoId: get(r, headers, "ID Pedido"),
    pedidoNumero: get(r, headers, "ID Pedido"),
    clienteNome: "",
    tipo: get(r, headers, "Observacao"),
    valor: get(r, headers, "Valor"),
    formaPagamento: get(r, headers, "Forma Pagamento"),
    data: get(r, headers, "Data"),
    observacoes: get(r, headers, "Observacao")
  })).filter((f) => f.id);
});
const testWrite_createServerFn_handler = createServerRpc({
  id: "d84674c9ee9ea7f8e7940d9cc8ccb6c4bd3b5595a7992e6ac6ff3f8f88f3e654",
  name: "testWrite",
  filename: "src/lib/sheets.functions.ts"
}, (opts) => testWrite.__executeServer(opts));
const testWrite = createServerFn({
  method: "POST"
}).handler(testWrite_createServerFn_handler, async () => {
  try {
    const stamp = `OK ${(/* @__PURE__ */ new Date()).toISOString()}`;
    await setValues("Configuracoes!Z100", [[stamp]]);
    await setValues("Configuracoes!Z100", [[""]]);
    return {
      ok: true,
      message: "Escrita confirmada. Conexão com permissão de Editor."
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return {
      ok: false,
      message: msg
    };
  }
});
const listProdutosPublico_createServerFn_handler = createServerRpc({
  id: "e3ac09efebc3d5a257d46c97e9f008a728541f9f825ded86517a90c2dec4265b",
  name: "listProdutosPublico",
  filename: "src/lib/sheets.functions.ts"
}, (opts) => listProdutosPublico.__executeServer(opts));
const listProdutosPublico = createServerFn({
  method: "GET"
}).handler(listProdutosPublico_createServerFn_handler, async () => {
  const {
    headers,
    rows
  } = await readTable("Produtos");
  return rows.filter((r) => {
    const nome = get(r, headers, "Produto");
    const ativo = String(get(r, headers, "Ativo") || "Sim").trim().toLowerCase();
    return nome && ativo !== "não" && ativo !== "nao" && ativo !== "false" && ativo !== "0" && ativo !== "inativo";
  }).map((r) => ({
    id: get(r, headers, "ID Produto"),
    nome: get(r, headers, "Produto"),
    categoria: get(r, headers, "Categoria"),
    descricao: get(r, headers, "Descricao") || get(r, headers, "Descrição"),
    imagem: get(r, headers, "Imagem"),
    preco: get(r, headers, "Preco") || get(r, headers, "Preço"),
    unidade: "unidade"
  }));
});
const pedidoPublicoInput = objectType({
  produtoId: stringType().min(1).max(120),
  produtoNome: stringType().min(1).max(255),
  preco: numberType().min(0).max(1e6).default(0),
  quantidade: numberType().min(1).max(999).default(1),
  clienteNome: stringType().min(2).max(120),
  whatsapp: stringType().min(8).max(40),
  dataDesejada: stringType().max(40).default(""),
  horaDesejada: stringType().max(10).default(""),
  rua: stringType().max(120).default(""),
  numero: stringType().max(20).default(""),
  bairro: stringType().max(80).default(""),
  cidade: stringType().max(80).default(""),
  observacoes: stringType().max(800).default("")
});
const createPedidoPublico_createServerFn_handler = createServerRpc({
  id: "8f39f317fbdd81930f60116d968149dd1a4d84569b81662e011620a752d29d72",
  name: "createPedidoPublico",
  filename: "src/lib/sheets.functions.ts"
}, (opts) => createPedidoPublico.__executeServer(opts));
const createPedidoPublico = createServerFn({
  method: "POST"
}).inputValidator(pedidoPublicoInput).handler(createPedidoPublico_createServerFn_handler, async ({
  data
}) => {
  const qty = data.quantidade > 0 ? data.quantidade : 1;
  const preco = data.preco > 0 ? data.preco : 0;
  const total = preco * qty;
  if (total <= 0) {
    throw new Error("Valor total inválido. Verifique o preço do produto.");
  }
  const waNorm = normalizePhone(data.whatsapp);
  const enderecoFmt = [[data.rua, data.numero].filter(Boolean).join(", "), data.bairro, data.cidade].filter(Boolean).join(" - ");
  const clientes = await listClientes();
  const existing = clientes.find((c) => normalizePhone(c.whatsapp) === waNorm);
  let clienteId = existing?.id ?? "";
  if (!clienteId) {
    clienteId = newId("CLI");
    await appendRecord("Clientes", {
      "ID Cliente": clienteId,
      Nome: data.clienteNome,
      WhatsApp: waNorm,
      Endereco: enderecoFmt,
      Observacoes: "Cliente do catálogo público"
    });
  } else if (enderecoFmt) {
    const row = await findRow("Clientes", "ID Cliente", clienteId);
    if (row > 0) {
      await updateRecord("Clientes", row, {
        Nome: data.clienteNome,
        Endereco: enderecoFmt
      });
    }
  }
  try {
    const usuarios = await listUsuariosRaw();
    if (!usuarios.find((u) => normalizePhone(u.whatsapp) === waNorm)) {
      await appendRecord("Usuarios", {
        "ID Usuario": newId("USR"),
        Nome: data.clienteNome,
        WhatsApp: waNorm,
        Perfil: "CLIENTE",
        Status: "Ativo"
      });
    }
  } catch {
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
    Observacoes: data.observacoes
  });
  return {
    id,
    total,
    entradaMinima: total * 0.5
  };
});
const CFG_KEYS = ["nome", "whatsapp", "instagram", "endereco", "chavePix", "tipoPix", "nomeRecebedor", "banco"];
const CFG_LABELS = {
  nome: "Nome Confeitaria",
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  endereco: "Endereço",
  chavePix: "Chave Pix",
  tipoPix: "Tipo Chave Pix",
  nomeRecebedor: "Nome Recebedor",
  banco: "Banco"
};
const defaultConfig = () => ({
  nome: "Cakes By Jack",
  whatsapp: "",
  instagram: "",
  endereco: "",
  chavePix: "",
  tipoPix: "",
  nomeRecebedor: "",
  banco: ""
});
const getConfig_createServerFn_handler = createServerRpc({
  id: "c63d94b1ce53588134a59235954df1b731a7f61921ffecaf7bdcee5284737d49",
  name: "getConfig",
  filename: "src/lib/sheets.functions.ts"
}, (opts) => getConfig.__executeServer(opts));
const getConfig = createServerFn({
  method: "GET"
}).handler(getConfig_createServerFn_handler, async () => {
  const cfg = defaultConfig();
  try {
    const rows = await getValues("Configuracoes!A2:B40");
    const byLabel = {};
    for (const r of rows) {
      const label = (r[0] ?? "").toString().trim();
      const value = (r[1] ?? "").toString();
      if (label) byLabel[label] = value;
    }
    for (const key of CFG_KEYS) {
      const lbl = CFG_LABELS[key];
      if (byLabel[lbl] !== void 0) cfg[key] = byLabel[lbl];
    }
  } catch {
  }
  return cfg;
});
const updateConfig_createServerFn_handler = createServerRpc({
  id: "fc90d3a63e9c994be1e2879d8c2acb401f0d097054609e936fde4726c5894df6",
  name: "updateConfig",
  filename: "src/lib/sheets.functions.ts"
}, (opts) => updateConfig.__executeServer(opts));
const updateConfig = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  nome: stringType().max(120).default(""),
  whatsapp: stringType().max(40).default(""),
  instagram: stringType().max(120).default(""),
  endereco: stringType().max(255).default(""),
  chavePix: stringType().max(255).default(""),
  tipoPix: stringType().max(40).default(""),
  nomeRecebedor: stringType().max(120).default(""),
  banco: stringType().max(120).default("")
})).handler(updateConfig_createServerFn_handler, async ({
  data
}) => {
  const values = CFG_KEYS.map((k) => [CFG_LABELS[k], data[k] ?? ""]);
  while (values.length < 20) values.push(["", ""]);
  await setValues("Configuracoes!A2:B21", values);
  return {
    ok: true
  };
});
const USUARIOS_TAB = "Usuarios";
async function listUsuariosRaw() {
  try {
    const {
      headers,
      rows
    } = await readTable(USUARIOS_TAB);
    return rows.map((r) => ({
      id: get(r, headers, "ID Usuario"),
      nome: get(r, headers, "Nome"),
      whatsapp: get(r, headers, "WhatsApp"),
      perfil: (get(r, headers, "Perfil") || "CLIENTE").toUpperCase(),
      status: get(r, headers, "Status") || "Ativo",
      observacoes: ""
    })).filter((u) => u.id || u.nome);
  } catch {
    return [];
  }
}
const listUsuarios_createServerFn_handler = createServerRpc({
  id: "587e35c06077c25c5093243f337ebb6ffad1be7785c2cd09f8d49a169cea4a3c",
  name: "listUsuarios",
  filename: "src/lib/sheets.functions.ts"
}, (opts) => listUsuarios.__executeServer(opts));
const listUsuarios = createServerFn({
  method: "GET"
}).handler(listUsuarios_createServerFn_handler, async () => listUsuariosRaw());
const usuarioInput = objectType({
  nome: stringType().min(1).max(120),
  whatsapp: stringType().min(8).max(40),
  perfil: enumType(["ADMIN", "OWNER", "CLIENTE"]).default("CLIENTE"),
  status: stringType().max(40).default("Ativo"),
  observacoes: stringType().max(500).default("")
});
const createUsuario_createServerFn_handler = createServerRpc({
  id: "7f12810f7dcc5f91dc523d17c2438b1ce8764e57a89c4125f15a7591f3e86404",
  name: "createUsuario",
  filename: "src/lib/sheets.functions.ts"
}, (opts) => createUsuario.__executeServer(opts));
const createUsuario = createServerFn({
  method: "POST"
}).inputValidator(usuarioInput).handler(createUsuario_createServerFn_handler, async ({
  data
}) => {
  const id = newId("USR");
  await appendRecord(USUARIOS_TAB, {
    "ID Usuario": id,
    Nome: data.nome,
    WhatsApp: normalizePhone(data.whatsapp),
    Perfil: data.perfil,
    Status: data.status
  });
  return {
    id
  };
});
const updateUsuario_createServerFn_handler = createServerRpc({
  id: "de300c9fad2579904e8a1cee65cf1eb0163b37cc76ca31c434760f2761d91a43",
  name: "updateUsuario",
  filename: "src/lib/sheets.functions.ts"
}, (opts) => updateUsuario.__executeServer(opts));
const updateUsuario = createServerFn({
  method: "POST"
}).inputValidator(usuarioInput.extend({
  id: stringType().min(1)
})).handler(updateUsuario_createServerFn_handler, async ({
  data
}) => {
  const row = await findRow(USUARIOS_TAB, "ID Usuario", data.id);
  if (row < 0) throw new Error("Usuário não encontrado");
  await updateRecord(USUARIOS_TAB, row, {
    Nome: data.nome,
    WhatsApp: normalizePhone(data.whatsapp),
    Perfil: data.perfil,
    Status: data.status
  });
  return {
    ok: true
  };
});
const deleteUsuario_createServerFn_handler = createServerRpc({
  id: "2e3e59eeadd7bcf6a66d9677593158f64348428cf5a0bd3a5831ff8f3462de7c",
  name: "deleteUsuario",
  filename: "src/lib/sheets.functions.ts"
}, (opts) => deleteUsuario.__executeServer(opts));
const deleteUsuario = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().min(1)
})).handler(deleteUsuario_createServerFn_handler, async ({
  data
}) => {
  const row = await findRow(USUARIOS_TAB, "ID Usuario", data.id);
  if (row < 0) throw new Error("Usuário não encontrado");
  await updateRecord(USUARIOS_TAB, row, {
    Status: "Removido",
    Nome: "",
    WhatsApp: ""
  });
  return {
    ok: true
  };
});
export {
  checkSetup_createServerFn_handler,
  createCliente_createServerFn_handler,
  createInsumo_createServerFn_handler,
  createPedidoPublico_createServerFn_handler,
  createPedido_createServerFn_handler,
  createProduto_createServerFn_handler,
  createUsuario_createServerFn_handler,
  deleteProduto_createServerFn_handler,
  deleteUsuario_createServerFn_handler,
  getConfig_createServerFn_handler,
  initSpreadsheet_createServerFn_handler,
  listClientes_createServerFn_handler,
  listCustosAdicionais_createServerFn_handler,
  listFichas_createServerFn_handler,
  listFinanceiro_createServerFn_handler,
  listInsumos_createServerFn_handler,
  listPedidos_createServerFn_handler,
  listProdutosPublico_createServerFn_handler,
  listProdutos_createServerFn_handler,
  listUsuarios_createServerFn_handler,
  testWrite_createServerFn_handler,
  updateConfig_createServerFn_handler,
  updateInsumoEstoque_createServerFn_handler,
  updatePedidoPagamento_createServerFn_handler,
  updatePedidoStatus_createServerFn_handler,
  updateProduto_createServerFn_handler,
  updateUsuario_createServerFn_handler,
  upsertFicha_createServerFn_handler
};
