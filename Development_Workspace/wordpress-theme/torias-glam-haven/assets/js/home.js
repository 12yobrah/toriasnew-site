// ============================================================
// HOME PAGE – TESTIMONIALS SLIDER
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  // ── HERO ANIMATIONS ────────────────────────────────────────
  setTimeout(() => {
    document.querySelectorAll('.hero .animate-up').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 150);
    });
  }, 300);

  // ── TESTIMONIALS SLIDER ────────────────────────────────────
  const track = document.getElementById('testimonials-track');
  const dots = document.querySelectorAll('#slider-dots .dot');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');

  if (!track) return;

  let currentSlide = 0;
  const totalSlides = dots.length;
  let autoPlayInterval = null;

  function goToSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
  }
  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  nextBtn?.addEventListener('click', () => { nextSlide(); stopAutoPlay(); startAutoPlay(); });
  prevBtn?.addEventListener('click', () => { prevSlide(); stopAutoPlay(); startAutoPlay(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goToSlide(i); stopAutoPlay(); startAutoPlay(); }));

  // Touch support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) { dx < 0 ? nextSlide() : prevSlide(); }
  });

  startAutoPlay();

  // ── INTERSECTION OBSERVER for sections ─────────────────────
  const sectionEls = document.querySelectorAll('.feature-item, .category-card, .product-card, .insta-item');
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  sectionEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.07}s, transform 0.6s ease ${i * 0.07}s`;
    sectionObserver.observe(el);
  });

});
