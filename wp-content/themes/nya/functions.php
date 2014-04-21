<?php
// Load utility functions
require_once (TEMPLATEPATH . '/admin/utilities.php');
  
// Load main options panel file  
require_once (TEMPLATEPATH . '/admin/options.php');

// Load external file to add support for MultiPostThumbnails. Allows you to set more than one "feature image" per post.
require_once('admin/multi-post-thumbnails.php');



// Define additional "post thumbnails". Relies on MultiPostThumbnails to work

// Determine Parallax Post Type
if(tia_get_option('tia_pages_enabled')){
   	$pPostType = 'page';
} else {
  	$pPostType = 'post';
}
if ($pPostType=='page') {
	require_once('includes/reorder-parallax-pages.php');
} else {
	require_once('includes/reorder-parallax-posts.php');
}


if( !is_admin()){
	wp_deregister_script('jquery');
	//wp_register_script('jquery', ("http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"), false, '1.3.2');
	//wp_enqueue_script('jquery');
}


//////////////////////////////////////////////////////////////
// Add/Change content in the Featured Image meta box
/////////////////////////////////////////////////////////////

add_filter( 'admin_post_thumbnail_html', 'add_change_featured_image_content');
function add_change_featured_image_content( $content ) {
    $content .= '<p><em>This sets your parallax background.</em></p>'; //
  	 
	return str_replace(__('Set featured image'), __('Set featured/background image'),$content);
}

//////////////////////////////////////////////////////////////
// Get Options
/////////////////////////////////////////////////////////////
	
function tia_get_option($key) {	
	global $tia_options;	
	$tia_options = get_option('tia_options');
	
	$tia_defaults = array(					
		'tia_theme_bkg' => 'white',
		'tia_default_height' => 700,
		'tia_scrolling_img_margin_top' => 117,
		'tia_story_margin_top' => 70
		
	);
	
	//Array of options not stored in tia_options array
	$not_in_array = array(		
		'tia_logo' => false		
	);
	
	if($not_in_array[$key]){
		if(!get_option($key)){
			$tia_options[$key] = $tia_defaults[$key];
		}
		else{
			$tia_options[$key] = get_option($key);
		}
	}else{			
		if (!$tia_options[$key]){		
			$tia_options[$key] = $tia_defaults[$key];			
		}
	}	
	return $tia_options[$key];
}  

//////////////////////////////////////////////////////////////
// Theme Header
/////////////////////////////////////////////////////////////
	
add_action('wp_enqueue_scripts', 'tia_scripts');

function tia_scripts() {

	wp_enqueue_script('jquery');
	wp_enqueue_script('superfish', get_bloginfo('template_url').'/scripts/superfish/superfish.js', array('jquery'), '1.4.8', true);
	wp_enqueue_script('supersubs', get_bloginfo('template_url').'/scripts/superfish/supersubs.js', array('jquery'), '1.4.8', true);
	wp_enqueue_style('superfish', get_bloginfo('template_url').'/scripts/superfish/superfish.css', false, '1.4.8', 'all' );	
	
	wp_enqueue_script('fancybox', get_bloginfo('template_url').'/scripts/fancybox/jquery.fancybox-1.3.4.pack.js', array('jquery'), '1.3.4', true);
	wp_enqueue_style('fancybox', get_bloginfo('template_url').'/scripts/fancybox/jquery.fancybox-1.3.4.css', false, '1.3.4', 'all' );

	wp_enqueue_style('collapse', get_bloginfo('template_url').'/css/collapse.css', false, '', 'all' );
	wp_enqueue_script('collapse', get_bloginfo('template_url').'/scripts/bootstrap.min.js', array('jquery'), '', true);

}

add_action('wp_head','tia_theme_head');

