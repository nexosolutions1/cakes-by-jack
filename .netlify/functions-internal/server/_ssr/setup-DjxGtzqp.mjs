import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery, a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { A as AppLayout } from "./app-layout-C5cMwNkQ.mjs";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-Bbtrid8Y.mjs";
import { B as Button } from "./brand-logo-3iPsG8o9.mjs";
import { c as checkSetup, t as testWrite } from "./router-BmN7q33C.mjs";
import { S as SPREADSHEET_ID } from "./sheets.server-e71hR5JP.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { L as LoaderCircle, C as CircleCheck, a as CircleAlert, E as ExternalLink, P as PlugZap } from "../_libs/lucide-react.mjs";
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
import "../_libs/zod.mjs";
const TABS = ["Configuracoes", "Usuarios", "Clientes", "Produtos", "Pedidos", "Pagamentos"];
function SetupPage() {
  const {
    data: status,
    isLoading
  } = useQuery({
    queryKey: ["setup"],
    queryFn: () => checkSetup()
  });
  const runTest = useServerFn(testWrite);
  const writeMut = useMutation({
    mutationFn: () => runTest({
      data: void 0
    }),
    onSuccess: (r) => {
      if (r.ok) toast.success(r.message);
      else toast.error("Sem permissão de escrita", {
        description: r.message
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { title: "Configuração", subtitle: "Conexão com Google Sheets", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display flex items-center gap-2", children: [
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }) : status?.ok ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-success" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-5 w-5 text-warning" }),
        "Status da planilha"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3 text-sm", children: [
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Verificando..." }),
        !isLoading && status?.ok && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Tudo certo! As abas necessárias foram encontradas e o sistema está conectado à planilha oficial." }),
        !isLoading && !status?.configured && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-destructive/10 p-4 text-destructive", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Erro de conexão" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs", children: status?.error })
        ] }),
        !isLoading && status?.configured && !status.ok && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-warning/10 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Faltam abas na planilha" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
            "Crie no Google Sheets as abas:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: status.missing.join(", ") }),
            ". O sistema usa exatamente esses nomes — não criamos abas automaticamente."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: sheetUrl, target: "_blank", rel: "noreferrer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4" }),
            " Abrir planilha"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => writeMut.mutate(), disabled: writeMut.isPending, className: "bg-gradient-primary", children: [
            writeMut.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PlugZap, { className: "h-4 w-4" }),
            "Testar escrita"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-lg", children: "Como funciona" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "A planilha já vem pronta com títulos na linha 1, cabeçalhos na linha 3 e dados a partir da linha 4. O sistema lê e grava respeitando essa estrutura — sem criar novas abas e sem sobrescrever fórmulas." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "Abas conectadas:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid grid-cols-2 gap-1 text-xs", children: TABS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "rounded-md bg-muted/50 px-2 py-1 font-mono", children: t }, t)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pt-2", children: "Toda alteração feita no sistema é gravada diretamente na planilha; e toda alteração feita na planilha aparece no sistema ao recarregar." })
      ] })
    ] })
  ] }) });
}
export {
  SetupPage as component
};
