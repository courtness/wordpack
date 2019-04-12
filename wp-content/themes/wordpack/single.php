<?php
  /**
   * The template for individual posts
   *
   * @package Wordpack
   * @since Wordpack 1.0
   */

  get_header();
?>

  <?php while ( have_posts() ) : the_post() ?>
    <h1><?php the_title(); ?></h1>
  <?php endwhile ?>

<?php get_footer(); ?>
