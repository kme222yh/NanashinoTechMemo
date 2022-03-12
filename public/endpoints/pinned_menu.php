<?php
add_action('rest_api_init', function(){
    register_rest_route($GLOBALS['CustomEndpointBase'], '/menu/pinned', [
        'methods' => 'GET',
        'callback' => 'custom_get_pinned_menu',
    ]);
});



function custom_get_pinned_menu() {
    $items = [];
    foreach(custom_get_menu_items_by_location("pinned") as $item){
        $data = custom_article_pinned($item->object_id);
        array_push($items, $data);
    }
	return $items;
}
function custom_article_pinned($id) {
    $the_query = new WP_Query(array('p' => $id));
    if($the_query->have_posts()){
        $the_query->the_post();
        // $tags = array_map(function($e){return $e->name;}, get_the_tags());
        $response = [
            'id' => get_the_ID(),
            'title' => get_the_title(),
            'date' => get_the_date(),
			'date_modified' => get_the_modified_date(),
            'media' => wp_get_attachment_image_src(get_post_thumbnail_id(), 'full')[0],
            'category' => get_the_category()[0]->cat_name,
            'category_slug' => get_the_category()[0]->slug,
            // 'tags' => $tags?$tags:[],
        ];
    }
    return $response;
}
