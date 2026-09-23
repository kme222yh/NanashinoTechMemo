<?php
function js_valuable() {
	wp_enqueue_script( 'js_valuable', get_stylesheet_directory_uri().'/wp_assets/js/receive_wpVal.js', NULL, '', true );
    if(is_preview()){
        $tags = array_map(function($e){return $e->name;}, get_the_tags() ?: []);
        $content = apply_filters( 'the_content', get_the_content() );
		$content = str_replace( ']]>', ']]&gt;', $content );
        wp_localize_script('js_valuable', 'wp_preview', array(
            'id' => get_the_ID(),
            'title' => get_the_title(),
            'content' => $content,
            'date' => get_the_date(),
            'date_modified' => get_the_modified_date(),
            'media' => get_the_post_thumbnail_url(null, 'full') ?: null,
            'category' => (get_the_category()[0] ?? null)?->cat_name,
            'category_slug' => (get_the_category()[0] ?? null)?->slug,
            'tags' => $tags,
        ));
    }
}
add_action( 'wp_enqueue_scripts', 'js_valuable' );
