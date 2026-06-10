import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery, b as useQueryClient, a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { A as AppLayout } from "./app-layout-DTll7bnX.mjs";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-Bbtrid8Y.mjs";
import { I as Input, B as Button } from "./brand-logo-3iPsG8o9.mjs";
import { L as Label } from "./label-tl_MnXN1.mjs";
import { o as getConfig, p as updateConfig, t as testWrite } from "./router-v0dzu4GX.mjs";
import { S as SPREADSHEET_ID } from "./sheets.server-e71hR5JP.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { L as LoaderCircle, i as Save, P as PlugZap, E as ExternalLink } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
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
import "../_libs/zod.mjs";
const EMPTY = {
  nome: "",
  whatsapp: "",
  instagram: "",
  endereco: "",
  chavePix: "",
  tipoPix: "",
  nomeRecebedor: "",
  banco: ""
};
function ConfigPage() {
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["config"],
    queryFn: () => getConfig()
  });
  const qc = useQueryClient();
  const save = useServerFn(updateConfig);
  const runTest = useServerFn(testWrite);
  const [form, setForm] = reactExports.useState(EMPTY);
  reactExports.useEffect(() => {
    if (data) setForm(data);
  }, [data]);
  const saveMut = useMutation({
    mutationFn: () => save({
      data: form
    }),
    onSuccess: () => {
      toast.success("Configurações salvas na planilha");
      qc.invalidateQueries({
        queryKey: ["config"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const writeMut = useMutation({
    mutationFn: () => runTest({
      data: void 0
    }),
    onSuccess: (r) => r.ok ? toast.success(r.message) : toast.error("Sem permissão", {
      description: r.message
    }),
    onError: (e) => toast.error(e.message)
  });
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { title: "Configurações", subtitle: "Dados da confeitaria e do Pix", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display", children: "Dados da confeitaria" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid gap-4", children: [
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Carregando..." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nome", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.nome, onChange: (e) => setForm({
            ...form,
            nome: e.target.value
          }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "WhatsApp principal (com DDD/DDI)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "5511999999999", value: form.whatsapp, onChange: (e) => setForm({
            ...form,
            whatsapp: e.target.value
          }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Instagram", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.instagram, onChange: (e) => setForm({
            ...form,
            instagram: e.target.value
          }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Endereço", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.endereco, onChange: (e) => setForm({
            ...form,
            endereco: e.target.value
          }) }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display", children: "Pix" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid gap-3 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Chave Pix", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.chavePix, onChange: (e) => setForm({
          ...form,
          chavePix: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tipo da chave", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "CPF, e-mail, telefone, aleatória...", value: form.tipoPix, onChange: (e) => setForm({
          ...form,
          tipoPix: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nome do recebedor", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.nomeRecebedor, onChange: (e) => setForm({
          ...form,
          nomeRecebedor: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Banco", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.banco, onChange: (e) => setForm({
          ...form,
          banco: e.target.value
        }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => saveMut.mutate(), disabled: saveMut.isPending, className: "bg-gradient-primary", children: [
        saveMut.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
        "Salvar configurações"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => writeMut.mutate(), disabled: writeMut.isPending, children: [
        writeMut.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PlugZap, { className: "h-4 w-4" }),
        "Testar escrita"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: sheetUrl, target: "_blank", rel: "noreferrer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4" }),
        " Abrir planilha"
      ] }) })
    ] })
  ] }) });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs uppercase tracking-wider text-muted-foreground", children: label }),
    children
  ] });
}
export {
  ConfigPage as component
};
