<?php
// enable thumbnails
add_theme_support('post-thumbnails');

// let WordPress (and SEO plugins) output <title>
add_theme_support('title-tag');

// load the Vue app built by Vite
require_once('wp_custom/vite.php');

// configure custom menu
require_once('wp_custom/menu_location.php');

// configure custom widgets
require_once('wp_custom/widgets.php');

// configure custom widgets
require_once('wp_custom/js_valuable.php');

// Adding custom endpoints
require_once('endpoints/index.php');


// https://wemo.tech/2163
// ブロックエディタにカスタムブロックを追加
function add_my_assets_to_block_editor(){
    wp_enqueue_script( 'block-custom', get_theme_file_uri('wp_assets/js/block_custom.js'), ['wp-blocks', 'wp-element', 'wp-block-editor'], wp_get_theme()->get('Version'), true );
}
add_action( 'enqueue_block_editor_assets', 'add_my_assets_to_block_editor' );




// find script handler key
// function get_enqueued_scripts () {
//     $scripts = wp_scripts();
//     var_dump( array_keys( $scripts->groups ) );
// 	exit;
// }
// add_action( 'wp_head', 'get_enqueued_scripts' );
