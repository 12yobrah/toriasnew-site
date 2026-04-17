// ============================================================
// TORIAS GLAM HAVEN | PRODUCT DATA (Verified API Version)
// ============================================================
(function () {
  const inlineData = [
    {
      "id": "213",
      "name": "Golden Oval Pearl Necklace & Earring Set",
      "category": "Jewelry Sets",
      "price": "KES 1,250",
      "img": "https://toriasglamhaven.co.ke/backend/wp-content/uploads/2026/04/WhatsApp-Image-2025-06-09-at-19.31.18.jpeg",
      "link": "product.html?id=213",
      "desc": "Elevate your elegance with this golden oval pearl jewelry set."
    },
    {
      "id": "19",
      "name": "Gold & Mother of Pearl Geometric Jewelry Set",
      "category": "Jewelry Sets",
      "price": "KES 1,250",
      "img": "https://toriasglamhaven.co.ke/backend/wp-content/uploads/2026/04/WhatsApp-Image-2025-06-09-at-19.31.17-1.jpeg",
      "link": "product.html?id=19",
      "desc": "Bold meets elegant in this gold and mother-of-pearl jewelry set."
    },
    {
      "id": "18",
      "name": "Bold Gold Link Hoop Earring",
      "category": "Earrings",
      "price": "KES 1,250",
      "img": "https://toriasglamhaven.co.ke/backend/wp-content/uploads/2026/04/WhatsApp-Image-2025-06-09-at-19.31.16-1.jpeg",
      "link": "product.html?id=18",
      "desc": "Make a bold statement with this contemporary gold link hoop earring."
    },
    {
      "id": "17",
      "name": "Minimalist Black & Gold Jewelry Set",
      "category": "Jewelry Sets",
      "price": "KES 1,250",
      "img": "https://toriasglamhaven.co.ke/backend/wp-content/uploads/2026/04/WhatsApp-Image-2025-06-09-at-19.31.17.jpeg",
      "link": "product.html?id=17",
      "desc": "Elegant black and gold jewelry set featuring a matching necklace and stud earrings."
    },
    {
      "id": "16",
      "name": "Vintage Bold Gold Hoop Earrings",
      "category": "Earrings",
      "price": "KES 1,500",
      "img": "https://toriasglamhaven.co.ke/backend/wp-content/uploads/2026/04/WhatsApp-Image-2025-06-09-at-19.31.16.jpeg",
      "link": "product.html?id=16",
      "desc": "Statement vintage-style gold hoop earrings with a bold, round design."
    },
    {
      "id": "15",
      "name": "Radiant Pearl Burst Statement Earrings",
      "category": "Earrings",
      "price": "KES 1,500",
      "img": "https://toriasglamhaven.co.ke/backend/wp-content/uploads/2026/04/WhatsApp-Image-2025-06-09-at-19.31.15.jpeg",
      "link": "product.html?id=15",
      "desc": "Bold gold burst earrings with freshwater pearl centers."
    },
    {
      "id": "23",
      "name": "The Golden Halo",
      "category": "Necklace",
      "price": "KES 1,250",
      "img": "https://toriasglamhaven.co.ke/backend/wp-content/uploads/2026/04/WhatsApp-Image-2025-06-09-at-22.57.33-2.jpeg",
      "link": "product.html?id=23",
      "desc": "A sleek, minimalist 18K gold plated pendant necklace."
    },
    {
      "id": "22",
      "name": "Purple Pendant Necklace",
      "category": "Necklace",
      "price": "KES 1,500",
      "img": "https://toriasglamhaven.co.ke/backend/wp-content/uploads/2026/04/WhatsApp-Image-2025-06-09-at-22.57.32.jpeg",
      "link": "product.html?id=22",
      "desc": "Add a pop of color and elegance to your everyday style."
    },
    {
      "id": "21",
      "name": "Emerald Pendant Necklace",
      "category": "Necklace",
      "price": "KES 1,500",
      "img": "https://toriasglamhaven.co.ke/backend/wp-content/uploads/2026/04/WhatsApp-Image-2025-06-09-at-22.57.33.jpeg",
      "link": "product.html?id=21",
      "desc": "Bring timeless elegance to life with our Emerald Pendant Necklace."
    },
    {
      "id": "25",
      "name": "Product (New/Test)",
      "category": "Jewelry Sets",
      "price": "KES 1,500",
      "img": "https://i0.wp.com/toriasglamhaven.co.ke/backend/wp-content/uploads/2026/04/JPEG_20260416_014541_8600875885701985823-scaled-1.jpg?fit=1152%2C2560&ssl=1",
      "link": "product.html?id=25",
      "desc": "New Arrivals."
    }
  ];

  const productsObj = {};
  inlineData.forEach(item => { productsObj[item.id] = item; });
  window.productsData = productsObj;

  const CONFIG = {
    URL: 'https://www.toriasglamhaven.co.ke/backend',
    CK: 'ck_ed18fde86cbb15c89e341705e60f7ca766d3bf37',
    CS: 'cs_dcf83c581c169dbc6b27ee09f8189cc14cd2b6a8'
  };

  async function sync() {
    try {
      const auth = btoa(`${CONFIG.CK}:${CONFIG.CS}`);
      const r = await fetch(`${CONFIG.URL}/wp-json/wc/v3/products?per_page=100&status=publish`, {
        headers: { 'Authorization': `Basic ${auth}` }
      });
      if (r.ok) {
        const data = await r.json();
        data.forEach(item => {
          window.productsData[String(item.id)] = {
            id: String(item.id),
            name: item.name,
            category: item.categories.length > 0 ? item.categories[0].name : 'Jewelry',
            price: `KES ${item.price}`,
            img: item.images.length > 0 ? item.images[0].src : 'https://via.placeholder.com/600',
            link: `product.html?id=${item.id}`,
            desc: item.name
          };
        });
        console.log("✦ Torias Sync: Success! Products loaded from WordPress.");
      }
    } catch (e) { console.warn("✦ Sync failed, using fallback images."); }
    document.dispatchEvent(new CustomEvent('inventoryReady'));
    if (typeof window.initShopFilters === 'function') window.initShopFilters();
  }

  sync();
})();