// WhatsApp — mensagens segmentadas por tipo de serviço (Fase 4.7)
(function () {
  const WA_PHONE = '5511998110569';
  const WA_MESSAGES = {
    site: 'Olá Izaias! Quero um site ou landing page profissional (a partir de R$ 450). Vim pelo portfólio e gostaria de um orçamento.',
    sistema: 'Olá Izaias! Preciso de um sistema web sob medida (dashboard, CRM ou painel). Vim pelo portfólio e quero conversar sobre escopo e prazo.',
    automacao: 'Olá Izaias! Tenho interesse em automação ou consultoria técnica (APIs, integrações, GTM). Vim pelo portfólio.',
    geral: 'Olá Izaias! Vim pelo seu portfólio e gostaria de conversar sobre um projeto.',
    faq: 'Olá Izaias! Li o FAQ do portfólio mas ainda tenho uma dúvida sobre meu projeto.',
    agenda: 'Olá Izaias! Gostaria de agendar uma conversa de 30 min sobre meu projeto.',
    blog: 'Olá Izaias! Vim pelo blog do portfólio e quero conversar sobre um projeto.',
    'blog-preco': 'Olá Izaias! Li o artigo sobre preço de site e quero um orçamento para meu negócio.',
    'blog-dev': 'Olá Izaias! Li o artigo sobre escolher desenvolvedor e gostaria de uma conversa.',
    'blog-sp': 'Olá Izaias! Li o artigo sobre preço de site em São Paulo e quero um orçamento.',
    'blog-pronto-medida': 'Olá Izaias! Li o artigo site pronto vs sob medida e quero ajuda para decidir.',
    'blog-sistema-post': 'Olá Izaias! Li o artigo sobre sistema sob medida e quero conversar sobre meu projeto.',
    'blog-gtm': 'Olá Izaias! Li o artigo sobre GTM e quero ajuda com tracking no meu site.',
    'blog-dominio': 'Olá Izaias! Li o guia de domínio e hospedagem e tenho dúvidas.',
    'case-jessica': 'Olá Izaias! Vi o case da Jéssica e quero um site parecido para meu negócio.',
    'case-bruna': 'Olá Izaias! Vi o case da Bruna e quero um site parecido para meu negócio.',
  };

  window.buildWaUrl = function (intent) {
    const text = WA_MESSAGES[intent] || WA_MESSAGES.geral;
    return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`;
  };

  window.getWaMessage = function (intent) {
    return WA_MESSAGES[intent] || WA_MESSAGES.geral;
  };

  window.detectWaIntent = function (subject, msg) {
    const t = `${subject} ${msg}`.toLowerCase();
    if (/sistema|crm|dashboard|painel|aplicativo|aplicação/.test(t)) return 'sistema';
    if (/automa|integra|api|gtm|bot|consult|script/.test(t)) return 'automacao';
    if (/site|landing|institucional|p[aá]gina|\blp\b/.test(t)) return 'site';
    return 'geral';
  };

  document.querySelectorAll('a[data-wa-intent]').forEach(function (link) {
    link.href = window.buildWaUrl(link.dataset.waIntent);
  });

  const floatingWa = document.getElementById('floatingWa');
  const floatingToggle = document.getElementById('floatingWaToggle');
  const floatingMenu = document.getElementById('floatingWaMenu');
  if (floatingToggle && floatingMenu) {
    floatingToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      const open = floatingMenu.hidden;
      floatingMenu.hidden = !open;
      floatingToggle.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', function (e) {
      if (!floatingWa || floatingWa.contains(e.target)) return;
      floatingMenu.hidden = true;
      floatingToggle.setAttribute('aria-expanded', 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || floatingMenu.hidden) return;
      floatingMenu.hidden = true;
      floatingToggle.setAttribute('aria-expanded', 'false');
      floatingToggle.focus();
    });
  }
})();

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Lazy play/pause de vídeos — só toca quando o card está visível na tela
const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    const video = e.target;
    if (e.isIntersecting) {
      video.play();
    } else {
      video.pause();
    }
  });
}, { threshold: 0.25 });
document.querySelectorAll('.project-video').forEach(v => videoObserver.observe(v));

// Mobile menu
const hamburger = document.getElementById('navHamburger');
const mobileNav = document.getElementById('mobileNav');
if (hamburger && mobileNav) {
  function setMobileNavOpen(isOpen) {
    mobileNav.classList.toggle('open', isOpen);
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    if (isOpen) {
      mobileNav.removeAttribute('aria-hidden');
      mobileNav.removeAttribute('inert');
    } else {
      mobileNav.setAttribute('aria-hidden', 'true');
      mobileNav.setAttribute('inert', '');
    }
  }

  hamburger.addEventListener('click', function () {
    setMobileNavOpen(!mobileNav.classList.contains('open'));
  });
  document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta').forEach(link => {
    link.addEventListener('click', function () {
      setMobileNavOpen(false);
    });
  });
  document.addEventListener('click', function (e) {
    if (!mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
      setMobileNavOpen(false);
    }
  });
}

// Active nav link
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
if (sections.length && navAnchors.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => navObserver.observe(s));
}

// Scroll to top
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  window.addEventListener('scroll', function () {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  });
  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Form — persiste via Vercel API, dispara eventos GTM, depois redireciona p/ WhatsApp
document.querySelectorAll('.contact-form').forEach(function (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const name     = form.querySelector('[name="name"]')?.value.trim() || '';
    const email    = form.querySelector('[name="email"]')?.value.trim() || '';
    let subject    = form.querySelector('[name="subject"]')?.value.trim() || '';
    const msg      = form.querySelector('[name="message"]')?.value.trim() || '';
    const honeypot = form.querySelector('[name="website"]')?.value || '';
    const status   = form.querySelector('.form-status');
    const btn      = form.querySelector('button[type="submit"]');
    const section  = form.dataset.section || 'contato';
    const buttonId = btn?.dataset.button || 'Submit Formulario';

    const projectType = form.querySelector('[name="project-type"]:checked')?.value;
    const typeLabels = {
      site: 'Site profissional',
      sistema: 'Sistema sob medida',
      automacao: 'Automação e consultoria',
    };
    if (!subject && projectType) subject = typeLabels[projectType] || projectType;

    btn.disabled = true;
    status.textContent = 'Enviando...';
    status.style.color = 'var(--muted)';

    try {
      await fetch('https://portifolio-api-iota.vercel.app/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message: msg, honeypot }),
      });
    } catch (_) {
      // falha silenciosa — WhatsApp garante o contato de qualquer forma
    }

    const intent = projectType || (typeof detectWaIntent === 'function' ? detectWaIntent(subject, msg) : 'geral');

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'contact_form_submitted_to_whatsapp',
      event_name: 'contact_form_submitted_to_whatsapp',
      'data-section': section,
      'data-button': buttonId,
      landing_page: window.location.pathname || '/',
      wa_intent: intent
    });

    status.textContent = '✓ Mensagem registrada! Abrindo WhatsApp em instantes...';
    status.style.color = '#5eead4';

    const opener = typeof getWaMessage === 'function' ? getWaMessage(intent) : 'Olá Izaias! Vim pelo seu portfólio.';
    const text = `${opener}\n\nNome: ${name}\nEmail: ${email}\nAssunto: ${subject}\n\n${msg}`;
    setTimeout(function () {
      window.open(`https://wa.me/5511998110569?text=${encodeURIComponent(text)}`, '_blank');
      btn.disabled = false;
    }, 2000);
  });
});

