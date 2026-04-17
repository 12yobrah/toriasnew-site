<?php
/**
 * TORIAS GLAM HAVEN – page-about.php
 * Exact port of about.html — all sections preserved 1:1.
 */
defined('ABSPATH') || exit;
get_header();
$shop_url    = tgh_shop_url();
$contact_url = get_permalink(get_page_by_path('contact'));
?>

<main id="main-content">

  <!-- ══ HERO ══ -->
  <section class="about-hero hero" aria-labelledby="hero-title">
    <div class="hero-ring" aria-hidden="true"></div>
    <div class="hero-content">
      <div class="logo-mark" aria-hidden="true">
        <span class="logo-tgh">T . G . H</span>
        <span class="logo-name">Toria's Glam Haven</span>
        <span class="logo-tagline">Elegance and style</span>
      </div>
      <p class="hero-eyebrow">Our Story</p>
      <h1 id="hero-title">Born From Frustration.<br><em>Built With Love.</em></h1>
      <p class="hero-sub">The story of why Toria's Glam Haven exists — and who it was made for.</p>
      <div class="gold-rule" aria-hidden="true"></div>
    </div>
  </section>

  <!-- ══ ORIGIN ══ -->
  <section class="about-section origin" aria-labelledby="origin-title">
    <div class="container-about">
      <div class="origin-grid">
        <div class="origin-text">
          <span class="section-label-about">How It Started</span>
          <h2 id="origin-title">Tired of Pretty Pieces That <em>Did Not Last</em></h2>
          <p class="about-paragraph">If you have ever bought a beautiful piece of jewelry, worn it twice, and watched it turn green on your wrist, this brand was made for you.</p>
          <p class="about-paragraph">That is exactly where Toria's Glam Haven began. Like most women who love jewelry, our founder Toria spent years buying pieces that promised elegance but delivered disappointment. Necklaces that faded after the first wash. Bracelets that broke before the occasion was over. Earrings that irritated your skin by noon.</p>
          <p class="about-paragraph">The market was full of pretty pieces. But quality? That was either missing, or came with a price tag that felt completely out of reach. So she stopped settling, and started building.</p>
        </div>
        <div class="origin-card-wrap">
          <div class="quote-card">
            <blockquote>"I wanted jewelry I could wear to a meeting on Monday and a wedding on Saturday, and still look just as beautiful weeks later."</blockquote>
            <p class="quote-attr"><span>Toria</span> &nbsp;|&nbsp; Founder &amp; Creative Director</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ══ THE GAP ══ -->
  <section class="about-section gap-section" aria-labelledby="gap-title">
    <div class="container-about">
      <span class="section-label-about">The Gap We Saw</span>
      <h2 id="gap-title">Nairobi's Women Deserve <em>Better</em></h2>
      <p class="about-paragraph">We looked at the market and saw the same problem everywhere. Cheap jewelry was abundant but disappointing. Luxury jewelry was beautiful but unattainable. The women in between, the ones who wanted both quality and value, were left with nothing that truly served them.</p>
      <p class="about-paragraph">That gap became our purpose.</p>
      <div class="gap-cards">
        <article class="gap-card">
          <div class="gap-num" aria-hidden="true">01</div>
          <h3>Fast Jewelry Was Everywhere</h3>
          <p class="about-paragraph">Affordable pieces that looked great in the shop but faded, broke, or irritated skin within weeks of purchase.</p>
        </article>
        <article class="gap-card">
          <div class="gap-num" aria-hidden="true">02</div>
          <h3>Luxury Felt Out of Reach</h3>
          <p class="about-paragraph">High-quality jewelry existed, but at prices that made everyday wear feel like an impossible dream for most women.</p>
        </article>
        <article class="gap-card">
          <div class="gap-num" aria-hidden="true">03</div>
          <h3>Gifting Had No Middle Ground</h3>
          <p class="about-paragraph">Finding a gift that looked luxurious, lasted long, and did not break the bank was nearly impossible. We changed that.</p>
        </article>
      </div>
    </div>
  </section>

  <!-- ══ PROMISE ══ -->
  <section class="about-section promise" aria-labelledby="promise-title">
    <div class="container-about">
      <span class="section-label-about">What We Stand For</span>
      <h2 id="promise-title">Our Promise to <em>Every Customer</em></h2>
      <p class="about-paragraph">We built Toria's Glam Haven on one obsession: pieces that stay. No tarnishing. No fading. No "I can only wear this once." Just jewelry you can reach for every day, for every milestone, for every mood, and still look just as stunning six months later.</p>
      <div class="promise-grid">
        <div class="promise-item">
          <div class="promise-icon" aria-hidden="true">✦</div>
          <div>
            <strong>Pieces That Last</strong>
            <span>Every item is crafted from tarnish-resistant, hypoallergenic materials that hold their shine through daily wear.</span>
          </div>
        </div>
        <div class="promise-item">
          <div class="promise-icon" aria-hidden="true">✦</div>
          <div>
            <strong>Jewelry for Every Moment</strong>
            <span>From everyday confidence to milestone celebrations, we have a piece for every chapter of your story.</span>
          </div>
        </div>
        <div class="promise-item">
          <div class="promise-icon" aria-hidden="true">✦</div>
          <div>
            <strong>Gifts That Mean Something</strong>
            <span>When you give jewelry that lasts, you are not just giving an accessory. You are giving a memory they will wear.</span>
          </div>
        </div>
        <div class="promise-item">
          <div class="promise-icon" aria-hidden="true">✦</div>
          <div>
            <strong>Quality Without Compromise</strong>
            <span>Rigorous quality checks on every single piece before it reaches your hands, because you deserve nothing less.</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ══ TESTIMONIALS ══ -->
  <section class="about-section testimonials" aria-labelledby="testimonials-title">
    <div class="container-about">
      <span class="section-label-about">Real Voices</span>
      <h2 id="testimonials-title">Loved by <em>Extraordinary Women</em></h2>
      <div class="testimonial-grid">
        <div class="testimonial-item">
          <p>"I've worn my TG Haven necklace every day for 4 months, even in the shower, and it still looks like it came out of the box today. Incredible quality."</p>
          <span class="testimonial-author">Sarah M. — Verified Buyer</span>
        </div>
        <div class="testimonial-item">
          <p>"Finally found jewelry that doesn't irritate my sensitive skin. The sets are my go-to for every business meeting."</p>
          <span class="testimonial-author">Faith K. — Creative Director</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ══ AUDIENCE ══ -->
  <section class="about-section audience" aria-labelledby="audience-title">
    <div class="container-about">
      <span class="section-label-about">Who We Are For</span>
      <h2 id="audience-title">For the Woman Who <em>Refuses to Compromise</em></h2>
      <p class="about-paragraph">We exist for every woman who wants to look and feel luxurious without constantly replacing what she owns.</p>
      <div class="audience-grid">
        <article class="audience-cell">
          <span class="cell-icon" role="img" aria-label="Business Suitcase">💼</span>
          <h3>The Boss Woman</h3>
          <p class="about-paragraph">Building her brand one outfit at a time. She needs her look to command a room, and her jewelry to keep up.</p>
        </article>
        <article class="audience-cell">
          <span class="cell-icon" role="img" aria-label="Glowing Star">🌟</span>
          <h3>The Young Professional</h3>
          <p class="about-paragraph">Treating herself because she has earned it. She wants pieces that feel luxurious without the guilt.</p>
        </article>
        <article class="audience-cell">
          <span class="cell-icon" role="img" aria-label="Gift Box">🎁</span>
          <h3>The Thoughtful Giver</h3>
          <p class="about-paragraph">Looking for a gift that actually means something. Something beautiful that will last long after the occasion.</p>
        </article>
        <article class="audience-cell">
          <span class="cell-icon" role="img" aria-label="Crown">👑</span>
          <h3>The Woman Who Loves to Shine</h3>
          <p class="about-paragraph">For every mood, every milestone, every reason and no reason at all. She just loves to feel extraordinary.</p>
        </article>
      </div>
    </div>
  </section>

  <!-- ══ FEATURED ITEMS (Collection preview) ══ -->
  <section class="about-section featured-items" aria-labelledby="featured-title">
    <div class="container-about">
      <span class="section-label-about">The Collection</span>
      <h2 id="featured-title">Start Your <em>Collection</em></h2>
      <div class="featured-grid">
        <?php
        $cats = get_terms(array('taxonomy' => 'product_cat', 'hide_empty' => true, 'parent' => 0));
        $imgs = array(
          get_template_directory_uri() . '/assets/img/hero-pendant.jpg',
          get_template_directory_uri() . '/assets/img/bracelet-luxe.jpg',
          get_template_directory_uri() . '/assets/img/blue-pendant.jpg',
        );
        if (!empty($cats) && !is_wp_error($cats)):
          $i = 0;
          foreach ($cats as $cat):
            if ($cat->slug === 'uncategorized') continue;
            $thumb_id  = get_term_meta($cat->term_id, 'thumbnail_id', true);
            $img_url   = $thumb_id ? wp_get_attachment_image_url($thumb_id, 'product-card') : $imgs[$i % count($imgs)];
        ?>
        <a href="<?php echo esc_url(get_term_link($cat)); ?>" class="featured-item-card" aria-label="Shop <?php echo esc_attr($cat->name); ?>">
          <div class="featured-item-img"><img src="<?php echo esc_url($img_url); ?>" alt="<?php echo esc_attr($cat->name); ?> Collection" loading="lazy"></div>
          <span><?php echo esc_html($cat->name); ?></span>
        </a>
        <?php $i++; endforeach; endif; ?>
      </div>
    </div>
  </section>

  <!-- ══ CTA ══ -->
  <section class="about-cta-section" aria-labelledby="cta-title">
    <div class="container-about">
      <div class="cta-divider" aria-hidden="true">
        <div class="divider-line"></div>
        <span class="divider-star">✦</span>
        <div class="divider-line"></div>
      </div>
      <h2 id="cta-title">Ready to Find Your <em>Perfect Piece?</em></h2>
      <p class="about-paragraph">Browse our full collection of lasting, luxurious jewelry, each piece crafted to make you feel extraordinary.</p>
      <div class="btn-group">
        <a href="<?php echo esc_url($shop_url); ?>" class="btn-about btn-filled-about">Shop the Collection</a>
        <a href="<?php echo esc_url($contact_url ? $contact_url : home_url('/contact/')); ?>" class="btn-about btn-outline-about">Get in Touch</a>
      </div>
    </div>
  </section>

</main>

<?php get_footer(); ?>
