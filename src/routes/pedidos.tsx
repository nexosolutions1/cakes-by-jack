import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Loader2, Wallet, MapPin } from "lucide-react";
import {
  createPedido,
  listClientes,
  listPedidos,
  listProdutos,
  updatePedidoStatus,
  type Pedido,
} from "@/lib/sheets.functions";
import { toast } from "sonner";
import { formatBRL, formatDateBR, parseDateSafe } from "@/lib/format";
import { EditPagamentoDialog } from "@/components/edit-pagamento-dialog";

export const Route = createFileRoute("/pedidos")({
  head: () => ({
    meta: [
      { title: "Pedidos — Cakes by Jack" },
      { name: "description", content: "Gestão de pedidos da confeitaria." },
    ],
  }),
  component: PedidosPage,
});

const STATUSES = ["Aguardando confirmação", "Orçamento", "Confirmado", "Produção", "Finalizado", "Entregue", "Recusado", "Cancelado"];
const PAGAMENTOS = ["Não pago", "Entrada recebida", "Pago integral"];
const FORMAS = ["Pix", "Débito", "Crédito", "Dinheiro"];

const ENDERECO_RETIRADA = {
  rua: "José Vargas",
  numero: "40",
  bairro: "Centro",
  cidade: "Camanducaia",
};

function PedidosPage() {
  const { data: pedidos = [] } = useQuery({
    queryKey: ["pedidos"],
    queryFn: () => listPedidos(),
  });

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("Todos");

  const filtered = useMemo(() => {
    const list = filter === "Todos" ? pedidos : pedidos.filter((p) => p.status === filter);
    return [...list].sort(
      (a, b) =>
        (+(parseDateSafe(b.dataPedido) ?? 0)) -
        (+(parseDateSafe(a.dataPedido) ?? 0)),
    );
  }, [pedidos, filter]);

  return (
    <AppLayout
      title="Pedidos"
      subtitle={`${pedidos.length} no total`}
      actions={
        <Dialog open={open} onOpenChange={setOpen}>
          <Button onClick={() => setOpen(true)} className="bg-gradient-primary shadow-soft">
            <Plus className="h-4 w-4" />
            Novo pedido
          </Button>
          {open && <NovoPedidoDialog onDone={() => setOpen(false)} />}
        </Dialog>
      }
    >
      <div className="mb-6 flex flex-wrap gap-2">
        {["Todos", ...STATUSES].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${
              filter === s
                ? "border-primary bg-gradient-primary text-primary-foreground shadow-soft"
                : "border-border bg-card hover:border-primary/40"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center text-muted-foreground">
              Nenhum pedido nesse filtro
            </CardContent>
          </Card>
        )}

        {filtered.map((p) => (
          <PedidoCard key={p.id} pedido={p} />
        ))}
      </div>
    </AppLayout>
  );
}

function extractObsLine(obs: string, label: string) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = obs.match(new RegExp(`${escaped}:\\s*(.+)`, "i"));
  return match?.[1]?.trim() || "";
}

function parseEnderecoCompleto(endereco: string) {
  const partes = endereco
    .split(" - ")
    .map((parte) => parte.trim())
    .filter(Boolean);

  const ruaNumero = partes[0] || "";
  const bairro = partes[1] || "";
  const cidade = partes.slice(2).join(" - ") || partes[2] || "";

  const ruaNumeroMatch = ruaNumero.match(/^(.+?),\s*(.+)$/);
  const rua = ruaNumeroMatch?.[1]?.trim() || ruaNumero;
  const numero = ruaNumeroMatch?.[2]?.trim() || "";

  return { rua, numero, bairro, cidade };
}

function normalizarCampoEndereco(value: unknown) {
  const texto = String(value || "").trim();

  if (!texto || /^ped-/i.test(texto)) {
    return "";
  }

  return texto;
}

