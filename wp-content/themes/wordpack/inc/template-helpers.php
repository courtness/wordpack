<?php
/**
 * Helper functions to be used in templates
 *
 * @package Wordpack
 * @since Wordpack 0.1
 */

/**
 * Generates and displays an absolute url for a file
 *
 * @param string $file the relative path and name of the file
 * @param bool $modified whether to append a modified query var or not
 * @return void
 */
function template_include( $file, $modified = false, $echo = true ) {
  $url = get_stylesheet_directory_uri() . '/' . $file;
  if ( $modified ) $url .= '?v='.filemtime( get_template_directory() . '/' . $file );

  if ( $echo ) {
    echo $url;
  } else {
    return $url;
  }
}

/**
 * Returns or prints an absolute url
 *
 * @param string $path the relative path for the url
 * @param bool $echo true to echo, false to return
 * @return void/string
 */
function abs_url( $path = '', $echo = true ) {
  $url = site_url() . $path;

  if ( $echo ) {
    echo $url;
  } else {
    return $url;
  }
}

/**
 * Returns or prints the current url
 *
 * @param string $path the relative path for the url
 * @param bool $echo true to echo, false to return
 * @return void/string
 */
function current_url( $echo = true ) {
  $protocol = stripos( $_SERVER[ 'SERVER_PROTOCOL' ],'https' ) === true ? 'https://' : 'http://';

  $url = esc_url( "$protocol$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]" );

  if ( $echo ) {
    echo $url;
  } else {
    return $url;
  }
}

/**
 * Sets the post thumbnail as as background-image
 *
 * @param int $post_id the id of the post to check
 * @return void
 */
function thumbnail_background( $post_id = null, $size = 'large' ) {
  if ( $post_id == null ) {
    global $post;
    $post_id = $post->ID;
  }

  if ( has_post_thumbnail( $post_id ) ) {
    $large_image_url = wp_get_attachment_image_src( get_post_thumbnail_id( $post_id ), $size );

    echo ' style="background-image:url('.$large_image_url[0].')"';
  }
}

/**
 * Sets a custom field as the background-image
 *
 * @param int $post_id the id of the post to check
 * @return void
 */
function custom_background( $field_name, $post_id = null, $size = 'large' ) {
  if ( $post_id == null ) {
    global $post;
    $post_id = $post->ID;
  }

  $image = get_field( $field_name, $post_id );

  if ( $image ) {
    $large_image_url = wp_get_attachment_image_src( $image['id'], $size );

    echo ' style="background-image:url(' . $large_image_url[0] . ')"';
  }
}

/**
 * Makes strings SEO friendly:
 * - Lowercase
 * - Alphanumeric
 * - Clear multiple hyphen/whitespace
 * - Replace whitespace/underscore with dash
 *
 * @param int $post_id the id of the post to check
 * @return void
 */
function seoify($string) {
  $string = strtolower($string);
  $string = preg_replace("/[^a-z0-9_\s-]/", "", $string);
  $string = preg_replace("/[\s-]+/", " ", $string);
  $string = preg_replace("/[\s_]/", "-", $string);

  return $string;
}
