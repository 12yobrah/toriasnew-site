// ============================================================
// CHECKOUT PAGE – INTERACTIONS
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  // ── PAYMENT METHOD SELECT ──────────────────────────────────
  const paymentMethods = ['pm-card', 'pm-paypal', 'pm-bank'];
  const shippingMethods = ['ship-standard', 'ship-express', 'ship-overnight'];
  const shippingCosts = { 'ship-standard': 0, 'ship-express': 14.99, 'ship-overnight': 29.99 };

  paymentMethods.forEach(id => {
    const el = document.getElementById(id);
    el?.addEventListener('click', () => {
      paymentMethods.forEach(pid => document.getElementById(pid)?.classList.remove('selected'));
      el.classList.add('selected');
      const cardFields = document.querySelector('.card-fields');
      if (cardFields) cardFields.style.display = id === 'pm-card' ? 'flex' : 'none';
    });
  });

  shippingMethods.forEach(id => {
    const el = document.getElementById(id);
    el?.addEventListener('click', () => {
      shippingMethods.forEach(sid => document.getElementById(sid)?.classList.remove('selected'));
      el.classList.add('selected');
      const costEl = document.getElementById('checkout-shipping-cost');
      const cost = shippingCosts[id];
      if (costEl) {
        costEl.textContent = cost === 0 ? 'Free' : `$${cost.toFixed(2)}`;
        costEl.style.color = cost === 0 ? '#3da052' : 'var(--clr-white)';
      }
    });
  });

  // ── CARD NUMBER FORMATTING ─────────────────────────────────
  const cardNumber = document.getElementById('card-number');
  cardNumber?.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '').substring(0, 16);
    e.target.value = v.replace(/(.{4})/g, '$1 ').trim();
  });

  const cardExpiry = document.getElementById('card-expiry');
  cardExpiry?.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (v.length >= 2) v = v.substring(0, 2) + ' / ' + v.substring(2);
    e.target.value = v;
  });

  // ── ORDER SUBMISSION ───────────────────────────────────────
  const form = document.getElementById('checkout-form');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const termsChecked = document.getElementById('terms-accept')?.checked;
    if (!termsChecked) {
      alert('Please accept the Terms of Service to continue.');
      return;
    }
    const btn = document.getElementById('place-order-btn');
    btn.textContent = 'Processing…';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    setTimeout(() => {
      // Redirect to a success state (simulate)
      document.querySelector('.container').innerHTML = `
        <div style="text-align:center;padding:var(--sp-2xl) 0;max-width:560px;margin:0 auto">
          <div style="width:80px;height:80px;border-radius:50%;background:var(--gradient-gold);display:flex;align-items:center;justify-content:center;margin:0 auto var(--sp-lg);font-size:2rem;color:var(--clr-black)">✓</div>
          <p style="color:var(--clr-gold);letter-spacing:0.25em;font-size:var(--fs-xs);text-transform:uppercase;margin-bottom:var(--sp-sm)">Order Confirmed</p>
          <h1 style="font-size:clamp(2rem,4vw,3rem);margin-bottom:var(--sp-md)">Thank You For Your Order!</h1>
          <p style="color:var(--clr-gray-400);font-size:var(--fs-md);line-height:1.8;margin-bottom:var(--sp-lg)">Your luxury jewelry is on its way. You'll receive a confirmation email shortly with your tracking details. We can't wait for you to receive your beautiful pieces!</p>
          <div style="background:var(--clr-dark-2);border:1px solid rgba(201,168,76,0.15);border-radius:var(--radius-md);padding:var(--sp-lg);margin-bottom:var(--sp-lg);text-align:left">
            <p style="color:var(--clr-gold);font-size:var(--fs-xs);letter-spacing:0.2em;text-transform:uppercase;margin-bottom:var(--sp-sm)">Order Details</p>
            <div style="display:flex;justify-content:space-between;font-size:var(--fs-sm);color:var(--clr-gray-400);padding:6px 0">
              <span>Order Number:</span><strong style="color:var(--clr-white)">#TGH-247891</strong>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:var(--fs-sm);color:var(--clr-gray-400);padding:6px 0">
              <span>Estimated Delivery:</span><strong style="color:var(--clr-white)">Apr 8 – Apr 10, 2026</strong>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:var(--fs-sm);color:var(--clr-gray-400);padding:6px 0">
              <span>Total Charged:</span><strong style="color:var(--clr-gold)">$436.32</strong>
            </div>
          </div>
          <div style="display:flex;gap:var(--sp-sm);justify-content:center;flex-wrap:wrap">
            <a href="shop.html" class="btn btn-gold">Continue Shopping</a>
            <a href="index.html" class="btn btn-outline-gold">Back to Home</a>
          </div>
        </div>
      `;
    }, 2200);
  });

});
