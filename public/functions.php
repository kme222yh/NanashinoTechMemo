<?php
add_theme_support('post-thumbnails');
add_theme_support('menus');





function menu_setup() {
  register_nav_menus( array(
    'global' => 'global',
    'pinned'   => 'pinned',
    'footer' => 'footer',
  ) );
}
add_action( 'after_setup_theme', 'menu_setup' );





// wp_head, wp_footerの出力内容を変更
// remove_action( 'wp_head', 'rest_output_link_wp_head' );
// remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
// remove_action( 'wp_head', 'wp_oembed_add_host_js' );
function twpp_deregister_scripts() {
	wp_deregister_script( 'hcb_prism_script' );
	wp_deregister_script('hcb_script');
}
add_action( 'wp_enqueue_scripts', 'twpp_deregister_scripts', 100 );








// ウィジェットの設定
// https://pera-lab.com/archives/853
add_action( 'widgets_init',
	function(){
		register_sidebar(array(
			'id' => 'footer',
			'name' => 'フッターに表示するウィジェット',
			'description' => 'Twitterとかサイト説明とか　２カラムです！！',
		));
        register_sidebar(array(
			'id' => 'side_bar',
			'name' => 'サイドバー',
			'description' => 'アーカイブとタグクラウド',
		));
	}
);








// https://wemo.tech/2163
// ブロックエディタにカスタムブロックを追加
function add_my_assets_to_block_editor(){
    wp_enqueue_script( 'block-custom', get_stylesheet_directory_uri() . '/assets/js/block_custom.js',array(), "", true);
	// wp_enqueue_script( 'block-custom', get_stylesheet_directory_uri() . '/assets/js/block_custom.js',array(), "", true);
}
add_action( 'enqueue_block_editor_assets', 'add_my_assets_to_block_editor' );









// https://wpdocs.osdn.jp/%E9%96%A2%E6%95%B0%E3%83%AA%E3%83%95%E3%82%A1%E3%83%AC%E3%83%B3%E3%82%B9/WP_Query
// https://www.webdesignleaves.com/pr/wp/wp_func_loop.html
// custom endpoints
require_once('endpoints/site_info.php');
require_once('endpoints/articles.php');
require_once('endpoints/article_info.php');
require_once('endpoints/page_info.php');
