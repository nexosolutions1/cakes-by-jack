function parseMoney(v) {
  if (v === null || v === void 0 || v === "") return 0;
  if (typeof v === "number") return Number.isFinite(v) ? v : 0;
  let s = String(v).trim();
  if (!s) return 0;
  s = s.replace(/R\$\s?/gi, "").replace(/\s+/g, "");
  if (s.includes(",")) {
    s = s.replace(/\./g, "").replace(",", ".");
  }
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
}
function formatBRL(v) {
  const n = parseMoney(v);
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
function parseDateSafe(v) {
  if (v === null || v === void 0 || v === "") return null;
  if (v instanceof Date) return isNaN(+v) ? null : v;
  if (typeof v === "number" && Number.isFinite(v)) {
    const ms = Math.round((v - 25569) * 86400 * 1e3);
    const d = new Date(ms);
    return isNaN(+d) ? null : d;
  }
  const s = String(v).trim();
  if (!s) return null;
  const br = s.match(
    /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})(?:[\sT]+(\d{1,2})(?::(\d{2}))?)?/
  );
  if (br) {
    const [, d, m, y, hh, mm] = br;
    const year = y.length === 2 ? 2e3 + +y : +y;
    const dt2 = new Date(year, +m - 1, +d, +(hh ?? 0), +(mm ?? 0));
    return isNaN(+dt2) ? null : dt2;
  }
  if (/^-?\d+(\.\d+)?$/.test(s)) {
    return parseDateSafe(Number(s));
  }
  const dt = new Date(s);
  return isNaN(+dt) ? null : dt;
}
const EMPTY_DATE = "Data não informada";
function formatDateBR(v) {
  const d = parseDateSafe(v);
  return d ? d.toLocaleDateString("pt-BR") : EMPTY_DATE;
}
function dateKey(v) {
  const d = parseDateSafe(v);
  if (!d) return null;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function situacaoReal(valorTotal, entrada, saldoOpt) {
  const total = parseMoney(valorTotal);
  const pago = parseMoney(entrada);
  const saldo = saldoOpt !== void 0 && saldoOpt !== null && saldoOpt !== "" ? parseMoney(saldoOpt) : total - pago;
  if (total > 0 && saldo <= 49e-4 && pago > 0) return "Pago integral";
  if (pago > 0 && saldo > 0) return "Entrada recebida";
  return "Não pago";
}
function valorRecebido(valorTotal, entrada, saldoOpt) {
  const total = parseMoney(valorTotal);
  const pago = parseMoney(entrada);
  const sit = situacaoReal(valorTotal, entrada, saldoOpt);
  return sit === "Pago integral" ? total : pago;
}
export {
  formatBRL as a,
  parseMoney as b,
  dateKey as d,
  formatDateBR as f,
  parseDateSafe as p,
  situacaoReal as s,
  valorRecebido as v
};
