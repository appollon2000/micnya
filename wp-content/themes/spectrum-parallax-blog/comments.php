<?php // Do not delete these lines
	if (isset($_SERVER['SCRIPT_FILENAME']) && 'comments.php' == basename($_SERVER['SCRIPT_FILENAME']))
		die ('Please do not load this page directly. Thanks!');

	if (!empty($post->post_password)) { // if there's a password
		if ($_COOKIE['wp-postpass_' . COOKIEHASH] != $post->post_password) {  // and it doesn't match the cookie
			?>

			<p class="nocomments">Enter your password to view comments.</p>

			<?php
			return;
		}
	}
?>

<?php if(have_comments()) : ?>

<div id="comments" class="twoThird">

	<?php if (!empty($comments_by_type['comment']) && empty($comments_by_type['ping'])) : ?>

	<?php $comments_count = count($comments_by_type['comment']); ?>
	<h2><?php echo $comments_count; ?> <?php if($comments_count==1) : echo 'comment'; else : echo 'comments'; endif; ?></h2>

	<div id="comment-navigation">
		<?php previous_comments_link('<span class="older-comments">'.'&laquo; Older Comments'.'</span>'); ?>
		<?php next_comments_link('<span class="newer-comments">'.'Newer Comments &raquo;'.'</span>'); ?>
	</div>

	<?php endif; ?>

	<?php if(!empty($comments_by_type['comment'])) : ?>
					
	<ol id="commentslist" class="clearfix">
	    <?php wp_list_comments('type=comment&callback=tia_comments'); ?>
	</ol>
	
	<?php endif; ?>
	
	<?php if(!empty($comments_by_type['pings'])) : ?>
	
	<div id="trackbacks">
	
		<?php $trackbacks_count = count($comments_by_type['pings']); ?>
		<h2><?php echo $trackbacks_count; ?> <?php if($trackbacks_count==1) : echo('Trackback'); else : echo('Trackbacks'); endif; ?></h2>
	
		<ul>
		    <?php wp_list_comments('type=pings'); ?>
		</ul>
			
	</div><!-- end trackbacks-list -->

	<?php endif; // endif trackbacks ?>

</div><!-- end comments -->

<?php endif; // endif comments ?>

<?php if ('open' == $post->comment_status) : ?>

<div id="commentForm" class="clear">

	<div id="respond">

	<h3><?php comment_form_title( 'Leave a Reply', 'Leave a Reply to %s' ); ?></h3>

	

	<?php if ( get_option('comment_registration') && !is_user_logged_in() ) : ?>
	<p>You must be <a href="<?php echo wp_login_url( get_permalink() ); ?>">logged in</a> to post a comment.</p>
	<?php else : ?>

	<form action="<?php echo get_option('siteurl'); ?>/wp-comments-post.php" method="post" >

	<?php if ( is_user_logged_in() ) : ?>

	<p>Logged in as <a href="<?php echo get_option('siteurl'); ?>/wp-admin/profile.php"><?php echo $user_identity; ?></a>. <a href="<?php echo wp_logout_url(get_permalink()); ?>" title="Log out of this account">Log out &raquo;</a></p>

	<?php else : ?>

	<p><input type="text" name="author" id="author" value="<?php echo esc_attr($comment_author); ?>" size="22" tabindex="1" <?php if ($req) echo "aria-required='true'"; ?> />
	<label for="author"><small>Name <?php if ($req) echo "(required)"; ?></small></label></p>

	<p><input type="text" name="email" id="email" value="<?php echo esc_attr($comment_author_email); ?>" size="22" tabindex="2" <?php if ($req) echo "aria-required='true'"; ?> />
	<label for="email"><small>Mail (will not be published) <?php if ($req) echo "(required)"; ?></small></label></p>

	<p><input type="text" name="url" id="url" value="<?php echo esc_attr($comment_author_url); ?>" size="22" tabindex="3" />
	<label for="url"><small>Website</small></label></p>

	<?php endif; ?>

	<p><textarea name="comment" id="comment" cols="45" rows="7" tabindex="4"></textarea></p>
	
	<p>
	<input name="submit" type="submit" class="button" id="submit" tabindex="5" value="Submit Comment" /> <?php cancel_comment_reply_link("Cancel Reply"); ?>
	<?php comment_id_fields(); ?>
	</p>	
	
	<?php do_action('comment_form', $post->ID); ?>

	</form>

	<?php endif; // If registration required and not logged in ?>
	</div>

</div><!-- end commentform -->

<?php endif; // if you delete this the sky will fall on your head ?>