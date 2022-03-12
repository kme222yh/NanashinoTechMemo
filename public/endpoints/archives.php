<?php
add_action('rest_api_init', function(){
    register_rest_route($GLOBALS['CustomEndpointBase'], '/archives', [
        'methods' => 'GET',
        'callback' => 'custom_get_archives',
    ]);
});



function custom_get_archives(){
    global $wpdb;
    return $wpdb->get_results("SELECT DISTINCT MONTH( post_date ) AS month ,
                                    YEAR( post_date ) AS year,
                                    COUNT( id ) as post_count FROM $wpdb->posts
                                    WHERE post_status = 'publish' and post_date <= now( )
                                    and post_type = 'post'
                                    GROUP BY month , year
                                    ORDER BY post_date DESC");
}
