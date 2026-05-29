/* script.js — 小山和香 Portfolio */
'use strict';

/* ============================================================
   1. Theme toggle (dark / light)
   ============================================================ */
const html        = document.documentElement;
const themeBtn    = document.getElementById('theme-toggle');
const THEME_KEY   = 'wk-theme';

function applyTheme(theme) {
  html.dataset.theme = theme;
  themeBtn.textContent = theme === 'dark' ? '🌙' : '☀️';
  localStorage.setItem(THEME_KEY, theme);
}

// 初期テーマ：保存値 → OS設定 → dark
const savedTheme = localStorage.getItem(THEME_KEY)
  || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
applyTheme(savedTheme);

themeBtn.addEventListener('click', () => {
  applyTheme(html.dataset.theme === 'dark' ? 'light' : 'dark');
});

/* ============================================================
   2. Language toggle (ja / en)
   ============================================================ */
const langBtn  = document.getElementById('lang-toggle');
const LANG_KEY = 'wk-lang';

const i18n = {
  ja: {
    'nav.about':      'About',
    'nav.skills':     'Skills',
    'nav.projects':   'Lives',
    'nav.experience': '経歴',
    'nav.contact':    'Contact',
    'hero.name':      '小山 和香',
    'hero.headline':  '音楽と旅が好きな大学生',
    'hero.cta1':      'ライブ記録を見る',
    'hero.cta2':      '連絡する',
    'about.title':    'About',
    'about.body1':    '名古屋市立大学 経済学部 会計ファイナンス学科3年。趣味は音楽を聴くこと、旅行に行くことです。大学生のうちに47都道府県を制覇することが目標です。',
    'about.body2':    '',
    'about.body3':    '',
    'about.stat1':    'ライブ参戦',
    'about.stat2':    '都道府県制覇済み',
    'about.stat3':    'ライブ歴',
    'skills.title':   'Skills',
    'skills.note':    '※ プレースホルダーです。実際のスキルに書き換えてください。',
    'skills.cat1':    'よく使う',
    'skills.cat2':    '触ったことある',
    'skills.cat3':    '好き',
    'projects.title': 'ライブ記録',
    'projects.sub':   '参戦したライブの記録です。',
    'projects.showMore': 'もっと見る',
    'filter.all':     'すべて',
    'filter.other':   'その他',
    'exp.title':              '経歴',
    'exp.item1.title':        '名古屋市立大学 経済学部 会計ファイナンス学科',
    'exp.item1.desc':         '3年生。会計・ファイナンスを専攻。',
    'exp.item2.title':        'YOUR_EXPERIENCE_TITLE',
    'exp.item2.desc':         'YOUR_EXPERIENCE_DESC',
    'contact.title':  'Contact',
    'contact.lead':   '気軽に話しかけてください！',
  },
  en: {
    'nav.about':      'About',
    'nav.skills':     'Skills',
    'nav.projects':   'Lives',
    'nav.experience': 'Experience',
    'nav.contact':    'Contact',
    'hero.name':      'Waka Koyama',
    'hero.headline':  'A college student who loves music & travel',
    'hero.cta1':      'See Live Log',
    'hero.cta2':      'Contact',
    'about.title':    'About',
    'about.body1':    "3rd-year student majoring in Accounting & Finance at Nagoya City University. I love listening to music and travelling. My goal is to visit all 47 prefectures before I graduate.",
    'about.body2':    '',
    'about.body3':    '',
    'about.stat1':    'Lives attended',
    'about.stat2':    'Prefectures visited',
    'about.stat3':    'Live history since',
    'skills.title':   'Skills',
    'skills.note':    '※ Placeholder — replace with your actual skills.',
    'skills.cat1':    'I use often',
    'skills.cat2':    'I have tried',
    'skills.cat3':    'I love',
    'projects.title': 'Live Log',
    'projects.sub':   'A record of every live I have attended.',
    'projects.showMore': 'Show more',
    'filter.all':     'All',
    'filter.other':   'Others',
    'exp.title':              'Experience',
    'exp.item1.title':        'Nagoya City University — Accounting & Finance',
    'exp.item1.desc':         '3rd year. Majoring in accounting and finance.',
    'exp.item2.title':        'YOUR_EXPERIENCE_TITLE',
    'exp.item2.desc':         'YOUR_EXPERIENCE_DESC',
    'contact.title':  'Contact',
    'contact.lead':   "Feel free to reach out anytime!",
  },
};

function applyLang(lang) {
  html.dataset.lang = lang;
  html.lang = lang === 'ja' ? 'ja' : 'en';
  langBtn.textContent = lang === 'ja' ? 'EN' : 'JA';
  localStorage.setItem(LANG_KEY, lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (i18n[lang][key] !== undefined) el.textContent = i18n[lang][key];
  });
}

