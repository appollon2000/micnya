<?php


/**
 * Enable Sort menu
 *
 * @return void
 * @author ThemeSpectrum
 **/
function themespectrum_enable_block_sort() {

		add_submenu_page('edit.php', 'Sort Home Page Blocks', 'Sort', 'edit_posts', basename(__FILE__), 'themespectrum_sort_blocks');

}
add_action('admin_menu' , 'themespectrum_enable_block_sort');


/**
 * Display Sort admin
 *
 * @return void
 * @author ThemeSpectrum
 **/
function themespectrum_sort_blocks() {
	$blocks = new WP_Query('post_type=post&posts_per_page=-1&orderby=menu_order&order=ASC');

	?>
	<div class="wrap">
		<h3>Sort Home Page Blocks <img src="<?php bloginfo('url'); ?>/wp-admin/images/loading.gif" id="loading-animation" /></h3>
		<p>Simply drag the items into the order you desire. No need to save, just go to the front when you are done.</p>
		<p><strong>Don't use the back button with this feature.</strong> -> <a href="<?php bloginfo('url'); ?>">View Site</a></p>
		<ul id="block-list">
			<?php while ( $blocks->have_posts() ) : $blocks->the_post(); ?>
				<li id="<?php the_id(); ?>"><?php the_title(); ?></li>
			<?php endwhile; ?>
	</div><!-- End div#wrap //-->

<?php
}

/**
 * Queue up administration JavaScript file
 *
 * @return void
 * @author ThemeSpectrum
 **/
function themespectrum_blocks_print_scripts() {
	global $pagenow;

	$pages = array('edit.php');
	if (in_array($pagenow, $pages)) {
		wp_enqueue_script('jquery-ui-sortable');
		wp_enqueue_script('themespectrum_blocks', get_bloginfo('template_url').'/scripts/sort/sort.js');
	}
}
add_action( 'admin_print_scripts', 'themespectrum_blocks_print_scripts' );


/**
 * Queue up administration CSS
 *
 * @return void
 * @author ThemeSpectrum
 **/
function themespectrum_blocks_print_styles() {
	global $pagenow;

	$pages = array('edit.php');
	if (in_array($pagenow, $pages))
		wp_enqueue_style('themespectrum_blocks', get_bloginfo('template_url').'/scripts/sort/sort.css');
}
add_action( 'admin_print_styles', 'themespectrum_blocks_print_styles' );


function themespectrum_save_block_order() {
	global $wpdb; // WordPress database class

	$order = explode(',', $_POST['order']);
	$counter = 0;

	foreach ($order as $block_id) {
		$wpdb->update($wpdb->posts, array( 'menu_order' => $counter ), array( 'ID' => $block_id) );
		$counter++;
	}
	die(1);
}
add_action('wp_ajax_block_sort', 'themespectrum_save_block_order');