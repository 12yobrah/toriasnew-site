<?php
/**
 * TORIAS GLAM HAVEN – header.php
 * Promo banner, sticky navigation, search overlay.
 */
defined('ABSPATH') || exit;
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a href="#main-content" class="skip-to-content">Skip to main content</a>

<!-- ── PROMO BANNER ── -->
<div class="promo-banner" id="promo-banner">
  <div class="promo-marquee">
    <div class="marquee-content">
      <span>✦ Welcome to TORIAS GLAM HAVEN ✦</span>
      <span>New Collection Arriving Soon</span>
      <span>Call/WhatsApp: 0707353520</span>
      <span>✦ Welcome to TORIAS GLAM HAVEN ✦</span>
      <span>New Collection Arriving Soon</span>
      <span>Call/WhatsApp: 0707353520</span>
    </div>
  </div>
  <button class="promo-close" id="promo-close" aria-label="Close banner">✕</button>
</div>

<!-- ── SITE HEADER ── -->
<header class="site-header" id="site-header">
  <div class="header-inner container">

    <!-- Logo -->
    <a href="<?php echo esc_url(home_url('/')); ?>" class="logo" aria-label="TORIAS GLAM HAVEN Home">
      <div class="logo-text">
        <div class="logo-top">
          <span class="logo-ornament">✦</span>
          <span class="logo-main">Torias</span>
          <span class="logo-ornament">✦</span>
        </div>
        <span class="logo-sub">GLAM HAVEN</span>
      </div>
    </a>

    <!-- Primary Navigation -->
    <nav class="main-nav" id="main-nav" aria-label="Primary navigation">
      <ul class="nav-list">
        <li>
          <a href="<?php echo esc_url(home_url('/')); ?>" class="nav-link <?php echo is_front_page() ? 'active' : ''; ?>">Home</a>
        </li>
        <li class="nav-dropdown">
          <a href="<?php echo esc_url(tgh_shop_url()); ?>" class="nav-link <?php echo (class_exists('WooCommerce') && function_exists('is_shop') && (is_shop() || is_product_category())) ? 'active' : ''; ?>">
            Shop <span class="dropdown-arrow">▾</span>
          </a>
          <ul class="dropdown-menu">
            <?php
            $cats = get_terms(array('taxonomy' => 'product_cat', 'hide_empty' => true, 'parent' => 0));
            if (!empty($cats) && !is_wp_error($cats)):
              foreach ($cats as $cat):
                if ($cat->slug === 'uncategorized') continue;
            ?>
            <li>
              <a href="<?php echo esc_url(get_term_link($cat)); ?>"><?php echo esc_html($cat->name); ?></a>
            </li>
            <?php endforeach; endif; ?>
          </ul>
        </li>
        <li>
          <a href="<?php echo esc_url(get_page_link(get_page_by_path('about'))); ?>" class="nav-link <?php echo is_page('about') ? 'active' : ''; ?>">About Us</a>
        </li>
        <li>
          <a href="<?php echo esc_url(get_page_link(get_page_by_path('contact'))); ?>" class="nav-link <?php echo is_page('contact') ? 'active' : ''; ?>">Contact</a>
        </li>
      </ul>
    </nav>

    <!-- Header Actions -->
    <div class="header-actions">
      <!-- Search -->
      <button class="icon-btn search-btn" id="search-btn" aria-label="Search">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      </button>

      <!-- Wishlist -->
      <a href="#" class="icon-btn wishlist-btn" aria-label="Wishlist">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        <span class="icon-badge wishlist-count">0</span>
      </a>

      <!-- Cart -->
      <a href="<?php echo esc_url(tgh_cart_url()); ?>" class="icon-btn cart-btn" aria-label="Shopping cart">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <span class="icon-badge cart-count"><?php echo esc_html(tgh_cart_count()); ?></span>
      </a>
      <?php wp_nonce_field('tgh_nonce', 'tgh_nonce_field', false); ?>

      <!-- Mobile Hamburger -->
      <button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>

  </div>

  <?php if (is_front_page()): ?>
  <!-- Category Sub-Nav (homepage only) -->
  <div class="nav-category-bar">
    <div class="container">
      <ul class="cat-nav-list">
        <li><a href="<?php echo esc_url(tgh_shop_url()); ?>">All Jewelry</a></li>
        <?php
        $cats = get_terms(array('taxonomy' => 'product_cat', 'hide_empty' => true, 'parent' => 0));
        if (!empty($cats) && !is_wp_error($cats)):
          foreach ($cats as $cat):
            if ($cat->slug === 'uncategorized') continue;
        ?>
        <li><a href="<?php echo esc_url(get_term_link($cat)); ?>"><?php echo esc_html($cat->name); ?></a></li>
        <?php endforeach; endif; ?>
      </ul>
    </div>
  </div>
  <?php endif; ?>

</header>

<!-- ── SEARCH OVERLAY ── -->
<div class="search-overlay" id="search-overlay" hidden>
  <div class="search-container container">
    <div class="search-header">
      <input type="text" id="search-input" placeholder="Search for jewelry..." aria-label="Search input" />
      <button id="search-close" class="search-close-btn" aria-label="Close search">✕</button>
    </div>
    <div id="search-results" class="search-results-grid"></div>
  </div>
</div>

<!-- ── QUICK VIEW MODAL ── -->
<div class="modal-overlay" id="quick-view-modal" role="dialog" aria-modal="true" hidden>
  <div class="modal-box">
    <button class="modal-close" id="modal-close" aria-label="Close">✕</button>
    <div class="modal-content">
      <div class="modal-img"><img src="" alt="Product" id="modal-img" /></div>
      <div class="modal-details">
        <p class="product-category" id="modal-category"></p>
        <h3 id="modal-name"></h3>
        <div class="product-rating">
          <span class="stars" id="modal-stars"></span>
          <span class="rating-count" id="modal-rating-count"></span>
        </div>
        <div class="product-price-row">
          <span class="product-price" id="modal-price"></span>
          <span class="product-price-old" id="modal-old-price"></span>
        </div>
        <p class="modal-desc" id="modal-desc"></p>
        <div class="qty-row">
          <label for="modal-qty">Qty:</label>
          <div class="qty-control">
            <button class="qty-btn" id="qty-minus">−</button>
            <input type="number" id="modal-qty" value="1" min="1" max="10" />
            <button class="qty-btn" id="qty-plus">+</button>
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn btn-gold flex-1" id="modal-add-cart">Add to Cart</button>
          <a href="#" class="btn btn-outline-gold flex-1" id="modal-view-full">View Full Details</a>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ── CART TOAST ── -->
<div class="cart-toast" id="cart-toast" role="status">
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
  <span>Item added to your cart!</span>
</div>