const savedLang = localStorage.getItem(LANG_KEY) || 'ja';
applyLang(savedLang);

langBtn.addEventListener('click', () => {
  applyLang(html.dataset.lang === 'ja' ? 'en' : 'ja');
});

/* ============================================================
   3. Scroll fade-in (IntersectionObserver)
   ============================================================ */
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.12 }
);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ============================================================
   4. Live filter
   ============================================================ */
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    const cards = document.querySelectorAll('.live-card');
    const labels = document.querySelectorAll('.year-label');

    cards.forEach(card => {
      const match = filter === 'all' || card.dataset.artist === filter;
      card.classList.toggle('hidden', !match);
    });

    // 年ラベルを非表示にする（その年のカードが全部 hidden なら）
    labels.forEach(label => {
      const siblings = [];
      let sib = label.nextElementSibling;
      while (sib && !sib.classList.contains('year-label')) {
        if (sib.classList.contains('live-card')) siblings.push(sib);
        sib = sib.nextElementSibling;
      }
      const anyVisible = siblings.some(c => !c.classList.contains('hidden'));
      label.style.display = anyVisible ? '' : 'none';
    });
  });
});


/* ============================================================
   5. Live card modal
   ============================================================ */
const modal        = document.getElementById('live-modal');
const modalClose   = document.getElementById('modal-close');
const modalDate    = document.getElementById('modal-date');
const modalArtist  = document.getElementById('modal-artist');
const modalVenue   = document.getElementById('modal-venue');
const modalTour    = document.getElementById('modal-tour');
const modalSetlist = document.getElementById('modal-setlist');

function openModal(card) {
  const date    = card.querySelector('time').textContent;
  const artist  = card.querySelector('.live-artist').textContent;
  const venue   = card.querySelector('.live-venue').textContent;
  const tour    = card.dataset.tour || '';
  const setlist = card.dataset.setlist || '';

  modalDate.textContent   = date;
  modalArtist.textContent = artist;
  modalVenue.textContent  = venue;
  modalTour.textContent   = tour ? `🎫 ${tour}` : '';
  modalTour.style.display = tour ? '' : 'none';

  modalSetlist.innerHTML = setlist
    ? setlist.split(',').map(s => `<li>${s.trim()}</li>`).join('')
    : '<li style="color:var(--text-muted)">セットリスト未登録</li>';

  // アーティストカラーをモーダルに反映
  const colorMap = {
    vanillas: '#5b8dee', creep: '#f06292', nogizaka: '#ab47bc',
    higedan: '#43a047', orange: '#fb8c00', other: '#78909c',
  };
  const artist_class = [...card.classList].find(c => colorMap[c]);
  modalArtist.style.color = colorMap[artist_class] || 'var(--text)';

  modal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function closeModal() {
  modal.setAttribute('hidden', '');
  document.body.style.overflow = '';
}

document.querySelectorAll('.live-card').forEach(card => {
  card.addEventListener('click', () => openModal(card));
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openModal(card); });
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ============================================================
   7. Live grid — sort newest first & show only recent 2 years
   ============================================================ */
(function () {
  const grid = document.getElementById('live-grid');
  const showMoreBtn = document.getElementById('show-more-lives');
  if (!grid || !showMoreBtn) return;

  // Collect cards and sort by date descending
  const cards = [...grid.querySelectorAll('.live-card')];
  cards.sort((a, b) => {
    const da = a.querySelector('time').getAttribute('datetime');
    const db = b.querySelector('time').getAttribute('datetime');
    return db.localeCompare(da);
  });

  // Group by year (descending)
  const groups = new Map();
  cards.forEach(card => {
    const year = card.querySelector('time').getAttribute('datetime').slice(0, 4);
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year).push(card);
  });

  // Rebuild grid
  grid.innerHTML = '';
  const cutoffYear = new Date().getFullYear() - 2;
  let expanded = false;

  groups.forEach((yearCards, year) => {
    const label = document.createElement('div');
    label.className = 'year-label';
    label.textContent = year;
    grid.appendChild(label);

    const isOld = Number(year) < cutoffYear;
    if (isOld) label.classList.add('live-old', 'hidden');

    yearCards.forEach(card => {
      grid.appendChild(card);
      if (isOld) card.classList.add('live-old', 'hidden');
    });
  });

  // Re-bind card click events after rebuild
  grid.querySelectorAll('.live-card').forEach(card => {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.addEventListener('click', () => openModal(card));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openModal(card); });
  });

  // Hide button if no old cards
  const oldItems = grid.querySelectorAll('.live-old');
  if (oldItems.length === 0) showMoreBtn.style.display = 'none';

  showMoreBtn.addEventListener('click', () => {
    expanded = !expanded;
    oldItems.forEach(el => el.classList.toggle('hidden', !expanded));
    showMoreBtn.textContent = expanded ? '閉じる' : 'もっと見る';
  });
})();
