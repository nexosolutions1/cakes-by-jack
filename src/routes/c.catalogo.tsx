import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import heroCake from "@/assets/catalogo-hero-bolo.png";
import jackPremium from "@/assets/jack-confeitaria-premium.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import novaLogo from "@/assets/nova-logo.png";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Copy,
  Instagram,
  Loader2,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import {
  createPedidoPublico,
  getConfig,
  listProdutosPublico,
  type ConfigData,
  type ProdutoPublico,
} from "@/lib/sheets.functions";
import { publicImageUrl } from "@/lib/image-storage";
import { BrandLogo } from "@/components/brand-logo";
import { formatBRL, parseMoney } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/c/catalogo")({
  head: () => ({
    meta: [
      { title: "Cakes by Jack — Catálogo" },
      { name: "description", content: "Bolos e doces artesanais. Faça seu pedido." },
    ],
  }),
  component: PublicCatalog,
});

const RETIRADA = {
  rua: "José Vargas",
  numero: "40",
  bairro: "Centro",
  cidade: "Camanducaia",
};

const JACK_WHATSAPP_PHONE = "553597479182";
const WHATSAPP_QUICK_URL = `https://wa.me/${JACK_WHATSAPP_PHONE}?text=${encodeURIComponent(
  "Olá Jack! Vi seu catálogo online e gostaria de fazer um pedido.",
)}`;

const OPCOES_ENTREGA = [
  {
    id: "camanducaia-proximo-centro",
    label: "Camanducaia — bairros próximos ao centro",
    taxa: 5,
  },
  {
    id: "camanducaia-afastado",
    label: "Camanducaia — bairros afastados",
    taxa: 10,
  },
  {
    id: "itapeva",
    label: "Itapeva",
    taxa: 20,
  },
  {
    id: "extrema",
    label: "Extrema",
    taxa: 30,
  },
  
];


