// ============================================================
// TORIAS GLAM HAVEN | PRODUCT DATA (Inline – works on file:// and HTTP)
// ============================================================
// Data is inlined here to avoid CORS issues when opening via file://.
// When served over HTTP the fetch fallback can overwrite this.

(function () {
  const inlineData = [
    {
      "id": 206,
      "name": "Golden Oval Pearl Set",
      "category": "Jewelry Sets",
      "price": "KES 1,250",
      "oldPrice": "",
      "stars": "★★★★★",
      "ratingCount": "(12)",
      "img": "https://www.toriasglamhaven.co.ke/backend/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-19.31.18.jpeg",
      "link": "product.html?id=206",
      "desc": "Elevate your elegance with this golden oval pearl jewelry set. Featuring a vintage-style 18K gold plated necklace and matching freshwater pearl stud earrings. Tarnish-free and hypoallergenic."
    },
    {
      "id": 207,
      "name": "Gold & Pearl Geometric Set",
      "category": "Jewelry Sets",
      "price": "KES 1,250",
      "oldPrice": "",
      "stars": "★★★★★",
      "ratingCount": "(8)",
      "img": "https://www.toriasglamhaven.co.ke/backend/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-19.31.17-1.jpeg",
      "link": "product.html?id=207",
      "desc": "Bold meets elegant in this gold and mother-of-pearl jewelry set, featuring a statement square pendant and matching geometric earrings. Crafted with 18K gold plating and freshwater pearl accents."
    },
    {
      "id": 208,
      "name": "Bold Gold Link Hoop",
      "category": "Earrings",
      "price": "KES 1,250",
      "oldPrice": "",
      "stars": "★★★★★",
      "ratingCount": "(24)",
      "img": "https://www.toriasglamhaven.co.ke/backend/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-19.31.16-1.jpeg",
      "link": "product.html?id=208",
      "desc": "Make a bold statement with this contemporary gold link hoop earring. Designed for everyday elegance with a tarnish-free 18K gold plated finish. Modern minimalism at its best."
    },
    {
      "id": 209,
      "name": "Minimalist Black & Gold Set",
      "category": "Jewelry Sets",
      "price": "KES 1,250",
      "oldPrice": "",
      "stars": "★★★★☆",
      "ratingCount": "(19)",
      "img": "https://www.toriasglamhaven.co.ke/backend/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-19.31.17.jpeg",
      "link": "product.html?id=209",
      "desc": "Elegant black and gold jewelry set featuring a matching necklace and stud earrings. Features AAA gemstones and 18K gold plated stainless steel. Tarnish-free for lasting brilliance."
    },
    {
      "id": 210,
      "name": "Vintage Bold Gold Hoop",
      "category": "Earrings",
      "price": "KES 1,500",
      "oldPrice": "",
      "stars": "★★★★★",
      "ratingCount": "(32)",
      "img": "https://www.toriasglamhaven.co.ke/backend/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-19.31.16.jpeg",
      "link": "product.html?id=210",
      "desc": "Statement vintage-style gold hoop earrings with a bold, round design. 18K gold plated and 100% tarnish-free."
    },
    {
      "id": 211,
      "name": "Radiant Pearl Burst",
      "category": "Earrings",
      "price": "KES 1,500",
      "oldPrice": "",
      "stars": "★★★★☆",
      "ratingCount": "(15)",
      "img": "https://www.toriasglamhaven.co.ke/backend/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-19.31.15.jpeg",
      "link": "product.html?id=211",
      "desc": "Bold gold burst earrings with freshwater pearl centers, paired with dainty AAA gemstones — perfect for modern luxury looks."
    },
    {
      "id": 212,
      "name": "The Golden Halo",
      "category": "Necklace",
      "price": "KES 1,250",
      "oldPrice": "",
      "stars": "★★★★★",
      "ratingCount": "(45)",
      "img": "https://www.toriasglamhaven.co.ke/backend/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-22.57.33-2.jpeg",
      "link": "product.html?id=212",
      "desc": "A sleek, minimalist 18K gold plated pendant necklace that adds timeless elegance to any look. Tarnish-free and perfect for daily wear."
    },
    {
      "id": 213,
      "name": "Red Ruby Pendant",
      "category": "Necklace",
      "price": "KES 1,250",
      "oldPrice": "",
      "stars": "★★★★★",
      "ratingCount": "(29)",
      "img": "https://www.toriasglamhaven.co.ke/backend/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-22.57.33-1.jpeg",
      "link": "product.html?id=213",
      "desc": "A striking gold chain necklace featuring a vibrant AAA ruby-red gemstone for a bold and classic finish. 18K gold plated."
    },
    {
      "id": 214,
      "name": "Purple Pendant Necklace",
      "category": "Necklace",
      "price": "KES 1,500",
      "oldPrice": "",
      "stars": "★★★★★",
      "ratingCount": "(11)",
      "img": "https://www.toriasglamhaven.co.ke/backend/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-22.57.32.jpeg",
      "link": "product.html?id=214",
      "desc": "Add a pop of color and elegance to your everyday style with our Purple Pendant Necklace, featuring AAA gemstones and tarnish-free 18K gold plating."
    },
    {
      "id": 215,
      "name": "Emerald Pendant Necklace",
      "category": "Necklace",
      "price": "KES 1,500",
      "oldPrice": "",
      "stars": "★★★★★",
      "ratingCount": "(38)",
      "img": "https://www.toriasglamhaven.co.ke/backend/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-22.57.33.jpeg",
      "link": "product.html?id=215",
      "desc": "Bring timeless elegance to life with our Emerald Pendant Necklace — designed to sparkle with AAA gemstones. Crafted for comfort with 18K gold plating."
    }
  ];

  // Build lookup object by ID
  const productsObj = {};
  inlineData.forEach(item => { productsObj[item.id] = item; });
  window.productsData = productsObj;

  // Fire the ready event immediately (data is synchronous)
  document.dispatchEvent(new CustomEvent('inventoryReady'));

  // ============================================================
  // WOOCOMMERCE REST API INTEGRATION
  // ============================================================
  const WOO_URL = 'https://www.toriasglamhaven.co.ke/backend';
  const WOO_CK  = 'ck_ed18fde86cbb15c89e341705e60f7ca766d3bf37';
  const WOO_CS  = 'cs_dcf83c581c169dbc6b27ee09f8189cc14cd2b6a8';

  // Helper to fix image paths if they are missing /backend/
  function fixImagePath(path) {
    if (!path) return 'https://via.placeholder.com/600x700?text=No+Image';
    if (path.includes('toriasglamhaven.co.ke') && !path.includes('/backend/')) {
      return path.replace('toriasglamhaven.co.ke/', 'toriasglamhaven.co.ke/backend/');
    }
    return path;
  }

  async function fetchWooCommerceProducts() {
    // Generate base64 encoded credentials for basic auth
    const auth = btoa(`${WOO_CK}:${WOO_CS}`);
    const endpoint = `${WOO_URL}/wp-json/wc/v3/products?per_page=100&status=publish`;
    let response;
    try {
      // Attempt 1: Pretty URL
      response = await fetch(endpoint, {
        headers: { 'Authorization': `Basic ${auth}` }
      });
      
      if (!response.ok) {
        throw new Error('Pretty URL failed');
      }
    } catch (err) {
      console.warn("✦ Torias Sync: Pretty URL failed. Trying Plain URL fallback...");
      // Attempt 2: Plain URL Fallback
      const plainEndpoint = `${WOO_URL}/index.php?rest_route=/wc/v3/products&per_page=100&status=publish`;
      try {
        response = await fetch(plainEndpoint, {
          headers: { 'Authorization': `Basic ${auth}` }
        });
      } catch (innerErr) {
        console.error("✦ Torias Sync: Both Pretty and Plain URLs failed.", innerErr);
        throw innerErr;
      }
    }

    if (response && response.ok) {
      const data = await response.json();

      if (data && data.length > 0) {
        // Merge WooCommerce data into existing fallback data
        data.forEach((item) => {
          const pId = String(item.id);
          
          // Map WooCommerce object to our local structure
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
        console.log("✦ Torias Sync: Complete! " + data.length + " products loaded from WooCommerce App.");
      }

      // Trigger UI updates
      document.dispatchEvent(new CustomEvent('inventoryReady'));
      if (typeof window.initShopFilters === 'function') {
        window.initShopFilters();
      }
    } else {
      throw new Error(`WooCommerce Sync Failed! Status: ${response ? response.status : 'No Response'}`);
    }
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

  // Initialize fetch
  console.log("✦ Torias Sync: Initializing connection to " + WOO_URL);

  // Run fetch regardless of protocol
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => fetchWooCommerceProducts().catch(err => {
      console.error("WooCommerce Sync Failed!", err);
      if (typeof window.initShopFilters === 'function') window.initShopFilters();
    }));
  } else {
    fetchWooCommerceProducts().catch(err => {
      console.error("WooCommerce Sync Failed!", err);
      if (typeof window.initShopFilters === 'function') window.initShopFilters();
    });
  }
})();
