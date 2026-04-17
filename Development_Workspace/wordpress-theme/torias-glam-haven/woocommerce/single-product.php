<?php
/**
 * TORIAS GLAM HAVEN – single-product.php (WooCommerce)
 * Individual product detail page.
 */
defined('ABSPATH') || exit;
get_header();

while (have_posts()): the_post();
  global $product;
  $product   = wc_get_product(get_the_ID());
  $img_id    = $product->get_image_id();
  $img_url   = $img_id ? wp_get_attachment_image_url($img_id, 'product-hero') : wc_placeholder_img_src();
  $gallery   = $product->get_gallery_image_ids();
  $pcats     = get_the_terms(get_the_ID(), 'product_cat');
  $cat       = (!empty($pcats) && !is_wp_error($pcats)) ? $pcats[0] : null;
  $cat_name  = $cat ? $cat->name : 'Jewelry';
  $rating    = $product->get_average_rating();
  $stars     = tgh_rating_to_stars($rating) ?: '★★★★★';
  $rev_count = $product->get_review_count();
  $price_val = $product->get_price();
  $price     = 'KES ' . number_format($price_val, 0);
  $old_price = $product->is_on_sale() ? 'KES ' . number_format($product->get_regular_price(), 0) : '';
  $desc      = $product->get_description();
  $short_desc= $product->get_short_description();
  $attrs     = $product->get_attributes();
  $shop_url  = get_permalink(wc_get_page_id('shop'));
?>

<!-- PAGE HEADER -->
<div class="page-header page-header--bg page-header--shop">
  <div class="container">
    <span class="page-header-ornament">✦ TORIAS GLAM HAVEN ✦</span>
    <h1><?php echo esc_html($cat_name); ?></h1>
  </div>
</div>

<!-- BREADCRUMB -->
<div class="breadcrumb">
  <div class="container">
    <ol class="breadcrumb-list" itemscope itemtype="https://schema.org/BreadcrumbList">
      <li><a href="<?php echo esc_url(home_url('/')); ?>">Home</a></li>
      <li><a href="<?php echo esc_url($shop_url); ?>">Shop</a></li>
      <?php if ($cat): ?>
      <li><a href="<?php echo esc_url(get_term_link($cat)); ?>"><?php echo esc_html($cat->name); ?></a></li>
      <?php endif; ?>
      <li><span><?php the_title(); ?></span></li>
    </ol>
  </div>
</div>

