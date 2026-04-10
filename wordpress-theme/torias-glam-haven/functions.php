<?php
/**
 * TORIAS GLAM HAVEN – functions.php
 * Safe, WooCommerce-guarded, PHP 7.0+ compatible.
 */

defined('ABSPATH') || exit;

// ── THEME SETUP ────────────────────────────────────────────────────────────
function tgh_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form','comment-form','comment-list','gallery','caption','style','script'));
    add_theme_support('custom-logo');
    add_theme_support('automatic-feed-links');

    // WooCommerce Support (only add if WC is active)
    if (class_exists('WooCommerce')) {
        add_theme_support('woocommerce');
        add_theme_support('wc-product-gallery-zoom');
        add_theme_support('wc-product-gallery-lightbox');
        add_theme_support('wc-product-gallery-slider');
    }

    // Navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Navigation', 'torias-glam-haven'),
        'footer'  => __('Footer Navigation',  'torias-glam-haven'),
    ));

    // Image sizes
    add_image_size('product-card', 600, 700, true);
    add_image_size('product-hero', 900, 1000, true);
}
add_action('after_setup_theme', 'tgh_setup');

// ── ENQUEUE STYLES ─────────────────────────────────────────────────────────
function tgh_enqueue_styles() {
    $ver = '2.0';
    $uri = get_template_directory_uri();

    // Google Fonts
    wp_enqueue_style(
        'tgh-fonts',
        'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap',
        array(), null
    );

    // Core stylesheets
    wp_enqueue_style('tgh-global',  $uri . '/assets/css/global.css',       array('tgh-fonts'), $ver);
    wp_enqueue_style('tgh-pages',   $uri . '/assets/css/pages.css',        array('tgh-global'), $ver);
    wp_enqueue_style('tgh-home',    $uri . '/assets/css/home.css',         array('tgh-global'), $ver);
    wp_enqueue_style('tgh-about',   $uri . '/assets/css/about.css',        array('tgh-global'), $ver);
    wp_enqueue_style('tgh-contact', $uri . '/assets/css/contact.css',      array('tgh-global'), $ver);
    wp_enqueue_style('tgh-woo',     $uri . '/assets/css/woocommerce.css',  array('tgh-global'), $ver);
}
add_action('wp_enqueue_scripts', 'tgh_enqueue_styles');

// ── ENQUEUE SCRIPTS ────────────────────────────────────────────────────────
function tgh_enqueue_scripts() {
    $ver = '2.0';
    $uri = get_template_directory_uri();

    // Main site JS (runs on all pages)
    wp_enqueue_script('tgh-main', $uri . '/assets/js/main.js', array(), $ver, true);

    // Homepage JS
    if (is_front_page()) {
        wp_enqueue_script('tgh-home', $uri . '/assets/js/home.js', array('tgh-main'), $ver, true);
    }

    // Shop/archive JS — only when WooCommerce is active
    if (class_exists('WooCommerce') && (is_shop() || is_product_category() || is_product_tag())) {
        wp_enqueue_script('tgh-shop', $uri . '/assets/js/shop.js', array('tgh-main'), $ver, true);

        // Pass products to JS
        $products_data = tgh_get_products_for_js();
        wp_localize_script('tgh-main', 'productsData', $products_data);
        wp_localize_script('tgh-main', 'tghData', array(
            'shopUrl'  => get_permalink(wc_get_page_id('shop')),
            'ajaxUrl'  => admin_url('admin-ajax.php'),
            'nonce'    => wp_create_nonce('tgh_nonce'),
            'currency' => 'KES',
        ));
    }

    // Enqueue WooCommerce cart fragments if WC is active
    if (class_exists('WooCommerce')) {
        wp_enqueue_script('wc-cart-fragments');
    }
}
add_action('wp_enqueue_scripts', 'tgh_enqueue_scripts');

// ── PRODUCT DATA FOR JS ────────────────────────────────────────────────────
function tgh_get_products_for_js() {
    if (!class_exists('WooCommerce')) {
        return array();
    }

    $args = array(
        'post_type'      => 'product',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
    );
    $query = new WP_Query($args);
    $data  = array();

    while ($query->have_posts()) {
        $query->the_post();
        $product = wc_get_product(get_the_ID());
        if (!$product) continue;

        $cats     = get_the_terms(get_the_ID(), 'product_cat');
        $cat_name = (!empty($cats) && !is_wp_error($cats)) ? $cats[0]->name : '';
        $img_id   = $product->get_image_id();
        $img_url  = $img_id ? wp_get_attachment_image_url($img_id, 'product-card') : wc_placeholder_img_src();

        $rating    = (float) $product->get_average_rating();
        $stars     = tgh_rating_to_stars($rating);
        $rev_count = (int) $product->get_review_count();

        $price     = 'KES ' . number_format((float) $product->get_price(), 0);
        $old_price = '';
        if ($product->is_on_sale()) {
            $old_price = 'KES ' . number_format((float) $product->get_regular_price(), 0);
        }

        $data[$product->get_id()] = array(
            'id'          => $product->get_id(),
            'name'        => get_the_title(),
            'category'    => $cat_name,
            'price'       => $price,
            'oldPrice'    => $old_price,
            'stars'       => $stars ? $stars : '★★★★★',
            'ratingCount' => '(' . $rev_count . ')',
            'img'         => $img_url,
            'link'        => get_permalink(),
            'desc'        => wp_strip_all_tags($product->get_short_description()
                             ? $product->get_short_description()
                             : $product->get_description()),
        );
    }
    wp_reset_postdata();
    return $data;
}

