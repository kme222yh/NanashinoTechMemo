<?php
/*
Map the Vue Router only routes (src/router/index.js) to WordPress queries,
so that accessing them directly returns 200 (or a proper 404) instead of always 404.

  /search?s={word}         => search
  /archive/{year}/{month}  => monthly archive
*/
const NANASHI_REWRITE_VERSION = '1';


function nanashi_add_rewrite_rules() {
    add_rewrite_rule('^search/?$', 'index.php?nanashi_route=search', 'top');
    add_rewrite_rule('^archive/([0-9]{4})/([0-9]{1,2})/?$', 'index.php?year=$matches[1]&monthnum=$matches[2]&nanashi_route=archive', 'top');

    // flush once when the rules above change (also works right after deploying)
    if(get_option('nanashi_rewrite_version') !== NANASHI_REWRITE_VERSION){
        flush_rewrite_rules(false);
        update_option('nanashi_rewrite_version', NANASHI_REWRITE_VERSION);
    }
}
add_action('init', 'nanashi_add_rewrite_rules');


function nanashi_query_vars($vars) {
    $vars[] = 'nanashi_route';
    return $vars;
}
add_filter('query_vars', 'nanashi_query_vars');


// Keep the URL as it is. Otherwise WordPress redirects /archive/2022/11 to /2022/11/,
// which Vue Router does not know.
function nanashi_disable_canonical_redirect($redirect_url) {
    return get_query_var('nanashi_route') ? false : $redirect_url;
}
add_filter('redirect_canonical', 'nanashi_disable_canonical_redirect');
