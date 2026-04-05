// ============================================================
// TORIAS GLAM HAVEN | ASYNC INVENTORY HUB
// ============================================================
// This file fetches the latest product data from the Admin Dashboard.

async function loadBoutiqueInventory() {
  try {
    const response = await fetch('data/products.json');
    if (!response.ok) throw new Error('Failed to fetch inventory');
    
    const data = await response.json();
    
    // Transform array back to object for compatibility with existing logic
    const productsObj = {};
    data.forEach(item => {
      productsObj[item.id] = item;
    });

    window.productsData = productsObj;

    // Trigger secondary initializations if functions exist
    if (typeof window.initShopFilters === 'function') {
      window.initShopFilters();
    }
    
    // Broadcast ready event
    document.dispatchEvent(new CustomEvent('inventoryReady'));
  } catch (error) {
    console.error("Merchant Hub Error: Could not load jewelry inventory.", error);
    // Fallback or error UI could be added here
  }
}

loadBoutiqueInventory();
