import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Phone, MapPin, MessageCircle, Loader2 } from "lucide-react";
import { createCliente, listClientes } from "@/lib/sheets.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/clientes")({
  head: () => ({
    meta: [
      { title: "Clientes — Cakes by Jack" },
      { name: "description", content: "Cadastro e histórico de clientes." },
    ],
  }),
  component: ClientesPage,
});

function ClientesPage() {
  const { data: clientes = [], isLoading } = useQuery({
    queryKey: ["clientes"],
    queryFn: () => listClientes(),
  });
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = clientes.filter((c) =>
    c.nome.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <AppLayout
      title="Clientes"
      subtitle={`${clientes.length} cadastrados`}
      actions={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary shadow-soft">
              <Plus className="h-4 w-4" />
              Novo cliente
            </Button>
          </DialogTrigger>
          <NovoClienteDialog onDone={() => setOpen(false)} />
        </Dialog>
      }
    >
      <div className="mb-6">
        <Input
          placeholder="Buscar cliente pelo nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm bg-card"
        />
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Carregando...</p>
      ) : filtered.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Nenhum cliente encontrado</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <Card key={c.id} className="border-border/60 shadow-card transition hover:shadow-soft">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-rose flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-lg font-semibold text-rose-deep">
                    {c.nome.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display truncate text-lg font-semibold">
                      {c.nome}
                    </h3>
                    {c.telefone && (
                      <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3.5 w-3.5" /> {c.telefone}
                      </p>
                    )}
                    {c.whatsapp && (
                      <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MessageCircle className="h-3.5 w-3.5" /> {c.whatsapp}
                      </p>
                    )}
                    {(c.bairro || c.cidade) && (
                      <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />{" "}
                        {[c.bairro, c.cidade].filter(Boolean).join(" • ")}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AppLayout>
  );
}

function NovoClienteDialog({ onDone }: { onDone: () => void }) {
  const create = useServerFn(createCliente);
  const qc = useQueryClient();
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    whatsapp: "",
    endereco: "",
    cidade: "",
    bairro: "",
    observacoes: "",
  });
  const mut = useMutation({
    mutationFn: () => create({ data: form }),
    onSuccess: () => {
      toast.success("Cliente cadastrado");
      qc.invalidateQueries({ queryKey: ["clientes"] });
      onDone();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <DialogContent className="max-w-lg">
      <DialogHeader>
        <DialogTitle className="font-display text-2xl">Novo cliente</DialogTitle>
      </DialogHeader>
      <div className="grid gap-3">
        <Field label="Nome *">
          <Input value={form.nome} onChange={set("nome")} />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Telefone">
            <Input value={form.telefone} onChange={set("telefone")} />
          </Field>
          <Field label="WhatsApp">
            <Input value={form.whatsapp} onChange={set("whatsapp")} />
          </Field>
        </div>
        <Field label="Endereço">
          <Input value={form.endereco} onChange={set("endereco")} />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Bairro">
            <Input value={form.bairro} onChange={set("bairro")} />
          </Field>
          <Field label="Cidade">
            <Input value={form.cidade} onChange={set("cidade")} />
          </Field>
        </div>
        <Field label="Observações">
          <Textarea value={form.observacoes} onChange={set("observacoes")} rows={2} />
        </Field>
      </div>
      <DialogFooter>
        <Button
          disabled={!form.nome || mut.isPending}
          onClick={() => mut.mutate()}
          className="bg-gradient-primary"
        >
          {mut.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          Salvar
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