function formatDateInput(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function formatTimeInput(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}:${digits.slice(2)}`;
}

type CarrinhoItem = {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  imagem?: string;
};

function PublicCatalog() {
  const { data: produtos = [] } = useQuery({
    queryKey: ["produtos-publico"],
    queryFn: () => listProdutosPublico(),
  });

  const { data: config } = useQuery({
    queryKey: ["config"],
    queryFn: () => getConfig(),
  });

  const createCartPedido = useServerFn(createPedidoPublico);

  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("Todos");

  const [carrinho, setCarrinho] = useState<CarrinhoItem[]>(() => {
    if (typeof window === "undefined") return [];

    try {
      const salvo = window.localStorage.getItem("cakes-by-jack-carrinho");
      return salvo ? (JSON.parse(salvo) as CarrinhoItem[]) : [];
    } catch {
      return [];
    }
  });

  const [cartForm, setCartForm] = useState({
    clienteNome: "",
    whatsapp: "",
    dataDesejada: "",
    horaDesejada: "",
    tipoAtendimento: "entrega" as "entrega" | "retirada",
    opcaoEntrega: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    observacoes: "",
  });

  useEffect(() => {
    window.localStorage.setItem("cakes-by-jack-carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

function adicionarAoCarrinho(produto: ProdutoPublico) {
  const preco = parseMoney(produto.preco);

  setCarrinho((atual) => {
    const existente = atual.find((item) => item.id === produto.id);

    if (existente) {
      return atual.map((item) =>
        item.id === produto.id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item,
      );
    }

    return [
      ...atual,
      {
        id: produto.id,
        nome: produto.nome,
        preco,
        quantidade: 1,
        imagem: produto.imagem,
      },
    ];
  });

  toast.success("Produto adicionado ao carrinho");
}

function alterarQuantidade(id: string, quantidade: number) {
  if (quantidade <= 0) {
    removerDoCarrinho(id);
    return;
  }

  setCarrinho((atual) =>
    atual.map((item) =>
      item.id === id ? { ...item, quantidade } : item,
    ),
  );
}

function removerDoCarrinho(id: string) {
  setCarrinho((atual) => atual.filter((item) => item.id !== id));
}

const totalCarrinho = carrinho.reduce(
  (acc, item) => acc + item.preco * item.quantidade,
  0,
);

const totalItensCarrinho = carrinho.reduce(
  (acc, item) => acc + item.quantidade,
  0,
);

const entregaCarrinhoSelecionada = OPCOES_ENTREGA.find(
  (opcao) => opcao.id === cartForm.opcaoEntrega,
);
const taxaEntregaCarrinho =
  cartForm.tipoAtendimento === "entrega"
    ? entregaCarrinhoSelecionada?.taxa ?? 0
    : 0;
const totalPedidoCarrinho = totalCarrinho + taxaEntregaCarrinho;
const entradaMinCarrinho = totalPedidoCarrinho * 0.5;

const enderecoCarrinhoFinal =
  cartForm.tipoAtendimento === "retirada"
    ? `${RETIRADA.rua}, ${RETIRADA.numero} - ${RETIRADA.bairro} - ${RETIRADA.cidade}`
    : [
        [cartForm.rua, cartForm.numero].filter(Boolean).join(", "),
        cartForm.bairro,
        cartForm.cidade,
      ]
        .filter(Boolean)
        .join(" - ");

const carrinhoValido =
  carrinho.length > 0 &&
  cartForm.clienteNome.trim().length >= 2 &&
  cartForm.whatsapp.replace(/\D+/g, "").length >= 8 &&
  cartForm.dataDesejada.trim().length === 10 &&
  cartForm.horaDesejada.trim().length === 5 &&
  (cartForm.tipoAtendimento === "retirada" ||
    (!!cartForm.opcaoEntrega &&
      !!cartForm.rua.trim() &&
      !!cartForm.numero.trim() &&
      !!cartForm.bairro.trim() &&
      !!cartForm.cidade.trim()));

function montarMensagemCarrinho() {
  const itens = carrinho.map(
    (item, index) =>
      `${index + 1}. ${item.nome}
   Qtd: ${item.quantidade}
   Unitário: ${formatBRL(item.preco)}
   Subtotal: ${formatBRL(item.preco * item.quantidade)}`,
  );

  return [
    "🎂 NOVO PEDIDO — CAKES BY JACK",
    "",
    "👤 DADOS DO CLIENTE",
    `Nome: ${cartForm.clienteNome}`,
    `WhatsApp: ${cartForm.whatsapp}`,
    "",
    "📅 DATA DO PEDIDO",
    `Data desejada: ${cartForm.dataDesejada}`,
    `Horário: ${cartForm.horaDesejada}`,
    "",
    "🧁 ITENS DO PEDIDO",
    ...itens,
    "",
    "🚚 ENTREGA / RETIRADA",
    `Tipo: ${cartForm.tipoAtendimento === "retirada" ? "Retirada" : "Entrega"}`,
    cartForm.tipoAtendimento === "retirada"
      ? `Endereço de retirada: ${enderecoCarrinhoFinal}`
      : `Região da entrega: ${entregaCarrinhoSelecionada?.label || "—"}`,
    cartForm.tipoAtendimento === "entrega"
      ? `Endereço de entrega: ${enderecoCarrinhoFinal || "—"}`
      : "",
    cartForm.tipoAtendimento === "entrega"
      ? `Taxa de entrega: ${formatBRL(taxaEntregaCarrinho)}`
      : "",
    "",
    "💰 VALORES",
    `Subtotal dos produtos: ${formatBRL(totalCarrinho)}`,
    `Total do pedido: ${formatBRL(totalPedidoCarrinho)}`,
    `Entrada mínima (50%): ${formatBRL(entradaMinCarrinho)}`,
    "",
    "💳 PIX",
    config?.chavePix ? `Chave Pix: ${config.chavePix}` : "Chave Pix: —",
    config?.nomeRecebedor ? `Recebedor: ${config.nomeRecebedor}` : "",
    "",
    "📝 OBSERVAÇÕES",
    cartForm.observacoes || "—",
    "",
    "Status: Aguardando confirmação ✅",
  ]
    .filter(Boolean)
    .join("\n");
}

function abrirWhatsAppCarrinho(whatsappWindow?: Window | null) {
  const msg = montarMensagemCarrinho();
  const whatsappFinalUrl = `https://wa.me/${JACK_WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;

  if (whatsappWindow) {
    whatsappWindow.location.href = whatsappFinalUrl;
    return;
  }

  window.location.href = whatsappFinalUrl;
}

