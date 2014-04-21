<?php

//////////////////////////////////////////////////////////////
// Theme - Options
/////////////////////////////////////////////////////////////

$tia_theme_name = "Parallax Blog";
$tia_theme_version = "2.3.1";
$tia_suggested_img_size = "No smaller than 1100px x 800px";


require_once( TEMPLATEPATH . '/admin/admin-setup.php');
require_once( TEMPLATEPATH . '/admin/admin-functions.php');

add_action( 'admin_init', 'tia_register_options' );

function tia_register_options() {
	register_setting( 'tia_options_group', 'tia_options' );
}


function tia_options_page() {
	
global $tia_theme_name, $tia_theme_version, $tia_default_slideshow_speed, $tia_options, $tia_suggested_img_size;
	
?>

	<div id="adminOptions">		
		
		<div id="adminHeader" class="clearfix">
			<a id="tiaThemesLogo" href="#"><img src="<?php echo ADMIN_PATH . '/images/tia-themes-logo.png'; ?>" alt="TIA Themes" /></a>
			<div id="themeVersion">
				
				
				<a href="http://themespectrum.com" target="_blank"><?php echo("<strong>".$tia_theme_name . "</strong> v" . $tia_theme_version ); ?> | Support</a>
				

			</div>
			<ul id="adminNav" class="tabs">
				<li id="tab1"><a href="#option1">General</a></li>
				<li id="tab2"><a href="#option2">Colors &amp; Fonts</a></li>
				<li id="tab2"><a href="#option3">Integration</a></li>				
				<li id="tab3"><a href="#option4">Social Media</a></li>
				<li id="tab4"><a href="#option5">Advanced</a></li>		
				<li id="tab5"><a href="#option6">More Themes</a></li>		
			</ul>
		</div>		
		
		<form id="optionsForm" method="post" action="options.php">			
		
		    <?php
			settings_fields( 'tia_options_group' ); 
		    $tia_options = get_option('tia_options'); 
			$tia_logo = tia_get_option('tia_logo'); 
			$tia_main_padding_top = tia_get_option('tia_main_padding_top');
			$tia_theme_color = tia_get_option('tia_theme_color');
			$tia_theme_bkg = tia_get_option('tia_theme_bkg');
			$tia_rss = tia_get_option('tia_rss'); 
			?>
		    
		    <div class="optionsContainer clearfix">	
			
				<div id="saveBar" class="clearfix">
					<?php if($_REQUEST['updated'] || $_REQUEST['reset']) echo '<div id="message">'.$tia_theme_name.' '. 'Settings updated'.'</div>'; ?>
					<input type="submit" class="button" value="Save Changes" />
				</div>
				
				<div id="option1" class="optionContent">
					<!-- Logo -->					
					<div class="adminModule">
						<h3 class="logoTitle">Logo</h3>	    			
				    	
						<div class="logoContainer smallBottomMargin">
							<div id="status_tia_logo"></div>
							<?php if($tia_logo){ ?>	
								<img id="img_tia_logo" src="<?php echo($tia_logo); ?>" />
							<?php } ?>
						</div>	    											
						
						<div class="smallBottomMargin clearfix">		
							<textarea name="tia_options[tia_logo]" cols=70 rows=1><?php echo $tia_options['tia_logo']; ?></textarea>	
						</div>
						
						<p class="instructions">Enter a URL of your custom logo. You can use the <a href="<?php bloginfo('url'); ?>/wp-admin/media-new.php">media uploader</a> to get your image. Make sure you copy the URL of the logo before returning here.</p>					
		 										
					</div>
                      				<!-- May incorporate this later			
				<div class="adminModule clearfix">
					<h3 class="settingsTitle">Padding Adjustment</h3>					
					
					<div class="itemRow clearfix">						
					<input name="tia_options[tia_main_padding_top]" id="slideShowSpeed" type="hidden" value="<?php echo($tia_main_padding_top); ?>"/>
					<label class="sliderLabel singleLine">Top Padding:</label>					
					<div class="sliderHolder">
						<div id="speedSlider"></div>
					</div>
					<div id="speedSliderValue" class="sliderValue"><?php $v = ($tia_main_padding_top == "0") ? "automatic playing turned off" : $tia_main_padding_top . " pixels"; echo($v); ?> </div>
					<script type="text/javascript">						
					jQuery(document).ready(function() {				
					    	jQuery("#speedSlider").slider('option', 'value', parseInt(<?php echo($tia_main_padding_top); ?>));				
					});			    
					</script>
					</div>					
					<p class="instructions">After you have uploaded your logo, you may need to move the content down more. Use the slider to set the top padding.</p>									
				</div>	 -->		
                    <!-- Background -->
                    <div class="adminModule">
                    <h3 class="settingsTitle">Background</h3>
                    	<div class="smallBottomMargin clearfix">		
                            <label class="singleLine">Background:</label> 
                            <select name="tia_options[tia_theme_bkg]" id="themeBkg" class="tiaSelect inlineItem">
                                <option<?php if($tia_theme_bkg=='black') echo ' selected'; ?> value="black">black</option>
                                <option<?php if($tia_theme_bkg=='white') echo ' selected'; ?> value="white">white</option>
                            </select>
						</div>						
                    </div>
                    
                    	
                    
					<!-- CSS -->
					<div class="adminModule">
						<h3 class="settingsTitle">Custom CSS</h3>
						<textarea name="tia_options[tia_custom_css]" cols=70 rows=6><?php echo $tia_options['tia_custom_css']; ?></textarea>
						<p class="instructions">Enter custom CSS here. </p>
					</div>
					
					<!-- Footer Text -->
					<div class="adminModule">
						<h3 class="editTitle">Footer Text</h3>
						
						<h4>Left side:</h4>
						<textarea name="tia_options[tia_footer_left]" cols=70 rows=6><?php echo $tia_options['tia_footer_left']; ?></textarea>
						<p class="instructions">This will appear on the left side of the footer.</p>
						
						<h4>Right side:</h4>
						<textarea name="tia_options[tia_footer_right]" cols=70 rows=6><?php echo $tia_options['tia_footer_right']; ?></textarea>
						<p class="instructions">This will appear on the right side of the footer.</p>
					</div>					
					
				</div>		
			
		    	<div id="option2" class="optionContent">					

					<div class="adminModule">
						<h3 class="settingsTitle">Colors</h3>
						<div class="itemRow clearfix divided">
							<span class="inlineItem clearfix"><label class="singleLine"><strong>Site Title Color:</strong></label> <input name="tia_options[tia_color_title]" id="colorTitle"  type="text" size=7 value="<?php if ($tia_options['tia_color_title']) { echo $tia_options['tia_color_title']; } ?>" /> <label class="small">hover:</label> <input name="tia_options[tia_color_title_hover]" id="colorTitleHover"  type="text" size=7 value="<?php if ($tia_options['tia_color_title_hover']) { echo $tia_options['tia_color_title_hover']; } ?>" /> </span>
						</div>
						<div class="itemRow clearfix divided">
							<span class="inlineItem clearfix"><label class="singleLine"><strong>Title Shadow Color:</strong></label> <input name="tia_options[tia_color_title_shadow]" id="colorTitleShadow"  type="text" size=7 value="<?php if ($tia_options['tia_color_title_shadow']) { echo $tia_options['tia_color_title_shadow']; } ?>" /> </span>
						</div>						
						<div class="itemRow clearfix divided">
							<span class="inlineItem clearfix"><label class="singleLine"><strong>Main Menu Color:</strong></label> <input name="tia_options[tia_color_menu]" id="colorMenu"  type="text" size=7 value="<?php if ($tia_options['tia_color_menu']) { echo $tia_options['tia_color_menu']; } ?>" /> <label class="small">hover:</label> <input name="tia_options[tia_color_menu_hover]" id="colorMenuHover"  type="text" size=7 value="<?php if ($tia_options['tia_color_menu_hover']) { echo $tia_options['tia_color_menu_hover']; } ?>" /> </span>						
						</div>
						<div class="itemRow clearfix divided">
							<span class="inlineItem clearfix"><label class="singleLine"><strong>Parallax Menu Color:</strong></label> <input name="tia_options[tia_color_menu_parallax]" id="colorMenuParallax"  type="text" size=7 value="<?php if ($tia_options['tia_color_menu_parallax']) { echo $tia_options['tia_color_menu_parallax']; } ?>" /> <label class="small">hover:</label> <input name="tia_options[tia_color_menu_parallax_hover]" id="colorMenuParallaxHover"  type="text" size=7 value="<?php if ($tia_options['tia_color_menu_parallax_hover']) { echo $tia_options['tia_color_menu_parallax_hover']; } ?>" /> <label class="small">text color hover:</label> <input name="tia_options[tia_color_menu_parallax_text_hover]" id="colorMenuParallaxTextHover"  type="text" size=7 value="<?php if ($tia_options['tia_color_menu_parallax_text_hover']) { echo $tia_options['tia_color_menu_parallax_text_hover']; } ?>" /> </span>						
						</div>
						<!--<div class="itemRow clearfix divided">
							<span class="inlineItem clearfix"><label class="singleLine"><strong>Content Button:</strong></label> <input name="tia_options[tia_color_content_btn]" id="colorContentBtn"  type="text" size=7 value="<?php if ($tia_options['tia_color_content_btn']) { echo $tia_options['tia_color_content_btn']; } ?>" /> <label class="small">hover:</label> <input name="tia_options[tia_color_content_btn_hover]" id="colorContentBtnHover"  type="text" size=7 value="<?php if ($tia_options['tia_color_content_btn_hover']) { echo $tia_options['tia_color_content_btn_hover']; } ?>" /> </span>
						</div>-->
						<div class="itemRow clearfix divided">
							<span class="inlineItem clearfix"><label class="singleLine"><strong>Site Links:</strong></label> <input name="tia_options[tia_color_body_link]" id="colorBodyLink"  type="text" size=7 value="<?php if ($tia_options['tia_color_body_link']) { echo $tia_options['tia_color_body_link']; } ?>" /> <label class="small">hover:</label> <input name="tia_options[tia_color_body_link_hover]" id="colorBodyLinkHover"  type="text" size=7 value="<?php if ($tia_options['tia_color_body_link_hover']) { echo $tia_options['tia_color_body_link_hover']; } ?>" /> </span> 
						</div>
						<p class="instructions">Use these fields to set custom colors. If the fields are left blank, the default colors will be used.</p>
					</div>
					
					<!-- Fonts -->
					<div class="adminModule">
						<h3 class="settingsTitle">Fonts</h3>
						<p>This area allows you to enter any <a href="http://www.google.com/webfonts" target="_blank">Google webfont</a> name that you wish to use.  Double check your spelling and this is case sensitive. </p>
						<p>	<strong>Please Note:</strong> this is a powerful feature and it is possible that you will choose a font that is too wide.  You can change the size of this if you are comfortable with CSS in the <em>Custom CSS</em> field under the <em>General</em> tab . Please use fonts that are not too wide if you are not.</p>
						<h4>Logo &amp; Headers</h4>
						<input name="tia_options[tia_header_font]" id="rss" class="" type="text" size=40 value="<?php echo $tia_options['tia_header_font']; ?>" />
						<p class="instructions">Enter the Google font that you want to use. <strong>Exact spelling and case-sensitive</strong></p>
						<h4>Site wide</h4>
						<input name="tia_options[tia_body_font]" id="rss" class="" type="text" size=40 value="<?php echo $tia_options['tia_body_font']; ?>" />
						<p class="instructions">Enter the Google font that you want to use. <strong>Exact spelling and case-sensitive</strong></p>
						<h4>Button Fonts</h4>
						<input name="tia_options[tia_button_font]" id="rss" class="" type="text" size=40 value="<?php echo $tia_options['tia_button_font']; ?>" />
						<p class="instructions">Enter the Google font that you want to use. <strong>Exact spelling and case-sensitive</strong></p>
						<p>Leave the fields blank to use the default fonts.</p>
					</div>
					
									
				</div>
				
				<div id="option3" class="optionContent">					

					
					<!-- Feed -->
					<div class="adminModule">
						<h3 class="rssTitle">RSS Feed</h3>
						<input name="tia_options[tia_rss]" id="rss" class="" type="text" size=40 value="<?php echo $tia_options['tia_rss']; ?>" />
						<p class="instructions">Enter your custom RSS URL (e.g. Feedburner).</p>
					</div>
					
					<!-- Analytics -->
					<div class="adminModule">
						<h3 class="analyticsTitle">Site Analytics</h3>
						<textarea name="tia_options[tia_analytics]" cols=40 rows=5><?php echo $tia_options['tia_analytics']; ?></textarea>
						<p class="instructions">Enter your custom analytics code. (e.g. Google Analytics).</p>
					</div>					
				</div>
				
				
			
			
				<div id="option4" class="optionContent">
				<div class="adminModule">
						<h3 class="socialTitle">Social Media</h3>
                        <p class="instructions">Enter full URLs below including http://</p>
                        <p>LinkedIn:<br />
						<textarea name="tia_options[tia_linkedin]" cols=70 rows=1><?php echo $tia_options['tia_linkedin']; ?></textarea></p>
                        
                        <p>Twitter:<br />
						<textarea name="tia_options[tia_twitter]" cols=70 rows=1><?php echo $tia_options['tia_twitter']; ?></textarea></p>
                        
                        <p>Reddit:<br />
						<textarea name="tia_options[tia_reddit]" cols=70 rows=1><?php echo $tia_options['tia_reddit']; ?></textarea></p>
                        
                        <p>Facebook:<br />
						<textarea name="tia_options[tia_facebook]" cols=70 rows=1><?php echo $tia_options['tia_facebook']; ?></textarea></p>
						
						<p>Pinterest:<br />
						<textarea name="tia_options[tia_pinterest]" cols=70 rows=1><?php echo $tia_options['tia_pinterest']; ?></textarea></p>
                        
                        <p>Delicious:<br />
						<textarea name="tia_options[tia_delicious]" cols=70 rows=1><?php echo $tia_options['tia_delicious']; ?></textarea></p>
                        
                        <p>Flickr:<br />
						<textarea name="tia_options[tia_flickr]" cols=70 rows=1><?php echo $tia_options['tia_flickr']; ?></textarea></p>
                        
                        <p>tumblr:<br />
						<textarea name="tia_options[tia_tumblr]" cols=70 rows=1><?php echo $tia_options['tia_tumblr']; ?></textarea></p>
                        
                        <p>digg:<br />
						<textarea name="tia_options[tia_digg]" cols=70 rows=1><?php echo $tia_options['tia_digg']; ?></textarea></p>
                        
                        <p>friendfeed:<br />
						<textarea name="tia_options[tia_friendfeed]" cols=70 rows=1><?php echo $tia_options['tia_friendfeed']; ?></textarea></p>
                        
                        <p>stumbleupon:<br />
						<textarea name="tia_options[tia_stumbleupon]" cols=70 rows=1><?php echo $tia_options['tia_stumbleupon']; ?></textarea></p>
                        
                        <p>design float:<br />
						<textarea name="tia_options[tia_designfloat]" cols=70 rows=1><?php echo $tia_options['tia_designfloat']; ?></textarea></p>
                        
                        <p>vimeo:<br />
						<textarea name="tia_options[tia_vimeo]" cols=70 rows=1><?php echo $tia_options['tia_vimeo']; ?></textarea></p>
                        
                        <p>Google:<br />
						<textarea name="tia_options[tia_google]" cols=70 rows=1><?php echo $tia_options['tia_google']; ?></textarea></p>
                        
                        <p>Blogger:<br />
						<textarea name="tia_options[tia_blogger]" cols=70 rows=1><?php echo $tia_options['tia_blogger']; ?></textarea></p>
                        
                        <p>YouTube:<br />
						<textarea name="tia_options[tia_youtube]" cols=70 rows=1><?php echo $tia_options['tia_youtube']; ?></textarea></p>
						
					</div>
	
			</div>
			
			<div id="option5" class="optionContent">
				<!-- Simple Reordering -->
				<div class="adminModule">
					<h3 class="settingsTitle">Simple Reordering</h3>
					<div class="itemRow clearfix divided">
						<label class="sliderLabel singleLine">Enable Ajax Reordering:</label>
						<input id="reorderEnabled" name="tia_options[tia_reorder_enabled]" type="checkbox" <?php if($tia_options['tia_reorder_enabled']) echo("checked"); ?>/>

						<p class="instructions clear">Check this box to enable a simple reordering system. After checking the box, save and then, <a href="<?php bloginfo('url'); ?>#reorder">click here to reorder</a>.</p>
					</div>
				</div>
					<!-- Default Height -->
                    <div class="adminModule">
                    <h3 class="settingsTitle">Override Default Height</h3>
                    	<div class="smallBottomMargin clearfix">		
                            <label class="singleLine">height:</label> 
                            	<textarea name="tia_options[tia_default_height]" cols=70 rows=1><?php echo $tia_options['tia_default_height']; ?></textarea> pixels
                            <p class="instructions">Enter your height in pixels. It is suggested to enter at least 400.</p>
						</div>						
                    </div>
                    
                    <!-- Default Scrolling Image Top margin -->
                    <div class="adminModule">
                    <h3 class="settingsTitle">Override Scrolling Image Top Margin</h3>
                    	<div class="smallBottomMargin clearfix">		
                            <label class="singleLine">top margin:</label> 
                            	<textarea name="tia_options[tia_scrolling_img_margin_top]" cols=70 rows=1><?php echo $tia_options['tia_scrolling_img_margin_top']; ?></textarea> pixels
                            <p class="instructions">Enter your top margin in pixels. Default is 117 pixels.<br /><strong>This is not really margin.  It is a calculated number to offset the scrolling image. 10 will hit the top.</strong></p>
						</div>						
                    </div>
                    
                    <!-- Disable Scroll Easing -->
                    <div class="adminModule">
                    <h3 class="settingsTitle">Disable Scroll Easing</h3>
                    	<div class="itemRow clearfix divided">						
							<label class="sliderLabel singleLine">Check to disable:</label>
							<input id="scrollEasingEnabled" name="tia_options[tia_scrollEasing_enabled]" type="checkbox" <?php if($tia_options['tia_scrollEasing_enabled']) echo("checked"); ?>/>
						
							<p class="instructions clear">Check this box to disable scroll easing. This creates a smooth easing experience when interacting with the page scroll bar.</p>
						</div>
                    </div>
                    
                    <!-- Default Story Top Margin -->
                    <div class="adminModule">
                    <h3 class="settingsTitle">Override Story Top Margin</h3>
                    	<div class="smallBottomMargin clearfix">		
                            <label class="singleLine">top margin:</label> 
                            	<textarea name="tia_options[tia_story_margin_top]" cols=70 rows=1><?php echo $tia_options['tia_story_margin_top']; ?></textarea> pixels
                            <p class="instructions">Enter your top margin in pixels. Default is 70 pixels. -1 will hit the top.</p>
						</div>						
                    </div>

						<!-- Excerpt or Full Content -->
						<div class="adminModule">
							<h3 class="settingsTitle">Override Excerpt Posting</h3>
							<div class="itemRow clearfix divided">
								<label class="sliderLabel singleLine">Enable Full Content:</label>
								<input id="theContentEnabled" name="tia_options[tia_theContent_enabled]" type="checkbox" <?php if($tia_options['tia_theContent_enabled']) echo("checked"); ?>/>

								<p class="instructions clear">Check this box to enable the use of the full content function in WordPress. This will give you more freedom, but will also require more care to make sure your looks stays clean.</p>
							</div>
						</div>



                    <!-- Pages or Posts -->
                    <div class="adminModule">
                    <h3 class="settingsTitle">Pages or Posts</h3>
                    	<div class="itemRow clearfix divided">						
							<label class="sliderLabel singleLine">Enable Pages for Front:</label>
							<input id="thePagesEnabled" name="tia_options[tia_pages_enabled]" type="checkbox" <?php if($tia_options['tia_pages_enabled']) echo("checked"); ?>/>
						
							<p class="instructions clear">Check this box to enable a collection of Pages to be seen on the front page rather than posts. (This is experimental right now and basically kills the blogging feature of WordPress. Please leave input in the forum if you try this feature out as we are still working out the kinks on this.)</p>
						</div>
                    </div>
                    
                    <!-- Show menu wording -->
                    <div class="adminModule">
                    <h3 class="settingsTitle">Show Menu Titles</h3>
                    	<div class="itemRow clearfix divided">						
							<label class="sliderLabel singleLine">Enable Menu Title:</label>
							<input id="menuTitlesEnabled" name="tia_options[tia_menuTitles_enabled]" type="checkbox" <?php if($tia_options['tia_menuTitles_enabled']) echo("checked"); ?>/>
						
							<p class="instructions clear">Check this box to enable menu titles for the right side. (menu that controls the parallax movement.)</p>
						</div>
                    </div>
                    
                    <!-- Disable Post link -->
                    <div class="adminModule">
                    <h3 class="settingsTitle">Disable Title Links on Front</h3>
                    	<div class="itemRow clearfix divided">						
							<label class="sliderLabel singleLine">Disable Title Links:</label>
							<input id="titlelinksdisabled" name="tia_options[tia_title_links_disabled]" type="checkbox" <?php if($tia_options['tia_title_links_disabled']) echo("checked"); ?>/>
						
							<p class="instructions clear">Check this box to disable links to the inside page.  This may be useful if you do not want make a single page site.</p>
						</div>
                    </div>
                    
                    <!-- Disable Post link -->
                    <div class="adminModule">
                    <h3 class="settingsTitle">Disable Author Credit on Front View</h3>
                    	<div class="itemRow clearfix divided">						
							<label class="sliderLabel singleLine">Disable Author Credit:</label>
							<input id="authorCreditDisabled" name="tia_options[tia_author_credit_disabled]" type="checkbox" <?php if($tia_options['tia_author_credit_disabled']) echo("checked"); ?>/>
						
							<p class="instructions clear">Check this box to disable the display for the author credit in the parallax view.</p>
						</div>
                    </div>
                    
                    <!-- Disable Post link -->
                    <div class="adminModule">
                    <h3 class="settingsTitle">Disable Background Images for Mobile</h3>
                    	<div class="itemRow clearfix divided">						
							<label class="sliderLabel singleLine">Disable Background:</label>
							<input id="parallaxBackgroundsDisabled" name="tia_options[tia_mobile_backgrounds]" type="checkbox" <?php if($tia_options['tia_mobile_backgrounds']) echo("checked"); ?>/>
						
							<p class="instructions clear">Check this box to disable the display of background images on mobile devices.  You can still set a color in each post.</p>
						</div>
                    </div>
                    
                    <!-- Front page items are pages *******>>> Future option
                    <div class="adminModule">
                    <h3 class="settingsTitle">Pull Parallax Items from Pages</h3>
                    	<div class="itemRow clearfix divided">						
							<label class="sliderLabel singleLine">Use Pages for Parallax Display:</label>
							<input id="selectedPostType" name="tia_options[tia_selected_post_type]" type="checkbox" <?php if($tia_options['tia_selected_post_type']) echo("checked"); ?>/>
						
							<p class="instructions clear">Check this box to display pages as parallax items instead of posts.</p>
						</div>
                    </div>-->
                    
					
									
			</div>
            
            <div id="option6" class="optionContent">					

					
					<!-- Feed -->
					
						<?php
            include_once(ABSPATH . WPINC . '/feed.php');
            $rss = fetch_feed('http://themespectrum.com/blog/category/wordpress-themes/feed/');
            $maxitems = $rss->get_item_quantity(10); 
            $items = $rss->get_items(0, $maxitems);
            global $post;
            ?>
            <?php $i=1; foreach ( $items as $item ) : ?>
		
                <div class="adminModule moreThemes">
                    
                    <h3 class="pageTitle"><span><?php echo $item->get_title();?></span></h3>
    
					<?php echo $item->get_description(); ?>
                    
                    <p style="padding-bottom:20px"><a href="<?php echo $item->get_permalink(); ?>" class="button" target="_blank"><?php _e('Theme Info', TIA_DOMAIN); ?></a></p>
                        
                </div><!-- end  -->
		    
		    <?php $i++; endforeach; ?>
		
			</div>										

		<input type="submit" class="button right" value="Save Changes" />
		</div>
		</form>
	</div>
<?php } ?>