(() => {
  'use strict';

  /* ===== Theme ===== */
  const html = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    html.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    const isDark = theme === 'dark';
    themeBtn.textContent = isDark ? '☀️' : '🌙';
    themeBtn.setAttribute('aria-pressed', String(!isDark));
    themeBtn.setAttribute('aria-label', isDark ? 'ライトモードに切り替える' : 'ダークモードに切り替える');
  }

  const savedTheme = localStorage.getItem('theme')
    || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(savedTheme);

  themeBtn.addEventListener('click', () => {
    applyTheme(html.dataset.theme === 'dark' ? 'light' : 'dark');
  });

  /* ===== Language ===== */
  const langBtn = document.getElementById('lang-toggle');

  function applyLang(lang) {
    html.lang = lang;
    localStorage.setItem('lang', lang);
    const isJP = lang === 'ja';
    langBtn.textContent = isJP ? 'EN' : 'JP';
    langBtn.setAttribute('aria-pressed', String(!isJP));
    langBtn.setAttribute('aria-label', isJP ? 'Switch to English' : '日本語に切り替える');

    document.querySelectorAll('[data-i18n-jp]').forEach(el => {
      const text = isJP ? el.dataset.i18nJp : el.dataset.i18nEn;
      if (text !== undefined) el.textContent = text;
    });
  }

  const savedLang = localStorage.getItem('lang')
    || (navigator.language.startsWith('ja') ? 'ja' : 'en');
  applyLang(savedLang);

  langBtn.addEventListener('click', () => {
    applyLang(html.lang === 'ja' ? 'en' : 'ja');
  });

  /* ===== Scroll reveal ===== */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }
})();