function getPedidoAddressInfo(pedido: Pedido) {
  const p = pedido as any;
  const obs = String(pedido.observacoes || "");

  const obsLower = obs.toLowerCase();

  const enderecoEntregaTexto =
    extractObsLine(obs, "Endereço de entrega") ||
    extractObsLine(obs, "Endereco de entrega");

  const enderecoRetiradaTexto =
    extractObsLine(obs, "Endereço de retirada") ||
    extractObsLine(obs, "Endereco de retirada");

  const tipoAtendimentoTexto = extractObsLine(obs, "Tipo de atendimento");

  const isRetirada =
    tipoAtendimentoTexto.toLowerCase().includes("retirada") ||
    obsLower.includes("endereço de retirada") ||
    obsLower.includes("endereco de retirada");

  const isEntrega =
    tipoAtendimentoTexto.toLowerCase().includes("entrega") ||
    obsLower.includes("endereço de entrega") ||
    obsLower.includes("endereco de entrega") ||
    obsLower.includes("taxa de entrega");

  const tipo = isRetirada ? "Retirada" : isEntrega ? "Entrega" : "Não informado";

  const enderecoParseado = isRetirada
    ? ENDERECO_RETIRADA
    : parseEnderecoCompleto(enderecoEntregaTexto);

  const rua = isRetirada
    ? ENDERECO_RETIRADA.rua
    : enderecoParseado.rua || normalizarCampoEndereco(p.rua);

  const numero = isRetirada
    ? ENDERECO_RETIRADA.numero
    : enderecoParseado.numero || normalizarCampoEndereco(p.numero);

  const bairro = isRetirada
    ? ENDERECO_RETIRADA.bairro
    : enderecoParseado.bairro || normalizarCampoEndereco(p.bairro);

  const cidade = isRetirada
    ? ENDERECO_RETIRADA.cidade
    : enderecoParseado.cidade || normalizarCampoEndereco(p.cidade);

  const taxaEntrega =
    extractObsLine(obs, "Taxa de entrega") ||
    extractObsLine(obs, "Taxa entrega");

  const regiaoEntrega =
    extractObsLine(obs, "Região da entrega") ||
    extractObsLine(obs, "Regiao da entrega") ||
    extractObsLine(obs, "Opção de entrega") ||
    extractObsLine(obs, "Opcao de entrega");

  const itensMatch = obs.match(/Itens:\s*([\s\S]*?)(?:\nTipo de atendimento:|\nRegião da entrega:|\nRegiao da entrega:|\nEndereço de entrega:|\nEndereco de entrega:|$)/i);
  const itens = itensMatch?.[1]?.trim() || "";

  const subtotalProdutos = extractObsLine(obs, "Subtotal produtos");
  const totalPedido = extractObsLine(obs, "Total do pedido");
  const entradaMinima =
    extractObsLine(obs, "Entrada mínima (50%)") ||
    extractObsLine(obs, "Entrada minima (50%)");

  return {
    tipo,
    rua,
    numero,
    bairro,
    cidade,
    taxaEntrega,
    regiaoEntrega,
    itens,
    subtotalProdutos,
    totalPedido,
    entradaMinima,
    observacoes: pedido.observacoes || "",
  };
}

