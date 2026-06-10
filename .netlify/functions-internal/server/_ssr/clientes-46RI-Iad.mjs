import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery, b as useQueryClient, a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { A as AppLayout } from "./app-layout-DTll7bnX.mjs";
import { I as Input, B as Button } from "./brand-logo-3iPsG8o9.mjs";
import { C as Card, c as CardContent } from "./card-Bbtrid8Y.mjs";
import { L as Label } from "./label-tl_MnXN1.mjs";
import { T as Textarea } from "./textarea-CYCFuD-O.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogFooter } from "./dialog-DsEyClLt.mjs";
import { a as listClientes, q as createCliente } from "./router-v0dzu4GX.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { j as Phone, M as MessageCircle, k as MapPin, c as Plus, L as LoaderCircle } from "../_libs/lucide-react.mjs";
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
import "./sheets.server-e71hR5JP.mjs";
import "../_libs/zod.mjs";
function ClientesPage() {
  const {
    data: clientes = [],
    isLoading
  } = useQuery({
    queryKey: ["clientes"],
    queryFn: () => listClientes()
  });
  const [open, setOpen] = reactExports.useState(false);
  const [search, setSearch] = reactExports.useState("");
  const filtered = clientes.filter((c) => c.nome.toLowerCase().includes(search.toLowerCase()));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { title: "Clientes", subtitle: `${clientes.length} cadastrados`, actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-gradient-primary shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
      "Novo cliente"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NovoClienteDialog, { onDone: () => setOpen(false) })
  ] }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Buscar cliente pelo nome...", value: search, onChange: (e) => setSearch(e.target.value), className: "max-w-sm bg-card" }) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Carregando..." }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-dashed", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Nenhum cliente encontrado" }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: filtered.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border/60 shadow-card transition hover:shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-rose flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-lg font-semibold text-rose-deep", children: c.nome.charAt(0).toUpperCase() }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display truncate text-lg font-semibold", children: c.nome }),
        c.telefone && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5" }),
          " ",
          c.telefone
        ] }),
        c.whatsapp && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-3.5 w-3.5" }),
          " ",
          c.whatsapp
        ] }),
        (c.bairro || c.cidade) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
          " ",
          [c.bairro, c.cidade].filter(Boolean).join(" • ")
        ] })
      ] })
    ] }) }) }, c.id)) })
  ] });
}
function NovoClienteDialog({
  onDone
}) {
  const create = useServerFn(createCliente);
  const qc = useQueryClient();
  const [form, setForm] = reactExports.useState({
    nome: "",
    telefone: "",
    whatsapp: "",
    endereco: "",
    cidade: "",
    bairro: "",
    observacoes: ""
  });
  const mut = useMutation({
    mutationFn: () => create({
      data: form
    }),
    onSuccess: () => {
      toast.success("Cliente cadastrado");
      qc.invalidateQueries({
        queryKey: ["clientes"]
      });
      onDone();
    },
    onError: (e) => toast.error(e.message)
  });
  const set = (k) => (e) => setForm((f) => ({
    ...f,
    [k]: e.target.value
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-2xl", children: "Novo cliente" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nome *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.nome, onChange: set("nome") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Telefone", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.telefone, onChange: set("telefone") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "WhatsApp", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.whatsapp, onChange: set("whatsapp") }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Endereço", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.endereco, onChange: set("endereco") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Bairro", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.bairro, onChange: set("bairro") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Cidade", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.cidade, onChange: set("cidade") }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Observações", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: form.observacoes, onChange: set("observacoes"), rows: 2 }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { disabled: !form.nome || mut.isPending, onClick: () => mut.mutate(), className: "bg-gradient-primary", children: [
      mut.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
      "Salvar"
    ] }) })
  ] });
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
  ClientesPage as component
};
