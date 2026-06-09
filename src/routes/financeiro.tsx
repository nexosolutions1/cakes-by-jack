import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { TrendingUp, DollarSign, Clock, Pencil } from "lucide-react";
import { listPedidos, type Pedido } from "@/lib/sheets.functions";
import { formatBRL, parseMoney, situacaoReal, valorRecebido } from "@/lib/format";
import { EditPagamentoDialog } from "@/components/edit-pagamento-dialog";

export const Route = createFileRoute("/financeiro")({
  head: () => ({
    meta: [
      { title: "Financeiro — Cakes by Jack" },
      { name: "description", content: "Controle financeiro de pedidos e pagamentos." },
    ],
  }),
  component: FinanceiroPage,
});

function isAtivo(p: Pedido) {
  return p.status !== "Cancelado" && p.status !== "Recusado";
}

function FinanceiroPage() {
  const { data: pedidos = [] } = useQuery({ queryKey: ["pedidos"], queryFn: () => listPedidos() });
  const [editing, setEditing] = useState<Pedido | null>(null);

  const ativos = useMemo(() => pedidos.filter(isAtivo), [pedidos]);

  const totals = useMemo(() => {
    const total = ativos.reduce((s, p) => s + parseMoney(p.valorTotal), 0);
    const recebido = ativos.reduce(
      (s, p) => s + valorRecebido(p.valorTotal, p.entrada, p.saldo),
      0,
    );
    return { total, recebido, aReceber: Math.max(0, total - recebido) };
  }, [ativos]);

  return (
    <AppLayout title="Financeiro" subtitle="Controle de recebimentos e saldos">
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KPI label="Faturamento total" value={formatBRL(totals.total)} icon={TrendingUp} tint="bg-gradient-primary text-primary-foreground" />
        <KPI label="Recebido" value={formatBRL(totals.recebido)} icon={DollarSign} tint="bg-success/15 text-success" />
        <KPI label="A receber" value={formatBRL(totals.aReceber)} icon={Clock} tint="bg-warning/20 text-warning" />
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-display">Pedidos & pagamentos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {pedidos.length === 0 && (
            <p className="text-sm text-muted-foreground">Sem pedidos ainda.</p>
          )}
          {pedidos.map((p) => {
            const sit = situacaoReal(p.valorTotal, p.entrada, p.saldo);
            const total = parseMoney(p.valorTotal);
            const pago = parseMoney(p.entrada);
            const saldoCalc = Math.max(0, total - pago);
            const cancelled = !isAtivo(p);
            return (
              <div
                key={p.id}
                className={`flex flex-col gap-3 rounded-xl border bg-card p-4 transition hover:shadow-soft sm:flex-row sm:items-center sm:justify-between ${
                  cancelled ? "border-border/40 opacity-60" : "border-border/60"
                }`}
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="truncate font-medium">{p.clienteNome}</span>
                    <Badge variant="outline" className="border-gold/40 text-gold-foreground">
                      {p.numero}
                    </Badge>
                    <Badge className={sitColor(sit)}>{sit}</Badge>
                    {cancelled && (
                      <Badge variant="outline" className="border-destructive/40 text-destructive">
                        {p.status}
                      </Badge>
                    )}
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{p.produto}</p>
                  <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                    <span>Total: <strong className="text-foreground">{formatBRL(total)}</strong></span>
                    <span>Entrada: {formatBRL(pago)}</span>
                    <span>Saldo: {formatBRL(saldoCalc)}</span>
                    <span>{p.formaPagamento}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditing(p)}
                  className="self-start sm:self-auto"
                >
                  <Pencil className="h-3.5 w-3.5" /> Pagamento
                </Button>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        {editing && <EditPagamentoDialog pedido={editing} onDone={() => setEditing(null)} />}
      </Dialog>
    </AppLayout>
  );
}

function sitColor(s: string) {
  if (s === "Pago integral") return "bg-success/15 text-success";
  if (s === "Entrada recebida") return "bg-warning/20 text-warning";
  return "bg-destructive/15 text-destructive";
}

function KPI({ label, value, icon: Icon, tint }: any) {
  return (
    <Card className="shadow-card">
      <CardContent className="flex items-center justify-between p-5">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="font-display mt-2 truncate text-2xl font-semibold">{value}</p>
        </div>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${tint}`}>
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}