function PedidoCard({ pedido }: { pedido: Pedido }) {
  const update = useServerFn(updatePedidoStatus);
  const qc = useQueryClient();
  const [payOpen, setPayOpen] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);

  function abrirWhatsappConfirmacao() {
    const phone = String((pedido as any).whatsapp || "").replace(/\D+/g, "");

    if (!phone) {
      toast.warning("Pedido confirmado, mas esse cliente não tem WhatsApp cadastrado.");
      return;
    }

    const msg = [
      `Olá, ${pedido.clienteNome}! ❤️`,
      "",
      "Seu pedido na Cakes By Jack foi confirmado!",
      "",
      `Pedido: ${pedido.numero}`,
      `Produto: ${pedido.produto}`,
      `Entrega: ${formatDateBR(pedido.dataEntrega)} ${pedido.horaEntrega || ""}`,
      `Valor total: ${formatBRL(pedido.valorTotal)}`,
      `Entrada: ${formatBRL(pedido.entrada)}`,
      `Saldo: ${formatBRL(pedido.saldo || pedido.valorTotal)}`,
      "",
      "Obrigada pela preferência! 🍰",
    ].join("\n");

    window.open(`https://wa.me/55${phone}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  const mut = useMutation({
    mutationFn: (status: string) => update({ data: { id: pedido.id, status } }),
    onSuccess: (_d, status) => {
      toast.success(
        status === "Confirmado"
          ? "Pedido confirmado — WhatsApp aberto para envio"
          : status === "Recusado"
            ? "Pedido recusado"
            : "Status atualizado",
      );

      if (status === "Confirmado") {
        abrirWhatsappConfirmacao();
      }

      qc.invalidateQueries();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const isPending = pedido.status === "Aguardando confirmação";

  const sitColor =
    pedido.situacaoPagamento === "Pago integral"
      ? "bg-success/15 text-success"
      : pedido.situacaoPagamento === "Entrada recebida"
        ? "bg-warning/20 text-warning"
        : "bg-destructive/15 text-destructive";

  const address = getPedidoAddressInfo(pedido);

  return (
    <Card
      className={`shadow-card ${
        isPending ? "border-2 border-primary/50 bg-primary/5" : "border-border/60"
      }`}
    >
      <CardContent className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-lg font-semibold">{pedido.clienteNome}</span>
            <Badge variant="outline" className="border-gold/40 text-gold-foreground">
              {pedido.numero}
            </Badge>
            {isPending && (
              <Badge className="bg-primary text-primary-foreground">Aguardando confirmação</Badge>
            )}
            <Badge className={sitColor}>{pedido.situacaoPagamento || "Não pago"}</Badge>
          </div>

          <p className="text-sm text-muted-foreground">{pedido.produto}</p>

          <div className="grid grid-cols-2 gap-x-3 gap-y-1 pt-1 text-xs text-muted-foreground sm:flex sm:flex-wrap sm:gap-x-4">
            <span>
              Entrega:{" "}
              <strong className="text-foreground">{formatDateBR(pedido.dataEntrega)}</strong>{" "}
              {pedido.horaEntrega}
            </span>
            <span>
              Total: <strong className="text-foreground">{formatBRL(pedido.valorTotal)}</strong>
            </span>
            <span>Entrada: {formatBRL(pedido.entrada)}</span>
            <span>Saldo: {formatBRL(pedido.saldo || pedido.valorTotal)}</span>
            <span>
              Tipo: <strong className="text-foreground">{address.tipo}</strong>
            </span>
          </div>
        </div>

        <div className="flex w-full flex-wrap items-center gap-2 lg:w-auto">
          {isPending && (
            <>
              <Button
                size="sm"
                onClick={() => mut.mutate("Confirmado")}
                disabled={mut.isPending}
                className="bg-success text-success-foreground hover:bg-success/90"
              >
                {mut.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                Confirmar
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => mut.mutate("Recusado")}
                disabled={mut.isPending}
                className="border-destructive/40 text-destructive hover:bg-destructive/10"
              >
                Recusar
              </Button>
            </>
          )}

          <Button
            size="sm"
            variant="outline"
            onClick={() => setAddressOpen(true)}
            className="border-primary/30"
          >
            <MapPin className="h-3.5 w-3.5" /> Endereço
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setPayOpen(true)}
            className="border-gold/40"
          >
            <Wallet className="h-3.5 w-3.5" /> Pagamento
          </Button>

          <Select value={pedido.status} onValueChange={(v) => mut.mutate(v)}>
            <SelectTrigger className="w-full bg-card sm:w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Dialog open={addressOpen} onOpenChange={setAddressOpen}>
          {addressOpen && <EnderecoDialog pedido={pedido} />}
        </Dialog>

        <Dialog open={payOpen} onOpenChange={setPayOpen}>
          {payOpen && (
            <EditPagamentoDialog pedido={pedido} onDone={() => setPayOpen(false)} />
          )}
        </Dialog>
      </CardContent>
    </Card>
  );
}

function EnderecoDialog({ pedido }: { pedido: Pedido }) {
  const address = getPedidoAddressInfo(pedido);

  return (
    <DialogContent className="max-h-[92vh] w-[calc(100vw-1rem)] max-w-xl overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="font-display text-2xl">Detalhes do pedido</DialogTitle>
      </DialogHeader>

      <div className="space-y-4">
        <div className="rounded-2xl border border-border/60 bg-card/70 p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-deep">
            Cliente
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <p className="font-display text-xl font-semibold text-chocolate">
              {pedido.clienteNome}
            </p>
            <Badge variant="outline" className="border-gold/40">
              {pedido.numero}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {pedido.produto}
          </p>
        </div>

        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-deep">
            Atendimento
          </p>
          <p className="mt-2 text-lg font-semibold text-chocolate">{address.tipo}</p>
          {address.regiaoEntrega && (
            <p className="mt-1 text-sm text-muted-foreground">
              Região: {address.regiaoEntrega}
            </p>
          )}
          {address.taxaEntrega && (
            <p className="text-sm text-muted-foreground">
              Taxa: {address.taxaEntrega}
            </p>
          )}
        </div>

        <div className="grid gap-3 rounded-2xl border border-border/60 bg-card/70 p-4 text-sm shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-deep">
            Endereço
          </p>
          <InfoLine label="Rua" value={address.rua || "Não informado"} />
          <InfoLine label="Número" value={address.numero || "Não informado"} />
          <InfoLine label="Bairro" value={address.bairro || "Não informado"} />
          <InfoLine label="Cidade" value={address.cidade || "Não informado"} />
        </div>

        {(address.itens || address.subtotalProdutos || address.totalPedido || address.entradaMinima) && (
          <div className="rounded-2xl border border-gold/40 bg-gradient-rose/40 p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-deep">
              Resumo do carrinho
            </p>

            {address.itens && (
              <pre className="mt-3 whitespace-pre-wrap font-sans text-sm text-muted-foreground">
                {address.itens}
              </pre>
            )}

            <div className="mt-3 space-y-1 border-t border-border/60 pt-3 text-sm">
              {address.subtotalProdutos && (
                <InfoLine label="Subtotal produtos" value={address.subtotalProdutos} />
              )}
              {address.totalPedido && (
                <InfoLine label="Total do pedido" value={address.totalPedido} />
              )}
              {address.entradaMinima && (
                <InfoLine label="Entrada mínima" value={address.entradaMinima} />
              )}
            </div>
          </div>
        )}

        {address.observacoes && (
          <div className="rounded-2xl border border-border/60 bg-card/70 p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-deep">
              Observações completas
            </p>
            <pre className="mt-2 whitespace-pre-wrap font-sans text-sm leading-relaxed text-muted-foreground">
              {address.observacoes}
            </pre>
          </div>
        )}
      </div>
    </DialogContent>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border/50 pb-2 last:border-0 last:pb-0">
      <span className="text-muted-foreground">{label}</span>
      <strong className="text-right text-foreground">{value}</strong>
    </div>
  );
}

function NovoPedidoDialog({ onDone }: { onDone: () => void }) {
  const { data: clientes = [] } = useQuery({ queryKey: ["clientes"], queryFn: () => listClientes() });
  const { data: produtos = [] } = useQuery({ queryKey: ["produtos"], queryFn: () => listProdutos() });
  const create = useServerFn(createPedido);
  const qc = useQueryClient();

  const today = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState({
    clienteId: "",
    produtoId: "",
    quantidade: 0,
    peso: 0,
    valorTotal: 0,
    entrada: 0,
    formaPagamento: "Pix",
    situacaoPagamento: "Não pago",
    dataPedido: today,
    dataEntrega: today,
    horaEntrega: "",
    status: "Confirmado",
    observacoes: "",
  });

  const cliente = clientes.find((c) => c.id === form.clienteId);
  const produto = produtos.find((p) => p.id === form.produtoId);

  const mut = useMutation({
    mutationFn: () =>
      create({
        data: {
          clienteId: form.clienteId,
          clienteNome: cliente?.nome ?? "",
          produto: produto ? `${produto.categoria} • ${produto.tipo} • ${produto.nome}` : "",
          quantidade: Number(form.quantidade),
          peso: Number(form.peso),
          valorTotal: Number(form.valorTotal),
          entrada: Number(form.entrada),
          formaPagamento: form.formaPagamento,
          situacaoPagamento: form.situacaoPagamento,
          dataPedido: form.dataPedido,
          dataEntrega: form.dataEntrega,
          horaEntrega: form.horaEntrega,
          status: form.status,
          observacoes: form.observacoes,
        },
      }),
    onSuccess: () => {
      toast.success("Pedido criado");
      qc.invalidateQueries({ queryKey: ["pedidos"] });
      onDone();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const saldo = Number(form.valorTotal) - Number(form.entrada);

  return (
    <DialogContent className="max-h-[90vh] w-[calc(100vw-1rem)] max-w-2xl overflow-y-auto p-4 sm:p-6">
      <DialogHeader>
        <DialogTitle className="font-display text-2xl">Novo pedido</DialogTitle>
      </DialogHeader>

      <div className="grid gap-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Cliente *">
            <Select value={form.clienteId} onValueChange={(v) => setForm({ ...form, clienteId: v })}>
              <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
              <SelectContent>
                {clientes.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Produto *">
            <Select value={form.produtoId} onValueChange={(v) => {
              const p = produtos.find((x) => x.id === v);
              setForm({ ...form, produtoId: v, valorTotal: p ? Number(String(p.preco).replace(",", ".")) : 0 });
            }}>
              <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
              <SelectContent className="max-h-72">
                {produtos.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.categoria} • {p.tipo} • {p.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Quantidade">
            <Input type="number" value={form.quantidade} onChange={(e) => setForm({ ...form, quantidade: +e.target.value })} />
          </Field>
          <Field label="Peso (kg)">
            <Input type="number" step="0.1" value={form.peso} onChange={(e) => setForm({ ...form, peso: +e.target.value })} />
          </Field>
          <Field label="Valor total (R$) *">
            <Input type="number" step="0.01" value={form.valorTotal} onChange={(e) => setForm({ ...form, valorTotal: +e.target.value })} />
          </Field>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Entrada (R$)">
            <Input type="number" step="0.01" value={form.entrada} onChange={(e) => setForm({ ...form, entrada: +e.target.value })} />
          </Field>
          <Field label="Saldo">
            <Input value={formatBRL(saldo)} disabled className="bg-muted" />
          </Field>
          <Field label="Forma de pagamento">
            <Select value={form.formaPagamento} onValueChange={(v) => setForm({ ...form, formaPagamento: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {FORMAS.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
        </div>

        <Field label="Situação financeira">
          <Select value={form.situacaoPagamento} onValueChange={(v) => setForm({ ...form, situacaoPagamento: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {PAGAMENTOS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>

        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Data do pedido">
            <Input type="date" value={form.dataPedido} onChange={(e) => setForm({ ...form, dataPedido: e.target.value })} />
          </Field>
          <Field label="Data de entrega">
            <Input type="date" value={form.dataEntrega} onChange={(e) => setForm({ ...form, dataEntrega: e.target.value })} />
          </Field>
          <Field label="Hora">
            <Input type="time" value={form.horaEntrega} onChange={(e) => setForm({ ...form, horaEntrega: e.target.value })} />
          </Field>
        </div>

        <Field label="Observações">
          <Textarea rows={2} value={form.observacoes} onChange={(e) => setForm({ ...form, observacoes: e.target.value })} />
        </Field>
      </div>

      <DialogFooter>
        <Button
          disabled={!form.clienteId || !form.produtoId || !form.valorTotal || mut.isPending}
          onClick={() => mut.mutate()}
          className="bg-gradient-primary"
        >
          {mut.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          Criar pedido
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}