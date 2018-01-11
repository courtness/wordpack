<?php
/**
 * TSS functions and definitions.
 *
 * @package TSS
 * @since TSS 0.1
 */

require_once __DIR__ . '/inc/admin-functions.php';
require_once __DIR__ . '/inc/login-functions.php';
require_once __DIR__ . '/inc/post-types.php';
require_once __DIR__ . '/inc/template-helpers.php';

//
// initialise

if (substr($_SERVER['REMOTE_ADDR'], 0, 4) == '127.' ||
    $_SERVER['REMOTE_ADDR'] == '::1') {
  define( 'ENVIRONMENT', 'development' );
  ini_set( 'error_reporting', E_ALL );
  ini_set( 'display_errors', 'On' );
} else {
  define( 'ENVIRONMENT', 'production' );
}
