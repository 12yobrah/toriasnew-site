// ============================================================
// CHECKOUT PAGE – ENHANCED KENYAN INTERACTIONS
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  // --- MOCK CART DATA (Fallback if real cart empty) ---
  const cartItems = [
    { id: 206, name: "Golden Oval Pearl Set", price: 1250, qty: 1, img: "https://www.toriasglamhaven.co.ke/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-19.31.18.jpeg" },
    { id: 212, name: "The Golden Halo", price: 1250, qty: 1, img: "https://www.toriasglamhaven.co.ke/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-22.57.33-2.jpeg" }
  ];

  const shippingCosts = {
    'cbd': 50,
    'environs': 250,
    'mtaani': 120,
    'pickup': 0
  };

  let selectedShipping = 'cbd';
  let tipPercent = 0.20;

  // --- UI Elements ---
  const itemsContainer = document.getElementById('checkout-items-list');
  const summarySubtotal = document.getElementById('summary-subtotal');
  const summaryShipping = document.getElementById('summary-shipping');
  const summaryTotal = document.getElementById('summary-total-kes');
  const btnTotal = document.getElementById('btn-total-val');
  const checkoutForm = document.getElementById('checkout-form');
  const deliveryTab = document.getElementById('delivery-tab');
  const pickupTab = document.getElementById('pickup-tab');
  const deliverySection = document.getElementById('delivery-section');
  const pickupSection = document.getElementById('pickup-section');
  const shipMethodSection = document.getElementById('shipping-method-section');
  const waBtn = document.getElementById('whatsapp-checkout-btn');

  // --- Initialization ---
  function renderSummary() {
    if (!itemsContainer) return;

    itemsContainer.innerHTML = cartItems.map(item => `
      <div style="display:flex;gap:12px;align-items:center;margin-bottom:12px">
        <img src="${item.img}" alt="${item.name}" style="width:50px;height:50px;object-fit:cover;border-radius:4px;border:1px solid rgba(255,255,255,0.1)" />
        <div style="flex:1">
          <p style="font-size:var(--fs-xs);color:#ffffff;font-weight:500;margin-bottom:2px">${item.name}</p>
          <p style="font-size:0.65rem;color:rgba(255,255,255,0.4)">Quantity: ${item.qty}</p>
        </div>
        <span style="color:var(--clr-gold);font-weight:600;font-size:var(--fs-xs)">KES ${item.price.toLocaleString()}</span>
      </div>
    `).join('');

    calculateTotals();
  }

  function calculateTotals() {
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const shipping = shippingCosts[selectedShipping] || 0;
    const tip = Math.round(subtotal * tipPercent);
    const total = subtotal + shipping + tip;

    if (summarySubtotal) summarySubtotal.textContent = `KES ${subtotal.toLocaleString()}`;
    if (summaryShipping) summaryShipping.textContent = shipping === 0 ? 'FREE' : `KES ${shipping.toLocaleString()}`;
    if (summaryTotal) summaryTotal.textContent = `KES ${total.toLocaleString()}`;
    if (btnTotal) btnTotal.textContent = total.toLocaleString();

    updateWhatsAppLink(subtotal, shipping, tip, total);
  }

  // --- Interactions ---

  // Tab switching
  deliveryTab?.addEventListener('click', () => {
    deliveryTab.classList.add('active');
    pickupTab.classList.remove('active');
    deliverySection.style.display = 'block';
    pickupSection.style.display = 'none';
    shipMethodSection.style.display = 'block';
    selectedShipping = document.querySelector('input[name="shipping_method"]:checked')?.value || 'cbd';
    calculateTotals();
  });

  pickupTab?.addEventListener('click', () => {
    pickupTab.classList.add('active');
    deliveryTab.classList.remove('active');
    deliverySection.style.display = 'none';
    pickupSection.style.display = 'block';
    shipMethodSection.style.display = 'none';
    selectedShipping = 'pickup';
    calculateTotals();
  });

  // Shipping selection
  document.querySelectorAll('input[name="shipping_method"]').forEach(radio => {
    const parent = radio.closest('.payment-method');
    parent?.addEventListener('click', () => {
      document.querySelectorAll('#shipping-method-section .payment-method').forEach(om => {
        om.classList.remove('selected');
        om.querySelector('.pm-radio')?.classList.remove('active');
      });
      parent.classList.add('selected');
      parent.querySelector('.pm-radio')?.classList.add('active');
      radio.checked = true;
      selectedShipping = radio.value;
      calculateTotals();
    });
  });

  // Payment selection
  const pmMethods = ['pm-mpesa', 'pm-cod'];
  pmMethods.forEach(id => {
    const el = document.getElementById(id);
    el?.addEventListener('click', () => {
      pmMethods.forEach(mid => {
        const other = document.getElementById(mid);
        other?.classList.remove('selected');
        other?.querySelector('.pm-radio')?.classList.remove('active');
      });
      el.classList.add('selected');
      el.querySelector('.pm-radio')?.classList.add('active');
    });
  });

  // Tipping
  document.querySelectorAll('.tip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tip-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      if (btn.dataset.tip === 'custom') {
        const custom = prompt("Enter tip amount in KES:", "200");
        if (custom) {
          const val = parseFloat(custom);
          const sub = cartItems.reduce((acc, i) => acc + (i.price * i.qty), 0);
          tipPercent = val / sub;
        }
      } else {
        tipPercent = parseFloat(btn.dataset.tip);
      }
      calculateTotals();
    });
  });

  // --- WhatsApp Link Generation ---
  function updateWhatsAppLink(subtotal, shipping, tip, total) {
    if (!waBtn) return;
    const itemsText = cartItems.map(i => `• ${i.name} (x${i.qty}) - KES ${i.price}`).join('%0A');
    const deliveryType = selectedShipping === 'pickup' ? 'Local Pickup' : 'Standard Delivery';
    
    const message = `Hello Torias Glam Haven! I'd like to place an order:%0A%0A` +
      `ORDER SUMMARY:%0A${itemsText}%0A%0A` +
      `Subtotal: KES ${subtotal}%0A` +
      `Delivery: ${deliveryType} (${summaryShipping?.textContent || 'Free'})%0A` +
      `Tip: KES ${tip}%0A` +
      `TOTAL: KES ${total}%0A%0A` +
      `I am filling in my details now. Please confirm availability. Thank you!`;

    waBtn.href = `https://wa.me/254707353520?text=${message}`;
  }

  // --- Form Submission ---
  checkoutForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const isMpesa = document.getElementById('pm-mpesa').classList.contains('selected');
    const mpesaCode = document.getElementById('mpesa-code')?.value.trim();

    if (isMpesa && !mpesaCode) {
      alert("Please enter the M-Pesa Transaction Code to continue.");
      return;
    }

    const btn = document.getElementById('place-order-btn');
    btn.textContent = "Processing Order...";
    btn.disabled = true;

    // Simulate completion
    setTimeout(() => {
      document.querySelector('.container').innerHTML = `
        <div style="text-align:center;padding:100px 20px;max-width:600px;margin:0 auto">
          <div style="font-size:4rem;margin-bottom:20px;color:var(--clr-gold)">✦</div>
          <h1 style="font-family:var(--font-serif);color:#fff;margin-bottom:15px">Thank You For Your Order!</h1>
          <p style="color:rgba(255,255,255,0.6);line-height:1.7;margin-bottom:30px">Your order has been received and is being processed. We will contact you shortly to confirm delivery details.</p>
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:30px;text-align:left;margin-bottom:30px">
            <p style="font-size:var(--fs-xs);color:var(--clr-gold);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px">Order Details</p>
            <p style="color:#fff;font-size:var(--fs-sm)">Order ID: <strong>#TGH-88${Math.floor(Math.random()*9000)+1000}</strong></p>
            <p style="color:#fff;font-size:var(--fs-sm)">Status: <strong>Awaiting Confirmation</strong></p>
          </div>
          <a href="shop.html" class="btn btn-gold">Continue Shopping</a>
        </div>
      `;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  });

  renderSummary();
});
