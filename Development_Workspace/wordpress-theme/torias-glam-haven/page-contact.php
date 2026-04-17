<?php
/**
 * TORIAS GLAM HAVEN – page-contact.php
 * Exact port of contact.html — contact form + info panel.
 */
defined('ABSPATH') || exit;
get_header();
$img_url = get_template_directory_uri() . '/assets/img/hero-pendant.jpg';
?>

<!-- PAGE HEADER -->
<div class="page-header page-header--bg" style="background-image: url('<?php echo esc_url($img_url); ?>');">
  <div class="container">
    <span class="page-header-ornament">✦ WE'RE HERE FOR YOU ✦</span>
    <h1>Get In Touch</h1>
    <p style="color:rgba(255,255,255,0.8);margin-top:var(--sp-sm)">We love hearing from our community. Reach out and we'll respond within 24 hours.</p>
  </div>
</div>

<main id="main-content">
  <section class="contact-section section">
    <div class="container">
      <div class="contact-layout">

        <!-- FORM -->
        <div class="contact-form-wrap animate-up">
          <h2>Send Us a Message</h2>
          <p class="contact-intro">Have a question about an order, a product, or just want to say hello? Fill out the form below and we'll get back to you shortly.</p>

          <form class="contact-form" id="contact-form" novalidate>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="contact-first-name">First Name *</label>
                <input type="text" id="contact-first-name" name="first_name" class="form-control" placeholder="Your first name" required autocomplete="given-name" />
              </div>
              <div class="form-group">
                <label class="form-label" for="contact-last-name">Last Name *</label>
                <input type="text" id="contact-last-name" name="last_name" class="form-control" placeholder="Your last name" required autocomplete="family-name" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-email">Email Address *</label>
              <input type="email" id="contact-email" name="email" class="form-control" placeholder="your@email.com" required autocomplete="email" />
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-phone">Phone Number</label>
              <input type="tel" id="contact-phone" name="phone" class="form-control" placeholder="+254 700 000 000" autocomplete="tel" />
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-subject">Subject *</label>
              <select id="contact-subject" name="subject" class="form-control" required>
                <option value="" disabled selected>Select a subject</option>
                <option value="order">Order Inquiry</option>
                <option value="return">Return / Exchange</option>
                <option value="product">Product Question</option>
                <option value="wholesale">Wholesale / Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-message">Your Message *</label>
              <textarea id="contact-message" name="message" class="form-control" placeholder="Tell us how we can help…" required></textarea>
            </div>
            <button type="submit" class="btn btn-gold full-width" id="contact-submit">Send Message</button>
            <div class="contact-success" id="contact-success" hidden aria-live="polite">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Thank you! Your message has been sent. We'll be in touch within 24 hours.
            </div>
          </form>
        </div>

        <!-- INFO PANEL -->
        <div class="contact-info-panel">

          <div class="contact-info-card animate-up">
            <div class="contact-card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <h3>Email Us</h3>
            <p>For orders, inquiries, and general questions</p>
            <a href="mailto:toriabeautyhub@gmail.com" class="contact-link">toriabeautyhub@gmail.com</a>
            <p style="margin-top:6px;font-size:var(--fs-xs);color:var(--clr-gray-600)">Response within 24 hours</p>
          </div>

          <div class="contact-info-card animate-up">
            <div class="contact-card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.59 1.23h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.79a16 16 0 0 0 6.29 6.29l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <h3>Call Us</h3>
            <p>Speak directly with our customer care team</p>
            <a href="tel:0707353520" class="contact-link">0707353520</a>
            <p style="margin-top:6px;font-size:var(--fs-xs);color:var(--clr-gray-600)">Mon – Fri: 9am – 6pm EAT</p>
          </div>

          <div class="contact-info-card animate-up">
            <div class="contact-card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </div>
            <h3>WhatsApp</h3>
            <p>Quick support via WhatsApp chat</p>
            <a href="https://wa.me/254707353520" target="_blank" rel="noopener noreferrer" class="contact-link">0707353520</a>
            <p style="margin-top:6px;font-size:var(--fs-xs);color:var(--clr-gray-600)">Typically replies within 1 hour</p>
          </div>

          <!-- Social Links -->
          <div class="contact-social animate-up">
            <h3>Follow &amp; Tag Us</h3>
            <p>Join our community for daily jewelry inspiration, new arrivals, and exclusive deals.</p>
            <div class="contact-social-grid">
              <a href="https://www.instagram.com/toriasglamhaven?igsh=MXhsczFrd3VveXRrZg==" target="_blank" rel="noopener" class="contact-social-btn" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                Instagram
              </a>
              <a href="https://www.facebook.com/share/1EDDmanDBL/?mibextid=wwXIfr" target="_blank" rel="noopener" class="contact-social-btn" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                Facebook
              </a>
              <a href="https://wa.me/254707353520" target="_blank" rel="noopener" class="contact-social-btn" aria-label="WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                WhatsApp
              </a>
              <a href="https://www.tiktok.com/@torias.glam.haven" target="_blank" rel="noopener" class="contact-social-btn" aria-label="TikTok">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
                TikTok
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</main>

<?php get_footer(); ?>
