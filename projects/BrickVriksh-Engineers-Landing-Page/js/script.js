document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const contactForm = document.getElementById('contact-form');

if (contactForm) {
  const formNote = document.getElementById('form-note');

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formNote.textContent = "Thanks — we've received your details and will get back to you shortly.";
    contactForm.reset();
  });
}