// ── RATING TO STARS ────────────────────────────────────────────────────────
function tgh_rating_to_stars($rating) {
    $full  = (int) floor($rating);
    $empty = 5 - $full;
    return str_repeat('★', $full) . str_repeat('☆', $empty);
}

// ── CART HELPERS ───────────────────────────────────────────────────────────
function tgh_cart_count() {
    if (class_exists('WooCommerce') && WC()->cart) {
        return (int) WC()->cart->get_cart_contents_count();
    }
    return 0;
}

function tgh_cart_url() {
    if (class_exists('WooCommerce') && function_exists('wc_get_cart_url')) {
        return wc_get_cart_url();
    }
    return home_url('/cart/');
}

function tgh_shop_url() {
    if (class_exists('WooCommerce') && function_exists('wc_get_page_id')) {
        $page_id = wc_get_page_id('shop');
        if ($page_id > 0) return get_permalink($page_id);
    }
    return home_url('/shop/');
}

// ── AJAX: ADD TO CART ──────────────────────────────────────────────────────
add_action('wp_ajax_tgh_add_to_cart',        'tgh_ajax_add_to_cart');
add_action('wp_ajax_nopriv_tgh_add_to_cart', 'tgh_ajax_add_to_cart');

function tgh_ajax_add_to_cart() {
    if (!class_exists('WooCommerce')) {
        wp_send_json_error(array('message' => 'WooCommerce not active.'));
    }
    check_ajax_referer('tgh_nonce', 'nonce');
    $product_id = absint(isset($_POST['product_id']) ? $_POST['product_id'] : 0);
    $quantity   = absint(isset($_POST['quantity'])   ? $_POST['quantity']   : 1);
    if (!$product_id) {
        wp_send_json_error();
    }
    $added = WC()->cart->add_to_cart($product_id, $quantity);
    if ($added) {
        wp_send_json_success(array('count' => WC()->cart->get_cart_contents_count()));
    } else {
        wp_send_json_error(array('message' => 'Could not add to cart.'));
    }
}

// ── BODY CLASS ─────────────────────────────────────────────────────────────
add_filter('body_class', 'tgh_body_classes');
function tgh_body_classes($classes) {
    if (is_front_page()) {
        $classes[] = 'is-home';
    }
    if (class_exists('WooCommerce') && function_exists('is_shop') && is_shop()) {
        $classes[] = 'is-shop';
    }
    return $classes;
}

// ── EXCERPT LENGTH ─────────────────────────────────────────────────────────
add_filter('excerpt_length', 'tgh_excerpt_length', 999);
function tgh_excerpt_length() {
    return 25;
}

// ── WOOCOMMERCE: REMOVE DEFAULT BREADCRUMB ─────────────────────────────────
add_action('init', 'tgh_remove_woo_defaults');
function tgh_remove_woo_defaults() {
    if (!class_exists('WooCommerce')) return;
    remove_action('woocommerce_before_main_content', 'woocommerce_breadcrumb', 20);
}

// ── WOOCOMMERCE: CURRENCY ──────────────────────────────────────────────────
add_filter('woocommerce_currency',        'tgh_currency');
add_filter('woocommerce_currency_symbol', 'tgh_currency_symbol', 10, 2);
add_filter('woocommerce_price_format',    'tgh_price_format');

function tgh_currency($currency)              { return 'KES'; }
function tgh_currency_symbol($symbol, $cur)   { return 'KES '; }
function tgh_price_format($format)            { return '%2$s%1$s'; }

// ── WOOCOMMERCE: PRODUCTS PER PAGE ─────────────────────────────────────────
add_filter('loop_shop_per_page', 'tgh_products_per_page', 20);
function tgh_products_per_page() { return 24; }

// ── WOOCOMMERCE: REMOVE DEFAULT STYLES ─────────────────────────────────────
add_filter('woocommerce_enqueue_styles', 'tgh_woo_styles');
function tgh_woo_styles($styles) {
    if (isset($styles['woocommerce-layout']))      unset($styles['woocommerce-layout']);
    if (isset($styles['woocommerce-smallscreen'])) unset($styles['woocommerce-smallscreen']);
    return $styles;
}

// ── WIDGET AREAS ───────────────────────────────────────────────────────────
add_action('widgets_init', 'tgh_widgets_init');
function tgh_widgets_init() {
    register_sidebar(array(
        'name'          => 'Shop Sidebar',
        'id'            => 'shop-sidebar',
        'before_widget' => '<div class="filter-group">',
        'after_widget'  => '</div>',
        'before_title'  => '<div class="filter-group-title">',
        'after_title'   => '</div>',
    ));
}
