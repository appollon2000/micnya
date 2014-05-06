<?php get_header(); ?>
<?php
$qry2 = "SELECT * FROM donation"; 
$resl2 = mysql_query($qry2) or die(mysql_error());
$smt = $result2['value_sum'];
$quty= 0;
while ($numb = mysql_fetch_assoc ($resl2)) {
    $qty1 += $numb['amount'];
}
?>

	<div id="main">				 
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
            <div class="widget-container-info" id="widget-donated-amount"><?php echo number_format($qty1); ?></div>
            </div>
            <div id="donation-left">
              <div class="widget-container-header">Days Left</div>
            <div class="widget-container-info" id="widget-days-left"></div>
            </div>
          </div>
          <div id="widget-donate"><a href="widget-donate">Donate Now</a></div>
      </div>

            <!--end post nav -->
        	<?php $i = 1; //Start a counter outside of the loop
        	if(tia_get_option('tia_pages_enabled'))	{
        		include( TEMPLATEPATH . '/includes/loop-pages.php');
        	} else {
						include( TEMPLATEPATH . '/includes/loop-posts.php');
					}

			wp_reset_postdata(); ?>

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


