(() => {
  const buttons = [...document.querySelectorAll('[data-lang]')];
  const translated = [...document.querySelectorAll('[data-en][data-am]')];
  function setLanguage(lang) {
    if (!['en', 'am'].includes(lang)) return;
    document.documentElement.lang = lang;
    translated.forEach(element => { element.textContent = element.dataset[lang]; });
    document.querySelectorAll('[data-label-en][data-label-am]').forEach(element => {
      element.setAttribute('aria-label', lang === 'am' ? element.dataset.labelAm : element.dataset.labelEn);
    });
    buttons.forEach(button => {
      const selected = button.dataset.lang === lang;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    try { localStorage.setItem('yasino-lang', lang); } catch (_) {}
    const toggle = document.querySelector('.menu-toggle');
    toggle.setAttribute('aria-label', toggle.getAttribute('aria-expanded') === 'true' ? (lang === 'am' ? 'ምናሌውን ዝጋ' : 'Close menu') : (lang === 'am' ? 'ምናሌውን ክፈት' : 'Open menu'));
  }
  buttons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
  let stored = null;
  try { stored = localStorage.getItem('yasino-lang'); } catch (_) {}
  setLanguage(stored === 'am' ? 'am' : 'en');
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mobile-nav');
  const closeMenu = () => {
    menu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', document.documentElement.lang === 'am' ? 'ምናሌውን ክፈት' : 'Open menu');
  };
  menuButton.addEventListener('click', () => {
    const opening = menu.hidden;
    menu.hidden = !opening;
    menuButton.setAttribute('aria-expanded', String(opening));
    menuButton.setAttribute('aria-label', opening ? (document.documentElement.lang === 'am' ? 'ምናሌውን ዝጋ' : 'Close menu') : (document.documentElement.lang === 'am' ? 'ምናሌውን ክፈት' : 'Open menu'));
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
})();
