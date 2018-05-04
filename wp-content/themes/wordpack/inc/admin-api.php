<?php
/**
 * AJAX capable functions for JS <> MySQL
 *
 * @package Wordpack
 * @since Wordpack 0.1
 */

function get_acf_option() {
  $id = $_POST[ 'id' ];

  echo get_field( $id, 'option' );

  die();
}

add_action('wp_ajax_get_acf_option', 'get_acf_option');
add_action('wp_ajax_nopriv_get_acf_option', 'get_acf_option');
