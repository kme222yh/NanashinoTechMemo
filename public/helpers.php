<?php
function vite_assets(){
  // echo __DIR__ . '/index.html';
  $content = file_get_contents(__DIR__ . '/index.html');
  return $content;
}
