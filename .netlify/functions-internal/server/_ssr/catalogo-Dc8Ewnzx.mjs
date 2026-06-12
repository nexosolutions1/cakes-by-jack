import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery, b as useQueryClient, a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { A as AppLayout } from "./app-layout-CxpNs-BW.mjs";
import { b as listProdutos, D as Dialog, B as Button, E as deleteProduto, F as createProduto, G as updateProduto, e as DialogContent, f as DialogHeader, g as DialogTitle, I as Input, T as Textarea, h as DialogFooter, L as Label } from "./router-C4tcv7sc.mjs";
import { C as Card, c as CardContent } from "./card-acCiEC5p.mjs";
import { B as Badge } from "./badge-Do_NBdl2.mjs";
import { a as formatBRL } from "./format-DkCAcujl.mjs";
import { d as deleteProductImage, p as publicImageUrl, u as uploadProductImage } from "./image-storage-C3FCaYPT.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { m as Share2, c as Plus, I as ImagePlus, d as Pencil, T as Trash2, L as LoaderCircle } from "../_libs/lucide-react.mjs";
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
import "./brand-logo-C_BRZq5w.mjs";
import "./nexo-signature-XrLnPLze.mjs";
import "./server-DoEYPU5W.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
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
const CATEGORIAS = ["Bolos", "Docinhos", "Tortas", "Especiais", "Outros"];
function currencyInputToNumber(value) {
  const onlyNumbers = String(value || "").replace(/\D/g, "");
  return Number(onlyNumbers || 0) / 100;
}
function formatCurrencyInput(value) {
  return currencyInputToNumber(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}
function numberToCurrencyInput(value) {
  const n = typeof value === "number" ? value : Number(String(value ?? "0").replace("R$", "").replace(/\./g, "").replace(",", "."));
  return (Number.isFinite(n) ? n : 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}
function CatalogoPage() {
  const {
    data: produtos = [],
    isLoading
  } = useQuery({
    queryKey: ["produtos"],
    queryFn: () => listProdutos()
  });
  const [editing, setEditing] = reactExports.useState(null);
  const [open, setOpen] = reactExports.useState(false);
  const ativos = produtos.filter((p) => p.nome && p.observacoes !== "EXCLUÍDO");
  function compartilhar() {
    const link = `${window.location.origin}/c/catalogo`;
    navigator.clipboard.writeText(link).catch(() => {
    });
    toast.success("Link copiado!", {
      description: link
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { title: "Catálogo", subtitle: "Vitrine da confeitaria — gerencie produtos e fotos", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: compartilhar, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4" }),
      " Compartilhar"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-gradient-primary shadow-soft", onClick: () => {
      setEditing(null);
      setOpen(true);
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
      " Novo produto"
    ] })
  ] }), children: [
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Carregando..." }),
    !isLoading && ativos.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-dashed", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-16 text-center text-muted-foreground", children: 'Nenhum produto ainda. Clique em "Novo produto" para começar.' }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: ativos.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProdutoCard, { produto: p, onEdit: () => {
      setEditing(p);
      setOpen(true);
    } }, p.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProdutoDialog, { produto: editing, onDone: () => setOpen(false) }) })
  ] });
}
function ProdutoCard({
  produto,
  onEdit
}) {
  const del = useServerFn(deleteProduto);
  const qc = useQueryClient();
  const mut = useMutation({
    mutationFn: () => del({
      data: {
        id: produto.id
      }
    }),
    onSuccess: async () => {
      if (produto.imagem) await deleteProductImage(produto.imagem).catch(() => {
      });
      toast.success("Produto excluído");
      qc.invalidateQueries({
        queryKey: ["produtos"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const img = publicImageUrl(produto.imagem);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden border-border shadow-card transition hover:shadow-elevated", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-rose relative aspect-[4/3] overflow-hidden", children: [
      img ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, alt: produto.nome, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center text-rose-deep/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-10 w-10" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "absolute left-3 top-3 bg-white/90 text-chocolate shadow-card", children: produto.categoria || "Sem categoria" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold leading-tight", children: produto.nome }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "kpi-number text-base whitespace-nowrap text-primary", children: formatBRL(produto.preco) })
      ] }),
      produto.descricao && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-2 text-sm text-muted-foreground", children: produto.descricao }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: onEdit, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
          " Editar"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "text-destructive hover:bg-destructive/10", onClick: () => {
          if (confirm(`Excluir "${produto.nome}"?`)) mut.mutate();
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
      ] })
    ] })
  ] });
}
function ProdutoDialog({
  produto,
  onDone
}) {
  const create = useServerFn(createProduto);
  const update = useServerFn(updateProduto);
  const qc = useQueryClient();
  const fileRef = reactExports.useRef(null);
  const [uploading, setUploading] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    nome: produto?.nome ?? "",
    categoria: produto?.categoria ?? "Bolos",
    tipo: produto?.tipo ?? "",
    preco: produto?.preco ? numberToCurrencyInput(produto.preco) : "",
    unidade: produto?.unidade ?? "unidade",
    descricao: produto?.descricao ?? "",
    imagem: produto?.imagem ?? "",
    observacoes: produto?.observacoes && produto.observacoes !== "EXCLUÍDO" ? produto.observacoes : ""
  });
  async function pickImage(file) {
    setUploading(true);
    try {
      if (form.imagem) await deleteProductImage(form.imagem).catch(() => {
      });
      const path = await uploadProductImage(file);
      setForm((f) => ({
        ...f,
        imagem: path
      }));
      toast.success("Foto enviada");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Falha no upload");
    } finally {
      setUploading(false);
    }
  }
  const mut = useMutation({
    mutationFn: async () => {
      const payload = {
        nome: form.nome,
        categoria: form.categoria,
        tipo: form.tipo,
        unidade: form.unidade,
        preco: currencyInputToNumber(form.preco),
        descricao: form.descricao,
        imagem: form.imagem,
        observacoes: form.observacoes
      };
      if (produto) return update({
        data: {
          id: produto.id,
          ...payload
        }
      });
      return create({
        data: payload
      });
    },
    onSuccess: () => {
      toast.success(produto ? "Produto atualizado" : "Produto criado");
      qc.invalidateQueries({
        queryKey: ["produtos"]
      });
      onDone();
    },
    onError: (e) => toast.error(e.message)
  });
  const previewUrl = publicImageUrl(form.imagem);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[92vh] max-w-2xl overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-2xl", children: produto ? "Editar produto" : "Novo produto" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-rose relative flex aspect-[16/9] cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-rose-deep/30", onClick: () => fileRef.current?.click(), children: [
        previewUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: previewUrl, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-rose-deep/70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "mx-auto h-10 w-10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm", children: "Toque para escolher uma foto" })
        ] }),
        uploading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileRef, type: "file", accept: "image/*", className: "hidden", onChange: (e) => {
          const f = e.target.files?.[0];
          if (f) pickImage(f);
        } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nome *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.nome, onChange: (e) => setForm({
          ...form,
          nome: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Categoria", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: "h-9 rounded-md border border-input bg-card px-3 text-sm", value: form.categoria, onChange: (e) => setForm({
          ...form,
          categoria: e.target.value
        }), children: CATEGORIAS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c)) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Preço (R$) *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { inputMode: "numeric", placeholder: "R$ 0,00", value: form.preco, onChange: (e) => setForm({
          ...form,
          preco: formatCurrencyInput(e.target.value)
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Unidade", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.unidade, onChange: (e) => setForm({
          ...form,
          unidade: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tipo / Linha", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.tipo, onChange: (e) => setForm({
          ...form,
          tipo: e.target.value
        }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Descrição", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 3, value: form.descricao, onChange: (e) => setForm({
        ...form,
        descricao: e.target.value
      }), placeholder: "Sabor, recheio, ocasiões ideais..." }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { disabled: !form.nome || currencyInputToNumber(form.preco) <= 0 || mut.isPending || uploading, onClick: () => mut.mutate(), className: "bg-gradient-primary", children: [
      mut.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
      produto ? "Salvar alterações" : "Criar produto"
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
  CatalogoPage as component
};
