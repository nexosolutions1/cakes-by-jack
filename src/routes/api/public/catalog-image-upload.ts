// Authenticated upload endpoint for catalog images.
// Validates the caller against the Usuarios sheet (ADMIN/OWNER only),
// enforces image type + size limits, then uses supabaseAdmin to write
// to the private "catalog-images" bucket. The bucket itself denies all
// public writes via RLS — uploads MUST go through this route.
import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { readTable } from "@/lib/sheets.server";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

function normalizePhone(v: string) {
  return (v ?? "").replace(/\D+/g, "");
}

async function requireAdminOrOwner(request: Request): Promise<Response | null> {
  const token = normalizePhone(request.headers.get("x-cbj-whatsapp") ?? "");
  if (!token) return new Response("Unauthorized", { status: 401 });
  try {
    const { headers, rows } = await readTable("Usuarios");
    const idxWa = headers.indexOf("WhatsApp");
    const idxPerfil = headers.indexOf("Perfil");
    const idxStatus = headers.indexOf("Status");
    const match = rows.find(
      (r) => normalizePhone(String(r[idxWa] ?? "")) === token,
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

export const Route = createFileRoute("/api/public/catalog-image-upload")({
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

        const { error } = await supabaseAdmin.storage
          .from("catalog-images")
          .upload(name, file, {
            cacheControl: "31536000",
            upsert: false,
            contentType: file.type,
          });
        if (error) {
          return new Response(`Upload failed`, { status: 500 });
        }
        return new Response(JSON.stringify({ path: name }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
      DELETE: async ({ request }) => {
        const denied = await requireAdminOrOwner(request);
        if (denied) return denied;

        let path = "";
        try {
          const body = (await request.json()) as { path?: string };
          path = String(body.path ?? "");
        } catch {
          return new Response("Invalid body", { status: 400 });
        }
        if (!path || path.includes("/") || path.includes("..")) {
          return new Response("Invalid path", { status: 400 });
        }
        const { error } = await supabaseAdmin.storage
          .from("catalog-images")
          .remove([path]);
        if (error) return new Response("Delete failed", { status: 500 });
        return new Response(null, { status: 204 });
      },
    },
  },
});
