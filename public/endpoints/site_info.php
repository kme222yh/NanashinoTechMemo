<?php
// wp-json/vendor/v1/base
add_action('rest_api_init', function(){
    register_rest_route('vendor/v1', '/base', [
        'methods' => 'GET',
        'callback' => function(WP_REST_Request $request){
            $information = [];

            $information['menu'] = [
                'global' => custom_menu_global(),
                'pinned' => custom_articles_pinned(),
            ];
            $information['widgets'] = [
                'footer' => custom_widget('footer'),
                'side_bar' => custom_widget('side_bar'),
            ];
            $information['archives'] = custom_archives();
            $information['categories'] = custom_categories();

            return $information;
        },
    ]);
});




function custom_menu_global() {
	$items = [];
	foreach(wp_get_nav_menu_items("global") as $item){
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


function custom_widget($id) {
	ob_start();         //出力バッファリングを有効にする
	dynamic_sidebar($id);
	$response = ob_get_contents();   // 変数に代入
	ob_end_clean();
    return $response;
}

function custom_archives(){
    global $wpdb;
    return $wpdb->get_results("SELECT DISTINCT MONTH( post_date ) AS month ,
                                    YEAR( post_date ) AS year,
                                    COUNT( id ) as post_count FROM $wpdb->posts
                                    WHERE post_status = 'publish' and post_date <= now( )
                                    and post_type = 'post'
                                    GROUP BY month , year
                                    ORDER BY post_date DESC");
}


function custom_article_pinned($id) {
    $the_query = new WP_Query(['p' => $id,]);
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
function custom_articles_pinned() {
	$items = [];
    foreach(wp_get_nav_menu_items("pinned") as $item){
        $data = custom_article_pinned($item->object_id);
        array_push($items, $data);
    }
	return $items;
}



function custom_categories(){
    $data = array();
    foreach(get_categories() as $category)
        $data[$category->slug] = $category->name;
    return $data;
}
