<div id="sidebar">
    <?php
	    if(is_archive() && is_active_sidebar('sidebar_home')) : dynamic_sidebar('sidebar_home');
	else : ?>
	
		<?php if (!dynamic_sidebar('sidebar') && is_user_logged_in()) : ?>

    	<div class = "miniFeature32 widget_tia_mini_feature sidebarBox">				
			<?php include( TEMPLATEPATH . '/includes/no_widgets.php'); ?>
		</div><!-- end sidebar box -->
		
		<?php endif; ?>
    
	<?php endif; ?>
</div><!-- end sidebar -->


