<?php
/**
 * Functions that run on WordPress Admin
 * For some reason, you can't use admin.php as a file name
 * Hence the yuck admin-functions.php name
 *
 * @package Wordpack
 * @since Wordpack 0.1
 */

// Hide Yoast SEO by Default
function hide_yoast( $hidden ) {
  $hidden[] = 'wpseo_meta';
  return $hidden;
}
add_filter( 'default_hidden_meta_boxes', 'hide_yoast' );

/**
 * Hides some of the useless Yoast bloat, which can no longer be removed by hooks
 * https://github.com/Yoast/wordpress-seo/issues/3464
 * https://wordpress.org/support/topic/please-remove-your-invasive-update-message
 *
 */
function remove_yeost_bloat() {
  echo '<style>
    #wp-admin-bar-wpseo-menu,
    #misc-publishing-actions #content-score,
    #misc-publishing-actions #keyword-score,
    .yoast-notice,
    [name="seo_filter"] {
      display: none !important;
    }
  </style>';
}
add_action('admin_head', 'remove_yeost_bloat');

add_filter( 'wpseo_stopwords', '__return_empty_array' );

// Move Yoast SEO metabox to bottom
function wordpack_wpseo_metabox_prio() {
  return 'low';
}
add_filter('wpseo_metabox_prio', 'wordpack_wpseo_metabox_prio');


// remove emojis
function disable_wp_emojicons() {
  remove_action( 'admin_print_styles', 'print_emoji_styles' );
  remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
  remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
  remove_action( 'wp_print_styles', 'print_emoji_styles' );
  remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
  remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
  remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
}
add_action( 'init', 'disable_wp_emojicons' );
