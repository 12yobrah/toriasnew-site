// ============================================================
// CONTACT PAGE – FORM VALIDATION & SUBMISSION
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('contact-form');
  const success = document.getElementById('contact-success');

  form?.addEventListener('submit', e => {
    e.preventDefault();
    const firstName = document.getElementById('contact-first-name')?.value.trim();
    const email     = document.getElementById('contact-email')?.value.trim();
    const subject   = document.getElementById('contact-subject')?.value;
    const message   = document.getElementById('contact-message')?.value.trim();
    const submitBtn = document.getElementById('contact-submit');

    let valid = true;
    const fields = [
      { el: document.getElementById('contact-first-name'), check: v => v.length > 0 },
      { el: document.getElementById('contact-email'), check: v => v.includes('@') && v.includes('.') },
      { el: document.getElementById('contact-subject'), check: v => v !== '' },
      { el: document.getElementById('contact-message'), check: v => v.length > 10 },
    ];

    fields.forEach(({ el, check }) => {
      if (!el) return;
      const v = el.value.trim();
      if (!check(v)) {
        el.style.borderColor = '#b91c1c';
        valid = false;
      } else {
        el.style.borderColor = '';
      }
    });

    if (!valid) return;

    // Simulate submission
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    setTimeout(() => {
      form.querySelectorAll('input, select, textarea').forEach(el => { el.value = ''; el.style.borderColor = ''; });
      success?.removeAttribute('hidden');
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
      success?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1500);
  });

  // Real-time border reset on typing
  form?.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => { el.style.borderColor = ''; });
  });

});
