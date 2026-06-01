antic didone
cormorant


# Status do Portfolio — Roadmap de Profissionalismo + Captação

Documento de acompanhamento das melhorias para passar mais autoridade e converter visitantes em clientes (PMEs em geral).

**Última atualização:** 2026-06-01 (Fase 4.3 — lead magnet 100% em produção e validado; falta só configurar GA4/GTM dos eventos)

---

## ✅ Fase 1 — Concluída

### 1.1 Tracking de eventos (GTM + dataLayer)
Implementado seguindo o mesmo padrão da LP da psicóloga Jéssica.

- GTM lazy-loaded no `<head>` — só injeta o script após primeira interação (`scroll`, `touchstart`, `keydown`, `click`) ou 15s pós-`load`. Protege Core Web Vitals.
- `<noscript>` iframe do GTM logo após `<body>`
- `dns-prefetch` para `googletagmanager.com`
- Listener global de cliques que captura `data-section` + `data-button` e dispara `dataLayer.push`:
  - `event: lead_whatsapp` para links `wa.me/*`
  - `event: interaction` para os demais
- Atributos `data-section` e `data-button` adicionados em **todos** os CTAs (nav desktop, nav mobile, hero, sobre, projetos, serviços, FAQ, contato, footer, botões flutuantes)

> ✅ **Resolvido em 2026-05-26 (Fase 4.1):** ID real `GTM-M8SWJWWD` instalado nas 12 posições (6 páginas × 2). Snippet lazy-load do `<head>` foi substituído pelo snippet padrão do GTM no fim do `<body>` para todas as páginas, mantendo o `dns-prefetch` no head.

### 1.2 Formulário de contato — privacidade + tracking
- Submit mostra mensagem de sucesso visualmente
- Aguarda **2 segundos** antes de abrir o WhatsApp (delay para GTM capturar o evento via seletor CSS)
- Push manual de `event: form_submit_success` no `dataLayer`
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
8 perguntas frequentes antes de `#contact`, cobrindo as objeções típicas de PME:

- Quanto tempo leva
- Quanto custa
- Quais tecnologias
- Como funciona o pagamento
- De quem é o código
- Hospedagem e domínio
- Tem contrato
- Manutenção pós-entrega

Implementação:
- `<details>`/`<summary>` nativos — funciona sem JS
- Schema.org `FAQPage` JSON-LD no `<head>` — gera rich results no Google
- CTA WhatsApp ao final ("Não achei minha dúvida")

### 1.5 SEO técnico
- `sitemap.xml` na raiz com 5 URLs principais
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
- `cases/jessica-lopes/index.html` — Landing page de captação
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

- **PageSpeed mobile 90+** (Lighthouse — pode ser comprovado por screenshot)
- **Indexação < 7 dias** (verificável no Google Search Console)
- **GTM rastreando cliques de WhatsApp** (Jéssica) ou **3+ pontos de conversão por página** (Bruna)
- **100% mobile-first responsivo**

> ⚠️ **Pendente:** rodar Lighthouse real em ambos os sites e tirar screenshot pra ter o número exato (90, 92, 95...). Os "90+" são placeholder honesto.

### 2.4 Trust Block ✓
Nova `<section id="trust">` entre `#about` e `#projects`, com 2 grids:

**Clientes/projetos** (4 cards anônimos por falta de autorização formal):
- 🏋️ Cliente institucional · setor fitness/enterprise (Smart Fit anonimizado)
- ⚓ Projeto institucional público · sistema de votação/governo (Marinha anonimizada)
- 🧠 Psicólogas independentes · 2 sites em produção (Jéssica + Bruna)
- 🤖 SaaS de captação · RoboZe · responsável principal

**Credenciais** (3 cards):
- Certificações — placeholder honesto: tags de stack + "Mais em breve" (você preenche depois)
- GitHub aberto → link para `github.com/izaiasramos`
- LinkedIn ativo → link para o perfil

> ⚠️ **Pendente:** quando você listar suas certificações reais (Rocketseat, Alura, Origamid, etc), trocar o placeholder do card "Certificações" no `index.html` (procura por `trust-meta-title">Certificações`).

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

## 📌 Fase 3 — Restante (sem bloquear nada)