<main id="main-content">
  <div class="container">

    <!-- Product Detail Layout -->
    <div class="product-detail-layout">

      <!-- Gallery -->
      <div class="product-gallery">
        <div class="product-main-img">
          <img src="<?php echo esc_url($img_url); ?>" alt="<?php echo esc_attr(get_the_title()); ?>" id="product-main-image" />
          <?php if ($product->is_on_sale()): ?>
          <div class="product-badge-wrap"><span class="badge badge--sale">Sale</span></div>
          <?php elseif ($product->is_featured()): ?>
          <div class="product-badge-wrap"><span class="badge badge--bestseller">Bestseller</span></div>
          <?php endif; ?>
        </div>
        <?php if (!empty($gallery)): ?>
        <div class="product-thumbnails">
          <button class="product-thumb active" data-img="<?php echo esc_url($img_url); ?>">
            <img src="<?php echo esc_url($img_url); ?>" alt="Main" loading="lazy" />
          </button>
          <?php foreach ($gallery as $img_gal_id):
            $gal_url = wp_get_attachment_image_url($img_gal_id, 'product-card');
          ?>
          <button class="product-thumb" data-img="<?php echo esc_url($gal_url); ?>">
            <img src="<?php echo esc_url($gal_url); ?>" alt="Gallery" loading="lazy" />
          </button>
          <?php endforeach; ?>
        </div>
        <?php endif; ?>
      </div>

      <!-- Product Info -->
      <div class="product-info-panel">
        <p class="product-category product-detail-cat"><?php echo esc_html($cat_name); ?></p>
        <h1 class="product-detail-title"><?php the_title(); ?></h1>

        <div class="product-rating product-detail-rating">
          <span class="stars"><?php echo esc_html($stars); ?></span>
          <span class="rating-count">(<?php echo esc_html($rev_count); ?> reviews)</span>
        </div>

        <div class="product-detail-price">
          <span class="product-price"><?php echo esc_html($price); ?></span>
          <?php if ($old_price): ?>
          <span class="product-price-old"><?php echo esc_html($old_price); ?></span>
          <?php endif; ?>
        </div>

        <?php if ($short_desc): ?>
        <div class="product-detail-desc"><?php echo wp_kses_post($short_desc); ?></div>
        <?php endif; ?>

        <!-- Trust Badges -->
        <div class="product-trust-badges">
          <span>✦ Tarnish-Free</span>
          <span>✦ Hypoallergenic</span>
          <span>✦ 18K Gold Plated</span>
        </div>

        <!-- Add to Cart Form -->
        <?php woocommerce_template_single_add_to_cart(); ?>

        <!-- Custom Add-to-cart Design Override -->
        <div class="product-detail-actions">
          <div class="qty-control">
            <button class="qty-btn" id="qty-minus-detail">−</button>
            <input type="number" id="product-qty" value="1" min="1" max="10" aria-label="Quantity" />
            <button class="qty-btn" id="qty-plus-detail">+</button>
          </div>
          <button class="btn btn-gold flex-1 btn-detail-cart"
                  data-product="<?php echo esc_attr($product->get_id()); ?>"
                  data-nonce="<?php echo esc_attr(wp_create_nonce('tgh_nonce')); ?>">
            Add to Cart
          </button>
          <button class="btn btn-outline-gold wishlist-toggle" data-product="<?php echo esc_attr($product->get_id()); ?>" aria-label="Add to wishlist">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>

        <!-- WhatsApp Order -->
        <a href="https://wa.me/254707353520?text=Hello%20Torias%20Glam%20Haven!%20I%27d%20like%20to%20order%3A%20<?php echo urlencode(get_the_title()); ?>%20-%20<?php echo urlencode($price); ?>"
           target="_blank" rel="noopener" class="btn btn-outline whatsapp-order-btn" style="margin-top:12px;width:100%;justify-content:center;">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" style="color:#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.974 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Order via WhatsApp
        </a>

        <!-- Shipping / Return note -->
        <div class="product-meta-strip">
          <span>🚚 Fast delivery across Kenya</span>
          <span>↩ 7-day returns</span>
          <span>🔒 Secure checkout</span>
        </div>
      </div>
    </div>

    <!-- Product Tabs: Description + Reviews -->
    <div class="product-tabs">
      <div class="product-tabs-nav">
        <button class="product-tab-btn active" data-tab="description">Description</button>
        <button class="product-tab-btn" data-tab="reviews">Reviews (<?php echo esc_html($rev_count); ?>)</button>
      </div>
      <div class="product-tab-content active" id="tab-description">
        <?php if ($desc): ?>
          <?php echo wp_kses_post($desc); ?>
        <?php elseif ($short_desc): ?>
          <?php echo wp_kses_post($short_desc); ?>
        <?php else: ?>
          <p>Premium quality jewelry crafted for elegance and longevity. Tarnish-free and hypoallergenic.</p>
        <?php endif; ?>
      </div>
      <div class="product-tab-content" id="tab-reviews">
        <?php comments_template(); ?>
      </div>
    </div>

    <!-- Related Products -->
    <?php
    $related_ids = wc_get_related_products($product->get_id(), 4);
    if (!empty($related_ids)):
      $related_products = array_map('wc_get_product', $related_ids);
    ?>
    <section class="related-products section" aria-label="Related products">
      <div class="section-header text-center">
        <p class="overline">You May Also Like</p>
        <h2 class="section-title">Related <em>Pieces</em></h2>
        <div class="title-divider"><span>✦</span></div>
      </div>
      <div class="products-grid">
        <?php foreach ($related_products as $rel):
          if (!$rel) continue;
          $rel_img_id  = $rel->get_image_id();
          $rel_img_url = $rel_img_id ? wp_get_attachment_image_url($rel_img_id, 'product-card') : wc_placeholder_img_src();
          $rel_cats    = get_the_terms($rel->get_id(), 'product_cat');
          $rel_cat     = (!empty($rel_cats) && !is_wp_error($rel_cats)) ? $rel_cats[0]->name : '';
          $rel_price   = 'KES ' . number_format($rel->get_price(), 0);
          $rel_stars   = tgh_rating_to_stars($rel->get_average_rating()) ?: '★★★★★';
          $rel_rev     = $rel->get_review_count();
        ?>
        <article class="product-card">
          <div class="product-img-wrap">
            <img src="<?php echo esc_url($rel_img_url); ?>" alt="<?php echo esc_attr($rel->get_name()); ?>" loading="lazy" />
            <div class="product-overlay">
              <button class="overlay-btn quick-view-btn" data-product="<?php echo esc_attr($rel->get_id()); ?>">Quick View</button>
            </div>
          </div>
          <div class="product-info">
            <p class="product-category"><?php echo esc_html($rel_cat); ?></p>
            <h3 class="product-name"><a href="<?php echo esc_url(get_permalink($rel->get_id())); ?>"><?php echo esc_html($rel->get_name()); ?></a></h3>
            <div class="product-rating">
              <span class="stars"><?php echo esc_html($rel_stars); ?></span>
              <span class="rating-count">(<?php echo esc_html($rel_rev); ?>)</span>
            </div>
            <div class="product-price-row"><span class="product-price"><?php echo esc_html($rel_price); ?></span></div>
            <button class="btn btn-gold btn-add-cart full-width" data-product="<?php echo esc_attr($rel->get_id()); ?>">Add to Cart</button>
          </div>
        </article>
        <?php endforeach; ?>
      </div>
    </section>
    <?php endif; ?>

  </div>
</main>

<?php endwhile; ?>
<?php get_footer(); ?>
