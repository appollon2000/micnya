<?php

/* ///////////////////////////////////////////////////////////////////// 
//  Define Widgetized Areas
/////////////////////////////////////////////////////////////////////*/


register_sidebar(array(
	'name' => 'Sidebar',
	'id' => 'sidebar',
	'description' => 'Default Sidebar Widget.',
	'before_widget' => '<div id="%1$s" class="oneThird %2$s sidebarBox widgetBox clearfix">',
	'after_widget' => '</div>',
	'before_title' => '<h3>',
	'after_title' => '</h3>'
));

register_sidebar(array(
	'name' => 'Footer',
	'id' => 'footer_default',
	'description' => 'Default Footer Widget.',
	'before_widget' => '<div id="%1$s" class="oneThird %2$s footerBox widgetBox">',
	'after_widget' => '</div>',
	'before_title' => '<h3>',
	'after_title' => '</h3>'
));

register_sidebar(array(
	'name' => 'Single Post Top',
	'id' => 'post_top',
	'description' => 'Use this widget to include ads, widgets, etc. in the top of your posts, just below your feature pic, headline and author info.',
	'before_widget' => '<div id="%1$s" class="">',
	'after_widget' => '</div>',
	'before_title' => '<h3>',
	'after_title' => '</h3>'
));

register_sidebar(array(
	'name' => 'Single Post Bottom',
	'id' => 'post_bottom',
	'description' => 'Use this widget to include ads, widgets, etc. in the bottom of your posts, above the comments area.',
	'before_widget' => '<div id="%1$s" class="">',
	'after_widget' => '</div>',
	'before_title' => '<h3>',
	'after_title' => '</h3>'
));

register_sidebar(array(
	'name' => 'Home Page Footer',
	'id' => 'footer_home',
	'description' => 'Use this widget to customize the home page footer.',
	'before_widget' => '<div id="%1$s" class="oneThird %2$s footerBox widgetBox">',
	'after_widget' => '</div>',
	'before_title' => '<h3>',
	'after_title' => '</h3>'
));



/* Allow widgets to use shortcodes */
add_filter('widget_text', 'do_shortcode');



/*///////////////////////////////////////////////////////////////////// 
//  Recent Posts
/////////////////////////////////////////////////////////////////////*/

class tia_Recent_Posts extends WP_Widget {

	function tia_Recent_Posts() {
		global $tia_theme_name, $tia_version, $options;
		$widget_ops = array('classname' => 'tia_recent_posts', 'description' => 'Display recent posts from any category.' );
		$this->WP_Widget('tia_recent_posts', $tia_theme_name.' '.' Recent Post Image', $widget_ops);
	}

	function widget($args, $instance) {
	
		global $tia_theme_name, $options;
	
		ob_start();
		extract($args);

		$title = apply_filters('widget_title', empty($instance['title']) ? 'Recent Posts' : $instance['title']);
		if ( !$number = (int) $instance['number'] )
			$number = 10;
		else if ( $number < 1 )
			$number = 1;
		else if ( $number > 10 )
			$number = 10;
			
		$rp_cat = $instance['rp_cat'];
		$show_post = $instance['show_post'];		 

		$r = new WP_Query(array('cat' => $rp_cat, 'showposts' => $number, 'nopaging' => 0, 'post_status' => 'publish', 'caller_get_posts' => 1));
		if ($r->have_posts()) :
?>	

		<?php if(tia_get_option('tia_rss')) :
			$tia_feed = tia_get_option('tia_rss');		
		else :
			$tia_feed = $rp_cat ? get_category_feed_link($rp_cat, '') : get_bloginfo('rss2_url'); 
		endif;
		?>
	
		<?php if($show_post == "true") :?>
			
			
			<?php echo $before_title . $title . $after_title; ?>
			
				<?php  while ($r->have_posts()) : $r->the_post(); ?>
				
				<div class="recentSidebarPost">
					<span class="meta"><?php the_time(get_option('date_format')); ?></span>
                    <h2><a href="<?php the_permalink() ?>" title="<?php echo esc_attr(get_the_title() ? get_the_title() : get_the_ID()); ?>"><?php if ( get_the_title() ) the_title(); else the_ID(); ?> </a></h2>
				</div>
				
				<?php $i++; endwhile; ?>
				<div class="feedLink"><a  href="<?php echo $tia_feed; ?>">Subscribe</a></div>
			<?php echo $after_widget; ?>
			
		<?php else : ?>
			<?php echo $before_widget; ?>
			<?php echo $before_title . $title . $after_title; ?>
		
			<ul class="recentPostsSidebar">
				<?php  while ($r->have_posts()) : $r->the_post(); ?>
				<li>
					<a href="<?php the_permalink() ?>" title="<?php echo esc_attr(get_the_title() ? get_the_title() : get_the_ID()); ?>">
					<?php if (has_post_thumbnail()) : ?>
					<?php the_post_thumbnail('tia_footer', array('style' => ''.$style.'','alt' => ''.get_the_title().'', 'title' => ''.get_the_title().'')); ?>
					<?php else :?>
                    <img src="<?php bloginfo('template_directory') ?>/images/no_thumb_xsmall.jpg" />
                    <?php endif; ?>
                    </a>
				</li>
				<?php endwhile; ?>
			</ul>
			<?php echo $after_widget; ?>
		
		<?php endif; ?>
<?php
			wp_reset_query();  
		endif;
	}

