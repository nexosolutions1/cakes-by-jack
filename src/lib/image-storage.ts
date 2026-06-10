export function publicImageUrl(path: string): string {
  if (!path) return "";

  if (path.startsWith("data:image/")) return path;

  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  if (!path.includes("/") && !path.includes(".") && path.length > 20) {
    return `https://drive.google.com/uc?export=view&id=${path}`;
  }

  return "";
}

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      img.src = String(reader.result || "");
    };

    reader.onerror = () => reject(new Error("Erro ao ler imagem"));

    img.onload = () => {
      const canvas = document.createElement("canvas");

      // REDUZ MUITO O TAMANHO
      const maxWidth = 250;
      const scale = Math.min(1, maxWidth / img.width);

      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Erro ao processar imagem"));
        return;
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      let quality = 0.45;
      let dataUrl = canvas.toDataURL("image/jpeg", quality);

      while (dataUrl.length > 18000 && quality > 0.15) {
        quality -= 0.05;
        dataUrl = canvas.toDataURL("image/jpeg", quality);
      }

      if (dataUrl.length > 18000) {
        reject(
          new Error("Imagem muito grande. Use uma imagem menor.")
        );
        return;
      }

      resolve(dataUrl);
    };

    img.onerror = () => reject(new Error("Imagem inválida"));

    reader.readAsDataURL(file);
  });
}

export async function uploadProductImage(file: File): Promise<string> {
  return compressImage(file);
}

export async function deleteProductImage(_path: string): Promise<void> {
  return;
}