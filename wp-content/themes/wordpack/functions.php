<?php
/**
 * Wordpack functions and definitions.
 *
 * @package Wordpack
 * @since TSS 0.1
 */

require_once __DIR__ . '/dist/assets-manifest.php';

require_once __DIR__ . '/inc/admin-functions.php';
require_once __DIR__ . '/inc/login-functions.php';
require_once __DIR__ . '/inc/post-types.php';
require_once __DIR__ . '/inc/template-helpers.php';

//
// initialize

if ( substr( $_SERVER[ 'REMOTE_ADDR' ], 0, 4 ) == '127.' || $_SERVER[ 'REMOTE_ADDR' ] == '::1' ) {
  define( 'ENVIRONMENT', 'development' );
  ini_set( 'error_reporting', E_ALL );
  ini_set( 'display_errors', 'On' );
} else {
  define( 'ENVIRONMENT', 'production' );
}

//
// JS (hashed from Webpack PHP manifest)

function enqueue_hashed_js() {
  wp_enqueue_script( 'main', site_url() . WebpackBuiltFiles::$jsFiles[ 'main' ], null, null, true );
}
add_action( 'wp_enqueue_scripts', 'enqueue_hashed_js' );

//
// CSS (hashed from Webpack PHP manifest)

function enqueue_hashed_css() {
  if ( count( WebpackBuiltFiles::$cssFiles ) > 0 && isset( WebpackBuiltFiles::$cssFiles[ 'main' ] ) ) {
    wp_enqueue_style( 'main', site_url() . WebpackBuiltFiles::$cssFiles[ 'main' ], null, null, null );
  }
}
add_action( 'wp_enqueue_scripts', 'enqueue_hashed_css' );

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

  if ( !isset( $_wp_post_type_features[ $post_type ] ) ) {
    //
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
