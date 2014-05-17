$j = jQuery.noConflict();
$j(document).ready(function() {
	var $window = $(window),
		$main = $j("#main"),
		$donationContainer = $j("#donation-container"),
		$donationBody = $j("#donation-body"),
		$donationHeader = $j("#donation-header"),
		$donationSelector = $j("#donation-body").find(".donate-oval"),
		$tileSelector = $donationBody.find(".tile-oval"),
		$donationNext = $j("#next a"),
		$donateAnotherTile = $j("#donate-another a"),
		$viewYourTile = $j("#view-your-tile a"),
		$userOtherDonation = $donationBody.find(".other input"),
		$userTileToWall = $donationContainer.find("#step-6 .left-container a"),
		$userColorTileToWall = $donationContainer.find("#step-6 .right-container a"),
		$donationSteps = $("#donation-steps"),
		$donationBackBtn = $("#back-button a"),
		$donationInfo = $("#donation-info"),
		$widgetDonate = $("#widget-donate a"),
		$donateNowBtnBottom = $("#donate-now"),
		$ourMissionNav = $("#blockLink1 a"),
		$helpUsBuildNav = $("#blockLink5 a"),
		$shimmerWallNav = $("#blockLink6 a"),
		$exploreNav = $("#blockLink7 a"),
		$welcomeArrow = $("#arrow-down a");
	
	var amountSelected = false,
		currentDonationStep = 1,
		donationAmount,
		donationLevel,
		regExpNumbers = /[^0-9]/g,
		staticBackground = "<div id='static-background'></div><div id='bg-overlay'></div>",
		verticalLinkConnector = "<did id='links-vertical-connector'></div>",
		virtualTileSelection = "memory-oval",
		tileDonationTriggered = false,
		animalTileSelected = "anmbg1",
		colorTileSelected = "1";
		
	$userOtherDonation.val("");
	$main.prepend(staticBackground);
	$main.find("#nav").before(verticalLinkConnector);
	
	setFooterFAQ();
	//resetDonationForm();
	
	$donationBody.find("#select-state").ddslick();
	$donationBody.find("#select-country").ddslick();
	$donationBody.find("#select-exp-day").ddslick();
	$donationBody.find("#select-exp-year").ddslick();
	
	/* Navitation links overwrite */
	//$ourMissionNav.attr("href", "#block3");
	$helpUsBuildNav.attr("href", "#block6");
	$shimmerWallNav.attr("href", "#block7");
	$exploreNav.attr("href", "#block8");
	
	/* Welcome arrow */
	$welcomeArrow.on("click", function (e) {
		e.preventDefault();

		$(document.body).animate({
			scrollTop: 800
		}, 500, "linear");
	});
	
	$donationInfo.on("click", function (e) {
		e.preventDefault();
		$donationInfo.fadeOut("slow", function(){
		
			$donationContainer.fadeIn();
			$donationNext.fadeIn();
		});
	});
	
	$donationContainer.find("input").on("focusin", function() {
		$j(this).addClass("focus-in-background");
	});
	
	$donationContainer.find("input").on("focusout", function() {
		$j(this).removeClass("focus-in-background");
	});
	
	$donateNowBtnBottom.on("click", function (e ) {
		e.preventDefault();
		
		gotoDonationForm();	
	});
	
	$widgetDonate.on("click", function (e) {
		e.preventDefault();
		
		gotoDonationForm();
	});
	
	$donationBackBtn.on("click", function (e) {
		e.preventDefault();
	
		switch(currentDonationStep) {
			case 2:
				goBackToFirstStep();
				break;
			case 3:
				goBackToSecondStep();
				break;
			case 6:
				goBackToFourthStep();
				break;
		}
	});
	
	$donationSelector.on("click", function(e){
		e.preventDefault();
	
		$donationSelector.removeClass("selected");	
		
		$donationBody.find(".donation-content").removeClass("light-yellow-selected-donation");
		$donationBody.find(".donation-amount").removeClass("dark-yellow-selected-donation");
		$donationBody.find(".donation-content").removeClass("light-red-selected-donation");
		$donationBody.find(".donation-amount").removeClass("dark-red-selected-donation");
		
		$("#donation-widget-steps").show();
		$("#widget-donate a").hide();

		if ($j(this).text() != '0') {			
			$j(this).parent().find(".donation-content").addClass("light-yellow-selected-donation");
			$j(this).parent().find(".donation-amount").addClass("dark-yellow-selected-donation");
			
			donationAmount = $j(this).parent().find(".donation-amount").text();
			donationLevel = $j(this).parent().find(".donation-reference").text();
			tileprevLevel = $j('#WrpopupPrev .prevCategz');
			tileprevLevel.text(donationLevel);
			
			$j(this).addClass("selected");
			
			amountSelected = true;
			
			if ($userOtherDonation.val() == "") {
				$donationBody.find(".other p.other-amount").show();
			}
			
			var cleanAmount = donationAmount.slice(1), finalAmount = $('input#other_amount');
			finalAmount.val(cleanAmount);
		} else {
			$j(this).addClass("selected");
			$j(this).parent().find(".donation-content").removeClass("light-red-selected-donation");
			$j(this).parent().find(".donation-amount").removeClass("dark-red-selected-donation");
			
			$donationBody.find(".other p.other-amount").hide();
			$userOtherDonation.focus();
			
			amountSelected = false;
		}
	});
	
	$donationContainer.find("#step-5 input").on("click", function (e) {
		var sectionClass;
		
		$donationContainer.find("#step-5 input").removeClass("error-input");
		
		if ($j(this).hasClass("virtual-tile")) {
			$donationContainer.find(".oval").removeClass("selected");
			tileDonationTriggered = false;
		} else if ($j(this).hasClass("virtual-tile-honor")) {
			if (!$donationContainer.find("#in-honor-donation .oval").hasClass("selected")) {
				$donationContainer.find(".oval").removeClass("selected");
				$donationContainer.find("#in-honor-donation .oval").addClass("selected");
				
				virtualTileSelection = "honor-oval";
			} 
			
			tileDonationTriggered = true;
		} else {
			if (!$donationContainer.find("#in-memory-donation .oval").hasClass("selected")) {
				$donationContainer.find(".oval").removeClass("selected");
				$donationContainer.find("#in-memory-donation .oval").addClass("selected");
				
				virtualTileSelection = "memory-oval";
			}
			
			tileDonationTriggered = true;
		}
	});
	
	$tileSelector.on("click", function (e){
		e.preventDefault();
		
		$tileSelector.removeClass("selected");
		
		$j(this).addClass("selected");
		
		virtualTileSelection = $j(this).attr("href");
		
		$donationBody.find(".section-top input").removeClass("error-input");
		$donationBody.find(".section-bottom input").removeClass("error-input");
		
		tileDonationTriggered = true;
	});
	
	$userTileToWall.on("click", function (e) {
		e.preventDefault();
	
		$donationContainer.find("#step-6 .left-container a").each( function (index, element) {
			$j(this).removeClass("selected");
		});
		
		$j(this).addClass("selected");
		
		animalTileSelected = $j(this).data("animal");
	});
	
	$userColorTileToWall.on("click", function (e) {
		e.preventDefault();
		
		$donationContainer.find("#step-6 .right-container a").each( function (index, element) {
			$j(this).removeClass("selected");
		});
		
		$j(this).addClass("selected");
		
		colorTileSelected = $j(this).data("color"); 
	});
	
	$donationContainer.find("input").on("click", function (e) {
		$j(this).removeClass("error-input");
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
		$donationBody.find(".donation-content").removeClass("light-yellow-selected-donation");
		$donationBody.find(".donation-amount").removeClass("dark-yellow-selected-donation");
		$donationBody.find(".oval").removeClass("selected");
		$donationContainer.find("input").removeClass('error-input');

			$donationHeader.find("h1").fadeOut("slow", function() {
				$j(this).text("Choose your donation amount");
				$j(this).fadeIn();
			});
			
			$donationHeader.find("h2").text("Together we can create Ocean Wonders: Sharks! and build a new New York Aquarium for generations of curious minds to come.");
			$donationHeader.find("h2").fadeIn();
			
			$donationContainer.animate({
				height: 475
			}, 500, "linear");
			
			currentDonationStep = 1;
			
			$donationSteps.find(".step-number").text(currentDonationStep);
			$donationNext.removeClass("complete-tile");
			$donationNext.fadeIn();
			$donateAnotherTile.fadeOut();
			$viewYourTile.fadeOut();
			
			$donationBody.find("#step-" + currentDonationStep).show().fadeIn();
		});
		
	});
	
	$viewYourTile.on("click", function (e) {
		e.preventDefault();
		var that = $(this);
		resetDonationForm();
		currentDonationStep = 1;
		
		window.location.href = that.attr('href');
	});
	
	$userOtherDonation.on("click", function (e) {
		e.preventDefault();
		
		$donationBody.find(".other p.other-amount").hide();
		
		resetInitialDonationFields();
	});
	
	$userOtherDonation.on("keyup", function (e) {
		e = (e) ? e : window.event;
		var charCode = (e.which) ? e.which : e.keyCode;
		
		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		    return false;
		} 
		
		checkOnUserKeyInput();
		
		return true;
	});
	
	$donationBody.find(".other p").on("click", function (e) {
		e.preventDefault();
		
		$j(this).hide();
		$userOtherDonation.focus();
	});
	
	function checkOnUserKeyInput() {
		var userInput = Number($userOtherDonation.val());
		
		if (!regExpNumbers.test($userOtherDonation.val()) && userInput >= 25) {				
			if(userInput >= 25 && userInput < 100) {							
				$donationBody.find(".donation-content.other .donation-reference").text("Friend");	
			} else if (userInput >= 100 && userInput < 250) {
				$donationBody.find(".donation-content.other .donation-reference").text("Supporter");
			} else {
				$donationBody.find(".donation-content.other .donation-reference").text("Transformer");	
			} 
		}
		
		if ($userOtherDonation.val() == "") {
			$donationBody.find(".donation-content.other .donation-reference").text("");	
		}
	}
	// Step 1: user selects a donation amount or enter one that is > $25
	function authorizeFirstStep () {
		// If the user selects a default amount, proceed to the next section; otherwise,
		// validate the user entry.
		if (amountSelected) {
			continueToSecondStep();		
		} else {		
			var amountRegistered = Number($userOtherDonation.val());
				
			if (!regExpNumbers.test($userOtherDonation.val()) && amountRegistered >= 25) {	
				
				if(amountRegistered >= 25 && amountRegistered < 100) {					
					donationLevel = "Friend";					
				} else if (amountRegistered >= 100 && amountRegistered < 250) {
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
			var finalAmount = $('input#other_amount');
			finalAmount.val(amountRegistered);
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
			
			$donationSteps.find(".step-number").text(currentDonationStep);
			$donationBackBtn.show();
			
			$donationHeader.find("h1").fadeOut("slow", function() {
				$j(this).text("Enter Billing Information");
				$j(this).fadeIn();
			});
			
			$donationHeader.find("h2").hide();

			$donationBody.find("#step-" + currentDonationStep).fadeIn();
		});
	}
	/* If user wants to donate a differet amount, back button will return him/her to donation section */
	function goBackToFirstStep() {
		$donationBody.find("#step-" + currentDonationStep).fadeOut("slow", function () {
			currentDonationStep--;
			
			$donationHeader.animate({
				height: 128
			}, 500, "linear");
			
			$donationHeader.find("h1").animate({
				paddingTop: 35
			}, 500, "linear");
			
			$donationContainer.animate({
				height: 475
			}, 500, "linear");
			
			$donationSteps.find(".step-number").text(currentDonationStep);
			$donationBackBtn.hide();
			
			$donationHeader.find("h1").fadeOut("slow", function() {
				$j(this).text("Choose donation amount");
				$j(this).fadeIn();
			});
			
			$donationHeader.find("h2").show();

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
					$j(this).text("Summary");
					$j(this).fadeIn();
				});
			
				$donationNext.addClass("submit-transition");
				
				if (donationLevel == "Supporter") {
					$j("#step-" + currentDonationStep).find(".supporter-donation").show();
					$j("#step-" + currentDonationStep).find(".transformer-donation").hide();
					$j("#step-" + currentDonationStep).find(".friend-donation").hide();
				} else if (donationLevel == "Transformer") {
					$j("#step-" + currentDonationStep).find(".transformer-donation").show();
					$j("#step-" + currentDonationStep).find(".supporter-donation").hide();
					$j("#step-" + currentDonationStep).find(".friend-donation").hide();
				} else {
					$j("#step-" + currentDonationStep).find(".friend-donation").show();
					$j("#step-" + currentDonationStep).find(".supporter-donation").hide();
					$j("#step-" + currentDonationStep).find(".transformer-donation").hide();
				}
			
				$j("#step-" + currentDonationStep).find(".transaction-donation").text(donationAmount);
				$j("#step-" + currentDonationStep).find(".transaction-level").text(donationLevel);
				
				$donationSteps.find(".step-number").text(currentDonationStep);
				$donationBody.find("#step-" + currentDonationStep).fadeIn();
			});
		}
	}
	
	function goBackToSecondStep() {
		$donationBody.find("#step-" + currentDonationStep).fadeOut("slow", function () {
			currentDonationStep--;
			
			$donationContainer.animate({
				height: 430
			}, 500, "linear");
			
			$donationHeader.find("h1").fadeOut("slow", function () {
				$j(this).text("Enter Billing Information");
				$j(this).fadeIn();
			});
			
			$donationNext.removeClass("submit-transition");
			
			$donationSteps.find(".step-number").text(currentDonationStep);
			$donationBody.find("#step-" + currentDonationStep).fadeIn();
		});
	}
	// Step 3: let the user acknowledge the amount of the transaction and what kind of donor he/she will become
	function submitTransaction () {
		$donationBody.find("#step-" + currentDonationStep).fadeOut("slow", function () {
			currentDonationStep++;
			
			$donationContainer.animate({
				height: 65
			}, 500, "linear");
			
			$donationHeader.find("h1").fadeOut("slow", function () {
				$j(this).text("Your transaction is complete");
				$donationNext.removeClass("submit-transition").addClass("personalize-tile");

				$j(this).fadeIn();
			});
			
			$donationBody.hide();
			$donationBackBtn.hide();
		});
	}
	// Step 4: transaction was successful; now user has the chance to initiate tile customization
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
				$j(this).text("Personalize your virtual tile");				
				$j(this).fadeIn();
			});
			
			$donationHeader.find("h2").text("In appreciation of your support, you can personalize a symbolic tile on our virtual shimmer wall.").show();
			$donationSteps.find(".step-number").text(currentDonationStep - 1);
			$donationBackBtn.hide();
			$donationBody.find("#step-" + currentDonationStep).fadeIn();
		});
	}
	
	function goBackToFourthStep () {
		$donationBody.find("#step-" + currentDonationStep).fadeOut("slow", function () {
			currentDonationStep--;
			
			$donationBackBtn.hide();
			$donationNext.removeClass("complete-tile").addClass("personalize-tile");
			
			$donationBody.find("#step-" + currentDonationStep).fadeIn();
		});
	}
	
	function customizeUserTile () {
		var tileInfoVerification = verifyTileInfoEntry();
		
		if (tileInfoVerification) {
			$donationBody.find("#step-" + currentDonationStep).fadeOut("slow", function () {
				currentDonationStep++;
			
				$donationSteps.find(".step-number").text(currentDonationStep - 1);
				$donationBody.find("#step-" + currentDonationStep).fadeIn();
				$donationNext.removeClass("personalize-tile").addClass("complete-tile");
				$donationBackBtn.show();
			});
		}
	}
	
	function thankYouSection () {
		if (animalTileSelected != "" &&  colorTileSelected != "") {
			$donationBody.find("#step-" + currentDonationStep).fadeOut("slow", function () {
				currentDonationStep++;
			
				$donationContainer.animate({
					height: 430
				}, 500, "linear");
			
				$donationNext.removeClass("virtual-submit");
				$donationNext.fadeOut();
				$donateAnotherTile.fadeIn();
				$viewYourTile.fadeIn();
				$donationBackBtn.hide();
				$donationBody.find("#step-" + currentDonationStep).fadeIn();
			});
		}
	}
	
	function resetDonationForm () {
		amountSelected = false;
		
		$donationBody.find(".donation-content").removeClass("light-yellow-selected-donation");
		$donationBody.find(".donation-amount").removeClass("dark-yellow-selected-donation");
		$donationBody.find(".oval").removeClass("selected");
		
		$donationContainer.find("input").removeClass("error-input").val("");
		$donationContainer.find("#step-6 a.tile").removeClass("selected");
		$donationSteps.find(".step-number").text(1);
		animalTileSelected = "anmbg1";
		colorTileSelected = "1";
	}
	
	function setFooterFAQ() {
		$j("#socialNetworks a:nth-child(3)").attr("href", "page-faq");
		$j("#socialNetworks a:nth-child(3) img").attr("src", "/wp-content/themes/spectrum-parallax-blog/images/icons/socialmedia/faq.png");
	}
	
	function checkOnTransactionInput () {
		var infoVerified = false, // needs to be false, set to true for testing only
			userInputClear = false,
			userCCTypeSelected = false,
			stateSelected = false,
			countrySelected = false,
			expDaySelected = false,
			expYearSelected = false,
			$ccSelection = $donationBody.find("input:radio[name=cc-type]"),
			stateSelection = $donationBody.find("#select-state .dd-selected-text").text(),
			countrySelection = $donationBody.find("#select-country .dd-selected-text").text(),
			selectExpDay = $donationBody.find("#select-exp-day .dd-selected-text").text(),
			selectExpYear = $donationBody.find("#select-exp-year .dd-selected-text").text();
		
		$donationBody.find("#step-2 input").each( function (index, element) {
			if ($j(this).val() == "") {
				$j(this).addClass("error-input");
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
				countrySelected = true;
		} 
		
		if (stateSelection != "State") {
			stateSelected = true;
		} 

		if (userInputClear && userCCTypeSelected && stateSelected && countrySelected) {
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
				if ($j(this).val() == "") {
					$j(this).addClass("error-input");
				} else {
					tileNameLocation = true;
				}
			});
		} else {
			if (virtualTileSelection == "honor-oval") {
				$donationBody.find("#in-honor-donation input").each( function (index, element) {
					if ($j(this).val() == "") {
						$j(this).addClass("error-input");
					} else {
						donationOrMemoryInput = true;
					}
				}); 
			} else {
				if ($donationBody.find("#in-memory-donation input").val() == "") {
					$donationBody.find("#in-memory-donation input").addClass("error-input");
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
	
	function gotoDonationForm () {	
		var moveToPosition = 4618; //$window.height() * 5;

		$(document.body).animate({
			scrollTop: moveToPosition
		}, 500, "linear", function() {
			$("#donation-widget-steps").show();
			$widgetDonate.hide();
		});
	}
	
	function navOverwriteTransition (moveToPosition) {
		$(document.body).animate({
			scrollTop: moveToPosition
		}, 500, "linear");
	}
	
	function resetInitialDonationFields() {
		$donationSelector.removeClass("selected");	
		
		$donationBody.find(".donation-content").removeClass("light-yellow-selected-donation");
		$donationBody.find(".donation-amount").removeClass("dark-yellow-selected-donation");
		$donationBody.find(".donation-content").removeClass("light-red-selected-donation");
		$donationBody.find(".donation-amount").removeClass("dark-red-selected-donation");
		
		$donationBody.find(".oval-other").addClass("selected");
	}
	
	
});