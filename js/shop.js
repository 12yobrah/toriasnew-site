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
    const allProducts = Object.entries(productsData).map(([id, product]) => {
      let rawPrice = product.price.replace('KES', '').replace('$', '').replace(',', '').trim();
      return { 
        id, 
        ...product,
        parsedPrice: parseFloat(rawPrice)
      };
    });

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
            <div class="product-overlay">
              <button class="overlay-btn quick-view-btn" data-product="${product.id}">Quick View</button>
              <button class="overlay-btn wishlist-toggle" data-product="${product.id}" aria-label="Wishlist">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
            </div>
          </div>
          <div class="product-info">
            <p class="product-category">${product.category}</p>
            <h3 class="product-name"><a href="product.html?id=${product.id}">${product.name}</a></h3>
            <div class="product-rating">
              <span class="stars">${product.stars}</span>
              <span class="rating-count">${product.ratingCount}</span>
            </div>
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
    }    const materialChecks = document.querySelectorAll('input[name="material"]');
    const searchInput = document.getElementById('search-input');

    function filterProducts() {
      // Categories
      const activeCategories = Array.from(categoryChecks)
        .filter(cb => cb.checked)
        .map(cb => cb.value.toLowerCase());

      // Materials
      const activeMaterials = Array.from(materialChecks)
        .filter(cb => cb.checked)
        .map(cb => cb.value.toLowerCase());

      // Price
      const maxPrice = parseFloat(priceRange.value);
      
      // Sort
      const sortValue = sortSelect ? sortSelect.value : 'featured';

      // Search Query
      const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';

      let filtered = allProducts.filter(p => {
        // 1. Filter by price
        if (p.parsedPrice > maxPrice) return false;
        
        // 2. Filter by Search Query (Name & Description)
        if (searchQuery) {
          const textMatch = p.name.toLowerCase().includes(searchQuery) || 
                            p.desc.toLowerCase().includes(searchQuery);
          if (!textMatch) return false;
        }

        // 3. Filter by Category
        if (!activeCategories.includes('all') && activeCategories.length > 0) {
          let catMatch = false;
          let pCat = p.category.toLowerCase(); // e.g. "necklace" or "jewelry sets"
          
          if (activeCategories.includes('sets') && pCat.includes('set')) catMatch = true;
          if (activeCategories.includes('earrings') && pCat.includes('earring')) catMatch = true;
          if (activeCategories.includes('necklaces') && pCat.includes('necklace')) catMatch = true;
          if (activeCategories.includes('bracelets') && pCat.includes('bracelet')) catMatch = true;
          
          if (!catMatch) return false;
        }

        // 4. Filter by Material
        if (activeMaterials.length > 0) {
          const searchableText = (p.name + " " + p.desc).toLowerCase();
          const hasMaterial = activeMaterials.some(mat => searchableText.includes(mat));
          if (!hasMaterial) return false;
        }

        return true;
      });

      // Sorting
      if (sortValue === 'price-low') {
        filtered.sort((a, b) => a.parsedPrice - b.parsedPrice);
      } else if (sortValue === 'price-high') {
        filtered.sort((a, b) => b.parsedPrice - a.parsedPrice);
      } else if (sortValue === 'rating') {
        filtered.sort((a, b) => (b.stars.match(/★/g)||[]).length - (a.stars.match(/★/g)||[]).length);
      } else if (sortValue === 'popular') {
        filtered.sort((a, b) => parseInt(b.ratingCount.replace(/\D/g,'')) - parseInt(a.ratingCount.replace(/\D/g,'')));
      }

      renderProducts(filtered);
    }

    // Event Listeners
    if (priceRange) {
      priceRange.addEventListener('input', () => {
        priceRangeValue.textContent = 'KES ' + parseInt(priceRange.value).toLocaleString();
        filterProducts();
      });
    }
    
    if (sortSelect) {
      sortSelect.addEventListener('change', filterProducts);
    }

    if (searchInput) {
      searchInput.addEventListener('input', filterProducts);
    }

    // Clear filters
    document.getElementById('clear-filters')?.addEventListener('click', () => {
      categoryChecks.forEach(cb => cb.checked = (cb.value === 'all'));
      materialChecks.forEach(cb => cb.checked = false);
      if (searchInput) searchInput.value = '';
      if (priceRange) { priceRange.value = 2000; priceRangeValue.textContent = 'KES 2,000'; }
      if (sortSelect) sortSelect.value = 'featured';
      filterProducts();
    });

    materialChecks.forEach(cb => cb.addEventListener('change', filterProducts));

    categoryChecks.forEach(cb => {
      cb.addEventListener('change', (e) => {
        if (e.target.value === 'all' && e.target.checked) {
          categoryChecks.forEach(c => { if(c.value !== 'all') c.checked = false; });
        } else if (e.target.value !== 'all' && e.target.checked) {
          const allCb = Array.from(categoryChecks).find(c => c.value === 'all');
          if (allCb) allCb.checked = false;
        }
        if (Array.from(categoryChecks).filter(c => c.checked).length === 0) {
          const allCb = Array.from(categoryChecks).find(c => c.value === 'all');
          if (allCb) allCb.checked = true;
        }
        filterProducts();
      });
    });

    // View toggle
    const gridView = document.getElementById('grid-view');
    const listView = document.getElementById('list-view');

    gridView?.addEventListener('click', () => {
      gridView.classList.add('active'); listView.classList.remove('active');
      productsGrid.style.gridTemplateColumns = '';
    });

    listView?.addEventListener('click', () => {
      listView.classList.add('active'); gridView.classList.remove('active');
      productsGrid.style.gridTemplateColumns = '1fr';
    });

    // Initial Render
    if (priceRange) { priceRange.max = "2000"; priceRange.value = "2000"; priceRangeValue.textContent = "KES 2,000"; }
    filterProducts();
  };
  
  // Call init if productsData loaded, else trust main.js to call it
  if(typeof productsData !== 'undefined') {
    window.initShopFilters();
  }
});
