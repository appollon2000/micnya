<?php get_header(); ?>
	<div class="inside clearfix">			 
		<div id="content" class="posts clearfix">
				<div id="pageHead">
				<?php global $post; if(is_archive() && have_posts()) :
                
                    if (is_category()) : ?>
                    <h1><?php single_cat_title(); ?></h1>
                    <?php elseif( is_tag() ) : ?>
                    <h1><?php single_tag_title(); ?></h1>
                    <?php elseif (is_day()) : ?>
                    <h1>Archive <?php the_time('M j, Y'); ?></h1>
                    <?php elseif (is_month()) : ?>
                    <h1>Archive <?php the_time('F Y'); ?></h1>
                    <?php elseif (is_year()) : ?>
                    <h1>Archive <?php the_time('Y'); ?></h1>
                    <?php elseif (isset($_GET['paged']) && !empty($_GET['paged'])) : ?>
                    <h1>Archive</h1>
                    <?php endif; ?>
                    
                <?php endif; ?>
            </div>
			
			<?php while (have_posts()) : the_post(); ?>
			    
			    <div class="post clearfix">											
						<h1><a href="<?php the_permalink() ?>" rel="bookmark" ><?php the_title(); ?></a></h1>
						<?php if(has_post_thumbnail()) : ?>												
					    		<?php the_post_thumbnail('tia_small', array('class' => 'postThumb', 'alt' => ''.get_the_title().'', 'title' => ''.get_the_title().'')); ?>			    	
						<?php endif; ?>
                        <div class="meta">						
							Posted by <?php the_author_posts_link(); ?> on <?php the_time( 'M j, Y' ) ?> 
						</div>
																	
						<?php the_content('',TRUE); ?>
						<?php more_link(); ?>
                        <p class="postmetadata">  <?php bloginfo('name'); ?>  | <?php the_category(', ') ?><!-- | <a href="<?php comments_link(); ?>"><?php comments_number('No Comments', 'One Comment', '% Comments'); ?></a>-->
			    </div>				
			
			<?php endwhile; ?>
			
			<?php include( TEMPLATEPATH . '/includes/pagination.php'); ?>
					    	
		</div>
		
		<?php get_sidebar(); ?>
					
	</div>	
<?php get_footer(); ?>
