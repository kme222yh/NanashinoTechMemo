<?php require_once __DIR__ . '/helpers.php'; ?>

<!DOCTYPE html>
<html lang="en">
  <?php wp_head() ?>
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo get_bloginfo( 'name' ); ?></title>
    <?= vite('src/main.js') ?>
  </head>
  <body>
    <div id="app"></div>
  </body>
  <?php wp_footer() ?>
</html>
