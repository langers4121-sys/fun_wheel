const tg = window.Telegram.WebApp;
tg.ready();

const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spin-btn');
const resultEl = document.getElementById('result');

const prizes = [
  'Купон 10% 🛍️',
  'Бонус 50 баллов 🏅',
  'Сюрприз 🎁',
  'Скидка 20% 📉',
  'Подарок от магазина 🎀',
  'Промокод на кофе ☕',
  'Бесплатный стикерпак 🎉',
  'VIP‑доступ на день 👑'
];

const sectorsCount = prizes.length;

// Рисуем секторы
for (let i = 0; i < sectorsCount; i++) {
  const sector = document.createElement('div');
  sector.className = `sector color-${i}`;
  sector.textContent = prizes[i];
  // Поворот сектора
  const angle = (360 / sectorsCount) * i;
  sector.style.transform = `rotate(${angle}deg)`;
  wheel.appendChild(sector);
}

let isSpinning = false;

spinBtn.addEventListener('click', () => {
  if (isSpinning) return;
  isSpinning = true;

  const randomTurns = Math.floor(Math.random() * 10) + 5; // 5–14 оборотов
  const randomOffset = Math.floor(Math.random() * 360);
  const totalDeg = randomTurns * 360 + randomOffset;

  wheel.style.transform = `rotate(${totalDeg}deg)`;

  setTimeout(() => {
    const finalAngle = totalDeg % 360;
    // Вычисляем индекс сектора по углу напротив указателя
    const sectorAngle = 360 / sectorsCount;
    // Указатель смотрит вверх (0°), значит, сектор напротив — это (360 - finalAngle) % 360
    let sectorIndex = Math.floor((360 - finalAngle) / sectorAngle);
    sectorIndex = sectorIndex % sectorsCount;

    const prize = prizes[sectorIndex];
    resultEl.textContent = `Выпало: ${prize}`;

    // Отправляем результат в бота
    tg.sendData(prize);

    isSpinning = false;
  }, 4000); // длительность анимации из CSS
});
