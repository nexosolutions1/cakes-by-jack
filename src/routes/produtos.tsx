import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Cake } from "lucide-react";
import { listProdutos, type Produto } from "@/lib/sheets.functions";

export const Route = createFileRoute("/produtos")({
  head: () => ({
    meta: [
      { title: "Produtos — Cakes by Jack" },
      { name: "description", content: "Catálogo de docinhos e bolos." },
    ],
  }),
  component: ProdutosPage,
});

function ProdutosPage() {
  const { data: produtos = [], isLoading } = useQuery({
    queryKey: ["produtos"],
    queryFn: () => listProdutos(),
  });
  const [search, setSearch] = useState("");

  const grouped = useMemo(() => {
    const filtered = produtos.filter((p) =>
      `${p.nome} ${p.tipo} ${p.categoria}`.toLowerCase().includes(search.toLowerCase()),
    );
    const map: Record<string, Record<string, Produto[]>> = {};
    for (const p of filtered) {
      map[p.categoria] ??= {};
      map[p.categoria][p.tipo] ??= [];
      map[p.categoria][p.tipo].push(p);
    }
    return map;
  }, [produtos, search]);

  return (
    <AppLayout title="Produtos" subtitle="Catálogo completo da confeitaria">
      <div className="mb-6">
        <Input
          placeholder="Buscar produto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm bg-card"
        />
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Carregando...</p>}

      <div className="space-y-8">
        {Object.entries(grouped).map(([categoria, tipos]) => (
          <section key={categoria}>
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-gradient-rose flex h-9 w-9 items-center justify-center rounded-full">
                <Cake className="h-4 w-4 text-rose-deep" />
              </div>
              <h2 className="font-display text-2xl font-semibold">{categoria}</h2>
            </div>

            {Object.entries(tipos).map(([tipo, items]) => (
              <div key={tipo} className="mb-6">
                <div className="mb-3 flex items-center gap-3">
                  <h3 className="font-display text-lg text-rose-deep">{tipo}</h3>
                  <Badge variant="secondary" className="bg-gold/20 text-gold-foreground">
                    {formatPreco(items[0])}
                  </Badge>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map((p) => (
                    <Card
                      key={p.id}
                      className="border-border/60 shadow-card transition hover:shadow-soft"
                    >
                      <CardContent className="flex items-center justify-between p-4">
                        <span className="font-medium">{p.nome}</span>
                        <span className="text-sm text-muted-foreground">
                          {formatPreco(p)}
                        </span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </section>
        ))}
      </div>
    </AppLayout>
  );
}

function formatPreco(p: Produto) {
  const raw = String(p.preco ?? "").replace(/R\$\s?/gi, "").replace(",", ".").trim();
  const preco = Number(raw);
  if (!Number.isFinite(preco)) return "—";
  const fmt = preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  if (p.unidade === "kg") return `${fmt} / kg`;
  return fmt;
}