	function update( $new_instance, $old_instance ) {
		$instance = $old_instance;
		$instance['title'] = strip_tags($new_instance['title']);
		$instance['number'] = (int) $new_instance['number'];
		$instance['rp_cat'] = $new_instance['rp_cat'];
		$instance['show_post'] = $new_instance['show_post'];

		return $instance;
	}

	function form( $instance ) {
		$title = isset($instance['title']) ? esc_attr($instance['title']) : 'Recent Posts';
		if ( !isset($instance['number']) || !$number = (int) $instance['number'] )
			$number = 5;
			
		$rp_cat = $instance['rp_cat'];
		$show_post = $instance['show_post'];

		$pn_categories_obj = get_categories('hide_empty=0');
		$pn_categories = array(); ?>

		<p><label for="<?php echo $this->get_field_id('title'); ?>">Title:</label>
		<input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo $title; ?>" /></p>
		<p><label for="<?php echo $this->get_field_id('rp_cat'); ?>">Category</label>
		<select class="widefat" id="<?php echo $this->get_field_id('rp_cat'); ?>" name="<?php echo $this->get_field_name('rp_cat'); ?>">
			<option value="">All</option>
			<?php foreach ($pn_categories_obj as $pn_cat) {				
				echo '<option value="'.$pn_cat->cat_ID.'" '.selected($pn_cat->cat_ID, $rp_cat).'>'.$pn_cat->cat_name.'</option>';
			} ?>
		</select></p>
		
		<!-- Add option al sidebar look and feel
		<p><input id="<?php echo $this->get_field_id('show_post'); ?>" name="<?php echo $this->get_field_name('show_post'); ?>" type="checkbox" value="true" <?php if($show_post=="true") echo "checked"; ?>/>
		<label for="<?php echo $this->get_field_id('show_post'); ?>">Disable Images</label><br /></p>-->

		<p><label for="<?php echo $this->get_field_id('number'); ?>">Number of posts:</label>
		<input id="<?php echo $this->get_field_id('number'); ?>" name="<?php echo $this->get_field_name('number'); ?>" type="text" value="<?php echo $number; ?>" size="3" /><br />
		<small>10 is the maximum</small></p>
<?php
	}
}

register_widget('tia_Recent_Posts');




/*///////////////////////////////////////////////////////////////////// 
//  Scroll Pixels
/////////////////////////////////////////////////////////////////////*/

class tia_Pixelscroll extends WP_Widget {
 
	function tia_Pixelscroll() {
	
		global $tia_theme_name, $tia_version, $options;
		
        $widget_ops = array('classname' => 'widget_tia_pixelscroll', 'description' => 'Display Pixels Scrolled.');
		$this->WP_Widget('tia_pixelscroll', $tia_theme_name.' '.'Pixelscroll', $widget_ops);
    
    }
 
    function widget($args, $instance) {
    
    	global $tia_theme_name, $tia_version, $options;
       
        extract( $args );
        
        $title	= empty($instance['title']) ? '' : $instance['title'];
        $label	= empty($instance['pixelscroll_label']) ? 'You Have Scrolled' : $instance['pixelscroll_label'];
		$labeltoo	= $instance['pixelscrolltoo_label'];
       
 
        ?>
			<?php echo $before_widget; ?>
				<?php echo $before_title . $title . $after_title; ?>
                  
                <p class="pixelsscrolled">  
                <?php if($label) : ?>
                <span class="pixelscrollOne"><?php echo $label; ?></span>
                <?php endif; ?>
                <span class="pixelscrollMid"><span id="pixels">0</span> pixels</span>
                <?php if($labeltoo) : ?>
                <span class="pixelscrollTwo"><?php echo $labeltoo; ?></span>
                <?php endif; ?>
                </p>
 
			<?php echo $after_widget; ?>
        <?php
    }

    function update($new_instance, $old_instance) {  
    
    	$instance['title'] = strip_tags($new_instance['title']);
    	$instance['pixelscroll_label'] = strip_tags($new_instance['pixelscroll_label']);
		$instance['pixelscrolltoo_label'] = strip_tags($new_instance['pixelscrolltoo_label']);
                  
        return $new_instance;
    }
 
