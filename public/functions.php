<?php
// enable thumbnails
add_theme_support('post-thumbnails');

// configure custom menu
require_once('wp_custom/menu_location.php');

// configure custom widgets
require_once('wp_custom/widgets.php');

// configure custom widgets
require_once('wp_custom/js_valuable.php');

// Adding custom endpoints
require_once('endpoints/index.php');


function twpp_deregister_scripts() {
	wp_deregister_script( 'hcb_prism_script' );
	wp_deregister_script('hcb_script');
	// wp_deregister_script('wpp-js');
}
add_action( 'wp_enqueue_scripts', 'twpp_deregister_scripts', 100 );


// https://wemo.tech/2163
// ブロックエディタにカスタムブロックを追加
function add_my_assets_to_block_editor(){
    wp_enqueue_script( 'block-custom', get_stylesheet_directory_uri() . '/wp_assets/js/block_custom.js',array(), "", true);
	// wp_enqueue_script( 'block-custom', get_stylesheet_directory_uri() . '/assets/js/block_custom.js',array(), "", true);
}
add_action( 'enqueue_block_editor_assets', 'add_my_assets_to_block_editor' );




// find script handler key
// function get_enqueued_scripts () {
//     $scripts = wp_scripts();
//     var_dump( array_keys( $scripts->groups ) );
// 	exit;
// }
// add_action( 'wp_head', 'get_enqueued_scripts' );
