# Retargeting — quando vale a pena (e o mínimo necessário)

## O que você já tem (e já resolve 80%)

Pelo GTM atual (`GTM-M8SWJWWD`):

| Tag | O que mede |
|-----|------------|
| Configuração Base (GA4) | Visitas, origem, páginas |
| `cta_whatsapp_clicked` | Cliques WhatsApp |
| `Contact Form Submitted` | Formulário enviado |
| `Download PDF no form Blog` | Lead magnet |
| `Form Submitted blog` | Newsletter |
| `Interaction` | Outros cliques |

**Isso responde:** quantas pessoas visitam, de onde vêm, quais CTAs funcionam, quantas conversões por semana.

**Isso NÃO faz:** mostrar anúncio de novo para quem visitou e saiu sem converter.

---

## GA4 vs Retargeting — são coisas diferentes

| | GA4 (já tem) | Retargeting (Meta/Google Ads) |
|--|--------------|-------------------------------|
| **Objetivo** | Medir e entender | Reimpactar visitantes |
| **Onde vê** | Google Analytics | Meta Ads / Google Ads |
| **Precisa de ads?** | Não | **Sim** — sem verba, pixel sozinho não converte ninguém |
| **Código extra no site?** | Já feito | Meta Pixel ou Google tag no GTM |
| **Esforço** | ✅ feito | ~1h GTM + criar campanhas + budget |

**Conclusão honesta:** se você **não vai investir R$ 200–500/mês em anúncios** nos próximos meses, retargeting **não vale o esforço agora**. O GA4 + leads no e-mail/Neon já cobrem captura e medição.

---

## Quando retargeting passa a valer

Faça quando **as três** condições forem verdade:

1. Tráfego orgânico estável (50+ visitas/semana no GA4)
2. Você vê visitas nos cases/blog mas poucas conversões
3. Tem verba teste para ads (Meta ou Google)

---

## Se for fazer — caminho mínimo (só GTM, zero código)

Não precisa de `gtm-init.js`, `page_context` nem campos extras no `main.js`. Os eventos que você já tem bastam.

### Meta (Facebook/Instagram)

1. Criar pixel no [Events Manager](https://business.facebook.com/events_manager)
2. GTM → Tag **Facebook Pixel** → PageView → All Pages
3. GTM → Tag **Facebook Pixel** → Event **Lead** → trigger: `cta_whatsapp_clicked` **OU** `contact_form_submitted_to_whatsapp`

Pronto. Duas tags. Audiência "visitou site 30d" cria sozinha no Events Manager.

### Google Ads (opcional)

1. GTM → Tag **Google tag** (`AW-XXXXXXXXX`) → All Pages
2. Remarketing list popula automaticamente

### Trade-off com GTM lazy na home

A home carrega GTM após scroll/clique ou **5s**. Quem sai em &lt;5s sem interagir **não entra na audiência** — mas também não viu nada relevante. Para a maioria dos portfólios, esse trade-off (performance vs captura de bounce) **faz sentido**.

Se no futuro rodar ads pesados e quiser capturar 100% dos visitantes, aí sim troca a home para GTM imediato — ou instala só o Meta Pixel base (script leve) separado do GTM lazy.

---

## O que NÃO precisa fazer

- ~~`gtm-init.js`~~ — redundante; GTM já lê URL e eventos existentes
- ~~Campos `meta_event`, `conversion_type` no código~~ — GTM mapeia direto pelos nomes dos eventos atuais
- ~~ViewContent por segmento~~ — nice-to-have; PageView + URL já segmentam audiências
- ~~Microsoft Clarity~~ — útil para UX, não para retargeting

---

## Checklist mínimo (quando decidir)

- [ ] Pixel Meta criado
- [ ] 2 tags no GTM: PageView + Lead
- [ ] GTM Preview → clicar WhatsApp → Lead dispara
- [ ] Publicar container
- [ ] Aguardar 48h → criar audiência "visitantes 30d"
- [ ] Campanha teste R$ 200–500, objetivo Mensagens ou Tráfego
