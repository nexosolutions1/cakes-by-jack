import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { b as useQueryClient, u as useQuery, a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { A as AppLayout } from "./app-layout-DTll7bnX.mjs";
import { e as useAuth, z as listUsuarios, n as normalizePhone$1, C as deleteUsuario, A as updateUsuario, B as createUsuario } from "./router-v0dzu4GX.mjs";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-Bbtrid8Y.mjs";
import { B as Button, I as Input, c as cn } from "./brand-logo-3iPsG8o9.mjs";
import { L as Label } from "./label-tl_MnXN1.mjs";
import { B as Badge } from "./badge-PNZ8Owsm.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CmacHktB.mjs";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogFooter } from "./dialog-DsEyClLt.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { L as LoaderCircle, t as ShieldCheck, g as Pencil, m as Trash2, c as Plus } from "../_libs/lucide-react.mjs";
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
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
const Table = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("table", { ref, className: cn("w-full caption-bottom text-sm", className), ...props }) })
);
Table.displayName = "Table";
const TableHeader = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
const TableBody = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { ref, className: cn("[&_tr:last-child]:border-0", className), ...props }));
TableBody.displayName = "TableBody";
const TableFooter = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "tfoot",
  {
    ref,
    className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tr",
    {
      ref,
      className: cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      ),
      ...props
    }
  )
);
TableRow.displayName = "TableRow";
const TableHead = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "th",
  {
    ref,
    className: cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
const TableCell = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "td",
  {
    ref,
    className: cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("caption", { ref, className: cn("mt-4 text-sm text-muted-foreground", className), ...props }));
TableCaption.displayName = "TableCaption";
const EMPTY = {
  nome: "",
  whatsapp: "",
  perfil: "CLIENTE",
  status: "Ativo",
  observacoes: ""
};
function AdminNexoPage() {
  const {
    user,
    loading
  } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (loading) return;
    if (!user) navigate({
      to: "/login"
    });
    else if (user.perfil !== "ADMIN") navigate({
      to: "/"
    });
  }, [user, loading, navigate]);
  const qc = useQueryClient();
  const {
    data: usuarios = [],
    isLoading
  } = useQuery({
    queryKey: ["usuarios"],
    queryFn: () => listUsuarios()
  });
  const create = useServerFn(createUsuario);
  const update = useServerFn(updateUsuario);
  const remove = useServerFn(deleteUsuario);
  const [open, setOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState(EMPTY);
  const saveMut = useMutation({
    mutationFn: async () => {
      if (form.id) {
        await update({
          data: {
            ...form,
            id: form.id
          }
        });
      } else {
        await create({
          data: form
        });
      }
    },
    onSuccess: () => {
      toast.success(form.id ? "Usuário atualizado" : "Usuário criado");
      qc.invalidateQueries({
        queryKey: ["usuarios"]
      });
      setOpen(false);
      setForm(EMPTY);
    },
    onError: (e) => toast.error(e.message)
  });
  const delMut = useMutation({
    mutationFn: (id) => remove({
      data: {
        id
      }
    }),
    onSuccess: () => {
      toast.success("Usuário removido");
      qc.invalidateQueries({
        queryKey: ["usuarios"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  if (loading || !user || user.perfil !== "ADMIN") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin" }) });
  }
  function openNew() {
    setForm(EMPTY);
    setOpen(true);
  }
  function openEdit(u) {
    setForm({
      id: u.id,
      nome: u.nome,
      whatsapp: u.whatsapp,
      perfil: u.perfil ?? "CLIENTE",
      status: u.status || "Ativo",
      observacoes: u.observacoes || ""
    });
    setOpen(true);
  }
  const ativos = usuarios.filter((u) => u.status !== "Removido");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { title: "Admin Nexo", subtitle: "Controle total de usuários, perfis e acessos", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openNew, className: "bg-gradient-primary", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
    " Novo usuário"
  ] }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-2 shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 font-display", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-5 w-5 text-primary" }),
        "Usuários do sistema"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }) }) : ativos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-8", children: "Nenhum usuário cadastrado." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 md:hidden", children: ativos.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-4 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium leading-tight", children: u.nome }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: u.whatsapp })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: u.perfil === "ADMIN" ? "default" : u.perfil === "OWNER" ? "secondary" : "outline", className: "text-[10px]", children: u.perfil })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: u.status === "Ativo" ? "outline" : "destructive", className: "text-[10px]", children: u.status }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => openEdit(u), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => {
                if (u.id === user.id) {
                  toast.error("Você não pode remover a si mesmo.");
                  return;
                }
                if (confirm(`Remover ${u.nome}?`)) delMut.mutate(u.id);
              }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
            ] })
          ] })
        ] }, u.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Nome" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "WhatsApp" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Perfil" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Ações" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: ativos.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: u.nome }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: u.whatsapp }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: u.perfil === "ADMIN" ? "default" : u.perfil === "OWNER" ? "secondary" : "outline", children: u.perfil }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: u.status === "Ativo" ? "outline" : "destructive", children: u.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right space-x-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => openEdit(u), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => {
                if (u.id === user.id) {
                  toast.error("Você não pode remover a si mesmo.");
                  return;
                }
                if (confirm(`Remover ${u.nome}?`)) delMut.mutate(u.id);
              }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
            ] })
          ] }, u.id)) })
        ] }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90vh] w-[calc(100vw-1rem)] max-w-md overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: form.id ? "Editar usuário" : "Novo usuário" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nome" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.nome, onChange: (e) => setForm({
            ...form,
            nome: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "WhatsApp (somente números, com DDD/DDI)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.whatsapp, onChange: (e) => setForm({
            ...form,
            whatsapp: normalizePhone$1(e.target.value)
          }), placeholder: "5511999999999" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Perfil" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.perfil, onValueChange: (v) => setForm({
              ...form,
              perfil: v
            }), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "ADMIN", children: "ADMIN (controle total)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "OWNER", children: "OWNER (Jack)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "CLIENTE", children: "CLIENTE" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.status, onValueChange: (v) => setForm({
              ...form,
              status: v
            }), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Ativo", children: "Ativo" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Bloqueado", children: "Bloqueado" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Observações" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.observacoes, onChange: (e) => setForm({
            ...form,
            observacoes: e.target.value
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setOpen(false), children: "Cancelar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => {
          if (!form.nome || form.whatsapp.length < 8) {
            toast.error("Preencha nome e WhatsApp válidos.");
            return;
          }
          saveMut.mutate();
        }, disabled: saveMut.isPending, className: "bg-gradient-primary", children: [
          saveMut.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          "Salvar"
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AdminNexoPage as component
};
