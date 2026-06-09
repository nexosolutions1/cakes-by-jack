import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { updatePedidoPagamento, type Pedido } from "@/lib/sheets.functions";
import { formatBRL, parseMoney } from "@/lib/format";
import { toast } from "sonner";

const SITUACOES = ["Não pago", "Entrada recebida", "Pago integral"] as const;
type Situacao = (typeof SITUACOES)[number];
const FORMAS = ["Pix", "Débito", "Crédito", "Dinheiro"];

export function EditPagamentoDialog({
  pedido,
  onDone,
}: {
  pedido: Pedido;
  onDone: () => void;
}) {
  const update = useServerFn(updatePedidoPagamento);
  const qc = useQueryClient();
  const total = parseMoney(pedido.valorTotal);

  const initialSit: Situacao =
    pedido.situacaoPagamento === "Pago integral" ||
    pedido.situacaoPagamento === "Entrada recebida"
      ? (pedido.situacaoPagamento as Situacao)
      : "Não pago";

  const [situacao, setSituacao] = useState<Situacao>(initialSit);
  const [entrada, setEntrada] = useState<number>(parseMoney(pedido.entrada));
  const [forma, setForma] = useState<string>(pedido.formaPagamento || "Pix");

  // Aplica regras
  const entradaCalc =
    situacao === "Não pago" ? 0 : situacao === "Pago integral" ? total : entrada;
  const saldo = Math.max(0, total - entradaCalc);

  const mut = useMutation({
    mutationFn: () =>
      update({
        data: {
          id: pedido.id,
          entrada: entradaCalc,
          situacaoPagamento: situacao,
          formaPagamento: forma,
        },
      }),
    onSuccess: () => {
      toast.success("Pagamento atualizado");
      qc.invalidateQueries();
      onDone();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <DialogContent className="max-h-[92vh] max-w-md overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="font-display text-2xl">
          Pagamento — {pedido.numero}
        </DialogTitle>
      </DialogHeader>
      <div className="grid gap-3">
        <div className="rounded-xl border border-border bg-muted/30 p-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Cliente</span>
            <strong>{pedido.clienteNome}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total do pedido</span>
            <strong>{formatBRL(total)}</strong>
          </div>
        </div>

        <div className="grid gap-1.5">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">
            Situação financeira
          </Label>
          <Select value={situacao} onValueChange={(v) => setSituacao(v as Situacao)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SITUACOES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1.5">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">
            Valor da entrada (R$)
          </Label>
          <Input
            type="number"
            step="0.01"
            min={0}
            value={entradaCalc}
            disabled={situacao !== "Entrada recebida"}
            onChange={(e) => setEntrada(Math.max(0, +e.target.value || 0))}
          />
          {situacao === "Entrada recebida" && (
            <p className="text-[11px] text-muted-foreground">
              Sugestão: 50% = <strong>{formatBRL(total * 0.5)}</strong>
            </p>
          )}
        </div>

        <div className="grid gap-1.5">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">
            Forma de pagamento
          </Label>
          <Select value={forma} onValueChange={setForma}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FORMAS.map((f) => (
                <SelectItem key={f} value={f}>
                  {f}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-xl border border-gold/40 bg-rose-soft/40 p-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Valor pago</span>
            <strong>{formatBRL(entradaCalc)}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Saldo restante</span>
            <strong>{formatBRL(saldo)}</strong>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button
          disabled={mut.isPending}
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
