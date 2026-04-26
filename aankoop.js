const fmtEUR = (n) => new Intl.NumberFormat("nl-BE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

const PRICE_PER_100KG = 5000;
let selectedStars = 0;
let locationMultiplier = 0;
let locationText = "Klasse 5: Achterbuurt (0%)";
let applyDiscount = false;

const starMultipliers = { 0: 0, 1: 0.05, 2: 0.15, 3: 0.25 };

const shells = [
  { label: "Kleine Loods", price: 35000, kilos: 600, floors: 1 },
  { label: "Middel Loods", price: 75000, kilos: 600, floors: 1 },
  { label: "Grote Loods", price: 150000, kilos: 600, floors: 2 },
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
  { label: "Warehouse 2", price: 35000, kilos: 600, floors: 1, manualKg: true  },
  { label: "Garage", price: 50000, kilos: 600, floors: 1, manualKg: true },
  { label: "Container", price: 10000, kilos: 200, floors: 1 },
  { label: "Trailer", price: 15000, kilos: 200, floors: 1 }
];

const tuinen = [
  { label: "Geen tuin", price: 0 },
  { label: "Klein tuin", price: 10000 },
  { label: "Klein tuin met zwembad", price: 25000 },
  { label: "Middel tuin", price: 30000 },
  { label: "Middel tuin met zwembad", price: 50000 },
  { label: "Grote tuin", price: 75000 },
  { label: "Grote tuin met zwembad", price: 100000 },
  { label: "Hele grote tuin", price: 150000 },
  { label: "Hele grote tuin met alles", price: 200000 }
];

function recalc() {
  const shellIdx = document.getElementById("shellSelect").value || 0;
  const tuinIdx = document.getElementById("tuinSelect").value || 0;
  const shell = shells[shellIdx];
  const tuin = tuinen[tuinIdx];
  
  const baseKg = shell.kilos;
  const targetKg = Number(document.getElementById("stashTargetKg").value);
  const enableStash = document.getElementById("enableStashUpgrade").checked;
  const extraKg = (enableStash && targetKg > baseKg) ? targetKg - baseKg : 0;
  const stashCost = (extraKg / 100) * PRICE_PER_100KG;

  const basisBedrag = shell.price + tuin.price;
  const toeslagLocatie = basisBedrag * locationMultiplier;
  const toeslagLuxe = basisBedrag * starMultipliers[selectedStars];
  
  let totaal = basisBedrag + toeslagLocatie + toeslagLuxe + stashCost;

  let kortingBedrag = 0;
  if (applyDiscount) {
    kortingBedrag = totaal * 0.10;
    totaal = totaal - kortingBedrag;
  }

  // Update de interface
  document.getElementById("huisPrijs").textContent = fmtEUR(shell.price);
  document.getElementById("tuinPrijs").textContent = fmtEUR(tuin.price);
  if(document.getElementById("locatiePrijs")) document.getElementById("locatiePrijs").textContent = fmtEUR(toeslagLocatie);
  if(document.getElementById("luxePrijs")) document.getElementById("luxePrijs").textContent = fmtEUR(toeslagLuxe);
  
  // BIJGEWERKTE STASH UI
  document.getElementById("stashBasisDisplay").textContent = baseKg;
  document.getElementById("stashExtraDisplay").textContent = extraKg;
  document.getElementById("stashInfoLabel").textContent = `Upgrade kost: ${fmtEUR(stashCost)}`;
  document.getElementById("stashUpgradePrice").textContent = fmtEUR(stashCost);

  if(document.getElementById("kortingPrijs")) document.getElementById("kortingPrijs").textContent = applyDiscount ? `-${fmtEUR(kortingBedrag)}` : "€ 0";
  document.getElementById("totaalPrijs").textContent = fmtEUR(totaal);
  
  document.getElementById("locationLabel").textContent = locationText;
  document.getElementById("starLabel").textContent = `${selectedStars === 0 ? 'Standaard afwerking' : selectedStars + ' Sterren'} (+${starMultipliers[selectedStars] * 100}%)`;
  document.getElementById("kgWarningCard").style.display = shell.manualKg ? "block" : "none";

  // --- CONCEPT OFFERTE ---
  let summary = `🏠 LS PROPERTIES — OFFERTE\n`;
  summary += `━━━━━━━━━━━━━━━━━━━━\n\n`;
  summary += `PRODUCTEN:\n• Shell: ${shell.label} (${fmtEUR(shell.price)})\n• Tuin: ${tuin.label} (${fmtEUR(tuin.price)})\n\n`;
  summary += `CONFIGURATIE:\n• Locatie: ${locationText}\n• Afwerking: ${selectedStars === 0 ? 'Standaard' : '★'.repeat(selectedStars)}\n• Stash: ${enableStash ? targetKg : baseKg}kg (Basis: ${baseKg}kg)\n\n`;
  summary += `KOSTENUITSPLITSING:\n• Subtotaal Huis/Tuin: ${fmtEUR(basisBedrag)}\n`;
  if (toeslagLocatie > 0) summary += `• Locatie toeslag: ${fmtEUR(toeslagLocatie)}\n`;
  if (toeslagLuxe > 0) summary += `• Luxe afwerking: ${fmtEUR(toeslagLuxe)}\n`;
  if (stashCost > 0) summary += `• Stash upgrade (+${extraKg}kg): ${fmtEUR(stashCost)}\n`;
  if (applyDiscount) summary += `• Korting (10% over totaal): -${fmtEUR(kortingBedrag)}\n`;
  summary += `\n━━━━━━━━━━━━━━━━━━━━\nTOTAL: ${fmtEUR(totaal)}\n━━━━━━━━━━━━━━━━━━━━`;
  
  document.getElementById("msgBuy").value = summary;
}

document.addEventListener("DOMContentLoaded", () => {
  const sSel = document.getElementById("shellSelect");
  const tSel = document.getElementById("tuinSelect");
  shells.forEach((s, i) => sSel.add(new Option(`${s.label} (${fmtEUR(s.price)})`, i)));
  tuinen.forEach((t, i) => tSel.add(new Option(`${t.label} (${fmtEUR(t.price)})`, i)));

  document.querySelectorAll("select, input").forEach(el => el.addEventListener("change", recalc));
  document.getElementById("stashTargetKg").addEventListener("input", recalc);

  document.querySelectorAll(".star").forEach(s => s.addEventListener("click", () => {
    selectedStars = parseInt(s.dataset.value);
    document.querySelectorAll(".star").forEach(st => st.classList.toggle("active", parseInt(st.dataset.value) <= selectedStars));
    recalc();
  }));

  document.querySelectorAll(".loc-btn").forEach(btn => btn.addEventListener("click", () => {
    document.querySelectorAll(".loc-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    locationMultiplier = parseFloat(btn.dataset.multiplier);
    locationText = btn.dataset.label;
    recalc();
  }));

  const discBtn = document.getElementById("discountBtn");
  if(discBtn) {
    discBtn.addEventListener("click", () => {
      applyDiscount = !applyDiscount;
      discBtn.style.background = applyDiscount ? "#16a34a" : "#334155";
      discBtn.textContent = applyDiscount ? "Korting Geactiveerd (10%)" : "Pas 10% Korting Toe";
      recalc();
    });
  }

  document.getElementById("copyBuyBtn").addEventListener("click", () => {
    const ta = document.getElementById("msgBuy");
    ta.select();
    document.execCommand("copy");
    const btn = document.getElementById("copyBuyBtn");
    btn.textContent = "Gekopieerd!";
    setTimeout(() => btn.textContent = "Kopieer Offerte", 2000);
  });

  document.getElementById("resetBuyBtn").addEventListener("click", () => location.reload());
  recalc();
});