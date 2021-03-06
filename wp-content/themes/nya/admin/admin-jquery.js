jQuery(document).ready(function() {
	
	//////////////////////////////////////////////
	// Tab navigation
	/////////////////////////////////////////////
	
	//When page loads...
		
	jQuery(".optionContent").hide(); //Hide all content
	if(jQuery.cookie('selectedTab') != null)
	{			
		var activeTab = '#'+jQuery.cookie('selectedTab');		
		jQuery(activeTab).addClass("active").show();
		var activeContent = jQuery(activeTab).find("a").attr("href");		
		jQuery(activeContent).show();
	}
	else
	{
		jQuery("ul.tabs li:first").addClass("active").show(); //Activate first tab
		jQuery(".optionContent:first").show(); //Show first tab content
	}	
	

	//On Click Event
	jQuery("ul.tabs li").click(function() {
		jQuery("ul.tabs li").removeClass("active"); //Remove any "active" class
		jQuery(this).addClass("active"); //Add "active" class to selected tab
		jQuery(".optionContent").hide(); //Hide all tab content

		var activeTab = jQuery(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		jQuery(activeTab).fadeIn(); //Fade in the active ID content
		jQuery.cookie('selectedTab', jQuery(this).attr('id'));		
		return false;
	});
	
	setTimeout(function(){ jQuery('#message').fadeOut('slow'); }, 2000);
	
	
	
	//////////////////////////////////////////////
	// Colors
	/////////////////////////////////////////////
	
	jQuery('#colorTitle, #colorTitleHover, #colorMenu, #colorMenuHover, #colorContentBtnHover, colorContentBtn, #colorBodyLink, #colorBodyLinkHover, #colorMenuParallax, #colorMenuParallaxHover, #colorTitleShadow, #colorMenuParallaxTextHover').ColorPicker({
		onSubmit: function(hsb, hex, rgb, el) {
			jQuery(el).val(hex);
			jQuery(el).ColorPickerHide();
		},
		onBeforeShow: function () {
			jQuery(this).ColorPickerSetColor(this.value);
		}
	})
	.bind('keyup', function(){
		jQuery(this).ColorPickerSetColor(this.value);
	});
	
	
	
	//////////////////////////////////////////////
	// Upload
	/////////////////////////////////////////////
	

		jQuery('#tiaUploadButton').click(function() {
	 		formfield = jQuery('#tiaLogo').attr('name');			
	 		tb_show('', 'media-upload.php?post_id=2&type=image&TB_iframe=true');
	 		return false;
		});

		window.send_to_editor = function(html) {
	 		imgurl = jQuery('img',html).attr('src');
	 		jQuery('#tiaLogo').val(imgurl);
	 		jQuery('#tiaLogoImg').attr('src',imgurl);
	 		tb_remove();
		};
	
	
	//////////////////////////////////////////////
	// Exclude Pages Checkboxes
	/////////////////////////////////////////////
	
	jQuery("#excludePagesWrap input:checkbox").click(function() {
		var excludePages = "";	    
	    jQuery("#excludePagesWrap input:checkbox").each(function() {	    	
			if(!jQuery(this).is(':checked')){				
				excludePages = excludePages + jQuery(this).val() + ",";				
			}			
	    })
		excludePages = excludePages.substring(0, excludePages.length-1);
		jQuery('#excludePages').val(excludePages);		
	});
	
	//////////////////////////////////////////////
	// Exclude Categories Checkboxes
	/////////////////////////////////////////////
	
	jQuery("#excludeCategoriesWrap input:checkbox").click(function() {
		var excludeCategories = "";	    
	    jQuery("#excludeCategoriesWrap input:checkbox").each(function() {	    	
			if(!jQuery(this).is(':checked')){				
				excludeCategories = excludeCategories + jQuery(this).val() + ",";				
			}			
	    })
		excludeCategories = excludeCategories.substring(0, excludeCategories.length-1);
		jQuery('#excludeCategories').val(excludeCategories);		
	});
	
	//////////////////////////////////////////////
	// Slideshow
	/////////////////////////////////////////////
	
	jQuery("#speedSlider").slider({
			handle: '#slider-handle',
			min: 1,
			max: 150,			
			slide: function(e,ui){
			if(ui.value == 0){
				jQuery('#speedSliderValue').addClass('sliderOff').text("no padding");	
			}else{
				jQuery('#speedSliderValue').removeClass('sliderOff').text(ui.value + " pixels");	
			}			
			jQuery("#slideShowSpeed").val(ui.value);			
		}
	});
	
	//AJAX Upload
	jQuery('.imageUploadBtn').each(function(){
	
	var clickedObject = jQuery(this);
	var clickedID = jQuery(this).attr('id');
	var prevImage = jQuery('img#img_'+clickedID);
	var status = jQuery('div#status_'+clickedID);
		
	new AjaxUpload(clickedID, {
		  action: ajaxurl,
		  name: clickedID, // File upload name
		  data: { // Additional data to send
				action: 'tia_ajax_post_action',
				type: 'upload',
				data: clickedID },
		  autoSubmit: true, // Submit file after selection
		  responseType: false,
		  onChange: function(file, extension){},
		  onSubmit: function(file, extension){
				clickedObject.text('Uploading'); // change button text, when user selects file	
				this.disable(); // If you want to allow uploading only 1 file at time, you can disable upload button
				prevImage.remove();
				jQuery("img#image_" + clickedID).remove();
				status.addClass('ajaxLoading');
							
		  },
		  onComplete: function(file, response) {		   
			
			this.enable(); // enable upload button
			jQuery('div#status_'+clickedID).removeClass('ajaxLoading');
			var response = response.substring(0, response.length-1);
			
			// If there was an error
			if(response.search('Upload Error') > -1){
				var buildReturn = '<span class="uploadError">' + response + '</span>';
				jQuery(".upload-error").remove();
				clickedObject.parent().after(buildReturn);			
			}
			else{				
				var buildReturn = '<img style="display: none;" id="image_'+clickedID+'" src="'+response+'" alt="" />';

				jQuery(".uploadError").remove();					
				status.after(buildReturn);
				jQuery('img#image_'+clickedID).fadeIn();
				clickedObject.next('input').fadeIn();
				clickedObject.prev('input').val(response);
			}
		  }
		});
	
	});
	
	//AJAX Remove (clear option value)
	jQuery('.imageResetButton').click(function(){
	
			var clickedObject = jQuery(this);
			var clickedID = jQuery(this).attr('id');
			var theID = jQuery(this).attr('title');	

			var ajax_url = ajaxurl;
		
			var data = {
				action: 'tia_ajax_post_action',
				type: 'image_reset',
				data: theID
			};
			
			jQuery.post(ajax_url, data, function(response) {
				var image_to_remove = jQuery('#image_' + theID);
				var button_to_hide = jQuery('#reset_' + theID);
				jQuery('#img_' + theID).fadeOut(500,function(){ jQuery(this).remove(); });
				image_to_remove.fadeOut(500,function(){ jQuery(this).remove(); });
				button_to_hide.fadeOut();
				clickedObject.prev('input').prev('input').val('');						
			});					
			return false; 					
		});
	


});
