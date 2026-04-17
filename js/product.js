// ============================================================
// PRODUCT PAGE – DYNAMIC LOAD & INTERACTIONS
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  const params = new URLSearchParams(window.location.search);
  const pId = params.get('id');

  // 1. DYNAMIC LOAD UI
  function updateUI() {
    if (!pId || !window.productsData) return;
    const prod = window.productsData[pId];
    if (!prod) return;

    // Update Text Content
    const title = document.querySelector('.product-details h1');
    const category = document.querySelector('.product-category');
    const price = document.querySelector('.product-price');
    const oldPrice = document.querySelector('.product-price-old');
    const discount = document.querySelector('.discount-badge');
    
    // Update breadcrumbs specifically by position
    const breadcrumbCat = document.querySelector('.breadcrumb-list li:nth-child(3) a');
    const breadcrumbName = document.querySelector('.breadcrumb-list li:nth-child(4) span');

    if (title) title.textContent = prod.name;
    if (price) price.textContent = prod.price;
    if (category) category.textContent = prod.category;
    if (breadcrumbCat) breadcrumbCat.textContent = prod.category;
    if (breadcrumbName) breadcrumbName.textContent = prod.name;

    // Hide old price and badge if we don't have discount data for these dynamic items
    if (oldPrice) oldPrice.style.display = 'none';
    if (discount) discount.style.display = 'none';

    // Update Image
    const mainImg = document.getElementById('main-img');
    if (mainImg) mainImg.src = prod.img;

    // Hide Thumbs (since user only has one image per product)
    const galleryThumbs = document.getElementById('gallery-thumbs');
    if (galleryThumbs) galleryThumbs.style.display = 'none';
  }

  // Initial attempt
  updateUI();
  // Wait for sync success
  document.addEventListener('inventoryReady', updateUI);

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
  let qtyVal = 0;

  document.getElementById('main-add-cart')?.addEventListener('click', () => {
    const btn = document.getElementById('main-add-cart');
    cartToast?.classList.add('show');
    setTimeout(() => cartToast?.classList.remove('show'), 3000);
    qtyVal++;
    if (cartCount) cartCount.textContent = qtyVal;
    
    const original = btn.textContent;
    btn.textContent = '✓ Added to Cart!';
    btn.style.background = 'linear-gradient(135deg, #708269, #58705a)';
    setTimeout(() => { btn.textContent = original; btn.style.background = ''; }, 2000);
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
