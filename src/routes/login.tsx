import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth, normalizePhone } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand-logo";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import jackPremium from "@/assets/jack-confeitaria-premium.png";
import { NexoSignature } from "@/components/nexo-signature";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Entrar — Cakes by Jack" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { login, loading, refresh } = useAuth();
  const navigate = useNavigate();
  const [whatsapp, setWhatsapp] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const norm = normalizePhone(whatsapp);
    if (norm.length < 8) {
      toast.error("Informe um WhatsApp válido (com DDD).");
      return;
    }
    setSubmitting(true);
    try {
      refresh();
      await new Promise((r) => setTimeout(r, 400));
      const user = login(norm);
      if (!user) {
        toast.error("Usuário não encontrado", {
          description: "Verifique o número ou peça ao administrador para cadastrar.",
        });
        return;
      }
      toast.success(`Bem-vinda, ${user.nome}!`);
      const perfil = (user.perfil || "").toUpperCase();
      if (perfil === "CLIENTE") navigate({ to: "/c/catalogo" });
      else navigate({ to: "/" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
<div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-chocolate px-4 py-10">
  <img
    src={jackPremium}
    alt=""
    className="absolute inset-0 h-full w-full object-cover opacity-35 blur-sm scale-105"
  />

  <div className="absolute inset-0 bg-gradient-to-br from-rose-soft/80 via-cream-soft/75 to-primary/50" />
  
      <Card className="relative z-10 w-full max-w-md border-2 border-white/60 bg-white/80 shadow-elevated backdrop-blur-xl">
        <CardContent className="px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-col items-center text-center">
            <div className="bg-gradient-rose mb-3 inline-flex h-20 w-20 items-center justify-center rounded-full shadow-soft ring-4 ring-white/70">
              <BrandLogo size={56} />
            </div>
            <p className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-rose-deep">
              <Sparkles className="h-3 w-3" /> Confeitaria Artesanal
            </p>
            <h1 className="font-display mt-2 text-3xl font-semibold text-chocolate sm:text-4xl">
              Cakes by Jack
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Bem-vinda de volta! Entre para gerenciar seus pedidos.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div className="grid gap-1.5">
              <Label htmlFor="wa" className="text-xs uppercase tracking-wider text-muted-foreground">
                WhatsApp cadastrado
              </Label>
              <Input
                id="wa"
                type="tel"
                inputMode="numeric"
                placeholder="Digite seu WhatsApp"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                autoComplete="off"
                autoFocus
                required
                className="h-11 bg-white text-base"
              />
              <p className="text-xs text-muted-foreground">
                Somente números, com DDD.
              </p>
            </div>
            <Button
              type="submit"
              disabled={submitting || loading}
              className="bg-gradient-primary h-11 w-full text-base font-semibold shadow-soft"
            >
              {submitting || loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Entrar
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Não tem cadastro? Faça um pedido pelo{" "}
            <a href="/c/catalogo" className="font-medium text-primary underline-offset-2 hover:underline">
              catálogo
            </a>{" "}
            ou peça acesso ao administrador.
          </p>
          <NexoSignature variant="inline" />
        </CardContent>
      </Card>
    </div>
  );
}
