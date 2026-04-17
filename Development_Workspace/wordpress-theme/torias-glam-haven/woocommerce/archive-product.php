<?php
/**
 * TORIAS GLAM HAVEN – woocommerce/archive-product.php
 * Custom Shop page with sidebar filters — replaces default WooCommerce shop.
 */
defined('ABSPATH') || exit;
get_header();

$shop_url  = get_permalink(wc_get_page_id('shop'));
$all_cats  = get_terms(['taxonomy' => 'product_cat', 'hide_empty' => true, 'parent' => 0]);
$cur_cat   = is_product_category() ? get_queried_object() : null;
?>

<!-- ── PAGE HEADER ── -->
<div class="page-header page-header--bg page-header--shop">
  <div class="container">
    <span class="page-header-ornament">✦ TORIAS GLAM HAVEN ✦</span>
    <h1><?php echo $cur_cat ? esc_html($cur_cat->name) : 'Our Collection'; ?></h1>
    <p class="muted-subline">Discover luxury jewelry crafted for every occasion</p>
  </div>
</div>

<!-- ── BREADCRUMB ── -->
<div class="breadcrumb">
  <div class="container">
    <ol class="breadcrumb-list" itemscope itemtype="https://schema.org/BreadcrumbList">
      <li itemprop="itemListElement"><a href="<?php echo esc_url(home_url('/')); ?>" itemprop="item"><span itemprop="name">Home</span></a></li>
      <li itemprop="itemListElement">
        <?php if ($cur_cat): ?>
          <a href="<?php echo esc_url($shop_url); ?>" itemprop="item"><span itemprop="name">Shop</span></a>
        <?php else: ?>
          <span itemprop="name">Shop</span>
        <?php endif; ?>
      </li>
      <?php if ($cur_cat): ?>
      <li itemprop="itemListElement"><span itemprop="name"><?php echo esc_html($cur_cat->name); ?></span></li>
      <?php endif; ?>
    </ol>
  </div>
</div>