// Hero conversion panel — sempre aberto no desktop
const heroConversionDetails = document.querySelector('.hero-conversion-details');
if (heroConversionDetails) {
  const desktopMq = window.matchMedia('(min-width: 961px)');
  const syncHeroPanel = function () {
    heroConversionDetails.open = desktopMq.matches;
  };
  syncHeroPanel();
  desktopMq.addEventListener('change', syncHeroPanel);
}

// Tracking de cliques via dataLayer (mesmo padrão do datalayer-clicks.js da LP da Jéssica)
(function () {
  const landingPage = window.location.pathname.replace(/index\.html$/, '') || '/';
  window.dataLayer = window.dataLayer || [];

  function isWhatsAppLink(href) {
    return /wa\.me|api\.whatsapp\.com|whatsapp\.com/i.test(href || '');
  }

  document.addEventListener('click', function (event) {
    const el = event.target.closest('a[data-section][data-button], button[data-section][data-button]');
    if (!el) return;

    const dataSection = el.getAttribute('data-section');
    const dataButton  = el.getAttribute('data-button');
    if (!dataSection || !dataButton) return;

    const href = el.getAttribute('href');
    const eventName = isWhatsAppLink(href) ? 'cta_whatsapp_clicked' : 'interaction';
    const waIntent = el.getAttribute('data-wa-intent');

    window.dataLayer.push({
      event: eventName,
      event_name: eventName,
      'data-section': dataSection,
      'data-button': dataButton,
      element_type: el.tagName.toLowerCase(),
      landing_page: landingPage,
      ...(waIntent ? { wa_intent: waIntent } : {})
    });
  }, true);
})();

