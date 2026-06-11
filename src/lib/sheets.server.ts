declare const fetch: any;

// Google Sheets backend via Apps Script.
// Independente do Lovable e sem Google Cloud Console.

export const SPREADSHEET_ID =
  process.env.GOOGLE_SHEETS_ID || "1OR4EUXPXBvVYnzCiaERSTiagoXaS890fN2iZqVRZlpM";

const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

async function callScript(action: string, payload: Record<string, unknown> = {}) {
  if (!SCRIPT_URL) throw new Error("GOOGLE_SCRIPT_URL não configurado no .env");

  const res = await fetch(SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action, payload }),
  });

  const data = await res.json();

  if (!res.ok || data.ok === false) {
    throw new Error(data.error || `Erro no Apps Script: ${res.status}`);
  }

  return data;
}

export function colLetter(n: number) {
  let s = "";
  let x = n;

  while (x > 0) {
    const m = (x - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    x = Math.floor((x - 1) / 26);
  }

  return s;
}

export async function getValues(range: string): Promise<string[][]> {
  const data = await callScript("getValues", { range });
  return data.values ?? [];
}

export async function setValues(range: string, values: (string | number)[][]) {
  return callScript("setValues", { range, values });
}

export async function getMetadata() {
  return callScript("getMetadata");
}

export async function readTable(tab: string): Promise<{
  headers: string[];
  rows: string[][];
  rowOffset: number;
}> {
  const [headerRows, dataRows] = await Promise.all([
    getValues(`${tab}!A1:Z1`),
    getValues(`${tab}!A2:Z`),
  ]);

  return {
    headers: headerRows[0] ?? [],
    rows: dataRows,
    rowOffset: 2,
  };
}

export async function findRow(tab: string, idColumn: string, id: string) {
  const { headers, rows, rowOffset } = await readTable(tab);
  const idx = headers.indexOf(idColumn);

  if (idx < 0) return -1;

  const i = rows.findIndex((r) => (r[idx] ?? "") === id);

  return i < 0 ? -1 : rowOffset + i;
}

export async function appendRecord(
  tab: string,
  record: Record<string, string | number>,
) {
  return callScript("appendRecord", { tab, record });
}

export async function updateRecord(
  tab: string,
  rowNumber: number,
  patch: Record<string, string | number>,
) {
  return callScript("updateRecord", { tab, rowNumber, patch });
}