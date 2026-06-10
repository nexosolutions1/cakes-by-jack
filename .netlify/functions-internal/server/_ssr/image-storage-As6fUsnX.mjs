function publicImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("data:image/")) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (!path.includes("/") && !path.includes(".") && path.length > 20) {
    return `https://drive.google.com/uc?export=view&id=${path}`;
  }
  return "";
}
function compressImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = () => {
      img.src = String(reader.result || "");
    };
    reader.onerror = () => reject(new Error("Erro ao ler imagem"));
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const maxWidth = 500;
      const scale = Math.min(1, maxWidth / img.width);
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Erro ao processar imagem"));
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      let quality = 0.7;
      let dataUrl = canvas.toDataURL("image/jpeg", quality);
      while (dataUrl.length > 45e3 && quality > 0.25) {
        quality -= 0.1;
        dataUrl = canvas.toDataURL("image/jpeg", quality);
      }
      if (dataUrl.length > 45e3) {
        reject(new Error("Imagem ainda ficou grande. Use uma imagem menor."));
        return;
      }
      resolve(dataUrl);
    };
    img.onerror = () => reject(new Error("Imagem inválida"));
    reader.readAsDataURL(file);
  });
}
async function uploadProductImage(file) {
  return compressImage(file);
}
async function deleteProductImage(_path) {
  return;
}
export {
  deleteProductImage as d,
  publicImageUrl as p,
  uploadProductImage as u
};
