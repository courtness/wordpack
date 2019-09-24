<!DOCTYPE html>
<html <?php language_attributes(); ?>>
  <head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <!--noptimize--><!--
    This site was made with
    ██╗    ██╗ ██████╗ ██████╗ ██████╗ ██████╗  █████╗  ██████╗██╗  ██╗
    ██║    ██║██╔═══██╗██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔════╝██║ ██╔╝
    ██║ █╗ ██║██║   ██║██████╔╝██║  ██║██████╔╝███████║██║     █████╔╝ 
    ██║███╗██║██║   ██║██╔══██╗██║  ██║██╔═══╝ ██╔══██║██║     ██╔═██╗ 
    ╚███╔███╔╝╚██████╔╝██║  ██║██████╔╝██║     ██║  ██║╚██████╗██║  ██╗
     ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
    https://courtness.netlify.com
    --><!--/noptimize-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="description" content="Vera Babida">

    <link rel="shortcut icon" sizes="16x16 32x32" href="<?php echo site_url() ?>/favicon.ico">

    <title><?php wp_title( '' ); ?></title>

    <!--[if lt IE 9]>
    <script src="//html5shim.googlecode.com/svn/trunk/html5.js" type="text/javascript"></script>
    <![endif]-->

    <?php if ( ENVIRONMENT == 'production' ): ?>
      <?php include( locate_template( 'dist/php/css.php' ) ); ?>
    <?php endif; ?>

    <?php include( locate_template( 'partials/scripts/head.php' ) ); ?>

    <?php wp_head(); ?>
  </head>
  <body>
    <?php include( locate_template( 'partials/scripts/wp-data.php' ) ); ?>
    <?php include( locate_template( 'partials/overlays/index.php' ) ); ?>

    <div id="wrap" class="relative">
      <?php include( locate_template( 'partials/header.php' ) ); ?>