function tia_theme_head() { ?>
<meta name="generator" content="<?php global $tia_theme, $tia_version; echo $tia_theme.' '.$tia_version; ?>" />
<?php $heading_font = tia_get_option('tia_header_font'); ?>
	<?php $button_font = tia_get_option('tia_button_font'); ?>
	<?php $body_font = tia_get_option('tia_body_font'); ?>
<style type="text/css" media="screen">
<?php if(tia_get_option('tia_css')) : echo tia_get_option('tia_css'); endif; ?>
<?php if(tia_get_option('tia_color_title')) : ?>
	.black #header h1 a, #header h1 a, #content h1 a {color: #<?php echo(tia_get_option('tia_color_title')); ?>;} 
<?php endif; ?>
<?php if(tia_get_option('tia_color_title_shadow')) : ?>
	#header h1, .black #header h1 {text-shadow: 2px 2px 2px #<?php echo(tia_get_option('tia_color_title_shadow')); ?>;} 
<?php endif; ?>
<?php if(tia_get_option('tia_color_title_hover')) : ?>
	.black #header h1 a:hover, #header h1 a:hover, #content h1 a:hover {color: #<?php echo(tia_get_option('tia_color_title_hover')); ?>;} 
<?php endif; ?>
<?php if(tia_get_option('tia_color_menu')) : ?>
	#mainNav li a, .black #mainNav a {color: #<?php echo(tia_get_option('tia_color_menu')); ?>;} 
	#mainNav .sf-menu li li a {color: #<?php echo(tia_get_option('tia_color_menu')); ?>;}
<?php endif; ?>
<?php if(tia_get_option('tia_color_menu_hover')) : ?>
	#mainNav li a:hover, .black #mainNav a:hover, #mainNav li.current-menu-item a {color: #<?php echo(tia_get_option('tia_color_menu_hover')); ?>;} 
	#mainNav .sf-menu li li a:hover {color: #<?php echo(tia_get_option('tia_color_menu_hover')); ?>;}
<?php endif; ?>
#content .button, #sidebar .button, #footer .button, #searchsubmit {
<?php if(tia_get_option('tia_color_content_btn')) : ?>background-color: #<?php echo(tia_get_option('tia_color_content_btn')); ?> !important;}<?php endif; ?>
<?php if(tia_get_option('tia_color_content_btn_hover')) : ?>.button:hover, #searchsubmit:hover {background-color: #<?php echo(tia_get_option('tia_color_content_btn_hover')); ?> !important;<?php endif; ?> <?php if (tia_get_option('tia_button_font')) { echo 'font-family: \''. $button_font . '\';'; } ?>}


<?php if(tia_get_option('tia_color_body_link')) : ?>#content a, #sidebar p a {color: #<?php echo(tia_get_option('tia_color_body_link')); ?>;}<?php endif; ?>
<?php if(tia_get_option('tia_color_body_link_hover')) : ?>#content a:hover, #sidebar p a:hover {color: #<?php echo(tia_get_option('tia_color_body_link_hover')); ?>;}<?php endif; ?>
<?php if(tia_get_option('tia_link_color')) : ?>#content a {color:<?php echo(tia_get_option('tia_link_color')); ?> }<?php endif; ?>

<?php if (tia_get_option('tia_header_font')) : ?>
#header h1, h1, h2, h3, h4, h5, h6, .pixelsscrolled span#pixels { font-family: '<?php echo $heading_font; ?>'; }
<?php endif; ?>

<?php if (tia_get_option('tia_body_font')) : ?>
	body, .pixelsscrolled, #mainNav  { font-family: '<?php echo $body_font; ?>'; }
<?php endif; ?>

</style>

<!--[if IE]>
<link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/css/ie.css" type="text/css" media="screen" />
<![endif]-->
<!--[if IE 7]>
<link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/css/ie7.css" type="text/css" media="screen" />
<![endif]-->

<style type="text/css" media="screen">


<?php if(tia_get_option('tia_menuTitles_enabled')) { ?>
#content #nav li a {
<?php if(tia_get_option('tia_color_menu_parallax')) : ?>
	color: #<?php echo(tia_get_option('tia_color_menu_parallax')); ?>;
<?php endif; ?>
	background:#ddd;
	width: 150px;
	overflow:hidden;
	display:block;
	border: 1px solid #aaa;
	padding: 5px;
	font-size: 11px;
}

/************************************************************************************
smaller than 1300
*************************************************************************************/
@media screen and (max-width: 1300px) {

#content .story, .inside { margin:0; width:85%; min-width:85% }

#header {margin:5px 45px}

}

/************************************************************************************
smaller than 1180
*************************************************************************************/
@media screen and (max-width: 1180px) {
#content .story .bg {max-width: 35%}
}

/************************************************************************************
smaller than 950
*************************************************************************************/
@media screen and (max-width: 950px) {
#content .story .bg {max-width: 40%}
}



<?php } else { ?>
#content #nav li a {
<?php if(tia_get_option('tia_color_menu_parallax')) : ?>
	color: #<?php echo(tia_get_option('tia_color_menu_parallax')); ?>;
<?php endif; ?>
	background:#ddd;
	text-indent: -999em;
	width: 15px;
	height: 15px;
	display:block;
	border: 1px solid #aaa;
}

