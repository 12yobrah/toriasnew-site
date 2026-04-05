// ============================================================
// TORIAS GLAM – MASTER PRODUCT DATABASE
// ============================================================
// To add a new product: 
// 1. Copy an existing block below (including the { and } braces).
// 2. Give it a unique ID number.
// 3. Update the details (name, category, price, img path, and description).
// 4. Products added here will automatically appear in the Shop and Search.

const productsData = {
  206: { 
    name: 'Golden Oval Pearl Set', 
    category: 'Jewelry Sets', 
    price: '$1,250.00', 
    oldPrice: '', 
    stars: '★★★★★', 
    ratingCount: '(12)', 
    img: 'https://www.toriasglamhaven.co.ke/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-19.31.18.jpeg', 
    link: 'product.html?id=206', 
    desc: 'Elevate your elegance with this golden oval pearl jewelry set. Featuring a vintage-style 18K gold plated necklace and matching freshwater pearl stud earrings. Tarnish-free and hypoallergenic.' 
  },
  207: { 
    name: 'Gold & Pearl Geometric Set', 
    category: 'Jewelry Sets', 
    price: '$1,250.00', 
    oldPrice: '', 
    stars: '★★★★★', 
    ratingCount: '(8)', 
    img: 'https://www.toriasglamhaven.co.ke/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-19.31.17-1.jpeg', 
    link: 'product.html?id=207', 
    desc: 'Bold meets elegant in this gold and mother-of-pearl jewelry set, featuring a statement square pendant and matching geometric earrings. Crafted with 18K gold plating and freshwater pearl accents.' 
  },
  208: { 
    name: 'Bold Gold Link Hoop', 
    category: 'Earrings', 
    price: '$1,250.00', 
    oldPrice: '', 
    stars: '★★★★★', 
    ratingCount: '(24)', 
    img: 'https://www.toriasglamhaven.co.ke/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-19.31.16-1.jpeg', 
    link: 'product.html?id=208', 
    desc: 'Make a bold statement with this contemporary gold link hoop earring. Designed for everyday elegance with a tarnish-free 18K gold plated finish. Modern minimalism at its best.' 
  },
  209: { 
    name: 'Minimalist Black & Gold Set', 
    category: 'Jewelry Sets', 
    price: '$1,250.00', 
    oldPrice: '', 
    stars: '★★★★☆', 
    ratingCount: '(19)', 
    img: 'https://www.toriasglamhaven.co.ke/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-19.31.17.jpeg', 
    link: 'product.html?id=209', 
    desc: 'Elegant black and gold jewelry set featuring a matching necklace and stud earrings. Features AAA gemstones and 18K gold plated stainless steel. Tarnish-free for lasting brilliance.' 
  },
  210: { 
    name: 'Vintage Bold Gold Hoop', 
    category: 'Earrings', 
    price: '$1,500.00', 
    oldPrice: '', 
    stars: '★★★★★', 
    ratingCount: '(32)', 
    img: 'https://www.toriasglamhaven.co.ke/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-19.31.16.jpeg', 
    link: 'product.html?id=210', 
    desc: 'Statement vintage-style gold hoop earrings with a bold, round design. 18K gold plated and 100% tarnish-free.' 
  },
  211: { 
    name: 'Radiant Pearl Burst', 
    category: 'Earrings', 
    price: '$1,500.00', 
    oldPrice: '', 
    stars: '★★★★☆', 
    ratingCount: '(15)', 
    img: 'https://www.toriasglamhaven.co.ke/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-19.31.15.jpeg', 
    link: 'product.html?id=211', 
    desc: 'Bold gold burst earrings with freshwater pearl centers, paired with dainty AAA gemstones — perfect for modern luxury looks.' 
  },
  212: { 
    name: 'The Golden Halo', 
    category: 'Necklace', 
    price: '$1,250.00', 
    oldPrice: '', 
    stars: '★★★★★', 
    ratingCount: '(45)', 
    img: 'https://www.toriasglamhaven.co.ke/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-22.57.33-2.jpeg', 
    link: 'product.html?id=212', 
    desc: 'A sleek, minimalist 18K gold plated pendant necklace that adds timeless elegance to any look. Tarnish-free and perfect for daily wear.' 
  },
  213: { 
    name: 'Red Ruby Pendant', 
    category: 'Necklace', 
    price: '$1,250.00', 
    oldPrice: '', 
    stars: '★★★★★', 
    ratingCount: '(29)', 
    img: 'https://www.toriasglamhaven.co.ke/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-22.57.33-1.jpeg', 
    link: 'product.html?id=213', 
    desc: 'A striking gold chain necklace featuring a vibrant AAA ruby-red gemstone for a bold and classic finish. 18K gold plated.' 
  },
  214: { 
    name: 'Purple Pendant Necklace', 
    category: 'Necklace', 
    price: '$1,500.00', 
    oldPrice: '', 
    stars: '★★★★★', 
    ratingCount: '(11)', 
    img: 'https://www.toriasglamhaven.co.ke/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-22.57.32.jpeg', 
    link: 'product.html?id=214', 
    desc: 'Add a pop of color and elegance to your everyday style with our Purple Pendant Necklace, featuring AAA gemstones and tarnish-free 18K gold plating.' 
  },
  215: { 
    name: 'Emerald Pendant Necklace', 
    category: 'Necklace', 
    price: '$1,500.00', 
    oldPrice: '', 
    stars: '★★★★★', 
    ratingCount: '(38)', 
    img: 'https://www.toriasglamhaven.co.ke/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-09-at-22.57.33.jpeg', 
    link: 'product.html?id=215', 
    desc: 'Bring timeless elegance to life with our Emerald Pendant Necklace — designed to sparkle with AAA gemstones. Crafted for comfort with 18K gold plating.' 
  },
};

// Export to global scope
window.productsData = productsData;

