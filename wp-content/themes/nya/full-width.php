<?php /*
Template Name: Full Width
*/ ?>

<?php get_header(); ?>

	<div class="inside">
		<div id="content" class="full clearfix">
			<?php while (have_posts()) : the_post(); ?>
			    
			    <div class="post">
						<h1><a href="<?php the_permalink() ?>" rel="bookmark" ><?php the_title(); ?></a></h1>
						<?php if(has_post_thumbnail()) : ?>
								<?php the_post_thumbnail('tia_main_feature', array('class' => 'pageThumb', 'alt' => ''.get_the_title().'', 'title' => ''.get_the_title().'')); ?>
                        <?php endif; ?>
						<div class="meta">
							Posted by <?php the_author(); ?>
						</div>
						<?php if (!dynamic_sidebar('post_top')) : ?>
                        <?php endif; ?>
                    
				<?php the_content(); ?>	
			    <?php if (!dynamic_sidebar('post_bottom')) : ?>
                        <?php endif; ?>
			    </div>
				
				<?php comments_template('', true); ?>
			
			<?php endwhile; ?>
	    	
		</div>
				
	</div>
<?php get_footer(); ?>
