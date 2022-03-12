<?php
add_action('rest_api_init', function(){
    register_rest_route($GLOBALS['CustomEndpointBase'], '/menu/footer', [
        'methods' => 'GET',
        'callback' => 'custom_get_footer_menu',
    ]);
});


function custom_get_footer_menu() {
	$items = [];
	foreach(custom_get_menu_items_by_location('footer') as $item){
        $data = [
			'title' => $item->title,
			'url' => $item->url,
            'path' => parse_url($item->url, PHP_URL_PATH),
            'same_origin' => preg_match('/^'.preg_quote(home_url(), '/').'.*$/', $item->url),
		];
		array_push($items, $data);
	}
	return $items;
}
