/**
 * SWIPE — 35-Amaliy Ish
 * Interaktiv JavaScript moduli
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initFaqAccordion();
  initContactForm();
  initStatsCounters();
});

// 1. Tungi/Kunduzgi rejim
function initTheme() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('swipe-theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);

  toggleBtn.addEventListener('click', () => {
    const active = document.documentElement.getAttribute('data-theme');
    const next = active === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('swipe-theme', next);
  });
}

// 2. FAQ Akkordeon
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}

// 3. Statstika raqamlari hisoblagichi
function initStatsCounters() {
  const stats = document.querySelectorAll('.stat-number[data-val]');
  if (!stats.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-val'), 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        let count = 0;
        const step = target / 50;

        const timer = setInterval(() => {
          count += step;
          if (count >= target) {
            el.textContent = `${prefix}${target}${suffix}`;
            clearInterval(timer);
          } else {
            el.textContent = `${prefix}${Math.floor(count)}${suffix}`;
          }
        }, 30);

        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(s => obs.observe(s));
}

// 4. Aloqa formasi
function initContactForm() {
  const form = document.getElementById('swipeContactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value;
    alert(`Rahmat, ${name}! Swipe platformasiga bo'lgan qiziqishingiz uchun minnatdormiz. Mutaxassislarimiz tez orada sizga aloqaga chiqishadi.`);
    form.reset();
  });
}

