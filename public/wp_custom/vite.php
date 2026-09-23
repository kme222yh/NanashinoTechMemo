<?php
/*
Enqueue the Vue app built by Vite.

- `npm run dev`   : dist/hot exists and contains the dev server origin, so load from it (HMR).
- `npm run build` : read dist/.vite/manifest.json and load the hashed files.
*/
const NANASHI_VITE_ENTRY = 'src/main.ts';


function nanashi_vite_dev_server() {
    $hot = get_theme_file_path('hot');
    return file_exists($hot) ? rtrim(trim(file_get_contents($hot)), '/') : null;
}


function nanashi_vite_manifest() {
    $path = get_theme_file_path('.vite/manifest.json');
    if(!file_exists($path))
        return null;
    return json_decode(file_get_contents($path), true);
}


function nanashi_vite_enqueue() {
    $devServer = nanashi_vite_dev_server();
    if($devServer){
        wp_enqueue_script_module('vite-client', $devServer.'/@vite/client', [], null);
        wp_enqueue_script_module('nanashinotechmemo', $devServer.'/'.NANASHI_VITE_ENTRY, [], null);
        return;
    }

    $manifest = nanashi_vite_manifest();
    $entry = $manifest[NANASHI_VITE_ENTRY] ?? null;
    if(!$entry){
        trigger_error('Vite manifest not found. Run `npm run build`.', E_USER_WARNING);
        return;
    }

    wp_enqueue_script_module('nanashinotechmemo', get_theme_file_uri($entry['file']), [], null);
    foreach($entry['css'] ?? [] as $index => $css){
        wp_enqueue_style('nanashinotechmemo-'.$index, get_theme_file_uri($css), [], null);
    }
}
add_action('wp_enqueue_scripts', 'nanashi_vite_enqueue');
