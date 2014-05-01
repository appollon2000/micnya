$(document).ready(function() {
	var $main = $("#main"),
		$donationContainer = $("#donation-container"),
		$donationBody = $("#donation-body"),
		$donationHeader = $("#donation-header"),
		$donationSelector = $("#donation-body").find(".oval"),
		$donationNext = $("#next a"),
		$donateAnotherTile = $("#donate-another a"),
		$viewYourTile = $("#view-your-tile a"),
		$userOtherDonation = $donationBody.find(".other input");
	
	var amountSelected = false,
		currentDonationStep = 1,
		donationAmount,
		donationLevel,
		regExpNumbers = /[^0-9]/g,
		staticBackground = "<div id='static-background'></div><div id='bg-overlay'></div>";
		
	$userOtherDonation.val("");
	$main.prepend(staticBackground);
		
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
			case 5:
				customizeUserTile();
				break;
			case 6:
				thankYouSection();
				break;
		}
	});
	
	$donateAnotherTile.on("click", function (e) {
		e.preventDefault();
		
		$donationBody.find("#step-" + currentDonationStep).fadeOut("slow", function () {

			$donationHeader.find("h1").fadeOut("slow", function() {
				$(this).text("Choose your donation amount");
				$(this).fadeIn();
			});
			
			$donationHeader.find("h2").text("Together we can create Ocean Wonders: Sharks! and build a new New York Aquarium for generations of curious minds to come.");
			$donationHeader.find("h2").fadeIn();
			
			$donationContainer.animate({
				height: 475
			}, 500, "linear");
			
			resetDonationForm();
			currentDonationStep = 1;

			$donationNext.fadeIn();
			$donateAnotherTile.fadeOut();
			$viewYourTile.fadeOut();
			
			$donationBody.find("#step-" + currentDonationStep).show().fadeIn();//css({"opacity": '1'});
		});
		
	});
	
	$viewYourTile.on("click", function (e) {
		e.preventDefault();
		
		console.log("go to your tile");
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
				
				donationAmount = "$ " + amountRegistered;
				
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
			
			$donationHeader.find("h1").animate({
				paddingTop: 22
			}, 500, "linear");
			
			$donationContainer.animate({
				height: 430
			}, 500, "linear");
			
			
			
			$donationHeader.find("h1").fadeOut("slow", function() {
				$(this).text("Enter Billing Information");
				$(this).fadeIn();
			});
			
			$donationHeader.find("h2").hide();

			$donationBody.find("#step-" + currentDonationStep).fadeIn();

			/* Will need to fix to match comps */
		//	$donationBody.find("#select-city").ddslick();
		//	$donationBody.find("#select-country").ddslick();
		//	$donationBody.find("#select-exp-day").ddslick();
		//	$donationBody.find("#select-exp-year").ddslick();
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
			
			$donationHeader.find("h1").animate({
				paddingTop: 35
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
		});
	}
	
	function customizeUserTile () {
		$donationBody.find("#step-" + currentDonationStep).fadeOut("slow", function () {
			currentDonationStep++;
			
			$donationBody.find("#step-" + currentDonationStep).fadeIn();
		});
	}
	
	function thankYouSection () {
		$donationBody.find("#step-" + currentDonationStep).fadeOut("slow", function () {
			currentDonationStep++;
			
			$donationContainer.animate({
				height: 430
			}, 500, "linear");
			
			$donationNext.fadeOut();
			$donateAnotherTile.fadeIn();
			$viewYourTile.fadeIn();
			
			$donationBody.find("#step-" + currentDonationStep).fadeIn();
		});
	}
	
	function resetDonationForm () {
		amountSelected = false;
		
		$donationBody.find(".donation-content").removeClass("light-yellow-selected-donation");
		$donationBody.find(".donation-amount").removeClass("dark-yellow-selected-donation");
		$donationBody.find(".oval").removeClass("selected");
	}
});