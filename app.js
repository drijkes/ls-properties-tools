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

/* ========================== */
/* STASH BEREKENING           */
/* ========================== */
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
  if (pricePer100) pricePer100.value = 2500;

  recalcKg();
}

/* ========================== */
/* SHELLS DATABASE            */
/* ========================== */
const shellData = [
  { 
    name: "Envi Shell 03", 
    price: 35000, 
    floors: 1, 
    images: ["envi_shell_03_empty - 35K.png", "envi_shell_03_empty - 35K (2).png"] // Voorbeeld met 2 foto's
  },
  { 
    name: "Envi Shell 02", 
    price: 40000, 
    floors: 1, 
    images: ["envi_shell_02_empty - 40K .png", "envi_shell_02_empty - 40K  (2).png"] 
  },
  { 
    name: "Envi Shell 01", 
    price: 50000, 
    floors: 1, 
    images: ["Envi_shell_01_empty - 50K.png", "Envi_shell_01_empty - 50K (2).png"] 
  },
  { 
    name: "Apartment Unfurnished", 
    price: 55000, 
    floors: 1, 
    images: ["Apartment Unfurnished - 55K.png", "Apartment Unfurnished - 55K (2).png"] 
  },
  { 
    name: "House 4", 
    price: 60000, 
    floors: 1, 
    images: ["House 4 - 60K.png", "House 4 - 60K (2).png"] 
  },
  { 
    name: "House 1", 
    price: 65000, 
    floors: 1, 
    images: ["House 1 - 65K.png", "House 1 - 65K (2).png", "House 1 - 65K (3).png"] 
  },
  { 
    name: "House 2", 
    price: 100000, 
    floors: 1, 
    images: ["House 2 - 100K.png", "House 2 - 100K (2).png"] 
  },
  { 
    name: "Fury Shell 4", 
    price: 125000, 
    floors: 2, 
    images: ["Fury Shell 4 Unfurnished - 125K.png", "Fury Shell 4 Unfurnished - 125K (2).png"] 
  },
  { 
    name: "Fury Shell 5", 
    price: 140000, 
    floors: 2, 
    images: ["Fury Shell 5 Unfurnished - 140K.png", "Fury Shell 5 Unfurnished - 140K (2).png"] 
  },
  { 
    name: "Max Studio Shell", 
    price: 150000, 
    floors: 1, 
    images: ["Max Studio Shell - 150K.png", "Max Studio Shell - 150K (2).png"] 
  },
  { 
    name: "Max Luxury Apartment", 
    price: 200000, 
    floors: 1, 
    images: ["Max Luxury Appartment - 200K.png", "Max Luxury Appartment - 200K (2).png"] 
  },
  { 
    name: "Apartment Unfurnished Custom", 
    price: 250000, 
    floors: 1, 
    images: ["Apartment Unfurnished - 55K.png", "Apartment Unfurnished - 55K (2).png"] 
  },
  { 
    name: "Max Unfurnished Shell 4", 
    price: 350000, 
    floors: 2, 
    images: ["Max Unfurnished Shell 4 - 350K.png", "Max Unfurnished Shell 4 - 350K (2).png"] 
  },
  { 
    name: "Max Loft Shell 2", 
    price: 200000, 
    floors: 2, 
    images: ["Max Loft Shell 2 - 200K.png","Max Loft Shell 2 - 200K (2).png"] 
  },
  { 
    name: "Max Unfurnished Shell 2", 
    price: 225000, 
    floors: 2, 
    images: ["Max Unfurnished Shell 2 - 225K.png", "Max Unfurnished Shell 2 - 225K (2).png"] 
  },
  { 
    name: "Max Unfurnished Shell 3", 
    price: 235000, 
    floors: 2, 
    images: ["Max Unfurnished Shell 3 - 235K.png", "Max Unfurnished Shell 3 - 235K (2).png"] 
  },
  { 
    name: "Fury Shell 3", 
    price: 250000, 
    floors: 2, 
    images: ["Fury Shell 3 Unfurnished - 250K.png", "Fury Shell 3 Unfurnished - 250K (2).png"] 
  },
  { 
    name: "Fury Shell 2", 
    price: 250000, 
    floors: 2, 
    images: ["Fury Shell 2 Unfurnished - 250K.png", "Fury Shell 2 Unfurnished - 250K (2).png", "Fury Shell 2 Unfurnished - 250K (3).png"] 
  },
  { 
    name: "Fury Shell 1", 
    price: 275000, 
    floors: 2, 
    images: ["Fury Shell 1 Unfurnished - 275K.png", "Fury Shell 1 Unfurnished - 275K (2).png"] 
  },
  { 
    name: "Max Unfurnished Shell 1", 
    price: 450000, 
    floors: 2, 
    images: ["Max Unfurnished Shell 1 - 450K.png", "Max Unfurnished Shell 1 - 450K (2).png", "Max Unfurnished Shell 1 - 450K (3).png"] 
  },
  { 
    name: "Max Mansion Shell 1", 
    price: 600000, 
    floors: 2, 
    images: ["Max Mansion Shell 1 - 600K.png", "Max Mansion Shell 1 - 600K (2).png"] 
  },
  { 
    name: "2 Floor House", 
    price: 1000000, 
    floors: 2, 
    images: ["2 Floor House - 1M.png", "2 Floor House - 1M (2).png"] 
  },
  { 
    name: "Max Mansion Shell 2", 
    price: 1000000, 
    floors: 3, 
    images: ["Max Mansion Shell 2 - 1M.png", "Max Mansion Shell 2 - 1M (2).png"] 
  },
  { 
    name: "Max Mansion Shell 3", 
    price: 2000000, 
    floors: 3, 
    images: ["Max Mansion Shell 3 - 2M.png"] 
  },
  { 
    name: "Deluxe Housing 1", 
    price: 1500000, 
    floors: 3, 
    images: ["Deluxe Housing 1 - 1.5M.png", "Deluxe Housing 1 - 1.5M (2).png"] 
  },
  { 
    name: "Deluxe Housing 2", 
    price: 650000, 
    floors: 2, 
    images: ["Deluxe Housing 2 - 650K.png", "Deluxe Housing 2 - 650K (2).png"] 
  },
  { 
    name: "Deluxe Housing 3", 
    price: 1000000, 
    floors: 2, 
    images: ["Deluxe Housing 3 - 1M.png", "Deluxe Housing 3 - 1M (2).png"] 
  }
];

