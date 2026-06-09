import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { listPedidos, type Pedido } from "@/lib/sheets.functions";
import { dateKey, formatDateBR, parseDateSafe } from "@/lib/format";
import { useIsMobile } from "@/hooks/use-mobile";

export const Route = createFileRoute("/calendario")({
  head: () => ({
    meta: [
      { title: "Calendário — Cakes by Jack" },
      { name: "description", content: "Agenda de produção e entregas." },
    ],
  }),
  component: CalendarioPage,
});

const WEEK = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

function classify(p: Pedido) {
  if (p.status === "Aguardando confirmação")
    return { dot: "bg-primary/25 text-primary", border: "border-primary/40" };
  if (p.situacaoPagamento === "Pago integral")
    return { dot: "bg-success/20 text-success", border: "border-success/40" };
  if (p.situacaoPagamento === "Entrada recebida")
    return { dot: "bg-warning/25 text-warning", border: "border-warning/40" };
  return { dot: "bg-destructive/15 text-destructive", border: "border-destructive/40" };
}

function CalendarioPage() {
  const { data: pedidos = [] } = useQuery({ queryKey: ["pedidos"], queryFn: () => listPedidos() });
  const isMobile = useIsMobile();
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const days = useMemo(() => buildMonthGrid(cursor), [cursor]);

  const visible = pedidos.filter((p) => p.status !== "Recusado" && p.status !== "Cancelado");

  const byDate = useMemo(() => {
    const m: Record<string, Pedido[]> = {};
    for (const p of visible) {
      const k = dateKey(p.dataEntrega);
      if (!k) continue;
      (m[k] ??= []).push(p);
    }
    return m;
  }, [visible]);

  const semData = visible.filter((p) => !parseDateSafe(p.dataEntrega));
  const todayKey = dateKey(new Date())!;

  // Mobile: lista cronológica das próximas entregas
  if (isMobile) {
    const todasComData = visible
      .filter((p) => parseDateSafe(p.dataEntrega))
      .sort((a, b) => (+(parseDateSafe(a.dataEntrega) ?? 0)) - (+(parseDateSafe(b.dataEntrega) ?? 0)));
    const grupos = new Map<string, Pedido[]>();
    for (const p of todasComData) {
      const k = dateKey(p.dataEntrega)!;
      if (!grupos.has(k)) grupos.set(k, []);
      grupos.get(k)!.push(p);
    }
    return (
      <AppLayout title="Agenda de produção" subtitle="Lista de entregas">
        <div className="space-y-4">
          {grupos.size === 0 && (
            <p className="text-center text-sm text-muted-foreground py-8">
              Nenhum pedido agendado.
            </p>
          )}
          {Array.from(grupos.entries()).map(([k, items]) => (
            <div key={k} className="space-y-2">
              <div className="sticky top-16 z-10 -mx-4 bg-background/95 px-4 py-2 backdrop-blur">
                <p className="font-display text-sm font-semibold text-rose-deep">
                  {formatDateBR(items[0].dataEntrega)}
                </p>
              </div>
              {items.map((p) => {
                const c = classify(p);
                return (
                  <Card key={p.id} className={`border-l-4 ${c.border} shadow-card`}>
                    <CardContent className="space-y-1.5 p-4">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium leading-tight">{p.clienteNome}</p>
                        <span className="text-xs font-semibold text-muted-foreground">
                          {p.horaEntrega || "—"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{p.produto}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <Badge variant="outline" className="text-[10px]">
                          {p.status || "Sem status"}
                        </Badge>
                        <Badge className={`text-[10px] ${c.dot}`}>
                          {p.situacaoPagamento || "Não pago"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ))}
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout
      title="Agenda de produção"
      subtitle="Pedidos por dia, com situação financeira"
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => shift(setCursor, cursor, -1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="font-display min-w-44 text-center text-lg font-semibold">
            {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
          </div>
          <Button variant="outline" size="icon" onClick={() => shift(setCursor, cursor, 1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      }
    >
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {WEEK.map((w) => <div key={w} className="py-2">{w}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {days.map((d, i) => {
              const key = dateKey(d.date)!;
              const items = byDate[key] ?? [];
              const isToday = key === todayKey;
              return (
                <div
                  key={i}
                  className={`min-h-28 rounded-xl border p-2 transition ${
                    d.inMonth ? "bg-card" : "bg-muted/40 opacity-60"
                  } ${isToday ? "border-primary shadow-soft" : "border-border/60"}`}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className={`text-sm font-semibold ${isToday ? "text-primary" : ""}`}>
                      {d.date.getDate()}
                    </span>
                    {items.length > 0 && (
                      <span className="rounded-full bg-rose-soft px-1.5 text-[10px] font-semibold text-rose-deep">
                        {items.length}
                      </span>
                    )}
                  </div>
                  <div className="space-y-1">
                    {items.slice(0, 3).map((p) => {
                      const c = classify(p);
                      return (
                        <div
                          key={p.id}
                          className={`truncate rounded-md px-1.5 py-1 text-[10px] font-medium ${c.dot}`}
                          title={`${p.clienteNome} — ${p.produto} • ${p.horaEntrega || ""}`}
                        >
                          {p.horaEntrega ? `${p.horaEntrega} ` : ""}{p.clienteNome}
                        </div>
                      );
                    })}
                    {items.length > 3 && (
                      <div className="text-[10px] text-muted-foreground">
                        +{items.length - 3} mais
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <Legend color="bg-success" label="Pago integral" />
        <Legend color="bg-warning" label="Entrada recebida" />
        <Legend color="bg-destructive" label="Não pago" />
        <Legend color="bg-primary" label="Aguardando confirmação" />
      </div>

      {semData.length > 0 && (
        <Card className="mt-6 shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-lg">
              Pedidos sem data definida ({semData.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {semData.map((p) => {
              const c = classify(p);
              return (
                <div
                  key={p.id}
                  className={`flex flex-wrap items-center justify-between gap-2 rounded-xl border ${c.border} bg-card p-3 text-sm`}
                >
                  <div>
                    <p className="font-medium">{p.clienteNome}</p>
                    <p className="text-xs text-muted-foreground">{p.produto}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{p.status || "Sem status"}</Badge>
                    <Badge className={c.dot}>{p.situacaoPagamento || "—"}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDateBR(p.dataEntrega)}
                    </span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </AppLayout>
  );
}

function shift(set: (d: Date) => void, cur: Date, delta: number) {
  set(new Date(cur.getFullYear(), cur.getMonth() + delta, 1));
}

function buildMonthGrid(cursor: Date) {
  const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const start = new Date(first);
  start.setDate(first.getDate() - first.getDay());
  const days: { date: Date; inMonth: boolean }[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push({ date: d, inMonth: d.getMonth() === cursor.getMonth() });
  }
  return days;
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-3 w-3 rounded-full ${color}`} />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}
