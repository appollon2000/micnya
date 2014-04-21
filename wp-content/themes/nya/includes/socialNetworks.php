<div id="socialNetworks">
	
	<?php if(tia_get_option('tia_facebook')) : ?>
            <a href="<?php echo tia_get_option('tia_facebook'); ?>" title="on facebook"><img src="<?php bloginfo('template_url'); ?>/images/icons/socialmedia/facebook-20.png" alt="facebook" /></a>
    <?php endif; ?>
    <?php if(tia_get_option('tia_twitter')) : ?>
            <a href="<?php echo tia_get_option('tia_twitter'); ?>" title="on twitter"><img src="<?php bloginfo('template_url'); ?>/images/icons/socialmedia/twitter-20.png" alt="facebook" /></a>
    <?php endif; ?>
    <?php if(tia_get_option('tia_pinterest')) : ?>
            <a href="<?php echo tia_get_option('tia_pinterest'); ?>" title="on Pinterest" id="pinterest"><img src="<?php bloginfo('template_url'); ?>/images/icons/socialmedia/pinterest-20.png" alt="pinterest" /></a>
    <?php endif; ?>
    <?php if(tia_get_option('tia_flickr')) : ?>
            <a href="<?php echo tia_get_option('tia_flickr'); ?>" title="on flickr"><img src="<?php bloginfo('template_url'); ?>/images/icons/socialmedia/flickr-20.png" alt="flickr" /></a>
    <?php endif; ?>
    <?php if(tia_get_option('tia_tumblr')) : ?>
            <a href="<?php echo tia_get_option('tia_tumblr'); ?>" title="on tumblr"><img src="<?php bloginfo('template_url'); ?>/images/icons/socialmedia/tumblr-20.png" alt="tumblr" /></a>
    <?php endif; ?>
    <?php if(tia_get_option('tia_linkedin')) : ?>
            <a href="<?php echo tia_get_option('tia_linkedin'); ?>" title="on linkedin"><img src="<?php bloginfo('template_url'); ?>/images/icons/socialmedia/linkedin-20.png" alt="linkedin" /></a>
    <?php endif; ?>
    <?php if(tia_get_option('tia_reddit')) : ?>
            <a href="<?php echo tia_get_option('tia_reddit'); ?>" title="on reddit"><img src="<?php bloginfo('template_url'); ?>/images/icons/socialmedia/reddit-20.png" alt="reddit" /></a>
    <?php endif; ?>
    <?php if(tia_get_option('tia_delicious')) : ?>
            <a href="<?php echo tia_get_option('tia_delicious'); ?>" title="on delicious"><img src="<?php bloginfo('template_url'); ?>/images/icons/socialmedia/delicious-20.png" alt="delicious" /></a>
    <?php endif; ?>
    <?php if(tia_get_option('tia_digg')) : ?>
            <a href="<?php echo tia_get_option('tia_digg'); ?>" title="on digg"><img src="<?php bloginfo('template_url'); ?>/images/icons/socialmedia/digg-20.png" alt="digg" /></a>
    <?php endif; ?>
    <?php if(tia_get_option('tia_friendfeed')) : ?>
            <a href="<?php echo tia_get_option('tia_friendfeed'); ?>" title="on friendfeed"><img src="<?php bloginfo('template_url'); ?>/images/icons/socialmedia/friendfeed-20.png" alt="friendfeed" /></a>
    <?php endif; ?>
    <?php if(tia_get_option('tia_stumbleupon')) : ?>
            <a href="<?php echo tia_get_option('tia_stumbleupon'); ?>" title="on stumbleupon"><img src="<?php bloginfo('template_url'); ?>/images/icons/socialmedia/stumbleupon-20.png" alt="stumbleupon" /></a>
    <?php endif; ?>
    <?php if(tia_get_option('tia_vimeo')) : ?>
            <a href="<?php echo tia_get_option('tia_vimeo'); ?>" title="on vimeo"><img src="<?php bloginfo('template_url'); ?>/images/icons/socialmedia/vimeo-20.png" alt="vimeo" /></a>
    <?php endif; ?>
    <?php if(tia_get_option('tia_designfloat')) : ?>
            <a href="<?php echo tia_get_option('tia_designfloat'); ?>" title="on designfloat"><img src="<?php bloginfo('template_url'); ?>/images/icons/socialmedia/designfloat-20.png" alt="designfloat" /></a>
    <?php endif; ?>
    <?php if(tia_get_option('tia_blogger')) : ?>
            <a href="<?php echo tia_get_option('tia_blogger'); ?>" title="on blogger"><img src="<?php bloginfo('template_url'); ?>/images/icons/socialmedia/blogger-20.png" alt="blogger" /></a>
    <?php endif; ?>
    <?php if(tia_get_option('tia_google')) : ?>
            <a href="<?php echo tia_get_option('tia_google'); ?>" title="on Google"><img src="<?php bloginfo('template_url'); ?>/images/icons/socialmedia/google-20.png" alt="Google" /></a>
    <?php endif; ?>
    <?php if(tia_get_option('tia_youtube')) : ?>
            <a href="<?php echo tia_get_option('tia_youtube'); ?>" title="on youtube"><img src="<?php bloginfo('template_url'); ?>/images/icons/socialmedia/youtube-20.png" alt="youtube" /></a>
    <?php endif; ?>
	<?php $tia_rss = tia_get_option('tia_rss'); ?>
    <?php if($tia_rss) : ?>
        <a href="<?php echo $tia_rss; ?>" class="subscribe"><img src="<?php bloginfo('template_url'); ?>/images/icons/socialmedia/rss-20.png" alt="rss feed" /></a>
    <?php else : ?>
        <a href="<?php echo get_bloginfo('rss2_url') ?>" class="subscribe"><img src="<?php bloginfo('template_url'); ?>/images/icons/socialmedia/rss-20.png" alt="rss feed" /></a>
    <?php  endif; ?>
</div>