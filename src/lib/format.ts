// Shared formatting utilities — used by the whole app so nothing ever shows
// "Invalid Date" or "R$ R$ X". Always import from here, never reimplement.

/* ---------- Money ---------- */

/** Convert anything (string "R$ 70,00", "70.00", "70,00", number, "") into a number. */
export function parseMoney(v: unknown): number {
  if (v === null || v === undefined || v === "") return 0;
  if (typeof v === "number") return Number.isFinite(v) ? v : 0;
  let s = String(v).trim();
  if (!s) return 0;
  // Strip currency symbols + spaces
  s = s.replace(/R\$\s?/gi, "").replace(/\s+/g, "");
  // pt-BR: thousands "." decimals "," — but also accept plain "70.00"
  if (s.includes(",")) {
    s = s.replace(/\./g, "").replace(",", ".");
  }
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
}

/** Always format as "R$ 70,00". Accepts string or number; never doubles "R$". */
export function formatBRL(v: unknown): string {
  const n = parseMoney(v);
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/* ---------- Dates ---------- */

/**
 * Parse anything reasonable into a Date or null.
 * Accepts: Date, ISO "yyyy-mm-dd[ T...]", BR "dd/mm/yyyy[ hh:mm]",
 *          Google Sheets serial numbers, empty -> null.
 */
export function parseDateSafe(v: unknown): Date | null {
  if (v === null || v === undefined || v === "") return null;
  if (v instanceof Date) return isNaN(+v) ? null : v;

  // Google Sheets serial number (days since 1899-12-30)
  if (typeof v === "number" && Number.isFinite(v)) {
    const ms = Math.round((v - 25569) * 86400 * 1000);
    const d = new Date(ms);
    return isNaN(+d) ? null : d;
  }

  const s = String(v).trim();
  if (!s) return null;

  // BR dd/mm/yyyy [hh:mm]
  const br = s.match(
    /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})(?:[\sT]+(\d{1,2})(?::(\d{2}))?)?/,
  );
  if (br) {
    const [, d, m, y, hh, mm] = br;
    const year = y.length === 2 ? 2000 + +y : +y;
    const dt = new Date(year, +m - 1, +d, +(hh ?? 0), +(mm ?? 0));
    return isNaN(+dt) ? null : dt;
  }

  // Pure numeric string (sheets serial)
  if (/^-?\d+(\.\d+)?$/.test(s)) {
    return parseDateSafe(Number(s));
  }

  const dt = new Date(s);
  return isNaN(+dt) ? null : dt;
}

const EMPTY_DATE = "Data não informada";

export function formatDateBR(v: unknown): string {
  const d = parseDateSafe(v);
  return d ? d.toLocaleDateString("pt-BR") : EMPTY_DATE;
}

export function formatDateTimeBR(v: unknown): string {
  const d = parseDateSafe(v);
  if (!d) return EMPTY_DATE;
  return d.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** "yyyy-mm-dd" key for grouping by day (local time). */
export function dateKey(v: unknown): string | null {
  const d = parseDateSafe(v);
  if (!d) return null;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/* ---------- Regra financeira (fonte única) ---------- */

export type SituacaoFinanceira = "Não pago" | "Entrada recebida" | "Pago integral";

/**
 * Calcula situação real a partir dos valores. Ignora rótulos da planilha
 * incorretos (ex.: "Pago integral" com entrada = 0).
 */
export function situacaoReal(
  valorTotal: unknown,
  entrada: unknown,
  saldoOpt?: unknown,
): SituacaoFinanceira {
  const total = parseMoney(valorTotal);
  const pago = parseMoney(entrada);
  const saldo =
    saldoOpt !== undefined && saldoOpt !== null && saldoOpt !== ""
      ? parseMoney(saldoOpt)
      : total - pago;
  if (total > 0 && saldo <= 0.0049 && pago > 0) return "Pago integral";
  if (pago > 0 && saldo > 0) return "Entrada recebida";
  return "Não pago";
}

/** Valor efetivamente recebido para um pedido. */
export function valorRecebido(
  valorTotal: unknown,
  entrada: unknown,
  saldoOpt?: unknown,
): number {
  const total = parseMoney(valorTotal);
  const pago = parseMoney(entrada);
  const sit = situacaoReal(valorTotal, entrada, saldoOpt);
  return sit === "Pago integral" ? total : pago;
}
