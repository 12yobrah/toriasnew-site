// ============================================================
// CART PAGE – DYNAMIC QUANTITY & TOTALS
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  const prices = { 1: 189.00, 2: 215.00 };
  const TAX_RATE = 0.08;

  function getQty(item) {
    return parseInt(document.getElementById(`cart-qty-${item}`)?.value || '1', 10);
  }

  function updateTotals() {
    let subtotal = 0;
    Object.keys(prices).forEach(item => {
      const qty = getQty(item);
      const sub = prices[item] * qty;
      const subEl = document.getElementById(`cart-subtotal-${item}`);
      if (subEl) subEl.textContent = `$${sub.toFixed(2)}`;
      if (document.getElementById(`cart-item-${item}`)) subtotal += sub;
    });
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;
    const subtotalEl = document.getElementById('summary-subtotal');
    const taxEl = document.getElementById('summary-tax');
    const totalEl = document.getElementById('summary-total');
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;

    // Update cart badge
    const cartCount = document.querySelector('.cart-count');
    const totalQty = Object.keys(prices).reduce((acc, item) => {
      const el = document.getElementById(`cart-item-${item}`);
      return el ? acc + getQty(item) : acc;
    }, 0);
    if (cartCount) cartCount.textContent = totalQty;
  }

  // Qty buttons
  document.querySelectorAll('.cart-qty-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.dataset.item;
      const input = document.getElementById(`cart-qty-${item}`);
      if (input && +input.value > 1) { input.value = +input.value - 1; updateTotals(); }
    });
  });
  document.querySelectorAll('.cart-qty-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.dataset.item;
      const input = document.getElementById(`cart-qty-${item}`);
      if (input && +input.value < 10) { input.value = +input.value + 1; updateTotals(); }
    });
  });
  document.querySelectorAll('.cart-qty-input').forEach(input => {
    input.addEventListener('change', updateTotals);
  });

  // Remove items
  document.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.dataset.item;
      const row = document.getElementById(`cart-item-${item}`);
      if (row) {
        row.style.transition = 'opacity 0.3s ease, max-height 0.4s ease';
        row.style.opacity = '0';
        row.style.overflow = 'hidden';
        setTimeout(() => {
          row.style.maxHeight = '0';
          row.style.margin = '0';
          row.style.padding = '0';
          delete prices[item];
          setTimeout(updateTotals, 350);
        }, 200);
      }
    });
  });

  // Coupon code
  const couponInput = document.getElementById('coupon-code');
  const applyCouponBtn = document.getElementById('apply-coupon');
  let couponApplied = false;

  applyCouponBtn?.addEventListener('click', () => {
    const code = couponInput?.value.trim().toUpperCase();
    if (code === 'GLAMFREE' && !couponApplied) {
      const discountRow = document.getElementById('coupon-discount-row');
      const discountEl = document.getElementById('summary-discount');
      const subtotalEl = document.getElementById('summary-subtotal');
      const subtotal = parseFloat(subtotalEl?.textContent.replace('$','') || '0');
      const discount = subtotal * 0.1;
      if (discountRow) discountRow.style.display = 'flex';
      if (discountEl) discountEl.textContent = `-$${discount.toFixed(2)}`;
      couponApplied = true;
      applyCouponBtn.textContent = '✓ Applied';
      applyCouponBtn.disabled = true;
      applyCouponBtn.style.opacity = '0.6';
    } else if (couponApplied) {
      alert('Coupon already applied!');
    } else {
      couponInput.style.borderColor = '#b91c1c';
      setTimeout(() => { if (couponInput) couponInput.style.borderColor = ''; }, 2000);
    }
  });

  updateTotals();
});
