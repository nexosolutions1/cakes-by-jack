import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { w as setupQO, l as listPedidos, a as listClientes, b as listProdutos } from "./router-Bf6-tPD-.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as useSuspenseQuery, u as useQuery, q as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { A as AppLayout, S as Skeleton } from "./app-layout-F7m3vtlX.mjs";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-Bbtrid8Y.mjs";
import { B as Button } from "./brand-logo-3iPsG8o9.mjs";
import { B as Badge } from "./badge-PNZ8Owsm.mjs";
import { p as parseDateSafe, b as parseMoney, v as valorRecebido, a as formatBRL, f as formatDateBR } from "./format-DkCAcujl.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { S as Sparkles, f as Clock, p as ClipboardList, d as TrendingUp, e as DollarSign, q as CalendarDays, U as Users, A as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, L as LineChart, X as XAxis, Y as YAxis, T as Tooltip, a as Line, B as BarChart, b as Bar, P as PieChart, c as Pie, C as Cell } from "../_libs/recharts.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./server-h0sgn6Mk.mjs";
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
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./sheets.server-e71hR5JP.mjs";
import "../_libs/zod.mjs";
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
import "../_libs/lodash.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
const banner = "/assets/dashboard-banner-COH4NroF.jpg";
function DashboardPage() {
  const {
    data: setup
  } = useSuspenseQuery(setupQO);
  if (!setup.ok) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { title: "Bem-vinda à Cakes by Jack", subtitle: "Vamos preparar seu sistema", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SetupCard, { missing: setup.missing, configured: setup.configured }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { title: "Painel Financeiro", subtitle: "Visão geral da sua confeitaria", children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardSkeleton, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardContent, {}) }) });
}
function SetupCard({
  missing,
  configured
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mx-auto max-w-2xl border-rose-soft shadow-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-rose mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-rose-deep" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-2xl", children: configured ? "Abas faltando na planilha" : "Conexão pendente" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: configured ? `O sistema usa as abas existentes da sua planilha. Faltam: ${missing.join(", ")}. Crie-as no Google Sheets com esses nomes exatos — o sistema não cria abas automaticamente.` : "Confira se o conector do Google Sheets e o ID da planilha estão configurados." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "bg-gradient-primary shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/setup", children: "Abrir configuração" }) }) })
  ] });
}
function DashboardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: Array.from({
    length: 8
  }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-2xl" }, i)) });
}
const pedidosQO = queryOptions({
  queryKey: ["pedidos"],
  queryFn: () => listPedidos()
});
const clientesQO = queryOptions({
  queryKey: ["clientes"],
  queryFn: () => listClientes()
});
const produtosQO = queryOptions({
  queryKey: ["produtos"],
  queryFn: () => listProdutos()
});
const CHART_COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)"];
function DashboardContent() {
  const {
    data: pedidos = []
  } = useQuery(pedidosQO);
  const {
    data: clientes = []
  } = useQuery(clientesQO);
  const {
    data: produtos = []
  } = useQuery(produtosQO);
  const now = /* @__PURE__ */ new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const startWeek = new Date(now);
  startWeek.setDate(now.getDate() - now.getDay());
  startWeek.setHours(0, 0, 0, 0);
  const ativos = pedidos.filter((p) => p.status !== "Cancelado" && p.status !== "Recusado");
  const inMonth = ativos.filter((p) => {
    const d = parseDateSafe(p.dataPedido);
    return d && d.getMonth() === month && d.getFullYear() === year;
  });
  const inWeek = ativos.filter((p) => {
    const d = parseDateSafe(p.dataPedido);
    return d && d >= startWeek;
  });
  const faturamento = inMonth.reduce((s, p) => s + parseMoney(p.valorTotal), 0);
  const recebido = inMonth.reduce((s, p) => s + valorRecebido(p.valorTotal, p.entrada, p.saldo), 0);
  const aReceber = Math.max(0, faturamento - recebido);
  const monthsData = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(year, month - i, 1);
    const items = ativos.filter((p) => {
      const dp = parseDateSafe(p.dataPedido);
      return dp && dp.getMonth() === d.getMonth() && dp.getFullYear() === d.getFullYear();
    });
    monthsData.push({
      mes: d.toLocaleDateString("pt-BR", {
        month: "short"
      }),
      faturamento: items.reduce((s, p) => s + parseMoney(p.valorTotal), 0),
      pedidos: items.length
    });
  }
  const pendentes = pedidos.filter((p) => p.status === "Aguardando confirmação").length;
  const statusCounts = {};
  for (const p of pedidos) {
    const k = p.status || "Sem status";
    statusCounts[k] = (statusCounts[k] ?? 0) + 1;
  }
  const statusData = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value
  }));
  const cards = [{
    label: "Pedidos pendentes",
    value: pendentes,
    icon: Clock,
    tint: "bg-warning/20 text-warning"
  }, {
    label: "Pedidos do mês",
    value: inMonth.length,
    icon: ClipboardList,
    tint: "bg-gradient-rose text-rose-deep"
  }, {
    label: "Faturamento mensal",
    value: formatBRL(faturamento),
    icon: TrendingUp,
    tint: "bg-gradient-primary text-primary-foreground"
  }, {
    label: "Valor recebido",
    value: formatBRL(recebido),
    icon: DollarSign,
    tint: "bg-success/15 text-success"
  }, {
    label: "Valor a receber",
    value: formatBRL(aReceber),
    icon: DollarSign,
    tint: "bg-rose-soft text-rose-deep"
  }, {
    label: "Pedidos da semana",
    value: inWeek.length,
    icon: CalendarDays,
    tint: "bg-accent text-rose-deep"
  }, {
    label: "Clientes",
    value: clientes.length,
    icon: Users,
    tint: "bg-accent text-foreground"
  }, {
    label: "Catálogo",
    value: produtos.length,
    icon: Sparkles,
    tint: "bg-gold/20 text-gold-foreground"
  }];
  const proximos = [...ativos].filter((p) => p.status !== "Entregue" && p.dataEntrega).sort((a, b) => +(parseDateSafe(a.dataEntrega) ?? /* @__PURE__ */ new Date(8e15)) - +(parseDateSafe(b.dataEntrega) ?? /* @__PURE__ */ new Date(8e15))).slice(0, 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: banner, alt: "", className: "h-44 w-full object-cover md:h-52" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/55 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col justify-center p-6 md:p-8 text-primary-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.25em] opacity-90", children: "Cakes by Jack" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display mt-1 text-2xl font-semibold md:text-3xl", children: "Bem-vinda de volta! Vamos adoçar o dia." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 max-w-md text-sm opacity-90", children: "Acompanhe seus pedidos, faturamento e produção em um só lugar." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: cards.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "overflow-hidden border-border/60 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: c.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display mt-2 text-2xl font-semibold", children: c.value })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex h-10 w-10 items-center justify-center rounded-full ${c.tint}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "h-5 w-5" }) })
    ] }) }) }, c.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display", children: "Faturamento — últimos 6 meses" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: monthsData, margin: {
          top: 10,
          right: 20,
          left: 0,
          bottom: 0
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "mes", stroke: "var(--color-muted-foreground)", fontSize: 12 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "var(--color-muted-foreground)", fontSize: 12, tickFormatter: (v) => `R$${Math.round(v / 1e3)}k` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
            background: "var(--color-card)",
            border: "1px solid var(--color-border)",
            borderRadius: 12
          }, formatter: (v) => formatBRL(v) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "faturamento", stroke: "var(--color-chart-1)", strokeWidth: 3, dot: {
            r: 4
          } })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display", children: "Pedidos por mês" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: monthsData, margin: {
          top: 10,
          right: 10,
          left: 0,
          bottom: 0
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "mes", stroke: "var(--color-muted-foreground)", fontSize: 12 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "var(--color-muted-foreground)", fontSize: 12 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
            background: "var(--color-card)",
            border: "1px solid var(--color-border)",
            borderRadius: 12
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "pedidos", fill: "var(--color-chart-2)", radius: [8, 8, 0, 0] })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2 shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display", children: "Próximas entregas" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Pedidos confirmados aguardando produção ou finalização" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/pedidos", children: [
            "Ver todos ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "ml-1 h-4 w-4" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
          proximos.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Nenhum pedido em aberto. Que tal cadastrar o primeiro?" }),
          proximos.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(PedidoRow, { p }, p.id))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display", children: "Pedidos por status" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "h-64", children: statusData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-8 text-center text-sm text-muted-foreground", children: "Sem pedidos ainda." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: statusData, dataKey: "value", nameKey: "name", innerRadius: 45, outerRadius: 80, paddingAngle: 2, children: statusData.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: CHART_COLORS[i % CHART_COLORS.length] }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
            background: "var(--color-card)",
            border: "1px solid var(--color-border)",
            borderRadius: 12
          } })
        ] }) }) })
      ] })
    ] })
  ] });
}
function PedidoRow({
  p
}) {
  const statusColor = p.situacaoPagamento === "Pago integral" ? "bg-success/15 text-success" : p.situacaoPagamento === "Entrada recebida" ? "bg-warning/20 text-warning" : "bg-destructive/15 text-destructive";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl border border-border/60 bg-card px-4 py-3 transition hover:shadow-soft", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-medium", children: p.clienteNome }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: p.produto })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: formatDateBR(p.dataEntrega) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: p.horaEntrega || "—" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: statusColor, children: p.situacaoPagamento })
    ] })
  ] });
}
export {
  DashboardPage as component
};
