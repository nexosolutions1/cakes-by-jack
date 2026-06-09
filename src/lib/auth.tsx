// Lightweight session layer backed by the Usuarios tab on Google Sheets.
// - Source of truth: the Usuarios tab (planilha).
// - Local storage only holds the normalized WhatsApp number of the
//   currently-logged-in user (no profile/role copy) so refreshes re-validate
//   against the planilha on every load.

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { listUsuarios, type Usuario } from "./sheets.functions";

export type Perfil = "ADMIN" | "OWNER" | "CLIENTE";

const SESSION_KEY = "cbj.session.whatsapp";

export function normalizePhone(v: string) {
  return (v ?? "").replace(/\D+/g, "");
}

type AuthContextValue = {
  user: Usuario | null;
  loading: boolean;
  login: (whatsapp: string) => Usuario | null;
  logout: () => void;
  hasRole: (...roles: Perfil[]) => boolean;
  refresh: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [whatsapp, setWhatsapp] = useState<string>("");

  useEffect(() => {
    try {
      const w = localStorage.getItem(SESSION_KEY) ?? "";
      setWhatsapp(normalizePhone(w));
    } catch {
      /* ignore */
    }
  }, []);

  const { data: usuarios = [], isLoading, refetch } = useQuery({
    queryKey: ["usuarios"],
    queryFn: () => listUsuarios(),
    staleTime: 30_000,
  });

  const user = useMemo(() => {
    if (!whatsapp) return null;
    return (
      usuarios.find(
        (u) => normalizePhone(u.whatsapp) === whatsapp && u.status !== "Bloqueado",
      ) ?? null
    );
  }, [usuarios, whatsapp]);

  const value: AuthContextValue = {
    user,
    loading: isLoading,
    login: (w: string) => {
      const norm = normalizePhone(w);
      const found = usuarios.find(
        (u) => normalizePhone(u.whatsapp) === norm && u.status !== "Bloqueado",
      );
      if (found) {
        try {
          localStorage.setItem(SESSION_KEY, norm);
        } catch {
          /* ignore */
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
        /* ignore */
      }
      setWhatsapp("");
    },
    hasRole: (...roles: Perfil[]) =>
      !!user && roles.includes((user.perfil as Perfil) ?? "CLIENTE"),
    refresh: () => {
      refetch();
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  return ctx;
}