// Lead magnet form (blog posts)
document.querySelectorAll('.lead-magnet-form').forEach(form => {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = this.querySelector('input[name="name"]').value.trim();
    const email = this.querySelector('input[name="email"]').value.trim();
    const whatsapp = this.querySelector('input[name="whatsapp"]')?.value.trim() || '';
    const honeypot = this.querySelector('input[name="website"]').value;
    const pdfType = this.dataset.pdfType;
    const sourcePage = window.location.href;
    const status = this.parentElement.querySelector('.lead-magnet-status');
    const btn = this.querySelector('button[type="submit"]');

    btn.disabled = true;
    status.textContent = 'Gerando PDF...';
    status.style.color = 'var(--muted)';

    try {
      const res = await fetch('https://portifolio-api-iota.vercel.app/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, whatsapp, honeypot, pdfType, sourcePage }),
      });

      if (!res.ok) throw new Error();

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'blog_pdf_form_submitted_success',
        event_name: 'blog_pdf_form_submitted_success',
        'data-section': btn.dataset.section,
        'data-button': btn.dataset.button,
        pdf_type: pdfType,
        landing_page: sourcePage
      });

      status.textContent = '✓ PDF enviado! Confira seu e-mail (inclusive spam/promoções).';
      status.style.color = '#5eead4';
      this.reset();
    } catch {
      status.textContent = '✗ Erro ao enviar. Tente novamente ou me chame no WhatsApp.';
      status.style.color = '#f87171';
    } finally {
      btn.disabled = false;
    }
  });
});

// Newsletter form (blog index)
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value.trim();
    const honeypot = this.querySelector('input[name="website"]').value;
    const status = this.parentElement.querySelector('.newsletter-status');
    const btn = this.querySelector('button[type="submit"]');

    btn.disabled = true;
    status.textContent = 'Processando...';
    status.style.color = 'var(--muted)';

    try {
      await fetch('https://portifolio-api-iota.vercel.app/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          honeypot,
          pdfType: 'newsletter',
          sourcePage: window.location.href
        }),
      });

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'blog_index_newsletter_form_submitted',
        event_name: 'blog_index_newsletter_form_submitted',
        'data-section': 'blog-index-newsletter',
        'data-button': 'Assinar Newsletter',
        landing_page: window.location.href
      });

      status.textContent = '✓ Inscrito! Confira seu e-mail.';
      status.style.color = '#5eead4';
      this.reset();
    } catch {
      status.textContent = '✗ Erro. Tente novamente.';
      status.style.color = '#f87171';
    } finally {
      btn.disabled = false;
    }
  });
}

// Trust block — preview do GitHub via API pública (só quando visível)
const trustGithubPreview = document.getElementById('trustGithubPreview');
if (trustGithubPreview) {
  function loadGithubPreview() {
    fetch('https://api.github.com/users/izaiasramos')
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        const avatarSrc = data.avatar_url.includes('?')
          ? `${data.avatar_url}&s=96`
          : `${data.avatar_url}?s=96`;
        trustGithubPreview.innerHTML =
          `<img src="${avatarSrc}" alt="Avatar de Izaias Ramos no GitHub" width="48" height="48" loading="lazy" decoding="async">` +
          `<div class="trust-github-info">` +
          `<span class="trust-github-login">@${data.login}</span>` +
          `<span class="trust-github-stat">${data.public_repos} repositórios públicos</span>` +
          `</div>`;
        trustGithubPreview.removeAttribute('aria-hidden');
      })
      .catch(() => {
        trustGithubPreview.innerHTML =
          '<span class="trust-github-fallback">@izaiasramos — ver perfil no GitHub</span>';
      });
  }
  const githubObserver = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) {
      githubObserver.disconnect();
      loadGithubPreview();
    }
  }, { rootMargin: '200px' });
  githubObserver.observe(trustGithubPreview);
}
