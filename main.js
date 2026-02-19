// RELÓGIO EM TEMPO REAL
const clock = document.getElementById('clock');
if (clock) {
  const updateClock = () => {
    clock.textContent = new Date().toLocaleTimeString('pt-BR', { hour12: false });
  };
  updateClock();
  setInterval(updateClock, 1000);
}

// NAVEGAÇÃO VIM (hjkl)
const vimNav = {
  items: [],
  index: 0,

  init() {
    // Seleciona links navegáveis: cards, link-items e blog
    this.items = document.querySelectorAll(
      '.card, .link-item, a[href*="github"], a[href*="linkedin"], a[href*="blog"]'
    );

    if (this.items.length === 0) return;

    document.addEventListener('keydown', (e) => this.handle(e));
    this.highlight();
  },

  handle(e) {
    const moves = { h: -1, l: 1, k: -this.colCount(), j: this.colCount() };
    if (moves[e.key?.toLowerCase()]) {
      e.preventDefault();
      this.index = Math.max(0, Math.min(this.index + moves[e.key?.toLowerCase()], this.items.length - 1));
      this.highlight();
    }
    if (e.key === 'Enter') this.items[this.index]?.click?.();
  },

  colCount() {
    const grid = this.items[0]?.closest('.card-grid');
    return grid ? Math.ceil(this.items.length / Math.ceil(this.items.length / getComputedStyle(grid).gridTemplateColumns.split(' ').length)) : 1;
  },

  highlight() {
    this.items.forEach((el, i) => el.classList.toggle('vim-active', i === this.index));
    this.items[this.index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
};

document.addEventListener('DOMContentLoaded', () => vimNav.init());

// EASTER EGG: KONAMI CODE (↑↑↓↓←→←→BA)
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiProgress = 0;

document.addEventListener('keydown', (event) => {
  if (event.key === KONAMI[konamiProgress]) {
    konamiProgress++;
    if (konamiProgress === KONAMI.length) {
      ativarEasterEgg();
      konamiProgress = 0;
    }
  } else {
    konamiProgress = event.key === KONAMI[0] ? 1 : 0;
  }
});

function ativarEasterEgg() {
  const msg = document.createElement('div');
  Object.assign(msg.style, {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#0e110e',
    border: '1px solid #39ff14',
    color: '#39ff14',
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '13px',
    padding: '24px 32px',
    zIndex: '99999',
    textAlign: 'center',
    boxShadow: '0 0 40px #39ff1433',
    lineHeight: '1.8',
  });
  msg.innerHTML = `
    <div style="color:#ffb700">// root@dev:~#</div>
    <div>$ sudo pacman -Sy Aura+Ego</div>
    <div style="color:#39ff14;margin-top:8px">[████████████████] 100%</div>
  `;
  document.body.appendChild(msg);
  const fechar = () => {
    msg.remove();
    document.removeEventListener('keydown', fechar);
  };
  setTimeout(() => {
    document.removeEventListener('keydown', fechar);
    document.addEventListener('keydown', fechar, { once: true });
  }, 300);
}

if (!document.querySelector('style[data-vim-styles]')) {
  const style = document.createElement('style');
  style.setAttribute('data-vim-styles', '');
  style.textContent = `
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .vim-active { outline: 2px solid #39ff14; outline-offset: 2px; box-shadow: 0 0 15px #39ff1466 !important; }
  `;
  document.head.appendChild(style);
}