<?php } ?>

#content #nav li a:hover, #content #nav li a.active {
	<?php if(tia_get_option('tia_color_menu_parallax_hover')) { ?>
		background:#<?php echo(tia_get_option('tia_color_menu_parallax_hover')); ?>;
	<?php } else { ?>
		background:#222;
	<?php } 
	 if(tia_get_option('tia_color_menu_parallax_text_hover')) { ?>
		color:#<?php echo(tia_get_option('tia_color_menu_parallax_text_hover')); ?>;
	<?php } else { ?>
	color:#999;
	<?php } ?>	
}

	<?php echo(tia_get_option('tia_custom_css')); ?>
</style>

<?php echo "\n".tia_get_option('tia_analytics')."\n"; ?>

<?php }

//////////////////////////////////////////////////////////////
// Custom Background Support
/////////////////////////////////////////////////////////////

if(function_exists('add_custom_background')) add_custom_background();



//////////////////////////////////////////////////////////////
// Theme Footer
/////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////
// Remove
/////////////////////////////////////////////////////////////

// #more from more-link
function tia_remove($content) {
	global $id;
	return str_replace('#more-'.$id.'"', '"', $content);
}
add_filter('the_content', 'tia_remove');

//////////////////////////////////////////////////////////////
// Pagination Styles
/////////////////////////////////////////////////////////////

add_action( 'wp_print_styles', 'tia_deregister_styles', 100 );
function tia_deregister_styles() {
	wp_deregister_style( 'wp-pagenavi' );
}
remove_action('wp_head', 'pagenavi_css');
remove_action('wp_print_styles', 'pagenavi_stylesheets');


//////////////////////////////////////////////////////////////
// Navigation Menus
/////////////////////////////////////////////////////////////

add_theme_support('menus');
register_nav_menu('main', 'Main Navigation Menu');

function default_nav() {
	require_once (TEMPLATEPATH . '/includes/default_nav.php');
}



//////////////////////////////////////////////////////////////
// Feature Images (Post Thumbnails)
/////////////////////////////////////////////////////////////

add_theme_support('post-thumbnails');

set_post_thumbnail_size(100, 100, true);
add_image_size('tia_small', 150, 150, true);
add_image_size('tia_med', 245, 200, true);
add_image_size('tia_main_feature', 515, 400, true);
add_image_size('tia_extra_feature', 500, 700);
add_image_size('tia_background', 3000, 3000, true);
add_image_size('tia_footer', 90, 90, true);

require_once (TEMPLATEPATH . '/admin/widgets.php');


//////////////////////////////////////////////////////////////
// Button Shortcode
/////////////////////////////////////////////////////////////

function tia_button($a) {
	extract(shortcode_atts(array(
		'label' 	=> 'Button Text',
		'url'	=> '',
		'id' 	=> '1',		
		'target' => '',		
		'size'	=> ''
	), $a));
	
	$link = $url ? $url : get_permalink($id);	
	
	return '<a href="'.$link.'"target="'.$target.'" class="button '.$size.'">'.$label.'</a>';
	
}

