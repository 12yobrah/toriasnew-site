<?php defined('ABSPATH') || exit; get_header(); ?>
<main id="main-content">
<?php if (have_posts()): while (have_posts()): the_post(); ?>
<div class="page-header page-header--bg">
  <div class="container">
    <span class="page-header-ornament">✦ TORIAS GLAM HAVEN ✦</span>
    <h1><?php the_title(); ?></h1>
  </div>
</div>
<div class="container" style="padding-top: 60px; padding-bottom: 80px; max-width: 900px;">
  <div class="page-content"><?php the_content(); ?></div>
</div>
<?php endwhile; endif; ?>
</main>
<?php get_footer(); ?>
