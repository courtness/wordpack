<?php
/**
 * Custom Post Type Routing
 *
 * @package Wordpack
 * @since Wordpack 0.1
 */

function wordpack_init_post_types() {
  //
  // products

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
}

add_action( 'init', 'wordpack_init_post_types' );
