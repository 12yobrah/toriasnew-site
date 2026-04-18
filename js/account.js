// ============================================================
// TORIAS GLAM HAVEN | ACCOUNT DASHBOARD LOGIC
// Reuses supabaseClient from main.js (loaded first)
// ============================================================

// ── Panel Navigation ──
function switchPanel(panelName) {
  document.querySelectorAll('.account-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.account-nav-link').forEach(l => l.classList.remove('active'));
  
  const panel = document.getElementById(`panel-${panelName}`);
  if (panel) panel.classList.add('active');

  const link = document.querySelector(`.account-nav-link[data-panel="${panelName}"]`);
  if (link) link.classList.add('active');

  // Update URL hash without scrolling
  history.replaceState(null, '', `#${panelName}`);
}

// Make it globally available for onclick handlers
window.switchPanel = switchPanel;

document.addEventListener('DOMContentLoaded', async () => {

  // ── Check URL Hash ──
  const hash = window.location.hash.replace('#', '') || 'dashboard';
  switchPanel(hash);

  // ── Sidebar Navigation ──
  document.querySelectorAll('.account-nav-link[data-panel]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const panel = link.dataset.panel;
      switchPanel(panel);
    });
  });

  // ── Auth Check ──
  let user = null;
  if (supabaseClient) {
    try {
      const { data } = await supabaseClient.auth.getUser();
      user = data?.user;
    } catch (e) {
      console.log('Auth check failed:', e);
    }
  }

  // If no user, show guest mode (don't redirect — allow browsing wishlist from localStorage)
  const displayName = document.getElementById('user-display-name');
  const displayEmail = document.getElementById('user-display-email');
  const initials = document.getElementById('user-initials');
  const heroGreeting = document.getElementById('hero-greeting');

  if (user) {
    displayEmail.textContent = user.email;
    loadProfile(user);
    loadOrders(user);
  } else {
    displayName.textContent = 'Guest';
    displayEmail.textContent = 'Sign in for full access';
    initials.textContent = 'G';
    heroGreeting.textContent = 'Welcome, Guest';
  }

  // ── Load Wishlist (works for guests too — from localStorage) ──
  loadWishlist();

  // ── Dashboard Stats ──
  updateDashboardStats();

  // ── Logout ──
  document.getElementById('logout-btn')?.addEventListener('click', async (e) => {
    e.preventDefault();
    if (supabaseClient) {
      await supabaseClient.auth.signOut();
    }
    localStorage.removeItem('tgh_wishlist');
    localStorage.removeItem('tgh_cart');
    window.location.href = 'index.html';
  });

  // ── Profile Form ──
  document.getElementById('profile-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!user || !supabaseClient) {
      showToast('Please sign in to save changes');
      return;
    }

    const full_name = document.getElementById('profile-name').value;
    const phone = document.getElementById('profile-phone').value;

    const { error } = await supabaseClient
      .from('profiles')
      .update({ full_name, phone })
      .eq('id', user.id);

    if (error) {
      showToast('Update failed: ' + error.message);
    } else {
      showToast('✓ Profile updated successfully!');
      displayName.textContent = full_name || 'Glam User';
      initials.textContent = (full_name || 'G').charAt(0).toUpperCase();
    }
  });

  // ── Address Form ──
  document.getElementById('address-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const address = {
      name: document.getElementById('addr-name').value,
      phone: document.getElementById('addr-phone').value,
      street: document.getElementById('addr-street').value,
      city: document.getElementById('addr-city').value,
      county: document.getElementById('addr-county').value
    };

    // Save locally
    localStorage.setItem('tgh_address', JSON.stringify(address));
    showToast('✓ Address saved successfully!');
  });

  // Load saved address
  const savedAddress = JSON.parse(localStorage.getItem('tgh_address') || 'null');
  if (savedAddress) {
    document.getElementById('addr-name').value = savedAddress.name || '';
    document.getElementById('addr-phone').value = savedAddress.phone || '';
    document.getElementById('addr-street').value = savedAddress.street || '';
    document.getElementById('addr-city').value = savedAddress.city || '';
    document.getElementById('addr-county').value = savedAddress.county || '';
  }

  // ── Member Since Badge ──
  const memberSince = document.getElementById('user-member-since');
  if (user && memberSince) {
    const joinDate = new Date(user.created_at);
    memberSince.textContent = `Member since ${joinDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
  }
});

// ── LOAD PROFILE ──
async function loadProfile(user) {
  if (!supabaseClient || !user) return;
  
  try {
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    const displayName = document.getElementById('user-display-name');
    const initials = document.getElementById('user-initials');
    const heroGreeting = document.getElementById('hero-greeting');

    if (profile) {
      const name = profile.full_name || 'Glam User';
      displayName.textContent = name;
      initials.textContent = name.charAt(0).toUpperCase();
      heroGreeting.textContent = `Welcome back, ${name.split(' ')[0]}`;
      document.getElementById('dash-profile-name').textContent = name;

      document.getElementById('profile-name').value = profile.full_name || '';
      document.getElementById('profile-phone').value = profile.phone || '';
    } else {
      displayName.textContent = 'Glam User';
      initials.textContent = 'G';
      heroGreeting.textContent = 'Welcome back';
    }

    document.getElementById('profile-email').value = user.email;
  } catch (e) {
    console.log('Profile load error:', e);
  }
}

// ── LOAD ORDERS ──
async function loadOrders(user) {
  if (!supabaseClient || !user) return;

  try {
    const { data: orders } = await supabaseClient
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    const ordersList = document.getElementById('orders-list');
    const dashOrderCount = document.getElementById('dash-order-count');
    const ordersCount = document.getElementById('orders-count');

    if (orders && orders.length > 0) {
      dashOrderCount.textContent = orders.length;
      ordersCount.textContent = `${orders.length} order${orders.length > 1 ? 's' : ''}`;

      ordersList.innerHTML = orders.map(order => {
        const statusClass = (order.status || 'pending').toLowerCase();
        return `
          <div class="order-item">
            <div>
              <div class="order-id">Order #${String(order.id).slice(0,8).toUpperCase()}</div>
              <div class="order-date">${new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>
            <div>
              <div class="order-total">KES ${Number(order.total_amount || 0).toLocaleString()}</div>
              <span class="status-badge status-${statusClass}">${order.status || 'Pending'}</span>
            </div>
          </div>
        `;
      }).join('');

      // Dashboard recent orders
      const recentOrders = orders.slice(0, 3);
      document.getElementById('dash-recent-orders').innerHTML = recentOrders.map(order => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
          <span style="color:rgba(255,255,255,0.6);font-size:0.8rem;">Order #${String(order.id).slice(0,8).toUpperCase()}</span>
          <span style="color:#DAB258;font-size:0.8rem;">KES ${Number(order.total_amount || 0).toLocaleString()}</span>
        </div>
      `).join('');
    }
  } catch (e) {
    console.log('Orders load error:', e);
  }
}