add_shortcode('button', 'tia_button');


//////////////////////////////////////////////////////////////
// Enable Shortcodes
/////////////////////////////////////////////////////////////
//add_filter( 'slideshow_text', 'do_shortcode', 11 );
//add_filter( 'the_content', 'do_shortcode', 11 );

// columns
//Long posts should require a higher limit, see http://core.trac.wordpress.org/ticket/8553
@ini_set('pcre.backtrack_limit', 500000);

function themespectrum_formatter($content) {
	$new_content = '';

	/* Matches the contents and the open and closing tags */
	$pattern_full = '{(\[raw\].*?\[/raw\])}is';

	/* Matches just the contents */
	$pattern_contents = '{\[raw\](.*?)\[/raw\]}is';

	/* Divide content into pieces */
	$pieces = preg_split($pattern_full, $content, -1, PREG_SPLIT_DELIM_CAPTURE);

	/* Loop over pieces */
	foreach ($pieces as $piece) {
		/* Look for presence of the shortcode */
		if (preg_match($pattern_contents, $piece, $matches)) {

			/* Append to content (no formatting) */
			$new_content .= $matches[1];
		} else {

			/* Format and append to content */
			$new_content .= wptexturize(wpautop($piece));
		}
	}

	return $new_content;
}

// Remove the 2 main auto-formatters
remove_filter('the_content', 'wpautop');
remove_filter('the_content', 'wptexturize');

// Before displaying for viewing, apply this function
add_filter('the_content', 'themespectrum_formatter', 99);
add_filter('widget_text', 'themespectrum_formatter', 99);

function themespectrum_one_third( $atts, $content = null ) {
   return '<p class="one_third">' . do_shortcode($content) . '</p>';
}
add_shortcode('one_third', 'themespectrum_one_third');

function themespectrum_one_third_last( $atts, $content = null ) {
   return '<p class="one_third last">' . do_shortcode($content) . '</p><p class="clearboth">&nbsp;</p>';
}
add_shortcode('one_third_last', 'themespectrum_one_third_last');

function themespectrum_two_third( $atts, $content = null ) {
   return '<div class="two_third">' . do_shortcode($content) . '</div>';
}
add_shortcode('two_third', 'themespectrum_two_third');

function themespectrum_two_third_last( $atts, $content = null ) {
   return '<div class="two_third last">' . do_shortcode($content) . '</div><div class="clearboth"></div>';
}
add_shortcode('two_third_last', 'themespectrum_two_third_last');

function themespectrum_one_half( $atts, $content = null ) {
   return '<p class="one_half">' . do_shortcode($content) . '</p>';
}
add_shortcode('one_half', 'themespectrum_one_half');

function themespectrum_one_half_last( $atts, $content = null ) {
   return '<p class="one_half last">' . do_shortcode($content) . '</p><p class="clearboth">&nbsp;</p>';
}
add_shortcode('one_half_last', 'themespectrum_one_half_last');

function themespectrum_one_fourth( $atts, $content = null ) {
   return '<div class="one_fourth">' . do_shortcode($content) . '</div>';
}
add_shortcode('one_fourth', 'themespectrum_one_fourth');

function themespectrum_one_fourth_last( $atts, $content = null ) {
   return '<div class="one_fourth last">' . do_shortcode($content) . '</div><div class="clearboth"></div>';
}
add_shortcode('one_fourth_last', 'themespectrum_one_fourth_last');

function themespectrum_three_fourth( $atts, $content = null ) {
   return '<div class="three_fourth">' . do_shortcode($content) . '</div>';
}
add_shortcode('three_fourth', 'themespectrum_three_fourth');

function themespectrum_three_fourth_last( $atts, $content = null ) {
   return '<div class="three_fourth last">' . do_shortcode($content) . '</div><div class="clearboth"></div>';
}
add_shortcode('three_fourth_last', 'themespectrum_three_fourth_last');

