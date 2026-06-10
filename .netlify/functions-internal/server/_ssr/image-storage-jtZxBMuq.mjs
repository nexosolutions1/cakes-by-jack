function publicImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (!path.includes("/") && !path.includes(".") && path.length > 20) {
    return `https://drive.google.com/uc?export=view&id=${path}`;
  }
  return "";
}
async function uploadProductImage(file) {
  {
    throw new Error("VITE_GOOGLE_SCRIPT_URL não configurado no Netlify");
  }
}
async function deleteProductImage(_path) {
  return;
}
export {
  deleteProductImage as d,
  publicImageUrl as p,
  uploadProductImage as u
};
