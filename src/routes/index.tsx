import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions, useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TrendingUp, Users, ClipboardList, DollarSign, Clock,
  Sparkles, CalendarDays, ArrowUpRight,
} from "lucide-react";
import {
  listClientes, listPedidos, listProdutos, checkSetup, type Pedido,
} from "@/lib/sheets.functions";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell as PieCell,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import banner from "@/assets/dashboard-banner.jpg";

const setupQO = queryOptions({ queryKey: ["setup"], queryFn: () => checkSetup() });

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Painel Financeiro — Cakes by Jack" },
      { name: "description", content: "Visão geral de pedidos, faturamento e produção." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(setupQO),
  component: DashboardPage,
  errorComponent: ({ error }) => (
    <AppLayout title="Painel Financeiro">
      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-sm">
        Erro: {error.message}
      </div>
    </AppLayout>
  ),
});

import { formatBRL as fmt, parseMoney as parseNum, parseDateSafe as parseDate, formatDateBR as fmtDate, valorRecebido } from "@/lib/format";

function DashboardPage() {
  const { data: setup } = useSuspenseQuery(setupQO);
  if (!setup.ok) {
    return (
      <AppLayout title="Bem-vinda à Cakes by Jack" subtitle="Vamos preparar seu sistema">
        <SetupCard missing={setup.missing} configured={setup.configured} />
      </AppLayout>
    );
  }
  return (
    <AppLayout title="Painel Financeiro" subtitle="Visão geral da sua confeitaria">
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </AppLayout>
  );
}

function SetupCard({ missing, configured }: { missing: string[]; configured: boolean }) {
  return (
    <Card className="mx-auto max-w-2xl border-rose-soft shadow-card">
      <CardHeader>
        <div className="bg-gradient-rose mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full">
          <Sparkles className="h-5 w-5 text-rose-deep" />
        </div>
        <CardTitle className="font-display text-2xl">
          {configured ? "Abas faltando na planilha" : "Conexão pendente"}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {configured
            ? `O sistema usa as abas existentes da sua planilha. Faltam: ${missing.join(", ")}. Crie-as no Google Sheets com esses nomes exatos — o sistema não cria abas automaticamente.`
            : "Confira se o conector do Google Sheets e o ID da planilha estão configurados."}
        </p>
      </CardHeader>
      <CardContent>
        <Button asChild className="bg-gradient-primary shadow-soft">
          <Link to="/setup">Abrir configuração</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function DashboardSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-32 rounded-2xl" />
      ))}
    </div>
  );
}

const pedidosQO = queryOptions({ queryKey: ["pedidos"], queryFn: () => listPedidos() });
const clientesQO = queryOptions({ queryKey: ["clientes"], queryFn: () => listClientes() });
const produtosQO = queryOptions({ queryKey: ["produtos"], queryFn: () => listProdutos() });

const CHART_COLORS = [
  "var(--color-chart-1)", "var(--color-chart-2)",
  "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)",
];

