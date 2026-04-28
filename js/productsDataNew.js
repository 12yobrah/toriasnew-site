// ============================================================
// TORIAS GLAM HAVEN | PRODUCT DATA (Bulletproof Sync Engine)
// ============================================================
(function () {

  // ── EMBEDDED FALLBACK DATA ─────────────────────────────────────
  // This ensures products ALWAYS display, even if WordPress is down
  const EMBEDDED_PRODUCTS = [
    {
      id: "206",
      name: "Golden Oval Pearl Necklace & Earring Set",
      category: "Jewelry Sets",
      price: "KES 1,250",
      oldPrice: "",
      stars: "★★★★★",
      ratingCount: "(12)",
      img: "img/products/1.jpg",
      link: "product.html?id=206",
      desc: "Elevate your elegance with this golden oval pearl jewelry set. Featuring a vintage-style necklace and matching stud earrings, it's perfect for weddings, special events, or everyday grace."
    },
    {
      id: "207",
      name: "Gold & Mother of Pearl Geometric Set",
      category: "Jewelry Sets",
      price: "KES 1,250",
      oldPrice: "",
      stars: "★★★★★",
      ratingCount: "(8)",
      img: "img/products/2.jpg",
      link: "product.html?id=207",
      desc: "Bold meets elegant in this gold and mother-of-pearl jewelry set, featuring a statement square pendant and matching geometric earrings."
    },
    {
      id: "208",
      name: "Bold Gold Link Hoop Earring",
      category: "Earrings",
      price: "KES 1,250",
      oldPrice: "",
      stars: "★★★★★",
      ratingCount: "(24)",
      img: "img/products/3.jpg",
      link: "product.html?id=208",
      desc: "Make a bold statement with this contemporary gold link hoop earring. Designed for everyday elegance and modern minimalism."
    },
    {
      id: "209",
      name: "Minimalist Black & Gold Jewelry Set",
      category: "Jewelry Sets",
      price: "KES 1,250",
      oldPrice: "",
      stars: "★★★★☆",
      ratingCount: "(19)",
      img: "img/products/4.jpg",
      link: "product.html?id=209",
      desc: "Elegant black and gold jewelry set featuring a matching necklace and stud earrings. Perfect for minimalist style lovers."
    },
    {
      id: "210",
      name: "Vintage Bold Gold Hoop Earrings",
      category: "Earrings",
      price: "KES 1,500",
      oldPrice: "",
      stars: "★★★★★",
      ratingCount: "(32)",
      img: "img/products/5.jpg",
      link: "product.html?id=210",
      desc: "Statement vintage-style gold hoop earrings with a bold, round design. 18K gold plated and 100% tarnish-free."
    },
    {
      id: "211",
      name: "Radiant Pearl Burst Statement Earrings",
      category: "Earrings",
      price: "KES 1,500",
      oldPrice: "",
      stars: "★★★★☆",
      ratingCount: "(15)",
      img: "img/products/6.jpg",
      link: "product.html?id=211",
      desc: "Bold gold burst earrings with pearl centers, paired with dainty gemstone studs — perfect for modern glam looks."
    },
    {
      id: "212",
      name: "The Golden Halo",
      category: "Necklace",
      price: "KES 1,250",
      oldPrice: "",
      stars: "★★★★★",
      ratingCount: "(45)",
      img: "img/products/7.jpg",
      link: "product.html?id=212",
      desc: "A sleek, minimalist gold pendant necklace that adds timeless elegance to any look. Tarnish-free and perfect for daily wear."
    },
    {
      id: "213",
      name: "Red Ruby Pendant Necklace",
      category: "Necklace",
      price: "KES 1,250",
      oldPrice: "",
      stars: "★★★★★",
      ratingCount: "(29)",
      img: "img/products/8.jpg",
      link: "product.html?id=213",
      desc: "A striking gold chain necklace featuring a vibrant ruby-red gemstone for a bold and classic finish. 18K gold plated."
    },
    {
      id: "214",
      name: "Purple Pendant Necklace",
      category: "Necklace",
      price: "KES 1,500",
      oldPrice: "",
      stars: "★★★★★",
      ratingCount: "(11)",
      img: "img/products/9.jpg",
      link: "product.html?id=214",
      desc: "Add a pop of color and elegance to your everyday style with our Purple Pendant Necklace — crafted for charm, comfort, and long-lasting shine."
    },
    {
      id: "215",
      name: "Emerald Pendant Necklace",
      category: "Necklace",
      price: "KES 1,500",
      oldPrice: "",
      stars: "★★★★★",
      ratingCount: "(38)",
      img: "img/products/10.jpg",
      link: "product.html?id=215",
      desc: "Bring timeless elegance to life with our Emerald Pendant Necklace — designed to sparkle and crafted for comfort."
    }
  ];

  // ── INITIALIZE DATA ──────────────────────────────────────────
  window.productsData = {};
  
  // 1. First, load the absolute latest data from the Dashboard (json)
  // 2. Fallback to embedded data if the fetch fails
  async function loadDashboardData() {
    try {
      const resp = await fetch('data/products.json?v=' + Date.now());
      if (resp.ok) {
        const data = await resp.json();
        const items = data.products || data;
        items.forEach(item => {
          window.productsData[String(item.id)] = { ...item };
        });
        console.log(`✦ Torias Dashboard: ${items.length} products synced.`);
      }
    } catch (e) {
      console.warn("✦ Torias Sync: Dashboard fetch failed. Using embedded fallbacks.");
      EMBEDDED_PRODUCTS.forEach(item => {
        window.productsData[item.id] = { ...item };
      });
    }
    document.dispatchEvent(new CustomEvent('inventoryReady'));
    if (typeof window.initShopFilters === 'function') window.initShopFilters();
  }

  loadDashboardData();

  // ── SUPABASE CONFIG ────────────────────────────────────────────
  const SUPABASE_URL = 'https://xfuhxmrqykkmfqcpshhs.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_tA-hIr0xRAkpb_Rt0l_Odg_nonm1k6v';

  // ── SUPABASE LIVE SYNC (background upgrade) ──────────────────
  async function backgroundSync() {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      const r = await fetch(`${SUPABASE_URL}/rest/v1/products?select=*&order=created_at.desc`, {
        headers: { 
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}` 
        },
        signal: controller.signal
      });
      clearTimeout(timeout);

      if (r.ok) {
        const data = await r.json();
        console.log(`✦ Torias Sync: Found ${data.length} live products on Supabase.`);

        // Replace embedded data with live Supabase data
        Object.keys(window.productsData).forEach(k => delete window.productsData[k]);

        data.forEach(item => {
          
          // Smart fallback: If the database item doesn't have an image, search the original embedded products by name
          let displayImg = item.img;
          if (!displayImg) {
             const matchedLegacy = EMBEDDED_PRODUCTS.find(p => p.name.trim().toLowerCase() === item.name.trim().toLowerCase());
             displayImg = matchedLegacy ? matchedLegacy.img : 'https://placehold.co/600x600?text=No+Image';
          }

          window.productsData[String(item.id)] = {
            id: String(item.id),
            name: item.name,
            category: item.category || 'Jewelry',
            price: item.price,
            oldPrice: item.oldPrice || '',
            stars: '★★★★★',
            ratingCount: '(12)', 
            img: displayImg,
            link: `product.html?id=${item.id}`,
            desc: item.desc || item.name
          };
        });

        console.log("✦ Torias Sync: Live Supabase data now active!");
        document.dispatchEvent(new CustomEvent('inventoryReady'));
        if (typeof window.initShopFilters === 'function') window.initShopFilters();
        return true;
      }
      console.warn(`✦ Torias Sync: Supabase returned HTTP ${r.status}`);
      return false;
    } catch (e) {
      console.warn(`✦ Torias Sync: Supabase unreachable (${e.message}). Using embedded data.`);
      return false;
    }
  }

  // Run Supabase sync in background — overwrites fallback data seamlessly
  backgroundSync();
})();