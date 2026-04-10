<?php
/**
 * TORIAS GLAM HAVEN – front-page.php
 * Homepage: hero slider, trust strip, categories, featured products, testimonials, etc.
 */
defined('ABSPATH') || exit;
get_header();

// Get featured products safely
$featured  = array();
$shop_url  = tgh_shop_url();
if (class_exists('WooCommerce') && function_exists('wc_get_products')) {
    $featured = wc_get_products(array('limit' => 4, 'status' => 'publish', 'orderby' => 'date', 'order' => 'DESC'));
}

// Get all product categories
$cats = get_terms(array('taxonomy' => 'product_cat', 'hide_empty' => true, 'parent' => 0));
if (!$cats || is_wp_error($cats)) { $cats = array(); }

?>

<main id="main-content">

  <!-- ── HERO SECTION ── -->
  <section class="hero" id="hero" aria-label="Luxury Hero Gallery">
    <div class="hero-bg">
      <div class="hero-slide active">
        <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/img/hero-pendant.jpg" alt="Luxury gold pendant jewelry" class="hero-img" />
      </div>
      <div class="hero-slide">
        <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/img/hero-emerald.jpg" alt="Exquisite emerald jewelry set" class="hero-img" />
      </div>
      <div class="hero-slide">
        <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/img/blue-pendant.jpg" alt="Timeless blue stone necklace" class="hero-img" />
      </div>
      <div class="hero-overlay"></div>
    </div>
    <div class="container hero-container">
      <div class="hero-content">
        <p class="hero-subtitle animate-fade">✦ Timeless Collection <?php echo date('Y'); ?> ✦</p>
        <h1 class="hero-title animate-up">
          Elegance
          <em>Redefined</em>
        </h1>
        <p class="hero-subline animate-up">Discover handcrafted luxury — bracelets, necklaces, earrings &amp; sets designed for those who wear confidence.</p>
        <div class="hero-divider"></div>
        <div class="hero-actions animate-up">
          <a href="<?php echo esc_url($shop_url); ?>" class="btn btn-gold">Shop the Collection</a>
          <a href="<?php echo esc_url(get_page_link(get_page_by_path('about'))); ?>" class="btn btn-outline">Our Story</a>
        </div>
        <div class="hero-stats animate-up">
          <div class="hero-stat">
            <span class="stat-number">500+</span>
            <span class="stat-label">Pieces Crafted</span>
          </div>
          <div class="hero-stat">
            <span class="stat-number">2K+</span>
            <span class="stat-label">Happy Clients</span>
          </div>
          <div class="hero-stat">
            <span class="stat-number">100%</span>
            <span class="stat-label">Authentic</span>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-scroll-indicator">
      <span>Scroll</span>
      <div class="scroll-line"></div>
    </div>
  </section>

  <!-- ── TRUST STRIP ── -->
  <section class="trust-strip" aria-label="Why shop with us">
    <div class="container">
      <div class="trust-strip-inner">
        <div class="trust-strip-item">
          <div class="trust-strip-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div class="trust-strip-text">
            <strong>Authenticity Guaranteed</strong>
            <span>Certified genuine jewelry</span>
          </div>
        </div>
        <div class="trust-strip-divider"></div>
        <div class="trust-strip-item">
          <div class="trust-strip-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
          </div>
          <div class="trust-strip-text">
            <strong>Easy Exchange</strong>
            <span>Hassle-free 30-day returns</span>
          </div>
        </div>
        <div class="trust-strip-divider"></div>
        <div class="trust-strip-item">
          <div class="trust-strip-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          </div>
          <div class="trust-strip-text">
            <strong>Secure Delivery</strong>
            <span>Nationwide &amp; Global shipping</span>
          </div>
        </div>
        <div class="trust-strip-divider"></div>
        <div class="trust-strip-item">
          <div class="trust-strip-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <div class="trust-strip-text">
            <strong>24/7 Support</strong>
            <span>Always here for you</span>
          </div>
        </div>
        <div class="trust-strip-divider"></div>
        <div class="trust-strip-item">
          <div class="trust-strip-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </div>
          <div class="trust-strip-text">
            <strong>Secure Payment</strong>
            <span>SSL encrypted checkout</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── CATEGORY PILLS ── -->
  <section class="cat-quick section-sm" aria-label="Quick category links">
    <div class="container">
      <div class="cat-pills-row">
        <?php if (!empty($cats) && !is_wp_error($cats)):
          foreach ($cats as $cat):
            if ($cat->slug === 'uncategorized') continue;
            $thumb_id  = get_term_meta($cat->term_id, 'thumbnail_id', true);
            $thumb_url = $thumb_id ? wp_get_attachment_image_url($thumb_id, 'product-card')
                                   : 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&h=200&q=75&auto=format&fit=crop';
          ?>
          <a href="<?php echo esc_url(get_term_link($cat)); ?>" class="cat-pill" id="pill-<?php echo esc_attr($cat->slug); ?>">
            <div class="cat-pill-img">
              <img src="<?php echo esc_url($thumb_url); ?>" alt="<?php echo esc_attr($cat->name); ?>" loading="lazy" />
            </div>
            <span><?php echo esc_html($cat->name); ?></span>
          </a>
        <?php endforeach; endif; ?>
      </div>
    </div>
  </section>

  <!-- ── SHOP BY CATEGORY ── -->
  <section class="products section" id="jewelry-list" aria-label="Featured jewelry collections">
    <div class="container">
      <div class="section-header text-center">
        <p class="overline">Curated For You</p>
        <h2 class="section-title">Shop By Category</h2>
        <div class="title-divider"><span>✦</span></div>
      </div>
      <div class="categories-grid">
        <?php if (!empty($cats) && !is_wp_error($cats)):
          $cat_count = 0;
          foreach ($cats as $cat):
            if ($cat->slug === 'uncategorized') continue;
            $thumb_id  = get_term_meta($cat->term_id, 'thumbnail_id', true);
            $thumb_url = $thumb_id ? wp_get_attachment_image_url($thumb_id, 'product-hero')
                                   : 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80&auto=format&fit=crop';
            $is_large  = ($cat_count === 1); // Make 2nd card large (Necklaces-style)
            $count_label = $cat->count . ' Piece' . ($cat->count !== 1 ? 's' : '');
            $cat_count++;
          ?>
          <a href="<?php echo esc_url(get_term_link($cat)); ?>"
             class="category-card <?php echo $is_large ? 'category-card--large' : ''; ?>"
             id="cat-<?php echo esc_attr($cat->slug); ?>">
            <div class="category-img-wrap">
              <img src="<?php echo esc_url($thumb_url); ?>" alt="<?php echo esc_attr($cat->name); ?> collection" loading="lazy" />
            </div>
            <div class="category-info">
              <h3><?php echo esc_html($cat->name); ?></h3>
              <span class="category-count"><?php echo esc_html($count_label); ?></span>
            </div>
          </a>
        <?php endforeach; endif; ?>
      </div>
    </div>
  </section>

  <!-- ── FEATURED PRODUCTS ── -->
  <section class="featured-products section section--blush" aria-label="Featured products">
    <div class="container">
      <div class="section-header-zahabiya">
        <div class="title-wrap">
          <h2 class="animate-up">Find Your Jewelry</h2>
          <p class="section-subtitle animate-up">From price to occasion, find the jewelry that suits you.</p>
        </div>
        <a href="<?php echo esc_url($shop_url); ?>" class="view-all-btn animate-up">View All Collections</a>
      </div>
      <div class="products-grid" id="featured-products-grid">
        <?php foreach ($featured as $product):
          $img_id  = $product->get_image_id();
          $img_url = $img_id ? wp_get_attachment_image_url($img_id, 'product-card') : wc_placeholder_img_src();
          $cats_p  = get_the_terms($product->get_id(), 'product_cat');
          $cat_name = (!empty($cats_p) && !is_wp_error($cats_p)) ? $cats_p[0]->name : '';
          $rating  = $product->get_average_rating();
          $stars   = tgh_rating_to_stars($rating) ?: '★★★★★';
          $rev     = $product->get_review_count();
          $price   = 'KES ' . number_format($product->get_price(), 0);
        ?>
        <article class="product-card" data-product-id="<?php echo esc_attr($product->get_id()); ?>">
          <div class="product-img-wrap">
            <img src="<?php echo esc_url($img_url); ?>" alt="<?php echo esc_attr($product->get_name()); ?>" loading="lazy" />
            <div class="product-badges">
              <?php if ($product->is_featured()): ?><span class="badge badge--bestseller">Bestseller</span><?php endif; ?>
              <?php if ($product->is_on_sale()): ?><span class="badge badge--sale">Sale</span><?php endif; ?>
            </div>
            <div class="product-overlay">
              <button class="overlay-btn quick-view-btn" data-product="<?php echo esc_attr($product->get_id()); ?>" aria-label="Quick view">Quick View</button>
              <button class="overlay-btn wishlist-toggle" data-product="<?php echo esc_attr($product->get_id()); ?>" aria-label="Add to wishlist">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
            </div>
          </div>
          <div class="product-info">
            <p class="product-category"><?php echo esc_html($cat_name); ?></p>
            <h3 class="product-name"><a href="<?php echo esc_url(get_permalink($product->get_id())); ?>"><?php echo esc_html($product->get_name()); ?></a></h3>
            <div class="product-rating">
              <span class="stars"><?php echo esc_html($stars); ?></span>
              <span class="rating-count">(<?php echo esc_html($rev); ?>)</span>
            </div>
            <div class="product-price-row">
              <span class="product-price"><?php echo esc_html($price); ?></span>
              <?php if ($product->is_on_sale()): ?>
              <span class="product-price-old">KES <?php echo esc_html(number_format($product->get_regular_price(), 0)); ?></span>
              <?php endif; ?>
            </div>
            <button class="btn btn-gold btn-add-cart full-width"
                    data-product="<?php echo esc_attr($product->get_id()); ?>"
                    data-nonce="<?php echo esc_attr(wp_create_nonce('tgh_nonce')); ?>">Add to Cart</button>
          </div>
        </article>
        <?php endforeach; ?>
      </div>
      <div class="text-center mt-lg">
        <a href="<?php echo esc_url($shop_url); ?>" class="btn btn-outline-gold">View All Products</a>
      </div>
    </div>
  </section>

  <!-- ── BRAND STORY STRIP ── -->
  <section class="brand-strip section" aria-label="Brand introduction">
    <div class="container">
      <div class="brand-strip-inner">
        <div class="brand-strip-text">
          <p class="overline">Our Story</p>
          <h2 class="section-title">Crafted With<br /><em>Passion &amp; Purpose</em></h2>
          <p class="brand-desc">Each piece from TORIAS GLAM HAVEN is a blend of artistry and quality — made with hypoallergenic, tarnish-resistant materials that last. Whether you're looking to elevate your everyday look or mark a special moment with something truly memorable, our jewelry helps you express your story with grace and glamour. Designed with love in Kenya.</p>
          <a href="<?php echo esc_url(get_page_link(get_page_by_path('about'))); ?>" class="btn btn-gold mt-md">Discover Our Story</a>
        </div>
        <div class="brand-strip-img">
          <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/img/hero-pendant.jpg" alt="Luxury jewelry craftsmanship" loading="lazy" />
          <div class="brand-strip-img-accent"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── WHY CHOOSE US ── -->
  <section class="features section section--blush" aria-label="Why choose TORIAS GLAM HAVEN">
    <div class="container">
      <div class="section-header text-center">
        <p class="overline">The Glam Difference</p>
        <h2 class="section-title">Why Choose Us</h2>
        <div class="title-divider"><span>✦</span></div>
      </div>
      <div class="features-grid">
        <div class="feature-item">
          <div class="feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
          <h3>Premium Quality</h3>
          <p>Elegant and timeless handmade designs made with hypoallergenic, tarnish-resistant premium metals.</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          </div>
          <h3>Fast Delivery</h3>
          <p>Enjoy quick, secure shipping across Kenya and beyond. Rates based on your location — or choose pickup at no extra cost.</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h3>Satisfaction Guaranteed</h3>
          <p>We're committed to your happiness — return or exchange within 7 days if you're not completely in love.</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </div>
          <h3>Elegant Gift Packaging</h3>
          <p>Unbox sophistication — each jewel arrives in elegant gift packaging making it ideal for gifting.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ── TESTIMONIALS ── -->
  <section class="testimonials section" aria-label="Customer testimonials">
    <div class="container">
      <div class="section-header text-center">
        <p class="overline">Happy Customers</p>
        <h2 class="section-title">Words From Our Community</h2>
        <div class="title-divider"><span>✦</span></div>
      </div>
      <div class="testimonials-slider" id="testimonials-slider">
        <div class="testimonials-track" id="testimonials-track">
          <div class="testimonial-card">
            <div class="testimonial-stars">★★★★★</div>
            <p class="testimonial-text">"Absolutely stunning pieces! I bought a gold set for my sister's wedding and it made all the difference. Toria's Glam Haven is my go-to for timeless elegance."</p>
            <div class="testimonial-author">
              <div class="testimonial-avatar">GM</div>
              <div><strong>Grace M.</strong><span>Nairobi, Kenya</span></div>
            </div>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-stars">★★★★★</div>
            <p class="testimonial-text">"Quick delivery, luxurious packaging, and the jewelry? Breathtaking! I've never felt more confident wearing accessories."</p>
            <div class="testimonial-author">
              <div class="testimonial-avatar">LK</div>
              <div><strong>Lilian K.</strong><span>Nakuru, Kenya</span></div>
            </div>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-stars">★★★★★</div>
            <p class="testimonial-text">"Customer service was top-notch. They helped me select the perfect bracelet for a gift—and she loved it!"</p>
            <div class="testimonial-author">
              <div class="testimonial-avatar">SW</div>
              <div><strong>Sheila W.</strong><span>Kisumu, Kenya</span></div>
            </div>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-stars">★★★★★</div>
            <p class="testimonial-text">"The necklace I ordered exceeded expectations. It looks and feels luxurious—worth every coin!"</p>
            <div class="testimonial-author">
              <div class="testimonial-avatar">AN</div>
              <div><strong>Achieng N.</strong><span>Eldoret, Kenya</span></div>
            </div>
          </div>
        </div>
        <div class="slider-controls">
          <button class="slider-btn prev-btn" id="testimonial-prev" aria-label="Previous testimonial">‹</button>
          <div class="slider-dots" id="slider-dots">
            <button class="dot active" aria-label="Testimonial 1"></button>
            <button class="dot" aria-label="Testimonial 2"></button>
            <button class="dot" aria-label="Testimonial 3"></button>
            <button class="dot" aria-label="Testimonial 4"></button>
          </div>
          <button class="slider-btn next-btn" id="testimonial-next" aria-label="Next testimonial">›</button>
        </div>
      </div>
    </div>
  </section>

  <!-- ── NEWSLETTER ── -->
  <section class="newsletter section" aria-label="Newsletter signup">
    <div class="container">
      <div class="newsletter-inner">
        <div class="newsletter-text">
          <p class="overline">Exclusive Access</p>
          <h2>Join The Glam Circle</h2>
          <p>Subscribe for early access to new collections, exclusive discounts, and insider style tips delivered to your inbox.</p>
        </div>
        <form class="newsletter-form" id="newsletter-form" novalidate>
          <div class="newsletter-input-group">
            <input type="email" id="newsletter-email" name="email" placeholder="Your email address" aria-label="Email address" required />
            <button type="submit" class="btn btn-gold" id="newsletter-submit">Subscribe</button>
          </div>
          <p class="newsletter-note">✓ No spam. Unsubscribe anytime. We respect your privacy.</p>
          <div class="newsletter-success" id="newsletter-success" aria-live="polite" hidden>
            <span>✦</span> Welcome to the Glam Circle! Check your inbox for a welcome gift.
          </div>
        </form>
      </div>
    </div>
  </section>

</main>

<?php get_footer(); ?>
