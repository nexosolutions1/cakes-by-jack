import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { AppLayout } from "@/components/app-layout";
import { useAuth, normalizePhone } from "@/lib/auth";
import {
  listUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  type Usuario,
} from "@/lib/sheets.functions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
} from "@/components/ui/dialog";
import { Loader2, Plus, Pencil, Trash2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/nexo")({
  head: () => ({ meta: [{ title: "Admin Nexo — Usuários" }] }),
  component: AdminNexoPage,
});

type Form = {
  id?: string;
  nome: string;
  whatsapp: string;
  perfil: "ADMIN" | "OWNER" | "CLIENTE";
  status: string;
  observacoes: string;
};

const EMPTY: Form = {
  nome: "",
  whatsapp: "",
  perfil: "CLIENTE",
  status: "Ativo",
  observacoes: "",
};

function AdminNexoPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) navigate({ to: "/login" });
    else if (user.perfil !== "ADMIN") navigate({ to: "/" });
  }, [user, loading, navigate]);

  const qc = useQueryClient();
  const { data: usuarios = [], isLoading } = useQuery({
    queryKey: ["usuarios"],
    queryFn: () => listUsuarios(),
  });

  const create = useServerFn(createUsuario);
  const update = useServerFn(updateUsuario);
  const remove = useServerFn(deleteUsuario);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Form>(EMPTY);

  const saveMut = useMutation({
    mutationFn: async () => {
      if (form.id) {
        await update({ data: { ...form, id: form.id } });
      } else {
        await create({ data: form });
      }
    },
    onSuccess: () => {
      toast.success(form.id ? "Usuário atualizado" : "Usuário criado");
      qc.invalidateQueries({ queryKey: ["usuarios"] });
      setOpen(false);
      setForm(EMPTY);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const delMut = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => {
      toast.success("Usuário removido");
      qc.invalidateQueries({ queryKey: ["usuarios"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (loading || !user || user.perfil !== "ADMIN") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  function openNew() {
    setForm(EMPTY);
    setOpen(true);
  }
  function openEdit(u: Usuario) {
    setForm({
      id: u.id,
      nome: u.nome,
      whatsapp: u.whatsapp,
      perfil: (u.perfil as Form["perfil"]) ?? "CLIENTE",
      status: u.status || "Ativo",
      observacoes: u.observacoes || "",
    });
    setOpen(true);
  }

  const ativos = usuarios.filter((u) => u.status !== "Removido");

  return (
    <AppLayout
      title="Admin Nexo"
      subtitle="Controle total de usuários, perfis e acessos"
      actions={
        <Button onClick={openNew} className="bg-gradient-primary">
          <Plus className="h-4 w-4" /> Novo usuário
        </Button>
      }
    >
      <div className="space-y-4">
        <Card className="border-2 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Usuários do sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            ) : ativos.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Nenhum usuário cadastrado.
              </p>
            ) : (
              <>
                {/* Mobile: cards */}
                <div className="space-y-3 md:hidden">
                  {ativos.map((u) => (
                    <div
                      key={u.id}
                      className="rounded-xl border border-border bg-card p-4 shadow-soft"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-medium leading-tight">{u.nome}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{u.whatsapp}</p>
                        </div>
                        <Badge
                          variant={
                            u.perfil === "ADMIN"
                              ? "default"
                              : u.perfil === "OWNER"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-[10px]"
                        >
                          {u.perfil}
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <Badge
                          variant={u.status === "Ativo" ? "outline" : "destructive"}
                          className="text-[10px]"
                        >
                          {u.status}
                        </Badge>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" onClick={() => openEdit(u)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              if (u.id === user.id) {
                                toast.error("Você não pode remover a si mesmo.");
                                return;
                              }
                              if (confirm(`Remover ${u.nome}?`)) delMut.mutate(u.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop: tabela */}
                <div className="hidden md:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>WhatsApp</TableHead>
                        <TableHead>Perfil</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ativos.map((u) => (
                        <TableRow key={u.id}>
                          <TableCell className="font-medium">{u.nome}</TableCell>
                          <TableCell>{u.whatsapp}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                u.perfil === "ADMIN"
                                  ? "default"
                                  : u.perfil === "OWNER"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {u.perfil}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={u.status === "Ativo" ? "outline" : "destructive"}>
                              {u.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right space-x-1">
                            <Button size="sm" variant="ghost" onClick={() => openEdit(u)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                if (u.id === user.id) {
                                  toast.error("Você não pode remover a si mesmo.");
                                  return;
                                }
                                if (confirm(`Remover ${u.nome}?`)) delMut.mutate(u.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] w-[calc(100vw-1rem)] max-w-md overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display">
              {form.id ? "Editar usuário" : "Novo usuário"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-3">
            <div className="grid gap-1.5">
              <Label>Nome</Label>
              <Input
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
              />
            </div>
            <div className="grid gap-1.5">
              <Label>WhatsApp (somente números, com DDD/DDI)</Label>
              <Input
                value={form.whatsapp}
                onChange={(e) =>
                  setForm({ ...form, whatsapp: normalizePhone(e.target.value) })
                }
                placeholder="5511999999999"
              />
            </div>
            <div className="grid gap-1.5 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>Perfil</Label>
                <Select
                  value={form.perfil}
                  onValueChange={(v) =>
                    setForm({ ...form, perfil: v as Form["perfil"] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">ADMIN (controle total)</SelectItem>
                    <SelectItem value="OWNER">OWNER (Jack)</SelectItem>
                    <SelectItem value="CLIENTE">CLIENTE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label>Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) => setForm({ ...form, status: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Bloqueado">Bloqueado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label>Observações</Label>
              <Input
                value={form.observacoes}
                onChange={(e) => setForm({ ...form, observacoes: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                if (!form.nome || form.whatsapp.length < 8) {
                  toast.error("Preencha nome e WhatsApp válidos.");
                  return;
                }
                saveMut.mutate();
              }}
              disabled={saveMut.isPending}
              className="bg-gradient-primary"
            >
              {saveMut.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
