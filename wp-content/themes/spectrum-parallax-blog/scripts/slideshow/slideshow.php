<?php $slideshow_speed = tia_get_option('tia_slideshow_speed').'000'; ?>
<script type="text/javascript">	
jQuery.noConflict();
jQuery(document).ready(function() {	
    jQuery('#slides').cycle({ 
	    fx:     '<?php echo tia_get_option('tia_slideshow_transition'); ?>', 
    	speed:   500, 
    	timeout: <?php echo $slideshow_speed; ?>,  
    	pause:   1,   
	    next:   '#slideshowNext', 
	    prev:   '#slideshowPrev',
		pager: '#slideshowNav',
		pagerAnchorBuilder: function(idx, slide) {
		        return '<a href="#"><span>'+(idx+1)+'</span></a>';
		    }		
	});
});
</script>