<!DOCTYPE html>
<html lang="en">
  <?php wp_head() ?>
  <head>
    <meta charset="UTF-8" />
    <meta name="home_url" content="<?php echo home_url() ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="site-title" content="<?php echo get_bloginfo( 'name' ); ?>">
    <title><?php echo get_bloginfo( 'name' ); ?></title>
    <style type="text/css"><?= file_get_contents(__DIR__.'/wp_assets/css/openingAnimation.css') ?></style>
    <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">
    <?= file_get_contents(__DIR__.'/index.html') ?>
  </head>
  <body>
      <div id="opening-animation"></div>
      <div id="app"></div>
  </body>
  <?php wp_footer() ?>
</html>
