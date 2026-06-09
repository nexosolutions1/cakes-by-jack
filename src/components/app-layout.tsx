import type { ReactNode } from "react";
import { useEffect } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, Loader2 } from "lucide-react";
import { AppSidebar } from "./app-sidebar";
import { useAuth, type Perfil } from "@/lib/auth";

export function AppLayout({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate({ to: "/login" });
      return;
    }
    const perfil = (user.perfil as Perfil) ?? "CLIENTE";
    // CLIENTE doesn't access admin area
    if (perfil === "CLIENTE") {
      navigate({ to: "/c/catalogo" });
      return;
    }
    // OWNER can't access /admin/nexo
    if (perfil === "OWNER" && pathname.startsWith("/admin/")) {
      navigate({ to: "/" });
    }
  }, [user, loading, pathname, navigate]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar perfil={(user.perfil as Perfil) ?? "OWNER"} />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-30 flex flex-wrap items-center gap-2 border-b border-border bg-background/85 px-3 py-2 backdrop-blur-md sm:gap-3 md:h-16 md:flex-nowrap md:px-8 md:py-0">
            <SidebarTrigger />
            <div className="flex min-w-0 flex-1 flex-col leading-tight">
              <h1 className="font-display truncate text-lg font-semibold tracking-tight sm:text-xl md:text-2xl">
                {title}
              </h1>
              {subtitle && (
                <p className="truncate text-xs text-muted-foreground md:text-sm">{subtitle}</p>
              )}
            </div>
            {actions && (
              <div className="order-3 flex w-full items-center gap-2 md:order-none md:w-auto">
                {actions}
              </div>
            )}
            <div className="flex items-center gap-2 border-l pl-2">
              <div className="hidden flex-col items-end leading-tight sm:flex">
                <span className="text-sm font-medium">{user.nome}</span>
                <Badge variant="outline" className="h-4 text-[10px]">
                  {user.perfil}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  logout();
                  navigate({ to: "/login" });
                }}
                title="Sair"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </header>
          <main className="flex-1 px-3 py-4 sm:px-4 sm:py-6 md:px-8 md:py-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
