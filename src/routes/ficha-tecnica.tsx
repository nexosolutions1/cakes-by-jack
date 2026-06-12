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
import { ChefHat, Plus, Loader2, Trash2, Pencil } from "lucide-react";
import {
  listFichas,
  listProdutos,
  listInsumos,
  listCustosAdicionais,
  upsertFicha,
  updateFicha,
  deleteFicha,
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

function currencyInputToNumber(value: string) {
  const onlyNumbers = String(value || "").replace(/\D/g, "");
  return Number(onlyNumbers || 0) / 100;
}

function formatCurrencyInput(value: string) {
  return currencyInputToNumber(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function numberToCurrencyInput(value: number) {
  return Number(value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}


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
  const remove = useServerFn(deleteFicha);
  const updateFichaFn = useServerFn(updateFicha);
const [editOpen, setEditOpen] = useState(false);

const [editForm, setEditForm] = useState({
  produtoId: ficha.produtoId,
  produtoNome: ficha.produtoNome,
  ingredientes: ficha.ingredientes,
  custoTotal: numberToCurrencyInput(Number(ficha.custoTotal)),
  precoVenda: numberToCurrencyInput(Number(ficha.precoVenda)),
  observacoes: ficha.observacoes || "",
});
const qc = useQueryClient();
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

<div className="flex items-center gap-2">

  <Badge className={cor}>
    {margem.toFixed(1)}% margem
  </Badge>

  <Dialog open={editOpen} onOpenChange={setEditOpen}>
    <DialogTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-blue-500 hover:text-blue-600"
      >
        <Pencil className="h-4 w-4" />
      </Button>
    </DialogTrigger>

    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar Ficha Técnica</DialogTitle>
      </DialogHeader>

      <div className="grid gap-3">
        <div>
          <Label>Produto</Label>
          <Input
            value={editForm.produtoNome}
            disabled
            className="bg-muted"
          />
        </div>

        <div>
          <Label>Ingredientes</Label>
          <Textarea
            rows={5}
            value={editForm.ingredientes}
            onChange={(e) =>
              setEditForm({
                ...editForm,
                ingredientes: e.target.value,
              })
            }
          />
        </div>

        <div>
          <Label>Custo total</Label>
          <Input
            inputMode="numeric"
            value={editForm.custoTotal}
            onChange={(e) =>
              setEditForm({
                ...editForm,
                custoTotal: formatCurrencyInput(e.target.value),
              })
            }
          />
        </div>

        <div>
          <Label>Preço de venda</Label>
          <Input
            inputMode="numeric"
            value={editForm.precoVenda}
            onChange={(e) =>
              setEditForm({
                ...editForm,
                precoVenda: formatCurrencyInput(e.target.value),
              })
            }
          />
        </div>
      </div>

      <DialogFooter>
        <Button
          className="bg-gradient-primary"
          onClick={() =>
            updateFichaFn({
              data: {
                id: ficha.id,
                produtoId: editForm.produtoId,
                produtoNome: editForm.produtoNome,
                ingredientes: editForm.ingredientes,
                custoTotal: currencyInputToNumber(editForm.custoTotal),
                precoVenda: currencyInputToNumber(editForm.precoVenda),
                observacoes: editForm.observacoes,
              },
            }).then(() => {
              toast.success("Ficha atualizada");
              qc.invalidateQueries({
                queryKey: ["fichas"],
              });
              setEditOpen(false);
            })
          }
        >
          Salvar alterações
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  <Button
    variant="ghost"
    size="icon"
    className="h-8 w-8 text-red-500 hover:text-red-600"
    onClick={async () => {
      if (!confirm(`Excluir ficha "${ficha.produtoNome}"?`)) return;

      await remove({
        data: {
          id: ficha.id,
        },
      });

      await qc.invalidateQueries({
        queryKey: ["fichas"],
      });

      toast.success("Ficha excluída");
    }}
  >
    <Trash2 className="h-4 w-4" />
  </Button>

</div>
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
    custoTotal: "",
    precoVenda: "",
    observacoes: "",
  });

const [novoInsumo, setNovoInsumo] = useState({
  insumoId: "",
  quantidade: "",
});

  const produto = produtos.find((p) => p.id === form.produtoId);

  const ingredientesSelecionados = form.ingredientes
    .split("\n")
    .map((linha) => linha.trim())
    .filter(Boolean);

  function calcularCustoIngredientes() {
    let total = 0;

    for (const linha of ingredientesSelecionados) {
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

  function adicionarInsumo() {
    const insumo = insumos.find((i) => i.id === novoInsumo.insumoId);

    if (!insumo) {
      toast.error("Selecione um insumo");
      return;
    }

const quantidade =
  novoInsumo.quantidade === ""
    ? 1
    : Number(novoInsumo.quantidade);    const linha = `${insumo.nome} ${quantidade}`;

    setForm({
      ...form,
      ingredientes: [...ingredientesSelecionados, linha].join("\n"),
    });

setNovoInsumo({
  insumoId: "",
  quantidade: "",
});
  }

  function removerIngrediente(index: number) {
    const novasLinhas = ingredientesSelecionados.filter((_, i) => i !== index);

    setForm({
      ...form,
      ingredientes: novasLinhas.join("\n"),
    });
  }

  const custoIngredientes = calcularCustoIngredientes();

  const custoAdicional = custosAdicionais.reduce(
    (acc, c) => acc + parseMoney(c.valor),
    0,
  );

  const custoCalculado = custoIngredientes + custoAdicional;

const custoTotalNumber = currencyInputToNumber(form.custoTotal);
const precoVendaNumber = currencyInputToNumber(form.precoVenda);

const lucro = precoVendaNumber - custoTotalNumber;
const margem = precoVendaNumber > 0 ? (lucro / precoVendaNumber) * 100 : 0;

  const mut = useMutation({
    mutationFn: () =>
      upsert({
        data: {
          produtoId: form.produtoId,
          produtoNome: produto ? `${produto.categoria} • ${produto.nome}` : "",
          ingredientes: form.ingredientes,
          custoTotal: custoTotalNumber,
          precoVenda: precoVendaNumber,
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
    <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="font-display text-2xl">Ficha Técnica</DialogTitle>
      </DialogHeader>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label>Produto</Label>

          <Select
            value={form.produtoId}
            onValueChange={(v) => {
              const p = produtos.find((x) => x.id === v);

              setForm({
                ...form,
                produtoId: v,
precoVenda: p ? numberToCurrencyInput(Number(String(p.preco).replace(",", "."))) : "",
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
        </div>

        <div className="rounded-xl border border-border/60 bg-card/60 p-3">
          <Label>Ingredientes da receita</Label>

          <div className="mt-2 grid gap-2 sm:grid-cols-[1fr_120px_auto]">
            <Select
              value={novoInsumo.insumoId}
              onValueChange={(v) =>
                setNovoInsumo({
                  ...novoInsumo,
                  insumoId: v,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o insumo" />
              </SelectTrigger>

              <SelectContent className="max-h-72">
                {insumos.map((i) => (
                  <SelectItem key={i.id} value={i.id}>
                    {i.nome} — R$ {parseMoney(i.valorUnitario).toFixed(2)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

<Input
  type="number"
  min={0.01}
  step="0.01"
  value={novoInsumo.quantidade}
  onChange={(e) =>
    setNovoInsumo({
      ...novoInsumo,
      quantidade: e.target.value,
    })
  }
/>

            <Button type="button" onClick={adicionarInsumo} className="bg-gradient-primary">
              Adicionar
            </Button>
          </div>

          <div className="mt-3 space-y-2">
            {ingredientesSelecionados.length === 0 ? (
              <p className="rounded-lg bg-muted/40 p-3 text-sm text-muted-foreground">
                Nenhum ingrediente adicionado ainda.
              </p>
            ) : (
              ingredientesSelecionados.map((linha, index) => (
                <div
                  key={`${linha}-${index}`}
                  className="flex items-center justify-between rounded-lg border border-border/60 bg-background px-3 py-2 text-sm"
                >
                  <span>{linha}</span>

                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => removerIngrediente(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    Remover
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>

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
custoTotal: numberToCurrencyInput(Number(custoCalculado.toFixed(2))),
            })
          }
        >
          Usar custo calculado
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Custo total editável (R$)</Label>

<Input
  inputMode="numeric"
  placeholder="R$ 0,00"
  value={form.custoTotal}
  onChange={(e) =>
    setForm({
      ...form,
      custoTotal: formatCurrencyInput(e.target.value),
    })
  }
/>
          </div>

          <div>
            <Label>Preço de venda (R$)</Label>

<Input
  inputMode="numeric"
  placeholder="R$ 0,00"
  value={form.precoVenda}
  onChange={(e) =>
    setForm({
      ...form,
      precoVenda: formatCurrencyInput(e.target.value),
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
          disabled={!form.produtoId || ingredientesSelecionados.length === 0 || mut.isPending}
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