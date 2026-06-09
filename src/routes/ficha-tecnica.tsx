import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { ChefHat, Plus, Loader2 } from "lucide-react";
import {
  listFichas,
  listProdutos,
  listInsumos,
  listCustosAdicionais,
  upsertFicha,
  type Ficha,
  type Produto,
} from "@/lib/sheets.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/ficha-tecnica")({
  head: () => ({
    meta: [
      { title: "Ficha Técnica — Cakes by Jack" },
      { name: "description", content: "Receitas, custos e margens dos produtos." },
    ],
  }),
  component: FichaPage,
});

function parseMoney(value: string | number | undefined | null) {
  if (value === undefined || value === null) return 0;
  if (typeof value === "number") return value;

  const cleaned = String(value)
    .replace("R$", "")
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  return Number(cleaned) || 0;
}

function normalizeText(value: string) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function FichaPage() {
  const { data: fichas = [] } = useQuery({
    queryKey: ["fichas"],
    queryFn: () => listFichas(),
  });

  const { data: produtos = [] } = useQuery({
    queryKey: ["produtos"],
    queryFn: () => listProdutos(),
  });

  const [open, setOpen] = useState(false);

  return (
    <AppLayout
      title="Ficha Técnica"
      subtitle="Receitas, custos e margens"
      actions={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary shadow-soft">
              <Plus className="h-4 w-4" /> Nova ficha
            </Button>
          </DialogTrigger>
          <FichaDialog produtos={produtos} onDone={() => setOpen(false)} />
        </Dialog>
      }
    >
      {fichas.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="space-y-2 py-12 text-center">
            <ChefHat className="mx-auto h-10 w-10 text-rose-deep" />
            <p className="text-muted-foreground">
              Cadastre as fichas técnicas dos seus produtos para calcular custos e margem.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {fichas.map((f) => (
            <FichaCard key={f.id} ficha={f} />
          ))}
        </div>
      )}
    </AppLayout>
  );
}

