<?php $postType = 'page'; ?>
	<!--post nav-->
            <ul id="nav">
                <?php
					if(tia_get_option('tia_reorder_enabled')) {
						$orderby = 'menu_order';
					} else {
						$orderby = 'date';
					}
				//$paged = (get_query_var('paged')) ? get_query_var('paged') : 2;
				$perPage = get_option('posts_per_page');

        $args = array (
    //'posts_per_page' => 5,
		'post_type' => 'page',
		'order' => 'ASC',
		'posts_per_page' => $perPage,
		//'paged=' => $paged,
		'orderby' => $orderby,
);

							$the_query = new WP_Query($args);?>
<?php
 $i = 1; while ( $the_query->have_posts() ) : $the_query->the_post();
	echo '<li id="blockLink', $i;
	echo '"><a href="#block', $i;
	echo '" class="block-link" title="', the_title();
	echo '">'; 
	the_title();
	echo '</a></li>';
	$i++;
	?>
<?php endwhile; 

// Reset Query
//wp_reset_query();
?>
</ul>

<?php $i = 1; //Start a counter outside of the loop
        	while ($the_query->have_posts()) : $the_query->the_post();
                $lightbox_img = get_post_meta($post->ID, "_tia_lightbox_image_value", true); // to be killed
                $alignment = get_post_meta($post->ID, "_tia_align_right_value", true); // to be killed
                $postAlignment = get_post_meta($post->ID, "_tia_post_alignment_value", true);
                $noTextBackground = get_post_meta($post->ID, "_tia_no_text_background_value", true);
                $lb_height = get_post_meta($post->ID, "_tia_lb_height_value_value", true);
                $lb_bgcolor = get_post_meta($post->ID, "_tia_lb_bgcolor_value", true);
                $blockTextColor = get_post_meta($post->ID, "_tia_block_text_color_value", true);
                $overrideAnchorColor = get_post_meta($post->ID, "_tia_override_anchor_color_value", true);
                $lb_bgrepeat = get_post_meta($post->ID, "_tia_lb_repeat_value", true);
                $bg_alignment = get_post_meta($post->ID, "_tia_bg_alignment_value", true);
                $src = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), array( 5600,1000 ), false, '' );
                $setParallaxHeight=tia_get_option('tia_default_height');
                $theContentEnabled=tia_get_option('tia_theContent_enabled');
                
				if ($overrideAnchorColor) { ?> <style>#content #block<?php echo $i; ?> a {color: <?php echo $overrideAnchorColor; ?>;}</style> <?php }
				if(has_post_thumbnail()) :
				 ?>
                  <div id="block<?php echo $i; ?>" <?php $i++; ?> <?php post_class('parallax-container'); ?>  style="background-image: url(<?php echo $src[0]; ?>); overflow: hidden; min-height:<?php echo $setParallaxHeight; ?>px;<?php if ($lb_bgcolor==true){echo " background-color:".$lb_bgcolor.";";} ?><?php if ($lb_bgrepeat==true){echo " background-repeat:repeat;";} else {echo " background-repeat:no-repeat;";} ?><?php if ($bg_alignment==true){echo " background-position:".$bg_alignment.";";} ?>">
                     <div class="story">
                        <div class="<?php if($postAlignment) { echo $postAlignment; } elseif ($alignment) { echo ' float-right'; } else { echo ' float-left';} ?> blockText" style="<?php if($noTextBackground){echo'background:none;';}  if($blockTextColor){echo ' color:', $blockTextColor;} ?>">									
                        	<h1><?php if(tia_get_option('tia_title_links_disabled')){ ?><?php the_title(); ?><?php } else { ?> <a href="<?php the_permalink() ?>" rel="bookmark" <?php if($noTextBackground){echo'style="color:', $blockTextColor, '"';} ?>><?php the_title(); ?></a> <?php } ?></h1>
							<?php if(!tia_get_option('tia_author_credit_disabled')){ ?><div class="meta clearfix" <?php if($noTextBackground){echo'style="color:', $blockTextColor, '"';} ?>>						
								Posted by <?php the_author_posts_link();  ?> 
							</div><?php } ?>
						<?php if($theContentEnabled)	{										
							 the_content('',TRUE); 
							} else {
							 the_excerpt('',TRUE);
							}
							more_link();
						  ?>
                       <p class="postmetadata"> <?php bloginfo('name'); ?> | <?php the_category(', ') ?><?php edit_post_link(' | Edit', ''); ?>  </p>			
                         </div>
                         <?php
                             
        // Loops through each feature image and grabs thumbnail URL
        if (class_exists('MultiPostThumbnails')) { 
        $m=1;
            while ($m<=1) {
                $image_name = 'extra-scrolling-image'; //-'.$m; <- // sets image name as feature-image-1, feature-image-2 etc. place m back in and add the number one in the function later
                if (MultiPostThumbnails::has_post_thumbnail($postType, $image_name)) { 
                    $image_id = MultiPostThumbnails::get_post_thumbnail_id( $postType, $image_name, $post->ID );  // use the MultiPostThumbnails to get the image ID
                    $image_thumb_url = wp_get_attachment_image_src( $image_id,'small-thumb');  // define thumb src based on image ID
                    $image_feature_url = wp_get_attachment_image_src( $image_id,'extra-scrolling-image' ); // define full size src based on image ID
                    $attr = array(
                        'class' => "",      // set custom class
                        'src' => $image_feature_url[0], // sets the url for the full image size 
                    );                                                                                      
                    // Use wp_get_attachment_image instead of standard MultiPostThumbnails to be able to tweak attributes
                    $extraImage = wp_get_attachment_image( $image_id, 'extra-scrolling-image', false, $attr );  ?>
                    <div class="<?php echo 'bg'.$m ?>" style="background-image: url(<?php echo $image_feature_url[0]; ?>); min-height:<?php echo $setParallaxHeight; ?>px; height:<?php echo $setParallaxHeight; ?>px;">
                    &nbsp;</div> <?php                   
                }                           
             
                    ?>
                    
                    <?php
                    $m++;
                  }
                } else {
                
                 if($lightbox_img) { ?>
                     <div class="bg" style="background-image: url(<?php echo $lightbox_img; ?>); min-height:<?php echo $setParallaxHeight; ?>px; height:<?php echo $setParallaxHeight; ?>px;">
                     &nbsp;</div>
                         <?php } 
                	
                 }
                         ?>
   					</div> <!--.story-->																				
			    </div>	
                
                <?php else : ?>
                <div id="block<?php echo $i; ?>" <?php $i++; ?> <?php post_class('parallax-container'); ?>  style="background-image: url(<?php echo $src[0]; ?>); overflow: hidden; min-height:<?php echo $setParallaxHeight; ?>px;<?php if ($lb_bgcolor==true){echo " background-color:".$lb_bgcolor.";";} ?>">
                	<div class="story">
                	<div class="<?php if($postAlignment) { echo $postAlignment; } ?> blank blockText" style="<?php if($noTextBackground){echo'background:none;';}  if($blockTextColor){echo ' color:', $blockTextColor;} ?>">
                        <h1><?php if(tia_get_option('tia_title_links_disabled')){ ?><?php the_title(); ?><?php } else { ?> <a href="<?php the_permalink() ?>" rel="bookmark"><?php the_title(); ?> <?php if($noTextBackground){echo'style="color:', $blockTextColor, '"';} ?></a> <?php } ?></h1>
						<?php if(!tia_get_option('tia_author_credit_disabled')){ ?><div class="meta clearfix">						
								Posted by <?php the_author_posts_link();  ?> 
							</div><?php } ?>
						<?php if($theContentEnabled)	{										
							 the_content('',TRUE); 
							 more_link();
							} else {
							 the_excerpt('',TRUE);
							 more_link();
							}
						  ?>
                        <p class="postmetadata"> <?php bloginfo('name'); ?> | <?php the_category(', ') ?><?php edit_post_link(' | Edit', ''); ?>  </p>
			    	</div>
			    	</div>	
                </div>
                <?php endif; ?>			
			<?php endwhile;