import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as AppLayout } from "./app-layout-DIK50as0.mjs";
import { C as Card, c as CardContent } from "./card-Bbtrid8Y.mjs";
import { B as Badge } from "./badge-PNZ8Owsm.mjs";
import { I as Input } from "./brand-logo-3iPsG8o9.mjs";
import { b as listProdutos } from "./router-CTVFEuqq.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { b as Cake } from "../_libs/lucide-react.mjs";
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
function ProdutosPage() {
  const {
    data: produtos = [],
    isLoading
  } = useQuery({
    queryKey: ["produtos"],
    queryFn: () => listProdutos()
  });
  const [search, setSearch] = reactExports.useState("");
  const grouped = reactExports.useMemo(() => {
    const filtered = produtos.filter((p) => `${p.nome} ${p.tipo} ${p.categoria}`.toLowerCase().includes(search.toLowerCase()));
    const map = {};
    for (const p of filtered) {
      map[p.categoria] ??= {};
      map[p.categoria][p.tipo] ??= [];
      map[p.categoria][p.tipo].push(p);
    }
    return map;
  }, [produtos, search]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { title: "Produtos", subtitle: "Catálogo completo da confeitaria", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Buscar produto...", value: search, onChange: (e) => setSearch(e.target.value), className: "max-w-sm bg-card" }) }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Carregando..." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: Object.entries(grouped).map(([categoria, tipos]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-rose flex h-9 w-9 items-center justify-center rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Cake, { className: "h-4 w-4 text-rose-deep" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold", children: categoria })
      ] }),
      Object.entries(tipos).map(([tipo, items]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg text-rose-deep", children: tipo }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "bg-gold/20 text-gold-foreground", children: formatPreco(items[0]) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: items.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border/60 shadow-card transition hover:shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-center justify-between p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: p.nome }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: formatPreco(p) })
        ] }) }, p.id)) })
      ] }, tipo))
    ] }, categoria)) })
  ] });
}
function formatPreco(p) {
  const raw = String(p.preco ?? "").replace(/R\$\s?/gi, "").replace(",", ".").trim();
  const preco = Number(raw);
  if (!Number.isFinite(preco)) return "—";
  const fmt = preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
  if (p.unidade === "kg") return `${fmt} / kg`;
  return fmt;
}
export {
  ProdutosPage as component
};
