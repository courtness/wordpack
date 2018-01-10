<?php
/**
 * Wordpack functions and definitions.
 *
 * @package Wordpack
 * @since Wordpack 0.1
 */

require_once __DIR__ . '/inc/admin-functions.php';
require_once __DIR__ . '/inc/login-functions.php';
require_once __DIR__ . '/inc/post-types.php';
require_once __DIR__ . '/inc/template-helpers.php';

//
// initialise

if ( '127.0.0.1' == $_SERVER["REMOTE_ADDR"] ) {
  define( 'ENVIRONMENT', 'development' );
  ini_set( 'error_reporting', E_ALL );
  ini_set( 'display_errors', 'On' );
} else {
  define( 'ENVIRONMENT', 'production' );
}

//
// enqueue

function enqueue_dependencies() {
  if ( ENVIRONMENT == 'development' ) {
    wp_enqueue_script( 'wordpack-scripts', get_stylesheet_directory_uri() . '/dist/js/app.js', array( 'jquery' ), filemtime( get_stylesheet_directory() . '/dist/js/app.js' ), true );
    wp_enqueue_style( 'wordpack-styles', get_stylesheet_directory_uri() . '/dist/css/app.css', array(), filemtime( get_stylesheet_directory() . '/dist/css/app.css' ) );
  } else {
    wp_enqueue_script( 'wordpack-scripts', get_stylesheet_directory_uri() . '/dist/js/app.min.js', array( 'jquery' ), filemtime( get_stylesheet_directory() . '/dist/js/app.min.js' ), true );
    wp_enqueue_style( 'wordpack-styles', get_stylesheet_directory_uri() . '/dist/css/app.min.css', array(), filemtime( get_stylesheet_directory() . '/dist/css/app.min.css' ) );
  }
}
add_action( 'wp_enqueue_scripts', 'enqueue_dependencies' );
