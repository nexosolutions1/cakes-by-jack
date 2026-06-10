import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery, b as useQueryClient, a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { A as AppLayout } from "./app-layout-C5cMwNkQ.mjs";
import { C as Card, c as CardContent } from "./card-Bbtrid8Y.mjs";
import { B as Button, I as Input } from "./brand-logo-3iPsG8o9.mjs";
import { L as Label } from "./label-tl_MnXN1.mjs";
import { B as Badge } from "./badge-PNZ8Owsm.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogFooter } from "./dialog-DsEyClLt.mjs";
import { f as listInsumos, g as updateInsumoEstoque, h as createInsumo } from "./router-BmN7q33C.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { b as parseMoney } from "./format-DkCAcujl.mjs";
import "../_libs/seroval.mjs";
import { c as Plus, B as Boxes, T as TriangleAlert, L as LoaderCircle } from "../_libs/lucide-react.mjs";
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
import "./server-CBnRcYXi.mjs";
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
function status(i) {
  const atual = Number(i.estoqueAtual) || 0;
  const min = Number(i.estoqueMinimo) || 0;
  if (atual <= 0) return {
    label: "Crítico",
    color: "bg-destructive/15 text-destructive"
  };
  if (atual <= min) return {
    label: "Baixo",
    color: "bg-warning/20 text-warning"
  };
  return {
    label: "Normal",
    color: "bg-success/15 text-success"
  };
}
function InsumosPage() {
  const {
    data: insumos = [],
    isLoading
  } = useQuery({
    queryKey: ["insumos"],
    queryFn: () => listInsumos()
  });
  const [open, setOpen] = reactExports.useState(false);
  const alerts = reactExports.useMemo(() => insumos.filter((i) => status(i).label !== "Normal").length, [insumos]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { title: "Estoque & Insumos", subtitle: `${insumos.length} insumos${alerts ? ` • ${alerts} em alerta` : ""}`, actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-gradient-primary shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
      " Novo insumo"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NovoInsumoDialog, { onDone: () => setOpen(false) })
  ] }), children: [
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Carregando..." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 md:grid-cols-2 lg:grid-cols-3", children: insumos.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(InsumoCard, { insumo: i }, i.id)) })
  ] });
}
function InsumoCard({
  insumo
}) {
  const s = status(insumo);
  const update = useServerFn(updateInsumoEstoque);
  const qc = useQueryClient();
  const [value, setValue] = reactExports.useState(insumo.estoqueAtual);
  const mut = useMutation({
    mutationFn: (v) => update({
      data: {
        id: insumo.id,
        estoqueAtual: v
      }
    }),
    onSuccess: () => {
      toast.success("Estoque atualizado");
      qc.invalidateQueries({
        queryKey: ["insumos"]
      });
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border/60 shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-rose flex h-9 w-9 items-center justify-center rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Boxes, { className: "h-4 w-4 text-rose-deep" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium leading-tight", children: insumo.nome }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "R$ ",
            parseMoney(insumo.valorUnitario).toFixed(2),
            " / ",
            insumo.unidade
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: s.color, children: [
        s.label === "Crítico" && /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mr-1 h-3 w-3" }),
        s.label
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "Estoque atual" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value, onChange: (e) => setValue(e.target.value), onBlur: () => Number(value) !== Number(insumo.estoqueAtual) && mut.mutate(Number(value)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "Mínimo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: insumo.estoqueMinimo, disabled: true, className: "bg-muted" })
      ] })
    ] })
  ] }) });
}
function NovoInsumoDialog({
  onDone
}) {
  const create = useServerFn(createInsumo);
  const qc = useQueryClient();
  const [form, setForm] = reactExports.useState({
    nome: "",
    unidade: "kg",
    estoqueAtual: 0,
    estoqueMinimo: 0,
    valorUnitario: 0,
    observacoes: ""
  });
  const mut = useMutation({
    mutationFn: () => create({
      data: form
    }),
    onSuccess: () => {
      toast.success("Insumo cadastrado");
      qc.invalidateQueries({
        queryKey: ["insumos"]
      });
      onDone();
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-2xl", children: "Novo insumo" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nome" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.nome, onChange: (e) => setForm({
        ...form,
        nome: e.target.value
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Unidade" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.unidade, onChange: (e) => setForm({
            ...form,
            unidade: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Valor unitário" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.01", value: form.valorUnitario, onChange: (e) => setForm({
            ...form,
            valorUnitario: +e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Estoque atual" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.estoqueAtual, onChange: (e) => setForm({
            ...form,
            estoqueAtual: +e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Estoque mínimo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.estoqueMinimo, onChange: (e) => setForm({
            ...form,
            estoqueMinimo: +e.target.value
          }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { disabled: !form.nome || mut.isPending, onClick: () => mut.mutate(), className: "bg-gradient-primary", children: [
      mut.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
      "Salvar"
    ] }) })
  ] });
}
export {
  InsumosPage as component
};
