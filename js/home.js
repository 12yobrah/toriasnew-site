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
  let hasRendered = false;

  function renderFeatured() {
    if (!featuredGrid || !window.productsData) return;
    
    const items = Object.values(window.productsData);
    if (items.length === 0) {
      // Show loading state only if we haven't rendered yet
      if (!hasRendered) {
        featuredGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: rgba(255,255,255,0.4); padding: 3rem 0;">Loading curated collection...</p>';
      }
      return;
    }

    hasRendered = true;
    featuredGrid.innerHTML = '';
    
    // Get first 8 products
    const displayItems = items.slice(0, 8);
    
    displayItems.forEach(product => {
      const art = document.createElement('article');
      art.className = 'product-card animate-up is-visible';
      art.dataset.productId = product.id;
      art.innerHTML = `
        <div class="product-img-wrap">
          <img src="${product.img}" alt="${product.name}" loading="lazy" />
          <button class="wishlist-toggle" data-product="${product.id}" aria-label="Add to Wishlist">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
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

    // Re-attach event handlers & observers
    if (window.attachProductEvents) window.attachProductEvents();
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
