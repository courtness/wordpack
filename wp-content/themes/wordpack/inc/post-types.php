<?php
/**
 * Custom Post Type Routing
 *
 * @package Wordpack
 * @since Wordpack 1.0
 */

add_theme_support( 'post-thumbnails' );

function init_post_types() {
  //
  // e.g. products

  /*
  $product_labels = array(
    'name'               => 'Products',
    'singular_name'      => 'Product',
    'menu_name'          => 'Products',
    'add_new'            => 'Add New',
    'add_new_item'       => 'Add New Product',
    'edit_item'          => 'Edit Product',
    'new_item'           => 'New Product',
    'all_items'          => 'All Products',
    'view_item'          => 'View Product',
    'search_items'       => 'Search Products',
    'not_found'          => 'No Products found',
    'not_found_in_trash' => 'No Products found in Trash',
    'parent_item_colon'  => ''
  );

  $product_args = array(
    'labels'             => $product_labels,
    'public'             => true,
    'publicly_queryable' => true,
    'hierarchical'       => true,
    'has_archive'        => 'products',
    'show_ui'            => true,
    'rewrite'            => array( 'with_front' => false ),
    'show_in_menu'       => true,
    'query_var'          => true,
    'capability_type'    => 'post',
    'taxonomies'         => array(),
    'menu_position'      => null,
    'supports'           => array( 'title', 'thumbnail' )
  );

  register_post_type( 'product', $product_args );

  //
  // e.g. parent/child URL rewrites

  add_rewrite_rule(
    'parent/(.*)/(.*)',
    'index.php?post_type=child&name=$matches[2]',
    'top'
  );
  */
}

add_action( 'init', 'init_post_types' );

//
// e.g. parent/child URL rewrites

// function link_child_posts( $link, $post ) {
//   if ( get_post_type( $post ) === 'child' ) {
//     $territory = get_post( get_field( 'parent', $post->ID )[0] );
//     $link = str_replace( '%parent%', seoify( $parent->post_title ), $link );
//   }

//   return $link;
// }
// add_filter( 'post_type_link', 'link_child_posts', 10, 2);
