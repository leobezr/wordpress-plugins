<?php
/*
Plugin Name: LeoPlugin
Description: Esse plugin serve de auxílio para o tema, não remova.
Author: Leonardo Bezerra
Author URI: https://www.linkedin.com/in/leonardo-bezerra-42a436123/
Version: 1.0.0
*/

add_action( 'wp_enqueue_scripts', 'get_js_files', 1 );
add_action( 'wp_enqueue_scripts','get_css_files');
add_action( 'wp_head', 'overlay' );


// TRIGGER FOR JS
function get_js_files() {
  $src = plugins_url('/assets/js/lib.js', __FILE__);
  wp_register_script( 'lib', $src );
  wp_enqueue_script( 'lib' );
  
  $src = plugins_url('/assets/js/file.js', __FILE__);
  wp_register_script( 'file', $src );
  wp_enqueue_script( 'file' );
  
  $src = plugins_url('./dist/all.js', __FILE__);
  wp_register_script( 'gulp', $src );
  wp_enqueue_script( 'gulp' );
}

// TRIGGER FOR CSS
function get_css_files() {
  wp_enqueue_style('style', plugins_url('assets/css/style.css' , __FILE__ ), array(), false, false);
  wp_enqueue_style('main', plugins_url('./dist/css/main.css' , __FILE__ ), array(), false, false);
}

function overlay(){
  include_once('loader.php');
}
