<?php get_header(); ?>

	

	<div class="inside clearfix">					 
		<div id="content" class="posts clearfix">
            <div id="pageHead">
                <h1>Search Results</h1>
            </div>
			<?php while (have_posts()) : the_post(); ?>
			    
			    <div class="post clearfix">											
						<h1><a href="<?php the_permalink() ?>" rel="bookmark" ><?php the_title(); ?></a></h1>						
						
						<?php if(has_post_thumbnail()) : ?>												
					    		<?php the_post_thumbnail('tia_small', array('class' => 'postThumb', 'alt' => ''.get_the_title().'', 'title' => ''.get_the_title().'')); ?>			    	
						<?php endif; ?>
																	
						<?php the_excerpt('',TRUE); ?>
																									
			    </div>				
			
			<?php endwhile; ?>
					    	
		</div>
		
		<?php get_sidebar(); ?>
					
	</div>	
<?php get_footer(); ?>








