# pablotroli.com

> Hub pessoal — ponto central da minha presença online.

[![Live](https://img.shields.io/badge/live-pablotroli.com-39ff14?style=flat-square&labelColor=0a0c0a)](https://pablotroli.com)
[![Blog](https://img.shields.io/badge/blog-blog.pablotroli.com-ffb700?style=flat-square&labelColor=0a0c0a)](https://blog.pablotroli.com)

---

## Sobre

`pablotroli.com` é um hub que centraliza tudo que faço na internet — blog, projetos do GitHub, redes sociais e CV — num lugar só, com uma identidade visual terminal/hacker que me representa.

Construído sem frameworks, sem dependências, apenas Três arquivos

---

## Stack

- **HTML + CSS + JS puro** — sem frameworks
- **Fonts:** JetBrains Mono + Share Tech Mono (Google Fonts)
- **Hospedagem:** GitHub Pages
- **Domínio:** pablotroli.com via Cloudflare
- **Analytics:** Cloudflare Web Analytics

---

## Estrutura

```
pablotroli.com/
├── index.html          ← estrutura e semântica
├── style.css           ← identidade visual completa
├── main.js             ← clock, RSS feed, terminal, easter eggs
├── CV_PabloTroli.pdf   ← currículo disponível para download
├── og-image.png        ← imagem Open Graph
├── favicon.png         ← favicon
├── sitemap.xml         ← sitemap para indexação
├── robots.txt          ← instruções para crawlers
└── CNAME               ← domínio customizado GitHub Pages
```

---

## Decisões de arquitetura

| Decisão | Escolha | Motivo |
|---|---|---|
| Stack | HTML + CSS + JS puro | Durabilidade, zero dependências, deploy simples |
| Hospedagem | GitHub Pages | Deploy via `git push`, gratuito, simples |
| Domínio | Cloudflare | Registrar e DNS no mesmo lugar |
| Blog | Subdomínio separado | Stack independente, sem acoplamento |
| Dark mode | Não se aplica | Identidade terminal é sempre dark |
| Next.js | Descartado | Overkill, ecossistema instável |
| C# / Java | Descartado | Deploy complexo, dívida técnica alta |

---

## Versões

### v1 — identidade e estrutura
- Hub com seções: blog, projetos, links sociais
- Identidade visual terminal — verde neon `#39ff14`, âmbar `#ffb700`
- Efeito CRT com scanlines, vignette e noise texture em CSS puro
- Efeito de digitação na tagline sem JavaScript
- Clock em tempo real na status bar
- Easter egg: Konami Code (↑↑↓↓←→←→BA)
- Navegação por teclado estilo Vim (hjkl)

### v2 — conteúdo e descoberta
- RSS feed dos posts recentes do blog via `fetch()` + `DOMParser`
- CV disponível para download direto
- SEO completo — meta tags, Open Graph, Twitter Card, canonical URL
- Sitemap e robots.txt
- Favicon customizado
- Analytics via Cloudflare Web Analytics
- Terminal interativo — abre com `Alt+T`, comandos: `help`, `whoami`, `cat bio.txt`, `neofetch`, `ls`, `sudo rm -rf /`, `clear`, `exit`

---

## Links

- **Live:** https://pablotroli.com
- **Blog:** https://blog.pablotroli.com
- **Repositório:** https://github.com/DevTroli/pablotroli.com
- **Post sobre o projeto:** https://blog.pablotroli.com/posts/2026/03/hub-pablotroli/