### 3.2 Vídeo de apresentação
- Gravar 60–90 segundos em `.webm`
- Salvar em `/assets/videos/intro-izaias.webm`
- Embed em `#hero` ou `#about`
- Imagem `poster` obrigatória para não impactar LCP

---

## ✔️ Checklist antes do próximo deploy

Itens que dependem de você (não podem ser feitos por código):

- [x] ~~Substituir `GTM-XXXXXXX` pelo ID real do Google Tag Manager~~ ✅ **feito 2026-05-26** — `GTM-M8SWJWWD` em 12 posições
- [ ] Configurar tags no GTM para receber `event: lead_whatsapp`, `event: interaction` e `event: form_submit_success`
- [ ] Conectar GTM ao Google Analytics 4 (e Microsoft Clarity, se quiser heatmaps)
- [ ] Submeter `sitemap.xml` atualizado no Google Search Console — agora com **6 URLs reais** (home + 2 cases + blog index + 2 posts)
- [ ] Validar rich results em https://search.google.com/test/rich-results — deve detectar `Person` + `FAQPage` (na home), `CreativeWork` (nos cases) e `Blog` + `BlogPosting` (no blog)
- [ ] Rodar Lighthouse (mobile + desktop) **em todas as 6 páginas** (home, 2 cases, blog index, 2 posts). Metas: Performance ≥ 90, SEO 100, Best Practices ≥ 95, Acessibilidade ≥ 95
- [ ] Confirmar resultados reais do Lighthouse e atualizar os números no card de "PageSpeed mobile" dos cases (hoje está "90+" como placeholder honesto)
- [ ] Trocar o card "Certificações" do Trust Block pelas certificações reais (Rocketseat, Alura, Origamid, etc) — busca por `trust-meta-title">Certificações`
- [ ] Testar formulário em iPhone Safari e Android Chrome (mensagem de sucesso aparece + WhatsApp abre depois de 2s)
- [ ] Confirmar que o botão flutuante de WhatsApp não sobrepõe o botão "Voltar ao topo"
- [ ] Testar navegação **home → case → home** nos 2 cases (links `../../#projects` e CTAs)

---

## 🚀 Fase 4 — Captação & Conversão (auditoria 2026-05-26)

**Diagnóstico geral:** o portfólio tem boa **carcaça de conversão** (CTAs contextuais, WhatsApp pré-preenchido, FAQ, Calendly, funil claro), mas hoje **perde leads** por 3 buracos críticos que serão atacados nesta fase. Nada será removido — todas as melhorias somam.

### Princípio orientador
**Não remover seções existentes.** Cada melhoria deve **somar** ao funil atual, nunca cortar. Se algo está fraco, fortalecemos com mais conteúdo, prova ou CTA. Foco em maximizar conversão sem perder o que já está consolidado.

---

### 🔥 Fase 4.1 — Ativar tracking real (QUASE CONCLUÍDA — 2026-05-27)

**Container GTM:** `GTM-M8SWJWWD`
**GA4 Measurement ID:** `G-7VTBPHNPE7`

**✅ O que foi feito (2026-05-26 → 2026-05-27):**
- [x] Conta GTM criada e container `GTM-M8SWJWWD` ativo
- [x] Snippet GTM padrão instalado nas **6 páginas** (12 posições — script + noscript):
  - `index.html`
  - `cases/jessica-lopes/index.html`
  - `cases/bruna-bessa/index.html`
  - `blog/index.html`
  - `blog/como-escolher-desenvolvedor-pme/index.html`
  - `blog/site-profissional-quanto-custa/index.html`
- [x] Snippet padrão do GTM colocado no **fim do `<body>` com `defer`** para minimizar impacto em LCP. `dns-prefetch` mantido no `<head>` em todas as páginas.
- [x] Validação via grep: zero ocorrências de `GTM-XXXXXXX` no código
- [x] **GA4 Configuration tag** criada no GTM (Measurement ID `G-7VTBPHNPE7`)
- [x] **Trigger customizado `lead_whatsapp`** + tag GA4 "Whatsapp" — testado via Tag Assistant em `izaiasbessa.com.br`, dispara passando `data_section`, `data_button`, `landing_page` corretamente
- [x] **Trigger customizado `interaction`** + tag GA4 "Interaction" — disparando corretamente
- [x] Container GTM **publicado** (Submit + Publish)
- [x] Validação ponta a ponta: Tag Assistant confirma dispatch das 2 tags com payload correto