function themespectrum_one_fifth( $atts, $content = null ) {
   return '<div class="one_fifth">' . do_shortcode($content) . '</div>';
}
add_shortcode('one_fifth', 'themespectrum_one_fifth');

function themespectrum_one_fifth_last( $atts, $content = null ) {
   return '<div class="one_fifth last">' . do_shortcode($content) . '</div><div class="clearboth"></div>';
}
add_shortcode('one_fifth_last', 'themespectrum_one_fifth_last');

function themespectrum_two_fifth( $atts, $content = null ) {
   return '<div class="two_fifth">' . do_shortcode($content) . '</div>';
}
add_shortcode('two_fifth', 'themespectrum_two_fifth');

function themespectrum_two_fifth_last( $atts, $content = null ) {
   return '<div class="two_fifth last">' . do_shortcode($content) . '</div><div class="clearboth"></div>';
}
add_shortcode('two_fifth_last', 'themespectrum_two_fifth_last');

function themespectrum_three_fifth( $atts, $content = null ) {
   return '<div class="three_fifth">' . do_shortcode($content) . '</div>';
}
add_shortcode('three_fifth', 'themespectrum_three_fifth');

function themespectrum_three_fifth_last( $atts, $content = null ) {
   return '<div class="three_fifth last">' . do_shortcode($content) . '</div><div class="clearboth"></div>';
}
add_shortcode('three_fifth_last', 'themespectrum_three_fifth_last');

function themespectrum_four_fifth( $atts, $content = null ) {
   return '<div class="four_fifth">' . do_shortcode($content) . '</div>';
}
add_shortcode('four_fifth', 'themespectrum_four_fifth');

function themespectrum_four_fifth_last( $atts, $content = null ) {
   return '<div class="four_fifth last">' . do_shortcode($content) . '</div><div class="clearboth"></div>';
}
add_shortcode('four_fifth_last', 'themespectrum_four_fifth_last');

function themespectrum_one_sixth( $atts, $content = null ) {
   return '<div class="one_sixth">' . do_shortcode($content) . '</div>';
}
add_shortcode('one_sixth', 'themespectrum_one_sixth');

function themespectrum_one_sixth_last( $atts, $content = null ) {
   return '<div class="one_sixth last">' . do_shortcode($content) . '</div><div class="clearboth"></div>';
}
add_shortcode('one_sixth_last', 'themespectrum_one_sixth_last');

function themespectrum_five_sixth( $atts, $content = null ) {
   return '<div class="five_sixth">' . do_shortcode($content) . '</div>';
}
add_shortcode('five_sixth', 'themespectrum_five_sixth');

function themespectrum_five_sixth_last( $atts, $content = null ) {
   return '<div class="five_sixth last">' . do_shortcode($content) . '</div><div class="clearboth"></div>';
}
add_shortcode('five_sixth_last', 'themespectrum_five_sixth_last');



//////////////////////////////////////////////////////////////
// Custom More Link
/////////////////////////////////////////////////////////////

function more_link() {
	global $post;	
	if (strpos($post->post_content, '<!--more-->')) :
		$more_link = '<p><a href="'.get_permalink().'"  class="'.$size.'" title="'.get_the_title().'">';
		$more_link .= '<span>Read More...</span>';
		$more_link .= '</a></p>';
		echo $more_link;
	endif;
}


//////////////////////////////////////////////////////////////
// Post/Page Meta Boxes
/////////////////////////////////////////////////////////////

