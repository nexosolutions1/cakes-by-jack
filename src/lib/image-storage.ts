const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || "";

export function publicImageUrl(path: string): string {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  if (!path.includes("/") && !path.includes(".") && path.length > 20) {
    return `https://drive.google.com/uc?export=view&id=${path}`;
  }

  return "";
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = String(reader.result || "");
      const base64 = result.includes(",") ? result.split(",")[1] : result;
      resolve(base64);
    };

    reader.onerror = () => reject(new Error("Erro ao ler imagem"));
    reader.readAsDataURL(file);
  });
}

export async function uploadProductImage(file: File): Promise<string> {
  if (!SCRIPT_URL) {
    throw new Error("VITE_GOOGLE_SCRIPT_URL não configurado no Netlify");
  }

  const base64 = await fileToBase64(file);

  const res = await fetch(SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      action: "uploadImage",
      payload: {
        filename: file.name,
        mimeType: file.type,
        base64,
      },
    }),
  });

  const data = await res.json();

  if (!res.ok || data.ok === false) {
    throw new Error(data.error || "Erro ao enviar imagem");
  }

  return data.url;
}

export async function deleteProductImage(_path: string): Promise<void> {
  return;
}