const salvarPedidoCarrinho = useMutation({
  mutationFn: (_whatsappWindow?: Window | null) => {
    const itensResumo = carrinho
      .map(
        (item) =>
          `${item.quantidade}x ${item.nome} — ${formatBRL(item.preco * item.quantidade)}`,
      )
      .join(" | ");

    const observacoesSistema = [
      "PEDIDO FEITO PELO CARRINHO DO CATÁLOGO ONLINE",
      "",
      "Itens:",
      itensResumo,
      "",
      `Tipo de atendimento: ${cartForm.tipoAtendimento === "retirada" ? "Retirada" : "Entrega"}`,
      cartForm.tipoAtendimento === "retirada"
        ? `Endereço de retirada: ${enderecoCarrinhoFinal}`
        : `Região da entrega: ${entregaCarrinhoSelecionada?.label || "—"}`,
      cartForm.tipoAtendimento === "entrega"
        ? `Endereço de entrega: ${enderecoCarrinhoFinal || "—"}`
        : "",
      cartForm.tipoAtendimento === "entrega"
        ? `Taxa de entrega: ${formatBRL(taxaEntregaCarrinho)}`
        : "",
      "",
      `Subtotal produtos: ${formatBRL(totalCarrinho)}`,
      `Total do pedido: ${formatBRL(totalPedidoCarrinho)}`,
      `Entrada mínima (50%): ${formatBRL(entradaMinCarrinho)}`,
      cartForm.observacoes ? `Observações do cliente: ${cartForm.observacoes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

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
        numero:
          cartForm.tipoAtendimento === "retirada" ? RETIRADA.numero : cartForm.numero,
        bairro:
          cartForm.tipoAtendimento === "retirada" ? RETIRADA.bairro : cartForm.bairro,
        cidade:
          cartForm.tipoAtendimento === "retirada" ? RETIRADA.cidade : cartForm.cidade,
        observacoes: observacoesSistema,
      },
    });
  },
  onSuccess: (_data, whatsappWindow) => {
    toast.success("Pedido salvo no sistema!", {
      description: "Agora vamos abrir o WhatsApp da Jack com o pedido formatado.",
    });

    abrirWhatsAppCarrinho(whatsappWindow);
    setCarrinho([]);
  },
  onError: (e: Error) => {
    toast.error("Não foi possível salvar o pedido no sistema", {
      description: e.message,
    });
  },
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

  const categorias = useMemo(
    () => ["Todos", ...Array.from(new Set(produtos.map((p) => p.categoria).filter(Boolean)))],
    [produtos],
  );

  const filtered = useMemo(
    () =>
      produtos.filter(
        (p) =>
          (cat === "Todos" || p.categoria === cat) &&
          p.nome.toLowerCase().includes(search.toLowerCase()),
      ),
    [produtos, cat, search],
  );

const whatsappUrl = WHATSAPP_QUICK_URL;

  const instagramUrl = "https://www.instagram.com/cakesbyjack_";

  return (
<div className="min-h-screen bg-background relative">
<div className="fixed bottom-6 right-6 opacity-0 pointer-events-none z-0">
  <img
    src={novaLogo}
    alt="Nova Nexo"
    className="w-40"
  />
</div>
      <section className="relative overflow-hidden border-b border-border bg-gradient-rose">
        <div className="absolute inset-0 opacity-35">
          <img src={heroCake} alt="" className="h-full w-full object-cover object-center" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/45 to-background/20" />

        <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-14">
          <div className="text-primary-foreground">
            <div className="mb-5 flex items-center gap-4">
              <BrandLogo size={64} />
              <div>
                <p className="text-xs uppercase tracking-[0.35em] opacity-90">
                  Confeitaria Artesanal
                </p>
                <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
                  {config?.nome || "Cakes By Jack"}
                </h1>
              </div>
            </div>

            <p className="max-w-xl text-base leading-relaxed opacity-95 md:text-lg">
              Bolos, tortas e doces artesanais feitos sob encomenda, com carinho,
              capricho e aquele toque especial para adoçar seus melhores momentos.
            </p>

          </div>

          <div className="rounded-[2rem] border border-white/40 bg-white/20 p-3 shadow-elevated backdrop-blur">
            <img
              src={jackPremium}
              alt="Jack, confeiteira da Cakes By Jack"
              className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 rounded-3xl border border-border bg-card p-5 shadow-card md:p-6">
          <div className="grid gap-4 md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-rose-deep">
                Sobre a Jack
              </p>
              <h2 className="font-display mt-1 text-2xl font-semibold text-chocolate">
                Feito com carinho, para momentos especiais.
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Olá, eu sou a Jack! Sou apaixonada por confeitaria artesanal e
                preparo cada encomenda com atenção aos detalhes, ingredientes
                selecionados e muito amor.
              </p>
            </div>

          </div>
        </div>

        <div className="mb-5">
          <p className="text-xs uppercase tracking-[0.25em] text-rose-deep">Catálogo</p>
          <h2 className="font-display text-3xl font-semibold text-chocolate">
            Escolha sua delícia
          </h2>
        </div>

        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center">
          <Input
            placeholder="Buscar produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm bg-card"
          />

          <div className="flex flex-wrap gap-2">
            {categorias.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  cat === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:border-primary/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
<ProductCard
  key={p.id}
  produto={p}
  config={config}
  onAddCart={adicionarAoCarrinho}
/>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">
            Nenhum produto encontrado.
          </p>
        )}
      </section>

      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <a
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-pink-500 text-white shadow-xl transition hover:scale-105 hover:bg-pink-600"
          aria-label="Ver Instagram da Cakes By Jack"
          title="Instagram da Cakes By Jack"
        >
          <Instagram className="h-7 w-7" />
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl transition hover:scale-105 hover:bg-green-600"
          aria-label="Falar com a Jack pelo WhatsApp"
          title="Falar com a Jack"
        >
          <MessageCircle className="h-7 w-7" />
        </a>
      </div>

      {carrinho.length > 0 && (
        <div className="fixed bottom-6 left-6 z-50">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="rounded-full bg-gradient-primary shadow-xl"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Carrinho ({totalItensCarrinho})
              </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[92vh] w-[calc(100vw-1rem)] max-w-2xl overflow-y-auto rounded-[2rem] border-primary/20 bg-gradient-to-b from-background via-pink-50/70 to-background p-4 shadow-elevated backdrop-blur sm:p-6">
              <DialogHeader>
                <DialogTitle className="font-display text-3xl text-chocolate">
                  Seu pedido
                </DialogTitle>
                <p className="text-sm text-muted-foreground">
                  Confira os itens, escolha entrega ou retirada. Ao finalizar, o pedido cai no sistema e também abre o WhatsApp da Jack.
                </p>
              </DialogHeader>

              <div className="space-y-4 pr-1">
                <Section title="Itens do carrinho">
                  <div className="space-y-3">
                    {carrinho.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-primary/10 bg-white/70 p-3 shadow-sm"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-primary/10 bg-gradient-rose shadow-sm">
                            {item.imagem ? (
                              <img
                                src={publicImageUrl(item.imagem)}
                                alt={item.nome}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-rose-deep/40">
                                <ShoppingBag className="h-6 w-6" />
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate font-medium">{item.nome}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatBRL(item.preco)} cada
                            </p>
                            <p className="text-sm font-semibold text-primary">
                              {formatBRL(item.preco * item.quantidade)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            size="icon"
                            variant="outline"
                            onClick={() =>
                              alterarQuantidade(item.id, item.quantidade - 1)
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>

                          <span className="w-6 text-center font-medium">
                            {item.quantidade}
                          </span>

                          <Button
                            type="button"
                            size="icon"
                            variant="outline"
                            onClick={() =>
                              alterarQuantidade(item.id, item.quantidade + 1)
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>

                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            onClick={() => removerDoCarrinho(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>

                <Section title="Dados do pedido">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Data desejada *">
                      <Input
                        inputMode="numeric"
                        placeholder="dd/mm/aaaa"
                        maxLength={10}
                        value={cartForm.dataDesejada}
                        onChange={(e) =>
                          setCartForm({ ...cartForm, dataDesejada: formatDateInput(e.target.value) })
                        }
                        className="h-11 rounded-2xl border-primary/20 bg-white/80 shadow-sm placeholder:text-muted-foreground/70 focus-visible:ring-primary/30"
                      />
                    </Field>

                    <Field label="Horário *">
                      <Input
                        inputMode="numeric"
                        placeholder="hh:mm"
                        maxLength={5}
                        value={cartForm.horaDesejada}
                        onChange={(e) =>
                          setCartForm({ ...cartForm, horaDesejada: formatTimeInput(e.target.value) })
                        }
                        className="h-11 rounded-2xl border-primary/20 bg-white/80 shadow-sm placeholder:text-muted-foreground/70 focus-visible:ring-primary/30"
                      />
                    </Field>
                  </div>
                </Section>

                <Section title="Dados do cliente">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Seu nome *">
                      <Input
                        value={cartForm.clienteNome}
                        onChange={(e) =>
                          setCartForm({ ...cartForm, clienteNome: e.target.value })
                        }
                      />
                    </Field>

                    <Field label="WhatsApp *">
                      <Input
                        inputMode="numeric"
                        placeholder="(00) 00000-0000"
                        value={cartForm.whatsapp}
                        onChange={(e) =>
                          setCartForm({ ...cartForm, whatsapp: e.target.value })
                        }
                      />
                    </Field>
                  </div>
                </Section>

                <Section title="Entrega ou retirada">
                  <div className="grid gap-2 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() =>
                        setCartForm({
                          ...cartForm,
                          tipoAtendimento: "retirada",
                          opcaoEntrega: "",
                        })
                      }
                      className={`rounded-xl border p-3 text-left text-sm transition ${
                        cartForm.tipoAtendimento === "retirada"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card hover:border-primary/40"
                      }`}
                    >
                      <strong className="block">Retirada</strong>
                      <span className="text-xs text-muted-foreground">
                        Retirar no endereço da Cakes By Jack
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setCartForm({ ...cartForm, tipoAtendimento: "entrega" })
                      }
                      className={`rounded-xl border p-3 text-left text-sm transition ${
                        cartForm.tipoAtendimento === "entrega"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card hover:border-primary/40"
                      }`}
                    >
                      <strong className="block">Entrega</strong>
                      <span className="text-xs text-muted-foreground">
                        Receber no endereço informado
                      </span>
                    </button>
                  </div>

                  {cartForm.tipoAtendimento === "retirada" && (
                    <div className="rounded-xl border border-gold/40 bg-gradient-rose/40 p-3 text-sm">
                      <p className="font-medium text-chocolate">Endereço de retirada</p>
                      <p className="mt-1 text-muted-foreground">
                        Rua {RETIRADA.rua}, nº {RETIRADA.numero} — {RETIRADA.bairro} —{" "}
                        {RETIRADA.cidade}
                      </p>
                    </div>
                  )}

                  {cartForm.tipoAtendimento === "entrega" && (
                    <div className="grid gap-2">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Selecione a região da entrega *
                      </p>

                      {OPCOES_ENTREGA.map((opcao) => (
                        <button
                          key={opcao.id}
                          type="button"
                          onClick={() =>
                            setCartForm({ ...cartForm, opcaoEntrega: opcao.id })
                          }
                          className={`flex items-center justify-between rounded-xl border p-3 text-left text-sm transition ${
                            cartForm.opcaoEntrega === opcao.id
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-card hover:border-primary/40"
                          }`}
                        >
                          <span>{opcao.label}</span>
                          <strong>{formatBRL(opcao.taxa)}</strong>
                        </button>
                      ))}
                    </div>
                  )}
                </Section>

                {cartForm.tipoAtendimento === "entrega" && (
                  <Section title="Endereço de entrega">
                    <div className="grid gap-3 sm:grid-cols-[1fr_120px]">
                      <Field label="Rua *">
                        <Input
                          value={cartForm.rua}
                          onChange={(e) =>
                            setCartForm({ ...cartForm, rua: e.target.value })
                          }
                        />
                      </Field>

                      <Field label="Número *">
                        <Input
                          value={cartForm.numero}
                          onChange={(e) =>
                            setCartForm({ ...cartForm, numero: e.target.value })
                          }
                        />
                      </Field>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label="Bairro *">
                        <Input
                          value={cartForm.bairro}
                          onChange={(e) =>
                            setCartForm({ ...cartForm, bairro: e.target.value })
                          }
                        />
                      </Field>

                      <Field label="Cidade *">
                        <Input
                          value={cartForm.cidade}
                          onChange={(e) =>
                            setCartForm({ ...cartForm, cidade: e.target.value })
                          }
                        />
                      </Field>
                    </div>
                  </Section>
                )}

                <Section title="Pagamento">
                  <div className="rounded-xl border border-gold/40 bg-gradient-rose/40 p-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal produtos</span>
                      <strong>{formatBRL(totalCarrinho)}</strong>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Taxa de entrega</span>
                      <strong>{formatBRL(taxaEntregaCarrinho)}</strong>
                    </div>

                    <div className="mt-1 flex justify-between border-t border-border/60 pt-2">
                      <span className="font-medium">Total do pedido</span>
                      <strong className="text-primary text-lg">
                        {formatBRL(totalPedidoCarrinho)}
                      </strong>
                    </div>

                    <div className="mt-2 flex justify-between rounded-md bg-warning/15 px-2 py-1.5">
                      <span>Entrada mínima (50%)</span>
                      <strong>{formatBRL(entradaMinCarrinho)}</strong>
                    </div>
                  </div>

                  {config?.chavePix && (
                    <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                        Chave Pix
                      </p>

                      <p className="mt-1 break-all font-mono text-sm">{config.chavePix}</p>

                      {config.nomeRecebedor && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {config.nomeRecebedor}
                          {config.banco ? ` — ${config.banco}` : ""}
                          {config.tipoPix ? ` (${config.tipoPix})` : ""}
                        </p>
                      )}

                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={copyPixCarrinho}
                        className="mt-3 rounded-full border-primary/30 bg-white/70 text-primary hover:bg-primary/10"
                      >
                        <Copy className="h-3.5 w-3.5" /> Copiar chave Pix
                      </Button>
                    </div>
                  )}
                </Section>

                <Section title="Observações">
                  <Textarea
                    rows={2}
                    value={cartForm.observacoes}
                    onChange={(e) =>
                      setCartForm({ ...cartForm, observacoes: e.target.value })
                    }
                    placeholder="Sabor, recheio, mensagem..."
                  />
                </Section>
              </div>

              <DialogFooter className="border-t pt-4">
                <Button
                  type="button"
                  disabled={!carrinhoValido || salvarPedidoCarrinho.isPending}
                  className="w-full rounded-full bg-gradient-primary shadow-soft"
                  onClick={finalizarPedidoCarrinho}
                >
                  {salvarPedidoCarrinho.isPending && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                  Salvar no sistema e enviar no WhatsApp
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}

      <footer className="border-t border-border mt-12 bg-card/50">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            Desenvolvido por
          </p>

<p
  className="
    font-mono
    font-bold
    tracking-[0.35em]
    uppercase
    text-primary
  "
>
</p>
<img
  src={novaLogo}
  alt="Nova Nexo"
className="mx-auto mb-4 h-28 w-auto"
/>

<p
  className="
    font-mono
    font-bold
    tracking-[0.35em]
    uppercase
    text-primary
  "
>
  NOVA Nexo
</p>

<a
  href="https://www.instagram.com/novanexoofc?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
  target="_blank"
  rel="noreferrer"
className="mt-3 flex items-center justify-center gap-2 text-pink-500 hover:text-pink-600"
>
  <Instagram className="h-4 w-4" />
  @novanexoofc
</a>
        </div>
      </footer>
    </div>
      );
}

function ProductCard({
  produto,
  onAddCart,
}: {
  produto: ProdutoPublico;
  config?: ConfigData;
  onAddCart: (produto: ProdutoPublico) => void;
}) {
  const img = publicImageUrl(produto.imagem);

  return (
    <Card className="flex h-full overflow-hidden border-border shadow-card transition hover:-translate-y-0.5 hover:shadow-elevated">
      <div className="flex h-full w-full flex-col">
        <div className="bg-gradient-rose aspect-[4/3] overflow-hidden">
          {img ? (
            <img src={img} alt={produto.nome} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-rose-deep/30">
              <ShoppingBag className="h-12 w-12" />
            </div>
          )}
        </div>

        <CardContent className="flex flex-1 flex-col p-4">
          <Badge variant="outline" className="mb-3 w-fit border-gold/40 text-chocolate">
            {produto.categoria}
          </Badge>

          <h3 className="font-display min-h-[3.5rem] text-xl font-semibold leading-tight text-chocolate">
            {produto.nome}
          </h3>

          <p className="mt-1 min-h-[3rem] text-sm text-muted-foreground">
            {produto.descricao || "Produto artesanal feito sob encomenda."}
          </p>

          <div className="mt-auto flex items-end justify-between gap-3 pt-4">
            <span className="kpi-number whitespace-nowrap text-primary">
              {formatBRL(produto.preco)}
            </span>

            <Button
              type="button"
              className="shrink-0 rounded-full bg-gradient-primary px-5 shadow-soft"
              onClick={() => onAddCart(produto)}
            >
              <ShoppingCart className="h-4 w-4" />
              Adicionar
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

function OrderDialog({
  produto,
  config,
  onDone,
}: {
  produto: ProdutoPublico;
  config?: ConfigData;
  onDone: () => void;
}) {
  const create = useServerFn(createPedidoPublico);
  const precoUnit = parseMoney(produto.preco);

  const [form, setForm] = useState({
    clienteNome: "",
    whatsapp: "",
    dataDesejada: "",
    horaDesejada: "",
    quantidade: 1,
    tipoAtendimento: "entrega" as "entrega" | "retirada",
    opcaoEntrega: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    observacoes: "",
  });

  const entregaSelecionada = OPCOES_ENTREGA.find((opcao) => opcao.id === form.opcaoEntrega);
  const taxaEntrega = form.tipoAtendimento === "entrega" ? entregaSelecionada?.taxa ?? 0 : 0;
  const subtotal = precoUnit * (form.quantidade || 1);
  const total = subtotal + taxaEntrega;
  const entradaMin = total * 0.5;

  const enderecoFinal =
    form.tipoAtendimento === "retirada"
      ? `${RETIRADA.rua}, ${RETIRADA.numero} - ${RETIRADA.bairro} - ${RETIRADA.cidade}`
      : [
          [form.rua, form.numero].filter(Boolean).join(", "),
          form.bairro,
          form.cidade,
        ]
          .filter(Boolean)
          .join(" - ");

  const observacoesComAtendimento = [
    `Tipo de atendimento: ${form.tipoAtendimento === "retirada" ? "Retirada" : "Entrega"}`,
    form.tipoAtendimento === "retirada"
      ? `Endereço de retirada: ${enderecoFinal}`
      : `Taxa de entrega: ${entregaSelecionada ? `${entregaSelecionada.label} - ${formatBRL(taxaEntrega)}` : "Não selecionada"}`,
    form.observacoes ? `Observações do cliente: ${form.observacoes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const mut = useMutation({
    mutationFn: () =>
      create({
        data: {
          produtoId: produto.id,
          produtoNome: produto.nome,
          preco: precoUnit,
          quantidade: form.quantidade,
          clienteNome: form.clienteNome,
          whatsapp: form.whatsapp,
          dataDesejada: form.dataDesejada,
          horaDesejada: form.horaDesejada,
          rua: form.tipoAtendimento === "retirada" ? RETIRADA.rua : form.rua,
          numero: form.tipoAtendimento === "retirada" ? RETIRADA.numero : form.numero,
          bairro: form.tipoAtendimento === "retirada" ? RETIRADA.bairro : form.bairro,
          cidade: form.tipoAtendimento === "retirada" ? RETIRADA.cidade : form.cidade,
          observacoes: observacoesComAtendimento,
        },
      }),

    onSuccess: () => {
      toast.success("Pedido enviado!", {
        description: "Vamos confirmar pelo WhatsApp.",
      });

      const jackPhone = (config?.whatsapp ?? "").replace(/\D+/g, "");

      if (jackPhone) {
        const msg = [
          "Novo pedido recebido pelo catálogo Cakes By Jack",
          "",
          `Cliente: ${form.clienteNome}`,
          `WhatsApp: ${form.whatsapp}`,
          `Produto: ${produto.nome}`,
          `Quantidade: ${form.quantidade}`,
          `Preço unitário: ${formatBRL(precoUnit)}`,
          `Subtotal: ${formatBRL(subtotal)}`,
          `Tipo de atendimento: ${form.tipoAtendimento === "retirada" ? "Retirada" : "Entrega"}`,
          form.tipoAtendimento === "retirada"
            ? `Endereço de retirada: ${enderecoFinal}`
            : `Opção de entrega: ${entregaSelecionada?.label || "—"}`,
          form.tipoAtendimento === "entrega"
            ? `Taxa de entrega: ${formatBRL(taxaEntrega)}`
            : "",
          form.tipoAtendimento === "entrega"
            ? `Endereço de entrega: ${enderecoFinal || "—"}`
            : "",
          `Valor total: ${formatBRL(total)}`,
          `Entrada mínima (50%): ${formatBRL(entradaMin)}`,
          `Data desejada: ${form.dataDesejada || "A combinar"}`,
          `Horário: ${form.horaDesejada || "A combinar"}`,
          `Observações: ${form.observacoes || "—"}`,
          "",
          "Status: Aguardando confirmação",
        ]
          .filter(Boolean)
          .join("\n");

        const url = `https://wa.me/${jackPhone}?text=${encodeURIComponent(msg)}`;
        window.open(url, "_blank");
      }

      onDone();
    },

    onError: (e: Error) => toast.error(e.message),
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

  const validBase =
    form.clienteNome.trim().length >= 2 &&
    form.whatsapp.replace(/\D+/g, "").length >= 8 &&
    form.dataDesejada.trim().length === 10 &&
    form.horaDesejada.trim().length === 5 &&
    total > 0;

  const validEntrega =
    form.tipoAtendimento === "retirada" ||
    (!!form.opcaoEntrega &&
      !!form.rua.trim() &&
      !!form.numero.trim() &&
      !!form.bairro.trim() &&
      !!form.cidade.trim());

  const valid = validBase && validEntrega;

  return (
    <DialogContent className="max-h-[92vh] w-[calc(100vw-1rem)] max-w-lg overflow-y-auto p-4 sm:p-6">
      <DialogHeader className="text-left">
        <DialogTitle className="font-display text-2xl">{produto.nome}</DialogTitle>
        <p className="text-xs uppercase tracking-[0.18em] text-rose-deep">
          Preencha seu pedido
        </p>
      </DialogHeader>

      <div className="grid gap-4">
        <Section title="Dados do pedido">
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Data desejada *">
              <Input
                inputMode="numeric"
                placeholder="dd/mm/aaaa"
                maxLength={10}
                value={form.dataDesejada}
                onChange={(e) => setForm({ ...form, dataDesejada: formatDateInput(e.target.value) })}
              />
            </Field>

            <Field label="Horário *">
              <Input
                inputMode="numeric"
                placeholder="hh:mm"
                maxLength={5}
                value={form.horaDesejada}
                onChange={(e) => setForm({ ...form, horaDesejada: formatTimeInput(e.target.value) })}
              />
            </Field>

            <Field label="Quantidade *">
              <Input
                type="number"
                min={1}
                value={form.quantidade}
                onChange={(e) =>
                  setForm({ ...form, quantidade: Math.max(1, +e.target.value || 1) })
                }
              />
            </Field>
          </div>
        </Section>

        <Section title="Dados do cliente">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Seu nome *">
              <Input
                value={form.clienteNome}
                onChange={(e) => setForm({ ...form, clienteNome: e.target.value })}
              />
            </Field>

            <Field label="WhatsApp *">
              <Input
                inputMode="numeric"
                placeholder="(00) 00000-0000"
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              />
            </Field>
          </div>
        </Section>

        <Section title="Entrega ou retirada">
          <div className="grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  tipoAtendimento: "retirada",
                  opcaoEntrega: "",
                })
              }
              className={`rounded-xl border p-3 text-left text-sm transition ${
                form.tipoAtendimento === "retirada"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <strong className="block">Retirada</strong>
              <span className="text-xs text-muted-foreground">
                Retirar no endereço da Cakes By Jack
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  tipoAtendimento: "entrega",
                })
              }
              className={`rounded-xl border p-3 text-left text-sm transition ${
                form.tipoAtendimento === "entrega"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <strong className="block">Entrega</strong>
              <span className="text-xs text-muted-foreground">
                Receber no endereço informado
              </span>
            </button>
          </div>

          {form.tipoAtendimento === "retirada" && (
            <div className="rounded-xl border border-gold/40 bg-gradient-rose/40 p-3 text-sm">
              <p className="font-medium text-chocolate">Endereço de retirada</p>
              <p className="mt-1 text-muted-foreground">
                Rua {RETIRADA.rua}, nº {RETIRADA.numero} — {RETIRADA.bairro} —{" "}
                {RETIRADA.cidade}
              </p>
            </div>
          )}

          {form.tipoAtendimento === "entrega" && (
            <div className="grid gap-2">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Selecione a região da entrega *
              </p>

              {OPCOES_ENTREGA.map((opcao) => (
                <button
                  key={opcao.id}
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      opcaoEntrega: opcao.id,
                    })
                  }
                  className={`flex items-center justify-between rounded-xl border p-3 text-left text-sm transition ${
                    form.opcaoEntrega === opcao.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <span>{opcao.label}</span>
                  <strong>{formatBRL(opcao.taxa)}</strong>
                </button>
              ))}
            </div>
          )}
        </Section>

        {form.tipoAtendimento === "entrega" && (
          <Section title="Endereço de entrega">
            <div className="grid gap-3 sm:grid-cols-[1fr_120px]">
              <Field label="Rua *">
                <Input
                  value={form.rua}
                  onChange={(e) => setForm({ ...form, rua: e.target.value })}
                />
              </Field>

              <Field label="Número *">
                <Input
                  value={form.numero}
                  onChange={(e) => setForm({ ...form, numero: e.target.value })}
                />
              </Field>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Bairro *">
                <Input
                  value={form.bairro}
                  onChange={(e) => setForm({ ...form, bairro: e.target.value })}
                />
              </Field>

              <Field label="Cidade *">
                <Input
                  value={form.cidade}
                  onChange={(e) => setForm({ ...form, cidade: e.target.value })}
                />
              </Field>
            </div>
          </Section>
        )}

        <Section title="Pagamento">
          <div className="rounded-xl border border-gold/40 bg-gradient-rose/40 p-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Preço unitário</span>
              <strong>{formatBRL(precoUnit)}</strong>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Quantidade</span>
              <strong>{form.quantidade}</strong>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <strong>{formatBRL(subtotal)}</strong>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Taxa de entrega</span>
              <strong>{formatBRL(taxaEntrega)}</strong>
            </div>

            <div className="mt-1 flex justify-between border-t border-border/60 pt-2">
              <span className="font-medium">Total do pedido</span>
              <strong className="text-primary text-lg">{formatBRL(total)}</strong>
            </div>

            <div className="mt-2 flex justify-between rounded-md bg-warning/15 px-2 py-1.5">
              <span>Entrada mínima (50%)</span>
              <strong>{formatBRL(entradaMin)}</strong>
            </div>
          </div>

          {config?.chavePix && (
            <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Chave Pix
              </p>

              <p className="mt-1 break-all font-mono text-sm">{config.chavePix}</p>

              {config.nomeRecebedor && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {config.nomeRecebedor}
                  {config.banco ? ` — ${config.banco}` : ""}
                  {config.tipoPix ? ` (${config.tipoPix})` : ""}
                </p>
              )}

              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={copyPix}
                className="mt-2"
              >
                <Copy className="h-3.5 w-3.5" /> Copiar chave Pix
              </Button>
            </div>
          )}

          <p className="text-xs leading-relaxed text-muted-foreground">
            Para confirmar o pedido é necessário realizar o pagamento de pelo
            menos 50% do valor total. Após o envio, a Cakes By Jack vai
            verificar disponibilidade e entrar em contato pelo WhatsApp.
          </p>
        </Section>

        <Section title="Observações">
          <Textarea
            rows={2}
            value={form.observacoes}
            onChange={(e) => setForm({ ...form, observacoes: e.target.value })}
            placeholder="Sabor, recheio, mensagem..."
          />
        </Section>
      </div>

      <DialogFooter>
        <Button
          disabled={!valid || mut.isPending}
          onClick={() => mut.mutate()}
          className="bg-gradient-primary w-full sm:w-auto"
        >
          {mut.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {total <= 0 ? "Preço indisponível" : "Enviar pedido"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3 rounded-3xl border border-primary/10 bg-white/75 p-4 shadow-sm sm:p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
        {title}
      </p>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}