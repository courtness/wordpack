<!DOCTYPE html>
<html <?php language_attributes() ?>>
  <head>
    <meta charset="<?php bloginfo( 'charset' ) ?>">
    <!--noptimize--><!--
    This site was made with

     /♥♥        /♥♥♥♥♥♥  /♥♥    /♥♥ /♥♥♥♥♥♥♥♥                       /$$      /$$  /$$$$$$  /$$   /$$ /$$$$$$$$ /$$     /$$
    | ♥♥       /♥♥__  ♥♥| ♥♥   | ♥♥| ♥♥_____/          /++         | $$$    /$$$ /$$__  $$| $$$ | $$| $$_____/|  $$   /$$/
    | ♥♥      | ♥♥  \ ♥♥| ♥♥   | ♥♥| ♥♥               | ++         | $$$$  /$$$$| $$  \ $$| $$$$| $$| $$       \  $$ /$$/
    | ♥♥      | ♥♥  | ♥♥|  ♥♥ / ♥♥/| ♥♥♥♥♥          /++++++++      | $$ $$/$$ $$| $$  | $$| $$ $$ $$| $$$$$     \  $$$$/
    | ♥♥      | ♥♥  | ♥♥ \  ♥♥ ♥♥/ | ♥♥__/         |__  ++__/      | $$  $$$| $$| $$  | $$| $$  $$$$| $$__/      \  $$/
    | ♥♥      | ♥♥  | ♥♥  \  ♥♥♥/  | ♥♥               | ++         | $$\  $ | $$| $$  | $$| $$\  $$$| $$          | $$
    | ♥♥♥♥♥♥♥♥|  ♥♥♥♥♥♥/   \  ♥/   | ♥♥♥♥♥♥♥♥         |__/         | $$ \/  | $$|  $$$$$$/| $$ \  $$| $$$$$$$$    | $$
    |________/ \______/     \_/    |________/                      |__/     |__/ \______/ |__/  \__/|________/    |__/

    https://loveandmoney.agency
    --><!--/noptimize-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="description" content="Wordpress + Webpack">

    <link rel="shortcut icon" sizes="16x16 32x32" href="<?php echo site_url() ?>/favicon.ico">

    <title><?php wp_title( '' ) ?></title>

    <?php if ( ENVIRONMENT == 'development' ): ?>
      <link rel="stylesheet" href="<?php wordpack_include( 'dist/css/app.css', true ) ?>" type="text/css" media="screen">
    <?php else: ?>
      <link rel="stylesheet" href="<?php wordpack_include( 'dist/css/app.min.css', true ) ?>" type="text/css" media="screen">
    <?php endif ?>

    <?php wp_head() ?>
  </head>
  <body <?php body_class() ?>>
    <a id="wp-base-url" class="no-display" href="<?php echo wordpack_url(); ?>"></a>
    <a id="wp-admin-url" class="no-display" href="<?php echo esc_url( admin_url('admin-post.php') ); ?>"></a>
    <a id="wp-theme-url" class="no-display" href="<?php echo esc_url( get_template_directory_uri() ); ?>"></a>

    <div class="wrap">
      <header class="wordpack-header" data-component="Header"></header>
