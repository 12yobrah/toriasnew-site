// ============================================================
// PRODUCT PAGE – GALLERY & INTERACTIONS
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  // ── GALLERY ──────────────────────────────────────────────────
  const mainImg = document.getElementById('main-img');
  const thumbs = document.querySelectorAll('.gallery-thumb');

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      if (mainImg) {
        mainImg.style.transition = 'opacity 0.18s ease';
        mainImg.style.opacity = '0';
        setTimeout(() => {
          mainImg.src = thumb.dataset.img;
          mainImg.onload = () => { mainImg.style.opacity = '1'; };
          mainImg.onerror = () => { mainImg.style.opacity = '1'; }; // always restore
        }, 180);
      }
    });
  });

  // ── QUANTITY ─────────────────────────────────────────────────
  const qtyInput = document.getElementById('product-qty');
  document.getElementById('product-qty-minus')?.addEventListener('click', () => {
    if (qtyInput && +qtyInput.value > 1) qtyInput.value = +qtyInput.value - 1;
  });
  document.getElementById('product-qty-plus')?.addEventListener('click', () => {
    if (qtyInput && +qtyInput.value < 10) qtyInput.value = +qtyInput.value + 1;
  });

  // ── MAIN ADD TO CART ─────────────────────────────────────────
  const cartToast = document.getElementById('cart-toast');
  const cartCount = document.querySelector('.cart-count');
  let qty = 2;

  document.getElementById('main-add-cart')?.addEventListener('click', () => {
    const btn = document.getElementById('main-add-cart');
    cartToast?.classList.add('show');
    setTimeout(() => cartToast?.classList.remove('show'), 3000);
    qty++;
    if (cartCount) cartCount.textContent = qty;
    const original = btn.textContent;
    btn.textContent = '✓ Added to Cart!';
    btn.style.background = 'linear-gradient(135deg, #708269, #58705a)';
    setTimeout(() => { btn.textContent = original; btn.style.background = ''; }, 2000);
  });

  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      cartToast?.classList.add('show');
      setTimeout(() => cartToast?.classList.remove('show'), 3000);
      qty++;
      if (cartCount) cartCount.textContent = qty;
    });
  });

  // ── WISHLIST ─────────────────────────────────────────────────
  const wishlistBtn = document.getElementById('wishlist-product-btn');
  wishlistBtn?.addEventListener('click', () => {
    wishlistBtn.classList.toggle('active');
    const svg = wishlistBtn.querySelector('svg');
    if (wishlistBtn.classList.contains('active')) {
      svg.style.fill = 'var(--clr-gold)';
      svg.style.stroke = 'var(--clr-gold)';
    } else {
      svg.style.fill = 'none';
      svg.style.stroke = 'currentColor';
    }
  });

});
