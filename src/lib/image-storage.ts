export function publicImageUrl(path: string): string {
  if (!path) return "";

  // Se for URL direta do Drive, Imgur, site, etc.
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  // Se for só ID de arquivo do Google Drive
  if (!path.includes("/") && !path.includes(".") && path.length > 20) {
    return `https://drive.google.com/uc?export=view&id=${path}`;
  }

  // Se for nome antigo do Supabase, não tenta mais buscar rota antiga
  return "";
}

export async function uploadProductImage(_file: File): Promise<string> {
  throw new Error(
    "Upload local desativado. Para usar imagem, coloque uma URL direta ou ID do Google Drive na coluna Imagem da aba Produtos."
  );
}

export async function deleteProductImage(_path: string): Promise<void> {
  return;
}