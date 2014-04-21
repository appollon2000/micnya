<?php get_header(); ?>

	<div class="inside clearfix">
		<div id="content" class="posts clearfix">
			<?php while (have_posts()) : the_post(); ?>
			    
			    <div class="post">
						<?php if(has_post_thumbnail()) : ?>
								<?php the_post_thumbnail('tia_main_feature', array('class' => 'postThumb featured', 'alt' => ''.get_the_title().'', 'title' => ''.get_the_title().'')); ?>
                        <?php endif; ?>
                        <h1><a href="<?php the_permalink() ?>" rel="bookmark" ><?php the_title(); ?></a></h1>
						<div class="meta">
							Posted by <?php the_author(); ?>
						</div>
						<?php if (!dynamic_sidebar('post_top')) : ?>
                        <?php endif; ?>
                    
<?php the_content(); ?>	
                        <p class="singlePostMeta"><?php bloginfo('name'); ?> - <?php the_time( 'M j, Y' ) ?> | <?php the_category(', ') ?><?php edit_post_link(' | Edit', ''); ?><br /><?php the_tags('Tagged | ', ', ', '<br />'); ?></p>
			    <?php if (!dynamic_sidebar('post_bottom')) : ?>
                        <?php endif; ?>
			    </div>
				
				<?php comments_template('', true); ?>
			
			<?php endwhile; ?>
	    	
		</div>
		
		<?php get_sidebar(); ?>
		<br class="clearfix" />
	</div>
<?php get_footer(); ?>
