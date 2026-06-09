import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ClipboardList,
  CalendarDays,
  Wallet,
  Settings,
  ChefHat,
  Store,
  FileText,
  Boxes,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { BrandLogo } from "./brand-logo";
import { NexoSignature } from "./nexo-signature";

const gestao = [
  { title: "Painel Financeiro", url: "/", icon: LayoutDashboard },
  { title: "Catálogo", url: "/catalogo", icon: Store },
  { title: "Pedidos", url: "/pedidos", icon: ClipboardList },
  { title: "Agenda", url: "/calendario", icon: CalendarDays },
];

const operacao = [
  { title: "Financeiro", url: "/financeiro", icon: Wallet },
  { title: "Insumos", url: "/insumos", icon: Boxes },
  { title: "Ficha Técnica", url: "/ficha-tecnica", icon: FileText },
];

const sistema = [{ title: "Configurações", url: "/configuracoes", icon: Settings }];
const adminItems = [{ title: "Admin Nexo", url: "/admin/nexo", icon: ChefHat }];

export function AppSidebar({ perfil = "OWNER" }: { perfil?: "ADMIN" | "OWNER" | "CLIENTE" }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { isMobile, setOpenMobile } = useSidebar();
  const isAdmin = perfil === "ADMIN";

  const handleNav = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border px-3 py-4">
        <Link to="/" className="flex items-center gap-3" onClick={handleNav}>
          <BrandLogo size={40} />
          <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="font-display text-base font-semibold tracking-tight text-chocolate">
              Cakes by Jack
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-rose-deep">
              Confeitaria Artesanal
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <Group label="Gestão" items={gestao} pathname={pathname} onNav={handleNav} />
        <Group label="Operação" items={operacao} pathname={pathname} onNav={handleNav} />
        <Group label="Sistema" items={sistema} pathname={pathname} onNav={handleNav} />
        {isAdmin && (
          <Group label="Administração" items={adminItems} pathname={pathname} onNav={handleNav} />
        )}
      </SidebarContent>

      <SidebarFooter className="p-0">
        <NexoSignature />
      </SidebarFooter>
    </Sidebar>
  );
}

function Group({
  label,
  items,
  pathname,
  onNav,
}: {
  label: string;
  items: { title: string; url: string; icon: any }[];
  pathname: string;
  onNav: () => void;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={pathname === item.url}>
                <Link to={item.url} className="flex items-center gap-2" onClick={onNav}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}