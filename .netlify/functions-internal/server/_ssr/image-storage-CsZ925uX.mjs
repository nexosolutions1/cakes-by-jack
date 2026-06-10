function publicImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("data:image/")) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (!path.includes("/") && !path.includes(".") && path.length > 20) {
    return `https://drive.google.com/uc?export=view&id=${path}`;
  }
  return "";
}
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Erro ao ler imagem"));
    reader.readAsDataURL(file);
  });
}
async function uploadProductImage(file) {
  if (file.size > 800 * 1024) {
    throw new Error("Imagem muito grande. Use uma imagem menor que 800 KB.");
  }
  return fileToDataUrl(file);
}
async function deleteProductImage(_path) {
  return;
}
export {
  deleteProductImage as d,
  publicImageUrl as p,
  uploadProductImage as u
};
