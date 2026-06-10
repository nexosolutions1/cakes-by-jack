import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery, a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { a as BrandLogo, I as Input, B as Button } from "./brand-logo-3iPsG8o9.mjs";
import { C as Card, c as CardContent } from "./card-Bbtrid8Y.mjs";
import { L as Label } from "./label-tl_MnXN1.mjs";
import { T as Textarea } from "./textarea-CYCFuD-O.mjs";
import { B as Badge } from "./badge-PNZ8Owsm.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogFooter } from "./dialog-DsEyClLt.mjs";
import { x as listProdutosPublico, o as getConfig, y as createPedidoPublico } from "./router-CTVFEuqq.mjs";
import { p as publicImageUrl } from "./image-storage-CXr2krm7.mjs";
import { a as formatBRL, b as parseMoney } from "./format-DkCAcujl.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { r as ShoppingBag, s as Copy, L as LoaderCircle } from "../_libs/lucide-react.mjs";
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
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
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
function PublicCatalog() {
  const {
    data: produtos = []
  } = useQuery({
    queryKey: ["produtos-publico"],
    queryFn: () => listProdutosPublico()
  });
  const {
    data: config
  } = useQuery({
    queryKey: ["config"],
    queryFn: () => getConfig()
  });
  const [search, setSearch] = reactExports.useState("");
  const [cat, setCat] = reactExports.useState("Todos");
  const categorias = reactExports.useMemo(() => ["Todos", ...Array.from(new Set(produtos.map((p) => p.categoria).filter(Boolean)))], [produtos]);
  const filtered = reactExports.useMemo(() => produtos.filter((p) => (cat === "Todos" || p.categoria === cat) && p.nome.toLowerCase().includes(search.toLowerCase())), [produtos, cat, search]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "bg-gradient-rose border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-6xl items-center gap-4 px-4 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BrandLogo, { size: 56 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold leading-tight text-chocolate md:text-3xl", children: config?.nome || "Cakes by Jack" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-rose-deep", children: "Confeitaria Artesanal" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex flex-col gap-3 md:flex-row md:items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Buscar produto...", value: search, onChange: (e) => setSearch(e.target.value), className: "max-w-sm bg-card" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: categorias.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCat(c), className: `rounded-full border px-3 py-1 text-xs font-medium transition ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-primary/40"}`, children: c }, c)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: filtered.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { produto: p, config }, p.id)) }),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-16 text-center text-muted-foreground", children: "Nenhum produto encontrado." })
    ] })
  ] });
}
function ProductCard({
  produto,
  config
}) {
  const [open, setOpen] = reactExports.useState(false);
  const img = publicImageUrl(produto.imagem);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden border-border shadow-card transition hover:shadow-elevated", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-rose aspect-[4/3] overflow-hidden", children: img ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, alt: produto.nome, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center text-rose-deep/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-12 w-12" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-gold/40 text-chocolate", children: produto.categoria }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold leading-tight", children: produto.nome }),
      produto.descricao && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-3 text-sm text-muted-foreground", children: produto.descricao }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "kpi-number text-primary", children: formatBRL(produto.preco) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-gradient-primary shadow-soft", children: "Fazer pedido" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(OrderDialog, { produto, config, onDone: () => setOpen(false) })
        ] })
      ] })
    ] })
  ] });
}
function OrderDialog({
  produto,
  config,
  onDone
}) {
  const create = useServerFn(createPedidoPublico);
  const precoUnit = parseMoney(produto.preco);
  const [form, setForm] = reactExports.useState({
    clienteNome: "",
    whatsapp: "",
    dataDesejada: "",
    horaDesejada: "",
    quantidade: 1,
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    observacoes: ""
  });
  const total = precoUnit * (form.quantidade || 1);
  const entradaMin = total * 0.5;
  const mut = useMutation({
    mutationFn: () => create({
      data: {
        produtoId: produto.id,
        produtoNome: produto.nome,
        preco: precoUnit,
        quantidade: form.quantidade,
        clienteNome: form.clienteNome,
        whatsapp: form.whatsapp,
        dataDesejada: form.dataDesejada,
        horaDesejada: form.horaDesejada,
        rua: form.rua,
        numero: form.numero,
        bairro: form.bairro,
        cidade: form.cidade,
        observacoes: form.observacoes
      }
    }),
    onSuccess: () => {
      toast.success("Pedido enviado!", {
        description: "Vamos confirmar pelo WhatsApp."
      });
      const jackPhone = (config?.whatsapp ?? "").replace(/\D+/g, "");
      if (jackPhone) {
        const endereco = [[form.rua, form.numero].filter(Boolean).join(", "), form.bairro, form.cidade].filter(Boolean).join(" - ");
        const msg = ["Novo pedido recebido pelo catálogo Cakes By Jack", "", `Cliente: ${form.clienteNome}`, `WhatsApp: ${form.whatsapp}`, `Produto: ${produto.nome}`, `Quantidade: ${form.quantidade}`, `Valor Total: ${formatBRL(total)}`, `Entrada mínima (50%): ${formatBRL(entradaMin)}`, `Data desejada: ${form.dataDesejada || "A combinar"}`, `Horário: ${form.horaDesejada || "A combinar"}`, `Endereço: ${endereco || "—"}`, `Observações: ${form.observacoes || "—"}`, "", "Status: Aguardando confirmação"].join("\n");
        const url = `https://wa.me/${jackPhone}?text=${encodeURIComponent(msg)}`;
        window.open(url, "_blank");
      }
      onDone();
    },
    onError: (e) => toast.error(e.message)
  });
  const copyPix = async () => {
    if (!config?.chavePix) return;
    try {
      await navigator.clipboard.writeText(config.chavePix);
      toast.success("Chave Pix copiada");
    } catch {
      toast.error("Não foi possível copiar");
    }
  };
  const valid = form.clienteNome.trim().length >= 2 && form.whatsapp.replace(/\D+/g, "").length >= 8 && !!form.dataDesejada && !!form.horaDesejada && !!form.rua.trim() && !!form.numero.trim() && !!form.bairro.trim() && !!form.cidade.trim() && total > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[92vh] w-[calc(100vw-1rem)] max-w-lg overflow-y-auto p-4 sm:p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { className: "text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-2xl", children: produto.nome }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-rose-deep", children: "Preencha seu pedido" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Dados do pedido", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Data desejada *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: form.dataDesejada, onChange: (e) => setForm({
          ...form,
          dataDesejada: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Horário *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "time", value: form.horaDesejada, onChange: (e) => setForm({
          ...form,
          horaDesejada: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Quantidade *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 1, value: form.quantidade, onChange: (e) => setForm({
          ...form,
          quantidade: Math.max(1, +e.target.value || 1)
        }) }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Dados do cliente", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Seu nome *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.clienteNome, onChange: (e) => setForm({
          ...form,
          clienteNome: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "WhatsApp *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { inputMode: "numeric", placeholder: "(00) 00000-0000", value: form.whatsapp, onChange: (e) => setForm({
          ...form,
          whatsapp: e.target.value
        }) }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Endereço de entrega", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-[1fr_120px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Rua *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.rua, onChange: (e) => setForm({
            ...form,
            rua: e.target.value
          }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Número *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.numero, onChange: (e) => setForm({
            ...form,
            numero: e.target.value
          }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Bairro *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.bairro, onChange: (e) => setForm({
            ...form,
            bairro: e.target.value
          }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Cidade *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.cidade, onChange: (e) => setForm({
            ...form,
            cidade: e.target.value
          }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Pagamento", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-gold/40 bg-gradient-rose/40 p-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Preço unitário" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formatBRL(precoUnit) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Quantidade" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: form.quantidade })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex justify-between border-t border-border/60 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Total do pedido" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-primary text-lg", children: formatBRL(total) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex justify-between rounded-md bg-warning/15 px-2 py-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Entrada mínima (50%)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formatBRL(entradaMin) })
          ] })
        ] }),
        config?.chavePix && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border-2 border-primary/30 bg-primary/5 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-primary", children: "Chave Pix" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 break-all font-mono text-sm", children: config.chavePix }),
          config.nomeRecebedor && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
            config.nomeRecebedor,
            config.banco ? ` — ${config.banco}` : "",
            config.tipoPix ? ` (${config.tipoPix})` : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", size: "sm", variant: "outline", onClick: copyPix, className: "mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" }),
            " Copiar chave Pix"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-relaxed text-muted-foreground", children: "Para confirmar o pedido é necessário realizar o pagamento de pelo menos 50% do valor total. Após o envio, a Cakes By Jack vai verificar disponibilidade e entrar em contato pelo WhatsApp." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Observações", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 2, value: form.observacoes, onChange: (e) => setForm({
        ...form,
        observacoes: e.target.value
      }), placeholder: "Sabor, recheio, mensagem..." }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { disabled: !valid || mut.isPending, onClick: () => mut.mutate(), className: "bg-gradient-primary w-full sm:w-auto", children: [
      mut.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
      total <= 0 ? "Preço indisponível" : "Enviar pedido"
    ] }) })
  ] });
}
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 rounded-xl border border-border/60 bg-card/60 p-3 sm:p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-deep", children: title }),
    children
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
  PublicCatalog as component
};
