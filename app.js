// Параметры
const BASE_PRICE = Number(document.querySelector('#price')?.dataset.base || 7500);
// Промокоды: ключ => скидка в %
const PROMOS = { "EKB10":10, "FRIEND15":15, "VIP20":20 };

const priceEl = document.getElementById('price');
const toPayEl = document.getElementById('toPay');
const promoInput = document.getElementById('promo');
const payBtn = document.getElementById('payBtn');

// Обновление цены
function updatePrice(discount = 0){
  const final = Math.round(BASE_PRICE * (100 - discount) / 100);
  const formatted = final.toLocaleString('ru-RU') + ' ₽';
  toPayEl.textContent = formatted;
  return final;
}
updatePrice();

// Применение промокода по вводу
promoInput?.addEventListener('input', () => {
  const code = promoInput.value.trim().toUpperCase();
  const discount = PROMOS[code] || 0;
  updatePrice(discount);
});

// Переход к оплате (подставь реальную ссылку платёжки)
payBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  const code = (promoInput?.value || '').trim().toUpperCase();
  const discount = PROMOS[code] || 0;
  const amount = updatePrice(discount);

  // TODO: вставь ссылку твоего провайдера (ЮKassa/CloudPayments/etc.)
  // Ниже — пример редиректа на плательную ссылку с параметрами.
  const PAYMENT_LINK = "https://your-payment-provider.example/pay";
  const url = new URL(PAYMENT_LINK);
  url.searchParams.set("amount", amount);
  url.searchParams.set("desc", "Krav Maga Seminar Ekaterinburg");
  if (code) url.searchParams.set("promo", code);
  window.open(url.toString(), '_blank');
});

// Якорная плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href');
    if(id.length>1){ e.preventDefault(); document.querySelector(id).scrollIntoView({behavior:'smooth'}); }
  })
});

// Отправка формы: добавим источник
document.getElementById('regForm')?.addEventListener('submit',(e)=>{
  // Formspree примет POST и покажет success-страницу. Можно добавить hidden-поля.
});
