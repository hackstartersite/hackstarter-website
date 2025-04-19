const CURRENCY_KEY = 'hackstarter-currency';
let cachedCurrency = null;

// SAFELY get currency
function getCurrency() {
  const raw = localStorage.getItem(CURRENCY_KEY);
  const parsed = parseInt(raw, 10);
  if (isNaN(parsed)) {
    console.warn(`[getCurrency] WARNING: invalid or missing value in localStorage, defaulting to 0 (got: ${raw})`);
    return 0;
  }
  return parsed;
}

// Set currency
function setCurrency(amount) {
  localStorage.setItem(CURRENCY_KEY, String(amount));
}

// Add currency and log it
function addCurrency(amount) {
  const current = getCurrency();
  const newTotal = current + amount;
  console.log(`[addCurrency] ${current} + ${amount} = ${newTotal}`);
  setCurrency(newTotal);
}

// Update balance display
function showCurrencyBalance() {
  const el = document.getElementById('currency-display');
  const balance = getCurrency();
  if (el) el.textContent = `💰 H$ ${balance}`;
  console.log(`[showCurrencyBalance] Balance shown: H$ ${balance}`);
}

// Reward once per section
function rewardSection(sectionId, amount = 5) {
    const rewardKey = `${sectionId}-rewarded`;
    const alreadyRewarded = localStorage.getItem(rewardKey);
    const isComplete = true;
  
    console.log(`📦 [rewardSection] Checking section: ${sectionId}`);
    console.log(`🔑 Reward key: ${rewardKey}`);
    console.log(`📜 Already rewarded:`, alreadyRewarded);
    console.log(`✅ Is complete:`, isComplete);
  
    if (isComplete && !alreadyRewarded) {
      console.log(`💸 REWARDING with ${amount} H$!`);
      addCurrency(amount);
      localStorage.setItem(rewardKey, 'true');
    } else {
      console.log(`🛑 SKIPPED — either already rewarded or incomplete`);
    }
  }
  

// Make sure all functions are globally available
window.getCurrency = getCurrency;
window.setCurrency = setCurrency;
window.addCurrency = addCurrency;
window.showCurrencyBalance = showCurrencyBalance;
window.rewardSection = rewardSection;
