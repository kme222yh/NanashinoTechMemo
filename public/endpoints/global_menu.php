<?php
add_action('rest_api_init', function(){
    register_rest_route($GLOBALS['CustomEndpointBase'], '/menu/global', [
        'methods' => 'GET',
        'callback' => 'custom_get_global_menu',
    ]);
});


function custom_get_global_menu() {
    $items = [];
	foreach(custom_get_menu_items_by_location('global') as $item){
        $data = [
			'title' => $item->title,
			'url' => $item->url,
            'path' => parse_url($item->url, PHP_URL_PATH),
            'same_origin' => preg_match('/^'.preg_quote(home_url(), '/').'.*$/', $item->url),
            'children' => [],
		];
        if($item->menu_item_parent != 0)
            array_push($items[count($items)-1]['children'], $data);
        else
    		array_push($items, $data);
	}
	return $items;
}
