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
  hamburger.addEventListener('click', function () {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileNav.setAttribute('aria-hidden', !isOpen);
  });
  document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta').forEach(link => {
    link.addEventListener('click', function () {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
    });
  });
  document.addEventListener('click', function (e) {
    if (!mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
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
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const name     = document.getElementById('fname').value.trim();
    const email    = document.getElementById('femail').value.trim();
    const subject  = document.getElementById('fsubject').value.trim();
    const msg      = document.getElementById('fmsg').value.trim();
    const honeypot = document.getElementById('fhoneypot').value;
    const status   = document.getElementById('formStatus');
    const btn      = this.querySelector('button[type="submit"]');

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

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'lead_form_persisted',
      event_name: 'lead_form_persisted',
      'data-section': 'contato',
      'data-button': 'Submit Formulario',
      landing_page: window.location.pathname || '/'
    });
    window.dataLayer.push({
      event: 'form_submit_success',
      event_name: 'form_submit_success',
      'data-section': 'contato',
      'data-button': 'Submit Formulario',
      landing_page: window.location.pathname || '/'
    });

    status.textContent = '✓ Mensagem registrada! Abrindo WhatsApp em instantes...';
    status.style.color = '#5eead4';

    const text = `Olá Izaias! Vim pelo seu portfólio.\n\nNome: ${name}\nEmail: ${email}\nAssunto: ${subject}\n\n${msg}`;
    setTimeout(function () {
      window.open(`https://wa.me/5511998110569?text=${encodeURIComponent(text)}`, '_blank');
      btn.disabled = false;
    }, 2000);
  });
}

// Calendly lazy load — injeta o widget só quando a seção entra no viewport
const calendlyWidget = document.getElementById('calendlyWidget');
if (calendlyWidget) {
  const calObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      calObs.disconnect();
      const url = calendlyWidget.dataset.url;
      const loader = document.getElementById('calendlyLoader');
      const embed = document.createElement('div');
      embed.className = 'calendly-inline-widget';
      embed.dataset.url = url;
      embed.setAttribute('data-resize', 'true'); // ativa auto-resize via postMessage
      if (loader) loader.remove();
      calendlyWidget.appendChild(embed);
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    });
  }, { threshold: 0.1 });
  calObs.observe(calendlyWidget);
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
    const eventName = isWhatsAppLink(href) ? 'lead_whatsapp' : 'interaction';

    window.dataLayer.push({
      event: eventName,
      event_name: eventName,
      'data-section': dataSection,
      'data-button': dataButton,
      element_type: el.tagName.toLowerCase(),
      landing_page: landingPage
    });
  }, true);
})();
