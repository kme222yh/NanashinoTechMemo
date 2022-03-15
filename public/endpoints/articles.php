<?php
/*
/wp-json/vendor/v1/articles

param: per_page(int), page(int), category(slug), tag(slug), search(string)
res: per_page, next_page(int), all_out(終わりかどうか boolean), articles
*/
function custom_articles( WP_REST_Request $request ) {
    $params = $request->get_query_params();
    $articles = [];
    $args = array(
        'post_type' => 'post',
        'posts_per_page' => isset($params['per_page'])?$params['per_page']:'4',
        'paged' => isset($params['page'])?$params['page']:'1',
        'category_name' => isset($params['category'])?$params['category']:'',
        's' => isset($params['s'])?$params['s']:'',
        'year' => isset($params['year'])?$params['year']:'',
        'monthnum' => isset($params['month'])?$params['month']:'',
    );
    $the_query = new WP_Query($args);
    if($the_query->have_posts()){
        while ( $the_query->have_posts() ) {
            $the_query->the_post();
            $tags = array_map(function($e){return [
                'id' => $e->term_id,
                'name' => $e->name,
                'slug' => $e->slug,
            ];}, get_the_tags());
            array_push($articles, [
                'id' => get_the_ID(),
                'title' => get_the_title(),
                'date' => get_the_date(),
                'media' => wp_get_attachment_image_src(get_post_thumbnail_id(), 'full')[0],
                'categories' => array_map(function($e){return [
                    'id' => $e->term_id,
                    'name' => $e->name,
                    'slug' => $e->slug,
                ];}, get_the_category()),
                'tags' => $tags?$tags:[],
            ]);
        }
    }
    $response = [
        'per_page' => $args['posts_per_page']+0,
        'next_page' => $args['posts_per_page']*$args['paged'] < $the_query->found_posts ? $args['paged']+1 : null,
        // 'all_out' => $args['posts_per_page']*$args['paged'] >= $the_query->found_posts,
        'articles' => $articles,
    ];
    return $response;
}
add_action( 'rest_api_init', function () {
  register_rest_route($GLOBALS['CustomEndpointBase'], '/articles', array(
    'methods' => 'GET',
    'callback' => 'custom_articles',
  ) );
} );
