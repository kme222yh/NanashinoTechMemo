<?php
add_theme_support('post-thumbnails');
// add_theme_support('menus');





// wp_head, wp_footerの出力内容を変更
// remove_action( 'wp_head', 'rest_output_link_wp_head' );
// remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
// remove_action( 'wp_head', 'wp_oembed_add_host_js' );
function twpp_deregister_scripts() {
	wp_deregister_script( 'hcb_prism_script' );
	wp_deregister_script('hcb_script');
}
add_action( 'wp_enqueue_scripts', 'twpp_deregister_scripts', 100 );








// ウィジェットの設定
// https://pera-lab.com/archives/853
add_action( 'widgets_init',
	function(){
		register_sidebar(array(
			'id' => 'footer',
			'name' => 'フッターに表示するウィジェット',
			'description' => 'Twitterとかサイト説明とか　２カラムです！！',
		));
	}
);








// https://wemo.tech/2163
// ブロックエディタにカスタムブロックを追加
function add_my_assets_to_block_editor(){
    wp_enqueue_script( 'block-custom', get_stylesheet_directory_uri() . '/assets/js/block_custom.js',array(), "", true);
	// wp_enqueue_script( 'block-custom', get_stylesheet_directory_uri() . '/assets/js/block_custom.js',array(), "", true);
}
add_action( 'enqueue_block_editor_assets', 'add_my_assets_to_block_editor' );









// https://wpdocs.osdn.jp/%E9%96%A2%E6%95%B0%E3%83%AA%E3%83%95%E3%82%A1%E3%83%AC%E3%83%B3%E3%82%B9/WP_Query
// https://www.webdesignleaves.com/pr/wp/wp_func_loop.html
// custom endpoints

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
        'posts_per_page' => isset($params['per_page'])?$params['per_page']:'20',
        'paged' => isset($params['page'])?$params['page']:'1',
        'category_name' => isset($params['category'])?$params['category']:'',
        'tag' => isset($params['tag'])?$params['tag']:'',
        's' => isset($params['search'])?$params['search']:'',
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
        'next_page' => $args['paged']+1,
        'all_out' => $args['posts_per_page']*$args['paged'] >= $the_query->found_posts,
        'articles' => $articles,
    ];
    return $response;
}
add_action( 'rest_api_init', function () {
  register_rest_route( 'vendor/v1', '/articles', array(
    'methods' => 'GET',
    'callback' => 'custom_articles',
  ) );
} );


/*
/wp-json/vendor/v1/article
*/
function custom_article( WP_REST_Request $request ) {
    $the_query = new WP_Query(['p' => $request['id'],]);
    if($the_query->have_posts()){
        $the_query->the_post();
        $tags = array_map(function($e){return $e->name;}, get_the_tags());
		$content = apply_filters( 'the_content', get_the_content() );
		$content = str_replace( ']]>', ']]&gt;', $content );
        $response = [
            'id' => get_the_ID(),
            'title' => get_the_title(),
			'content' => $content,
            'date' => get_the_date(),
			'date_modified' => get_the_modified_date(),
            'media' => wp_get_attachment_image_src(get_post_thumbnail_id(), 'full')[0],
            'category' => get_the_category()[0]->cat_name,
            'tags' => $tags?$tags:[],
        ];
    }
    return $response;
}
add_action( 'rest_api_init', function () {
  register_rest_route( 'vendor/v1', '/article/(?P<id>\d+)', array(
    'methods' => 'GET',
    'callback' => 'custom_article',
  ) );
} );


/*
/wp-json/vendor/v1/about
*/
function custom_about( WP_REST_Request $request ) {
    $the_query = new WP_Query(['pagename' => 'about',]);
    if($the_query->have_posts()){
        $the_query->the_post();
        $tags = array_map(function($e){return $e->name;}, get_the_tags());
		$content = apply_filters( 'the_content', get_the_content() );
		$content = str_replace( ']]>', ']]&gt;', $content );
        $response = [
            'id' => get_the_ID(),
            'title' => get_the_title(),
			'content' => $content,
            'date' => get_the_date(),
			'date_modified' => get_the_modified_date(),
            'media' => wp_get_attachment_image_src(get_post_thumbnail_id(), 'full')[0],
            'category' => get_the_category()[0]->cat_name,
            'tags' => $tags?$tags:[],
        ];
    }
    return $response;
}
add_action( 'rest_api_init', function () {
  register_rest_route( 'vendor/v1', '/about', array(
    'methods' => 'GET',
    'callback' => 'custom_about',
  ) );
} );




function custom_widget_footer( WP_REST_Request $request ) {
	ob_start();         //出力バッファリングを有効にする
	dynamic_sidebar( 'footer' );
	$response = ob_get_contents();   // 変数に代入
	ob_end_clean();
    return $response;
}
add_action( 'rest_api_init', function () {
  register_rest_route( 'vendor/v1', '/widget/footer', array(
    'methods' => 'GET',
    'callback' => 'custom_widget_footer',
  ) );
} );
