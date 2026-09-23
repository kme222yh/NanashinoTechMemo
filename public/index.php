<!DOCTYPE html>
<html <?php language_attributes(); ?>>
  <head>
    <meta charset="<?php bloginfo('charset'); ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="home_url" content="<?php echo esc_url(home_url()); ?>">
    <meta name="site-title" content="<?php echo esc_attr(get_bloginfo('name')); ?>">
    <style><?php echo file_get_contents(__DIR__.'/wp_assets/css/openingAnimation.css'); ?></style>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@500&family=M+PLUS+Rounded+1c:wght@300&display=swap" rel="stylesheet">
    <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">
    <?php wp_head(); ?>
  </head>
  <body>
    <?php wp_body_open(); ?>
    <div id="opening-animation"></div>
    <div id="app"></div>
    <?php wp_footer(); ?>
  </body>
</html>
