const clock = document.getElementById("clock");
if (clock) {
  const updateClock = () => {
    clock.textContent = new Date().toLocaleTimeString("pt-BR", {
      hour12: false,
    });
  };
  updateClock();
  setInterval(updateClock, 1000);
}
document.addEventListener("DOMContentLoaded", () => {
  fetch("https://blog.pablotroli.com/index.xml")
    .then((response) => response.text())
    .then((text) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "application/xml");
      const items = xml.getElementsByTagName("item");
      const posts = Array.from(items)
        .filter((item) => {
          const link = item.getElementsByTagName("link")[0].textContent;
          return link.includes("/posts/");
        })
        .slice(0, 2);
      console.log(posts);

      function parsePost(item) {
        const title = item.getElementsByTagName("title")[0].textContent;
        let link = item.getElementsByTagName("link")[0].textContent;
        const date = new Date(
          item.getElementsByTagName("pubDate")[0].textContent,
        ).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
        let descHtml = item.getElementsByTagName("description")[0].textContent;
        descHtml = descHtml
          .replace(/&amp;lt;/g, "<")
          .replace(/&amp;gt;/g, ">")
          .replace(/&amp;#x27;/g, "'")
          .replace(/&amp;#x22;/g, '\"')
          .replace(/&amp;#x2F;/g, "/")
          .replace(/&amp;#34;/g, '\"')
          .replace(/&amp;#xA;/g, "\n");
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = descHtml;
        const pTag = tempDiv.querySelector("p");
        let cleanDesc = pTag ? pTag.textContent : tempDiv.textContent;
        cleanDesc = cleanDesc.trim();
        const truncatedDesc =
          cleanDesc.split(" ").slice(0, 15).join(" ") +
          (cleanDesc.split(" ").length > 15 ? "..." : "");
        return {
          title: "Post -> " + title,
          link: link.replace("trolismind.vercel.app", "blog.pablotroli.com"),
          date: date,
          description: truncatedDesc,
        };
      }

      const parsedPosts = posts.map(parsePost);

      const container = document.getElementById("recent-posts");
      const postsHtml = parsedPosts
        .map(
          (post) => `
    <a href="${post.link}" class="card" target="_blank" rel="noopener noreferrer">
      <div class="card-label">${post.date}</div>
      <div class="card-title">${post.title}</div>
      <div class="card-desc">${post.description}</div>
      <span class="card-arrow" aria-hidden="true">read ↗</span>
    </a>
  `,
        )
        .join("");

      container.insertAdjacentHTML("beforeend", postsHtml);

      console.log(parsedPosts);
    })
    .catch((error) => console.log(error));
});

// EASTER EGG: KONAMI CODE (↑↑↓↓←→←→BA)
const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
let konamiProgress = 0;

document.addEventListener("keydown", (event) => {
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
  const msg = document.createElement("div");
  Object.assign(msg.style, {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#0e110e",
    border: "1px solid #39ff14",
    color: "#39ff14",
    fontFamily: "JetBrains Mono, monospace",
    fontSize: "13px",
    padding: "24px 32px",
    zIndex: "99999",
    textAlign: "center",
    boxShadow: "0 0 40px #39ff1433",
    lineHeight: "1.8",
  });
  msg.innerHTML = `
    <div style="color:#ffb700">// root@dev:~#</div>
    <div>$ sudo pacman -Sy Aura+Ego</div>
    <div style="color:#39ff14;margin-top:8px">[████████████████] 100%</div>
  `;
  document.body.appendChild(msg);
  const fechar = () => {
    msg.remove();
    document.removeEventListener("keydown", fechar);
  };
  setTimeout(() => {
    document.removeEventListener("keydown", fechar);
    document.addEventListener("keydown", fechar, { once: true });
  }, 300);
}

if (!document.querySelector("style[data-vim-styles]")) {
  const style = document.createElement("style");
  style.setAttribute("data-vim-styles", "");
  style.textContent = `
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .vim-active { outline: 2px solid #39ff14; outline-offset: 2px; box-shadow: 0 0 15px #39ff1466 !important; }
  `;
  document.head.appendChild(style);
}

const terminal = {
  element: null,
  input: null,
  output: null,
  history: [],
  historyIndex: -1,

  commands: {
    help: () => `
<span style="color:#ffb700">comandos disponíveis:</span>
  whoami          → quem é esse cara
  cat bio.txt     → bio completa
  neofetch        → system info
  ls              → listar seções do hub
  sudo rm -rf /   → não faça isso!!!
  clear           → limpar terminal
  exit            → fechar terminal
`,
    whoami: () =>
      `<span style="color:#39ff14">pablo troli</span> — dev, cinéfilo, usuário de Arch`,

    "cat bio.txt": () => `
Desenvolvedor de Software com experiência prática em sistemas
reais em produção, focado em automação de processos e otimização
de operações.

Formação atual em Desenvolvimento de Software Multiplataforma
na FATEC Praia Grande. Background em Ciência da Computação (UNIP)
e cursos técnicos profissionalizantes.

1 ano de experiência real — PDV pra conveniência, em produção. O resto é o que você vê nesse hub.
`,

    neofetch: () => `
<span style="color:#39ff14">    ____        __    __        ______          ___</span>
<span style="color:#39ff14">   / __ \____ _/ /_  / /___    /_  __/______  / (_)</span>
<span style="color:#39ff14">  / /_/ / __ \`/ __ \/ / __ \    / / / ___/ / / / /</span>
<span style="color:#39ff14"> / ____/ /_/ / /_/ / / /_/ /   / / / /  / /_/ / /</span>
<span style="color:#39ff14">/_/    \__,_/_.___/_/\____/   /_/ /_/   \____/_/</span>

<span style="color:#ffb700">OS</span>      Arch Linux + Hyprland
<span style="color:#ffb700">Editor</span>  Neovim
<span style="color:#ffb700">Shell</span>   zsh
<span style="color:#ffb700">Uptime</span>  4 anos estudando · 1 ano em prod
<span style="color:#ffb700">Stack</span>   NodeJS · Java · C# · PHP · SQL
<span style="color:#ffb700">Reading</span> 1984 — George Orwell
<span style="color:#ffb700">Hobby</span>   Cinefilia
<span style="color:#ffb700">Blog</span>    blog.pablotroli.com
<span style="color:#ffb700">Status</span>  <span style="color:#39ff14">■</span> open to opportunities
`,

    ls: () => `
<span style="color:#ffb700">total 4</span>
drwxr-xr-x  registros/    → blog + posts recentes
drwxr-xr-x  projetos/     → github repos
drwxr-xr-x  contato/      → links e email
-rw-r--r--  CV_PabloTroli.pdf
`,

    "sudo rm -rf /": () => `
<span style="color:#ff4444">[sudo] password for pablo:</span> ········
<span style="color:#ff4444">Permission denied.</span> Boa tentativa.
<span style="color:#4a6b4a">dica: infelizmente não existe nada pra destruir aqui ):</span>
`,

    clear: () => "__clear__",

    exit: () => "__exit__",
  },

  init() {
    const el = document.createElement("div");
    el.id = "easter-terminal";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-label", "Terminal interativo");
    el.innerHTML = `
      <div id="terminal-titlebar">
        <span style="color:#4a6b4a">dev@troli:~</span>
        <span id="terminal-close" title="fechar (Esc)">✕</span>
      </div>
      <div id="terminal-output"></div>
      <div id="terminal-inputline">
        <span style="color:#39ff14">dev@troli</span><span style="color:#4a6b4a">:</span><span style="color:#ffb700">~</span><span style="color:#4a6b4a">$</span>
        <input id="terminal-input" type="text" autocomplete="off" spellcheck="false" autofocus />
      </div>
    `;
    document.body.appendChild(el);
    this.element = el;
    this.input = el.querySelector("#terminal-input");
    this.output = el.querySelector("#terminal-output");

    this.injectStyles();

    this.print(`<span style="color:#ffb700">// terminal interativo</span>
digite <span style="color:#39ff14">help</span> para ver os comandos disponíveis.
`);

    el.querySelector("#terminal-close").addEventListener("click", () =>
      this.close(),
    );
    this.input.addEventListener("keydown", (e) => this.handleKey(e));
    el.addEventListener("click", () => this.input.focus());

    this.input.focus();
  },

  injectStyles() {
    if (document.querySelector("style[data-terminal]")) return;
    const style = document.createElement("style");
    style.setAttribute("data-terminal", "");
    style.textContent = `
      #easter-terminal {
        position: fixed;
        bottom: 48px;
        right: 24px;
        width: min(600px, calc(100vw - 48px));
        height: min(380px, calc(100vh - 120px));
        background: #0a0c0a;
        border: 1px solid #39ff14;
        box-shadow: 0 0 30px #39ff1433;
        font-family: 'JetBrains Mono', monospace;
        font-size: 12px;
        color: #c8e6c9;
        display: flex;
        flex-direction: column;
        z-index: 10000;
        animation: terminalOpen 0.15s ease;
      }

      @keyframes terminalOpen {
        from { opacity: 0; transform: translateY(10px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      #terminal-titlebar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px 12px;
        border-bottom: 1px solid #1e3a1e;
        background: #0e110e;
        font-size: 11px;
        flex-shrink: 0;
      }

      #terminal-close {
        cursor: pointer;
        color: #4a6b4a;
        transition: color 0.15s;
        user-select: none;
      }

      #terminal-close:hover { color: #ff4444; }

      #terminal-output {
        flex: 1;
        overflow-y: auto;
        padding: 10px 12px;
        line-height: 1.6;
        white-space: pre-wrap;
      }

      #terminal-output::-webkit-scrollbar { width: 4px; }
      #terminal-output::-webkit-scrollbar-track { background: transparent; }
      #terminal-output::-webkit-scrollbar-thumb { background: #1e3a1e; }

      #terminal-inputline {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 12px;
        border-top: 1px solid #1e3a1e;
        flex-shrink: 0;
      }

      #terminal-input {
        flex: 1;
        background: transparent;
        border: none;
        outline: none;
        color: #c8e6c9;
        font-family: 'JetBrains Mono', monospace;
        font-size: 12px;
        caret-color: #39ff14;
      }
    `;
    document.head.appendChild(style);
  },

  print(text) {
    this.output.innerHTML += text + "\n";
    this.output.scrollTop = this.output.scrollHeight;
  },

  handleKey(e) {
    if (e.key === "Enter") {
      const cmd = this.input.value.trim();
      this.input.value = "";

      if (!cmd) return;

      this.history.unshift(cmd);
      this.historyIndex = -1;

      this.print(
        `<span style="color:#39ff14">pablo@troli</span><span style="color:#4a6b4a">:</span><span style="color:#ffb700">~</span><span style="color:#4a6b4a">$</span> ${cmd}`,
      );

      this.execute(cmd);
    }

    // Histórico com setas
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.input.value = this.history[this.historyIndex];
      }
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.input.value = this.history[this.historyIndex];
      } else {
        this.historyIndex = -1;
        this.input.value = "";
      }
    }

    if (e.key === "Escape") this.close();
  },

  execute(cmd) {
    const fn = this.commands[cmd.toLowerCase()];

    if (!fn) {
      this
        .print(`<span style="color:#ff4444">comando não encontrado:</span> ${cmd}
<span style="color:#4a6b4a">tente: help</span>`);
      return;
    }

    const result = fn();

    if (result === "__clear__") {
      this.output.innerHTML = "";
      return;
    }

    if (result === "__exit__") {
      this.close();
      return;
    }

    this.print(result);
  },

  open() {
    if (document.getElementById("easter-terminal")) return;
    this.init();
  },

  close() {
    const el = document.getElementById("easter-terminal");
    if (el) el.remove();
  },
};

document.addEventListener("keydown", (e) => {
  if (e.altKey && e.key === "t") {
    e.preventDefault(); // evita abrir nova aba no browser
    const exists = document.getElementById("easter-terminal");
    exists ? terminal.close() : terminal.open();
  }
});
