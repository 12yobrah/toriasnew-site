// ============================================================
// HOME PAGE – TESTIMONIALS SLIDER & DYNAMIC PRODUCTS
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  // ── HERO ANIMATIONS ────────────────────────────────────────
  setTimeout(() => {
    document.querySelectorAll('.hero .animate-up').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 150);
    });
  }, 300);

  // ── DYNAMIC FEATURED PRODUCTS ──────────────────────────────
  const featuredGrid = document.getElementById('featured-products-grid');

  function renderFeatured() {
    if (!featuredGrid || !window.productsData) return;
    featuredGrid.innerHTML = '';
    
    // Get first 8 products
    const items = Object.values(window.productsData).slice(0, 8);
    
    items.forEach(product => {
      const art = document.createElement('article');
      art.className = 'product-card animate-up';
      art.dataset.productId = product.id;
      art.innerHTML = `
        <div class="product-img-wrap">
          <img src="${product.img}" alt="${product.name}" loading="lazy" />
          <div class="product-overlay">
            <button class="overlay-btn quick-view-btn" data-product="${product.id}">Quick View</button>
          </div>
        </div>
        <div class="product-info">
          <p class="product-category">${product.category}</p>
          <h3 class="product-name"><a href="product.html?id=${product.id}">${product.name}</a></h3>
          <div class="product-price-row">
            <span class="product-price">${product.price}</span>
          </div>
          <button class="btn btn-gold btn-add-cart full-width" data-product="${product.id}">Add to Cart</button>
        </div>
      `;
      featuredGrid.appendChild(art);
    });

    // Re-attach observers for new elements
    attachObservers();
  }

  // Initial attempt
  renderFeatured();
  // Wait for sync success
  document.addEventListener('inventoryReady', renderFeatured);

  // ── TESTIMONIALS SLIDER ────────────────────────────────────
  const track = document.getElementById('testimonials-track');
  const dots = document.querySelectorAll('#slider-dots .dot');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');

  if (track) {
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

    function startAutoPlay() { autoPlayInterval = setInterval(nextSlide, 5000); }
    function stopAutoPlay() { clearInterval(autoPlayInterval); }

    nextBtn?.addEventListener('click', () => { nextSlide(); stopAutoPlay(); startAutoPlay(); });
    prevBtn?.addEventListener('click', () => { prevSlide(); stopAutoPlay(); startAutoPlay(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { goToSlide(i); stopAutoPlay(); startAutoPlay(); }));

    startAutoPlay();
  }

  // ── INTERSECTION OBSERVER ──────────────────────────────────
  function attachObservers() {
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
      if (el.style.opacity === '1') return; // skip already visible
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = `opacity 0.6s ease ${i * 0.07}s, transform 0.6s ease ${i * 0.07}s`;
      sectionObserver.observe(el);
    });
  }

  attachObservers();

});
