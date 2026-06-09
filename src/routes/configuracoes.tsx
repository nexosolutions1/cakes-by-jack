import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save, ExternalLink, PlugZap } from "lucide-react";
import {
  getConfig,
  updateConfig,
  testWrite,
  type ConfigData,
} from "@/lib/sheets.functions";
import { SPREADSHEET_ID } from "@/lib/sheets.server";
import { toast } from "sonner";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({ meta: [{ title: "Configurações — Cakes by Jack" }] }),
  component: ConfigPage,
});

const EMPTY: ConfigData = {
  nome: "",
  whatsapp: "",
  instagram: "",
  endereco: "",
  chavePix: "",
  tipoPix: "",
  nomeRecebedor: "",
  banco: "",
};

function ConfigPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["config"],
    queryFn: () => getConfig(),
  });
  const qc = useQueryClient();
  const save = useServerFn(updateConfig);
  const runTest = useServerFn(testWrite);
  const [form, setForm] = useState<ConfigData>(EMPTY);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const saveMut = useMutation({
    mutationFn: () => save({ data: form }),
    onSuccess: () => {
      toast.success("Configurações salvas na planilha");
      qc.invalidateQueries({ queryKey: ["config"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
  const writeMut = useMutation({
    mutationFn: () => runTest({ data: undefined }),
    onSuccess: (r) =>
      r.ok ? toast.success(r.message) : toast.error("Sem permissão", { description: r.message }),
    onError: (e: Error) => toast.error(e.message),
  });

  const sheetUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit`;

  return (
    <AppLayout title="Configurações" subtitle="Dados da confeitaria e do Pix">
      <div className="mx-auto max-w-2xl space-y-4">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display">Dados da confeitaria</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {isLoading && (
              <p className="text-sm text-muted-foreground">Carregando...</p>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Nome">
                <Input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
              </Field>
              <Field label="WhatsApp principal (com DDD/DDI)">
                <Input
                  placeholder="5511999999999"
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                />
              </Field>
              <Field label="Instagram">
                <Input value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} />
              </Field>
              <Field label="Endereço">
                <Input value={form.endereco} onChange={(e) => setForm({ ...form, endereco: e.target.value })} />
              </Field>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display">Pix</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <Field label="Chave Pix">
              <Input value={form.chavePix} onChange={(e) => setForm({ ...form, chavePix: e.target.value })} />
            </Field>
            <Field label="Tipo da chave">
              <Input
                placeholder="CPF, e-mail, telefone, aleatória..."
                value={form.tipoPix}
                onChange={(e) => setForm({ ...form, tipoPix: e.target.value })}
              />
            </Field>
            <Field label="Nome do recebedor">
              <Input value={form.nomeRecebedor} onChange={(e) => setForm({ ...form, nomeRecebedor: e.target.value })} />
            </Field>
            <Field label="Banco">
              <Input value={form.banco} onChange={(e) => setForm({ ...form, banco: e.target.value })} />
            </Field>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-2">
          <Button onClick={() => saveMut.mutate()} disabled={saveMut.isPending} className="bg-gradient-primary">
            {saveMut.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Salvar configurações
          </Button>
          <Button variant="outline" onClick={() => writeMut.mutate()} disabled={writeMut.isPending}>
            {writeMut.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <PlugZap className="h-4 w-4" />}
            Testar escrita
          </Button>
          <Button asChild variant="outline">
            <a href={sheetUrl} target="_blank" rel="noreferrer">
              <ExternalLink className="h-4 w-4" /> Abrir planilha
            </a>
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
