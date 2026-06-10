import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery, b as useQueryClient, a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { A as AppLayout } from "./app-layout-CldwD0on.mjs";
import { B as Button, I as Input } from "./brand-logo-3iPsG8o9.mjs";
import { C as Card, c as CardContent } from "./card-Bbtrid8Y.mjs";
import { L as Label } from "./label-tl_MnXN1.mjs";
import { T as Textarea } from "./textarea-CYCFuD-O.mjs";
import { B as Badge } from "./badge-PNZ8Owsm.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CmacHktB.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogFooter } from "./dialog-DsEyClLt.mjs";
import { l as listPedidos, u as updatePedidoStatus, a as listClientes, b as listProdutos, d as createPedido } from "./router-8vuZ9gUy.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { p as parseDateSafe, f as formatDateBR, a as formatBRL } from "./format-DkCAcujl.mjs";
import { E as EditPagamentoDialog } from "./edit-pagamento-dialog-CLWdseFP.mjs";
import "../_libs/seroval.mjs";
import { c as Plus, L as LoaderCircle, W as Wallet } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/radix-ui__react-separator.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "./nexo-signature-6kPfTCBv.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "./server-DS2HpPV2.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "./sheets.server-e71hR5JP.mjs";
import "../_libs/zod.mjs";
const STATUSES = ["Aguardando confirmação", "Orçamento", "Confirmado", "Produção", "Finalizado", "Entregue", "Recusado", "Cancelado"];
const PAGAMENTOS = ["Não pago", "Entrada recebida", "Pago integral"];
const FORMAS = ["Pix", "Débito", "Crédito", "Dinheiro"];
function PedidosPage() {
  const {
    data: pedidos = []
  } = useQuery({
    queryKey: ["pedidos"],
    queryFn: () => listPedidos()
  });
  const [open, setOpen] = reactExports.useState(false);
  const [filter, setFilter] = reactExports.useState("Todos");
  const filtered = reactExports.useMemo(() => {
    const list = filter === "Todos" ? pedidos : pedidos.filter((p) => p.status === filter);
    return [...list].sort((a, b) => +(parseDateSafe(b.dataPedido) ?? 0) - +(parseDateSafe(a.dataPedido) ?? 0));
  }, [pedidos, filter]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { title: "Pedidos", subtitle: `${pedidos.length} no total`, actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-gradient-primary shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
      "Novo pedido"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NovoPedidoDialog, { onDone: () => setOpen(false) })
  ] }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex flex-wrap gap-2", children: ["Todos", ...STATUSES].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setFilter(s), className: `rounded-full border px-4 py-1.5 text-sm transition ${filter === s ? "border-primary bg-gradient-primary text-primary-foreground shadow-soft" : "border-border bg-card hover:border-primary/40"}`, children: s }, s)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-dashed", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-12 text-center text-muted-foreground", children: "Nenhum pedido nesse filtro" }) }),
      filtered.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(PedidoCard, { pedido: p }, p.id))
    ] })
  ] });
}
function PedidoCard({
  pedido
}) {
  const update = useServerFn(updatePedidoStatus);
  const qc = useQueryClient();
  const [payOpen, setPayOpen] = reactExports.useState(false);
  const mut = useMutation({
    mutationFn: (status) => update({
      data: {
        id: pedido.id,
        status
      }
    }),
    onSuccess: (_d, status) => {
      toast.success(status === "Confirmado" ? "Pedido confirmado — agora aparece no calendário e painel financeiro" : status === "Recusado" ? "Pedido recusado" : "Status atualizado");
      qc.invalidateQueries();
    },
    onError: (e) => toast.error(e.message)
  });
  const isPending = pedido.status === "Aguardando confirmação";
  const sitColor = pedido.situacaoPagamento === "Pago integral" ? "bg-success/15 text-success" : pedido.situacaoPagamento === "Entrada recebida" ? "bg-warning/20 text-warning" : "bg-destructive/15 text-destructive";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: `shadow-card ${isPending ? "border-2 border-primary/50 bg-primary/5" : "border-border/60"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-semibold", children: pedido.clienteNome }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-gold/40 text-gold-foreground", children: pedido.numero }),
        isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary text-primary-foreground", children: "Aguardando confirmação" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: sitColor, children: pedido.situacaoPagamento || "Não pago" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: pedido.produto }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-x-3 gap-y-1 pt-1 text-xs text-muted-foreground sm:flex sm:flex-wrap sm:gap-x-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Entrega:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: formatDateBR(pedido.dataEntrega) }),
          " ",
          pedido.horaEntrega
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Total: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: formatBRL(pedido.valorTotal) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Entrada: ",
          formatBRL(pedido.entrada)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Saldo: ",
          formatBRL(pedido.saldo || pedido.valorTotal)
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full flex-wrap items-center gap-2 lg:w-auto", children: [
      isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: () => mut.mutate("Confirmado"), disabled: mut.isPending, className: "bg-success text-success-foreground hover:bg-success/90", children: [
          mut.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          "Confirmar"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => mut.mutate("Recusado"), disabled: mut.isPending, className: "border-destructive/40 text-destructive hover:bg-destructive/10", children: "Recusar" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => setPayOpen(true), className: "border-gold/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-3.5 w-3.5" }),
        " Pagamento"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: pedido.status, onValueChange: (v) => mut.mutate(v), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full bg-card sm:w-44", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: payOpen, onOpenChange: setPayOpen, children: payOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(EditPagamentoDialog, { pedido, onDone: () => setPayOpen(false) }) })
  ] }) });
}
function NovoPedidoDialog({
  onDone
}) {
  const {
    data: clientes = []
  } = useQuery({
    queryKey: ["clientes"],
    queryFn: () => listClientes()
  });
  const {
    data: produtos = []
  } = useQuery({
    queryKey: ["produtos"],
    queryFn: () => listProdutos()
  });
  const create = useServerFn(createPedido);
  const qc = useQueryClient();
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const [form, setForm] = reactExports.useState({
    clienteId: "",
    produtoId: "",
    quantidade: 0,
    peso: 0,
    valorTotal: 0,
    entrada: 0,
    formaPagamento: "Pix",
    situacaoPagamento: "Não pago",
    dataPedido: today,
    dataEntrega: today,
    horaEntrega: "",
    status: "Confirmado",
    observacoes: ""
  });
  const cliente = clientes.find((c) => c.id === form.clienteId);
  const produto = produtos.find((p) => p.id === form.produtoId);
  const mut = useMutation({
    mutationFn: () => create({
      data: {
        clienteId: form.clienteId,
        clienteNome: cliente?.nome ?? "",
        produto: produto ? `${produto.categoria} • ${produto.tipo} • ${produto.nome}` : "",
        quantidade: Number(form.quantidade),
        peso: Number(form.peso),
        valorTotal: Number(form.valorTotal),
        entrada: Number(form.entrada),
        formaPagamento: form.formaPagamento,
        situacaoPagamento: form.situacaoPagamento,
        dataPedido: form.dataPedido,
        dataEntrega: form.dataEntrega,
        horaEntrega: form.horaEntrega,
        status: form.status,
        observacoes: form.observacoes
      }
    }),
    onSuccess: () => {
      toast.success("Pedido criado");
      qc.invalidateQueries({
        queryKey: ["pedidos"]
      });
      onDone();
    },
    onError: (e) => toast.error(e.message)
  });
  const saldo = Number(form.valorTotal) - Number(form.entrada);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90vh] w-[calc(100vw-1rem)] max-w-2xl overflow-y-auto p-4 sm:p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-2xl", children: "Novo pedido" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Cliente *", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.clienteId, onValueChange: (v) => setForm({
          ...form,
          clienteId: v
        }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Selecione" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: clientes.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, children: c.nome }, c.id)) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Produto *", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.produtoId, onValueChange: (v) => {
          const p = produtos.find((x) => x.id === v);
          setForm({
            ...form,
            produtoId: v,
            valorTotal: p ? Number(String(p.preco).replace(",", ".")) : 0
          });
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Selecione" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "max-h-72", children: produtos.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: p.id, children: [
            p.categoria,
            " • ",
            p.tipo,
            " • ",
            p.nome
          ] }, p.id)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Quantidade", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.quantidade, onChange: (e) => setForm({
          ...form,
          quantidade: +e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Peso (kg)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.1", value: form.peso, onChange: (e) => setForm({
          ...form,
          peso: +e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Valor total (R$) *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.01", value: form.valorTotal, onChange: (e) => setForm({
          ...form,
          valorTotal: +e.target.value
        }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Entrada (R$)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.01", value: form.entrada, onChange: (e) => setForm({
          ...form,
          entrada: +e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Saldo", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: formatBRL(saldo), disabled: true, className: "bg-muted" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Forma de pagamento", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.formaPagamento, onValueChange: (v) => setForm({
          ...form,
          formaPagamento: v
        }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: FORMAS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: f, children: f }, f)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Situação financeira", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.situacaoPagamento, onValueChange: (v) => setForm({
        ...form,
        situacaoPagamento: v
      }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: PAGAMENTOS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Data do pedido", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: form.dataPedido, onChange: (e) => setForm({
          ...form,
          dataPedido: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Data de entrega", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: form.dataEntrega, onChange: (e) => setForm({
          ...form,
          dataEntrega: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Hora", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "time", value: form.horaEntrega, onChange: (e) => setForm({
          ...form,
          horaEntrega: e.target.value
        }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Observações", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 2, value: form.observacoes, onChange: (e) => setForm({
        ...form,
        observacoes: e.target.value
      }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { disabled: !form.clienteId || !form.produtoId || !form.valorTotal || mut.isPending, onClick: () => mut.mutate(), className: "bg-gradient-primary", children: [
      mut.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
      "Criar pedido"
    ] }) })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs uppercase tracking-wider text-muted-foreground", children: label }),
    children
  ] });
}
export {
  PedidosPage as component
};