**🔄 Ainda pendente:**
- [ ] Marcar `lead_whatsapp` como **conversão** no GA4 (Admin → Events → toggle "Mark as conversion")
- [ ] Aguardar 24-48h e confirmar que os eventos aparecem em **GA4 → Realtime** e em **Reports → Engagement → Events** com tráfego real

**⏸️ Adiado intencionalmente (será feito junto com Fase 4.2):**
- Criar trigger + tag GA4 para `form_submit_success` — o formulário de contato vai ser reescrito na Fase 4.2 para persistir leads em backend, então faz mais sentido configurar a tag depois que o form estiver no formato final. Evita retrabalho de criar/refazer a tag duas vezes.
- Marcar `form_submit_success` como conversão no GA4 — idem, junto da Fase 4.2.

**🔮 Opcional, fase posterior:**
- Microsoft Clarity para heatmaps e session replay — adicionar como tag Custom HTML no GTM

**Impacto esperado:** dados reais de conversão chegam no GA4 e alimentam todas as decisões seguintes da Fase 4.

---

### ✅ Fase 4.2 — Persistir formulário (CONCLUÍDA — 2026-05-28)

**Problema resolvido:** submit do formulário agora persiste o lead via Vercel Serverless antes de abrir o WhatsApp. Zero lead perdido se o prospect fechar a aba.

**Arquitetura implementada:**
```
[Form no browser]
  └─ fetch POST → https://portifolio-api-iota.vercel.app/api/contact
                        └─ Vercel Serverless Node.js (portifolio-api)
                              └─ Resend API → izaiasr232@gmail.com
  └─ dataLayer.push(lead_form_persisted)
  └─ dataLayer.push(form_submit_success)
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
- [x] Dois eventos GTM disparados no submit: `lead_form_persisted` + `form_submit_success`
- [x] URL da API atualizada no `main.js`: `https://portifolio-api-iota.vercel.app/api/contact`
- [x] Testado ponta a ponta: email chegando em `izaiasr232@gmail.com` com remetente do domínio próprio, HTML formatado (Nome / Email / Assunto / Mensagem)

**GTM + GA4 — Concluído (2026-05-28):**
- [x] Criar trigger + tag GA4 para `form_submit_success` no GTM (Custom Event trigger, GA4 Event tag com parâmetros `data-section` + `data-button`)
- [x] Marcar `form_submit_success` como conversão no GA4 (Admin → Events → toggle "Mark as conversion")
- [x] Marcar `lead_whatsapp` como conversão no GA4 (Fase 4.1 — pendência resolvida)

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
  └─ dataLayer.push({event: 'lead_magnet_download' ou 'newsletter_signup'})
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
  - Lead magnet forms: submit → fetch → GTM event `lead_magnet_download` → sucesso/erro feedback
  - Newsletter form: submit → fetch → GTM event `newsletter_signup`
  - Ambos com honeypot anti-spam
- [x] **Email notifications:**
  - **Admin email** (izaiasr232@gmail.com): lead data + WhatsApp clickable link + PDF link (ou "newsletter") + action suggestions
  - **Lead email (checklist/brief)**: PDF download button + 30-day expiration notice
  - **Lead email (newsletter)**: welcome + link para post popular
- [x] **GTM events ready:** `lead_magnet_download`, `newsletter_signup` (ambos com data-section, data-button, landing_page)
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
- [ ] Criar trigger + tag GA4 no GTM para `lead_magnet_download` e `newsletter_signup`
- [ ] Marcar como conversão no GA4 (Admin → Events)

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

### 🟡 Fase 4.4 — Provas sociais com peso real (MÉDIO impacto)

**Problema:** as provas sociais hoje são genéricas — emojis no lugar de logos reais, depoimentos sem números, "Certificações em breve" é promessa vazia.