function FichaCard({ ficha }: { ficha: Ficha }) {
  const margem = Number(ficha.margem) || 0;

  const cor =
    margem >= 50
      ? "bg-success/15 text-success"
      : margem >= 25
        ? "bg-warning/20 text-warning"
        : "bg-destructive/15 text-destructive";

  return (
    <Card className="border-border/60 shadow-card">
      <CardContent className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-display text-lg font-semibold">{ficha.produtoNome}</p>
            <p className="whitespace-pre-line text-xs text-muted-foreground">
              {ficha.ingredientes}
            </p>
          </div>

          <Badge className={cor}>{margem.toFixed(1)}% margem</Badge>
        </div>

        <div className="grid grid-cols-3 gap-2 rounded-xl bg-muted/40 p-3 text-center text-sm">
          <Cell label="Custo" value={`R$ ${ficha.custoTotal}`} />
          <Cell label="Venda" value={`R$ ${ficha.precoVenda}`} />
          <Cell label="Lucro" value={`R$ ${ficha.lucroBruto}`} />
        </div>
      </CardContent>
    </Card>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

function FichaDialog({ produtos, onDone }: { produtos: Produto[]; onDone: () => void }) {
  const upsert = useServerFn(upsertFicha);
  const qc = useQueryClient();

  const { data: insumos = [] } = useQuery({
    queryKey: ["insumos"],
    queryFn: () => listInsumos(),
  });

  const { data: custosAdicionais = [] } = useQuery({
    queryKey: ["custos-adicionais"],
    queryFn: () => listCustosAdicionais(),
  });

  const [form, setForm] = useState({
    produtoId: "",
    ingredientes: "",
    custoTotal: 0,
    precoVenda: 0,
    observacoes: "",
  });

  const produto = produtos.find((p) => p.id === form.produtoId);

  function calcularCustoIngredientes() {
    const linhas = form.ingredientes
      .split("\n")
      .map((linha) => linha.trim())
      .filter(Boolean);

    let total = 0;

    for (const linha of linhas) {
      const qtdMatch = linha.match(/(\d+[,.]?\d*)\s*$/);
      const quantidade = qtdMatch ? Number(qtdMatch[1].replace(",", ".")) : 1;

      const nomeLinha = normalizeText(
        linha.replace(/(\d+[,.]?\d*)\s*$/, "").trim(),
      );

      const insumo = insumos.find((i) => {
        const nomeInsumo = normalizeText(i.nome);
        return nomeLinha.includes(nomeInsumo) || nomeInsumo.includes(nomeLinha);
      });

      if (insumo) {
        total += quantidade * parseMoney(insumo.valorUnitario);
      }
    }

    return total;
  }

  const custoIngredientes = calcularCustoIngredientes();

  const custoAdicional = custosAdicionais.reduce(
    (acc, c) => acc + parseMoney(c.valor),
    0,
  );

  const custoCalculado = custoIngredientes + custoAdicional;

  const lucro = form.precoVenda - form.custoTotal;
  const margem = form.precoVenda > 0 ? (lucro / form.precoVenda) * 100 : 0;

  const mut = useMutation({
    mutationFn: () =>
      upsert({
        data: {
          produtoId: form.produtoId,
          produtoNome: produto ? `${produto.categoria} • ${produto.nome}` : "",
          ingredientes: form.ingredientes,
          custoTotal: form.custoTotal,
          precoVenda: form.precoVenda,
          observacoes: form.observacoes,
        },
      }),

    onSuccess: () => {
      toast.success("Ficha salva");
      qc.invalidateQueries({ queryKey: ["fichas"] });
      onDone();
    },

    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <DialogContent className="max-w-xl">
      <DialogHeader>
        <DialogTitle className="font-display text-2xl">Ficha Técnica</DialogTitle>
      </DialogHeader>

      <div className="grid gap-3">
        <Label>Produto</Label>

        <Select
          value={form.produtoId}
          onValueChange={(v) => {
            const p = produtos.find((x) => x.id === v);

            setForm({
              ...form,
              produtoId: v,
              precoVenda: p ? Number(String(p.preco).replace(",", ".")) : 0,
            });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>

          <SelectContent className="max-h-72">
            {produtos.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.categoria} • {p.tipo} • {p.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Label>Ingredientes & quantidades</Label>

        <Textarea
          rows={5}
          placeholder={`Digite um insumo por linha. Ex:
Leite Condensado 1
Leite Ninho 2
Morango 3`}
          value={form.ingredientes}
          onChange={(e) =>
            setForm({
              ...form,
              ingredientes: e.target.value,
            })
          }
        />

        <div className="grid grid-cols-3 gap-2 rounded-xl bg-rose-soft/40 p-3 text-sm">
          <div>
            Ingredientes:
            <strong> R$ {custoIngredientes.toFixed(2)}</strong>
          </div>

          <div>
            Extras:
            <strong> R$ {custoAdicional.toFixed(2)}</strong>
          </div>

          <div>
            Calculado:
            <strong> R$ {custoCalculado.toFixed(2)}</strong>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            setForm({
              ...form,
              custoTotal: Number(custoCalculado.toFixed(2)),
            })
          }
        >
          Usar custo calculado
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Custo total editável (R$)</Label>

            <Input
              type="number"
              step="0.01"
              value={form.custoTotal}
              onChange={(e) =>
                setForm({
                  ...form,
                  custoTotal: +e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>Preço de venda (R$)</Label>

            <Input
              type="number"
              step="0.01"
              value={form.precoVenda}
              onChange={(e) =>
                setForm({
                  ...form,
                  precoVenda: +e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-xl bg-rose-soft/40 p-3 text-sm">
          <div>
            Lucro bruto:
            <strong> R$ {lucro.toFixed(2)}</strong>
          </div>

          <div>
            Margem:
            <strong> {margem.toFixed(1)}%</strong>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button
          disabled={!form.produtoId || mut.isPending}
          onClick={() => mut.mutate()}
          className="bg-gradient-primary"
        >
          {mut.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          Salvar ficha
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}