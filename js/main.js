// ============================================================
// TORIAS GLAM HAVEN HAVEN – MAIN JAVASCRIPT
// ============================================================

const SUPABASE_URL = 'https://xfuhxmrqykkmfqcpshhs.supabase.co';
const SUPABASE_KEY = 'sb_publishable_tA-hIr0xRAkpb_Rt0l_Odg_nonm1k6v';
const supabaseClient = (typeof supabase !== 'undefined') ? supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

document.addEventListener('DOMContentLoaded', () => {

  // ── PROMO BANNER ───────────────────────────────────────────
  const promoBanner = document.getElementById('promo-banner');
  const promoClose = document.getElementById('promo-close');
  if (promoClose && promoBanner) {
    promoClose.addEventListener('click', () => {
      promoBanner.style.maxHeight = promoBanner.scrollHeight + 'px';
      requestAnimationFrame(() => {
        promoBanner.style.transition = 'max-height 0.4s ease, opacity 0.4s ease';
        promoBanner.style.maxHeight = '0';
        promoBanner.style.opacity = '0';
        promoBanner.style.overflow = 'hidden';
      });
    });
  }

  // ── STICKY HEADER ──────────────────────────────────────────
  const siteHeader = document.getElementById('site-header');
  const promoHeight = promoBanner ? promoBanner.offsetHeight : 0;

  function applyHeaderOffset() {
    if (siteHeader) {
      const bannerH = (promoBanner && promoBanner.offsetHeight > 0) ? promoBanner.offsetHeight : 0;
      siteHeader.style.top = bannerH + 'px';
    }
  }

  window.addEventListener('scroll', () => {
    if (!siteHeader) return;
    const scrolled = window.scrollY > 40;
    siteHeader.classList.toggle('scrolled', scrolled);
    if (!scrolled) applyHeaderOffset();
    else siteHeader.style.top = '0';
  }, { passive: true });

  applyHeaderOffset();

  // ── MOBILE NAV ─────────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('main-nav');

  if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on nav link click
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ── SEARCH OVERLAY ─────────────────────────────────────────
  const searchBtn = document.getElementById('search-btn');
  const searchOverlay = document.getElementById('search-overlay');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.getElementById('search-input');

  function openSearch() {
    searchOverlay.classList.add('open');
    searchOverlay.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput?.focus(), 100);
  }
  function closeSearch() {
    searchOverlay.classList.remove('open');
    searchOverlay.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  searchBtn?.addEventListener('click', openSearch);
  searchClose?.addEventListener('click', closeSearch);
  searchOverlay?.addEventListener('click', e => {
    if (e.target === searchOverlay) closeSearch();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeSearch();
      closeModal();
    }
  });

  // ── ACTIVE NAV LINK ────────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
  // ── AUTH HUD ───────────────────────────────────────────────
  const headerActions = document.querySelector('.header-actions');
  const userIconMarkup = `
    <a href="entry.html" class="icon-btn auth-btn" id="header-auth-btn" aria-label="Account">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    </a>
  `;

  if (headerActions && !document.getElementById('header-auth-btn')) {
    // Insert before the hamburger
    const hamburger = document.getElementById('hamburger');
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = userIconMarkup;
    headerActions.insertBefore(tempDiv.firstElementChild, hamburger);
  }

  async function checkAuthState() {
    if (!supabaseClient) return;
    const { data: { user } } = await supabaseClient.auth.getUser();
    const authBtn = document.getElementById('header-auth-btn');
    if (user && authBtn) {
      authBtn.href = 'account.html';
      authBtn.classList.add('logged-in');
      authBtn.style.color = 'var(--clr-gold)';
    }
  }
  checkAuthState();

  // ── SCROLL ANIMATIONS ──────────────────────────────────────
  const animatedEls = document.querySelectorAll('.animate-up');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  animatedEls.forEach(el => observer.observe(el));

  // ── QUICK VIEW MODAL ───────────────────────────────────────
  const modal = document.getElementById('quick-view-modal');
  const modalClose = document.getElementById('modal-close');


  // Let shop.js know the data is ready if it loaded first
  if (typeof window.initShopFilters === 'function') {
    window.initShopFilters();
  }

  // ── SEARCH LOGIC ───────────────────────────────────────────
  const searchResults = document.getElementById('search-results');
  searchInput?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      searchResults.innerHTML = '';
      return;
    }

    const filtered = Object.values(productsData).filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query) ||
      p.desc.toLowerCase().includes(query)
    );

    searchResults.innerHTML = filtered.map(p => `
      <a href="${p.link}" class="search-result-item">
        <img src="${p.img}" alt="${p.name}" class="search-result-img" />
        <div class="search-result-info">
          <h4>${p.name}</h4>
          <p>${p.category}</p>
          <span class="price">${p.price}</span>
        </div>
      </a>
    `).join('') || `<p style="grid-column: 1/-1; text-align: center; color: var(--clr-maroon-light); margin-top: 40px;">No results found for "${query}"</p>`;
  });

  function openModal(productId) {
    const p = productsData[productId];
    if (!p || !modal) return;
    document.getElementById('modal-name').textContent = p.name;
    document.getElementById('modal-category').textContent = p.category;
    document.getElementById('modal-price').textContent = p.price;
    const oldPriceEl = document.getElementById('modal-old-price');
    if (oldPriceEl) { oldPriceEl.textContent = p.oldPrice; oldPriceEl.style.display = p.oldPrice ? '' : 'none'; }
    document.getElementById('modal-stars').textContent = p.stars;
    document.getElementById('modal-rating-count').textContent = p.ratingCount;
    // Load image with fade-in, never clear to empty first (causes blank white)
    const imgEl = document.getElementById('modal-img');
    if (imgEl) {
      imgEl.alt = p.name;
      imgEl.style.opacity = '0';
      imgEl.onload = () => { imgEl.style.transition = 'opacity 0.35s ease'; imgEl.style.opacity = '1'; };
      imgEl.onerror = () => { imgEl.style.opacity = '1'; };
      imgEl.src = p.img;
    }
    document.getElementById('modal-desc').textContent = p.desc;
    const viewLink = document.getElementById('modal-view-full');
    if (viewLink) viewLink.href = p.link;
    document.getElementById('modal-qty').value = 1;
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    // Store active product id for add-to-cart
    modal.dataset.activeProduct = productId;
  }

  function closeModal() {
    if (modal) {
      modal.setAttribute('hidden', '');
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('.quick-view-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal(+btn.dataset.product));
  });
  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  // Modal qty controls
  const qtyInput = document.getElementById('modal-qty');
  document.getElementById('qty-minus')?.addEventListener('click', () => {
    if (qtyInput && +qtyInput.value > 1) qtyInput.value = +qtyInput.value - 1;
  });
  document.getElementById('qty-plus')?.addEventListener('click', () => {
    if (qtyInput && +qtyInput.value < 10) qtyInput.value = +qtyInput.value + 1;
  });

  // ── CART TOAST ─────────────────────────────────────────────
  const cartToast = document.getElementById('cart-toast');
  const cartCount = document.querySelector('.cart-count');
  let cartQty = 2;

  function showCartToast() {
    if (!cartToast) return;
    cartToast.classList.add('show');
    setTimeout(() => cartToast.classList.remove('show'), 3000);
    cartQty++;
    if (cartCount) cartCount.textContent = cartQty;
  }

  // ── CART STATE & SYNC ─────────────────────────────────────────
  window.cart = JSON.parse(localStorage.getItem('tgh_cart') || '[]');

  function updateCartBadge() {
    const totalQty = window.cart.reduce((acc, item) => acc + item.qty, 0);
    if (cartCount) cartCount.textContent = totalQty;
  }
  updateCartBadge();

  window.addToCart = async (productId, qty = 1) => {
    const existing = window.cart.find(item => item.id === productId);
    if (existing) existing.qty += qty;
    else window.cart.push({ id: productId, qty });

    localStorage.setItem('tgh_cart', JSON.stringify(window.cart));
    updateCartBadge();
    showCartToast();

    // Cloud sync if logged in
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (user) {
      await supabaseClient.from('cart_items').upsert({
        user_id: user.id,
        product_id: productId,
        quantity: existing ? existing.qty : qty
      }, { onConflict: 'user_id, product_id' });
    }
  };

  // Sync cloud cart to local on startup if logged in
  async function syncFromCloud() {
    if (!supabaseClient) return;
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) return;

    const { data: cloudItems } = await supabaseClient
      .from('cart_items')
      .select('*');
    
    if (cloudItems && cloudItems.length > 0) {
      // Simple merge: cloud takes precedence for this demo
      window.cart = cloudItems.map(ci => ({ id: ci.product_id, qty: ci.quantity }));
      localStorage.setItem('tgh_cart', JSON.stringify(window.cart));
      updateCartBadge();
    }
  }
  syncFromCloud();

  // ── ATTACH PRODUCT EVENTS (For dynamic content) ───────────────
  window.attachProductEvents = () => {
    // Add to Cart
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
      btn.addEventListener('click', () => {
        const pId = btn.dataset.product || modal?.dataset.activeProduct;
        if (pId) window.addToCart(parseInt(pId));
        
        const originalText = btn.textContent;
        btn.textContent = '✓ Added!';
        btn.classList.add('added');
        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove('added');
        }, 1800);
      });
    });

    // Quick View
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
      btn.addEventListener('click', () => openModal(+btn.dataset.product));
    });

    // Wishlist Toggle
    document.querySelectorAll('.wishlist-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        const svg = btn.querySelector('svg');
        const wishlistBadge = document.querySelector('.wishlist-count');
        let currentCount = parseInt(wishlistBadge?.textContent || '0');

        if (btn.classList.contains('active')) {
          svg.style.fill = 'var(--clr-gold)';
          svg.style.stroke = 'var(--clr-gold)';
          currentCount++;
        } else {
          svg.style.fill = 'none';
          svg.style.stroke = 'currentColor';
          currentCount = Math.max(0, currentCount - 1);
        }
        if (wishlistBadge) wishlistBadge.textContent = currentCount;
      });
    });
  };

  // Initial call
  window.attachProductEvents();

  // ── NEWSLETTER FORM ────────────────────────────────────────
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterSuccess = document.getElementById('newsletter-success');

  newsletterForm?.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('newsletter-email')?.value;
    if (email && email.includes('@')) {
      newsletterSuccess?.removeAttribute('hidden');
      newsletterForm.querySelector('input').value = '';
      newsletterForm.querySelector('.newsletter-input-group').style.opacity = '0.5';
      newsletterForm.querySelector('.newsletter-input-group').style.pointerEvents = 'none';
    }
  });

});