**Plano:**
- [ ] Trocar emojis dos 4 cards do Trust Block (`#trust`) por imagens reais (logos quando autorizado, ou silhuetas estilizadas + nome do setor)
- [ ] Adicionar números mensuráveis nos depoimentos: "+X clientes via site", "Y conversões/mês", "Lighthouse Z"
- [ ] Substituir card "Certificações — em breve" pelas certificações reais (Rocketseat, Alura, Origamid, etc) ou trocar por outro tipo de credencial (anos, projetos, GitHub stars)
- [ ] Considerar adicionar 1-2 depoimentos novos em vídeo curto (15-30s) — credibilidade muito maior que texto

**Impacto esperado:** confiança ↑, redução de objeção "será que ele entrega mesmo?"

---

### 🟡 Fase 4.5 — Revelar cases hoje confidenciais (MÉDIO impacto)

**Problema:** dos 6 projetos mostrados em `#projects`, **4 são "confidenciais"** — sem stack visível, sem resultado quantificado. Reduz a confiança porque parece que faltam cases para mostrar.

**Plano:**
- [ ] Pedir autorização formal aos clientes (Smart Fit anonimizado, Marinha, RoboZe) para liberar pelo menos 1-2 casos com:
  - Print parcial (ou wireframe esquemático respeitando NDA)
  - Stack usada
  - 1-2 métricas (PageSpeed, prazo de entrega, % de uptime)
- [ ] Para os que continuarem confidenciais: melhorar texto descritivo (em vez de "confidencial", contar o **tipo de problema** resolvido sem citar a marca: "Plataforma de gestão para rede com 100+ unidades")
- [ ] Considerar criar 1-2 cases novos dedicados (mesmo template de Jéssica/Bruna) para os projetos liberados

**Impacto esperado:** mais densidade de prova de execução real.

---

### 🟡 Fase 4.6 — Retargeting (MÉDIO impacto, requer investimento em ads)

**Problema:** visitante que não converte na primeira visita nunca mais é alcançado. Sem pixel de retargeting, sem remarketing.

**Plano:**
- [ ] Instalar **Meta Pixel** via GTM (custom HTML tag)
- [ ] Instalar **Google Ads tag** via GTM (caso vá rodar campanhas)
- [ ] Criar audiências:
  - "Visitou /cases/* mas não converteu" (warm)
  - "Leu blog mas não baixou lead magnet" (cold-warm)
  - "Submeteu form mas não fechou" (hot)
- [ ] (Opcional, pós-validação) Pequena verba teste de R$ 200-500 para retargetar quem visitou cases

**Impacto esperado:** segunda chance de conversão. Sem isso, 95-98% do tráfego é perdido para sempre.

---

### 🟢 Fase 4.7 — Segmentação de buyer persona (BAIXO impacto inicial, alta evolução)

**Problema:** todos os CTAs mandam para o mesmo número com mensagens genéricas. Quem quer landing page recebe a mesma abordagem de quem quer sistema sob medida.

**Plano:**
- [ ] Criar 3 mensagens WhatsApp pré-preenchidas distintas:
  - "Quero um site/landing" (R$ 1.500–4.000)
  - "Quero um sistema sob medida" (R$ 12.000+)
  - "Quero automação/consultoria" (por hora)
- [ ] Usar `data-section` + `data-button` para segmentar no GTM (já está pronto, só precisa configurar)
- [ ] Considerar criar 3 mini-landing pages dedicadas (`/sites`, `/sistemas`, `/automacao`) com hero específico e CTAs próprios — só após Fase 4.1-4.3

**Impacto esperado:** taxa de conversão por nicho mais alta, mensagem mais relevante.

---

### 🟢 Fase 4.8 — Expandir blog (BAIXO impacto imediato, alto SEO de longo prazo)

**Problema:** apenas 2 posts. Não alimenta SEO long-tail nem nutre lead via conteúdo.

**Plano:**
- [ ] Escrever 3-5 posts adicionais com foco PME e long-tail:
  - "Quanto custa um site em [SP/RJ/etc] em 2026"
  - "Site pronto vs sob medida: qual escolher para PME"
  - "O que é sistema sob medida e quando vale a pena"
  - "Como o GTM ajuda PME a vender mais (e por que você precisa dele)"
  - "Domínio + hospedagem: o guia básico para PME"
- [ ] Cada post: CTA WhatsApp + lead magnet relacionado + 2-3 internal links
- [ ] Atualizar `sitemap.xml` a cada post novo

