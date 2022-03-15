<!DOCTYPE html>
<html lang="en">
  <?php //wp_head() ?>
  <head>
    <meta charset="UTF-8" />
    <meta name="home_url" content="<?php echo home_url() ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo get_bloginfo( 'name' ); ?></title>
    <style type="text/css">
        #opening-animation{
            position: fixed;
            top: 0;
            right: 0;
            height: 100vh;
            width: 100vw;
            z-index: 999;
            background-color: #fbf1ed;
        }
        #opening-animation.hide{
            transition: 1s;
            opacity: 0;
        }
        #opening-animation .lds-ripple {
            display: inline-block;
            position: relative;
            width: 80px;
            height: 80px;
            top: 40%;
            left: 50%;
            transform: translateX(-50%);
        }
        #opening-animation .lds-ripple div {
            position: absolute;
            border: 4px solid rgba(18, 47, 61, 0.5);
            opacity: 1;
            border-radius: 50%;
            animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }
        #opening-animation .lds-ripple div:nth-child(2) {
            animation-delay: -0.5s;
        }
        @keyframes lds-ripple {
            0% {
                top: 36px;
                left: 36px;
                width: 0;
                height: 0;
                opacity: 1;
            }
            100% {
                top: 0px;
                left: 0px;
                width: 72px;
                height: 72px;
                opacity: 0;
            }
        }
    </style>
    <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">
    <?= file_get_contents(__DIR__ . '/index.html') ?>
  </head>
  <body>
      <div id="opening-animation"><div class="lds-ripple"><div></div><div></div></div></div>
      <div id="app"></div>
  </body>
  <?php //wp_footer() ?>
</html>
