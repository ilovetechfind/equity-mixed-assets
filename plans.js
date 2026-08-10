// Investment Plans Data & Logic
const tierData = {
  'brass': { name: 'Brass Tier', total: 1500, returnVal: 7000, firstPay: 250, dailyPay: 50 },
  'bronze': { name: 'Bronze Tier', total: 3000, returnVal: 14000, firstPay: 500, dailyPay: 150 },
  'silver': { name: 'Silver Tier', total: 5000, returnVal: 21000, firstPay: 750, dailyPay: 170 },
  'gold': { name: 'Gold Tier', total: 15000, returnVal: 45000, firstPay: 3000, dailyPay: 480 },
  'platinum': { name: 'Platinum Tier', total: 25000, returnVal: 80000, firstPay: 7000, dailyPay: 720 },
  'super-platinum': { name: 'Super Platinum Tier', total: 50000, returnVal: 150000, firstPay: 10000, dailyPay: 1600 },
  'platinum-god': { name: 'Platinum God Tier', total: 100000, returnVal: 450000, firstPay: 20000, dailyPay: 3200 }
};

let selectedTierKey = null;

function openTierDetails(tierKey) {
  const plan = tierData[tierKey];
  if (!plan) return;

  selectedTierKey = tierKey;
  document.getElementById('tier-detail-title').innerText = plan.name;
  document.getElementById('tier-detail-name').innerText = plan.name;
  document.getElementById('tier-total-cost').innerText = '$' + plan.total.toLocaleString();
  document.getElementById('tier-return').innerText = '$' + plan.returnVal.toLocaleString();
  document.getElementById('tier-first-payment').innerText = '$' + plan.firstPay.toLocaleString();
  document.getElementById('tier-daily-payment').innerText = '$' + plan.dailyPay.toLocaleString();

  renderCalendarGrid();
  switchView('tier-details-view');
}

function renderCalendarGrid() {
  const grid = document.getElementById('calendar-grid');
  if (!grid) return;
  grid.innerHTML = '';

  for (let day = 1; day <= 35; day++) {
    const dayBox = document.createElement('div');
    dayBox.style.cssText = 'background: #0f172a; border: 1px solid #334155; border-radius: 6px; padding: 10px 5px; text-align: center; color: #94a3b8; font-size: 11px; font-weight: bold; cursor: pointer;';
    dayBox.innerHTML = `<div>D${day}</div><div style="font-size: 14px; margin-top: 2px;">⚪</div>`;
    
    dayBox.onclick = () => {
      if (dayBox.innerHTML.includes('⚪')) {
        dayBox.style.borderColor = '#10b981';
        dayBox.style.color = '#10b981';
        dayBox.innerHTML = `<div>D${day}</div><div style="font-size: 14px; margin-top: 2px;">✅</div>`;
      } else {
        dayBox.style.borderColor = '#334155';
        dayBox.style.color = '#94a3b8';
        dayBox.innerHTML = `<div>D${day}</div><div style="font-size: 14px; margin-top: 2px;">⚪</div>`;
      }
    };
    grid.appendChild(dayBox);
  }
}

function makeTierPayment() {
  const plan = tierData[selectedTierKey];
  if (!plan) return;

  alert(`Please deposit $${plan.firstPay} to make your first payment and activate the ${plan.name}.`);
  switchView('deposit-methods-view');
    }
