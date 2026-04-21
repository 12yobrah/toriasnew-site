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
      img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
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
      img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
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
      img: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80",
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
      img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
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
      img: "https://images.unsplash.com/photo-1573408301185-9519f94f1adf?w=800&q=80",
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
      img: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&q=80",
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
      img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
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
      img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
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
      img: "https://images.unsplash.com/photo-1601121141461-9d6647bef0a1?w=800&q=80",
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
      img: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80",
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

})();