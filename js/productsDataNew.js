// ============================================================
// TORIAS GLAM HAVEN | PRODUCT DATA (Zero-Flicker Sync Engine)
// ============================================================
(function () {
  // START WITH EMPTY DATA - This kills the flicker of old sample items
  const productsObj = {};
  window.productsData = productsObj;

  const CONFIG = {
    URL: 'https://backend.toriasglamhaven.co.ke',
    CK: 'ck_ed18fde86cbb15c89e341705e60f7ca766d3bf37',
    CS: 'cs_dcf83c581c169dbc6b27ee09f8189cc14cd2b6a8'
  };

  async function sync() {
    console.log("✦ Torias Sync: Starting fetch from WordPress...");
    try {
      const auth = btoa(`${CONFIG.CK}:${CONFIG.CS}`);
      const r = await fetch(`${CONFIG.URL}/wp-json/wc/v3/products?per_page=100&status=publish`, {
        headers: { 'Authorization': `Basic ${auth}` }
      });
      
      if (r.ok) {
        const data = await r.json();
        console.log(`✦ Torias Sync: Found ${data.length} products on WordPress.`);
        
        data.forEach(item => {
          // Clean image URLs (remove Jetpack/Photon if present)
          let imgUrl = item.images.length > 0 ? item.images[0].src : 'https://via.placeholder.com/600';
          imgUrl = imgUrl.replace(/i\d\.wp\.com\//, '').split('?')[0];

          window.productsData[String(item.id)] = {
            id: String(item.id),
            name: item.name,
            category: item.categories.length > 0 ? item.categories[0].name : 'Jewelry',
            price: `KES ${Number(item.price).toLocaleString()}`,
            img: imgUrl,
            link: `product.html?id=${item.id}`,
            desc: item.name
          };
        });
        
        console.log("✦ Torias Sync: Success! Products synchronized.");
      } else {
        console.error("✦ Torias Sync: API Error!", r.status, r.statusText);
      }
    } catch (e) { 
      console.error("✦ Torias Sync: Fatal connection error!", e.message); 
    }
    
    // Notify all other scripts that data is ready
    document.dispatchEvent(new CustomEvent('inventoryReady'));
    if (typeof window.initShopFilters === 'function') window.initShopFilters();
  }

  // Execute sync immediately
  sync();
})();