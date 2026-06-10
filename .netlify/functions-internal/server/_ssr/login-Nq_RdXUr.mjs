import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { e as useAuth, n as normalizePhone$1 } from "./router-BmN7q33C.mjs";
import { C as Card, c as CardContent } from "./card-Bbtrid8Y.mjs";
import { a as BrandLogo, I as Input, B as Button } from "./brand-logo-3iPsG8o9.mjs";
import { L as Label } from "./label-tl_MnXN1.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { N as NexoSignature } from "./nexo-signature-6kPfTCBv.mjs";
import "../_libs/seroval.mjs";
import { S as Sparkles, L as LoaderCircle } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./sheets.server-e71hR5JP.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
function LoginPage() {
  const {
    login,
    loading,
    refresh
  } = useAuth();
  const navigate = useNavigate();
  const [whatsapp, setWhatsapp] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    const norm = normalizePhone$1(whatsapp);
    if (norm.length < 8) {
      toast.error("Informe um WhatsApp válido (com DDD).");
      return;
    }
    setSubmitting(true);
    try {
      refresh();
      await new Promise((r) => setTimeout(r, 400));
      const user = login(norm);
      if (!user) {
        toast.error("Usuário não encontrado", {
          description: "Verifique o número ou peça ao administrador para cadastrar."
        });
        return;
      }
      toast.success(`Bem-vinda, ${user.nome}!`);
      const perfil = (user.perfil || "").toUpperCase();
      if (perfil === "CLIENTE") navigate({
        to: "/c/catalogo"
      });
      else navigate({
        to: "/"
      });
    } finally {
      setSubmitting(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-rose-soft via-cream-soft to-rose-light/60 px-4 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-primary/25 blur-3xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-gold/20 blur-3xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute top-1/3 right-1/4 h-40 w-40 rounded-full bg-rose-deep/15 blur-2xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "relative z-10 w-full max-w-md border-2 border-white/60 bg-white/80 shadow-elevated backdrop-blur-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-6 py-8 sm:px-10 sm:py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-rose mb-3 inline-flex h-20 w-20 items-center justify-center rounded-full shadow-soft ring-4 ring-white/70", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrandLogo, { size: 56 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-rose-deep", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
          " Confeitaria Artesanal"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display mt-2 text-3xl font-semibold text-chocolate sm:text-4xl", children: "Cakes by Jack" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Bem-vinda de volta! Entre para gerenciar seus pedidos." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "mt-7 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "wa", className: "text-xs uppercase tracking-wider text-muted-foreground", children: "WhatsApp cadastrado" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "wa", type: "tel", inputMode: "numeric", placeholder: "Digite seu WhatsApp", value: whatsapp, onChange: (e) => setWhatsapp(e.target.value), autoComplete: "off", autoFocus: true, required: true, className: "h-11 bg-white text-base" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Somente números, com DDD." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: submitting || loading, className: "bg-gradient-primary h-11 w-full text-base font-semibold shadow-soft", children: [
          submitting || loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : null,
          "Entrar"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-center text-xs text-muted-foreground", children: [
        "Não tem cadastro? Faça um pedido pelo",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/c/catalogo", className: "font-medium text-primary underline-offset-2 hover:underline", children: "catálogo" }),
        " ",
        "ou peça acesso ao administrador."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NexoSignature, { variant: "inline" })
    ] }) })
  ] });
}
export {
  LoginPage as component
};
