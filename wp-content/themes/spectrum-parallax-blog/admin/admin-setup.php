<?php

define('ADMIN_PATH', get_bloginfo('template_url') .'/admin/');

//////////////////////////////////////////////////////////////
// Theme - Admin Head
////////////////////////////////////////////////////////////

if($_REQUEST['page']=='tia-options') :

	add_action( 'admin_init', 'tia_admin_head' );
	
	function tia_admin_head() {		
		wp_register_script('tia-cookie', ADMIN_PATH .'admin-cookie.js', array('jquery'));
		wp_enqueue_script('tia-cookie');			
		wp_register_script('tia-ajax-upload', ADMIN_PATH .'scripts/ajaxupload.js', array('jquery'));
		wp_enqueue_script('tia-ajax-upload');
		wp_register_script('tia-admin-jquery', ADMIN_PATH .'admin-jquery.js', array('jquery'));
		wp_enqueue_script('tia-admin-jquery');
		wp_register_script('tia-color-picker', ADMIN_PATH .'scripts/colorpicker/js/colorpicker.js', array('jquery'));
		wp_enqueue_script('tia-color-picker');
		wp_register_script('tia-jquery-ui', ADMIN_PATH .'scripts/jquery-ui/js/jquery-ui-1.8.1.custom.min.js', array('jquery'));
		wp_enqueue_script('tia-jquery-ui');		
		wp_enqueue_style('tia-ui-lightness', ADMIN_PATH .'scripts/jquery-ui/css/ui-lightness/jquery-ui-1.8.1.custom.css', false, "1.0", "all");
		wp_enqueue_style('tia-options', ADMIN_PATH .'style.css', false, "1.0", "all");
		wp_enqueue_style('tia-color-picker', ADMIN_PATH .'scripts/colorpicker/css/colorpicker.css', false, "1.0", "all");		
	}

endif;



//////////////////////////////////////////////////////////////
// Theme - Admin Main Menu 
////////////////////////////////////////////////////////////

add_action('admin_menu', 'tia_create_menu');

function tia_create_menu() {

	global $tia_theme_name;
	add_menu_page($tia_theme_name.' Theme Settings', $tia_theme_name, 'administrator', 'tia-options', 'tia_options_page', ADMIN_PATH .'images/tia-admin-icon.png', 61);
		
}

?>