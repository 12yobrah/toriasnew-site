// ============================================================
// CHECKOUT PAGE – INTERACTIONS
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  // ── PAYMENT METHOD SELECT ──────────────────────────────────
  const paymentMethods = ['pm-mpesa', 'pm-card', 'pm-paypal', 'pm-bank'];
  const shippingMethods = ['ship-standard', 'ship-express', 'ship-overnight'];
  const shippingCosts = { 'ship-standard': 0, 'ship-express': 14.99, 'ship-overnight': 29.99 };

  paymentMethods.forEach(id => {
    const el = document.getElementById(id);
    el?.addEventListener('click', () => {
      paymentMethods.forEach(pid => document.getElementById(pid)?.classList.remove('selected'));
      el.classList.add('selected');
      
      const cardFields = document.querySelector('.card-fields');
      const mpesaFields = document.querySelector('.mpesa-fields');
      
      if (id === 'pm-card') {
        if (cardFields) cardFields.style.display = 'block';
        if (mpesaFields) mpesaFields.style.display = 'none';
      } else if (id === 'pm-mpesa') {
        if (cardFields) cardFields.style.display = 'none';
        if (mpesaFields) mpesaFields.style.display = 'block';
        // Reset M-Pesa state
        document.getElementById('stk-idle').style.display = 'block';
        document.getElementById('stk-processing').style.display = 'none';
      } else {
        if (cardFields) cardFields.style.display = 'none';
        if (mpesaFields) mpesaFields.style.display = 'none';
      }
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
        costEl.style.color = cost === 0 ? '#3da052' : '#2d2d2d';
      }
    });
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

    const isMpesa = document.getElementById('pm-mpesa')?.classList.contains('selected');
    const btn = document.getElementById('place-order-btn');
    
    if (isMpesa) {
      const phone = document.getElementById('mpesa-phone')?.value;
      if (!phone || phone.length < 10) {
        alert('Please enter a valid M-Pesa phone number.');
        return;
      }
      document.getElementById('stk-idle').style.display = 'none';
      document.getElementById('stk-processing').style.display = 'block';
      btn.textContent = 'Awaiting PIN Entry...';
      btn.disabled = true;
      
      // Simulate STK Push flow
      setTimeout(() => {
        completeOrder();
      }, 5000);
      return;
    }

    btn.textContent = 'Processing…';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    setTimeout(() => {
      completeOrder();
    }, 2200);

    function completeOrder() {
      const currentMethod = document.querySelector('.payment-method.selected .pm-name')?.textContent || 'Payment';
      const receiptHtml = isMpesa ? `
        <div style="display:flex;justify-content:space-between;font-size:var(--fs-sm);color:#666666;padding:6px 0">
           <span>M-Pesa Receipt:</span><strong style="color:#2d2d2d">R7${Math.floor(Math.random()*1000000)}</strong>
        </div>
      ` : '';

      document.querySelector('.container').innerHTML = `
        <div style="text-align:center;padding:var(--sp-2xl) 0;max-width:560px;margin:0 auto">
          <div style="width:80px;height:80px;border-radius:50%;background:#800000;display:flex;align-items:center;justify-content:center;margin:0 auto var(--sp-lg);font-size:2rem;color:white">✓</div>
          <p style="color:#800000;letter-spacing:0.25em;font-size:var(--fs-xs);text-transform:uppercase;margin-bottom:var(--sp-sm)">Order Confirmed</p>
          <h1 style="font-size:clamp(2rem,4vw,3rem);margin-bottom:var(--sp-md);color:#1a1a1a">Thank You For Your Order!</h1>
          <p style="color:#666666;font-size:var(--fs-md);line-height:1.8;margin-bottom:var(--sp-lg)">Your luxury jewelry is on its way. Use the order number below to track your delivery status.</p>
          <div style="background:#fdfaf9;border:1px solid rgba(0,0,0,0.08);border-radius:var(--radius-md);padding:var(--sp-lg);margin-bottom:var(--sp-lg);text-align:left">
            <p style="color:#800000;font-size:var(--fs-xs);letter-spacing:0.2em;text-transform:uppercase;margin-bottom:var(--sp-sm)">Order Details</p>
            <div style="display:flex;justify-content:space-between;font-size:var(--fs-sm);color:#666666;padding:6px 0">
              <span>Order Number:</span><strong style="color:#2d2d2d">#TGH-247891</strong>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:var(--fs-sm);color:#666666;padding:6px 0">
              <span>Payment Method:</span><strong style="color:#2d2d2d">${currentMethod}</strong>
            </div>
            ${receiptHtml}
          </div>
          <div style="display:flex;gap:var(--sp-sm);justify-content:center;flex-wrap:wrap">
            <a href="shop.html" class="btn btn-maroon" style="background:#800000;color:white;padding:12px 24px;border-radius:30px;text-decoration:none">Continue Shopping</a>
            <a href="index.html" class="btn btn-outline" style="border:1px solid #800000;color:#800000;padding:12px 24px;border-radius:30px;text-decoration:none">Back to Home</a>
          </div>
        </div>
      `;
    }
  });

});
