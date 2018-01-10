<?php
/**
 * Functions related to user login
 *
 * @package Wordpack
 * @since Wordpack 0.1
 */


/**
 * If someone tries to log in with a banned username, immediately return a 403
 * Only spambots / bruteforce bots will try to use these usernames
 *
 * @param string $username
 * @return void
 */
function wordpack_check_for_banned_username( $username ) {
  global $wpdb;

  $banned = array(
    'www',
    'administrator',
    'admin',
    'root',
    'test'
  );

  if ( in_array( $username, $banned ) ) {
    header( 'HTTP/1.0 403 Forbidden' );

    echo 'Access to this resource is denied.';

    exit();
  }
}
add_action( 'wp_authenticate' , 'wordpack_check_for_banned_username' );
