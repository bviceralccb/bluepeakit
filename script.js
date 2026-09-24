const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary-nav');
const navLinks = primaryNav.querySelectorAll('a');

function setMenu(open) {
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  primaryNav.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
}

navToggle.addEventListener('click', () => {
  setMenu(navToggle.getAttribute('aria-expanded') !== 'true');
});

navLinks.forEach((link) => link.addEventListener('click', () => {
  const wasOpen = navToggle.getAttribute('aria-expanded') === 'true';
  setMenu(false);
  if (wasOpen && link.hash) {
    const destination = document.querySelector(link.hash);
    if (destination) {
      destination.setAttribute('tabindex', '-1');
      destination.focus({ preventScroll: true });
    }
  }
}));

window.matchMedia('(min-width: 821px)').addEventListener('change', (event) => {
  if (event.matches) setMenu(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
    const focusWasInMenu = primaryNav.contains(document.activeElement);
    setMenu(false);
    if (focusWasInMenu) navToggle.focus();
  }
});

const serviceSelect = document.querySelector('#service-select');
document.querySelectorAll('[data-service]').forEach((link) => {
  link.addEventListener('click', () => {
    serviceSelect.value = link.dataset.service;
  });
});

const contactForm = document.querySelector('#contact-form');
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  const data = new FormData(contactForm);
  const name = data.get('name').trim();
  const company = data.get('company').trim();
  const service = data.get('service');
  const message = data.get('message').trim();
  const subject = `BluePeak inquiry: ${service}`;
  const body = [
    `Name: ${name}`,
    `Company: ${company || 'Not provided'}`,
    `Service: ${service}`,
    '',
    'How BluePeak can help:',
    message,
  ].join('\n');

  window.location.href = `mailto:bluepeak.managed@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.querySelector('#year').textContent = new Date().getFullYear();