function DashboardContent() {
  const { data: pedidos = [] } = useQuery(pedidosQO);
  const { data: clientes = [] } = useQuery(clientesQO);
  const { data: produtos = [] } = useQuery(produtosQO);

  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const startWeek = new Date(now);
  startWeek.setDate(now.getDate() - now.getDay());
  startWeek.setHours(0, 0, 0, 0);

  // Exclui pedidos cancelados/recusados de TODOS os indicadores financeiros
  const ativos = pedidos.filter(
    (p) => p.status !== "Cancelado" && p.status !== "Recusado",
  );

  const inMonth = ativos.filter((p) => {
    const d = parseDate(p.dataPedido);
    return d && d.getMonth() === month && d.getFullYear() === year;
  });
  const inWeek = ativos.filter((p) => {
    const d = parseDate(p.dataPedido);
    return d && d >= startWeek;
  });

  const faturamento = inMonth.reduce((s, p) => s + parseNum(p.valorTotal), 0);
  const recebido = inMonth.reduce(
    (s, p) => s + valorRecebido(p.valorTotal, p.entrada, p.saldo),
    0,
  );
  const aReceber = Math.max(0, faturamento - recebido);
  // Faturamento últimos 6 meses
  const monthsData: { mes: string; faturamento: number; pedidos: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(year, month - i, 1);
    const items = ativos.filter((p) => {
      const dp = parseDate(p.dataPedido);
      return dp && dp.getMonth() === d.getMonth() && dp.getFullYear() === d.getFullYear();
    });
    monthsData.push({
      mes: d.toLocaleDateString("pt-BR", { month: "short" }),
      faturamento: items.reduce((s, p) => s + parseNum(p.valorTotal), 0),
      pedidos: items.length,
    });
  }

  const pendentes = pedidos.filter((p) => p.status === "Aguardando confirmação").length;
  const statusCounts: Record<string, number> = {};
  for (const p of pedidos) {
    const k = p.status || "Sem status";
    statusCounts[k] = (statusCounts[k] ?? 0) + 1;
  }
  const statusData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

  const cards = [
    { label: "Pedidos pendentes", value: pendentes, icon: Clock, tint: "bg-warning/20 text-warning" },
    { label: "Pedidos do mês", value: inMonth.length, icon: ClipboardList, tint: "bg-gradient-rose text-rose-deep" },
    { label: "Faturamento mensal", value: fmt(faturamento), icon: TrendingUp, tint: "bg-gradient-primary text-primary-foreground" },
    { label: "Valor recebido", value: fmt(recebido), icon: DollarSign, tint: "bg-success/15 text-success" },
    { label: "Valor a receber", value: fmt(aReceber), icon: DollarSign, tint: "bg-rose-soft text-rose-deep" },
    { label: "Pedidos da semana", value: inWeek.length, icon: CalendarDays, tint: "bg-accent text-rose-deep" },
    { label: "Clientes", value: clientes.length, icon: Users, tint: "bg-accent text-foreground" },
    { label: "Catálogo", value: produtos.length, icon: Sparkles, tint: "bg-gold/20 text-gold-foreground" },
  ];

  const proximos = [...ativos]
    .filter((p) => p.status !== "Entregue" && p.dataEntrega)
    .sort((a, b) => (+(parseDate(a.dataEntrega) ?? new Date(8e15))) - (+(parseDate(b.dataEntrega) ?? new Date(8e15))))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl shadow-card">
        <img src={banner} alt="" className="h-44 w-full object-cover md:h-52" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/55 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-8 text-primary-foreground">
          <p className="text-xs uppercase tracking-[0.25em] opacity-90">Cakes by Jack</p>
          <h2 className="font-display mt-1 text-2xl font-semibold md:text-3xl">
            Bem-vinda de volta! Vamos adoçar o dia.
          </h2>
          <p className="mt-1 max-w-md text-sm opacity-90">
            Acompanhe seus pedidos, faturamento e produção em um só lugar.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label} className="overflow-hidden border-border/60 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</p>
                  <p className="font-display mt-2 text-2xl font-semibold">{c.value}</p>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${c.tint}`}>
                  <c.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-display">Faturamento — últimos 6 meses</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthsData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <XAxis dataKey="mes" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12}
                  tickFormatter={(v) => `R$${Math.round(v / 1000)}k`} />
                <Tooltip
                  contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }}
                  formatter={(v: number) => fmt(v)}
                />
                <Line type="monotone" dataKey="faturamento" stroke="var(--color-chart-1)" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display">Pedidos por mês</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthsData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <XAxis dataKey="mes" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }}
                />
                <Bar dataKey="pedidos" fill="var(--color-chart-2)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-display">Próximas entregas</CardTitle>
              <p className="text-sm text-muted-foreground">
                Pedidos confirmados aguardando produção ou finalização
              </p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/pedidos">
                Ver todos <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {proximos.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Nenhum pedido em aberto. Que tal cadastrar o primeiro?
              </p>
            )}
            {proximos.map((p) => <PedidoRow key={p.id} p={p} />)}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display">Pedidos por status</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            {statusData.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">Sem pedidos ainda.</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80} paddingAngle={2}>
                    {statusData.map((_, i) => (
                      <PieCell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PedidoRow({ p }: { p: Pedido }) {
  const statusColor =
    p.situacaoPagamento === "Pago integral"
      ? "bg-success/15 text-success"
      : p.situacaoPagamento === "Entrada recebida"
        ? "bg-warning/20 text-warning"
        : "bg-destructive/15 text-destructive";
  return (
    <div className="flex items-center justify-between rounded-xl border border-border/60 bg-card px-4 py-3 transition hover:shadow-soft">
      <div className="min-w-0">
        <p className="truncate font-medium">{p.clienteNome}</p>
        <p className="truncate text-xs text-muted-foreground">{p.produto}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-semibold">
            {fmtDate(p.dataEntrega)}
          </p>
          <p className="text-xs text-muted-foreground">{p.horaEntrega || "—"}</p>
        </div>
        <Badge className={statusColor}>{p.situacaoPagamento}</Badge>
      </div>
    </div>
  );
}
