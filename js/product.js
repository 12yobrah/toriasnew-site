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
    const title = document.querySelector('.product-details-title');
    const categoryLabel = document.querySelector('.product-category');
    const price = document.querySelector('.product-price');
    const oldPrice = document.querySelector('.product-price-old');
    const discount = document.querySelector('.discount-badge');
    
    // Update breadcrumbs specifically by position
    const breadcrumbCat = document.querySelector('.breadcrumb-list li:nth-child(3) a');
    const breadcrumbName = document.querySelector('.breadcrumb-list li:nth-child(4) span');

    if (title) title.textContent = prod.name;
    if (price) price.textContent = prod.price;
    if (categoryLabel) categoryLabel.textContent = prod.category;
    if (breadcrumbCat) {
      breadcrumbCat.textContent = prod.category;
      breadcrumbCat.href = `shop.html?cat=${prod.category.toLowerCase()}`;
    }
    if (breadcrumbName) breadcrumbName.textContent = prod.name;

    // Hide old price and badge if we don't have discount data
    if (oldPrice) oldPrice.style.display = 'none';
    if (discount) discount.style.display = 'none';

    // Update Image & Fade In
    const mainImg = document.getElementById('main-img');
    if (mainImg) {
      if (mainImg.src !== prod.img) {
        mainImg.src = prod.img;
        mainImg.onload = () => { mainImg.style.opacity = '1'; };
      } else {
        mainImg.style.opacity = '1';
      }
    }

    // Hide Thumbs (since user only has one image per product)
    const galleryThumbs = document.getElementById('gallery-thumbs');
    if (galleryThumbs) galleryThumbs.style.display = 'none';

    // Render Smart Related Products
    renderRelated(prod.category);
  }

  function renderRelated(currentCategory) {
    const relatedGrid = document.querySelector('.related-section .products-grid');
    if (!relatedGrid || !window.productsData) return;
    relatedGrid.innerHTML = '';

    // Filter by same category, exclude current, and limit to 4
    let items = Object.values(window.productsData)
      .filter(p => p.id !== pId && p.category === currentCategory)
      .slice(0, 4);

    // If we don't have enough in the same category, fill with others
    if (items.length < 4) {
      const others = Object.values(window.productsData)
        .filter(p => p.id !== pId && p.category !== currentCategory)
        .slice(0, 4 - items.length);
      items = [...items, ...others];
    }

    items.forEach(product => {
      const art = document.createElement('article');
      art.className = 'product-card';
      art.innerHTML = `
        <div class="product-img-wrap">
          <img src="${product.img}" alt="${product.name}" loading="lazy" />
          <div class="product-overlay">
            <button class="overlay-btn" onclick="window.location.href='product.html?id=${product.id}'">Quick View</button>
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
      relatedGrid.appendChild(art);
    });
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