//include the main class file
require_once("meta-box-class/my-meta-box-class.php");
if (is_admin()){

  $prefix = '_tia_';
  
  // configure side meta box
  $configSide = array(
    'id' => 'side_meta_box',          // meta box id, unique per meta box
    'title' => 'Parallax Background Options',          // meta box title
    'pages' => array($pPostType),      // post types, accept custom post types as well, default is array('post'); optional
    'context' => 'side',            // where the meta box appear: normal (default), advanced, side; optional
    'priority' => 'low',            // order of meta box: high (default), low; optional
    'fields' => array(),            // list of meta fields (can be added by field arrays)
    'local_images' => false,          // Use local or hosted images (meta box images for add/remove)
    'use_with_theme' => true          //change path if used with theme set to true, false for a plugin or anything else for a custom path(default false).
  );

  $my_meta_side =  new AT_Meta_Box($configSide);
  
  //checkbox field
  $my_meta_side->addCheckbox($prefix.'lb_repeat_value',array('name'=> 'Repeat background image.'));
  
  //Color field
  $my_meta_side->addColor($prefix.'lb_bgcolor_value',array('name'=> 'Background Color '));
  
  $my_meta_side->Finish();
   
   
   // configure meta box
  $config = array(
    'id' => 'parallax_meta_box',          // meta box id, unique per meta box
    'title' => 'Parallax Options',          // meta box title
    'pages' => array($pPostType),      // post types, accept custom post types as well, default is array('post'); optional
    'context' => 'normal',            // where the meta box appear: normal (default), advanced, side; optional
    'priority' => 'high',            // order of meta box: high (default), low; optional
    'fields' => array(),            // list of meta fields (can be added by field arrays)
    'local_images' => false,          // Use local or hosted images (meta box images for add/remove)
    'use_with_theme' => true          //change path if used with theme set to true, false for a plugin or anything else for a custom path(default false).
  );
  
  $my_meta =  new AT_Meta_Box($config);
  
  //radio field
  $my_meta->addRadio($prefix.'post_alignment_value',array('float-left'=>'Align Left','center'=>'Align Center','float-right'=>'Align Right'),array('name'=> 'Choose the alignment of the Parallax text block for this post.', 'std'=> array('float-left')));

  //checkbox field
  $my_meta->addCheckbox($prefix.'no_text_background_value',array('name'=> 'Check this box to hide the background box for this post.'));
  
  //Color field
  $my_meta->addColor($prefix.'block_text_color_value',array('name'=> 'Change the color of the Parallax text for this post.'));
  
    //Color field
  $my_meta->addColor($prefix.'override_anchor_color_value',array('name'=> 'Override the anchor/link color for this post.'));

  //Finish Meta Box Decleration
  $my_meta->Finish();

}

if (class_exists('MultiPostThumbnails')) {
   new MultiPostThumbnails(array(
        'label' => 'Extra Scrolling Image 1',
        'id' => 'extra-scrolling-image', //-1 <- add this back later to allow multiple scrolling images
        'post_type' => $pPostType
        )
    );
//   new MultiPostThumbnails(array(
//        'label' => 'Extra Scrolling Image 2',
//        'id' => 'extra-scrolling-image-2',
//        'post_type' => $pPostType
//        )
//    );
      
 
};

//////////////////////////////////////////////////////////////
// Comments
/////////////////////////////////////////////////////////////

function tia_comments($comment, $args, $depth) {
	$GLOBALS['comment'] = $comment; ?>		
	<li id="li-comment-<?php comment_ID() ?>">
		<div class="comment" id="comment-<?php comment_ID() ?>">			
			
			<?php echo get_avatar($comment,'80',get_bloginfo('template_url').'/images/default_avatar.png'); ?>			
   	   			
   	   		<h5><?php comment_author_link(); ?></h5>
			<span class="date"><?php comment_date(); ?></span>
				
			<?php if ($comment->comment_approved == '0') : ?>
				<p><span class="message">Your comment is awaiting moderation.</span></p>
			<?php endif; ?>
				
			<?php comment_text() ?>				
				
			<?php comment_reply_link(array_merge( $args, array('add_below' => 'comment','reply_text' => '<span>Reply</span>', 'login_text' => '<span>Log in to Reply</span>', 'depth' => $depth, 'max_depth' => $args['max_depth']))) ?>
				
		</div><!-- end comment -->
			
<?php
}

function tia_pings($comment, $args, $depth) {
	$GLOBALS['comment'] = $comment; ?>
		<li <?php comment_class(); ?> id="comment-<?php comment_ID() ?>"><?php comment_author_link(); ?> - <?php comment_excerpt(); ?>
<?php
}


?>