<main id="main-content">
  <div class="container">
    <div class="shop-layout">

      <!-- ── FILTERS SIDEBAR ── -->
      <aside class="filters-sidebar" aria-label="Product filters">
        <div class="filters-header">
          <h3>Filters</h3>
          <button class="clear-filters" id="clear-filters">Clear All</button>
        </div>

        <!-- Category Filter -->
        <div class="filter-group" id="filter-category">
          <div class="filter-group-title">Category</div>
          <ul class="filter-list">
            <li class="filter-item">
              <input type="checkbox" id="cat-all" name="category" value="all" checked />
              <label for="cat-all">
                All Jewelry
                <span class="filter-count"><?php echo esc_html(wp_count_posts('product')->publish); ?></span>
              </label>
            </li>
            <?php if (!empty($all_cats) && !is_wp_error($all_cats)):
              foreach ($all_cats as $cat):
                if ($cat->slug === 'uncategorized') continue;
                $checked = $cur_cat && $cur_cat->term_id === $cat->term_id ? 'checked' : '';
            ?>
            <li class="filter-item">
              <input type="checkbox" id="cat-filter-<?php echo esc_attr($cat->slug); ?>" name="category" value="<?php echo esc_attr($cat->slug); ?>" <?php echo $checked; ?> />
              <label for="cat-filter-<?php echo esc_attr($cat->slug); ?>">
                <?php echo esc_html($cat->name); ?>
                <span class="filter-count"><?php echo esc_html($cat->count); ?></span>
              </label>
            </li>
            <?php endforeach; endif; ?>
          </ul>
        </div>

        <!-- Price Range -->
        <div class="filter-group">
          <div class="filter-group-title">Price Range</div>
          <div class="price-range-slider">
            <input type="range" id="price-range" min="500" max="5000" value="5000" step="100" aria-label="Maximum price" />
            <div class="price-range-labels">
              <span>KES 500</span>
              <span id="price-range-value">KES 5,000</span>
            </div>
          </div>
        </div>

        <!-- Material Filter -->
        <div class="filter-group">
          <div class="filter-group-title">Material &amp; Features</div>
          <ul class="filter-list">
            <li class="filter-item">
              <input type="checkbox" id="mat-gold" name="material" value="gold plated" />
              <label for="mat-gold">18K Gold Plated</label>
            </li>
            <li class="filter-item">
              <input type="checkbox" id="mat-pearl" name="material" value="pearl" />
              <label for="mat-pearl">Freshwater Pearl</label>
            </li>
            <li class="filter-item">
              <input type="checkbox" id="mat-gem" name="material" value="gemstone" />
              <label for="mat-gem">AAA Gemstones</label>
            </li>
            <li class="filter-item">
              <input type="checkbox" id="mat-tarnish" name="material" value="tarnish-free" />
              <label for="mat-tarnish">Tarnish-Free</label>
            </li>
            <li class="filter-item">
              <input type="checkbox" id="mat-stainless" name="material" value="stainless steel" />
              <label for="mat-stainless">Stainless Steel</label>
            </li>
          </ul>
        </div>
      </aside>

      <!-- ── PRODUCT AREA ── -->
      <section aria-label="Product listings">
        <div class="active-filters" id="active-filters" aria-live="polite"></div>

        <!-- Toolbar -->
        <div class="shop-header-bar">
          <p class="shop-results-count">Loading products...</p>
          <div class="shop-sort-group">
            <label for="sort-select">Sort by:</label>
            <select class="sort-select form-control" id="sort-select" aria-label="Sort products">
              <option value="featured">Featured</option>
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
            </select>
            <div class="view-toggle">
              <button class="view-btn active" id="grid-view" aria-label="Grid view" title="Grid">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              </button>
              <button class="view-btn" id="list-view" aria-label="List view" title="List">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Products Grid (populated by shop.js from productsData) -->
        <div class="products-grid" id="shop-products-grid">
          <?php
          // Server-side fallback products (JS overrides this with filter logic)
          $args = [
            'post_type'      => 'product',
            'posts_per_page' => 24,
            'post_status'    => 'publish',
          ];
          if ($cur_cat) {
            $args['tax_query'] = [[
              'taxonomy' => 'product_cat',
              'field'    => 'term_id',
              'terms'    => $cur_cat->term_id,
            ]];
          }
          $q = new WP_Query($args);
          while ($q->have_posts()): $q->the_post();
            $product  = wc_get_product(get_the_ID());
            if (!$product) continue;
            $img_id   = $product->get_image_id();
            $img_url  = $img_id ? wp_get_attachment_image_url($img_id, 'product-card') : wc_placeholder_img_src();
            $pcats    = get_the_terms(get_the_ID(), 'product_cat');
            $cat_name = (!empty($pcats) && !is_wp_error($pcats)) ? $pcats[0]->name : '';
            $rating   = $product->get_average_rating();
            $stars    = tgh_rating_to_stars($rating) ?: '★★★★★';
            $rev      = $product->get_review_count();
            $price    = 'KES ' . number_format($product->get_price(), 0);
          ?>
          <article class="product-card">
            <div class="product-img-wrap">
              <img src="<?php echo esc_url($img_url); ?>" alt="<?php echo esc_attr($product->get_name()); ?>" loading="lazy" />
              <?php if ($product->is_featured()): ?>
              <div class="product-badges"><span class="badge badge--bestseller">Bestseller</span></div>
              <?php elseif ($product->is_on_sale()): ?>
              <div class="product-badges"><span class="badge badge--sale">Sale</span></div>
              <?php endif; ?>
              <div class="product-overlay">
                <button class="overlay-btn quick-view-btn" data-product="<?php echo esc_attr($product->get_id()); ?>" aria-label="Quick view <?php echo esc_attr($product->get_name()); ?>">Quick View</button>
                <button class="overlay-btn wishlist-toggle" data-product="<?php echo esc_attr($product->get_id()); ?>" aria-label="Add to wishlist">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
              </div>
            </div>
            <div class="product-info">
              <p class="product-category"><?php echo esc_html($cat_name); ?></p>
              <h3 class="product-name"><a href="<?php echo esc_url(get_permalink()); ?>"><?php the_title(); ?></a></h3>
              <div class="product-rating">
                <span class="stars"><?php echo esc_html($stars); ?></span>
                <span class="rating-count">(<?php echo esc_html($rev); ?>)</span>
              </div>
              <div class="product-price-row"><span class="product-price"><?php echo esc_html($price); ?></span></div>
              <button class="btn btn-gold btn-add-cart full-width" data-product="<?php echo esc_attr($product->get_id()); ?>">Add to Cart</button>
            </div>
          </article>
          <?php endwhile; wp_reset_postdata(); ?>
        </div>

        <nav class="pagination" aria-label="Page navigation" id="shop-pagination">
          <p class="pagination-info">Showing all products in our collection</p>
        </nav>
      </section>

    </div>
  </div>
</main>

<?php get_footer(); ?>
