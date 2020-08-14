module.exports = {
    publicPath: '<?php echo home_url() ?>/wp-content/themes/nanashinotechmemo/',
    indexPath: 'index.php',
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "./src/assets/sass/prepends.scss";'
      }
    }
  }
};
