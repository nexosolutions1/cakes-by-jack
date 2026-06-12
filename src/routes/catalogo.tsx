import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useRef, useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, ImagePlus, Share2, Loader2 } from "lucide-react";
import { formatBRL } from "@/lib/format";
import {
  listProdutos,
  createProduto,
  updateProduto,
  deleteProduto,
  type Produto,
} from "@/lib/sheets.functions";
import {
  publicImageUrl,
  uploadProductImage,
  deleteProductImage,
} from "@/lib/image-storage";
import { toast } from "sonner";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Catálogo — Cakes by Jack" },
      { name: "description", content: "Vitrine de produtos da confeitaria." },
    ],
  }),
  component: CatalogoPage,
});

const CATEGORIAS = ["Bolos", "Docinhos", "Tortas", "Especiais", "Outros"];

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

function numberToCurrencyInput(value: unknown) {
  const n =
    typeof value === "number"
      ? value
      : Number(String(value ?? "0").replace("R$", "").replace(/\./g, "").replace(",", "."));

  return (Number.isFinite(n) ? n : 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function CatalogoPage() {
  const { data: produtos = [], isLoading } = useQuery({
    queryKey: ["produtos"],
    queryFn: () => listProdutos(),
  });

  const [editing, setEditing] = useState<Produto | null>(null);
  const [open, setOpen] = useState(false);

  const ativos = produtos.filter((p) => p.nome && p.observacoes !== "EXCLUÍDO");

  function compartilhar() {
    const link = `${window.location.origin}/c/catalogo`;
    navigator.clipboard.writeText(link).catch(() => {});
    toast.success("Link copiado!", { description: link });
  }

  return (
    <AppLayout
      title="Catálogo"
      subtitle="Vitrine da confeitaria — gerencie produtos e fotos"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" onClick={compartilhar}>
            <Share2 className="h-4 w-4" /> Compartilhar
          </Button>
          <Button
            className="bg-gradient-primary shadow-soft"
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            <Plus className="h-4 w-4" /> Novo produto
          </Button>
        </div>
      }
    >
      {isLoading && <p className="text-sm text-muted-foreground">Carregando...</p>}

      {!isLoading && ativos.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="py-16 text-center text-muted-foreground">
            Nenhum produto ainda. Clique em "Novo produto" para começar.
          </CardContent>
        </Card>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ativos.map((p) => (
          <ProdutoCard
            key={p.id}
            produto={p}
            onEdit={() => {
              setEditing(p);
              setOpen(true);
            }}
          />
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <ProdutoDialog produto={editing} onDone={() => setOpen(false)} />
      </Dialog>
    </AppLayout>
  );
}

function ProdutoCard({ produto, onEdit }: { produto: Produto; onEdit: () => void }) {
  const del = useServerFn(deleteProduto);
  const qc = useQueryClient();

  const mut = useMutation({
    mutationFn: () => del({ data: { id: produto.id } }),
    onSuccess: async () => {
      if (produto.imagem) await deleteProductImage(produto.imagem).catch(() => {});
      toast.success("Produto excluído");
      qc.invalidateQueries({ queryKey: ["produtos"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const img = publicImageUrl(produto.imagem);

  return (
    <Card className="overflow-hidden border-border shadow-card transition hover:shadow-elevated">
      <div className="bg-gradient-rose relative aspect-[4/3] overflow-hidden">
        {img ? (
          <img src={img} alt={produto.nome} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-rose-deep/40">
            <ImagePlus className="h-10 w-10" />
          </div>
        )}
        <Badge className="absolute left-3 top-3 bg-white/90 text-chocolate shadow-card">
          {produto.categoria || "Sem categoria"}
        </Badge>
      </div>

      <CardContent className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold leading-tight">
            {produto.nome}
          </h3>
          <span className="kpi-number text-base whitespace-nowrap text-primary">
            {formatBRL(produto.preco)}
          </span>
        </div>

        {produto.descricao && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {produto.descricao}
          </p>
        )}

        <div className="flex gap-2 pt-2">
          <Button size="sm" variant="outline" onClick={onEdit}>
            <Pencil className="h-3.5 w-3.5" /> Editar
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="text-destructive hover:bg-destructive/10"
            onClick={() => {
              if (confirm(`Excluir "${produto.nome}"?`)) mut.mutate();
            }}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ProdutoDialog({
  produto,
  onDone,
}: {
  produto: Produto | null;
  onDone: () => void;
}) {
  const create = useServerFn(createProduto);
  const update = useServerFn(updateProduto);
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    nome: produto?.nome ?? "",
    categoria: produto?.categoria ?? "Bolos",
    tipo: produto?.tipo ?? "",
    preco: produto?.preco ? numberToCurrencyInput(produto.preco) : "",
    unidade: produto?.unidade ?? "unidade",
    descricao: produto?.descricao ?? "",
    imagem: produto?.imagem ?? "",
    observacoes:
      produto?.observacoes && produto.observacoes !== "EXCLUÍDO"
        ? produto.observacoes
        : "",
  });

  async function pickImage(file: File) {
    setUploading(true);
    try {
      if (form.imagem) await deleteProductImage(form.imagem).catch(() => {});
      const path = await uploadProductImage(file);
      setForm((f) => ({ ...f, imagem: path }));
      toast.success("Foto enviada");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Falha no upload");
    } finally {
      setUploading(false);
    }
  }

  const mut = useMutation({
    mutationFn: async () => {
      const payload = {
        nome: form.nome,
        categoria: form.categoria,
        tipo: form.tipo,
        unidade: form.unidade,
        preco: currencyInputToNumber(form.preco),
        descricao: form.descricao,
        imagem: form.imagem,
        observacoes: form.observacoes,
      };

      if (produto) return update({ data: { id: produto.id, ...payload } });
      return create({ data: payload });
    },
    onSuccess: () => {
      toast.success(produto ? "Produto atualizado" : "Produto criado");
      qc.invalidateQueries({ queryKey: ["produtos"] });
      onDone();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const previewUrl = publicImageUrl(form.imagem);

  return (
    <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="font-display text-2xl">
          {produto ? "Editar produto" : "Novo produto"}
        </DialogTitle>
      </DialogHeader>

      <div className="grid gap-4">
        <div
          className="bg-gradient-rose relative flex aspect-[16/9] cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-rose-deep/30"
          onClick={() => fileRef.current?.click()}
        >
          {previewUrl ? (
            <img src={previewUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="text-center text-rose-deep/70">
              <ImagePlus className="mx-auto h-10 w-10" />
              <p className="mt-2 text-sm">Toque para escolher uma foto</p>
            </div>
          )}

          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <Loader2 className="h-6 w-6 animate-spin text-white" />
            </div>
          )}

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) pickImage(f);
            }}
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Nome *">
            <Input
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />
          </Field>

          <Field label="Categoria">
            <select
              className="h-9 rounded-md border border-input bg-card px-3 text-sm"
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            >
              {CATEGORIAS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Preço (R$) *">
            <Input
              inputMode="numeric"
              placeholder="R$ 0,00"
              value={form.preco}
              onChange={(e) =>
                setForm({
                  ...form,
                  preco: formatCurrencyInput(e.target.value),
                })
              }
            />
          </Field>

          <Field label="Unidade">
            <Input
              value={form.unidade}
              onChange={(e) => setForm({ ...form, unidade: e.target.value })}
            />
          </Field>

          <Field label="Tipo / Linha">
            <Input
              value={form.tipo}
              onChange={(e) => setForm({ ...form, tipo: e.target.value })}
            />
          </Field>
        </div>

        <Field label="Descrição">
          <Textarea
            rows={3}
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            placeholder="Sabor, recheio, ocasiões ideais..."
          />
        </Field>
      </div>

      <DialogFooter>
        <Button
          disabled={!form.nome || currencyInputToNumber(form.preco) <= 0 || mut.isPending || uploading}
          onClick={() => mut.mutate()}
          className="bg-gradient-primary"
        >
          {mut.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {produto ? "Salvar alterações" : "Criar produto"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}