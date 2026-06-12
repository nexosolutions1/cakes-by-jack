import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, u as useQuery, q as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-DoEYPU5W.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { R as Root } from "../_libs/radix-ui__react-label.mjs";
import { O as Overlay, P as Portal, C as Content, a as Close, T as Title, D as Description, R as Root$1, b as Trigger } from "../_libs/radix-ui__react-dialog.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { r as readTable } from "./sheets.server-OHrRPQqp.mjs";
import { X } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, n as numberType, e as enumType } from "../_libs/zod.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
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
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
const appCss = "/assets/styles-CIxE4fpx.css";
const favicon = "/assets/favicon-_f5vaHWQ.jpeg";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const checkSetup = createServerFn({
  method: "GET"
}).handler(createSsrRpc("663c6b8df3f2452ef44143a8c7e68c6a255c6e8cdeb2159dd4e2a290e6dda770"));
createServerFn({
  method: "POST"
}).handler(createSsrRpc("30f335ac158e11d5ced31c6ac9fad02ca9456cdc278156df26a6ce4bdd7be5e5"));
const listClientes = createServerFn({
  method: "GET"
}).handler(createSsrRpc("76923029291ef37c7c4735fb308ac9f1cc7d3dacf696f29dc5677df508c05078"));
const createCliente = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  nome: stringType().min(1),
  telefone: stringType().default(""),
  whatsapp: stringType().default(""),
  endereco: stringType().default(""),
  cidade: stringType().default(""),
  bairro: stringType().default(""),
  observacoes: stringType().default("")
})).handler(createSsrRpc("edc205e6b3b56ae8c658246baa56ad0c9ec364524148126449582cdc97a0071a"));
const listProdutos = createServerFn({
  method: "GET"
}).handler(createSsrRpc("79e05e594fc4eaddafbc32c27467784ee46b2cc4d44cdc3b0a1183e891f5be3d"));
const produtoInput = objectType({
  categoria: stringType().min(1),
  tipo: stringType().default(""),
  nome: stringType().min(1),
  unidade: stringType().default("unidade"),
  preco: numberType(),
  descricao: stringType().default(""),
  imagem: stringType().default(""),
  observacoes: stringType().default("")
});
const createProduto = createServerFn({
  method: "POST"
}).inputValidator(produtoInput).handler(createSsrRpc("66da5a9083ee0ccae00a50b0252005b2760192a1528ea3c1415b3ef03a6f2854"));
const updateProduto = createServerFn({
  method: "POST"
}).inputValidator(produtoInput.extend({
  id: stringType().min(1)
})).handler(createSsrRpc("b2fd925b6e069543ffa0d03cdc0b6f2b21c3809fa27871930f2fca2ae4c250c4"));
const deleteProduto = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().min(1)
})).handler(createSsrRpc("17ebbafaaa679a189568fd20d67f1940b1e32ede2029204290093c3eda1e892d"));
const listPedidos = createServerFn({
  method: "GET"
}).handler(createSsrRpc("214dca84ef8840793c433690db86b81940040986ff4020423705b650da2328e3"));
const createPedido = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  clienteId: stringType(),
  clienteNome: stringType(),
  whatsapp: stringType().default(""),
  produto: stringType(),
  quantidade: numberType().default(0),
  peso: numberType().default(0),
  valorTotal: numberType(),
  entrada: numberType().default(0),
  formaPagamento: stringType().default("Pix"),
  situacaoPagamento: stringType().default("Não pago"),
  dataPedido: stringType(),
  dataEntrega: stringType(),
  horaEntrega: stringType().default(""),
  status: stringType().default("Orçamento"),
  observacoes: stringType().default("")
})).handler(createSsrRpc("1827d6ee5a2316d4b5c8376d740d5fffe2d07a573d87d7a9bf336a5727da3a28"));
const updatePedidoStatus = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType(),
  status: stringType()
})).handler(createSsrRpc("49ea7a124a3752bb56337e063cc0a065ac064e6dcdd109ec559161ac42947242"));
const updatePedidoPagamento = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType(),
  entrada: numberType().default(0),
  situacaoPagamento: enumType(["Não pago", "Entrada recebida", "Pago integral"]),
  formaPagamento: stringType().default("Pix")
})).handler(createSsrRpc("a0d29e2340371b4f56c86c45bf67e96be0aa556b02a9fa89834fd5a0e3e21d2f"));
const listInsumos = createServerFn({
  method: "GET"
}).handler(createSsrRpc("a426cbc758e0edfda05b763c48156f4a7314ad4f4ba640d12f5b01e02c481132"));
const createInsumo = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  nome: stringType().min(1),
  categoria: stringType().optional(),
  unidadeCompra: stringType().optional(),
  quantidadeCompra: numberType().optional(),
  valorPago: numberType().optional(),
  unidadeUso: stringType().optional(),
  valorUnitario: numberType().optional(),
  estoqueAtual: numberType().optional(),
  estoqueMinimo: numberType().optional(),
  fornecedor: stringType().optional(),
  observacoes: stringType().optional()
})).handler(createSsrRpc("d12402f2c6a1cd4ca968e95a2c80f69f5b865cc361e164cb5c7a83eb2eb340c1"));
const updateInsumo = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().min(1),
  nome: stringType().min(1),
  unidade: stringType().default("un"),
  valorUnitario: numberType().default(0),
  estoqueAtual: numberType().default(0),
  estoqueMinimo: numberType().default(0),
  observacoes: stringType().default("")
})).handler(createSsrRpc("1773700b52ab8454afd144e5bbc829b8ad939fa043910232ecfe7523d5ae6b3b"));
const updateInsumoEstoque = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType(),
  estoqueAtual: numberType()
})).handler(createSsrRpc("279013415d8879536663bc71bf748c2c0049951730b66306c6e37bb4c6410fab"));
const deleteInsumo = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().min(1)
})).handler(createSsrRpc("d1be2aafeeaa8a79de7a31bfad1ae4a45a0e90930e22072051f3b3a2748a9e54"));
const deleteFicha = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().min(1)
})).handler(createSsrRpc("82980e4041cc9f757b373b14710e9c4fe87db2bf29b4a2a9836d43393791f7f5"));
const listFichas = createServerFn({
  method: "GET"
}).handler(createSsrRpc("a91e44fdae2e28f9adad8d93a522aab354ab117801ad67604577ec2e113ecce2"));
const updateFicha = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().min(1),
  produtoId: stringType().min(1),
  produtoNome: stringType().min(1).default(""),
  ingredientes: stringType().default(""),
  custoTotal: numberType().default(0),
  precoVenda: numberType().default(0),
  observacoes: stringType().default("")
})).handler(createSsrRpc("c22f6c39405e33ff05cedd25a0e454a737e38c76e9fe4d3066218b68f9a93d8f"));
const upsertFicha = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  produtoId: stringType().min(1),
  produtoNome: stringType().min(1).default(""),
  ingredientes: stringType().default(""),
  custoTotal: numberType().default(0),
  precoVenda: numberType().default(0),
  observacoes: stringType().default("")
})).handler(createSsrRpc("cd5bc80bb9779c63b05c13cd0fa78c591f2f020001ac59f2ddf46df0ce53f542"));
const listCustosAdicionais = createServerFn({
  method: "GET"
}).handler(createSsrRpc("ee83c3007db522ec49cc5fc8a2389a5ceb65d20da6f75cbc654db47d8c89c37b"));
createServerFn({
  method: "GET"
}).handler(createSsrRpc("f91c62f5276b7bcf04d1696112413e74991ca62f78b3d767587c8a629b15c0be"));
const testWrite = createServerFn({
  method: "POST"
}).handler(createSsrRpc("d84674c9ee9ea7f8e7940d9cc8ccb6c4bd3b5595a7992e6ac6ff3f8f88f3e654"));
const listProdutosPublico = createServerFn({
  method: "GET"
}).handler(createSsrRpc("e3ac09efebc3d5a257d46c97e9f008a728541f9f825ded86517a90c2dec4265b"));
const pedidoPublicoInput = objectType({
  produtoId: stringType().min(1).max(120),
  produtoNome: stringType().min(1).max(255),
  preco: numberType().min(0).max(1e6).default(0),
  quantidade: numberType().min(1).max(999).default(1),
  clienteNome: stringType().min(2).max(120),
  whatsapp: stringType().min(8).max(40),
  dataDesejada: stringType().max(40).default(""),
  horaDesejada: stringType().max(10).default(""),
  rua: stringType().max(120).default(""),
  numero: stringType().max(20).default(""),
  bairro: stringType().max(80).default(""),
  cidade: stringType().max(80).default(""),
  observacoes: stringType().max(800).default("")
});
const createPedidoPublico = createServerFn({
  method: "POST"
}).inputValidator(pedidoPublicoInput).handler(createSsrRpc("8f39f317fbdd81930f60116d968149dd1a4d84569b81662e011620a752d29d72"));
const getConfig = createServerFn({
  method: "GET"
}).handler(createSsrRpc("c63d94b1ce53588134a59235954df1b731a7f61921ffecaf7bdcee5284737d49"));
const updateConfig = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  nome: stringType().max(120).default(""),
  whatsapp: stringType().max(40).default(""),
  instagram: stringType().max(120).default(""),
  endereco: stringType().max(255).default(""),
  chavePix: stringType().max(255).default(""),
  tipoPix: stringType().max(40).default(""),
  nomeRecebedor: stringType().max(120).default(""),
  banco: stringType().max(120).default("")
})).handler(createSsrRpc("fc90d3a63e9c994be1e2879d8c2acb401f0d097054609e936fde4726c5894df6"));
const listUsuarios = createServerFn({
  method: "GET"
}).handler(createSsrRpc("587e35c06077c25c5093243f337ebb6ffad1be7785c2cd09f8d49a169cea4a3c"));
const usuarioInput = objectType({
  nome: stringType().min(1).max(120),
  whatsapp: stringType().min(8).max(40),
  perfil: enumType(["ADMIN", "OWNER", "CLIENTE"]).default("CLIENTE"),
  status: stringType().max(40).default("Ativo"),
  observacoes: stringType().max(500).default("")
});
const createUsuario = createServerFn({
  method: "POST"
}).inputValidator(usuarioInput).handler(createSsrRpc("7f12810f7dcc5f91dc523d17c2438b1ce8764e57a89c4125f15a7591f3e86404"));
const updateUsuario = createServerFn({
  method: "POST"
}).inputValidator(usuarioInput.extend({
  id: stringType().min(1)
})).handler(createSsrRpc("de300c9fad2579904e8a1cee65cf1eb0163b37cc76ca31c434760f2761d91a43"));
const deleteUsuario = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().min(1)
})).handler(createSsrRpc("2e3e59eeadd7bcf6a66d9677593158f64348428cf5a0bd3a5831ff8f3462de7c"));
const SESSION_KEY = "cbj.session.whatsapp";
function normalizePhone$1(v) {
  return (v ?? "").replace(/\D+/g, "");
}
const AuthContext = reactExports.createContext(null);
function AuthProvider({ children }) {
  const [whatsapp, setWhatsapp] = reactExports.useState("");
  reactExports.useEffect(() => {
    try {
      const w = localStorage.getItem(SESSION_KEY) ?? "";
      setWhatsapp(normalizePhone$1(w));
    } catch {
    }
  }, []);
  const { data: usuarios = [], isLoading, refetch } = useQuery({
    queryKey: ["usuarios"],
    queryFn: () => listUsuarios(),
    staleTime: 3e4
  });
  const user = reactExports.useMemo(() => {
    if (!whatsapp) return null;
    return usuarios.find(
      (u) => normalizePhone$1(u.whatsapp) === whatsapp && u.status !== "Bloqueado"
    ) ?? null;
  }, [usuarios, whatsapp]);
  const value = {
    user,
    loading: isLoading,
    login: (w) => {
      const norm = normalizePhone$1(w);
      const found = usuarios.find(
        (u) => normalizePhone$1(u.whatsapp) === norm && u.status !== "Bloqueado"
      );
      if (found) {
        try {
          localStorage.setItem(SESSION_KEY, norm);
        } catch {
        }
        setWhatsapp(norm);
        return found;
      }
      return null;
    },
    logout: () => {
      try {
        localStorage.removeItem(SESSION_KEY);
      } catch {
      }
      setWhatsapp("");
    },
    hasRole: (...roles) => !!user && roles.includes(user.perfil ?? "CLIENTE"),
    refresh: () => {
      refetch();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthContext.Provider, { value, children });
}
function useAuth() {
  const ctx = reactExports.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  return ctx;
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$h = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Cakes by Jack — Confeitaria Artesanal" },
      {
        name: "description",
        content: "Sistema de gestão da confeitaria artesanal Cakes by Jack: clientes, pedidos, produção e calendário."
      },
      { property: "og:title", content: "Cakes by Jack — Confeitaria Artesanal" },
      {
        property: "og:description",
        content: "Gestão completa da sua confeitaria, com elegância."
      },
      { property: "og:type", content: "website" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/jpeg", href: "/src/assets/cakesbyjack logo.jpeg" },
      { rel: "apple-touch-icon", href: favicon },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "pt-BR", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$h.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right" })
  ] }) });
}
const $$splitComponentImporter$e = () => import("./setup-DPVjEft6.mjs");
const Route$g = createFileRoute("/setup")({
  head: () => ({
    meta: [{
      title: "Configuração — Cakes by Jack"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./relatorios-YFbsZ4E4.mjs");
const Route$f = createFileRoute("/relatorios")({
  head: () => ({
    meta: [{
      title: "Relatórios — Cakes by Jack"
    }, {
      name: "description",
      content: "Relatórios e exportações da confeitaria."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./produtos-CTcXxZ64.mjs");
const Route$e = createFileRoute("/produtos")({
  head: () => ({
    meta: [{
      title: "Produtos — Cakes by Jack"
    }, {
      name: "description",
      content: "Catálogo de docinhos e bolos."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./pedidos-bOyvrzCf.mjs");
const Route$d = createFileRoute("/pedidos")({
  head: () => ({
    meta: [{
      title: "Pedidos — Cakes by Jack"
    }, {
      name: "description",
      content: "Gestão de pedidos da confeitaria."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./login-DyeJdcSi.mjs");
const Route$c = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Entrar — Cakes by Jack"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./insumos-Dya05yaJ.mjs");
const Route$b = createFileRoute("/insumos")({
  head: () => ({
    meta: [{
      title: "Estoque & Insumos — Cakes by Jack"
    }, {
      name: "description",
      content: "Controle de estoque e insumos."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./financeiro-YmNh-I6q.mjs");
const Route$a = createFileRoute("/financeiro")({
  head: () => ({
    meta: [{
      title: "Financeiro — Cakes by Jack"
    }, {
      name: "description",
      content: "Controle financeiro de pedidos e pagamentos."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./ficha-tecnica-Unod9A4m.mjs");
const Route$9 = createFileRoute("/ficha-tecnica")({
  head: () => ({
    meta: [{
      title: "Ficha Técnica — Cakes by Jack"
    }, {
      name: "description",
      content: "Receitas, custos e margens dos produtos."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./configuracoes-BD50F8Z0.mjs");
const Route$8 = createFileRoute("/configuracoes")({
  head: () => ({
    meta: [{
      title: "Configurações — Cakes by Jack"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./clientes-BKNyG46V.mjs");
const Route$7 = createFileRoute("/clientes")({
  head: () => ({
    meta: [{
      title: "Clientes — Cakes by Jack"
    }, {
      name: "description",
      content: "Cadastro e histórico de clientes."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./catalogo-Dc8Ewnzx.mjs");
const Route$6 = createFileRoute("/catalogo")({
  head: () => ({
    meta: [{
      title: "Catálogo — Cakes by Jack"
    }, {
      name: "description",
      content: "Vitrine de produtos da confeitaria."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./calendario-B6zXPK0O.mjs");
const Route$5 = createFileRoute("/calendario")({
  head: () => ({
    meta: [{
      title: "Calendário — Cakes by Jack"
    }, {
      name: "description",
      content: "Agenda de produção e entregas."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const setupQO = queryOptions({
  queryKey: ["setup"],
  queryFn: () => checkSetup()
});
const $$splitErrorComponentImporter = () => import("./index-DeLMqtib.mjs");
const $$splitComponentImporter$2 = () => import("./index-B7FAgapR.mjs");
const Route$4 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Painel Financeiro — Cakes by Jack"
    }, {
      name: "description",
      content: "Visão geral de pedidos, faturamento e produção."
    }]
  }),
  loader: ({
    context
  }) => context.queryClient.ensureQueryData(setupQO),
  component: lazyRouteComponent($$splitComponentImporter$2, "component"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = Root.displayName;
const Textarea = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const Dialog = Root$1;
const DialogTrigger = Trigger;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
const $$splitComponentImporter$1 = () => import("./c.catalogo-1kuu5PNn.mjs");
const Route$3 = createFileRoute("/c/catalogo")({
  head: () => ({
    meta: [{
      title: "Cakes by Jack — Catálogo"
    }, {
      name: "description",
      content: "Bolos e doces artesanais. Faça seu pedido."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin.nexo-SWEgCI7o.mjs");
const Route$2 = createFileRoute("/admin/nexo")({
  head: () => ({
    meta: [{
      title: "Admin Nexo — Usuários"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
function createSupabaseAdminClient() {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    const missing = [
      ...!SUPABASE_URL ? ["SUPABASE_URL"] : [],
      ...!SUPABASE_SERVICE_ROLE_KEY ? ["SUPABASE_SERVICE_ROLE_KEY"] : []
    ];
    const message = `Missing Supabase environment variable(s): ${missing.join(", ")}. Connect Supabase in Lovable Cloud.`;
    console.error(`[Supabase] ${message}`);
    throw new Error(message);
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      storage: void 0,
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
let _supabaseAdmin;
const supabaseAdmin = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabaseAdmin) _supabaseAdmin = createSupabaseAdminClient();
    return Reflect.get(_supabaseAdmin, prop, receiver);
  }
});
const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = /* @__PURE__ */ new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif"
]);
function normalizePhone(v) {
  return (v ?? "").replace(/\D+/g, "");
}
async function requireAdminOrOwner(request) {
  const token = normalizePhone(request.headers.get("x-cbj-whatsapp") ?? "");
  if (!token) return new Response("Unauthorized", { status: 401 });
  try {
    const { headers, rows } = await readTable("Usuarios");
    const idxWa = headers.indexOf("WhatsApp");
    const idxPerfil = headers.indexOf("Perfil");
    const idxStatus = headers.indexOf("Status");
    const match = rows.find(
      (r) => normalizePhone(String(r[idxWa] ?? "")) === token
    );
    if (!match) return new Response("Unauthorized", { status: 401 });
    const perfil = String(match[idxPerfil] ?? "").toUpperCase();
    const status = String(match[idxStatus] ?? "Ativo");
    if (status === "Bloqueado") return new Response("Forbidden", { status: 403 });
    if (perfil !== "ADMIN" && perfil !== "OWNER") {
      return new Response("Forbidden", { status: 403 });
    }
    return null;
  } catch {
    return new Response("Unauthorized", { status: 401 });
  }
}
const Route$1 = createFileRoute("/api/public/catalog-image-upload")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const denied = await requireAdminOrOwner(request);
        if (denied) return denied;
        const form = await request.formData().catch(() => null);
        const file = form?.get("file");
        if (!(file instanceof File)) {
          return new Response("Missing file", { status: 400 });
        }
        if (!ALLOWED.has(file.type)) {
          return new Response("Unsupported file type", { status: 415 });
        }
        if (file.size <= 0 || file.size > MAX_BYTES) {
          return new Response("File too large", { status: 413 });
        }
        const extFromType = file.type.split("/")[1] ?? "jpg";
        const safeExt = extFromType.replace(/[^a-z0-9]/gi, "").toLowerCase() || "jpg";
        const name = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${safeExt}`;
        const { error } = await supabaseAdmin.storage.from("catalog-images").upload(name, file, {
          cacheControl: "31536000",
          upsert: false,
          contentType: file.type
        });
        if (error) {
          return new Response(`Upload failed`, { status: 500 });
        }
        return new Response(JSON.stringify({ path: name }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      },
      DELETE: async ({ request }) => {
        const denied = await requireAdminOrOwner(request);
        if (denied) return denied;
        let path = "";
        try {
          const body = await request.json();
          path = String(body.path ?? "");
        } catch {
          return new Response("Invalid body", { status: 400 });
        }
        if (!path || path.includes("/") || path.includes("..")) {
          return new Response("Invalid path", { status: 400 });
        }
        const { error } = await supabaseAdmin.storage.from("catalog-images").remove([path]);
        if (error) return new Response("Delete failed", { status: 500 });
        return new Response(null, { status: 204 });
      }
    }
  }
});
const Route = createFileRoute("/api/public/catalog-image/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const path = params._splat ?? "";
        if (!path || path.includes("..")) {
          return new Response("Not found", { status: 404 });
        }
        const { data, error } = await supabaseAdmin.storage.from("catalog-images").download(path);
        if (error || !data) {
          return new Response("Not found", { status: 404 });
        }
        const buf = await data.arrayBuffer();
        return new Response(buf, {
          status: 200,
          headers: {
            "Content-Type": data.type || "image/jpeg",
            "Cache-Control": "public, max-age=31536000, immutable"
          }
        });
      }
    }
  }
});
const SetupRoute = Route$g.update({
  id: "/setup",
  path: "/setup",
  getParentRoute: () => Route$h
});
const RelatoriosRoute = Route$f.update({
  id: "/relatorios",
  path: "/relatorios",
  getParentRoute: () => Route$h
});
const ProdutosRoute = Route$e.update({
  id: "/produtos",
  path: "/produtos",
  getParentRoute: () => Route$h
});
const PedidosRoute = Route$d.update({
  id: "/pedidos",
  path: "/pedidos",
  getParentRoute: () => Route$h
});
const LoginRoute = Route$c.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$h
});
const InsumosRoute = Route$b.update({
  id: "/insumos",
  path: "/insumos",
  getParentRoute: () => Route$h
});
const FinanceiroRoute = Route$a.update({
  id: "/financeiro",
  path: "/financeiro",
  getParentRoute: () => Route$h
});
const FichaTecnicaRoute = Route$9.update({
  id: "/ficha-tecnica",
  path: "/ficha-tecnica",
  getParentRoute: () => Route$h
});
const ConfiguracoesRoute = Route$8.update({
  id: "/configuracoes",
  path: "/configuracoes",
  getParentRoute: () => Route$h
});
const ClientesRoute = Route$7.update({
  id: "/clientes",
  path: "/clientes",
  getParentRoute: () => Route$h
});
const CatalogoRoute = Route$6.update({
  id: "/catalogo",
  path: "/catalogo",
  getParentRoute: () => Route$h
});
const CalendarioRoute = Route$5.update({
  id: "/calendario",
  path: "/calendario",
  getParentRoute: () => Route$h
});
const IndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$h
});
const CCatalogoRoute = Route$3.update({
  id: "/c/catalogo",
  path: "/c/catalogo",
  getParentRoute: () => Route$h
});
const AdminNexoRoute = Route$2.update({
  id: "/admin/nexo",
  path: "/admin/nexo",
  getParentRoute: () => Route$h
});
const ApiPublicCatalogImageUploadRoute = Route$1.update({
  id: "/api/public/catalog-image-upload",
  path: "/api/public/catalog-image-upload",
  getParentRoute: () => Route$h
});
const ApiPublicCatalogImageSplatRoute = Route.update({
  id: "/api/public/catalog-image/$",
  path: "/api/public/catalog-image/$",
  getParentRoute: () => Route$h
});
const rootRouteChildren = {
  IndexRoute,
  CalendarioRoute,
  CatalogoRoute,
  ClientesRoute,
  ConfiguracoesRoute,
  FichaTecnicaRoute,
  FinanceiroRoute,
  InsumosRoute,
  LoginRoute,
  PedidosRoute,
  ProdutosRoute,
  RelatoriosRoute,
  SetupRoute,
  AdminNexoRoute,
  CCatalogoRoute,
  ApiPublicCatalogImageUploadRoute,
  ApiPublicCatalogImageSplatRoute
};
const routeTree = Route$h._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  updateConfig as A,
  Button as B,
  createCliente as C,
  Dialog as D,
  deleteProduto as E,
  createProduto as F,
  updateProduto as G,
  setupQO as H,
  Input as I,
  listProdutosPublico as J,
  createPedidoPublico as K,
  Label as L,
  cn as M,
  listUsuarios as N,
  updateUsuario as O,
  createUsuario as P,
  deleteUsuario as Q,
  router as R,
  Textarea as T,
  listClientes as a,
  listProdutos as b,
  checkSetup as c,
  createPedido as d,
  DialogContent as e,
  DialogHeader as f,
  DialogTitle as g,
  DialogFooter as h,
  useAuth as i,
  listInsumos as j,
  DialogTrigger as k,
  listPedidos as l,
  updateInsumoEstoque as m,
  normalizePhone$1 as n,
  deleteInsumo as o,
  updateInsumo as p,
  createInsumo as q,
  updatePedidoPagamento as r,
  listFichas as s,
  testWrite as t,
  updatePedidoStatus as u,
  deleteFicha as v,
  updateFicha as w,
  upsertFicha as x,
  listCustosAdicionais as y,
  getConfig as z
};