    function form($instance) {
    
    	global $tia_theme_name, $tia_version, $options;
        
		$instance	= wp_parse_args( (array) $instance, array( 'title' => '', 'user' => '', 'pixelscroll_link' => '', 'pixelscroll_label' => '', 'pixelscrolltoo_label' => '', 'pixelscroll_count' => '') );
		$title		= empty($instance['title']) ? '' : $instance['title'];
		$label		= empty($instance['pixelscroll_label']) ? 'You Have Scrolled' : $instance['pixelscroll_label'];
		$labeltoo		= $instance['pixelscrolltoo_label'];
?>

		<p>
			<label for="<?php echo $this->get_field_id('title'); ?>">Title:
			<input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo attribute_escape($title); ?>" />
			</label>
		</p>			
		
		<p>
			<label for="<?php echo $this->get_field_id('pixelscroll_label'); ?>">Text That Appears Before Pixels Scrolled:
			<input class="widefat" id="<?php echo $this->get_field_id('pixelscroll_label'); ?>" name="<?php echo $this->get_field_name('pixelscroll_label'); ?>" type="text" value="<?php echo attribute_escape($label); ?>" />
			</label>
		</p>
        
        <p>
        +<br />
        <i>Amount of Pixels Scrolled</i><br />
        +
        </p>
        
        <p>
			<label for="<?php echo $this->get_field_id('pixelscrolltoo_label'); ?>">Text That Appears After Pixels Scrolled:
			<input class="widefat" id="<?php echo $this->get_field_id('pixelscrolltoo_label'); ?>" name="<?php echo $this->get_field_name('pixelscrolltoo_label'); ?>" type="text" value="<?php echo attribute_escape($labeltoo); ?>" />
			</label>
		</p>
		
<?php
	}

}
 
register_widget('tia_Pixelscroll');


/*///////////////////////////////////////////////////////////////////// 
//  Facebook
/////////////////////////////////////////////////////////////////////*/

class tia_Facebook extends WP_Widget {
 
	function tia_Facebook() {
	
		global $tia_theme_name, $tia_version, $options;
		
        $widget_ops = array('classname' => 'widget_tia_facebook', 'description' => 'Display Facebook fanbox.');
		$this->WP_Widget('tia_facebook', $tia_theme_name.' '.'Facebook', $widget_ops);
    
    }
 
    function widget($args, $instance) {
    
    	global $tia_theme_name, $tia_version, $options;
       
        extract( $args );
        
        $title	= empty($instance['title']) ? 'On Facebook' : $instance['title'];
        $connections	= empty($instance['connections']) ? '8' : $instance['connections'];
        $height	= empty($instance['height']) ? '255' : $instance['height'];
        $url	= empty($instance['url']) ? tia_get_option('tia_facebook') : $instance['url'];        
 
        ?>
			<?php echo $before_widget; ?>
				<?php echo $before_title . $title . $after_title; ?>
                <iframe src="http://www.facebook.com/plugins/likebox.php?href=<?php echo $url; ?>&amp;colorscheme=light&amp;connections=<?php echo $connections; ?>&amp;stream=false&amp;header=false&amp;height=<?php echo $height; ?>" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100%; height:<?php echo $height; ?>px;" allowTransparency="true"></iframe>
 
			<?php echo $after_widget; ?>
        <?php
    }

    function update($new_instance, $old_instance) {  
    
    	$instance['title'] = strip_tags($new_instance['title']);
    	$instance['connections'] = strip_tags($new_instance['connections']);
    	$instance['height'] = strip_tags($new_instance['height']);
    	$instance['url'] = strip_tags($new_instance['url']);
                  
        return $new_instance;
    }
 
    function form($instance) {
    
    	global $tia_theme_name, $tia_version, $options;
        
		$instance	= wp_parse_args( (array) $instance, array( 'title' => '', 'url' => '') );
		$title		= empty($instance['title']) ? 'On Facebook' : $instance['title'];
		$connections		= empty($instance['connections']) ? '8' : $instance['connections'];
		$height		= empty($instance['height']) ? '255' : $instance['height'];
		$url		= $instance['url'];		
?>

		<p>
			<label for="<?php echo $this->get_field_id('title'); ?>">Title:
			<input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo attribute_escape($title); ?>" />
			</label>
		</p>
		<p>
			<label for="<?php echo $this->get_field_id('connections'); ?>">Connections Displayed:
			<input class="widefat" id="<?php echo $this->get_field_id('connections'); ?>" name="<?php echo $this->get_field_name('connections'); ?>" type="text" value="<?php echo attribute_escape($connections); ?>" />
			</label>
		</p>
		<p>
			<label for="<?php echo $this->get_field_id('height'); ?>">Widget Height:
			<input class="widefat" id="<?php echo $this->get_field_id('height'); ?>" name="<?php echo $this->get_field_name('height'); ?>" type="text" value="<?php echo attribute_escape($height); ?>" />
			</label>
		</p>		
		<p>
			<label for="<?php echo $this->get_field_id('url'); ?>">Facebook Fan Page URL:
			<input class="widefat" id="<?php echo $this->get_field_id('url'); ?>" name="<?php echo $this->get_field_name('url'); ?>" type="text" value="<?php echo attribute_escape($url); ?>" />
			</label>
		</p>		
		
		
<?php
	}

}
 
register_widget('tia_Facebook');


