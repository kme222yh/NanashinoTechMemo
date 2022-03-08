<?php
// /wp-json/vendor/v1/article
add_action( 'rest_api_init', function () {
    register_rest_route( 'vendor/v1', '/article/(?P<id>\d+)', array(
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





// https://github.com/cabrerahector/wordpress-popular-posts/blob/master/src/Rest/Controller.php
// global $wpdb;
// $table = $wpdb->prefix . "popularposts";
// $now = current_time('mysql');
// $curdate = current_time('Y-m-d', false);
// $wpdb->query($wpdb->prepare(
//     "INSERT INTO {$table}summary
//     (postid, pageviews, view_date, view_datetime) VALUES (%d, %d, %s, %s)
//     ON DUPLICATE KEY UPDATE pageviews = pageviews + %d, view_datetime = %s;",
//     $request['id'],
//     1,
//     $curdate,
//     $now,
//     1,
//     $now
// ));
