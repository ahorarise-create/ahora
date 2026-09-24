const menuTrigger = document.querySelector('.menu-trigger');
const navigation = document.querySelector('#main-nav');

if (menuTrigger && navigation) {
  menuTrigger.addEventListener('click', () => {
    const isOpen = menuTrigger.getAttribute('aria-expanded') === 'true';
    menuTrigger.setAttribute('aria-expanded', String(!isOpen));
    menuTrigger.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
    menuTrigger.classList.toggle('is-open', !isOpen);
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuTrigger.setAttribute('aria-expanded', 'false');
      menuTrigger.setAttribute('aria-label', 'Abrir menu');
      menuTrigger.classList.remove('is-open');
      navigation.classList.remove('is-open');
    });
  });
}

const revealTargets = document.querySelectorAll('.intro-content, .intro-aside, .services-heading h2, .services-heading > p, .service-item, .process-intro, .process-steps article, .contact-content > div, .section-label');
revealTargets.forEach((item) => {
  item.classList.add('reveal');
});

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14 });
  revealTargets.forEach((item) => revealObserver.observe(item));
} else {
  revealTargets.forEach((item) => item.classList.add('is-visible'));
}

const animatedLogo = document.querySelector('.hero-wordmark');
const homeBrand = document.querySelector('.brand');
function replayLogoArrival() {
  if (!animatedLogo) return;
  animatedLogo.style.setProperty('animation', 'none', 'important');
  void animatedLogo.offsetWidth;
  animatedLogo.style.removeProperty('animation');
}

replayLogoArrival();
homeBrand?.addEventListener('click', replayLogoArrival);
window.addEventListener('pageshow', (event) => {
  if (event.persisted) replayLogoArrival();
});
