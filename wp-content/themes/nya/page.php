<?php get_header(); ?>
	<div class="inside clearfix">				 
		<div id="content" class="posts clearfix">
			
            <div class="post">
            	<?php if(!is_front_page()):?>
                        <h1><?php the_title(); ?></h1>
            	<?php endif; ?>
					<?php while (have_posts()) : the_post(); ?>				
					<?php the_content(); ?>				
					<?php edit_post_link(' - Edit Page', ''); ?>			
				<?php comments_template('', true); ?>			
			<?php endwhile; ?>
            </div>					    	
		</div>		
		<?php get_sidebar(); ?>
		<br class="clearfix" />				
	</div>	
<?php get_footer(); ?>