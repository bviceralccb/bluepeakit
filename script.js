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

navLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
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

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
