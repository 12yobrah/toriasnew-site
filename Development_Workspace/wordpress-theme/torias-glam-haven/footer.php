<?php
/**
 * TORIAS GLAM HAVEN – footer.php
 * Site footer with social links, copyright, and WhatsApp widget.
 */
defined('ABSPATH') || exit;
?>

  <!-- ── SITE FOOTER ── -->
  <footer class="site-footer" aria-label="Site footer">
    <div class="footer-top">
      <div class="container">
        <div class="footer-grid">

          <!-- Brand Column -->
          <div class="footer-brand">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="footer-logo" aria-label="TORIAS GLAM HAVEN">
              <div class="logo-text">
                <div class="logo-top">
                  <span class="logo-ornament">✦</span>
                  <span class="logo-main">Torias</span>
                  <span class="logo-ornament">✦</span>
                </div>
                <span class="logo-sub">GLAM HAVEN</span>
              </div>
            </a>
            <p class="footer-tagline">Where elegance meets confidence. Luxury jewelry for every woman, every occasion.</p>
            <div class="social-links">
              <a href="https://www.instagram.com/toriasglamhaven?igsh=MXhsczFrd3VveXRrZg==" target="_blank" rel="noopener" aria-label="Instagram" class="social-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.facebook.com/share/1EDDmanDBL/?mibextid=wwXIfr" target="_blank" rel="noopener" aria-label="Facebook" class="social-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://wa.me/254707353520" target="_blank" rel="noopener" aria-label="WhatsApp" class="social-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@torias.glam.haven" target="_blank" rel="noopener" aria-label="TikTok" class="social-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </a>
            </div>
          </div>

          <!-- Collections Column -->
          <div class="footer-col">
            <h4 class="footer-col-title">Collections</h4>
            <ul class="footer-links">
              <?php
              $cats = get_terms(['taxonomy' => 'product_cat', 'hide_empty' => true, 'parent' => 0]);
              if (!empty($cats) && !is_wp_error($cats)):
                foreach ($cats as $cat):
                  if ($cat->slug === 'uncategorized') continue;
              ?>
              <li><a href="<?php echo esc_url(get_term_link($cat)); ?>"><?php echo esc_html($cat->name); ?></a></li>
              <?php endforeach; endif; ?>
            </ul>
          </div>

          <!-- Customer Care Column -->
          <div class="footer-col">
            <h4 class="footer-col-title">Customer Care</h4>
            <ul class="footer-links">
              <li><a href="<?php echo esc_url(get_page_link(get_page_by_path('shipping-policy'))); ?>">Shipping Policy</a></li>
              <li><a href="<?php echo esc_url(get_page_link(get_page_by_path('returns-exchanges'))); ?>">Returns &amp; Exchanges</a></li>
              <li><a href="<?php echo esc_url(get_page_link(get_page_by_path('faqs'))); ?>">FAQs</a></li>
              <li><a href="<?php echo esc_url(get_page_link(get_page_by_path('privacy-policy'))); ?>">Privacy Policy</a></li>
            </ul>
          </div>

          <!-- Contact Column -->
          <div class="footer-col">
            <h4 class="footer-col-title">Contact</h4>
            <ul class="footer-contact-list">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <a href="mailto:hello@toriasglamhaven.com">hello@toriasglamhaven.com</a>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91A16 16 0 0 0 15.09 16l.81-.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2z"/></svg>
                <a href="tel:+254707353520">0707 353 520</a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container">
        <p>© <?php echo date('Y'); ?> TORIAS GLAM HAVEN. All rights reserved. Designed with love by Brixel Graphics.</p>
        <div class="payment-icons">
          <span class="payment-icon">VISA</span>
          <span class="payment-icon">MC</span>
          <span class="payment-icon">M-PESA</span>
          <span class="payment-icon">Stripe</span>
        </div>
      </div>
    </div>
  </footer>

  <!-- ── WHATSAPP FLOATING WIDGET ── -->
  <div class="whatsapp-widget" id="whatsapp-widget">
    <a href="https://wa.me/254707353520?text=Hello%20Torias%20Glam%20Haven!%20I%27d%20like%20to%20enquire%20about%20your%20jewelry."
       target="_blank" rel="noopener noreferrer"
       class="whatsapp-btn" aria-label="Chat with us on WhatsApp">
      <div class="whatsapp-icon">
        <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.974 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </div>
      <span class="whatsapp-label">Chat with us</span>
    </a>
  </div>

<?php wp_footer(); ?>
</body>
</html>
