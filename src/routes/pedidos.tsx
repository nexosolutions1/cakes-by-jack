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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Loader2, Wallet } from "lucide-react";
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

function PedidosPage() {
  const { data: pedidos = [] } = useQuery({
    queryKey: ["pedidos"],
    queryFn: () => listPedidos(),
  });
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("Todos");

  const filtered = useMemo(() => {
    const list =
      filter === "Todos" ? pedidos : pedidos.filter((p) => p.status === filter);
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
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary shadow-soft">
              <Plus className="h-4 w-4" />
              Novo pedido
            </Button>
          </DialogTrigger>
          <NovoPedidoDialog onDone={() => setOpen(false)} />
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

function PedidoCard({ pedido }: { pedido: Pedido }) {
  const update = useServerFn(updatePedidoStatus);
  const qc = useQueryClient();
  const [payOpen, setPayOpen] = useState(false);
  const mut = useMutation({
    mutationFn: (status: string) => update({ data: { id: pedido.id, status } }),
    onSuccess: (_d, status) => {
      toast.success(
        status === "Confirmado"
          ? "Pedido confirmado — agora aparece no calendário e painel financeiro"
          : status === "Recusado"
            ? "Pedido recusado"
            : "Status atualizado",
      );
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
        <Dialog open={payOpen} onOpenChange={setPayOpen}>
          {payOpen && (
            <EditPagamentoDialog pedido={pedido} onDone={() => setPayOpen(false)} />
          )}
        </Dialog>
      </CardContent>
    </Card>
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