**Impacto esperado:** Google indexa mais variações long-tail, tráfego orgânico cresce nos próximos 3-6 meses.

---

### 📊 Ordem recomendada de execução

| # | Fase | Esforço | Impacto | Dependências |
|---|---|---|---|---|
| 1 | ~~**4.1** GTM + GA4 + tags `lead_whatsapp`/`interaction` testadas~~ ✅ feito 2026-05-27 — falta marcar `lead_whatsapp` como conversão no GA4 e aguardar 24-48h. Tag `form_submit_success` adiada para junto da 4.2 | 5 min restantes | 🔥🔥🔥 | nenhuma |
| 2 | ~~**4.2** Persistir formulário~~ ✅ feito 2026-05-28 — Vercel Serverless + Resend + domínio verificado | — | 🔥🔥🔥 | — |
| 3 | ~~**4.3** Lead magnet + email capture~~ ✅ feito 2026-06-01 — Neon Postgres + @react-pdf/renderer + Vercel Blob + 2 emails Resend, validado em produção. Falta só configurar GA4/GTM dos eventos | 10 min restantes (GA4) | 🔥🔥 | 4.2 (mesmo backend) |
| 4 | **4.4** Provas sociais reais | 2-3h | 🔥🔥 | autorização de clientes |
| 5 | **4.5** Revelar cases confidenciais | 3-5h | 🔥🔥 | autorização de clientes |
| 6 | **4.6** Retargeting (pixels) | 1h | 🔥 | 4.1 ativo |
| 7 | **4.7** Segmentação buyer persona | 2-3h | 🔥 | 4.1 ativo + dados acumulados |
| 8 | **4.8** Expandir blog (5 posts) | 1-2 semanas | 🔥 (longo prazo) | nenhuma |

**Sequência crítica:** 4.1 → 4.2 → 4.3 destrava o restante. Tudo o que vem depois usa os dados/backend dessas três fases.

---

## 📁 Arquivos do projeto

| Arquivo | Status | Descrição |
|---|---|---|
| `index.html` | ✅ atualizado | Hub principal — 7 sections + nav (com link Blog) + footer |
| `sitemap.xml` | ✅ atualizado | 6 URLs reais (home, 2 cases, blog index, 2 posts) — fragmentos `#` removidos por serem ignorados pelo Google |
| `robots.txt` | ✅ existente | Aponta para o sitemap |
| `assets/img/` | ⚪ existente | Foto, depoimentos, favicon |
| `assets/videos/` | ⚪ existente | Demos de Jéssica e Bruna |
| `assets/css/main.css` | ✅ novo | CSS extraído + Trust Block (24KB) |
| `assets/js/main.js` | ✅ novo | JS extraído com guards para múltiplas páginas (5KB) |
| `cases/case.css` | ✅ novo | Estilos compartilhados pelas páginas de case (~6KB) |
| `cases/jessica-lopes/index.html` | ✅ novo | Case da LP de captação |
| `cases/bruna-bessa/index.html` | ✅ novo | Case do site multi-página |
| `blog/index.html` | ✅ novo | Listagem do blog (Schema.org Blog) |
| `blog/blog.css` | ✅ novo | Estilos compartilhados das páginas do blog (~6KB) |
| `blog/como-escolher-desenvolvedor-pme/index.html` | ✅ novo | Post 1 — guia para PMEs (~9 min) |
| `blog/site-profissional-quanto-custa/index.html` | ✅ novo | Post 2 — faixas de preço para PMEs (~11 min) |

---

## 🎯 Estratégia geral

**Objetivo:** equilíbrio entre **autoridade** (case studies, métricas, certificações) e **conversão** (CTAs, FAQ, serviços, agendamento).

**Público-alvo:** PMEs em geral — sem nichar (ainda) em psicologia ou outro segmento.

**Stack:** vanilla HTML/CSS/JS — sem frameworks novos.

**Sequenciamento:**
1. Fase 1 corrige a maior fricção (transparência de preço/prazo via FAQ + Serviços) e abre medição via GTM
2. Fase 2 entrega autoridade aprofundada (case studies dedicados + trust block)
3. Fase 3 é incremental e não bloqueia nada (Calendly, vídeo de intro, blog)
