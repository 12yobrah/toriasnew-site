// ============================================================
// TORIAS GLAM HAVEN | ADMIN DASHBOARD LOGIC
// ============================================================

const SUPABASE_URL = 'https://xfuhxmrqykkmfqcpshhs.supabase.co';
const SUPABASE_KEY = 'sb_publishable_tA-hIr0xRAkpb_Rt0l_Odg_nonm1k6v'; // Public anon key

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', () => {

  // --- UI Elements ---
  const authView = document.getElementById('auth-view');
  const dashView = document.getElementById('dashboard-view');
  const adminEmailDisplay = document.getElementById('admin-user-email');
  
  const loginForm = document.getElementById('admin-login-form');
  const logoutBtn = document.getElementById('logout-btn');

  const navInventory = document.getElementById('nav-inventory');
  const navAdd = document.getElementById('nav-add');
  const secInventory = document.getElementById('section-inventory');
  const secAdd = document.getElementById('section-add');
  const dashTitle = document.getElementById('dash-title');

  const addForm = document.getElementById('add-product-form');
  const fileInput = document.getElementById('p-image');
  const triggerFileBtn = document.getElementById('trigger-file-btn');
  const fileNameDisplay = document.getElementById('file-name-display');
  const imgPreviewBox = document.getElementById('img-preview');
  const previewSrc = document.getElementById('preview-src');
  const cancelAddBtn = document.getElementById('cancel-add-btn');

  const inventoryTbody = document.getElementById('inventory-tbody');
  const refreshBtn = document.getElementById('refresh-btn');

  const toast = document.getElementById('toast');

  // --- Helpers ---
  function showToast(msg, isError = false) {
    toast.textContent = msg;
    toast.className = `toast ${isError ? 'error' : ''}`;
    toast.hidden = false;
    setTimeout(() => { toast.hidden = true; }, 4000);
  }

  function switchSection(activeId) {
    secInventory.classList.remove('active');
    secAdd.classList.remove('active');
    navInventory.classList.remove('active');
    navAdd.classList.remove('active');

    if (activeId === 'inventory') {
      secInventory.classList.add('active');
      navInventory.classList.add('active');
      dashTitle.textContent = 'Manage Inventory';
      loadProducts();
    } else {
      secAdd.classList.add('active');
      navAdd.classList.add('active');
      dashTitle.textContent = 'Create New Product';
    }
  }

  // --- Auth State Handling ---
  supabaseClient.auth.onAuthStateChange((event, session) => {
    if (session) {
      authView.classList.remove('active');
      dashView.classList.add('active');
      adminEmailDisplay.textContent = session.user.email;
      loadProducts();
    } else {
      authView.classList.add('active');
      dashView.classList.remove('active');
    }
  });

  // --- Login / Logout ---
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;
    const btn = document.getElementById('login-btn');
    
    btn.textContent = 'Authenticating...';
    btn.disabled = true;

    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
    
    if (error) {
      showToast(error.message, true);
      btn.textContent = 'Secure Login';
      btn.disabled = false;
    }
    // Success is handled by onAuthStateChange
  });

  logoutBtn.addEventListener('click', async () => {
    await supabaseClient.auth.signOut();
  });

  // --- Navigation Toggle ---
  navInventory.addEventListener('click', (e) => { e.preventDefault(); switchSection('inventory'); });
  navAdd.addEventListener('click', (e) => { e.preventDefault(); switchSection('add'); });
  cancelAddBtn.addEventListener('click', () => { switchSection('inventory'); addForm.reset(); hidePreview(); });
  refreshBtn.addEventListener('click', loadProducts);

  // --- File Upload Preview ---
  triggerFileBtn.addEventListener('click', () => fileInput.click());
  
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
      fileNameDisplay.textContent = file.name;
      const reader = new FileReader();
      reader.onload = (e) => {
        previewSrc.src = e.target.result;
        imgPreviewBox.hidden = false;
      };
      reader.readAsDataURL(file);
    } else {
      hidePreview();
    }
  });

  function hidePreview() {
    fileNameDisplay.textContent = 'No file selected';
    previewSrc.src = '';
    imgPreviewBox.hidden = true;
  }

  // --- Generate Random File Name ---
  function generateFileName(originalName) {
    const ext = originalName.split('.').pop();
    const randomStr = Math.random().toString(36).substring(2, 15);
    return `${Date.now()}_${randomStr}.${ext}`;
  }

  // --- Add Product ---
  addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const file = fileInput.files[0];
    if (!file) return showToast("Please select an image", true);

    const btn = document.getElementById('submit-product-btn');
    btn.textContent = 'Uploading Image...';
    btn.disabled = true;

    // 1. Upload Image to Storage
    const fileName = generateFileName(file.name);
    const { data: uploadData, error: uploadError } = await supabaseClient
      .storage
      .from('product-images')
      .upload(fileName, file);

    if (uploadError) {
      showToast("Image Upload Failed: " + uploadError.message, true);
      btn.textContent = 'Publish Product';
      btn.disabled = false;
      return;
    }

    // Get public URL
    const { data: { publicUrl } } = supabaseClient
      .storage
      .from('product-images')
      .getPublicUrl(fileName);

    btn.textContent = 'Saving Details...';

    // 2. Insert into DB
    const name = document.getElementById('p-name').value;
    const category = document.getElementById('p-cat').value;
    const price = document.getElementById('p-price').value;
    const oldPrice = document.getElementById('p-old-price').value;
    const desc = document.getElementById('p-desc').value;

    // We explicitly create a random numerical ID here to bypass any missing database auto-generators
    const generatedId = Math.floor(Math.random() * 9000000) + 1000000; 

    const { data: insertData, error: insertError } = await supabaseClient
      .from('products')
      .insert([
        { id: generatedId, name, category, price, oldPrice: oldPrice || "", desc, img: publicUrl }
      ]);

    if (insertError) {
      showToast("DB Insert Failed: " + insertError.message, true);
      // Ideally delete the uploaded image here, but for simplicity we keep it
    } else {
      showToast("Product published successfully!");
      addForm.reset();
      hidePreview();
      switchSection('inventory');
    }

    btn.textContent = 'Publish Product';
    btn.disabled = false;
  });

  // --- Load Products ---
  async function loadProducts() {
    inventoryTbody.innerHTML = '<tr><td colspan="5" class="text-center">Loading inventory...</td></tr>';
    
    // Select data (we removed stars and ratingCount from schema, so no need to fetch them if they don't exist)
    const { data, error } = await supabaseClient
      .from('products')
      .select('id, name, category, price, img, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      inventoryTbody.innerHTML = `<tr><td colspan="5" class="text-center" style="color:var(--color-danger)">Fail: ${error.message}</td></tr>`;
      return;
    }

    if (!data || data.length === 0) {
      inventoryTbody.innerHTML = '<tr><td colspan="5" class="text-center">No products found. Add your first item!</td></tr>';
      return;
    }

    inventoryTbody.innerHTML = '';
    data.forEach(item => {
      const displayImg = item.img || 'https://placehold.co/100x100?text=No+Image';
      const displayCat = item.category || 'Uncategorized';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="td-img"><img src="${displayImg}" alt="${item.name}" loading="lazy"></td>
        <td class="td-name">${item.name}</td>
        <td class="td-cat">${displayCat}</td>
        <td>${item.price}</td>
        <td><button class="btn-danger delete-btn" data-id="${item.id}" data-img="${item.img}">Delete</button></td>
      `;
      inventoryTbody.appendChild(tr);
    });

    // Attach delete listeners
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        
        const id = e.target.getAttribute('data-id');
        const imgUrl = e.target.getAttribute('data-img');
        
        e.target.textContent = '...';
        
        // Delete DB record
        const { error: delError } = await supabaseClient.from('products').delete().eq('id', id);
        
        if (delError) {
          showToast("Delete failed: " + delError.message, true);
          e.target.textContent = 'Delete';
        } else {
          showToast("Product deleted");
          
          // Try deleting image from storage (silent try/catch, if fails it's just an orphaned file)
          try {
            const fileName = imgUrl.split('/').pop();
            await supabaseClient.storage.from('product-images').remove([fileName]);
          } catch(e) {}

          loadProducts();
        }
      });
    });
  }

});
