<?php
/*
This file loads all endpoints file.
Each other files placed current directory configures one endpoint.
*/


// This is base url of custom endpoints.
$CustomEndpointBase = '/nanashinotechmemo/v1';


// loading other file.
$files = glob(__DIR__.'/*');
foreach ($files as $file) {
    $file = basename($file);
    if($file !== basename(__FILE__)){
        require_once($file);
    }
}
