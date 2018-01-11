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
