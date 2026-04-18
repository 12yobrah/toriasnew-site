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
      img: "https://www.toriasglamhaven.co.ke/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-19.31.18.jpeg",
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
      img: "https://www.toriasglamhaven.co.ke/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-19.31.17-1.jpeg",
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
      img: "https://www.toriasglamhaven.co.ke/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-19.31.16-1.jpeg",
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
      img: "https://www.toriasglamhaven.co.ke/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-19.31.17.jpeg",
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
      img: "https://www.toriasglamhaven.co.ke/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-19.31.16.jpeg",
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
      img: "https://www.toriasglamhaven.co.ke/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-19.31.15.jpeg",
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
      img: "https://www.toriasglamhaven.co.ke/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-22.57.33-2.jpeg",
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
      img: "https://www.toriasglamhaven.co.ke/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-22.57.33-1.jpeg",
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
      img: "https://www.toriasglamhaven.co.ke/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-22.57.32.jpeg",
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
      img: "https://www.toriasglamhaven.co.ke/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-22.57.33.jpeg",
      link: "product.html?id=215",
      desc: "Bring timeless elegance to life with our Emerald Pendant Necklace — designed to sparkle and crafted for comfort."
    }
  ];

  // ── INITIALIZE WITH EMBEDDED DATA IMMEDIATELY ──────────────────
  window.productsData = {};
  EMBEDDED_PRODUCTS.forEach(item => {
    window.productsData[item.id] = { ...item };
  });
  console.log(`✦ Torias Sync: ${EMBEDDED_PRODUCTS.length} products loaded instantly.`);

  // Fire inventory ready immediately so pages render right away
  // Use setTimeout(0) to ensure DOM listeners are attached first
  setTimeout(() => {
    document.dispatchEvent(new CustomEvent('inventoryReady'));
    if (typeof window.initShopFilters === 'function') window.initShopFilters();
  }, 0);

  // ── WORDPRESS CONFIG ───────────────────────────────────────────
  const CONFIG = {
    URL: 'https://backend.toriasglamhaven.co.ke',
    CK: 'ck_ed18fde86cbb15c89e341705e60f7ca766d3bf37',
    CS: 'cs_dcf83c581c169dbc6b27ee09f8189cc14cd2b6a8'
  };

  // ── WORDPRESS LIVE SYNC (background upgrade) ──────────────────
  async function conductFetch(apiUrl) {
    try {
      const auth = btoa(`${CONFIG.CK}:${CONFIG.CS}`);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      const r = await fetch(`${apiUrl}/wp-json/wc/v3/products?per_page=100&status=publish`, {
        headers: { 'Authorization': `Basic ${auth}` },
        signal: controller.signal
      });
      clearTimeout(timeout);

      if (r.ok) {
        const data = await r.json();
        console.log(`✦ Torias Sync: Found ${data.length} live products on ${apiUrl}.`);

        // Replace embedded data with live WordPress data
        Object.keys(window.productsData).forEach(k => delete window.productsData[k]);

        data.forEach(item => {
          let imgUrl = item.images.length > 0 ? item.images[0].src : 'https://placehold.co/600x600?text=No+Image';
          imgUrl = imgUrl.replace(/i\d\.wp\.com\//, '').split('?')[0];

          window.productsData[String(item.id)] = {
            id: String(item.id),
            name: item.name,
            category: item.categories.length > 0 ? item.categories[0].name : 'Jewelry',
            price: `KES ${Number(item.price).toLocaleString()}`,
            oldPrice: item.regular_price && item.sale_price ? `KES ${Number(item.regular_price).toLocaleString()}` : '',
            stars: '★★★★★',
            ratingCount: `(${item.rating_count || 0})`,
            img: imgUrl,
            link: `product.html?id=${item.id}`,
            desc: item.short_description ? item.short_description.replace(/<[^>]*>/g, '') : item.name
          };
        });

        console.log("✦ Torias Sync: Live WordPress data now active!");
        return true;
      }
      console.warn(`✦ Torias Sync: ${apiUrl} returned HTTP ${r.status}`);
      return false;
    } catch (e) {
      console.warn(`✦ Torias Sync: ${apiUrl} unreachable (${e.message}). Using embedded data.`);
      return false;
    }
  }

  // ── BACKGROUND SYNC (non-blocking) ────────────────────────────
  async function backgroundSync() {
    // Try subdomain first
    let success = await conductFetch(CONFIG.URL);

    // Failover to root domain path
    if (!success) {
      success = await conductFetch('https://www.toriasglamhaven.co.ke/backend');
    }

    // If WP succeeded, re-fire events to refresh the page with live data
    if (success) {
      document.dispatchEvent(new CustomEvent('inventoryReady'));
      if (typeof window.initShopFilters === 'function') window.initShopFilters();
    }
  }

  // Run WordPress sync in background — products already show from embedded data
  backgroundSync();

})();