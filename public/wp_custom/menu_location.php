<?php
function mytheme_nav_menu() {
  register_nav_menus( array(
    'global' => 'global',
    'pinned'   => 'pinned',
    'footer' => 'footer',
  ) );
}
add_action( 'after_setup_theme', 'mytheme_nav_menu' );




function custom_get_menu_items_by_location($menuName){
    $wpMenuId = get_nav_menu_locations()[$menuName];
    $menuObject = wp_get_nav_menu_object($wpMenuId);
    $menuItems = wp_get_nav_menu_items($menuObject->name);
    return $menuItems;
}
