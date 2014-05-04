$(document).ready(function() {
	var $main = $("#main"),
		$donationContainer = $("#donation-container"),
		$donationBody = $("#donation-body"),
		$donationHeader = $("#donation-header"),
		$donationSelector = $("#donation-body").find(".donate-oval"),
		$tileSelector = $donationBody.find(".tile-oval"),
		$donationNext = $("#next a"),
		$donateAnotherTile = $("#donate-another a"),
		$viewYourTile = $("#view-your-tile a"),
		$userOtherDonation = $donationBody.find(".other input");
	
	var amountSelected = false,
		currentDonationStep = 1,
		donationAmount,
		donationLevel,
		regExpNumbers = /[^0-9]/g,
		staticBackground = "<div id='static-background'></div><div id='bg-overlay'></div>",
		verticalLinkConnector = "<did id='links-vertical-connector'></div>",
		virtualTileSelection = "memory-oval",
		tileDonationTriggered = false;
		
	$userOtherDonation.val("");
	$main.prepend(staticBackground);
	$main.find("#nav").before(verticalLinkConnector);
	
	setFooterFAQ();
	$donationBody.find("#select-state").ddslick();
	$donationBody.find("#select-country").ddslick();
	$donationBody.find("#select-exp-day").ddslick();
	$donationBody.find("#select-exp-year").ddslick();
	
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
	
	$tileSelector.on("click", function (e){
		e.preventDefault();
		
		$tileSelector.removeClass("selected");
		
		$(this).addClass("selected");
		
		virtualTileSelection = $(this).attr("href");
		
		$donationBody.find(".section-top input").removeClass("error-input").val("");
		$donationBody.find(".section-bottom input").removeClass("error-input");
		
		tileDonationTriggered = true;
	});
	
	$donationContainer.find("input").on("click", function (e) {
		$(this).removeClass("error-input");
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
	// Step 1: user selects a donation amount or enter one that is > $25
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
	// If not errors on Step 1, proceed to Step 2
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
		});
	}
	// Step 2: check the user has entered all the proper information and initiate transaction
	// If everything goes well, user is redirected to the submit section
	function authorizeSecondStep () {
		// make sure all calls are made
		var allFieldsCompleted = checkOnTransactionInput();
		
		if (allFieldsCompleted) {
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
	}
	// Step 3: let the user acknowledge the amount of the transaction and what kind of donor he/she will become
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
	// Step 4: transaction was successful; now user has the change to initiate tile customization
	// donor information 
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
		var tileInfoVerification = verifyTileInfoEntry();
		
		if (tileInfoVerification) {
			$donationBody.find("#step-" + currentDonationStep).fadeOut("slow", function () {
				currentDonationStep++;
			
				$donationBody.find("#step-" + currentDonationStep).fadeIn();
			});
		}
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
	
	function setFooterFAQ() {
		$("#socialNetworks a:nth-child(3)").attr("href", "page-faq");
		$("#socialNetworks a:nth-child(3) img").attr("src", "/wp-content/themes/spectrum-parallax-blog/images/icons/socialmedia/faq.png");
	}
	
	function checkOnTransactionInput () {
		var infoVerified = true, // needs to be false, set to true for testing only
			userInputClear = false,
			userCCTypeSelected = false,
			stateSelected = false,
			countrySelected = false,
			expDaySelected = false,
			expYearSelected = false,
			$ccSelection = $donationBody.find("input:radio[name=cc-type]"),
			countrySelection = $donationBody.find("#select-state .dd-selected-text").text(),
			stateSelection = $donationBody.find("#select-country .dd-selected-text").text(),
			selectExpDay = $donationBody.find("#select-exp-day .dd-selected-text").text(),
			selectExpYear = $donationBody.find("#select-exp-year .dd-selected-text").text();
		
		$donationBody.find("#step-2 input").each( function (index, element) {
			if ($(this).val() == "") {
				$(this).addClass("error-input");
			} else {
				userInputClear = true;
			}
		});
		
		if ($ccSelection.is(":checked") === false) {
			userCCTypeSelected = false;
		} else {
			userCCTypeSelected = true;
		}
		
		if (countrySelection != "Country") {
			countrySelected = true
		} 
		
		if (stateSelection != "State") {
			stateSelected = true;
		}

		if (userInputClear && userCCTypeSelected && stateSelection && countrySelection) {
			infoVerified = true;
		}
		
		return infoVerified;
	}
	
	function verifyTileInfoEntry () {
		var infoVerified = false,
			donationOrMemoryInput = false,
			tileNameLocation = false;
		
		if (!tileDonationTriggered) {
			$donationBody.find("#step-5 .section-top input").each( function (index, element) {
				if ($(this).val() == "") {
					$(this).addClass("error-input");
				} else {
					tileNameLocation = true;
				}
			});
		} else {
			if (virtualTileSelection == "honor-oval") {
				$donationBody.find("#in-honor-donation input").each( function (index, element) {
					if ($(this).val() == "") {
						$(this).addClass("error-input");
					} else {
						donationOrMemoryInput = true;
					}
				}); 
			} else {
				if ($donationBody.find("#in-memory-donation input").val() == "") {
					$(this).addClass("error-input");
				} else {
					//($donationBody.find("#in-memory-donation input").val());
					donationOrMemoryInput = true;
				}
			}
		}
		
		if (donationOrMemoryInput || tileNameLocation) {
			infoVerified = true;
			tileDonationTriggered = false;
		}
		
		return infoVerified;
	}
});