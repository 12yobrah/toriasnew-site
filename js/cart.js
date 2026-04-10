// ============================================================
// CART PAGE – DYNAMIC RENDERING FROM STATE
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  const cartContainer = document.getElementById('cart-container-js');
  const TAX_RATE = 0.08;

  function renderCart() {
    if (!cartContainer) return;

    if (!window.cart || window.cart.length === 0) {
      cartContainer.innerHTML = `<p style="text-align:center; padding: 50px; color: rgba(255,255,255,0.4);">Your cart is empty.</p>`;
      updateTotals(0);
      return;
    }

    cartContainer.innerHTML = window.cart.map(item => {
      const p = productsData[item.id] || { name: 'Jewelry Item', price: 'KES 0', img: '' };
      const priceNum = parseInt(p.price.replace(/[^0-9]/g, '')) || 0;
      const subtotal = priceNum * item.qty;

      return `
        <div class="cart-item" id="cart-item-${item.id}">
          <div class="cart-item-product">
            <img src="${p.img}" alt="${p.name}" class="cart-item-img" />
            <div class="cart-item-info">
              <h4>${p.name}</h4>
              <p>${p.category || 'Jewelry'}</p>
            </div>
          </div>
          <div class="cart-item-price">${p.price}</div>
          <div class="qty-control" style="justify-self:start">
            <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
            <input type="number" class="cart-qty-input" value="${item.qty}" readonly />
            <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
          </div>
          <div class="cart-item-subtotal">KES ${subtotal.toLocaleString()}</div>
          <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
        </div>
      `;
    }).join('');

    calculateOverallTotal();
  }

  window.updateQty = (id, delta) => {
    const item = window.cart.find(i => i.id === id);
    if (item) {
      item.qty = Math.max(1, Math.min(10, item.qty + delta));
      localStorage.setItem('tgh_cart', JSON.stringify(window.cart));
      renderCart();
      // Sync to cloud if exists
      if (window.addToCart) window.addToCart(id, 0); 
    }
  };

  window.removeFromCart = (id) => {
    window.cart = window.cart.filter(i => i.id !== id);
    localStorage.setItem('tgh_cart', JSON.stringify(window.cart));
    renderCart();
    // In a real app we'd also delete from Supabase here
  };

  function calculateOverallTotal() {
    let subtotal = 0;
    window.cart.forEach(item => {
      const p = productsData[item.id];
      if (p) {
        const priceNum = parseInt(p.price.replace(/[^0-9]/g, '')) || 0;
        subtotal += priceNum * item.qty;
      }
    });

    const tax = Math.round(subtotal * TAX_RATE);
    const total = subtotal + tax;

    document.getElementById('summary-subtotal').textContent = `KES ${subtotal.toLocaleString()}`;
    document.getElementById('summary-tax').textContent = `KES ${tax.toLocaleString()}`;
    document.getElementById('summary-total').textContent = `KES ${total.toLocaleString()}`;
  }

  // Initial render
  setTimeout(renderCart, 100); // Small delay to ensure productsData is mapped
});
