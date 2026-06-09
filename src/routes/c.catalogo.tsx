import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Copy, Loader2, ShoppingBag } from "lucide-react";
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

function PublicCatalog() {
  const { data: produtos = [] } = useQuery({
    queryKey: ["produtos-publico"],
    queryFn: () => listProdutosPublico(),
  });
  const { data: config } = useQuery({
    queryKey: ["config"],
    queryFn: () => getConfig(),
  });
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("Todos");

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

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-rose border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-6">
          <BrandLogo size={56} />
          <div>
            <h1 className="font-display text-2xl font-semibold leading-tight text-chocolate md:text-3xl">
              {config?.nome || "Cakes by Jack"}
            </h1>
            <p className="text-xs uppercase tracking-[0.2em] text-rose-deep">
              Confeitaria Artesanal
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6">
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
            <ProductCard key={p.id} produto={p} config={config} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">
            Nenhum produto encontrado.
          </p>
        )}
      </div>
    </div>
  );
}

function ProductCard({
  produto,
  config,
}: {
  produto: ProdutoPublico;
  config?: ConfigData;
}) {
  const [open, setOpen] = useState(false);
  const img = publicImageUrl(produto.imagem);
  return (
    <Card className="overflow-hidden border-border shadow-card transition hover:shadow-elevated">
      <div className="bg-gradient-rose aspect-[4/3] overflow-hidden">
        {img ? (
          <img src={img} alt={produto.nome} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-rose-deep/30">
            <ShoppingBag className="h-12 w-12" />
          </div>
        )}
      </div>
      <CardContent className="space-y-2 p-4">
        <Badge variant="outline" className="border-gold/40 text-chocolate">
          {produto.categoria}
        </Badge>
        <h3 className="font-display text-xl font-semibold leading-tight">
          {produto.nome}
        </h3>
        {produto.descricao && (
          <p className="line-clamp-3 text-sm text-muted-foreground">{produto.descricao}</p>
        )}
        <div className="flex items-center justify-between pt-2">
          <span className="kpi-number text-primary">{formatBRL(produto.preco)}</span>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary shadow-soft">Fazer pedido</Button>
            </DialogTrigger>
            <OrderDialog produto={produto} config={config} onDone={() => setOpen(false)} />
          </Dialog>
        </div>
      </CardContent>
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
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    observacoes: "",
  });

  const total = precoUnit * (form.quantidade || 1);
  const entradaMin = total * 0.5;

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
          rua: form.rua,
          numero: form.numero,
          bairro: form.bairro,
          cidade: form.cidade,
          observacoes: form.observacoes,
        },
      }),
    onSuccess: () => {
      toast.success("Pedido enviado!", {
        description: "Vamos confirmar pelo WhatsApp.",
      });
      const jackPhone = (config?.whatsapp ?? "").replace(/\D+/g, "");
      if (jackPhone) {
        const endereco = [
          [form.rua, form.numero].filter(Boolean).join(", "),
          form.bairro,
          form.cidade,
        ]
          .filter(Boolean)
          .join(" - ");
        const msg = [
          "Novo pedido recebido pelo catálogo Cakes By Jack",
          "",
          `Cliente: ${form.clienteNome}`,
          `WhatsApp: ${form.whatsapp}`,
          `Produto: ${produto.nome}`,
          `Quantidade: ${form.quantidade}`,
          `Valor Total: ${formatBRL(total)}`,
          `Entrada mínima (50%): ${formatBRL(entradaMin)}`,
          `Data desejada: ${form.dataDesejada || "A combinar"}`,
          `Horário: ${form.horaDesejada || "A combinar"}`,
          `Endereço: ${endereco || "—"}`,
          `Observações: ${form.observacoes || "—"}`,
          "",
          "Status: Aguardando confirmação",
        ].join("\n");
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

  const valid =
    form.clienteNome.trim().length >= 2 &&
    form.whatsapp.replace(/\D+/g, "").length >= 8 &&
    !!form.dataDesejada &&
    !!form.horaDesejada &&
    !!form.rua.trim() &&
    !!form.numero.trim() &&
    !!form.bairro.trim() &&
    !!form.cidade.trim() &&
    total > 0;

  return (
    <DialogContent className="max-h-[92vh] w-[calc(100vw-1rem)] max-w-lg overflow-y-auto p-4 sm:p-6">
      <DialogHeader className="text-left">
        <DialogTitle className="font-display text-2xl">{produto.nome}</DialogTitle>
        <p className="text-xs uppercase tracking-[0.18em] text-rose-deep">
          Preencha seu pedido
        </p>
      </DialogHeader>

      <div className="grid gap-4">
        {/* Bloco: Dados do pedido */}
        <Section title="Dados do pedido">
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Data desejada *">
              <Input
                type="date"
                value={form.dataDesejada}
                onChange={(e) => setForm({ ...form, dataDesejada: e.target.value })}
              />
            </Field>
            <Field label="Horário *">
              <Input
                type="time"
                value={form.horaDesejada}
                onChange={(e) => setForm({ ...form, horaDesejada: e.target.value })}
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

        {/* Bloco: Dados do cliente */}
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

        {/* Bloco: Endereço */}
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

        {/* Bloco: Pagamento */}
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

        {/* Bloco: Observações */}
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
    <div className="space-y-3 rounded-xl border border-border/60 bg-card/60 p-3 sm:p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-deep">
        {title}
      </p>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}
