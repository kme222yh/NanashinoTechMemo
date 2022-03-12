<?php
add_action('rest_api_init', function(){
    register_rest_route($GLOBALS['CustomEndpointBase'], '/widgets/footer', [
        'methods' => 'GET',
        'callback' => function(){return custom_get_widget_by_id('footer');},
    ]);
});
