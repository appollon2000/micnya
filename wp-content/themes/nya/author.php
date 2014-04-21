<?php get_header(); ?>

	<div class="inside clearfix">				 
		<div id="content" class="posts clearfix">
        	<div id="pageHead">
				<?php global $wp_query; $current_author = $wp_query->get_queried_object(); ?>
                <h1>Posts by: <?php echo $current_author->display_name; ?></h1>
            </div>					
			<?php while (have_posts()) : the_post(); ?>
			    
			    <div class="post clearfix">											
						<h1><a href="<?php the_permalink() ?>" rel="bookmark" ><?php the_title(); ?></a></h1>
						<?php if(has_post_thumbnail()) : ?>												
					    		<?php the_post_thumbnail('tia_small', array('class' => 'postThumb', 'alt' => ''.get_the_title().'', 'title' => ''.get_the_title().'')); ?>			    	
						<?php endif; ?>
						<div class="meta">						
							Posted by <?php the_author_posts_link(); ?> on <?php the_time( 'M j, Y' ) ?><br />in <?php the_category(', ') ?> | <a href="<?php comments_link(); ?>"><?php comments_number('No Comments', 'One Comment', '% Comments'); ?></a>
						</div>										
						<?php the_content('',TRUE); ?>
						<?php more_link(); ?>																				
			    </div>				
			
			<?php endwhile; ?>
			
			<?php include( TEMPLATEPATH . '/includes/pagination.php'); ?>
					    	
		</div>
		
		<?php get_sidebar(); ?>
					
	</div>	
<?php get_footer(); ?>
