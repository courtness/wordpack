<?php
/**
 * Wordpack functions and definitions.
 *
 * @package Wordpack
 * @since TSS 0.1
 */

require_once __DIR__ . '/inc/admin-functions.php';
require_once __DIR__ . '/inc/login-functions.php';
require_once __DIR__ . '/inc/post-types.php';
require_once __DIR__ . '/inc/template-helpers.php';

//
// initialise

if ( substr( $_SERVER[ 'REMOTE_ADDR' ], 0, 4 ) == '127.' || $_SERVER[ 'REMOTE_ADDR' ] == '::1' ) {
  define( 'ENVIRONMENT', 'development' );
  ini_set( 'error_reporting', E_ALL );
  ini_set( 'display_errors', 'On' );
} else {
  define( 'ENVIRONMENT', 'production' );
}


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

if ( function_exists( 'acf_add_options_page' ) ) {
  acf_add_options_page();
}
