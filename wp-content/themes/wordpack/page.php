<?php
  /**
   * The template for individual pages
   *
   * @package Wordpack
   * @since Wordpack 1.0
   */

  get_header();
?>

  <?php while ( have_posts() ) : the_post() ?>
    <div><?php the_title(); ?></div>
  <?php endwhile ?>

<?php get_footer(); ?>