// ── LOAD WISHLIST ──
function loadWishlist() {
  const wishlist = JSON.parse(localStorage.getItem('tgh_wishlist') || '[]');
  const container = document.getElementById('wishlist-content');
  const countEl = document.getElementById('wishlist-panel-count');
  const dashCount = document.getElementById('dash-wishlist-count');

  if (dashCount) dashCount.textContent = wishlist.length;
  if (countEl) countEl.textContent = wishlist.length > 0 ? `${wishlist.length} item${wishlist.length > 1 ? 's' : ''}` : '';

  if (wishlist.length === 0 || !container) return;

  // Wait for productsData to be available
  if (typeof productsData === 'undefined' || Object.keys(productsData).length === 0) {
    setTimeout(loadWishlist, 500);
    return;
  }

  const items = wishlist.map(id => {
    const p = productsData[id];
    if (!p) return '';
    return `
      <div class="wishlist-item" data-id="${id}">
        <a href="product.html?id=${id}">
          <img src="${p.img}" alt="${p.name}" loading="lazy" />
        </a>
        <div class="wishlist-item-info">
          <h4>${p.name}</h4>
          <span class="price">${p.price}</span>
        </div>
        <div class="wishlist-item-actions">
          <button class="btn btn-gold" onclick="addWishlistToCart('${id}')">Add to Cart</button>
          <button class="btn-remove" onclick="removeFromWishlist('${id}')">✕</button>
        </div>
      </div>
    `;
  }).filter(Boolean);

  if (items.length > 0) {
    container.innerHTML = `<div class="wishlist-grid">${items.join('')}</div>`;
  }
}

// ── Wishlist Actions ──
window.addWishlistToCart = function(productId) {
  if (window.addToCart) {
    window.addToCart(productId);
    showToast('✓ Added to cart!');
  }
};

window.removeFromWishlist = function(productId) {
  let wishlist = JSON.parse(localStorage.getItem('tgh_wishlist') || '[]');
  wishlist = wishlist.filter(id => id !== productId);
  localStorage.setItem('tgh_wishlist', JSON.stringify(wishlist));
  
  // Remove the card from DOM
  const item = document.querySelector(`.wishlist-item[data-id="${productId}"]`);
  if (item) {
    item.style.transition = 'opacity 0.3s, transform 0.3s';
    item.style.opacity = '0';
    item.style.transform = 'scale(0.95)';
    setTimeout(() => {
      item.remove();
      loadWishlist(); // Refresh counts
    }, 300);
  }

  showToast('Removed from wishlist');
  if (window.updateHeaderBadges) window.updateHeaderBadges();
};

// ── Dashboard Stats Update ──
function updateDashboardStats() {
  const wishlist = JSON.parse(localStorage.getItem('tgh_wishlist') || '[]');
  const dashWishlist = document.getElementById('dash-wishlist-count');
  if (dashWishlist) dashWishlist.textContent = wishlist.length;
}

// ── Toast ──
function showToast(message) {
  const toast = document.getElementById('account-toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}
