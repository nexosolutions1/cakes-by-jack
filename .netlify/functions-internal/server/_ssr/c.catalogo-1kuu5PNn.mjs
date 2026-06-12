import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery, a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { h as heroCake } from "./catalogo-hero-bolo-DaHLwWTF.mjs";
import { j as jackPremium } from "./jack-confeitaria-premium-CpcJpWBm.mjs";
import { J as listProdutosPublico, z as getConfig, I as Input, D as Dialog, k as DialogTrigger, B as Button, e as DialogContent, f as DialogHeader, g as DialogTitle, T as Textarea, h as DialogFooter, L as Label, K as createPedidoPublico } from "./router-C4tcv7sc.mjs";
import { C as Card, c as CardContent } from "./card-acCiEC5p.mjs";
import { B as Badge } from "./badge-Do_NBdl2.mjs";
import { p as publicImageUrl } from "./image-storage-C3FCaYPT.mjs";
import { B as BrandLogo } from "./brand-logo-C_BRZq5w.mjs";
import { a as formatBRL, b as parseMoney } from "./format-DkCAcujl.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { r as Instagram, l as MessageCircle, s as ShoppingCart, t as ShoppingBag, u as Minus, c as Plus, T as Trash2, v as Copy, L as LoaderCircle } from "../_libs/lucide-react.mjs";
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
import "./server-DoEYPU5W.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
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
const novaLogo = "/assets/nova-logo-6L4Oqsqi.png";
const RETIRADA = {
  rua: "José Vargas",
  numero: "40",
  bairro: "Centro",
  cidade: "Camanducaia"
};
const JACK_WHATSAPP_PHONE = "553597479182";
const WHATSAPP_QUICK_URL = `https://wa.me/${JACK_WHATSAPP_PHONE}?text=${encodeURIComponent("Olá Jack! Vi seu catálogo online e gostaria de fazer um pedido.")}`;
const OPCOES_ENTREGA = [{
  id: "camanducaia-proximo-centro",
  label: "Camanducaia — bairros próximos ao centro",
  taxa: 5
}, {
  id: "camanducaia-afastado",
  label: "Camanducaia — bairros afastados",
  taxa: 10
}, {
  id: "itapeva",
  label: "Itapeva",
  taxa: 20
}, {
  id: "extrema",
  label: "Extrema",
  taxa: 30
}];
function formatDateInput(value) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}
function formatTimeInput(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}:${digits.slice(2)}`;
}
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
  const createCartPedido = useServerFn(createPedidoPublico);
  const [search, setSearch] = reactExports.useState("");
  const [cat, setCat] = reactExports.useState("Todos");
  const [carrinho, setCarrinho] = reactExports.useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const salvo = window.localStorage.getItem("cakes-by-jack-carrinho");
      return salvo ? JSON.parse(salvo) : [];
    } catch {
      return [];
    }
  });
  const [cartForm, setCartForm] = reactExports.useState({
    clienteNome: "",
    whatsapp: "",
    dataDesejada: "",
    horaDesejada: "",
    tipoAtendimento: "entrega",
    opcaoEntrega: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    observacoes: ""
  });
  reactExports.useEffect(() => {
    window.localStorage.setItem("cakes-by-jack-carrinho", JSON.stringify(carrinho));
  }, [carrinho]);
  function adicionarAoCarrinho(produto) {
    const preco = parseMoney(produto.preco);
    setCarrinho((atual) => {
      const existente = atual.find((item) => item.id === produto.id);
      if (existente) {
        return atual.map((item) => item.id === produto.id ? {
          ...item,
          quantidade: item.quantidade + 1
        } : item);
      }
      return [...atual, {
        id: produto.id,
        nome: produto.nome,
        preco,
        quantidade: 1,
        imagem: produto.imagem
      }];
    });
    toast.success("Produto adicionado ao carrinho");
  }
  function alterarQuantidade(id, quantidade) {
    if (quantidade <= 0) {
      removerDoCarrinho(id);
      return;
    }
    setCarrinho((atual) => atual.map((item) => item.id === id ? {
      ...item,
      quantidade
    } : item));
  }
  function removerDoCarrinho(id) {
    setCarrinho((atual) => atual.filter((item) => item.id !== id));
  }
  const totalCarrinho = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  const totalItensCarrinho = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  const entregaCarrinhoSelecionada = OPCOES_ENTREGA.find((opcao) => opcao.id === cartForm.opcaoEntrega);
  const taxaEntregaCarrinho = cartForm.tipoAtendimento === "entrega" ? entregaCarrinhoSelecionada?.taxa ?? 0 : 0;
  const totalPedidoCarrinho = totalCarrinho + taxaEntregaCarrinho;
  const entradaMinCarrinho = totalPedidoCarrinho * 0.5;
  const enderecoCarrinhoFinal = cartForm.tipoAtendimento === "retirada" ? `${RETIRADA.rua}, ${RETIRADA.numero} - ${RETIRADA.bairro} - ${RETIRADA.cidade}` : [[cartForm.rua, cartForm.numero].filter(Boolean).join(", "), cartForm.bairro, cartForm.cidade].filter(Boolean).join(" - ");
  const carrinhoValido = carrinho.length > 0 && cartForm.clienteNome.trim().length >= 2 && cartForm.whatsapp.replace(/\D+/g, "").length >= 8 && cartForm.dataDesejada.trim().length === 10 && cartForm.horaDesejada.trim().length === 5 && (cartForm.tipoAtendimento === "retirada" || !!cartForm.opcaoEntrega && !!cartForm.rua.trim() && !!cartForm.numero.trim() && !!cartForm.bairro.trim() && !!cartForm.cidade.trim());
  function montarMensagemCarrinho() {
    const itens = carrinho.map((item, index) => `${index + 1}. ${item.nome}
   Qtd: ${item.quantidade}
   Unitário: ${formatBRL(item.preco)}
   Subtotal: ${formatBRL(item.preco * item.quantidade)}`);
    return ["🎂 NOVO PEDIDO — CAKES BY JACK", "", "👤 DADOS DO CLIENTE", `Nome: ${cartForm.clienteNome}`, `WhatsApp: ${cartForm.whatsapp}`, "", "📅 DATA DO PEDIDO", `Data desejada: ${cartForm.dataDesejada}`, `Horário: ${cartForm.horaDesejada}`, "", "🧁 ITENS DO PEDIDO", ...itens, "", "🚚 ENTREGA / RETIRADA", `Tipo: ${cartForm.tipoAtendimento === "retirada" ? "Retirada" : "Entrega"}`, cartForm.tipoAtendimento === "retirada" ? `Endereço de retirada: ${enderecoCarrinhoFinal}` : `Região da entrega: ${entregaCarrinhoSelecionada?.label || "—"}`, cartForm.tipoAtendimento === "entrega" ? `Endereço de entrega: ${enderecoCarrinhoFinal || "—"}` : "", cartForm.tipoAtendimento === "entrega" ? `Taxa de entrega: ${formatBRL(taxaEntregaCarrinho)}` : "", "", "💰 VALORES", `Subtotal dos produtos: ${formatBRL(totalCarrinho)}`, `Total do pedido: ${formatBRL(totalPedidoCarrinho)}`, `Entrada mínima (50%): ${formatBRL(entradaMinCarrinho)}`, "", "💳 PIX", config?.chavePix ? `Chave Pix: ${config.chavePix}` : "Chave Pix: —", config?.nomeRecebedor ? `Recebedor: ${config.nomeRecebedor}` : "", "", "📝 OBSERVAÇÕES", cartForm.observacoes || "—", "", "Status: Aguardando confirmação ✅"].filter(Boolean).join("\n");
  }
  function abrirWhatsAppCarrinho(whatsappWindow) {
    const msg = montarMensagemCarrinho();
    const whatsappFinalUrl = `https://wa.me/${JACK_WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
    if (whatsappWindow) {
      whatsappWindow.location.href = whatsappFinalUrl;
      return;
    }
    window.location.href = whatsappFinalUrl;
  }
  const salvarPedidoCarrinho = useMutation({
    mutationFn: (_whatsappWindow) => {
      const itensResumo = carrinho.map((item) => `${item.quantidade}x ${item.nome} — ${formatBRL(item.preco * item.quantidade)}`).join(" | ");
      const observacoesSistema = ["PEDIDO FEITO PELO CARRINHO DO CATÁLOGO ONLINE", "", "Itens:", itensResumo, "", `Tipo de atendimento: ${cartForm.tipoAtendimento === "retirada" ? "Retirada" : "Entrega"}`, cartForm.tipoAtendimento === "retirada" ? `Endereço de retirada: ${enderecoCarrinhoFinal}` : `Região da entrega: ${entregaCarrinhoSelecionada?.label || "—"}`, cartForm.tipoAtendimento === "entrega" ? `Endereço de entrega: ${enderecoCarrinhoFinal || "—"}` : "", cartForm.tipoAtendimento === "entrega" ? `Taxa de entrega: ${formatBRL(taxaEntregaCarrinho)}` : "", "", `Subtotal produtos: ${formatBRL(totalCarrinho)}`, `Total do pedido: ${formatBRL(totalPedidoCarrinho)}`, `Entrada mínima (50%): ${formatBRL(entradaMinCarrinho)}`, cartForm.observacoes ? `Observações do cliente: ${cartForm.observacoes}` : ""].filter(Boolean).join("\n");
      return createCartPedido({
        data: {
          produtoId: "CARRINHO",
          produtoNome: `Pedido com ${totalItensCarrinho} item(ns)`,
          preco: totalPedidoCarrinho,
          quantidade: 1,
          clienteNome: cartForm.clienteNome,
          whatsapp: cartForm.whatsapp,
          dataDesejada: cartForm.dataDesejada,
          horaDesejada: cartForm.horaDesejada,
          rua: cartForm.tipoAtendimento === "retirada" ? RETIRADA.rua : cartForm.rua,
          numero: cartForm.tipoAtendimento === "retirada" ? RETIRADA.numero : cartForm.numero,
          bairro: cartForm.tipoAtendimento === "retirada" ? RETIRADA.bairro : cartForm.bairro,
          cidade: cartForm.tipoAtendimento === "retirada" ? RETIRADA.cidade : cartForm.cidade,
          observacoes: observacoesSistema
        }
      });
    },
    onSuccess: (_data, whatsappWindow) => {
      toast.success("Pedido salvo no sistema!", {
        description: "Agora vamos abrir o WhatsApp da Jack com o pedido formatado."
      });
      abrirWhatsAppCarrinho(whatsappWindow);
      setCarrinho([]);
    },
    onError: (e) => {
      toast.error("Não foi possível salvar o pedido no sistema", {
        description: e.message
      });
    }
  });
  async function copyPixCarrinho() {
    if (!config?.chavePix) return;
    try {
      await navigator.clipboard.writeText(config.chavePix);
      toast.success("Chave Pix copiada");
    } catch {
      toast.error("Não foi possível copiar");
    }
  }
  function finalizarPedidoCarrinho() {
    if (!carrinhoValido) {
      toast.error("Preencha os dados obrigatórios do pedido");
      return;
    }
    const whatsappWindow = window.open("", "_blank");
    salvarPedidoCarrinho.mutate(whatsappWindow);
  }
  const categorias = reactExports.useMemo(() => ["Todos", ...Array.from(new Set(produtos.map((p) => p.categoria).filter(Boolean)))], [produtos]);
  const filtered = reactExports.useMemo(() => produtos.filter((p) => (cat === "Todos" || p.categoria === cat) && p.nome.toLowerCase().includes(search.toLowerCase())), [produtos, cat, search]);
  const whatsappUrl = WHATSAPP_QUICK_URL;
  const instagramUrl = "https://www.instagram.com/cakesbyjack_";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-6 right-6 opacity-0 pointer-events-none z-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: novaLogo, alt: "Nova Nexo", className: "w-40" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden border-b border-border bg-gradient-rose", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-35", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroCake, alt: "", className: "h-full w-full object-cover object-center" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/45 to-background/20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-primary-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BrandLogo, { size: 64 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.35em] opacity-90", children: "Confeitaria Artesanal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-semibold leading-tight md:text-6xl", children: config?.nome || "Cakes By Jack" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-xl text-base leading-relaxed opacity-95 md:text-lg", children: "Bolos, tortas e doces artesanais feitos sob encomenda, com carinho, capricho e aquele toque especial para adoçar seus melhores momentos." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-[2rem] border border-white/40 bg-white/20 p-3 shadow-elevated backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: jackPremium, alt: "Jack, confeiteira da Cakes By Jack", className: "aspect-[4/5] w-full rounded-[1.5rem] object-cover" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 rounded-3xl border border-border bg-card p-5 shadow-card md:p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.25em] text-rose-deep", children: "Sobre a Jack" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display mt-1 text-2xl font-semibold text-chocolate", children: "Feito com carinho, para momentos especiais." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground", children: "Olá, eu sou a Jack! Sou apaixonada por confeitaria artesanal e preparo cada encomenda com atenção aos detalhes, ingredientes selecionados e muito amor." })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.25em] text-rose-deep", children: "Catálogo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-semibold text-chocolate", children: "Escolha sua delícia" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex flex-col gap-3 md:flex-row md:items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Buscar produto...", value: search, onChange: (e) => setSearch(e.target.value), className: "max-w-sm bg-card" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: categorias.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCat(c), className: `rounded-full border px-3 py-1 text-xs font-medium transition ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-primary/40"}`, children: c }, c)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: filtered.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { produto: p, config, onAddCart: adicionarAoCarrinho }, p.id)) }),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-16 text-center text-muted-foreground", children: "Nenhum produto encontrado." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed bottom-6 right-6 z-50 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: instagramUrl, target: "_blank", rel: "noreferrer", className: "inline-flex h-14 w-14 items-center justify-center rounded-full bg-pink-500 text-white shadow-xl transition hover:scale-105 hover:bg-pink-600", "aria-label": "Ver Instagram da Cakes By Jack", title: "Instagram da Cakes By Jack", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-7 w-7" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: whatsappUrl, target: "_blank", rel: "noreferrer", className: "inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl transition hover:scale-105 hover:bg-green-600", "aria-label": "Falar com a Jack pelo WhatsApp", title: "Falar com a Jack", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-7 w-7" }) })
    ] }),
    carrinho.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-6 left-6 z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", className: "rounded-full bg-gradient-primary shadow-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "mr-2 h-5 w-5" }),
        "Carrinho (",
        totalItensCarrinho,
        ")"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[92vh] w-[calc(100vw-1rem)] max-w-2xl overflow-y-auto rounded-[2rem] border-primary/20 bg-gradient-to-b from-background via-pink-50/70 to-background p-4 shadow-elevated backdrop-blur sm:p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-3xl text-chocolate", children: "Seu pedido" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Confira os itens, escolha entrega ou retirada. Ao finalizar, o pedido cai no sistema e também abre o WhatsApp da Jack." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pr-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Itens do carrinho", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: carrinho.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 rounded-2xl border border-primary/10 bg-white/70 p-3 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-primary/10 bg-gradient-rose shadow-sm", children: item.imagem ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: publicImageUrl(item.imagem), alt: item.nome, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center text-rose-deep/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-6 w-6" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-medium", children: item.nome }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  formatBRL(item.preco),
                  " cada"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary", children: formatBRL(item.preco * item.quantidade) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", size: "icon", variant: "outline", onClick: () => alterarQuantidade(item.id, item.quantidade - 1), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 text-center font-medium", children: item.quantidade }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", size: "icon", variant: "outline", onClick: () => alterarQuantidade(item.id, item.quantidade + 1), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", size: "icon", variant: "destructive", onClick: () => removerDoCarrinho(item.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
            ] })
          ] }, item.id)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Dados do pedido", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Data desejada *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { inputMode: "numeric", placeholder: "dd/mm/aaaa", maxLength: 10, value: cartForm.dataDesejada, onChange: (e) => setCartForm({
              ...cartForm,
              dataDesejada: formatDateInput(e.target.value)
            }), className: "h-11 rounded-2xl border-primary/20 bg-white/80 shadow-sm placeholder:text-muted-foreground/70 focus-visible:ring-primary/30" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Horário *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { inputMode: "numeric", placeholder: "hh:mm", maxLength: 5, value: cartForm.horaDesejada, onChange: (e) => setCartForm({
              ...cartForm,
              horaDesejada: formatTimeInput(e.target.value)
            }), className: "h-11 rounded-2xl border-primary/20 bg-white/80 shadow-sm placeholder:text-muted-foreground/70 focus-visible:ring-primary/30" }) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Dados do cliente", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Seu nome *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: cartForm.clienteNome, onChange: (e) => setCartForm({
              ...cartForm,
              clienteNome: e.target.value
            }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "WhatsApp *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { inputMode: "numeric", placeholder: "(00) 00000-0000", value: cartForm.whatsapp, onChange: (e) => setCartForm({
              ...cartForm,
              whatsapp: e.target.value
            }) }) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Entrega ou retirada", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setCartForm({
                ...cartForm,
                tipoAtendimento: "retirada",
                opcaoEntrega: ""
              }), className: `rounded-xl border p-3 text-left text-sm transition ${cartForm.tipoAtendimento === "retirada" ? "border-primary bg-primary/10 text-primary" : "border-border bg-card hover:border-primary/40"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "block", children: "Retirada" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Retirar no endereço da Cakes By Jack" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setCartForm({
                ...cartForm,
                tipoAtendimento: "entrega"
              }), className: `rounded-xl border p-3 text-left text-sm transition ${cartForm.tipoAtendimento === "entrega" ? "border-primary bg-primary/10 text-primary" : "border-border bg-card hover:border-primary/40"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "block", children: "Entrega" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Receber no endereço informado" })
              ] })
            ] }),
            cartForm.tipoAtendimento === "retirada" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-gold/40 bg-gradient-rose/40 p-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-chocolate", children: "Endereço de retirada" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-muted-foreground", children: [
                "Rua ",
                RETIRADA.rua,
                ", nº ",
                RETIRADA.numero,
                " — ",
                RETIRADA.bairro,
                " —",
                " ",
                RETIRADA.cidade
              ] })
            ] }),
            cartForm.tipoAtendimento === "entrega" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: "Selecione a região da entrega *" }),
              OPCOES_ENTREGA.map((opcao) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setCartForm({
                ...cartForm,
                opcaoEntrega: opcao.id
              }), className: `flex items-center justify-between rounded-xl border p-3 text-left text-sm transition ${cartForm.opcaoEntrega === opcao.id ? "border-primary bg-primary/10 text-primary" : "border-border bg-card hover:border-primary/40"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: opcao.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formatBRL(opcao.taxa) })
              ] }, opcao.id))
            ] })
          ] }),
          cartForm.tipoAtendimento === "entrega" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Endereço de entrega", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-[1fr_120px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Rua *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: cartForm.rua, onChange: (e) => setCartForm({
                ...cartForm,
                rua: e.target.value
              }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Número *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: cartForm.numero, onChange: (e) => setCartForm({
                ...cartForm,
                numero: e.target.value
              }) }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Bairro *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: cartForm.bairro, onChange: (e) => setCartForm({
                ...cartForm,
                bairro: e.target.value
              }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Cidade *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: cartForm.cidade, onChange: (e) => setCartForm({
                ...cartForm,
                cidade: e.target.value
              }) }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Pagamento", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-gold/40 bg-gradient-rose/40 p-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal produtos" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formatBRL(totalCarrinho) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Taxa de entrega" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formatBRL(taxaEntregaCarrinho) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex justify-between border-t border-border/60 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Total do pedido" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-primary text-lg", children: formatBRL(totalPedidoCarrinho) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex justify-between rounded-md bg-warning/15 px-2 py-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Entrada mínima (50%)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formatBRL(entradaMinCarrinho) })
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
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", size: "sm", variant: "outline", onClick: copyPixCarrinho, className: "mt-3 rounded-full border-primary/30 bg-white/70 text-primary hover:bg-primary/10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" }),
                " Copiar chave Pix"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Observações", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 2, value: cartForm.observacoes, onChange: (e) => setCartForm({
            ...cartForm,
            observacoes: e.target.value
          }), placeholder: "Sabor, recheio, mensagem..." }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { className: "border-t pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", disabled: !carrinhoValido || salvarPedidoCarrinho.isPending, className: "w-full rounded-full bg-gradient-primary shadow-soft", onClick: finalizarPedidoCarrinho, children: [
          salvarPedidoCarrinho.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          "Salvar no sistema e enviar no WhatsApp"
        ] }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border mt-12 bg-card/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 py-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Desenvolvido por" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "\n    font-mono\n    font-bold\n    tracking-[0.35em]\n    uppercase\n    text-primary\n  " }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: novaLogo, alt: "Nova Nexo", className: "mx-auto mb-4 h-28 w-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "\n    font-mono\n    font-bold\n    tracking-[0.35em]\n    uppercase\n    text-primary\n  ", children: "NOVA Nexo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://www.instagram.com/novanexoofc?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", target: "_blank", rel: "noreferrer", className: "mt-3 flex items-center justify-center gap-2 text-pink-500 hover:text-pink-600", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-4 w-4" }),
        "@novanexoofc"
      ] })
    ] }) })
  ] });
}
function ProductCard({
  produto,
  onAddCart
}) {
  const img = publicImageUrl(produto.imagem);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "flex h-full overflow-hidden border-border shadow-card transition hover:-translate-y-0.5 hover:shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full w-full flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-rose aspect-[4/3] overflow-hidden", children: img ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, alt: produto.nome, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center text-rose-deep/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-12 w-12" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-1 flex-col p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "mb-3 w-fit border-gold/40 text-chocolate", children: produto.categoria }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display min-h-[3.5rem] text-xl font-semibold leading-tight text-chocolate", children: produto.nome }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 min-h-[3rem] text-sm text-muted-foreground", children: produto.descricao || "Produto artesanal feito sob encomenda." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-end justify-between gap-3 pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "kpi-number whitespace-nowrap text-primary", children: formatBRL(produto.preco) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", className: "shrink-0 rounded-full bg-gradient-primary px-5 shadow-soft", onClick: () => onAddCart(produto), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-4 w-4" }),
          "Adicionar"
        ] })
      ] })
    ] })
  ] }) });
}
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 rounded-3xl border border-primary/10 bg-white/75 p-4 shadow-sm sm:p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.28em] text-primary", children: title }),
    children
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: label }),
    children
  ] });
}
export {
  PublicCatalog as component
};
