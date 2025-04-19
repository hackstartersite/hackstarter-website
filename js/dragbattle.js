// battle.js

const cards = document.querySelectorAll('.card');
const zones = document.querySelectorAll('.dropzone');
const draggables = document.getElementById('draggables');
const overlay = document.getElementById('overlay');
const flagText = document.getElementById('flagText');

// Drag behavior
cards.forEach(card => {
  card.addEventListener('dragstart', () => {
    card.classList.add('dragging');
  });

  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
    checkBattleResult();
  });
});

zones.forEach(zone => {
  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
    const dragging = document.querySelector('.dragging');
    if (dragging) zone.appendChild(dragging);
  });
});

function checkBattleResult() {
  const allCards = document.querySelectorAll('.card');
  let correct = 0;

  allCards.forEach(card => {
    const parentZone = card.parentElement.dataset.zone;
    const answer = card.dataset.answer;
    if (parentZone === answer) correct++;
  });

  if (correct === allCards.length) {
    localStorage.setItem("lesson1-battle", "true");
    flagText.textContent = "🏳️ You’ve placed everything correctly. White Hat wins!";
    overlay.style.display = 'flex';

    console.log('testing')
    rewardSection('lesson1.1-battle', 15);
    showCurrencyBalance();

  }
}

function restartBattle() {
  overlay.style.display = 'none';
  document.querySelectorAll('.card').forEach(card => {
    draggables.appendChild(card);
  });
}
