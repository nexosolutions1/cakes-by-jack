import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as useQueryClient, a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { I as Input, B as Button } from "./brand-logo-3iPsG8o9.mjs";
import { L as Label } from "./label-tl_MnXN1.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CmacHktB.mjs";
import { b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogFooter } from "./dialog-DsEyClLt.mjs";
import { i as updatePedidoPagamento } from "./router-CTVFEuqq.mjs";
import { b as parseMoney, a as formatBRL } from "./format-DkCAcujl.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { L as LoaderCircle } from "../_libs/lucide-react.mjs";
const SITUACOES = ["Não pago", "Entrada recebida", "Pago integral"];
const FORMAS = ["Pix", "Débito", "Crédito", "Dinheiro"];
function EditPagamentoDialog({
  pedido,
  onDone
}) {
  const update = useServerFn(updatePedidoPagamento);
  const qc = useQueryClient();
  const total = parseMoney(pedido.valorTotal);
  const initialSit = pedido.situacaoPagamento === "Pago integral" || pedido.situacaoPagamento === "Entrada recebida" ? pedido.situacaoPagamento : "Não pago";
  const [situacao, setSituacao] = reactExports.useState(initialSit);
  const [entrada, setEntrada] = reactExports.useState(parseMoney(pedido.entrada));
  const [forma, setForma] = reactExports.useState(pedido.formaPagamento || "Pix");
  const entradaCalc = situacao === "Não pago" ? 0 : situacao === "Pago integral" ? total : entrada;
  const saldo = Math.max(0, total - entradaCalc);
  const mut = useMutation({
    mutationFn: () => update({
      data: {
        id: pedido.id,
        entrada: entradaCalc,
        situacaoPagamento: situacao,
        formaPagamento: forma
      }
    }),
    onSuccess: () => {
      toast.success("Pagamento atualizado");
      qc.invalidateQueries();
      onDone();
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[92vh] max-w-md overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-2xl", children: [
      "Pagamento — ",
      pedido.numero
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/30 p-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Cliente" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: pedido.clienteNome })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Total do pedido" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formatBRL(total) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Situação financeira" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: situacao, onValueChange: (v) => setSituacao(v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SITUACOES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Valor da entrada (R$)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            step: "0.01",
            min: 0,
            value: entradaCalc,
            disabled: situacao !== "Entrada recebida",
            onChange: (e) => setEntrada(Math.max(0, +e.target.value || 0))
          }
        ),
        situacao === "Entrada recebida" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
          "Sugestão: 50% = ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formatBRL(total * 0.5) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Forma de pagamento" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: forma, onValueChange: setForma, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: FORMAS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: f, children: f }, f)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-gold/40 bg-rose-soft/40 p-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Valor pago" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formatBRL(entradaCalc) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Saldo restante" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formatBRL(saldo) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        disabled: mut.isPending,
        onClick: () => mut.mutate(),
        className: "bg-gradient-primary",
        children: [
          mut.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          "Salvar"
        ]
      }
    ) })
  ] });
}
export {
  EditPagamentoDialog as E
};
