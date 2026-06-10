import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as AppLayout } from "./app-layout-DIK50as0.mjs";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-Bbtrid8Y.mjs";
import { B as Button } from "./brand-logo-3iPsG8o9.mjs";
import { B as Badge } from "./badge-PNZ8Owsm.mjs";
import { D as Dialog } from "./dialog-DsEyClLt.mjs";
import { l as listPedidos } from "./router-CTVFEuqq.mjs";
import { b as parseMoney, v as valorRecebido, a as formatBRL, s as situacaoReal } from "./format-DkCAcujl.mjs";
import { E as EditPagamentoDialog } from "./edit-pagamento-dialog-_5xFhWM2.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { d as TrendingUp, e as DollarSign, f as Clock, g as Pencil } from "../_libs/lucide-react.mjs";
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
import "./server-D3ktv3JL.mjs";
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
import "./useServerFn-DL2oePlL.mjs";
import "./label-tl_MnXN1.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "./select-CmacHktB.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
function isAtivo(p) {
  return p.status !== "Cancelado" && p.status !== "Recusado";
}
function FinanceiroPage() {
  const {
    data: pedidos = []
  } = useQuery({
    queryKey: ["pedidos"],
    queryFn: () => listPedidos()
  });
  const [editing, setEditing] = reactExports.useState(null);
  const ativos = reactExports.useMemo(() => pedidos.filter(isAtivo), [pedidos]);
  const totals = reactExports.useMemo(() => {
    const total = ativos.reduce((s, p) => s + parseMoney(p.valorTotal), 0);
    const recebido = ativos.reduce((s, p) => s + valorRecebido(p.valorTotal, p.entrada, p.saldo), 0);
    return {
      total,
      recebido,
      aReceber: Math.max(0, total - recebido)
    };
  }, [ativos]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { title: "Financeiro", subtitle: "Controle de recebimentos e saldos", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(KPI, { label: "Faturamento total", value: formatBRL(totals.total), icon: TrendingUp, tint: "bg-gradient-primary text-primary-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KPI, { label: "Recebido", value: formatBRL(totals.recebido), icon: DollarSign, tint: "bg-success/15 text-success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KPI, { label: "A receber", value: formatBRL(totals.aReceber), icon: Clock, tint: "bg-warning/20 text-warning" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display", children: "Pedidos & pagamentos" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
        pedidos.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Sem pedidos ainda." }),
        pedidos.map((p) => {
          const sit = situacaoReal(p.valorTotal, p.entrada, p.saldo);
          const total = parseMoney(p.valorTotal);
          const pago = parseMoney(p.entrada);
          const saldoCalc = Math.max(0, total - pago);
          const cancelled = !isAtivo(p);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex flex-col gap-3 rounded-xl border bg-card p-4 transition hover:shadow-soft sm:flex-row sm:items-center sm:justify-between ${cancelled ? "border-border/40 opacity-60" : "border-border/60"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-medium", children: p.clienteNome }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-gold/40 text-gold-foreground", children: p.numero }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: sitColor(sit), children: sit }),
                cancelled && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-destructive/40 text-destructive", children: p.status })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: p.produto }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Total: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: formatBRL(total) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Entrada: ",
                  formatBRL(pago)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Saldo: ",
                  formatBRL(saldoCalc)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: p.formaPagamento })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => setEditing(p), className: "self-start sm:self-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
              " Pagamento"
            ] })
          ] }, p.id);
        })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!editing, onOpenChange: (o) => !o && setEditing(null), children: editing && /* @__PURE__ */ jsxRuntimeExports.jsx(EditPagamentoDialog, { pedido: editing, onDone: () => setEditing(null) }) })
  ] });
}
function sitColor(s) {
  if (s === "Pago integral") return "bg-success/15 text-success";
  if (s === "Entrada recebida") return "bg-warning/20 text-warning";
  return "bg-destructive/15 text-destructive";
}
function KPI({
  label,
  value,
  icon: Icon,
  tint
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-center justify-between p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display mt-2 truncate text-2xl font-semibold", children: value })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${tint}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) })
  ] }) });
}
export {
  FinanceiroPage as component
};