/* ========================== */
/* SHELL FILTER LOGICA        */
/* ========================== */
function filterShells() {
  const floorFilter = document.getElementById('filterFloors').value;
  const container = document.getElementById('shellResults');
  
  if (!container) return;
  container.innerHTML = "";

  container.style.display = "grid";
  container.style.gridTemplateColumns = "repeat(auto-fill, minmax(300px, 1fr))";
  container.style.gap = "20px";

  const filtered = shellData.filter(shell => {
    return floorFilter === "all" || 
           (floorFilter === "3" ? shell.floors >= 3 : shell.floors == floorFilter);
  });

  if (filtered.length === 0) {
    container.innerHTML = "<p style='grid-column: 1/-1; text-align: center; padding: 40px;'>Geen shells gevonden.</p>";
    return;
  }

  filtered.forEach((shell, shellIndex) => {
    const card = document.createElement('div');
    card.className = "buy-card";
    card.style = "display: flex; flex-direction: column; padding: 0; overflow: hidden; height: 100%; border: 1px solid var(--border); border-radius: 12px; background: rgba(15, 23, 42, 0.8); position: relative;";
    
    let imagesHtml = '';
    shell.images.forEach(imgName => {
      imagesHtml += `<img src="img/shells/${imgName}" style="min-width:100%; width:100%; height:250px; object-fit:cover; scroll-snap-align: start;" onerror="this.src='logo.png';">`;
    });

    // We voegen knoppen toe als er meer dan 1 foto is
    const hasMultiple = shell.images.length > 1;
    const controlsHtml = hasMultiple ? `
      <div style="position: absolute; top: 110px; width: 100%; display: flex; justify-content: space-between; padding: 0 10px; pointer-events: none;">
        <button onclick="document.getElementById('slider-${shellIndex}').scrollBy({left: -300, behavior: 'smooth'})" style="pointer-events: auto; background: rgba(0,0,0,0.5); color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer;">❮</button>
        <button onclick="document.getElementById('slider-${shellIndex}').scrollBy({left: 300, behavior: 'smooth'})" style="pointer-events: auto; background: rgba(0,0,0,0.5); color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer;">❯</button>
      </div>
    ` : '';

    card.innerHTML = `
      <div style="position: relative; height: 250px;">
        <div id="slider-${shellIndex}" class="img-slider" style="width:100%; height:250px; display:flex; overflow-x:auto; scroll-snap-type: x mandatory; border-bottom: 1px solid var(--border); scrollbar-width: none; -ms-overflow-style: none;">
          ${imagesHtml}
        </div>
        ${controlsHtml}
      </div>
      <div style="padding: 15px; flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <strong style="font-size:17px; display:block; margin-bottom:5px;">${shell.name}</strong>
          <div class="muted" style="font-size:13px;">${shell.floors} Verdieping(en) ${hasMultiple ? '• <span style="color:var(--gold)">' + shell.images.length + ' Foto\'s</span>' : ''}</div>
        </div>
        <div style="color: var(--gold); font-weight: 800; margin-top: 15px; font-size:19px;">
          ${fmtEUR(shell.price)}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}
/* ========================== */
/* INITIALISATIE              */
/* ========================== */
function wireUp() {
  // Voor de Stash pagina
  const calcBtn = document.getElementById("calcBtn");
  const resetBtn = document.getElementById("resetBtn");
  if (calcBtn) calcBtn.addEventListener("click", recalcKg);
  if (resetBtn) resetBtn.addEventListener("click", resetAll);

  ["curKg", "targetKg", "pricePer100"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", recalcKg);
  });

  if (document.getElementById("totalKg")) recalcKg();

  // Voor de Shells pagina
  if (document.getElementById('shellResults')) {
    filterShells();
  }
}

document.addEventListener('DOMContentLoaded', wireUp);