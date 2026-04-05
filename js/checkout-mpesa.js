// ============================================================
// M-PESA CHECKOUT SANDBOX – SIMULATION
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  const checkoutForm = document.getElementById('checkout-form-mpesa');
  const phoneInput = document.getElementById('mpesa-phone');
  const actionBtn = document.getElementById('mpesa-btn');

  // PHONE FORMATTING (Nairobi Style: 07XX XXX XXX or 254...)
  phoneInput?.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.startsWith('254')) {
      v = v.substring(0, 12);
    } else {
      v = v.substring(0, 10);
    }
    e.target.value = v;
  });

  checkoutForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const phoneNumber = phoneInput.value;
    if (phoneNumber.length < 10) {
      alert("Please enter a valid M-Pesa phone number.");
      return;
    }

    // ── STEP 1: INITIALIZE STK PUSH (SIMULATED) ──────────────────
    actionBtn.disabled = true;
    actionBtn.style.opacity = '0.5';
    actionBtn.textContent = 'Awaiting STK Push...';

    // Show the "Processing" state UI
    document.getElementById('stk-idle').style.display = 'none';
    document.getElementById('stk-processing').style.display = 'block';

    console.log(`[STK Push Request] Originating for ${phoneNumber}...`);

    // ── STEP 2: SIMULATE THE "WAITING FOR PIN" DELAY ─────────────
    setTimeout(() => {
      console.log(`[STK Status] Prompt was sent to user phone successfully.`);
      
      // Simulate User Entering PIN (after 4 seconds)
      setTimeout(() => {
        // Change UI to Success
        document.getElementById('stk-processing').style.display = 'none';
        document.getElementById('stk-success').style.display = 'block';
        
        console.log(`[Transaction Complete] Receipt: TGH${Math.floor(Math.random()*1000000)}`);

        // ── STEP 3: REDIRECT TO LIVE SUCCESS PAGE ───────────────────
        setTimeout(() => {
           // We reuse the success screen logic from main checkout
           document.querySelector('.container').innerHTML = `
              <div style="text-align:center;padding:var(--sp-2xl) 0;max-width:560px;margin:0 auto">
                <div style="width:80px;height:80px;border-radius:50%;background:#46b04a;display:flex;align-items:center;justify-content:center;margin:0 auto var(--sp-lg);font-size:2rem;color:white">✓</div>
                <p style="color:#46b04a;letter-spacing:0.25em;font-size:var(--fs-xs);text-transform:uppercase;margin-bottom:var(--sp-sm)">Payment Successful</p>
                <h1 style="font-size:clamp(2rem,4vw,3rem);margin-bottom:var(--sp-md)">Thank You For Your Order!</h1>
                <p style="color:var(--clr-gray-400);font-size:var(--fs-md);line-height:1.8;margin-bottom:var(--sp-lg)">Your M-Pesa payment has been confirmed. Your jewelry is being prepared with clinical care. Keep your eyes on your inbox for shipping updates.</p>
                <div style="background:var(--clr-dark-2);border:1px solid rgba(70,176,74,0.15);border-radius:var(--radius-md);padding:var(--sp-lg);margin-bottom:var(--sp-lg);text-align:left">
                  <p style="color:#46b04a;font-size:var(--fs-xs);letter-spacing:0.2em;text-transform:uppercase;margin-bottom:var(--sp-sm)">M-Pesa Transaction Details</p>
                  <div style="display:flex;justify-content:space-between;font-size:var(--fs-sm);color:var(--clr-gray-400);padding:6px 0">
                    <span>Receipt No:</span><strong style="color:var(--clr-white)">TGH${Math.floor(Math.random()*1000000)}</strong>
                  </div>
                  <div style="display:flex;justify-content:space-between;font-size:var(--fs-sm);color:var(--clr-gray-400);padding:6px 0">
                    <span>Order Total:</span><strong style="color:var(--clr-white)">57,150 KES</strong>
                  </div>
                </div>
                <div style="display:flex;gap:var(--sp-sm);justify-content:center;flex-wrap:wrap">
                  <a href="shop.html" class="btn btn-gold">Browse Collection</a>
                  <a href="index.html" class="btn btn-outline-gold">Back to Home</a>
                </div>
              </div>
           `;
        }, 2000);

      }, 4000); // 4 seconds delay to "enter pin"

    }, 2000); // 2 seconds delay to "send push"
  });

});
