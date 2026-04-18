// ============================================================
// SHOP PAGE – FILTERS & DYNAMIC RENDER
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  const productsGrid = document.getElementById('shop-products-grid');
  const priceRange = document.getElementById('price-range');
  const priceRangeValue = document.getElementById('price-range-value');
  const categoryChecks = document.querySelectorAll('input[name="category"]');
  const sortSelect = document.getElementById('sort-select');
  const resultsCount = document.querySelector('.shop-results-count');

  if (!productsGrid) return;
  
  // Expose global init function so main.js can call it once productsData is loaded
  window.initShopFilters = () => {
    if (typeof productsData === 'undefined') return;

    // Convert products object to array, and parse prices to pure floats
    let maxFoundPrice = 1000;
    const allProducts = Object.entries(productsData).map(([id, product]) => {
      let rawPrice = product.price.replace('KES', '').replace('$', '').replace(',', '').trim();
      const pPrice = parseFloat(rawPrice) || 0;
      if (pPrice > maxFoundPrice) maxFoundPrice = pPrice;
      return { 
        id, 
        ...product,
        parsedPrice: pPrice
      };
    });

    // Dynamically set price range filter max
    if (priceRange) {
      const roundedMax = Math.ceil((maxFoundPrice + 1000) / 1000) * 1000;
      priceRange.max = roundedMax;
      priceRange.min = 0;
      priceRange.value = roundedMax;
      if (priceRangeValue) {
        priceRangeValue.textContent = 'KES ' + roundedMax.toLocaleString();
      }
    }

    // ─── URL PARAMETER CHECK (NEW) ───
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('cat')?.toLowerCase();
    if (catParam) {
      categoryChecks.forEach(check => {
        const val = check.value.toLowerCase();
        // Match earrings, necklaces, jewelry sets, etc.
        if (val === catParam || val.includes(catParam) || catParam.includes(val)) {
          check.checked = true;
          // Uncheck 'All' if it's checked
          const allCheck = document.getElementById('cat-all');
          if (allCheck) allCheck.checked = false;
        }
      });
    }

    function renderProducts(products) {
      productsGrid.innerHTML = '';
      
      if (products.length === 0) {
        productsGrid.innerHTML = '<p class="no-results" style="grid-column: 1/-1; text-align: center; padding: 2rem;">No products match your filters.</p>';
        if(resultsCount) resultsCount.innerHTML = `Showing <strong>0</strong> products`;
        return;
      }

      products.forEach(product => {
        const art = document.createElement('article');
        art.className = 'product-card';
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

            <div class="product-price-row"><span class="product-price">${product.price}</span></div>
            <button class="btn btn-gold btn-add-cart full-width" data-product="${product.id}">Add to Cart</button>
          </div>
        `;
        productsGrid.appendChild(art);
      });

      if(resultsCount) resultsCount.innerHTML = `Showing <strong>${products.length}</strong> products`;
      
      // Update Sidebar Counts
      const totalCountEl = document.querySelector('label[for="cat-all"] .filter-count');
      if (totalCountEl) totalCountEl.textContent = allProducts.length;

      const catCounts = {};
      allProducts.forEach(p => {
        let cat = p.category.toLowerCase();
        if (cat.includes('necklace')) cat = 'necklaces';
        if (cat.includes('earring')) cat = 'earrings';
        if (cat.includes('set')) cat = 'sets';
        if (cat.includes('bracelet')) cat = 'bracelets';
        catCounts[cat] = (catCounts[cat] || 0) + 1;
      });

      Object.entries(catCounts).forEach(([cat, count]) => {
        const countEl = document.querySelector(`label[for="cat-filter-${cat}"] .filter-count`);
        if (countEl) countEl.textContent = count;
      });

      // Attach event listeners for buttons generated
      if(window.attachProductEvents) { window.attachProductEvents(); }
    }

    const materialChecks = document.querySelectorAll('input[name="material"]');

    function filterProducts() {
      let filtered = [...allProducts];

      // Categories
      const selectedCats = Array.from(categoryChecks)
        .filter(c => c.checked && c.value !== 'all')
        .map(c => c.value);

      if (selectedCats.length > 0) {
        filtered = filtered.filter(p => {
          const pCat = p.category.toLowerCase();
          return selectedCats.some(s => pCat.includes(s.toLowerCase().replace('filter-', '')));
        });
      }

      // Material
      const selectedMats = Array.from(materialChecks).filter(c => c.checked).map(c => c.value);
      if (selectedMats.length > 0) {
        filtered = filtered.filter(p => selectedMats.some(m => p.desc.toLowerCase().includes(m)));
      }

      // Price
      if (priceRange) {
        filtered = filtered.filter(p => p.parsedPrice <= parseFloat(priceRange.value));
      }

      // Sort
      const sortBy = sortSelect?.value || 'featured';
      if (sortBy === 'price-low') filtered.sort((a, b) => a.parsedPrice - b.parsedPrice);
      if (sortBy === 'price-high') filtered.sort((a, b) => b.parsedPrice - a.parsedPrice);
      if (sortBy === 'newest') filtered.sort((a, b) => b.id - a.id);

      renderProducts(filtered);
    }

    // Event Listeners
    categoryChecks.forEach(c => c.addEventListener('change', () => {
      if (c.id === 'cat-all' && c.checked) {
        categoryChecks.forEach(oc => { if(oc !== c) oc.checked = false; });
      } else if (c.checked) {
        const allCheck = document.getElementById('cat-all');
        if (allCheck) allCheck.checked = false;
      }
      filterProducts();
    }));
    materialChecks.forEach(c => c.addEventListener('change', filterProducts));
    priceRange?.addEventListener('input', () => {
      priceRangeValue.textContent = 'KES ' + parseFloat(priceRange.value).toLocaleString();
      filterProducts();
    });
    sortSelect?.addEventListener('change', filterProducts);

    // Initial render
    filterProducts();
  };

  // ── FIX: AUTO-TRIGGER RENDER ──
  // Listen for the 'inventoryReady' event from productsDataNew.js
  document.addEventListener('inventoryReady', () => {
    console.log("✦ Shop: Inventory data received, initializing filters...");
    window.initShopFilters();
  });

  // If products are already loaded (e.g. fast cache), init now
  if (window.productsData && Object.keys(window.productsData).length > 0) {
    window.initShopFilters();
  }
});
