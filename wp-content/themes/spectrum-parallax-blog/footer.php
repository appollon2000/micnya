	<div id="footer" class="clearfix">
		<div class="main clearfix">
         
		<?php	
			if(is_front_page() && is_active_sidebar('footer_home')) : dynamic_sidebar('footer_home'); 			
		else : ?>
		
			<?php if (!dynamic_sidebar('footer_default') && is_user_logged_in()) : ?>	
		
			<div class = "miniFeature32 oneThird widget_tia_mini_feature footerBox">				
				<?php include( TEMPLATEPATH . '/includes/no_widgets.php'); ?>	
			</div><!-- end footer box -->
					
			<?php endif; ?>	
			
		<?php endif; ?>				
		</div><!-- end footer main -->
		
		<div class="secondary clearfix">
         <?php include( TEMPLATEPATH . '/includes/socialNetworks.php'); ?>
			<?php $footer_left = tia_get_option('tia_footer_left'); ?>
			<?php $footer_right = tia_get_option('tia_footer_right'); ?>
			<p class="left"><?php if($footer_left){echo($footer_left);} else{ ?>&copy; <?php echo date('Y');?> <a href="<?php bloginfo('url'); ?>"><strong><?php bloginfo('name'); ?></strong></a> All Rights Reserved.<?php }; ?></p>
			<p class="right"><?php if($footer_right){echo($footer_right);} else{ ?><a href="http://themespectrum.com" title="Theme Spectrum">Premium Wordpress Theme by Theme Spectrum</a><?php }; ?></p>
		</div><!-- end footer secondary-->
		
	</div><!-- end footer -->	
</div>
<?php wp_footer(); ?>
<script type="text/javascript" >
jQuery(document).ready(function(){
	
	jQuery("#gallery a img").hover(
		function() {
			jQuery(this).fadeTo("fast", .5);
		},
		function() {
			jQuery(this).fadeTo("fast", 1);
	});
	
	jQuery("a.lightbox").attr('rel', 'gallery').fancybox({			
			'overlayColor'	:	'#000',
			'titleShow'	:	false,
			'titlePosition'	:	'inside'
		});
		
	jQuery(".gallery a").attr('rel', 'gallery').fancybox({
			'overlayColor'	:	'#000',
			'titleShow'	:	false,
			'titlePosition'	:	'inside'
		});		
	
});
</script>
</body>
</html>