<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme and one of the
 * two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * For example, it puts together the home page when no home.php file exists.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package wordpack
 * @since wordpack 0.1
 */

get_header() ?>

<?php while ( have_posts() ) : the_post() ?>

<?php endwhile ?>

<?php get_footer() ?>
