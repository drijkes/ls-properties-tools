const fmtEUR = (n) =>
  new Intl.NumberFormat("nl-BE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

const STASH_MAX_KG = 3000;
const PRICE_PER_100KG = 2500;

const shells = [
  { label: "envi_shell_03_empty", price: 35000, kilos: 400, floors: 1 },
  { label: "envi_shell_02_empty", price: 40000, kilos: 400, floors: 1 },
  { label: "envi_shell_01_empty", price: 50000, kilos: 400, floors: 1 },
  { label: "Apartment Unfurnished", price: 55000, kilos: 250, floors: 1 },
  { label: "House 4", price: 60000, kilos: 400, floors: 1, manualKg: true },
  { label: "House 1", price: 65000, kilos: 500, floors: 1, manualKg: true },
  { label: "House 2", price: 100000, kilos: 800, floors: 1, manualKg: true },
  { label: "Fury Shell 4 Unfurnished", price: 125000, kilos: 500, floors: 1 },
  { label: "Fury Shell 5 Unfurnished", price: 140000, kilos: 600, floors: 1 },
  { label: "Max Studio Shell", price: 150000, kilos: 600, floors: 1 },
  { label: "Max Luxury Appartment", price: 200000, kilos: 600, floors: 1 },
  { label: "Apartment Unfurnished Custom", price: 250000, kilos: 600, floors: 1, manualKg: true },
  { label: "Max Unfurnished Shell 4", price: 350000, kilos: 600, floors: 1 },
  { label: "Max House Shell", price: 100000, kilos: 400, floors: 2 },
  { label: "Max Loft Shell 1", price: 200000, kilos: 600, floors: 2 },
  { label: "Max Loft Shell 2", price: 200000, kilos: 600, floors: 2 },
  { label: "Max Unfurnished Shell 2", price: 225000, kilos: 600, floors: 2 },
  { label: "Max Unfurnished Shell 3", price: 235000, kilos: 600, floors: 2 },
  { label: "Fury Shell 3 Unfurnished", price: 250000, kilos: 600, floors: 3 },
  { label: "Fury Shell 2 Unfurnished", price: 250000, kilos: 600, floors: 3 },
  { label: "Fury Shell 1 Unfurnished", price: 275000, kilos: 600, floors: 3 },
  { label: "Max Unfurnished Shell 1", price: 450000, kilos: 600, floors: 3 },
  { label: "Max Mansion Shell 1", price: 600000, kilos: 800, floors: 2 },
  { label: "2 Floor House", price: 1000000, kilos: 1000, floors: 2, manualKg: true },
  { label: "Max Mansion Shell 2", price: 1000000, kilos: 1000, floors: 3, manualKg: true },
  { label: "Max Mansion Shell 3", price: 2000000, kilos: 2000, floors: 2, manualKg: true },
  { label: "Deluxe Housing 1", price: 1500000, kilos: 600, floors: 2 },
  { label: "Deluxe Housing 2", price: 650000, kilos: 600, floors: 1 },
  { label: "Deluxe Housing 3", price: 1000000, kilos: 600, floors: 2 },
  { label: "Office", price: 20000, kilos: 200, floors: 1 },
  { label: "Warehouse", price: 25000, kilos: 600, floors: 1, manualKg: true },
  { label: "Warehouse 2", price: 35000, kilos: 1000, floors: 1 },
  { label: "Warehouse Industry", price: 55000, kilos: 1600, floors: 1, manualKg: true },
  { label: "Garage", price: 75000, kilos: 2000, floors: 1, manualKg: true },
  { label: "Container", price: 10000, kilos: 200, floors: 1 },
  { label: "Trailer", price: 15000, kilos: 200, floors: 1 },
];

const tuinen = [
  { label: "Geen tuin", price: 0 },
  { label: "Klein tuin", price: 10000 },
  { label: "Middel tuin", price: 30000 },
  { label: "Middel tuin met zwembad", price: 50000 },
  { label: "Grote tuin", price: 75000 },
  { label: "Grote tuin met zwembad", price: 100000 },
  { label: "Hele grote tuin", price: 150000 },
  { label: "Hele grote tuin met alles", price: 200000 },
];

function fillSelect(select, items, formatter) {
  select.innerHTML = "";
  items.forEach((it, idx) => {
    const opt = document.createElement("option");
    opt.value = String(idx);
    opt.textContent = formatter ? formatter(it) : it.label;
    select.appendChild(opt);
  });
}

function recalc() {
  const shellIdx = Number(document.getElementById("shellSelect").value || 0);
  const tuinIdx = Number(document.getElementById("tuinSelect").value || 0);
  const shell = shells[shellIdx] || shells[0];
  const tuin = tuinen[tuinIdx] || tuinen[0];

  // KG Waarschuwing logica
  const warningEl = document.getElementById("kgWarningCard");
  warningEl.style.display = shell.manualKg ? "block" : "none";

  const baseKg = shell.kilos;
  const targetKgInput = document.getElementById("stashTargetKg");
  let targetKg = Number(targetKgInput.value);
  if (targetKg > STASH_MAX_KG) { targetKg = STASH_MAX_KG; targetKgInput.value = STASH_MAX_KG; }

  const enable = document.getElementById("enableStashUpgrade").checked;
  const extraKg = enable ? Math.max(0, targetKg - baseKg) : 0;
  const stashCost = (extraKg / 100) * PRICE_PER_100KG;

  const totaal = shell.price + tuin.price + stashCost;

  // UI Updates
  document.getElementById("huisPrijs").textContent = fmtEUR(shell.price);
  document.getElementById("tuinPrijs").textContent = fmtEUR(tuin.price);
  document.getElementById("stashBaseKg").textContent = baseKg;
  document.getElementById("stashExtraKg").textContent = extraKg;
  document.getElementById("stashUpgradePrice").textContent = fmtEUR(stashCost);
  document.getElementById("totaalPrijs").textContent = fmtEUR(totaal);

  // Samenvatting text
  let summary = `LS Properties — Aankoop\n\nShell: ${shell.label} (${fmtEUR(shell.price)})\nTuin: ${tuin.label} (${fmtEUR(tuin.price)})\nStash Basis: ${baseKg}kg\n`;
  if (enable) summary += `Extra Stash: +${extraKg}kg (${fmtEUR(stashCost)})\n`;
  if (shell.manualKg) summary += `\n⚠️ LET OP: KG HANDMATIG AANPASSEN!`;
  summary += `\n\nTOTAAL: ${fmtEUR(totaal)}`;
  
  document.getElementById("msgBuy").value = summary;
}

document.addEventListener("DOMContentLoaded", () => {
  fillSelect(document.getElementById("shellSelect"), shells, s => `${s.label} (${fmtEUR(s.price)})`);
  fillSelect(document.getElementById("tuinSelect"), tuinen, t => `${t.label} (${fmtEUR(t.price)})`);

  const inputs = ["shellSelect", "tuinSelect", "enableStashUpgrade", "stashTargetKg"];
  inputs.forEach(id => document.getElementById(id).addEventListener("change", recalc));
  document.getElementById("stashTargetKg").addEventListener("input", recalc);

  document.getElementById("resetBuyBtn").addEventListener("click", () => {
    document.getElementById("shellSelect").selectedIndex = 0;
    document.getElementById("tuinSelect").selectedIndex = 0;
    document.getElementById("enableStashUpgrade").checked = false;
    document.getElementById("stashTargetKg").value = 1000;
    recalc();
  });

  document.getElementById("copyBuyBtn").addEventListener("click", () => {
    const ta = document.getElementById("msgBuy");
    ta.select();
    document.execCommand("copy");
    const toast = document.getElementById("copyBuyToast");
    toast.style.display = "inline";
    setTimeout(() => toast.style.display = "none", 1500);
  });

  recalc();
});