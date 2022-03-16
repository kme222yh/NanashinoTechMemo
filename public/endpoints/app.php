<?php
add_action('rest_api_init', function(){
    register_rest_route($GLOBALS['CustomEndpointBase'], '/app', [
        'methods' => 'GET',
        'callback' => 'custom_app',
    ]);
});


function custom_app() {
    return [
        'globalMenu' => custom_get_global_menu(),
        'footerMenu' => custom_get_footer_menu(),
        'footerWidget' => custom_get_widget_by_id('footer'),
        'archives' => custom_get_archives(),
        'categories' => custom_categories(),
        'pinnedArticles' => custom_get_pinned_menu(),
    ];
}


function custom_categories(){
    $data = array();
    foreach(get_categories() as $category)
        $data[$category->slug] = $category->name;
    return $data;
}
