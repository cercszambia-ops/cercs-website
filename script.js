const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('#primary-nav');
if (menuToggle && primaryNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
  primaryNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    primaryNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  }));
}
document.querySelector('#year').textContent = new Date().getFullYear();
const form = document.querySelector('#contact-form');
const note = document.querySelector('#form-note');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = `CERCS enquiry: ${data.get('interest')}`;
  const body = [
    `Name: ${data.get('name')}`,
    `Organisation: ${data.get('organisation') || 'Not provided'}`,
    `Reply email: ${data.get('email')}`,
    `Area of interest: ${data.get('interest')}`,
    '',
    'Enquiry:',
    data.get('message')
  ].join('\n');
  // Replace this placeholder with CERCS's approved receiving email before publishing.
  const receivingEmail = 'cercszambia@gmail.com';
  if (!receivingEmail || receivingEmail === 'ADD-CERCS-EMAIL-BEFORE-PUBLISHING') {
    note.textContent = 'Your enquiry is ready, but CERCS must add its receiving email address in script.js before this form can send it. No information has been submitted or transmitted.';
    note.setAttribute('role', 'status');
    return;
  }
  window.location.href = `mailto:${receivingEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
