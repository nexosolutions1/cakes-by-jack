import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery, b as useQueryClient, a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { A as AppLayout } from "./app-layout-CxpNs-BW.mjs";
import { C as Card, c as CardContent } from "./card-acCiEC5p.mjs";
import { s as listFichas, b as listProdutos, D as Dialog, k as DialogTrigger, B as Button, v as deleteFicha, w as updateFicha, e as DialogContent, f as DialogHeader, g as DialogTitle, L as Label, I as Input, T as Textarea, h as DialogFooter, x as upsertFicha, j as listInsumos, y as listCustosAdicionais } from "./router-C4tcv7sc.mjs";
import { B as Badge } from "./badge-Do_NBdl2.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DaYoE1iY.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { i as ChefHat, c as Plus, d as Pencil, T as Trash2, L as LoaderCircle } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/radix-ui__react-separator.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "./brand-logo-C_BRZq5w.mjs";
import "./nexo-signature-XrLnPLze.mjs";
import "./server-DoEYPU5W.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "./sheets.server-OHrRPQqp.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
function currencyInputToNumber(value) {
  const onlyNumbers = String(value || "").replace(/\D/g, "");
  return Number(onlyNumbers || 0) / 100;
}
function formatCurrencyInput(value) {
  return currencyInputToNumber(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}
function numberToCurrencyInput(value) {
  return Number(value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}
function parseMoney(value) {
  if (value === void 0 || value === null) return 0;
  if (typeof value === "number") return value;
  const cleaned = String(value).replace("R$", "").replace(/\s/g, "").replace(/\./g, "").replace(",", ".");
  return Number(cleaned) || 0;
}
function normalizeText(value) {
  return String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}
function FichaPage() {
  const {
    data: fichas = []
  } = useQuery({
    queryKey: ["fichas"],
    queryFn: () => listFichas()
  });
  const {
    data: produtos = []
  } = useQuery({
    queryKey: ["produtos"],
    queryFn: () => listProdutos()
  });
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { title: "Ficha Técnica", subtitle: "Receitas, custos e margens", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-gradient-primary shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
      " Nova ficha"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FichaDialog, { produtos, onDone: () => setOpen(false) })
  ] }), children: fichas.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-dashed", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2 py-12 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "mx-auto h-10 w-10 text-rose-deep" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Cadastre as fichas técnicas dos seus produtos para calcular custos e margem." })
  ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 md:grid-cols-2", children: fichas.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(FichaCard, { ficha: f }, f.id)) }) });
}
function FichaCard({
  ficha
}) {
  const remove = useServerFn(deleteFicha);
  const updateFichaFn = useServerFn(updateFicha);
  const [editOpen, setEditOpen] = reactExports.useState(false);
  const [editForm, setEditForm] = reactExports.useState({
    produtoId: ficha.produtoId,
    produtoNome: ficha.produtoNome,
    ingredientes: ficha.ingredientes,
    custoTotal: numberToCurrencyInput(Number(ficha.custoTotal)),
    precoVenda: numberToCurrencyInput(Number(ficha.precoVenda)),
    observacoes: ficha.observacoes || ""
  });
  const qc = useQueryClient();
  const margem = Number(ficha.margem) || 0;
  const cor = margem >= 50 ? "bg-success/15 text-success" : margem >= 25 ? "bg-warning/20 text-warning" : "bg-destructive/15 text-destructive";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border/60 shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold", children: ficha.produtoNome }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-line text-xs text-muted-foreground", children: ficha.ingredientes })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: cor, children: [
          margem.toFixed(1),
          "% margem"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: editOpen, onOpenChange: setEditOpen, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 text-blue-500 hover:text-blue-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Editar Ficha Técnica" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Produto" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: editForm.produtoNome, disabled: true, className: "bg-muted" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Ingredientes" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 5, value: editForm.ingredientes, onChange: (e) => setEditForm({
                  ...editForm,
                  ingredientes: e.target.value
                }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Custo total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { inputMode: "numeric", value: editForm.custoTotal, onChange: (e) => setEditForm({
                  ...editForm,
                  custoTotal: formatCurrencyInput(e.target.value)
                }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Preço de venda" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { inputMode: "numeric", value: editForm.precoVenda, onChange: (e) => setEditForm({
                  ...editForm,
                  precoVenda: formatCurrencyInput(e.target.value)
                }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-gradient-primary", onClick: () => updateFichaFn({
              data: {
                id: ficha.id,
                produtoId: editForm.produtoId,
                produtoNome: editForm.produtoNome,
                ingredientes: editForm.ingredientes,
                custoTotal: currencyInputToNumber(editForm.custoTotal),
                precoVenda: currencyInputToNumber(editForm.precoVenda),
                observacoes: editForm.observacoes
              }
            }).then(() => {
              toast.success("Ficha atualizada");
              qc.invalidateQueries({
                queryKey: ["fichas"]
              });
              setEditOpen(false);
            }), children: "Salvar alterações" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 text-red-500 hover:text-red-600", onClick: async () => {
          if (!confirm(`Excluir ficha "${ficha.produtoNome}"?`)) return;
          await remove({
            data: {
              id: ficha.id
            }
          });
          await qc.invalidateQueries({
            queryKey: ["fichas"]
          });
          toast.success("Ficha excluída");
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 rounded-xl bg-muted/40 p-3 text-center text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { label: "Custo", value: `R$ ${ficha.custoTotal}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { label: "Venda", value: `R$ ${ficha.precoVenda}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { label: "Lucro", value: `R$ ${ficha.lucroBruto}` })
    ] })
  ] }) });
}
function Cell({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: value })
  ] });
}
function FichaDialog({
  produtos,
  onDone
}) {
  const upsert = useServerFn(upsertFicha);
  const qc = useQueryClient();
  const {
    data: insumos = []
  } = useQuery({
    queryKey: ["insumos"],
    queryFn: () => listInsumos()
  });
  const {
    data: custosAdicionais = []
  } = useQuery({
    queryKey: ["custos-adicionais"],
    queryFn: () => listCustosAdicionais()
  });
  const [form, setForm] = reactExports.useState({
    produtoId: "",
    ingredientes: "",
    custoTotal: "",
    precoVenda: "",
    observacoes: ""
  });
  const [novoInsumo, setNovoInsumo] = reactExports.useState({
    insumoId: "",
    quantidade: ""
  });
  const produto = produtos.find((p) => p.id === form.produtoId);
  const ingredientesSelecionados = form.ingredientes.split("\n").map((linha) => linha.trim()).filter(Boolean);
  function calcularCustoIngredientes() {
    let total = 0;
    for (const linha of ingredientesSelecionados) {
      const qtdMatch = linha.match(/(\d+[,.]?\d*)\s*$/);
      const quantidade = qtdMatch ? Number(qtdMatch[1].replace(",", ".")) : 1;
      const nomeLinha = normalizeText(linha.replace(/(\d+[,.]?\d*)\s*$/, "").trim());
      const insumo = insumos.find((i) => {
        const nomeInsumo = normalizeText(i.nome);
        return nomeLinha.includes(nomeInsumo) || nomeInsumo.includes(nomeLinha);
      });
      if (insumo) {
        total += quantidade * parseMoney(insumo.valorUnitario);
      }
    }
    return total;
  }
  function adicionarInsumo() {
    const insumo = insumos.find((i) => i.id === novoInsumo.insumoId);
    if (!insumo) {
      toast.error("Selecione um insumo");
      return;
    }
    const quantidade = novoInsumo.quantidade === "" ? 1 : Number(novoInsumo.quantidade);
    const linha = `${insumo.nome} ${quantidade}`;
    setForm({
      ...form,
      ingredientes: [...ingredientesSelecionados, linha].join("\n")
    });
    setNovoInsumo({
      insumoId: "",
      quantidade: ""
    });
  }
  function removerIngrediente(index) {
    const novasLinhas = ingredientesSelecionados.filter((_, i) => i !== index);
    setForm({
      ...form,
      ingredientes: novasLinhas.join("\n")
    });
  }
  const custoIngredientes = calcularCustoIngredientes();
  const custoAdicional = custosAdicionais.reduce((acc, c) => acc + parseMoney(c.valor), 0);
  const custoCalculado = custoIngredientes + custoAdicional;
  const custoTotalNumber = currencyInputToNumber(form.custoTotal);
  const precoVendaNumber = currencyInputToNumber(form.precoVenda);
  const lucro = precoVendaNumber - custoTotalNumber;
  const margem = precoVendaNumber > 0 ? lucro / precoVendaNumber * 100 : 0;
  const mut = useMutation({
    mutationFn: () => upsert({
      data: {
        produtoId: form.produtoId,
        produtoNome: produto ? `${produto.categoria} • ${produto.nome}` : "",
        ingredientes: form.ingredientes,
        custoTotal: custoTotalNumber,
        precoVenda: precoVendaNumber,
        observacoes: form.observacoes
      }
    }),
    onSuccess: () => {
      toast.success("Ficha salva");
      qc.invalidateQueries({
        queryKey: ["fichas"]
      });
      onDone();
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[92vh] max-w-2xl overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-2xl", children: "Ficha Técnica" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Produto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.produtoId, onValueChange: (v) => {
          const p = produtos.find((x) => x.id === v);
          setForm({
            ...form,
            produtoId: v,
            precoVenda: p ? numberToCurrencyInput(Number(String(p.preco).replace(",", "."))) : ""
          });
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Selecione" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "max-h-72", children: produtos.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: p.id, children: [
            p.categoria,
            " • ",
            p.tipo,
            " • ",
            p.nome
          ] }, p.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/60 bg-card/60 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Ingredientes da receita" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 grid gap-2 sm:grid-cols-[1fr_120px_auto]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: novoInsumo.insumoId, onValueChange: (v) => setNovoInsumo({
            ...novoInsumo,
            insumoId: v
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Selecione o insumo" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "max-h-72", children: insumos.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: i.id, children: [
              i.nome,
              " — R$ ",
              parseMoney(i.valorUnitario).toFixed(2)
            ] }, i.id)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 0.01, step: "0.01", value: novoInsumo.quantidade, onChange: (e) => setNovoInsumo({
            ...novoInsumo,
            quantidade: e.target.value
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", onClick: adicionarInsumo, className: "bg-gradient-primary", children: "Adicionar" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 space-y-2", children: ingredientesSelecionados.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-lg bg-muted/40 p-3 text-sm text-muted-foreground", children: "Nenhum ingrediente adicionado ainda." }) : ingredientesSelecionados.map((linha, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border border-border/60 bg-background px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: linha }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", size: "sm", variant: "ghost", onClick: () => removerIngrediente(index), className: "text-destructive hover:text-destructive", children: "Remover" })
        ] }, `${linha}-${index}`)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 rounded-xl bg-rose-soft/40 p-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          "Ingredientes:",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
            " R$ ",
            custoIngredientes.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          "Extras:",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
            " R$ ",
            custoAdicional.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          "Calculado:",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
            " R$ ",
            custoCalculado.toFixed(2)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => setForm({
        ...form,
        custoTotal: numberToCurrencyInput(Number(custoCalculado.toFixed(2)))
      }), children: "Usar custo calculado" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Custo total editável (R$)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { inputMode: "numeric", placeholder: "R$ 0,00", value: form.custoTotal, onChange: (e) => setForm({
            ...form,
            custoTotal: formatCurrencyInput(e.target.value)
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Preço de venda (R$)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { inputMode: "numeric", placeholder: "R$ 0,00", value: form.precoVenda, onChange: (e) => setForm({
            ...form,
            precoVenda: formatCurrencyInput(e.target.value)
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 rounded-xl bg-rose-soft/40 p-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          "Lucro bruto:",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
            " R$ ",
            lucro.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          "Margem:",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
            " ",
            margem.toFixed(1),
            "%"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { disabled: !form.produtoId || ingredientesSelecionados.length === 0 || mut.isPending, onClick: () => mut.mutate(), className: "bg-gradient-primary", children: [
      mut.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
      "Salvar ficha"
    ] }) })
  ] });
}
export {
  FichaPage as component
};
