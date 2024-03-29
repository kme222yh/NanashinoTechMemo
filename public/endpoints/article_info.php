<?php
// /wp-json/vendor/v1/article
add_action( 'rest_api_init', function () {
    register_rest_route($GLOBALS['CustomEndpointBase'], '/article/(?P<id>\d+)', array(
        'methods' => 'GET',
        'callback' => 'custom_article',
    ) );
} );
function custom_article( $request ) {
    $the_query = new WP_Query(['p' => $request['id'],]);
    if($the_query->have_posts()){
        $the_query->the_post();
        $tags = array_map(function($e){return $e->name;}, get_the_tags());
		$content = apply_filters( 'the_content', get_the_content() );
		$content = str_replace( ']]>', ']]&gt;', $content );
        return [
            'id' => get_the_ID(),
            'title' => get_the_title(),
			'content' => $content,
            'date' => get_the_date(),
			'date_modified' => get_the_modified_date(),
            'media' => wp_get_attachment_image_src(get_post_thumbnail_id(), 'full')[0],
            'category' => get_the_category()[0]->cat_name,
            'category_slug' => get_the_category()[0]->slug,
            'tags' => $tags?$tags:[],
        ];
    }
    else
        return new WP_Error( 'are_you_ok?', 'Invalid post ID', array( 'status' => 404 ) );
}
