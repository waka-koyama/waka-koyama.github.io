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
    'about.body1':    '名古屋市立大学 経済学部 会計ファイナンス学科の3年生です。数字と向き合う日々を送りながら、週末はライブハウスかどこかの街にいることが多いです。',
    'about.body2':    '音楽はずっと好きで、特にgo!go!vanillasとクリープハイプはもう何度行ったか数えられないくらい。ライブって、同じ曲でも毎回ぜんぜん違うから飽きないんですよね。',
    'about.body3':    '旅行も大好きで、大学生のうちに47都道府県を全部まわるのが目標です。まだまだ行けてない県があるので、ちょっとずつ制覇していきます。',
    'about.stat1':    'ライブ参戦',
    'about.stat2':    '都道府県制覇が目標',
    'about.stat3':    'ライブ歴',
    'skills.title':   'Skills',
    'skills.note':    '※ プレースホルダーです。実際のスキルに書き換えてください。',
    'skills.cat1':    'よく使う',
    'skills.cat2':    '触ったことある',
    'skills.cat3':    '好き',
    'projects.title': 'ライブ記録',
    'projects.sub':   '参戦したライブの記録です。',
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
    'about.body1':    "I'm a 3rd-year student majoring in Accounting & Finance at Nagoya City University. On weekdays I crunch numbers; on weekends I'm usually at a live venue or exploring a new city.",
    'about.body2':    "I've been to more go!go!vanillas and Creep Hyp shows than I can count. Every live feels different even with the same setlist — that's what keeps me coming back.",
    'about.body3':    "I also love travelling and my goal is to visit all 47 prefectures before I graduate. Still plenty left to tick off!",
    'about.stat1':    'Lives attended',
    'about.stat2':    'Prefectures — my goal',
    'about.stat3':    'Live history since',
    'skills.title':   'Skills',
    'skills.note':    '※ Placeholder — replace with your actual skills.',
    'skills.cat1':    'I use often',
    'skills.cat2':    'I have tried',
    'skills.cat3':    'I love',
    'projects.title': 'Live Log',
    'projects.sub':   'A record of every live I have attended.',
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
const liveCards  = document.querySelectorAll('.live-card');
const yearLabels = document.querySelectorAll('.year-label');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    liveCards.forEach(card => {
      const match = filter === 'all' || card.dataset.artist === filter;
      card.classList.toggle('hidden', !match);
    });

    // 年ラベルを非表示にする（その年のカードが全部 hidden なら）
    yearLabels.forEach(label => {
      // 次の兄弟要素のうち live-card を収集（次の year-label まで）
      const cards = [];
      let sib = label.nextElementSibling;
      while (sib && !sib.classList.contains('year-label')) {
        if (sib.classList.contains('live-card')) cards.push(sib);
        sib = sib.nextElementSibling;
      }
      const anyVisible = cards.some(c => !c.classList.contains('hidden'));
      label.style.display = anyVisible ? '' : 'none';
    });
  });
});
