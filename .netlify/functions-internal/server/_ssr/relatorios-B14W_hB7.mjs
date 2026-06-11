import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as AppLayout } from "./app-layout-Bh3N7kPK.mjs";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-Bbtrid8Y.mjs";
import { B as Button } from "./brand-logo-3iPsG8o9.mjs";
import { l as listPedidos, a as listClientes, b as listProdutos } from "./router-DrEiKWY7.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { D as Download } from "../_libs/lucide-react.mjs";
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
import "./badge-PNZ8Owsm.mjs";
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
function parseNum(v) {
  const n = Number(String(v).replace(/\./g, "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}
const fmt = (n) => n.toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL"
});
function toCSV(rows) {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [headers.join(","), ...rows.map((r) => headers.map((h) => esc(r[h])).join(","))].join("\n");
}
function download(filename, content, mime = "text/csv;charset=utf-8") {
  const blob = new Blob(["\uFEFF" + content], {
    type: mime
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
function RelatoriosPage() {
  const {
    data: pedidos = []
  } = useQuery({
    queryKey: ["pedidos"],
    queryFn: () => listPedidos()
  });
  const {
    data: clientes = []
  } = useQuery({
    queryKey: ["clientes"],
    queryFn: () => listClientes()
  });
  const {
    data: produtos = []
  } = useQuery({
    queryKey: ["produtos"],
    queryFn: () => listProdutos()
  });
  const stats = reactExports.useMemo(() => {
    const porMes = {};
    const porProduto = {};
    const porCliente = {};
    for (const p of pedidos) {
      const d = new Date(p.dataPedido);
      if (Number.isFinite(+d)) {
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        porMes[key] ??= {
          mes: key,
          faturamento: 0,
          pedidos: 0
        };
        porMes[key].faturamento += parseNum(p.valorTotal);
        porMes[key].pedidos += 1;
      }
      porProduto[p.produto] ??= {
        produto: p.produto,
        qtd: 0,
        total: 0
      };
      porProduto[p.produto].qtd += parseNum(p.quantidade) || 1;
      porProduto[p.produto].total += parseNum(p.valorTotal);
      porCliente[p.clienteNome] ??= {
        cliente: p.clienteNome,
        qtd: 0,
        total: 0
      };
      porCliente[p.clienteNome].qtd += 1;
      porCliente[p.clienteNome].total += parseNum(p.valorTotal);
    }
    return {
      mensal: Object.values(porMes).sort((a, b) => a.mes.localeCompare(b.mes)),
      topProdutos: Object.values(porProduto).sort((a, b) => b.qtd - a.qtd).slice(0, 10),
      topClientes: Object.values(porCliente).sort((a, b) => b.total - a.total).slice(0, 10)
    };
  }, [pedidos]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { title: "Relatórios", subtitle: "Visão analítica e exportações", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ReportCard, { title: "Faturamento mensal", onExport: () => download("faturamento-mensal.csv", toCSV(stats.mensal)), headers: ["Mês", "Pedidos", "Faturamento"], rows: stats.mensal.map((r) => [r.mes, r.pedidos, fmt(r.faturamento)]) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ReportCard, { title: "Produtos mais vendidos", onExport: () => download("produtos-mais-vendidos.csv", toCSV(stats.topProdutos)), headers: ["Produto", "Qtd", "Total"], rows: stats.topProdutos.map((r) => [r.produto, r.qtd, fmt(r.total)]) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ReportCard, { title: "Clientes que mais compram", onExport: () => download("top-clientes.csv", toCSV(stats.topClientes)), headers: ["Cliente", "Pedidos", "Total gasto"], rows: stats.topClientes.map((r) => [r.cliente, r.qtd, fmt(r.total)]) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display", children: "Exportações completas" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ExportRow, { label: `Pedidos (${pedidos.length})`, onClick: () => download("pedidos.csv", toCSV(pedidos)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ExportRow, { label: `Clientes (${clientes.length})`, onClick: () => download("clientes.csv", toCSV(clientes)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ExportRow, { label: `Catálogo de produtos (${produtos.length})`, onClick: () => download("produtos.csv", toCSV(produtos)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pt-2 text-xs text-muted-foreground", children: "CSV compatível com Excel/Google Sheets. Para PDF, exporte o CSV e gere o relatório no Excel." })
      ] })
    ] })
  ] }) });
}
function ReportCard({
  title,
  onExport,
  headers,
  rows
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-lg", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: onExport, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
        " CSV"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: rows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-6 text-center text-sm text-muted-foreground", children: "Sem dados." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: headers.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-2 text-left", children: h }, h)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-t border-border/60", children: r.map((c, j) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2", children: c }, j)) }, i)) })
    ] }) }) })
  ] });
}
function ExportRow({
  label,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl bg-muted/40 px-4 py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "ghost", onClick, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
      " Exportar"
    ] })
  ] });
}
export {
  RelatoriosPage as component
};
