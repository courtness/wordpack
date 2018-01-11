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
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title><?php wp_title( '' ) ?></title>

    <?php if ( ENVIRONMENT == 'development' ): ?>
      <link rel="stylesheet" href="<?php wordpack_include( 'dist/css/app.css', true ) ?>" type="text/css" media="screen">
    <?php else: ?>
      <link rel="stylesheet" href="<?php wordpack_include( 'dist/css/app.min.css', true ) ?>" type="text/css" media="screen">
    <?php endif ?>

    <?php wp_head() ?>

    <link rel="shortcut icon" sizes="16x16 32x32" href="<?php echo site_url() ?>/favicon.ico">
  </head>
  <body <?php body_class() ?>>
    <div class="wrap">
      <header class="wordpack-header" data-component="Header"></header>
