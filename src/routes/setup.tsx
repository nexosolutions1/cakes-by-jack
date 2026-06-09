import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, AlertCircle, ExternalLink, PlugZap } from "lucide-react";
import { checkSetup, testWrite } from "@/lib/sheets.functions";
import { SPREADSHEET_ID } from "@/lib/sheets.server";
import { toast } from "sonner";

export const Route = createFileRoute("/setup")({
  head: () => ({ meta: [{ title: "Configuração — Cakes by Jack" }] }),
  component: SetupPage,
});

const TABS = [
  "Configuracoes",
  "Usuarios",
  "Clientes",
  "Produtos",
  "Pedidos",
  "Pagamentos",
];

function SetupPage() {
  const { data: status, isLoading } = useQuery({
    queryKey: ["setup"],
    queryFn: () => checkSetup(),
  });

  const runTest = useServerFn(testWrite);
  const writeMut = useMutation({
    mutationFn: () => runTest({ data: undefined }),
    onSuccess: (r) => {
      if (r.ok) toast.success(r.message);
      else toast.error("Sem permissão de escrita", { description: r.message });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const sheetUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit`;

  return (
    <AppLayout title="Configuração" subtitle="Conexão com Google Sheets">
      <div className="mx-auto max-w-2xl space-y-4">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : status?.ok ? (
                <CheckCircle2 className="h-5 w-5 text-success" />
              ) : (
                <AlertCircle className="h-5 w-5 text-warning" />
              )}
              Status da planilha
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {isLoading && <p className="text-muted-foreground">Verificando...</p>}
            {!isLoading && status?.ok && (
              <p>
                Tudo certo! As abas necessárias foram encontradas e o
                sistema está conectado à planilha oficial.
              </p>
            )}
            {!isLoading && !status?.configured && (
              <div className="rounded-xl bg-destructive/10 p-4 text-destructive">
                <p className="font-medium">Erro de conexão</p>
                <p className="mt-1 text-xs">{status?.error}</p>
              </div>
            )}
            {!isLoading && status?.configured && !status.ok && (
              <div className="rounded-xl bg-warning/10 p-4">
                <p className="font-medium">Faltam abas na planilha</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Crie no Google Sheets as abas:{" "}
                  <strong>{status.missing.join(", ")}</strong>. O sistema usa
                  exatamente esses nomes — não criamos abas automaticamente.
                </p>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline">
                <a href={sheetUrl} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-4 w-4" /> Abrir planilha
                </a>
              </Button>
              <Button
                onClick={() => writeMut.mutate()}
                disabled={writeMut.isPending}
                className="bg-gradient-primary"
              >
                {writeMut.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <PlugZap className="h-4 w-4" />
                )}
                Testar escrita
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Como funciona</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              A planilha já vem pronta com títulos na linha 1, cabeçalhos na linha 3
              e dados a partir da linha 4. O sistema lê e grava respeitando essa
              estrutura — sem criar novas abas e sem sobrescrever fórmulas.
            </p>
            <p className="font-medium text-foreground">Abas conectadas:</p>
            <ul className="grid grid-cols-2 gap-1 text-xs">
              {TABS.map((t) => (
                <li key={t} className="rounded-md bg-muted/50 px-2 py-1 font-mono">
                  {t}
                </li>
              ))}
            </ul>
            <p className="pt-2">
              Toda alteração feita no sistema é gravada diretamente na planilha; e
              toda alteração feita na planilha aparece no sistema ao recarregar.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
