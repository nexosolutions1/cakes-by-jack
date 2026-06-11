import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useIsMobile, A as AppLayout } from "./app-layout-Bh3N7kPK.mjs";
import { C as Card, c as CardContent, a as CardHeader, b as CardTitle } from "./card-Bbtrid8Y.mjs";
import { B as Button } from "./brand-logo-3iPsG8o9.mjs";
import { B as Badge } from "./badge-PNZ8Owsm.mjs";
import { l as listPedidos } from "./router-DrEiKWY7.mjs";
import { d as dateKey, p as parseDateSafe, f as formatDateBR } from "./format-DkCAcujl.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { n as ChevronLeft, o as ChevronRight } from "../_libs/lucide-react.mjs";
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
import "./server-BK6vLts3.mjs";
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
import "./sheets.server-OHrRPQqp.mjs";
import "../_libs/zod.mjs";
const WEEK = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
function classify(p) {
  if (p.status === "Aguardando confirmação") return {
    dot: "bg-primary/25 text-primary",
    border: "border-primary/40"
  };
  if (p.situacaoPagamento === "Pago integral") return {
    dot: "bg-success/20 text-success",
    border: "border-success/40"
  };
  if (p.situacaoPagamento === "Entrada recebida") return {
    dot: "bg-warning/25 text-warning",
    border: "border-warning/40"
  };
  return {
    dot: "bg-destructive/15 text-destructive",
    border: "border-destructive/40"
  };
}
function CalendarioPage() {
  const {
    data: pedidos = []
  } = useQuery({
    queryKey: ["pedidos"],
    queryFn: () => listPedidos()
  });
  const isMobile = useIsMobile();
  const [cursor, setCursor] = reactExports.useState(() => {
    const d = /* @__PURE__ */ new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const days = reactExports.useMemo(() => buildMonthGrid(cursor), [cursor]);
  const visible = pedidos.filter((p) => p.status !== "Recusado" && p.status !== "Cancelado");
  const byDate = reactExports.useMemo(() => {
    const m = {};
    for (const p of visible) {
      const k = dateKey(p.dataEntrega);
      if (!k) continue;
      (m[k] ??= []).push(p);
    }
    return m;
  }, [visible]);
  const semData = visible.filter((p) => !parseDateSafe(p.dataEntrega));
  const todayKey = dateKey(/* @__PURE__ */ new Date());
  if (isMobile) {
    const todasComData = visible.filter((p) => parseDateSafe(p.dataEntrega)).sort((a, b) => +(parseDateSafe(a.dataEntrega) ?? 0) - +(parseDateSafe(b.dataEntrega) ?? 0));
    const grupos = /* @__PURE__ */ new Map();
    for (const p of todasComData) {
      const k = dateKey(p.dataEntrega);
      if (!grupos.has(k)) grupos.set(k, []);
      grupos.get(k).push(p);
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { title: "Agenda de produção", subtitle: "Lista de entregas", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      grupos.size === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm text-muted-foreground py-8", children: "Nenhum pedido agendado." }),
      Array.from(grupos.entries()).map(([k, items]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-16 z-10 -mx-4 bg-background/95 px-4 py-2 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm font-semibold text-rose-deep", children: formatDateBR(items[0].dataEntrega) }) }),
        items.map((p) => {
          const c = classify(p);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: `border-l-4 ${c.border} shadow-card`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-1.5 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium leading-tight", children: p.clienteNome }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground", children: p.horaEntrega || "—" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: p.produto }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px]", children: p.status || "Sem status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `text-[10px] ${c.dot}`, children: p.situacaoPagamento || "Não pago" })
            ] })
          ] }) }, p.id);
        })
      ] }, k))
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { title: "Agenda de produção", subtitle: "Pedidos por dia, com situação financeira", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", onClick: () => shift(setCursor, cursor, -1), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display min-w-44 text-center text-lg font-semibold", children: [
      MONTHS[cursor.getMonth()],
      " ",
      cursor.getFullYear()
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", onClick: () => shift(setCursor, cursor, 1), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) })
  ] }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-2 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground", children: WEEK.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-2", children: w }, w)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-2", children: days.map((d, i) => {
        const key = dateKey(d.date);
        const items = byDate[key] ?? [];
        const isToday = key === todayKey;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `min-h-28 rounded-xl border p-2 transition ${d.inMonth ? "bg-card" : "bg-muted/40 opacity-60"} ${isToday ? "border-primary shadow-soft" : "border-border/60"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm font-semibold ${isToday ? "text-primary" : ""}`, children: d.date.getDate() }),
            items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-rose-soft px-1.5 text-[10px] font-semibold text-rose-deep", children: items.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            items.slice(0, 3).map((p) => {
              const c = classify(p);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `truncate rounded-md px-1.5 py-1 text-[10px] font-medium ${c.dot}`, title: `${p.clienteNome} — ${p.produto} • ${p.horaEntrega || ""}`, children: [
                p.horaEntrega ? `${p.horaEntrega} ` : "",
                p.clienteNome
              ] }, p.id);
            }),
            items.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground", children: [
              "+",
              items.length - 3,
              " mais"
            ] })
          ] })
        ] }, i);
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-4 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { color: "bg-success", label: "Pago integral" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { color: "bg-warning", label: "Entrada recebida" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { color: "bg-destructive", label: "Não pago" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { color: "bg-primary", label: "Aguardando confirmação" })
    ] }),
    semData.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mt-6 shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-lg", children: [
        "Pedidos sem data definida (",
        semData.length,
        ")"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-2", children: semData.map((p) => {
        const c = classify(p);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex flex-wrap items-center justify-between gap-2 rounded-xl border ${c.border} bg-card p-3 text-sm`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: p.clienteNome }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: p.produto })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: p.status || "Sem status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: c.dot, children: p.situacaoPagamento || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatDateBR(p.dataEntrega) })
          ] })
        ] }, p.id);
      }) })
    ] })
  ] });
}
function shift(set, cur, delta) {
  set(new Date(cur.getFullYear(), cur.getMonth() + delta, 1));
}
function buildMonthGrid(cursor) {
  const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const start = new Date(first);
  start.setDate(first.getDate() - first.getDay());
  const days = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push({
      date: d,
      inMonth: d.getMonth() === cursor.getMonth()
    });
  }
  return days;
}
function Legend({
  color,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-3 w-3 rounded-full ${color}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label })
  ] });
}
export {
  CalendarioPage as component
};
