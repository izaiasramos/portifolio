# Performance — Portfólio izaiasbessa.com.br

Documento de referência das otimizações de velocidade. **Toda alteração na LP deve considerar impacto no PageSpeed mobile** (meta: Performance ≥ 90).

**Última atualização:** 2026-06-18  
**Baseline medida:** mobile ~88–92 (Lighthouse 13, Moto G Power, 4G lenta) · desktop ~97+

---

## Regra para IA e devs

1. **Não desfazer** otimizações listadas abaixo sem motivo explícito e mensurável.
2. **Só remover ou relaxar** se a mudança **melhorar** métricas (FCP, LCP, TBT, CLS, SI) ou resolver bug crítico — e documentar o trade-off.
3. **Antes de merge/deploy:** novas imagens, scripts, fontes ou seções HTML → avaliar peso, lazy-load e compressão.
4. **Testar:** [PageSpeed Insights](https://pagespeed.web.dev/analysis?url=https://www.izaiasbessa.com.br/) mobile após mudanças relevantes.

---

## Metas (mobile)

| Métrica | Meta | Observação |
|---------|------|------------|
| Performance | ≥ 90 | Score composto Lighthouse |
| FCP | < 2,5 s | Hero + critical CSS |
| LCP | < 2,5 s | Geralmente texto do hero (sem imagem LCP) |
| TBT | 0 ms | JS mínimo no caminho crítico |
| CLS | < 0,1 | `width`/`height` em imagens |
| SEO / A11y / BP | 100 | Manter |

---

## 1. Servidor — `.htaccess` (raiz)

**Problema resolvido:** HTML/CSS/JS sem compressão (~43 KiB perdidos no documento).

| Recurso | Configuração |
|---------|--------------|
| Gzip | `mod_deflate` em HTML, CSS, JS, JSON, SVG |
| Cache | 1 ano em CSS, JS, WebP, PNG, JPEG, SVG |

**Deploy:** subir `.htaccess` via FTP na raiz. Validar header `Content-Encoding: gzip` no HTML.

**Não remover** sem alternativa (Brotli no painel Locaweb, CDN, etc.).

---

## 2. Home (`index.html`) — caminho crítico

### 2.1 Critical CSS inline

Bloco `<style>` no `<head>` (~40 linhas) cobre **hero + nav + botões** para FCP rápido sem esperar `main.css`.

- **Manter** estilos mínimos do above-the-fold inline.
- **Não** mover hero CSS só para `main.css` sem testar FCP.

### 2.2 CSS principal não bloqueante

```html
<link rel="preload" href="assets/css/main.css" as="style" />
<link rel="stylesheet" href="assets/css/main.css" media="print" onload="this.media='all'" />
```

Padrão `media="print"` + `onload` — evita render-blocking.

### 2.3 Fontes Google (non-blocking)

- `preconnect` para `fonts.googleapis.com` e `fonts.gstatic.com`
- `preload` + `onload` para stylesheet de fontes
- Fallback: `system-ui` no critical CSS e `main.css`

**Cuidado:** adicionar pesos (ex.: 300, 900) aumenta download. Usar só 400–800 Inter + 400–500 Fira Code.

### 2.4 Google Tag Manager — lazy na home **somente**

GTM carrega após **scroll, touchstart, keydown, click** ou **5s** após `load`.

- Protege FCP/LCP/TBT no mobile.
- **Não** trocar por snippet síncrono no `<head>` sem necessidade (ex.: retargeting agressivo).
- Blog e cases: GTM padrão no fim do `<body>` (aceitável — páginas internas).

`dns-prefetch` para `googletagmanager.com` permanece no head.

### 2.5 JavaScript

- `assets/js/main.js` com **`defer`** no fim do `<body>`
- Guards `if (el)` para não quebrar páginas sem form/hamburger

---

## 3. CSS — seções abaixo da dobra

Em `assets/css/main.css`:

```css
#about, #trust, #projects, #services, #agenda, #skills,
#experience, #testimonials, #faq, #contact {
  content-visibility: auto;
  contain-intrinsic-size: auto 500px;
}
```

Browser adia layout/paint até scroll → melhora **Speed Index** no mobile.

**Não aplicar** em `#hero` (LCP) nem em `nav`.

---

## 4. Imagens

### 4.1 Padrão `<picture>` + WebP

- **WebP** no `<source>`, **PNG/JPEG** no `<img>` como fallback
- Sempre **`width` e `height`** explícitos (CLS)
- **`loading="lazy"`** em tudo abaixo da dobra
- **`fetchpriority="low"`** em imagens decorativas/grandes (trust block LinkedIn)
- **`decoding="async"`** onde aplicável

### 4.2 LinkedIn (trust block) — srcset responsivo

Tamanhos gerados a partir dos PNG 1020×873:

| Arquivo | Uso |
|---------|-----|
| `*-480w.webp` | Mobile 1x |
| `*-540w.webp` | Mobile ~532px exibidos (PageSpeed) |
| `*-768w.webp` | Tablet / retina moderado |
| `*-1020w.webp` | Desktop |

**`sizes` (não usar `100vw` cegamente):**

```html
sizes="(max-width: 680px) min(calc(100vw - 104px), 872px), 872px"
```

`104px` = padding do container (28×2) + card (24×2). Card max **872px** (920 − 48).

**Gerar novos tamanhos** (exemplo):

```bash
cwebp -q 82 -resize 540 0 -m 6 original.png -o nome-540w.webp
```

**Erro que derrubou score:** servir `768w` quando slot exibe ~532px → Lighthouse penaliza ~46 KiB.

### 4.3 Outras imagens

| Asset | WebP | Notas |
|-------|------|-------|
| `minhaFoto` | `320w` | About, lazy |
| `elogio-*` | `628w` | Depoimentos |
| PageSpeed cases | PNG only | Só em `/cases/*`, lazy |

### 4.4 Ao adicionar imagem nova

1. Medir largura **exibida** no layout (DevTools)
2. Gerar WebP em 1× e 2× se necessário
3. `srcset` + `sizes` corretos
4. Não commitar PNG gigante se WebP bastar para 95% dos browsers

---

## 5. Vídeos (`assets/videos/*.webm`)

Home `#projects`:

```html
<video class="project-video" muted loop playsinline preload="none">
```

- **`preload="none"`** — não baixa até interação
- **`main.js`:** `IntersectionObserver` play/pause quando card visível
- Formato **WebM** preferido (menor que MP4)

**Não** usar `preload="auto"` na home.

---

## 6. Lazy load de terceiros (`main.js`)

| Feature | Gatilho |
|---------|---------|
| Calendly | `IntersectionObserver` na `#agenda` |
| GitHub trust preview | `IntersectionObserver` + `rootMargin: 200px` |
| Vídeos projeto | `IntersectionObserver` threshold 0.25 |

Adicionar widgets (chat, maps, embeds) → **sempre** lazy; nunca script síncrono no head da home.

---

## 7. HTML pesado (trade-offs conscientes)

| Item | Peso | Por quê mantemos |
|------|------|-------------------|
| Schema FAQPage JSON-LD | ~8 KB | Rich results Google |
| Schema Person | ~1 KB | SEO |
| DOM grande (muitas seções) | — | Conversão; mitigado com `content-visibility` |

**Se precisar enxugar HTML:** mover FAQ schema para arquivo externo **só se** Google continuar validando (hoje inline é mais confiável).

---

## 8. Páginas internas (blog, cases)

Padrão mais simples (aceitável para SEO pages):

- GTM no fim do body (não lazy)
- Fontes non-blocking (mesmo padrão)
- `main.js` defer
- Imagens com `loading="lazy"` onde possível

Mudanças na home têm **prioridade** de performance — é a LP principal.

---

## 9. Checklist antes de deploy

- [ ] Novas imagens têm WebP + `width`/`height` + lazy?
- [ ] `sizes` reflete largura real do container?
- [ ] Script novo está `defer` ou lazy?
- [ ] GTM na home continua lazy (5s)?
- [ ] `.htaccess` na raiz no FTP?
- [ ] PageSpeed mobile rodado se mudou hero, CSS crítico, imagens above/below fold ou JS inicial?

---

## 10. O que **não** fazer

| Ação | Impacto |
|------|---------|
| GTM síncrono no `<head>` da home | ↑ TBT, ↓ Performance |
| `sizes="100vw"` em imagens dentro de card estreito | Download oversized |
| Remover critical CSS inline | ↑ FCP |
| Adicionar framework (React, jQuery) | ↑ JS parse |
| Fontes extras ou `@import` no CSS | Render-blocking |
| Imagens PNG 1020px sem srcset | Peso mobile |
| Remover `.htaccess` / gzip | ↑ latência documento ~43 KiB |
| `preload="auto"` em vídeos da home | ↑ LCP/banda |

---

## 11. Histórico de otimizações (2026-06)

| Data | Mudança | Motivo |
|------|---------|--------|
| 06-18 | `.htaccess` gzip + cache | PSI: sem compactação no HTML |
| 06-18 | srcset LinkedIn 480/540/768/1020 + `sizes` corrigido | PSI: imagens 768w oversized |
| 06-18 | `content-visibility` seções below-fold | Speed Index mobile |
| 06-18 | `fetchpriority="low"` trust images | Priorizar hero |
| 06-18 | GTM lazy **5s** (era 15s) | Equilíbrio tracking vs vitals |
| 06-18 | Rejeitado: GTM imediato na home | Performance > retargeting bounce |
| 06-18 | WebP responsivo vs 560w fixo borrado | Legibilidade + peso |

---

## Referências

- Deploy: FTP manual (Locaweb) — incluir `.htaccess`
- Tracking: `STATUS.md` (GTM `GTM-M8SWJWWD`, eventos GA4)
- Retargeting adiado: `docs/gtm-retargeting.md` (não sacrificar lazy GTM sem ads)
