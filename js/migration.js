// ============================================================
// BULK MIGRATION SCRIPT
// ============================================================

const SUPABASE_URL = 'https://xfuhxmrqykkmfqcpshhs.supabase.co';
const SUPABASE_KEY = 'sb_publishable_tA-hIr0xRAkpb_Rt0l_Odg_nonm1k6v'; 
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const EMBEDDED_PRODUCTS = [
  { name: "Golden Oval Pearl Necklace & Earring Set", category: "Jewelry Sets", price: "KES 1,250", oldPrice: "", img: "img/products/1.jpg", desc: "Elevate your elegance with this golden oval pearl jewelry set." },
  { name: "Gold & Mother of Pearl Geometric Set", category: "Jewelry Sets", price: "KES 1,250", oldPrice: "", img: "img/products/2.jpg", desc: "Bold meets elegant in this gold and mother-of-pearl jewelry set." },
  { name: "Bold Gold Link Hoop Earring", category: "Earrings", price: "KES 1,250", oldPrice: "", img: "img/products/3.jpg", desc: "Make a bold statement with this contemporary gold link hoop earring." },
  { name: "Minimalist Black & Gold Jewelry Set", category: "Jewelry Sets", price: "KES 1,250", oldPrice: "", img: "img/products/4.jpg", desc: "Elegant black and gold jewelry set featuring a matching necklace and stud earrings." },
  { name: "Vintage Bold Gold Hoop Earrings", category: "Earrings", price: "KES 1,500", oldPrice: "", img: "img/products/5.jpg", desc: "Statement vintage-style gold hoop earrings with a bold, round design." },
  { name: "Radiant Pearl Burst Statement Earrings", category: "Earrings", price: "KES 1,500", oldPrice: "", img: "img/products/6.jpg", desc: "Bold gold burst earrings with pearl centers, paired with dainty gemstone studs." },
  { name: "The Golden Halo", category: "Necklace", price: "KES 1,250", oldPrice: "", img: "img/products/7.jpg", desc: "A sleek, minimalist gold pendant necklace that adds timeless elegance to any look." },
  { name: "Red Ruby Pendant Necklace", category: "Necklace", price: "KES 1,250", oldPrice: "", img: "img/products/8.jpg", desc: "A striking gold chain necklace featuring a vibrant ruby-red gemstone." },
  { name: "Purple Pendant Necklace", category: "Necklace", price: "KES 1,500", oldPrice: "", img: "img/products/9.jpg", desc: "Add a pop of color and elegance to your everyday style with our Purple Pendant." },
  { name: "Emerald Pendant Necklace", category: "Necklace", price: "KES 1,500", oldPrice: "", img: "img/products/10.jpg", desc: "Bring timeless elegance to life with our Emerald Pendant Necklace." }
];

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('migrate-btn');
  const logDiv = document.getElementById('log');

  function log(msg) {
    console.log(msg);
    logDiv.innerHTML += `<div>${msg}</div>`;
    logDiv.scrollTop = logDiv.scrollHeight;
  }

  btn.addEventListener('click', async () => {
    btn.disabled = true;
    
    // RLS Auth Fix: Since this is running on Live Server, we need to log you in first!
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) {
      const email = window.prompt("Security Check: Enter your Supabase Admin Email:");
      const password = window.prompt("Security Check: Enter your Admin Password:");
      if (!email || !password) {
        log('<span style="color:salmon">Migration halted. Login required.</span>');
        btn.disabled = false;
        return;
      }
      log('Authenticating...');
      const { error: signInError } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (signInError) {
        log('<span style="color:salmon">Login failed: ' + signInError.message + '</span>');
        btn.disabled = false;
        return;
      }
      log('✅ Admin Session Authenticated!');
    }

    log('Starting migration of 10 items...');

    // 1. First, wipe everything so we don't duplicate
    log('Clearing old table records...');
    const { error: delError } = await supabaseClient.from('products').delete().neq('id', 0);
    if (!delError) log('Old records cleared.');

    let successCount = 0;

    for (let i = 0; i < EMBEDDED_PRODUCTS.length; i++) {
      const item = EMBEDDED_PRODUCTS[i];
      log(`\n[${i+1}/10] Processing: ${item.name}...`);
      
      try {
        // Fetch local image file Blob
        const response = await fetch(item.img);
        if (!response.ok) throw new Error("Image file missing locally.");
        const blob = await response.blob();
        
        // Upload to Supabase bucket
        const ext = item.img.split('.').pop();
        const randName = `migrated_${Date.now()}_${i}.${ext}`;
        
        const { error: uploadError } = await supabaseClient.storage.from('product-images').upload(randName, blob);
        if (uploadError) throw new Error("Storage Upload failed: " + uploadError.message);
        
        // Get public URL
        const { data: { publicUrl } } = supabaseClient.storage.from('product-images').getPublicUrl(randName);

        // Generate ID
        const generatedId = Math.floor(Math.random() * 9000000) + 1000000; 

        // Insert to DB
        const { error: insertError } = await supabaseClient.from('products').insert([
          { id: generatedId, name: item.name, category: item.category, price: item.price, oldPrice: item.oldPrice, desc: item.desc, img: publicUrl }
        ]);

        if (insertError) throw new Error("DB Insert failed: " + insertError.message);

        log(`<span style="color:lawngreen">Successfully migrated: ${item.name}</span>`);
        successCount++;
        
      } catch (err) {
        log(`<span style="color:salmon">Error on ${item.name}: ${err.message}</span>`);
      }
    }

    log(`\n<b>Migration Complete!</b> Successfully moved ${successCount} out of 10 products.`);
    if (successCount > 0) log('You can now open the admin dash and check your fully populated inventory!');
    btn.textContent = 'Migration Complete';
  });
});
