// ============================================================
// TORIAS GLAM HAVEN | PRODUCT DATA (Inline + WooCommerce Sync)
// ============================================================
(function () {
  // 1. FALLBACK DATA (Used if Sync fails or before it finishes)
  const inlineData = [
    {
      "id": "206",
      "name": "Golden Oval Pearl Set",
      "category": "Jewelry Sets",
      "price": "KES 1,250",
      "oldPrice": "",
      "stars": "★★★★★",
      "ratingCount": "(12)",
      "img": "https://www.toriasglamhaven.co.ke/backend/wp-content/uploads/2026/04/WhatsApp-Image-2025-06-09-at-19.31.18.jpeg",
      "link": "product.html?id=206",
      "desc": "Elevate your elegance with this golden oval pearl jewelry set."
    },
    {
      "id": "207",
      "name": "Gold & Pearl Geometric Set",
      "category": "Jewelry Sets",
      "price": "KES 1,250",
      "oldPrice": "",
      "stars": "★★★★★",
      "ratingCount": "(8)",
      "img": "https://www.toriasglamhaven.co.ke/backend/wp-content/uploads/2026/04/WhatsApp-Image-2025-06-09-at-19.31.17-1.jpeg",
      "link": "product.html?id=207",
      "desc": "Bold meets elegant in this gold and mother-of-pearl jewelry set."
    },
    {
      "id": "208",
      "name": "Bold Gold Link Hoop",
      "category": "Earrings",
      "price": "KES 1,250",
      "oldPrice": "",
      "stars": "★★★★★",
      "ratingCount": "(24)",
      "img": "https://www.toriasglamhaven.co.ke/backend/wp-content/uploads/2026/04/WhatsApp-Image-2025-06-09-at-19.31.16-1.jpeg",
      "link": "product.html?id=208",
      "desc": "Make a bold statement with this contemporary gold link hoop earring."
    },
    {
      "id": "209",
      "name": "Minimalist Black & Gold Set",
      "category": "Jewelry Sets",
      "price": "KES 1,250",
      "oldPrice": "",
      "stars": "★★★★☆",
      "ratingCount": "(19)",
      "img": "https://www.toriasglamhaven.co.ke/backend/wp-content/uploads/2026/04/WhatsApp-Image-2025-06-09-at-19.31.17.jpeg",
      "link": "product.html?id=209",
      "desc": "Elegant black and gold jewelry set featuring a matching necklace and stud earrings."
    },
    {
      "id": "210",
      "name": "Vintage Bold Gold Hoop",
      "category": "Earrings",
      "price": "KES 1,500",
      "oldPrice": "",
      "stars": "★★★★★",
      "ratingCount": "(32)",
      "img": "https://www.toriasglamhaven.co.ke/backend/wp-content/uploads/2026/04/WhatsApp-Image-2025-06-09-at-19.31.16.jpeg",
      "link": "product.html?id=210",
      "desc": "Statement vintage-style gold hoop earrings with a bold, round design."
    },
    {
      "id": "211",
      "name": "Radiant Pearl Burst",
      "category": "Earrings",
      "price": "KES 1,500",
      "oldPrice": "",
      "stars": "★★★★☆",
      "ratingCount": "(15)",
      "img": "https://www.toriasglamhaven.co.ke/backend/wp-content/uploads/2026/04/WhatsApp-Image-2025-06-09-at-19.31.15.jpeg",
      "link": "product.html?id=211",
      "desc": "Bold gold burst earrings with freshwater pearl centers."
    },
    {
      "id": "212",
      "name": "The Golden Halo",
      "category": "Necklace",
      "price": "KES 1,250",
      "oldPrice": "",
      "stars": "★★★★★",
      "ratingCount": "(45)",
      "img": "https://www.toriasglamhaven.co.ke/backend/wp-content/uploads/2026/04/WhatsApp-Image-2025-06-09-at-22.57.33-2.jpeg",
      "link": "product.html?id=212",
      "desc": "A sleek, minimalist 18K gold plated pendant necklace."
    },
    {
      "id": "213",
      "name": "Red Ruby Pendant",
      "category": "Necklace",
      "price": "KES 1,250",
      "oldPrice": "",
      "stars": "★★★★★",
      "ratingCount": "(29)",
      "img": "https://www.toriasglamhaven.co.ke/backend/wp-content/uploads/2026/04/WhatsApp-Image-2025-06-09-at-22.57.33-1.jpeg",
      "link": "product.html?id=213",
      "desc": "A striking gold chain necklace featuring a vibrant AAA ruby-red gemstone."
    },
    {
      "id": "214",
      "name": "Purple Pendant Necklace",
      "category": "Necklace",
      "price": "KES 1,500",
      "oldPrice": "",
      "stars": "★★★★★",
      "ratingCount": "(11)",
      "img": "https://www.toriasglamhaven.co.ke/backend/wp-content/uploads/2026/04/WhatsApp-Image-2025-06-09-at-22.57.32.jpeg",
      "link": "product.html?id=214",
      "desc": "Add a pop of color and elegance to your everyday style."
    },
    {
      "id": "215",
      "name": "Emerald Pendant Necklace",
      "category": "Necklace",
      "price": "KES 1,500",
      "oldPrice": "",
      "stars": "★★★★★",
      "ratingCount": "(38)",
      "img": "https://www.toriasglamhaven.co.ke/backend/wp-content/uploads/2026/04/WhatsApp-Image-2025-06-09-at-22.57.33.jpeg",
      "link": "product.html?id=215",
      "desc": "Bring timeless elegance to life with our Emerald Pendant Necklace."
    }
  ];

  // Initialize global inventory
  const productsObj = {};
  inlineData.forEach(item => { productsObj[item.id] = item; });
  window.productsData = productsObj;

  // 2. CONFIGURATION
  const CONFIG = {
    URL: 'https://www.toriasglamhaven.co.ke/backend',
    CK: 'ck_ed18fde86cbb15c89e341705e60f7ca766d3bf37',
    CS: 'cs_dcf83c581c169dbc6b27ee09f8189cc14cd2b6a8',
    perPage: 100
  };

  // 3. HELPERS
  function fixImagePath(path) {
    if (!path) return 'https://via.placeholder.com/600x700?text=No+Image';
    if (path.includes('toriasglamhaven.co.ke') && !path.includes('/backend/')) {
      return path.replace('toriasglamhaven.co.ke/', 'toriasglamhaven.co.ke/backend/');
    }
    return path;
  }

  function tgh_rating_to_stars(rating) {
    const full = Math.floor(rating);
    const empty = 5 - full;
    return '★'.repeat(full) + '☆'.repeat(empty);
  }

  function stripHtml(html) {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  // 4. SYNC LOGIC
  async function fetchWooCommerceProducts() {
    const auth = btoa(`${CONFIG.CK}:${CONFIG.CS}`);
    const endpoint = `${CONFIG.URL}/wp-json/wc/v3/products?per_page=${CONFIG.perPage}&status=publish`;
    
    console.log("✦ Torias Sync: Connecting to WordPress...");

    try {
      let response = await fetch(endpoint, {
        headers: { 'Authorization': `Basic ${auth}` }
      });

      if (!response.ok) {
        console.warn("✦ Torias Sync: Pretty URL failed. Trying Plain URL fallback...");
        const plainEndpoint = `${CONFIG.URL}/index.php?rest_route=/wc/v3/products&per_page=${CONFIG.perPage}&status=publish`;
        response = await fetch(plainEndpoint, {
          headers: { 'Authorization': `Basic ${auth}` }
        });
      }

      if (response && response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          data.forEach(item => {
            const pId = String(item.id);
            window.productsData[pId] = {
              id: pId,
              name: item.name,
              category: item.categories.length > 0 ? item.categories[0].name : 'Uncategorized',
              price: `KES ${item.price}`,
              oldPrice: item.on_sale && item.regular_price !== item.price ? `KES ${item.regular_price}` : '',
              stars: tgh_rating_to_stars(parseFloat(item.average_rating || 5)),
              ratingCount: `(${item.rating_count || 0})`,
              img: item.images.length > 0 ? fixImagePath(item.images[0].src) : 'https://via.placeholder.com/600x700?text=No+Image',
              link: `product.html?id=${pId}`,
              desc: item.short_description ? stripHtml(item.short_description) : stripHtml(item.description)
            };
          });
          console.log("✦ Torias Sync: Success! Loaded " + data.length + " products from Live WordPress App.");
        }
      } else {
        throw new Error("API returned status " + (response ? response.status : "Unknown"));
      }
    } catch (err) {
      console.error("✦ Torias Sync Error:", err);
    } finally {
      // Always trigger re-render
      document.dispatchEvent(new CustomEvent('inventoryReady'));
      if (typeof window.initShopFilters === 'function') {
        window.initShopFilters();
      }
    }
  }

  // 5. INITIALIZE
  document.dispatchEvent(new CustomEvent('inventoryReady'));
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fetchWooCommerceProducts);
  } else {
    fetchWooCommerceProducts();
  }
})();
/ /   S y n c   F i x   v 2  
 