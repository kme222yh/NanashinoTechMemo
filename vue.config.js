module.exports = {
    publicPath: '<?php echo home_url() ?>/wp-content/themes/katurara.info/',
    indexPath: 'index.php',
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "./src/assets/sass/prepends.scss";'
      }
    }
  }
};
