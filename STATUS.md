# Status do Portfolio — Roadmap de Profissionalismo + Captação

Documento de acompanhamento das melhorias para passar mais autoridade e converter visitantes em clientes (PMEs em geral).

**Última atualização:** 2026-06-21 — **roadmap concluído** · site em produção e validado

**Status geral:** nenhuma pendência bloqueante. Próximos passos são opcionais (marketing, conteúdo, retargeting) — ver seção [🔮 Futuro](#-futuro-quando-fizer-sentido).

---

## ✅ Etapa de autoridade + copy — Concluída (2026-06-16)

Refino pós-Fase 4.3 — site pronto para captar e converter; esta rodada focou em **credibilidade verificável** e **expectativas honestas**.

### O que foi feito
- [x] **PageSpeed nos cases** — Jéssica 97 desktop · Bruna 100 mobile + screenshots em `assets/img/pagespeed-*.png`
- [x] **Cases reescritos** — home + rotas internas + blog + internal linking (não “página única”)
- [x] **Copy SEO honesta** — sem promessa de 1ª página; FAQ “Meu site vai aparecer no Google?”
- [x] **Smart Fit e Amazônia Azul** citados nominalmente (trust block + `#projects`)
- [x] **About** — foto + citação em 1ª pessoa (substitui vídeo de intro)
- [x] **Trust block credenciais** — certificações removidas; GitHub (preview API) + 3 prints LinkedIn
- [x] **Layout trust** — GitHub em cima, LinkedIn embaixo, centralizado; container **1240px**
- [x] **Tracking GTM/GA4** — eventos renomeados, publicados e validados (Fase 4.1–4.3)

### Imagens adicionadas (`assets/img/`)
- `pagespeed-ansiedadepsicologa.com.br.png`
- `pagespeed-brubspsi.com.br.png`
- `experiencia-linkedin.png`
- `formacao-academica-linkedin.png`
- `competencia-linkedin.png`

---

## ✅ Tracking & Analytics — Concluído (2026-06-15)

Infraestrutura de medição de conversão **100% operacional** em `izaiasbessa.com.br`.

**Container GTM:** `GTM-M8SWJWWD`  
**GA4 Measurement ID:** `G-7VTBPHNPE7`

### Eventos ativos (código ↔ GTM ↔ GA4)

| Evento `dataLayer` | Tag GTM | O que mede |
|---|---|---|
| `cta_whatsapp_clicked` | `cta_whatsapp_clicked` | Cliques em CTAs WhatsApp |
| `interaction` | `Interaction` | Demais cliques com `data-section` / `data-button` |
| `contact_form_submitted_to_whatsapp` | `Submit Form Lead` | Formulário de contato enviado (antes de abrir WhatsApp) |
| `blog_pdf_form_submitted_success` | `Download PDF no form Blog` | Lead magnet (PDF) nos posts do blog |
| `blog_index_newsletter_form_submitted` | `Form Submitted na pagina inicial do blog` | Newsletter na listagem do blog |

### O que foi feito nesta etapa final
- [x] Renomeação dos eventos no `assets/js/main.js` (nomes descritivos substituíram `lead_whatsapp`, `form_submit_success`, `lead_magnet_download`, `newsletter_signup`)
- [x] Tags e triggers recriados/atualizados no GTM com os novos nomes
- [x] Container GTM **publicado**
- [x] Deploy do site com o `main.js` atualizado
- [x] Validação ponta a ponta via GTM Preview / Tag Assistant — todos os eventos disparando corretamente com parâmetros `data_section`, `data_button`, `landing_page`

### Parâmetros enviados em todos os eventos de conversão
- `data-section` — seção da página onde o usuário interagiu
- `data-button` — identificador do botão/link clicado
- `landing_page` — URL ou pathname de origem

> **Nota:** eventos antigos (`lead_whatsapp`, `form_submit_success`, `lead_magnet_download`, `newsletter_signup`) foram **descontinuados**. Histórico no GA4 anterior a jun/2026 usa os nomes antigos.

---

## ✅ Fase 1 — Concluída

### 1.1 Tracking de eventos (GTM + dataLayer)
Implementado seguindo o mesmo padrão da LP da psicóloga Jéssica.

- GTM lazy-loaded no `<head>` — só injeta o script após primeira interação (`scroll`, `touchstart`, `keydown`, `click`) ou 15s pós-`load`. Protege Core Web Vitals.
- `<noscript>` iframe do GTM logo após `<body>`
- `dns-prefetch` para `googletagmanager.com`
- Listener global de cliques que captura `data-section` + `data-button` e dispara `dataLayer.push`:
  - `event: cta_whatsapp_clicked` para links `wa.me/*`
  - `event: interaction` para os demais
- Atributos `data-section` e `data-button` adicionados em **todos** os CTAs (nav desktop, nav mobile, hero, sobre, projetos, serviços, FAQ, contato, footer, botões flutuantes)

> ✅ **Resolvido em 2026-05-26 (Fase 4.1):** ID real `GTM-M8SWJWWD` instalado nas 12 posições (6 páginas × 2). Snippet lazy-load do `<head>` foi substituído pelo snippet padrão do GTM no fim do `<body>` para todas as páginas, mantendo o `dns-prefetch` no head.

### 1.2 Formulário de contato — privacidade + tracking
- Submit mostra mensagem de sucesso visualmente
- Aguarda **2 segundos** antes de abrir o WhatsApp (delay para GTM capturar o evento via seletor CSS)
- Push manual de `event: contact_form_submitted_to_whatsapp` no `dataLayer`
- Mantém o redirecionamento para WhatsApp como mecanismo principal (sem backend novo)

### 1.3 Nova seção Serviços/Pacotes
3 cards de serviços entre `#projects` e `#skills`:

1. **Site Profissional** — a partir de R$ 1.500 — landing/institucional, prazo 5–10 dias úteis
2. **Sistema Web Sob Medida** — orçamento personalizado — badge "Mais procurado", prazo 4+ semanas
3. **Automação & Consultoria** — por hora ou pacote — APIs, bots, GTM, dashboards

Cada card tem:
- Lista de entregáveis (✓)
- Cliente ideal e prazo
- CTA WhatsApp pré-preenchida com o serviço específico

### 1.4 Nova seção FAQ
9 perguntas frequentes antes de `#contact`, cobrindo as objeções típicas de PME (inclui **“Meu site vai aparecer no Google? Você garante posição?”** — resposta honesta sobre SEO técnico vs. ranqueamento).

Implementação:
- `<details>`/`<summary>` nativos — funciona sem JS
- Schema.org `FAQPage` JSON-LD no `<head>` — gera rich results no Google
- CTA WhatsApp ao final ("Não achei minha dúvida")

### 1.5 SEO técnico
- `sitemap.xml` na raiz com **6 URLs** (home, 2 cases, blog index, 2 posts) — `lastmod` home + cases atualizado **2026-06-16**
- `robots.txt` apontando para o sitemap

### 1.6 Refinamento de stats
A stat "100% Entregas no prazo" virou **"24h — Resposta em até 24h"** (mais verificável e cria expectativa concreta).

Outras stats mantidas:
- 2+ Anos atuando
- 25+ Projetos entregues
- 10+ Tecnologias no stack

### 1.7 Navegação atualizada
- Nav desktop e mobile agora incluem **Serviços** e **FAQ**
- WhatsApp links pré-preenchidos com mensagem contextual em cada CTA

---

## ✅ Fase 2 — Concluída (Case Studies + Autoridade)

### 2.1 Extração de CSS/JS ✓
- `<style>` migrado para `assets/css/main.css` (24KB)
- `<script>` final migrado para `assets/js/main.js` (5KB) com `defer`
- `index.html` agora carrega externamente — caiu de **76KB → 49KB**
- JS recebeu guards `if (el)` em torno dos `addEventListener` para não quebrar nas páginas de case (que não têm hamburger/form/scroll-top)

### 2.2 Páginas dedicadas de case study ✓
Criadas:
- `cases/jessica-lopes/index.html` — Site de captação (home + rotas internas + blog)
- `cases/bruna-bessa/index.html` — Site multi-página + blog
- `cases/case.css` — estilos compartilhados pelos dois cases (~6KB)

**Template aplicado em cada página:**
- Hero com `<title>` + meta description + Schema.org `CreativeWork` próprios
- Bar de metadados (Cliente / Setor / Entrega / Site)
- Vídeo do projeto reutilizando `.project-video` (lazy play funciona)
- **01 — O Desafio** | **02 — Abordagem** | **03 — Stack** | **04 — Resultado** (com `position:sticky` no label)
- Depoimento embarcado reaproveitando `.testimonial-card` + screenshot do WhatsApp
- CTA final com 2 botões (WhatsApp pré-preenchido + link para `/#services`)
- GTM lazy-load + `data-section`/`data-button` em todos os CTAs
- Voltar aos projetos no nav e no hero

Cards de `#projects` no `index.html` atualizados:
- "Ver case completo →" (link primário, aponta para `cases/...`)
- "Site ao vivo ↗" (link secundário muted)

### 2.3 Métricas de resultado críveis ✓
Cada case tem 4 cards de resultado, focando no observável:

- **Performance Lighthouse comprovada** — Jéssica: 97 desktop · Bruna: 100 mobile (screenshots em `assets/img/pagespeed-*.png`)
- **SEO técnico entregue** (Schema, sitemap, meta) — sem promessa de posição ou indexação rápida no Google
- **GTM rastreando cliques de WhatsApp** (Jéssica) ou **3+ pontos de conversão por página** (Bruna)
- **100% mobile-first responsivo**

> ✅ **Resolvido em 2026-06-16:** scores reais inseridos nos cases com screenshots do PageSpeed Insights. Falta só rodar mobile da Jéssica se quiser comparar apple-to-apple com a Bruna.

### 2.4 Trust Block ✓
Nova `<section id="trust">` entre `#about` e `#projects`, com 2 grids:

**Clientes/projetos** (4 cards):
- 🏋️ **Smart Fit** · via Wv_todoz · LPs, APIs e tracking (projeto em andamento)
- ⚓ **Amazônia Azul Tecnologias de Defesa** · sistema de votação · setor defesa
- 🧠 Psicólogas independentes · 2 sites em produção (Jéssica + Bruna)
- 🤖 SaaS de captação · RoboZe · responsável principal

**Credenciais** (layout vertical centralizado — 2026-06-16):
- **GitHub aberto** (topo) → preview ao vivo via API (`@izaiasramos`, repos públicos) + link
- **LinkedIn ativo** (abaixo) → 3 prints com labels (Experiência, Formação, Competências) + link perfil completo

> ⏸️ **Fora do escopo:** certificações formais (Rocketseat, Alura, etc.) — LinkedIn + GitHub cobrem prova social por enquanto.

---

## ✅ Fase 3.3 — Concluída (Blog seed)

### Arquivos criados
- `blog/index.html` — listagem dos 2 posts com Schema.org `Blog` + `BlogPosting` resumido no head
- `blog/como-escolher-desenvolvedor-pme/index.html` — post 1 (~9 min de leitura)
- `blog/site-profissional-quanto-custa/index.html` — post 2 (~11 min de leitura)
- `blog/blog.css` — estilos compartilhados (~6KB): hero, cards, body do post (h2/h3/ul/ol/blockquote/callout), seção related e CTA final

### Padrões aplicados em cada post
- Schema.org `BlogPosting` no `<head>` (datePublished, author, mainEntityOfPage)
- Open Graph + Twitter Card próprios
- GTM + `data-section`/`data-button` em todos os CTAs (ID real `GTM-M8SWJWWD` instalado em 2026-05-26)
- Hero com tag, h1 e subtítulo + link "Voltar ao blog"
- Seção "Continue lendo" com 1 post relacionado + link pra `/#services` (internal linking)
- CTA final WhatsApp pré-preenchido com a mensagem do artigo lido
- Reaproveitamento total de `assets/css/main.css` (não duplica nada)

### Conteúdo (rascunho honesto, sem promessa milagrosa)
**Post 1 — "Como escolher um desenvolvedor para sua PME"**
- 7 sinais de alerta (portfólio inverificável, prazo curto demais, orçamento sem detalhamento, código preso, sem SEO, sumiço de comunicação, sem contrato)
- 4 perguntas pra fazer na primeira conversa
- Resumo prático do que esperar de um bom profissional

**Post 2 — "Quanto custa um site profissional? Faixas reais para PMEs em 2026"**
- 4 faixas explicadas: até R$ 1.500 / R$ 1.500–4.000 / R$ 4.000–12.000 / acima de R$ 12.000
- Cada faixa: pra quem é, o que entra, o que NÃO entra, prazo realista
- Por que o "barato" sai caro depois (5 armadilhas comuns)
- Itens que quase nunca estão inclusos (domínio, hospedagem, conteúdo, manutenção, tráfego pago)
- Como pedir um orçamento que faz sentido

### Integração com o site
- Link "Blog" adicionado ao nav desktop, nav mobile e seção "Navegação" do footer do `index.html`
- `sitemap.xml` atualizado: agora **10 URLs** (3 do blog adicionadas com lastmod 2026-05-22)

> ✅ **Resolvido em 2026-05-26 (Fase 4.1):** ID real `GTM-M8SWJWWD` instalado em todas as páginas do blog também.

---

## ✅ Fase 3.1 — Concluída (Calendly)

### 3.1 Calendly embed ✓
- Nova `<section id="agenda">` entre `#services` e `#skills`
- URL: `https://calendly.com/izaiasr232/30min`
- Embed inline lazy-loaded via `IntersectionObserver` — script do Calendly só é injetado quando a seção entra no viewport
- Tema escuro via query params: `background_color=0a0a0f`, `text_color=f0f0f5`, `primary_color=7c6af7`
- GDPR banner oculto (`hide_gdpr_banner=1`)
- Fallback WhatsApp pré-preenchido com `data-section="agenda"` para GTM
- Link "Agenda" adicionado ao nav desktop, nav mobile e footer (navegação)
- Estilos em `assets/css/main.css` (`.agenda-*`)
- JS em `assets/js/main.js` (bloco `// Calendly lazy load`)

---

## ✅ Fase 3.2 — Concluída (Apresentação pessoal)

### 3.2 Foto + texto no about ✓
- Bloco `about-quote` na seção `#about` — foto existente + texto em 1ª pessoa (substitui vídeo de intro)
- Sem impacto em LCP (imagem lazy, sem vídeo pesado)

---

## 📌 Fase 3 — Restante

*Nenhum item bloqueante pendente na Fase 3.*

---

## ✅ Checklist de deploy e validação — Concluído (2026-06-21)

Todos os itens operacionais foram feitos. Nada bloqueia novos deploys.

- [x] GTM real (`GTM-M8SWJWWD`) em todas as páginas — **2026-05-26**
- [x] Tags GTM para todos os eventos de conversão — **2026-06-15**
- [x] GA4 conectado (`G-7VTBPHNPE7`) — publicado e validado
- [x] `sitemap.xml` submetido no Google Search Console — **2026-06-18** (reenviar só após publicar conteúdo novo)
- [x] Rich results validados — `Person` + `FAQPage` (home), `CreativeWork` (cases), `Blog` + `BlogPosting` (blog)
- [x] Lighthouse (mobile + desktop) nas **11 URLs** do sitemap — metas atingidas
- [x] PageSpeed real nos cases — Bruna 100 mobile, Jéssica 97 desktop + screenshots
- [x] Formulário testado em iPhone Safari e Android Chrome (sucesso + WhatsApp após ~2s)
- [x] Botões flutuantes WhatsApp e "Voltar ao topo" sem sobreposição
- [x] Navegação home → case → home nos 2 cases

---

## 🔮 Futuro (quando fizer sentido)

Itens **fora do escopo atual** — retomar conforme tráfego, budget ou autorização de clientes.

### Marketing e analytics
- [ ] **Retargeting** (Fase 4.6) — Meta Pixel + Google Ads quando houver 50+ visitas/semana e budget R$ 200–500/mês · guia: `docs/gtm-retargeting.md`
- [ ] **Microsoft Clarity** — heatmaps e session replay (~15 min, tag Custom HTML no GTM)

### Conteúdo e SEO contínuo
- [ ] Novos posts no blog (SEO de longo prazo)
- [ ] Reenviar `sitemap.xml` no Search Console após cada lote de conteúdo novo
- [ ] PageSpeed **mobile** do case Jéssica (opcional — paridade visual com Bruna)

### Expansão (só com autorização)
- [ ] Cases dedicados Smart Fit / Amazônia Azul / RoboZe
- [ ] Logos oficiais de clientes no trust block
- [ ] Depoimentos em vídeo
- [ ] Mini-landings `/sites`, `/sistemas`, `/automacao`
- [ ] Certificações formais no trust block

---

## 🚀 Fase 4 — Captação & Conversão (auditoria 2026-05-26)

**Diagnóstico geral:** o portfólio tem boa **carcaça de conversão** (CTAs contextuais, WhatsApp pré-preenchido, FAQ, Calendly, funil claro), mas hoje **perde leads** por 3 buracos críticos que serão atacados nesta fase. Nada será removido — todas as melhorias somam.

### Princípio orientador
**Não remover seções existentes.** Cada melhoria deve **somar** ao funil atual, nunca cortar. Se algo está fraco, fortalecemos com mais conteúdo, prova ou CTA. Foco em maximizar conversão sem perder o que já está consolidado.

---

### ✅ Fase 4.1 — Ativar tracking real (CONCLUÍDA — 2026-06-15)

**Container GTM:** `GTM-M8SWJWWD`  
**GA4 Measurement ID:** `G-7VTBPHNPE7`

**✅ O que foi feito (2026-05-26 → 2026-06-15):**
- [x] Conta GTM criada e container `GTM-M8SWJWWD` ativo
- [x] Snippet GTM padrão instalado nas **6 páginas** (12 posições — script + noscript)
- [x] **GA4 Configuration tag** criada no GTM (Measurement ID `G-7VTBPHNPE7`)
- [x] Tags GA4 para `cta_whatsapp_clicked` e `interaction` — validadas em produção
- [x] Renomeação de eventos no código e realinhamento completo GTM ↔ `main.js` (2026-06-15)
- [x] Container GTM **publicado** após correção de triggers
- [x] Validação ponta a ponta: Tag Assistant confirma dispatch com payload correto

**🔮 Opcional, fase posterior:**
- Microsoft Clarity para heatmaps e session replay — adicionar como tag Custom HTML no GTM

---

### ✅ Fase 4.2 — Persistir formulário (CONCLUÍDA — 2026-05-28)

**Problema resolvido:** submit do formulário agora persiste o lead via Vercel Serverless antes de abrir o WhatsApp. Zero lead perdido se o prospect fechar a aba.

**Arquitetura implementada:**
```
[Form no browser]
  └─ fetch POST → https://portifolio-api-iota.vercel.app/api/contact
                        └─ Vercel Serverless Node.js (portifolio-api)
                              └─ Resend API → izaiasr232@gmail.com
  └─ dataLayer.push(contact_form_submitted_to_whatsapp)
  └─ setTimeout(2s) → window.open WhatsApp
```

**O que foi feito:**
- [x] Repositório `portifolio-api` criado — `api/contact.js` (Node.js serverless), `package.json` (dep: `resend`), `.gitignore`
- [x] Endpoint `/api/contact` com: CORS restrito a `izaiasbessa.com.br`, honeypot anti-spam, validação de campos obrigatórios, envio via Resend
- [x] Deploy na **Vercel** (plano Hobby, repo público no GitHub `izaiasramos/portifolio-api`)
- [x] Variáveis de ambiente na Vercel: `RESEND_API_KEY` (via integração Resend↔Vercel) + `CONTACT_EMAIL=izaiasr232@gmail.com`
- [x] Domínio `izaiasbessa.com.br` **verificado no Resend** (DKIM + SPF + MX adicionados no DNS da Locaweb) — emails chegam na caixa principal com remetente `Portfolio Izaias <contato@izaiasbessa.com.br>`
- [x] Honeypot `#fhoneypot` adicionado em `index.html` (escondido, anti-spam)
- [x] Submit handler em `assets/js/main.js` reescrito como `async` com `fetch()` — falha silenciosa (WhatsApp garante o contato se a API falhar)
- [x] Evento GTM no submit: `contact_form_submitted_to_whatsapp`
- [x] URL da API atualizada no `main.js`: `https://portifolio-api-iota.vercel.app/api/contact`
- [x] Testado ponta a ponta: email chegando em `izaiasr232@gmail.com` com remetente do domínio próprio, HTML formatado (Nome / Email / Assunto / Mensagem)

**GTM + GA4 — Concluído (2026-06-15):**
- [x] Trigger + tag GA4 `Submit Form Lead` para `contact_form_submitted_to_whatsapp`
- [x] Marcar eventos de conversão no GA4

**Repositório da API:** `github.com/izaiasramos/portifolio-api`
**URL produção:** `https://portifolio-api-iota.vercel.app/api/contact`

---

### ✅ Fase 4.3 — Lead magnet + captura de e-mail (CONCLUÍDA E EM PRODUÇÃO — 2026-06-01)

**Problema resolvido:** tráfego orgânico do blog agora captura e-mail em troca de PDFs de valor. Visitantes que não estão prontos para contratar hoje viram leads persistentes.

**Arquitetura implementada:**
```
[Form inline no blog]
  └─ fetch POST → /api/lead-magnet
                     ├─ INSERT into Neon Postgres (lead_id, email, name, whatsapp, pdf_type, created_at)
                     ├─ Generate PDF via @react-pdf/renderer (ChecklistPDF ou BriefPDF)
                     ├─ Upload PDF to Vercel Blob (30 dias de validade)
                     ├─ Email 1 → izaiasr232@gmail.com (notificação: novo lead + dados + WhatsApp link)
                     └─ Email 2 → lead (confirmação + download link do PDF ou newsletter welcome)
  └─ dataLayer.push({event: 'blog_pdf_form_submitted_success' ou 'blog_index_newsletter_form_submitted'})
```

**O que foi feito (2026-05-29):**
- [x] **Repositório portfolio-api** expandido com novo endpoint `/api/lead-magnet`
  - Integração com **Neon Postgres** (successor de Vercel Postgres): schema `leads` com campos email, name, whatsapp, pdf_type, source_page, timestamp
  - PDF generation via `@react-pdf/renderer` (200KB, <500ms cold start, Vercel-native)
  - Upload para `@vercel/blob` com signed URLs (30 dias de expiração)
  - Envio de 2 emails via Resend (em paralelo via `Promise.all`)
- [x] **Dois PDFs dinâmicos criados:**
  - `templates/ChecklistPDF.js` — "Checklist: 10 Perguntas" (alinhado ao post 1)
  - `templates/BriefPDF.js` — "Modelo de Brief" (alinhado ao post 2)
  - Gerados em memória via React + renderToBuffer() — sem FileSystem, puro serverless
- [x] **Forms de captura adicionados:**
  - `blog/como-escolher-desenvolvedor-pme/index.html` → lead magnet checklist
  - `blog/site-profissional-quanto-custa/index.html` → lead magnet brief
  - `blog/index.html` → newsletter subscription (sem PDF)
  - Todos com campos: email (obrigatório), name (opcional), whatsapp (opcional), honeypot
- [x] **Styling adicionado** (`blog/blog.css`): `.lead-magnet-*` e `.newsletter-*` classes (gradiente, card responsivo, formulário)
- [x] **JavaScript handlers** (`assets/js/main.js`):
  - Lead magnet forms: submit → fetch → GTM event `blog_pdf_form_submitted_success` → sucesso/erro feedback
  - Newsletter form: submit → fetch → GTM event `blog_index_newsletter_form_submitted`
  - Ambos com honeypot anti-spam
- [x] **Email notifications:**
  - **Admin email** (izaiasr232@gmail.com): lead data + WhatsApp clickable link + PDF link (ou "newsletter") + action suggestions
  - **Lead email (checklist/brief)**: PDF download button + 30-day expiration notice
  - **Lead email (newsletter)**: welcome + link para post popular
- [x] **GTM events:** `blog_pdf_form_submitted_success`, `blog_index_newsletter_form_submitted` (ambos com data-section, data-button, landing_page)
- [x] **Commit local feito:** portfolio-api + portfolio principal (aguarda network para push)

**Dados capturados:**
- Email, Nome (opcional), WhatsApp (opcional), Tipo PDF, Origem URL, IP, User-Agent, Timestamp
- Armazenado em Neon Postgres (accessible via vercel postgres CLI ou dashboard)

**URLs de produção:**
- Endpoint: `https://portifolio-api-iota.vercel.app/api/lead-magnet`
- Blob store (público): `hgzza2jsynuq4uyf.public.blob.vercel-storage.com`

**Deploy + validação ponta a ponta (2026-06-01) — TUDO FUNCIONANDO:**
- [x] Deploy em produção via `npx vercel --prod` (portfolio-api roda standalone na Vercel; não vai pro git, é gitignored)
- [x] **Neon Postgres** conectado via integração Vercel — tabela `leads` criada on-demand pelo handler (`initializeTable`)
- [x] **Vercel Blob store público** criado e conectado (`BLOB_READ_WRITE_TOKEN` em Production)
- [x] Testado ponta a ponta via curl: OPTIONS=200, brief/checklist/newsletter/honeypot todos passando, PDF público acessível
- [x] **Form testado no site real** — lead capturado, email recebido corretamente, PDF baixado

**GTM + GA4 — Concluído (2026-06-15):**
- [x] Tags GA4 para `blog_pdf_form_submitted_success` e `blog_index_newsletter_form_submitted`
- [x] Triggers alinhados ao código, container publicado e validado em produção

**Bugs resolvidos durante o deploy (4 em cascata, todos disfarçados de "erro de CORS" — a função crashava no load e o browser reportava como CORS):**

| # | Sintoma | Causa raiz | Correção |
|---|---|---|---|
| 1 | `ERR_REQUIRE_ESM` | `@react-pdf/renderer` v4 é ESM puro, carregado via `require()` | `import()` dinâmico no handler; templates viraram *factories* que recebem as primitivas |
| 2 | `SyntaxError: Unexpected token '<'` | Vercel só transpila JSX em `.jsx`, não em `.js` | Templates reescritos com `React.createElement` puro |
| 3 | `sql(...)` rejeitado | `@neondatabase/serverless` exige tagged-template ou `sql.query()` | Trocadas as 4 chamadas para `sql.query(...)` |
| 4 | `BlobError: Cannot use public access on a private store` | store estava *private*, código pede `access: 'public'` | criado store **público** novo, reconectado, órfãos deletados |
| 5 | PDF do brief com texto quebrado/sobreposto ("≡íOBRE", "¡Captar") | Helvetica (fonte padrão) não tem glyphs para emojis nem `□` (U+25A1); fallback sobrepunha a letra seguinte | removidos emojis dos títulos de seção; `□` → `[  ]` (ASCII-safe) |

**Impacto esperado:** começar a construir base de e-mail própria. Mesmo prospect "frio" vira lead persistente — armazenado no banco com WhatsApp para recontato direto.

---

### ✅ Fase 4.4 — Provas sociais com peso real (CONCLUÍDA — 2026-06-18)

**Feito:**
- [x] GitHub + LinkedIn como prova verificável no trust block (prints + preview API)
- [x] Smart Fit e Amazônia Azul com nome real
- [x] Emojis substituídos por **monogramas** (SF, AA, 2+, RZ, AM) no trust block e cards de projeto
- [x] **Métricas verificáveis** nos cards de clientes (`trust-client-stat`)
- [x] Depoimentos enriquecidos: citação literal do WhatsApp + pills de métrica (PageSpeed, SEO, CTAs) — home + cases

**Fora do escopo (sem autorização dos clientes):**
- ~~Logos oficiais~~ (Smart Fit, Amazônia Azul, RoboZe)
- ~~Depoimentos em vídeo~~

> Monogramas + métricas verificáveis são a solução definitiva para prova social neste portfólio.

---

### ⏸️ Fase 4.5 — Revelar cases restantes (FORA DO ESCOPO)

**Status:** Smart Fit e Amazônia Azul **citados nominalmente** no Trust Block e em `#projects` — suficiente sem case dedicado.

**Não será feito:** cases dedicados RoboZe / AdManager (requer autorização formal que não é viável).

**Cards confidenciais** permanecem com descrição honesta + monograma — sem prints internos nem URLs.

---

### ⏸️ Fase 4.6 — Retargeting (ADIADO — decisão 2026-06-18)

**Conclusão:** GA4 + eventos atuais já medem conversão. Retargeting só vale com **verba de ads** (Meta/Google). Código extra (`gtm-init`, campos `meta_event`) removido — desnecessário.

**Quando retomar:** tráfego estável (50+ visitas/semana) + budget ads R$ 200–500/mês.

**Caminho mínimo (só GTM, ~30 min):** ver `docs/gtm-retargeting.md`
- [ ] Meta Pixel PageView (All Pages) + Lead (trigger `cta_whatsapp_clicked`)
- [ ] (Opcional) Google tag `AW-XXX` para remarketing
- [ ] Campanha teste retargeting cases/blog

**Home:** GTM lazy-load mantido — scroll/clique ou **5s** (antes era 15s).

---

### 🟢 Fase 4.7 — Segmentação de buyer persona (CONCLUÍDA — 2026-06-18)

**Feito:**
- [x] 3 mensagens WhatsApp distintas centralizadas em `assets/js/main.js` (`site`, `sistema`, `automacao`) + intents contextuais (`faq`, `agenda`, `blog`, `case-*`, `geral`)
- [x] Atributo `data-wa-intent` em todos os CTAs WhatsApp — URLs geradas via `buildWaUrl()`
- [x] Hero e contato com pills segmentadas (Site · Sistema · Automação)
- [x] Botão flutuante com menu de 3 opções
- [x] Formulário de contato detecta intent pelo assunto/mensagem e abre WhatsApp com opener segmentado
- [x] GTM recebe parâmetro `wa_intent` em `cta_whatsapp_clicked` e `contact_form_submitted_to_whatsapp`

**Mensagens principais:**
| Intent | Mensagem |
|---|---|
| `site` | Site/landing (a partir de R$ 450) — orçamento |
| `sistema` | Sistema sob medida (dashboard, CRM, painel) — escopo e prazo |
| `automacao` | Automação/consultoria (APIs, integrações, GTM) |

> Mini-landing pages (`/sites`, `/sistemas`, `/automacao`) permanecem fora do escopo — pills + mensagens segmentadas bastam.

---

### ✅ Fase 4.8 — Expandir blog (CONCLUÍDA — 2026-06-18)

**Feito:**
- [x] 5 posts adicionais publicados (7 no total):
  - `quanto-custa-site-sao-paulo-2026/` — long-tail SP
  - `site-pronto-vs-sob-medida-pme/` — Wix/WordPress vs sob medida
  - `sistema-sob-medida-quando-vale-pena/` — site vs sistema
  - `gtm-google-tag-manager-pme/` — tracking para PME
  - `dominio-hospedagem-guia-pme/` — Registro.br + hospedagem
- [x] Cada post: CTA WhatsApp segmentado + lead magnet (checklist ou brief) + 2+ internal links
- [x] `blog/index.html` atualizado (listagem + Schema.org Blog com 7 posts)
- [x] `sitemap.xml` atualizado — **11 URLs** (home + 2 cases + blog index + 7 posts)
- [x] Novos intents WhatsApp em `main.js`

**SEO:** sitemap enviado ao Search Console — reenviar apenas após publicar posts ou páginas novas.

---

### 📊 Ordem recomendada de execução

| # | Fase | Esforço | Impacto | Dependências |
|---|---|---|---|---|
| 1 | ~~**4.1** GTM + GA4 + tags de conversão~~ ✅ feito 2026-06-15 | — | 🔥🔥🔥 | nenhuma |
| 2 | ~~**4.2** Persistir formulário~~ ✅ feito 2026-05-28 | — | 🔥🔥🔥 | — |
| 3 | ~~**4.3** Lead magnet + email capture + tracking~~ ✅ feito 2026-06-15 | — | 🔥🔥 | 4.2 (mesmo backend) |
| 4 | ~~**4.4** Provas sociais reais~~ ✅ feito 2026-06-18 | — | 🔥🔥 | — |
| 5 | ~~**4.5** Cases confidenciais~~ ⏸️ fora do escopo | — | — | sem autorização |
| 6 | **4.6** Retargeting (pixels) | ~1h GTM | 🔥 | 4.1 ativo · código pronto · ver `docs/gtm-retargeting.md` |
| 7 | ~~**4.7** Segmentação buyer persona~~ ✅ feito 2026-06-18 | — | 🔥 | 4.1 ativo |
| 8 | ~~**4.8** Expandir blog (5 posts)~~ ✅ feito 2026-06-18 | — | 🔥 (longo prazo) | nenhuma |

**Sequência crítica:** ~~4.1 → 4.8~~ ✅ roadmap de captação concluído. **Próximo:** itens opcionais na seção [🔮 Futuro](#-futuro-quando-fizer-sentido).

---

## ⏸️ Fora do escopo por enquanto

Ver detalhes na seção [🔮 Futuro](#-futuro-quando-fizer-sentido). Decisões conscientes — não são pendências.

---

## 📁 Arquivos do projeto

| Arquivo | Status | Descrição |
|---|---|---|
| `sitemap.xml` | ✅ atualizado | 11 URLs · blog + 5 posts novos (2026-06-18) |
| `assets/img/` | ✅ expandido | Foto, depoimentos, PageSpeed, prints LinkedIn |
| `assets/css/main.css` | ✅ atualizado | Trust block, container 1240px, about-quote |
| `index.html` | ✅ atualizado | Trust block, FAQ SEO, copy honesta, projetos |
| `assets/js/main.js` | ✅ atualizado | JS com eventos GTM renomeados + handlers de form/lead magnet |
| `docs/performance.md` | ✅ novo | Guia de otimizações PageSpeed + regras para IA não regredir |
| `.cursor/rules/performance.mdc` | ✅ novo | Regra Cursor — considerar impacto em velocidade em toda alteração LP |
| `cases/case.css` | ✅ novo | Estilos compartilhados pelas páginas de case (~6KB) |
| `cases/jessica-lopes/index.html` | ✅ atualizado | Case — site com home, rotas internas e blog |
| `cases/bruna-bessa/index.html` | ✅ novo | Case do site multi-página |
| `blog/index.html` | ✅ atualizado | Listagem com 7 posts + Schema.org Blog |
| `blog/quanto-custa-site-sao-paulo-2026/index.html` | ✅ novo | Post — preço site SP (~8 min) |
| `blog/site-pronto-vs-sob-medida-pme/index.html` | ✅ novo | Post — pronto vs sob medida (~8 min) |
| `blog/sistema-sob-medida-quando-vale-pena/index.html` | ✅ novo | Post — sistema sob medida (~9 min) |
| `blog/gtm-google-tag-manager-pme/index.html` | ✅ novo | Post — GTM para PME (~7 min) |
| `blog/dominio-hospedagem-guia-pme/index.html` | ✅ novo | Post — domínio e hospedagem (~7 min) |
| `blog/como-escolher-desenvolvedor-pme/index.html` | ✅ existente | Post 1 — guia para PMEs (~9 min) |
| `blog/site-profissional-quanto-custa/index.html` | ✅ existente | Post 2 — faixas de preço (~11 min) |

---

## 🎯 Estratégia geral

**Objetivo:** equilíbrio entre **autoridade** (case studies, métricas, depoimentos) e **conversão** (CTAs, FAQ, serviços, agendamento, tracking).

**Público-alvo:** PMEs em geral — sem nichar (ainda) em psicologia ou outro segmento.

**Stack:** vanilla HTML/CSS/JS — sem frameworks novos.

**Roadmap executado:**
1. Fase 1 — transparência (FAQ + Serviços) + medição GTM ✅
2. Fase 2 — autoridade (case studies + trust block) ✅
3. Fase 3 — Calendly, about, blog seed ✅
4. Fase 4 — captação (API, lead magnets, segmentação, 7 posts) ✅

**Manutenção:** novos posts, cases autorizados, ajuste de copy/preços. **Crescimento:** tráfego pago + retargeting quando houver budget.
