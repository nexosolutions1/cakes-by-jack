function publicImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (!path.includes("/") && !path.includes(".") && path.length > 20) {
    return `https://drive.google.com/uc?export=view&id=${path}`;
  }
  return "";
}
async function uploadProductImage(_file) {
  throw new Error(
    "Upload local desativado. Para usar imagem, coloque uma URL direta ou ID do Google Drive na coluna Imagem da aba Produtos."
  );
}
async function deleteProductImage(_path) {
  return;
}
export {
  deleteProductImage as d,
  publicImageUrl as p,
  uploadProductImage as u
};
