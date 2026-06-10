import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery, b as useQueryClient, a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { A as AppLayout } from "./app-layout-DTll7bnX.mjs";
import { C as Card, c as CardContent } from "./card-Bbtrid8Y.mjs";
import { B as Button, I as Input } from "./brand-logo-3iPsG8o9.mjs";
import { L as Label } from "./label-tl_MnXN1.mjs";
import { T as Textarea } from "./textarea-CYCFuD-O.mjs";
import { B as Badge } from "./badge-PNZ8Owsm.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CmacHktB.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogFooter } from "./dialog-DsEyClLt.mjs";
import { j as listFichas, b as listProdutos, k as upsertFicha, f as listInsumos, m as listCustosAdicionais } from "./router-v0dzu4GX.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { h as ChefHat, c as Plus, L as LoaderCircle } from "../_libs/lucide-react.mjs";
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
import "./nexo-signature-6kPfTCBv.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "./server-PLKfWEBp.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "./sheets.server-e71hR5JP.mjs";
import "../_libs/zod.mjs";
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
  const margem = Number(ficha.margem) || 0;
  const cor = margem >= 50 ? "bg-success/15 text-success" : margem >= 25 ? "bg-warning/20 text-warning" : "bg-destructive/15 text-destructive";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border/60 shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold", children: ficha.produtoNome }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-line text-xs text-muted-foreground", children: ficha.ingredientes })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: cor, children: [
        margem.toFixed(1),
        "% margem"
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
    custoTotal: 0,
    precoVenda: 0,
    observacoes: ""
  });
  const produto = produtos.find((p) => p.id === form.produtoId);
  function calcularCustoIngredientes() {
    const linhas = form.ingredientes.split("\n").map((linha) => linha.trim()).filter(Boolean);
    let total = 0;
    for (const linha of linhas) {
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
  const custoIngredientes = calcularCustoIngredientes();
  const custoAdicional = custosAdicionais.reduce((acc, c) => acc + parseMoney(c.valor), 0);
  const custoCalculado = custoIngredientes + custoAdicional;
  const lucro = form.precoVenda - form.custoTotal;
  const margem = form.precoVenda > 0 ? lucro / form.precoVenda * 100 : 0;
  const mut = useMutation({
    mutationFn: () => upsert({
      data: {
        produtoId: form.produtoId,
        produtoNome: produto ? `${produto.categoria} • ${produto.nome}` : "",
        ingredientes: form.ingredientes,
        custoTotal: form.custoTotal,
        precoVenda: form.precoVenda,
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-2xl", children: "Ficha Técnica" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Produto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.produtoId, onValueChange: (v) => {
        const p = produtos.find((x) => x.id === v);
        setForm({
          ...form,
          produtoId: v,
          precoVenda: p ? Number(String(p.preco).replace(",", ".")) : 0
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
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Ingredientes & quantidades" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 5, placeholder: `Digite um insumo por linha. Ex:
Leite Condensado 1
Leite Ninho 2
Morango 3`, value: form.ingredientes, onChange: (e) => setForm({
        ...form,
        ingredientes: e.target.value
      }) }),
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
        custoTotal: Number(custoCalculado.toFixed(2))
      }), children: "Usar custo calculado" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Custo total editável (R$)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.01", value: form.custoTotal, onChange: (e) => setForm({
            ...form,
            custoTotal: +e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Preço de venda (R$)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.01", value: form.precoVenda, onChange: (e) => setForm({
            ...form,
            precoVenda: +e.target.value
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { disabled: !form.produtoId || mut.isPending, onClick: () => mut.mutate(), className: "bg-gradient-primary", children: [
      mut.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
      "Salvar ficha"
    ] }) })
  ] });
}
export {
  FichaPage as component
};
