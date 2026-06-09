import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  listClientes, listPedidos, listProdutos,
} from "@/lib/sheets.functions";

export const Route = createFileRoute("/relatorios")({
  head: () => ({
    meta: [
      { title: "Relatórios — Cakes by Jack" },
      { name: "description", content: "Relatórios e exportações da confeitaria." },
    ],
  }),
  component: RelatoriosPage,
});

function parseNum(v: string) {
  const n = Number(String(v).replace(/\./g, "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}
const fmt = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function toCSV(rows: any[]) {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const esc = (v: any) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [headers.join(","), ...rows.map((r) => headers.map((h) => esc(r[h])).join(","))].join("\n");
}

function download(filename: string, content: string, mime = "text/csv;charset=utf-8") {
  const blob = new Blob(["\uFEFF" + content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

function RelatoriosPage() {
  const { data: pedidos = [] } = useQuery({ queryKey: ["pedidos"], queryFn: () => listPedidos() });
  const { data: clientes = [] } = useQuery({ queryKey: ["clientes"], queryFn: () => listClientes() });
  const { data: produtos = [] } = useQuery({ queryKey: ["produtos"], queryFn: () => listProdutos() });

  const stats = useMemo(() => {
    const porMes: Record<string, { mes: string; faturamento: number; pedidos: number }> = {};
    const porProduto: Record<string, { produto: string; qtd: number; total: number }> = {};
    const porCliente: Record<string, { cliente: string; qtd: number; total: number }> = {};

    for (const p of pedidos) {
      const d = new Date(p.dataPedido);
      if (Number.isFinite(+d)) {
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        porMes[key] ??= { mes: key, faturamento: 0, pedidos: 0 };
        porMes[key].faturamento += parseNum(p.valorTotal);
        porMes[key].pedidos += 1;
      }
      porProduto[p.produto] ??= { produto: p.produto, qtd: 0, total: 0 };
      porProduto[p.produto].qtd += parseNum(p.quantidade) || 1;
      porProduto[p.produto].total += parseNum(p.valorTotal);

      porCliente[p.clienteNome] ??= { cliente: p.clienteNome, qtd: 0, total: 0 };
      porCliente[p.clienteNome].qtd += 1;
      porCliente[p.clienteNome].total += parseNum(p.valorTotal);
    }
    return {
      mensal: Object.values(porMes).sort((a, b) => a.mes.localeCompare(b.mes)),
      topProdutos: Object.values(porProduto).sort((a, b) => b.qtd - a.qtd).slice(0, 10),
      topClientes: Object.values(porCliente).sort((a, b) => b.total - a.total).slice(0, 10),
    };
  }, [pedidos]);

  return (
    <AppLayout title="Relatórios" subtitle="Visão analítica e exportações">
      <div className="grid gap-4 lg:grid-cols-2">
        <ReportCard
          title="Faturamento mensal"
          onExport={() => download("faturamento-mensal.csv", toCSV(stats.mensal))}
          headers={["Mês", "Pedidos", "Faturamento"]}
          rows={stats.mensal.map((r) => [r.mes, r.pedidos, fmt(r.faturamento)])}
        />
        <ReportCard
          title="Produtos mais vendidos"
          onExport={() => download("produtos-mais-vendidos.csv", toCSV(stats.topProdutos))}
          headers={["Produto", "Qtd", "Total"]}
          rows={stats.topProdutos.map((r) => [r.produto, r.qtd, fmt(r.total)])}
        />
        <ReportCard
          title="Clientes que mais compram"
          onExport={() => download("top-clientes.csv", toCSV(stats.topClientes))}
          headers={["Cliente", "Pedidos", "Total gasto"]}
          rows={stats.topClientes.map((r) => [r.cliente, r.qtd, fmt(r.total)])}
        />
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display">Exportações completas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ExportRow label={`Pedidos (${pedidos.length})`}
              onClick={() => download("pedidos.csv", toCSV(pedidos))} />
            <ExportRow label={`Clientes (${clientes.length})`}
              onClick={() => download("clientes.csv", toCSV(clientes))} />
            <ExportRow label={`Catálogo de produtos (${produtos.length})`}
              onClick={() => download("produtos.csv", toCSV(produtos))} />
            <p className="pt-2 text-xs text-muted-foreground">
              CSV compatível com Excel/Google Sheets. Para PDF, exporte o CSV e gere o relatório no Excel.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

function ReportCard({
  title, onExport, headers, rows,
}: {
  title: string; onExport: () => void; headers: string[]; rows: (string | number)[][];
}) {
  return (
    <Card className="shadow-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-display text-lg">{title}</CardTitle>
        <Button size="sm" variant="outline" onClick={onExport}>
          <Download className="h-3.5 w-3.5" /> CSV
        </Button>
      </CardHeader>
      <CardContent>
        {rows.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">Sem dados.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                <tr>{headers.map((h) => <th key={h} className="px-2 py-2 text-left">{h}</th>)}</tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-t border-border/60">
                    {r.map((c, j) => <td key={j} className="px-2 py-2">{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ExportRow({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-muted/40 px-4 py-3">
      <span className="text-sm">{label}</span>
      <Button size="sm" variant="ghost" onClick={onClick}>
        <Download className="h-3.5 w-3.5" /> Exportar
      </Button>
    </div>
  );
}
