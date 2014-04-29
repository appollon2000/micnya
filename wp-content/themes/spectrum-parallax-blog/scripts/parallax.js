/*
Based on the demo of Recreating the Nikebetterworld.com Parallax Demo by Ian Lunn - http://www.ianlunn.co.uk/demos/recreate-nikebetterworld-parallax/
Author: David Cable and Jeff Rainey
Author URL: http://themespectrum.com/
Demo URL: http://themespectrum.com/parallax-demo

License: http://creativecommons.org/licenses/by-sa/3.0/ (Attribution Share Alike). 

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/

$(document).ready(function() { //when the document is ready...
	
	//save selectors as variables to increase performance
	var $window = $(window);	
	var windowHeight = $window.height(); //get the height of the window
	parallaxHeight = 960;
	/*
	var $donationContainer = $("#donation-container"),
		$donationBody = $("#donation-body"),
		$donationHeader = $("#donation-header"),
		$donationSelector = $("#donation-body").find(".oval"),
		$donationNext = $("#next a"),
		$userOtherDonation = $donationBody.find(".other input");
	
	var amountSelected = false,
		currentDonationStep = 1,
		donationAmount,
		donationLevel,
		regExpNumbers = /[^0-9]/g;
		
	$userOtherDonation.val("");
		
	$donationSelector.on("click", function(e){
		e.preventDefault();
	
		$donationSelector.removeClass("selected");	
		
		$donationBody.find(".donation-content").removeClass("light-yellow-selected-donation");
		$donationBody.find(".donation-amount").removeClass("dark-yellow-selected-donation");
		$donationBody.find(".donation-content").removeClass("light-red-selected-donation");
		$donationBody.find(".donation-amount").removeClass("dark-red-selected-donation");

		if ($(this).text() != '0') {			
			$(this).parent().find(".donation-content").addClass("light-yellow-selected-donation");
			$(this).parent().find(".donation-amount").addClass("dark-yellow-selected-donation");
			
			donationAmount = $(this).parent().find(".donation-amount").text();
			donationLevel = $(this).parent().find(".donation-reference").text();
			
			$(this).addClass("selected");
			
			amountSelected = true;
		} else {
			$(this).addClass("selected");
			$(this).parent().find(".donation-content").removeClass("light-red-selected-donation");
			$(this).parent().find(".donation-amount").removeClass("dark-red-selected-donation");
			
			$donationBody.find(".other p.other-amount").hide();
			$userOtherDonation.focus();
			
			amountSelected = false;
		}
	});
	
	$donationNext.on("click", function(e) {
		e.preventDefault();
		
		switch(currentDonationStep) {
			case 1:
				authorizeFirstStep();
				break;
			case 2:
				authorizeSecondStep();
				break;
			case 3:
				submitTransaction();
				break;
			case 4:
				customizeUserTileInfo();
				break;
		}
	});
	
	$userOtherDonation.on("click", function (e) {
		e.preventDefault();
		
		$donationBody.find(".other p.other-amount").hide();
	});
	
	$donationBody.find(".other p").on("click", function (e) {
		e.preventDefault();
		
		$(this).hide();
		$userOtherDonation.focus();
	});
	
	function authorizeFirstStep () {
		// If the user selects a default amount, proceed to the next section; otherwise,
		// validate the user entry.
		if (amountSelected) {
			continueToSecondStep();		
		} else {		
			var amountRegistered = Number($userOtherDonation.val());
				
			if (!regExpNumbers.test($userOtherDonation.val()) && amountRegistered >= 25) {	
				
				if(amountRegistered >= 25 && amountRegistered < 150) {					
					donationLevel = "Friend";					
				} else if (amountRegistered >= 150 && amountRegistered < 250) {
					donationLevel = "Supporter";
				} else {
					donationLevel = "Transformer";
				}
				
				donationAmount = amountRegistered;
				
				continueToSecondStep();
			} else {
				$donationBody.find(".donation-content.other .donation-info").show();
				$donationBody.find(".donation-content.other").addClass("light-red-selected-donation");
				$donationBody.find(".donation-amount.other").addClass("dark-red-selected-donation");
				
			}
		}
	}
	
	function continueToSecondStep () {
		$donationBody.find("#step-" + currentDonationStep).fadeOut("slow", function () {
			currentDonationStep++;
			
			$donationHeader.animate({
				height: 65
			}, 500, "linear");
			
			$donationContainer.animate({
				height: 430
			}, 500, "linear");
			
			$donationHeader.find("h1").fadeOut("slow", function() {
				$(this).text("Enter Billing Information");
				$(this).fadeIn();
			})
			
			$donationHeader.find("h2").hide();
			
			$donationBody.find("#step-" + currentDonationStep).fadeIn();
			
			$donationBody.find("#select-city").ddslick();
			$donationBody.find("#select-country").ddslick();
			$donationBody.find("#select-exp-day").ddslick();
			$donationBody.find("#select-exp-year").ddslick();
		});
	}
	
	function authorizeSecondStep () {
		// make sure all calls are made
		
		$donationBody.find("#step-" + currentDonationStep).fadeOut("slow", function () {
			currentDonationStep++;
			
			$donationContainer.animate({
				height: 210
			}, 500, "linear");
			
			$donationHeader.find("h1").fadeOut("slow", function () {
				$(this).text("Summary");
				$(this).fadeIn();
			});
			
			$donationNext.addClass("submit-transition");
			
			$("#step-" + currentDonationStep).find(".transaction-donation").text(donationAmount);
			$("#step-" + currentDonationStep).find(".transaction-level").text(donationLevel);
			
			$donationBody.find("#step-" + currentDonationStep).fadeIn();
		});
	}
	
	function submitTransaction () {
		$donationBody.find("#step-" + currentDonationStep).fadeOut("slow", function () {
			currentDonationStep++;
			
			$donationContainer.animate({
				height: 65
			}, 500, "linear");
			
			$donationHeader.find("h1").fadeOut("slow", function () {
				$(this).text("Your transaction is complete");
				$donationNext.removeClass("submit-transition");

				$(this).fadeIn();
			});
			
			$donationBody.hide();
		});
	}
	
	function customizeUserTileInfo () {
		$donationBody.find("#step-" + currentDonationStep).fadeOut("slow", function () {
			$donationBody.show();
			
			currentDonationStep++;
			
			$donationHeader.animate({
				height: 128
			}, 500, "linear");
			
			$donationContainer.animate({
				height: 560
			}, 500, "linear");
			
			$donationHeader.find("h1").fadeOut("slow", function () {
				$(this).text("Personalize your virtual tile");
				
				$(this).fadeIn();
			});
			
			$donationHeader.find("h2").text("In appreciation of your support, you can personalize a symbolic tile on our virtual shimmer wall.").show();
			
			$donationBody.find("#step-" + currentDonationStep).fadeIn();
		})
	}
	*/
	//apply the class "inview" to a section that is in the viewport
	$('.parallax-container').bind('inview', function (event, visible) {
			if (visible == true) {
			$(this).addClass("inview");
			} else {
			$(this).removeClass("inview");
			}
		});
	function removeActive() {
			$("a.block-link.active").removeClass("active");
	}
			
	//function that places the navigation in the center of the window
	function RepositionNav(){
		var windowHeight = $window.height(); //get the height of the window
		var navHeight = $('#nav').height() / 2;
		var windowCenter = (windowHeight / 2); 
		var newtop = windowCenter - navHeight;
		$('#nav').css({"top": newtop}); //set the new top position of the navigation list
	}
	
	//function that is called for every pixel the user scrolls. Determines the position of the background
	/*arguments: 
		x = horizontal position of background
		windowHeight = height of the viewport
		pos = position of the scrollbar
		adjuster = adjust the position of the background
		inertia = how fast the background moves in relation to scrolling
	*/
	function newPos(x, windowHeight, pos, adjuster, inertia){
		return x + "% " + (-((parallaxHeight + pos) - adjuster) * inertia)  + "px";
	}
	
	//function to be called whenever the window is scrolled or resized

	function Move(){ 
		var pos = $window.scrollTop(); //position of the scrollbar
		var blockAdjust = null;
		$('.parallax-container').each(function(i) {
	    	var blockAdjust=0;
	    	$('#pixels').html(pos); //display the number of pixels scrolled at the bottom of the page
	    	if($(this).hasClass("inview"))
	    	{
	        	$(this).css({'backgroundPosition': newPos(50, windowHeight, pos, (parallaxHeight * (i+1)), 0.3)});
	        	$(this).find('.bg1').css({'backgroundPosition': newPos(50, windowHeight, pos, (parallaxHeight * (i+1))+trainerBump, 0.6)});
	    	}
		});
		var scrollPosition = $("body").scrollTop();
		var firstBlockId = $('.inview').first().attr('id');
		
	//	firstBlockLink = firstBlockId.replace("block","li#blockLink") + ' a' ;
	//	removeActive();
	//	$(firstBlockLink).addClass("active");
			
		
	}
	
	function setFooterFAQ() {
		$("#socialNetworks a:nth-child(3)").attr("href", "page-faq");
		$("#socialNetworks a:nth-child(3) img").attr("src", "/wp-content/themes/spectrum-parallax-blog/images/icons/socialmedia/faq.png");
	}
	
	setFooterFAQ();
		
	RepositionNav(); //Reposition the Navigation to center it in the window when the script loads
	
	$window.resize(function(){ //if the user resizes the window...
		Move(); //move the background images in relation to the movement of the scrollbar
		RepositionNav(); //reposition the navigation list so it remains vertically central
	});		
	
	$window.bind('scroll', function(){ //when the user is scrolling...
		Move(); //move the background images in relation to the movement of the scrollbar
	});
	
});