// ============================================================
// TORIAS GLAM HAVEN | ACCOUNT DASHBOARD LOGIC
// ============================================================

const SUPABASE_URL = 'https://xfuhxmrqykkmfqcpshhs.supabase.co';
const SUPABASE_KEY = 'sb_publishable_tA-hIr0xRAkpb_Rt0l_Odg_nonm1k6v';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', async () => {

  const { data: { user } } = await supabaseClient.auth.getUser();

  // Protect the page
  if (!user) {
    window.location.href = 'entry.html';
    return;
  }

  // UI Elements
  const displayName = document.getElementById('user-display-name');
  const displayEmail = document.getElementById('user-display-email');
  const initials = document.getElementById('user-initials');
  const logoutBtn = document.getElementById('logout-btn');
  const ordersList = document.getElementById('orders-list');
  const profileForm = document.getElementById('profile-form');

  // Load Profile Data
  async function loadProfile() {
    const { data: profile, error } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profile) {
      displayName.textContent = profile.full_name || 'Glam User';
      displayEmail.textContent = user.email;
      initials.textContent = (profile.full_name || 'G').charAt(0).toUpperCase();
      
      // Pre-fill form
      document.getElementById('profile-name').value = profile.full_name || '';
      document.getElementById('profile-phone').value = profile.phone || '';
    }
  }

  // Load Order History
  async function loadOrders() {
    const { data: orders, error } = await supabaseClient
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (orders && orders.length > 0) {
      ordersList.innerHTML = orders.map(order => `
        <div class="order-item">
          <div>
            <p style="font-weight: 600; color: #fff;">Order #${order.id.slice(0,8).toUpperCase()}</p>
            <p style="font-size: 0.75rem; color: rgba(255,255,255,0.4);">${new Date(order.created_at).toLocaleDateString()}</p>
          </div>
          <div style="text-align: right;">
            <p style="color: var(--clr-gold); font-weight: 600; margin-bottom: 5px;">KES ${order.total_amount.toLocaleString()}</p>
            <span class="status-badge status-pending">${order.status}</span>
          </div>
        </div>
      `).join('');
    }
  }

  // Sidebar navigation toggling
  document.querySelectorAll('.account-nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').substring(1);
      if (!targetId || targetId === '#') return;
      
      e.preventDefault();
      document.querySelectorAll('.account-nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      document.getElementById('orders-section').style.display = targetId === 'orders' ? 'block' : 'none';
      document.getElementById('profile-section').style.display = targetId === 'profile' ? 'block' : 'none';
    });
  });

  // Logout
  logoutBtn?.addEventListener('click', async (e) => {
    e.preventDefault();
    await supabaseClient.auth.signOut();
    window.location.href = 'index.html';
  });

  // Profile Update
  profileForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const full_name = document.getElementById('profile-name').value;
    const phone = document.getElementById('profile-phone').value;

    const { error } = await supabaseClient
      .from('profiles')
      .update({ full_name, phone })
      .eq('id', user.id);

    if (error) alert("Update failed: " + error.message);
    else {
      alert("Profile updated successfully!");
      loadProfile();
    }
  });

  loadProfile();
  loadOrders();
});
