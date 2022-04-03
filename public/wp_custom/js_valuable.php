<?php
function js_valuable() {
	wp_enqueue_script( 'js_valuable', get_stylesheet_directory_uri().'/wp_assets/js/receive_wpVal.js', NULL, '', true );
    if(is_preview()){
        $content = apply_filters( 'the_content', get_the_content() );
		$content = str_replace( ']]>', ']]&gt;', $content );
        wp_localize_script('js_valuable', 'wp_preview', array(
            'id' => get_the_ID(),
            'title' => get_the_title(),
            'content' => $content,
            'date' => get_the_date(),
            'date_modified' => get_the_modified_date(),
            'media' => wp_get_attachment_image_src(get_post_thumbnail_id(), 'full')[0],
            'category' => get_the_category()[0]->cat_name,
            'category_slug' => get_the_category()[0]->slug,
            'tags' => $tags?$tags:[],
        ));
    }
}
add_action( 'wp_enqueue_scripts', 'js_valuable' );
