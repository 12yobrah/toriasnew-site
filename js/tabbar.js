/* ============================================================
   MOBILE BOTTOM TAB BAR – Active State & Search Integration
   ============================================================ */
(function () {
  'use strict';

  const page = location.pathname.split('/').pop() || 'index.html';

  // Map page filenames to tab data-tab values
  const TAB_MAP = {
    'index.html':    'home',
    '':              'home',
    'shop.html':     'shop',
    'product.html':  'shop',
    'cart.html':     'cart',
    'checkout.html': 'cart',
    'checkout-mpesa.html': 'cart',
    'account.html':  'wishlist',
    'about.html':    null,
    'contact.html':  null,
    'faqs.html':     null,
  };

  const activeTab = TAB_MAP[page];

  // Set the active tab
  if (activeTab) {
    const el = document.querySelector(`.tab-bar-item[data-tab="${activeTab}"]`);
    if (el) el.classList.add('active');
  }

  // Wire up the Search tab to open the existing search overlay
  const searchTab = document.getElementById('tab-search');
  if (searchTab) {
    searchTab.addEventListener('click', function (e) {
      e.preventDefault();
      // Try the existing search overlay toggling from main.js
      const searchOverlay = document.getElementById('search-overlay');
      const searchInput = document.getElementById('search-input');
      if (searchOverlay) {
        searchOverlay.hidden = false;
        searchOverlay.classList.add('open');
        if (searchInput) searchInput.focus();
      }
    });
  }

  // Sync cart & wishlist badge counts from localStorage
  function syncBadges() {
    try {
      const cart = JSON.parse(localStorage.getItem('tgh_cart') || '[]');
      const wishlist = JSON.parse(localStorage.getItem('tgh_wishlist') || '[]');
      const cartCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

      document.querySelectorAll('.cart-count-tab').forEach(el => {
        el.textContent = cartCount;
        el.style.display = cartCount > 0 ? 'flex' : 'none';
      });
      document.querySelectorAll('.wishlist-count-tab').forEach(el => {
        el.textContent = wishlist.length;
        el.style.display = wishlist.length > 0 ? 'flex' : 'none';
      });
    } catch (_) { /* silent */ }
  }

  syncBadges();

  // Re-sync on storage changes (e.g. when another tab updates the cart)
  window.addEventListener('storage', syncBadges);

  // Also re-sync periodically for same-page cart/wishlist updates
  setInterval(syncBadges, 2000);
})();
