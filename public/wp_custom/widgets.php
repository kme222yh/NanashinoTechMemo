<?php

// refer to : https://pera-lab.com/archives/853
add_action( 'widgets_init',
	function(){
		register_sidebar(array(
			'id' => 'footer',
			'name' => 'フッターに表示するウィジェット',
			'description' => '3 columns',
		));
	}
);



function custom_get_widget_by_id($id) {
	ob_start();                    // enable output buffering
	dynamic_sidebar($id);
	$response = ob_get_contents(); // obtain widgets from buffer
	ob_end_clean();
    return $response;
}
