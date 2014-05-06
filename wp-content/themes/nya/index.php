<?php get_header(); ?>
	<div id="main" class="clearfix">				 
		<div id="content" class="postshome clearfix">
        	<div id="cover-left">&nbsp;</div>
        	<div id="cover-right">&nbsp;</div>
			<div id="donation-widget">
				<div id="widget-logo"></div>
			  	<div id="widget-content">
			    	<div id="donation-goal">
			    		<div class="widget-container-header">$ Goal</div>
						<div class="widget-container-info" id="widget-goal">300,000</div>
			    	</div>
			    	<div id="amount-donated">
			    		<div class="widget-container-header">$ Donated</div>
						<div class="widget-container-info" id="widget-donated-amount">123,234</div>
			    	</div>
			    	<div id="donation-left">
			    		<div class="widget-container-header">Days Left</div>
						<div class="widget-container-info" id="widget-days-left">500</div>
			    	</div>
			  	</div>
			  	<div id="widget-donate"><a href="widget-donate">Donate Now</a></div>
			</div>
<ul id="nav"> <!-- post nav -->
<li id="blockLink1"><a class="block-link" href="#block1">OUR MISSION</a></li>
<li id="blockLink2"><a class="block-link" href="#block2">HELP US BUILD</a></li>
<li id="blockLink3"><a class="block-link" href="#block3">THE VIRTUAL SHIMMER WALL</a></li>
<li id="blockLink4"><a class="block-link" href="#block3">EXPLORE FURTHER</a></li>

</ul> <!--end post nav -->
            <!--end post nav -->
        	<div style="background-image: url('/wp-content/uploads/2014/04/volc2.jpg'); overflow: hidden; min-height: 700px; background-repeat: no-repeat; background-position: 50% 0px;" class="post-23 post type-post status-publish format-standard has-post-thumbnail hentry category-uncategorized parallax-container inview" id="block1">

                                         
  </div>
  <div style="background: rgba(11, 181, 255, 0.75); overflow: hidden; min-height: 700px; background-repeat: no-repeat; background-position: 50% 0px;" class="post-23 post type-post status-publish format-standard has-post-thumbnail hentry category-uncategorized parallax-container inview" id="block2">

                                         
  </div>

			

			<div style="background-color: #777; color:#ccc">
				<div style="margin:5px; text-align: center">
				<a name="reorder"></a>
					<?php
			if(current_user_can('manage_options') && tia_get_option('tia_reorder_enabled')) {
					if (tia_get_option('tia_pages_enabled')) {
						$reorderURL = "/wp-admin/edit.php?post_type=page&page=reorder-parallax-pages.php";
					} else {
						$reorderURL = "/wp-admin/edit.php?page=reorder-parallax-posts.php";
					} ?>

					<p style="padding:5px"><a class="btn button" href="<?php bloginfo('url'); echo $reorderURL; ?>">Reorder Posts</a> - this message is only visible if you are an admin.</p>

			<?php } elseif (current_user_can('manage_options')) { ?>

					<p style="padding:5px">Try out a new way to reorder your posts. Look under the advanced tab. <a class="btn button" href="<?php bloginfo('url'); ?>/wp-admin/admin.php?page=tia-options#option5">Enable Reorder Posts</a> - this message is only visible if you are an admin.</p>

			<?php }
			?>
				</div>
			</div>
				
		</div> <!-- end content -->
	</div>	
<?php get_footer(); ?>


