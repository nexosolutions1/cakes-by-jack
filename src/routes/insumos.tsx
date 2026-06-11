import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, AlertTriangle, Boxes, Loader2 } from "lucide-react";
import {
  createInsumo,
  listInsumos,
  updateInsumoEstoque,
  deleteInsumo,
  type Insumo,
} from "@/lib/sheets.functions";
import { toast } from "sonner";
import { parseMoney } from "@/lib/format";

export const Route = createFileRoute("/insumos")({
  head: () => ({
    meta: [
      { title: "Estoque & Insumos — Cakes by Jack" },
      { name: "description", content: "Controle de estoque e insumos." },
    ],
  }),
  component: InsumosPage,
});

function status(i: Insumo) {
  const atual = Number(i.estoqueAtual) || 0;
  const min = Number(i.estoqueMinimo) || 0;
  if (atual <= 0) return { label: "Crítico", color: "bg-destructive/15 text-destructive" };
  if (atual <= min) return { label: "Baixo", color: "bg-warning/20 text-warning" };
  return { label: "Normal", color: "bg-success/15 text-success" };
}

function InsumosPage() {
  const { data: insumos = [], isLoading } = useQuery({
    queryKey: ["insumos"],
    queryFn: () => listInsumos(),
  });
  const [open, setOpen] = useState(false);

  const alerts = useMemo(
    () => insumos.filter((i) => status(i).label !== "Normal").length,
    [insumos],
  );

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

  return (
    <AppLayout
      title="Estoque & Insumos"
      subtitle={`${insumos.length} insumos${alerts ? ` • ${alerts} em alerta` : ""}`}
      actions={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary shadow-soft">
              <Plus className="h-4 w-4" /> Novo insumo
            </Button>
          </DialogTrigger>
          <NovoInsumoDialog onDone={() => setOpen(false)} />
        </Dialog>
      }
    >
      {isLoading && <p className="text-sm text-muted-foreground">Carregando...</p>}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {insumos.map((i) => (
          <InsumoCard key={i.id} insumo={i} />
        ))}
      </div>
    </AppLayout>
  );
}

function InsumoCard({ insumo }: { insumo: Insumo }) {
  const s = status(insumo);
  const update = useServerFn(updateInsumoEstoque);
  const remove = useServerFn(deleteInsumo);
  const qc = useQueryClient();
  const [value, setValue] = useState(insumo.estoqueAtual);
  const mut = useMutation({
    mutationFn: (v: number) => update({ data: { id: insumo.id, estoqueAtual: v } }),
    onSuccess: () => {
      toast.success("Estoque atualizado");
      qc.invalidateQueries({ queryKey: ["insumos"] });
    },
  });

  return (
    <Card className="border-border/60 shadow-card">
      <CardContent className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <Button
  variant="ghost"
  size="icon"
  className="h-8 w-8 text-red-500 hover:text-red-600"
onClick={async () => {
  if (!confirm(`Excluir o insumo "${insumo.nome}"?`)) return;

  await remove({
    data: {
      id: insumo.id,
    },
  });

  toast.success("Insumo excluído");

  qc.invalidateQueries({
    queryKey: ["insumos"],
  });
}}
>
  <Trash2 className="h-4 w-4" />
</Button>
          <div className="flex items-center gap-2">
            <div className="bg-gradient-rose flex h-9 w-9 items-center justify-center rounded-full">
              <Boxes className="h-4 w-4 text-rose-deep" />
            </div>
            <div>
              <p className="font-medium leading-tight">{insumo.nome}</p>
              <p className="text-xs text-muted-foreground">
                R$ {parseMoney(insumo.valorUnitario).toFixed(2)} / {insumo.unidade}
              </p>
            </div>
          </div>
          <Badge className={s.color}>
            {s.label === "Crítico" && <AlertTriangle className="mr-1 h-3 w-3" />}
            {s.label}
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Estoque atual
            </Label>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={() => Number(value) !== Number(insumo.estoqueAtual) && mut.mutate(Number(value))}
            />
          </div>
          <div>
            <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Mínimo
            </Label>
            <Input value={insumo.estoqueMinimo} disabled className="bg-muted" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function NovoInsumoDialog({ onDone }: { onDone: () => void }) {
  const create = useServerFn(createInsumo);
  const qc = useQueryClient();
  const [form, setForm] = useState({
    nome: "", unidade: "kg", estoqueAtual: 0, estoqueMinimo: 0, valorUnitario: 0, observacoes: "",
  });
  const mut = useMutation({
    mutationFn: () => create({ data: form }),
    onSuccess: () => {
      toast.success("Insumo cadastrado");
      qc.invalidateQueries({ queryKey: ["insumos"] });
      onDone();
    },
    onError: (e: Error) => toast.error(e.message),
  });
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="font-display text-2xl">Novo insumo</DialogTitle>
      </DialogHeader>
      <div className="grid gap-3">
        <Label>Nome</Label>
        <Input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Unidade</Label>
            <Input value={form.unidade} onChange={(e) => setForm({ ...form, unidade: e.target.value })} />
          </div>
          <div>
            <Label>Valor unitário</Label>
            <Input type="number" step="0.01" value={form.valorUnitario}
              onChange={(e) => setForm({ ...form, valorUnitario: +e.target.value })} />
          </div>
          <div>
            <Label>Estoque atual</Label>
            <Input type="number" value={form.estoqueAtual}
              onChange={(e) => setForm({ ...form, estoqueAtual: +e.target.value })} />
          </div>
          <div>
            <Label>Estoque mínimo</Label>
            <Input type="number" value={form.estoqueMinimo}
              onChange={(e) => setForm({ ...form, estoqueMinimo: +e.target.value })} />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button disabled={!form.nome || mut.isPending} onClick={() => mut.mutate()} className="bg-gradient-primary">
          {mut.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          Salvar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
