const fmtEUR = (n) =>
  new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

function getNum(id) {
  const el = document.getElementById(id);
  if (!el) return 0;
  const v = Number(el.value || 0);
  return Number.isFinite(v) ? v : 0;
}

function recalcKg() {
  const cur = getNum("curKg");
  const target = getNum("targetKg");
  const pricePer100 = getNum("pricePer100");

  const extraKg = Math.max(0, target - cur);
  const totalPrice = (extraKg / 100) * pricePer100;

  const totalKgEl = document.getElementById("totalKg");
  const totalPriceEl = document.getElementById("totalPrice");
  const msgEl = document.getElementById("msg");

  if (totalKgEl) totalKgEl.textContent = String(extraKg);
  if (totalPriceEl) totalPriceEl.textContent = fmtEUR(totalPrice);

  if (msgEl) {
    msgEl.value = [
      "LS Properties — Stash berekening",
      `Huidige KG: ${cur}`,
      `Gewenste KG: ${target}`,
      `Bij te kopen: ${extraKg} kg`,
      `Prijs per 100kg: ${fmtEUR(pricePer100)}`,
      `Totaal prijs: ${fmtEUR(totalPrice)}`,
    ].join("\n");
  }
}

function resetAll() {
  const curKg = document.getElementById("curKg");
  const targetKg = document.getElementById("targetKg");
  const pricePer100 = document.getElementById("pricePer100");

  if (curKg) curKg.value = 0;
  if (targetKg) targetKg.value = 0;

  // prijs blijft 2500 (standaard)
  if (pricePer100) pricePer100.value = 2500;

  recalcKg();
}


function wireUp() {
  const calcBtn = document.getElementById("calcBtn");
  const resetBtn = document.getElementById("resetBtn");

  if (calcBtn) calcBtn.addEventListener("click", recalcKg);
  if (resetBtn) resetBtn.addEventListener("click", resetAll);

  ["curKg", "targetKg", "pricePer100"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", recalcKg);
  });

  recalcKg();
}

document.addEventListener("DOMContentLoaded", wireUp);
