class ThemeSwitcher {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.init();
  }
  
  init() {
    this.createSwitcher();
    this.applyTheme();
    this.bindEvents();
  }
  
  createSwitcher() {
    const existingBemSwitcher = document.querySelector('.theme-switcher');
    if (existingBemSwitcher) {
      this.updateBemButton();
      return;
    }
    
    const existingBootstrapSwitcher = document.querySelector('.theme-switcher-bootstrap');
    if (existingBootstrapSwitcher) {
      this.updateBootstrapButton();
      return;
    }
    
    const switcher = document.createElement('div');
    switcher.className = 'theme-switcher';
    switcher.innerHTML = `
      <button class="theme-switcher__button" aria-label="Переключить тему" title="Сменить тему">
        ${this.theme === 'light' ? '🌙' : '☀️'}
      </button>
    `;
    document.body.appendChild(switcher);
  }
  
  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
    this.updateAllButtons();
  }
  
  updateAllButtons() {
    this.updateBemButton();
    this.updateBootstrapButton();
  }
  
  updateBemButton() {
    const bemButton = document.querySelector('.theme-switcher__button');
    if (bemButton) {
      bemButton.textContent = this.theme === 'light' ? '🌙' : '☀️';
      bemButton.setAttribute('aria-label', `Переключить на ${this.theme === 'light' ? 'тёмную' : 'светлую'} тему`);
    }
  }
  
  updateBootstrapButton() {
    const bootstrapButton = document.querySelector('.theme-switcher-btn');
    if (bootstrapButton) {
      bootstrapButton.textContent = this.theme === 'light' ? '🌙' : '☀️';
      bootstrapButton.setAttribute('aria-label', `Переключить на ${this.theme === 'light' ? 'тёмную' : 'светлую'} тему`);
    }
  }
  
  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
  }
  
  bindEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.theme-switcher__button')) {
        this.toggleTheme();
      }
      if (e.target.closest('.theme-switcher-btn') || e.target.closest('#themeToggle')) {
        this.toggleTheme();
      }
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 't' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ThemeSwitcher();
  
  const mainContent = document.querySelector('main');
  if (mainContent && !mainContent.id) {
    mainContent.id = 'main-content';
    mainContent.setAttribute('tabindex', '-1');
  }
});