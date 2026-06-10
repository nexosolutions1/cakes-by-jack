const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID || "1NYQBaQ9JXnLxm6Gj9z6wqnagHBZadZRx3_VFCXKFCq0";
const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
async function callScript(action, payload = {}) {
  if (!SCRIPT_URL) throw new Error("GOOGLE_SCRIPT_URL não configurado no .env");
  const res = await fetch(SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action, payload })
  });
  const data = await res.json();
  if (!res.ok || data.ok === false) {
    throw new Error(data.error || `Erro no Apps Script: ${res.status}`);
  }
  return data;
}
async function getValues(range) {
  const data = await callScript("getValues", { range });
  return data.values ?? [];
}
async function setValues(range, values) {
  return callScript("setValues", { range, values });
}
async function getMetadata() {
  return callScript("getMetadata");
}
async function readTable(tab) {
  const [headerRows, dataRows] = await Promise.all([
    getValues(`${tab}!A1:Z1`),
    getValues(`${tab}!A2:Z`)
  ]);
  return {
    headers: headerRows[0] ?? [],
    rows: dataRows,
    rowOffset: 2
  };
}
async function findRow(tab, idColumn, id) {
  const { headers, rows, rowOffset } = await readTable(tab);
  const idx = headers.indexOf(idColumn);
  if (idx < 0) return -1;
  const i = rows.findIndex((r) => (r[idx] ?? "") === id);
  return i < 0 ? -1 : rowOffset + i;
}
async function appendRecord(tab, record) {
  return callScript("appendRecord", { tab, record });
}
async function updateRecord(tab, rowNumber, patch) {
  return callScript("updateRecord", { tab, rowNumber, patch });
}
export {
  SPREADSHEET_ID as S,
  appendRecord as a,
  getValues as b,
  findRow as f,
  getMetadata as g,
  readTable as r,
  setValues as s,
  updateRecord as u
};
