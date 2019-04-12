<?php
/**
 * WordPress Admin Functions
 *
 * @package Wordpack
 * @since Wordpack 1.0
 */

//
// Hide Yoast SEO by Default

function hide_yoast( $hidden ) {
  $hidden[] = 'wpseo_meta';
  return $hidden;
}
add_filter( 'default_hidden_meta_boxes', 'hide_yoast' );

/**
 * Remove Yoast bloat
 * https://github.com/Yoast/wordpress-seo/issues/3464
 * https://wordpress.org/support/topic/please-remove-your-invasive-update-message
 */
function remove_yoast_bloat() {
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
add_action('admin_head', 'remove_yoast_bloat');

add_filter( 'wpseo_stopwords', '__return_empty_array' );

function wpseo_metabox_prio() {
  return 'low';
}
add_filter('wpseo_metabox_prio', 'wpseo_metabox_prio');

//
// Show ACF options

if ( function_exists( 'acf_add_options_page' ) ) {
  acf_add_options_page();
}

//
// hide content editor

function hide_editor() {
  global $_wp_post_type_features;

  $post_type = 'page';
  $feature = 'editor';

  if ( !isset( $_wp_post_type_features[$post_type] ) ) {

  } elseif ( isset( $_wp_post_type_features[ $post_type ][ $feature ] ) ) {
    unset( $_wp_post_type_features[ $post_type ][ $feature ] );
  }
}

add_action('init', 'hide_editor');

//
// deregister unwanted scripts

function deregister_scripts() {
  wp_deregister_script( 'wp-embed' );
}
add_action( 'wp_footer', 'deregister_scripts' );

//
// remove emojicon support

function disable_wp_emojicons() {
  remove_action( 'admin_print_styles', 'print_emoji_styles' );
  remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
  remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
  remove_action( 'wp_print_styles', 'print_emoji_styles' );
  remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
  remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
  remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );

  add_filter( 'tiny_mce_plugins', 'disable_emojicons_tinymce' );
}
add_action( 'init', 'disable_wp_emojicons' );

function disable_emojicons_tinymce( $plugins ) {
  if ( is_array( $plugins ) ) {
    return array_diff( $plugins, array( 'wpemoji' ) );
  } else {
    return array();
  }
}
