/*
JavaScript for the demo: Recreating the Nikebetterworld.com Parallax Demo
Demo: Recreating the Nikebetterworld.com Parallax Demo
Author: Ian Lunn
Author URL: http://www.ianlunn.co.uk/
Demo URL: http://www.ianlunn.co.uk/demos/recreate-nikebetterworld-parallax/
Tutorial URL: http://www.ianlunn.co.uk/blog/code-tutorials/recreate-nikebetterworld-parallax/

License: http://creativecommons.org/licenses/by-sa/3.0/ (Attribution Share Alike). Please attribute work to Ian Lunn simply by leaving these comments in the source code or if you'd prefer, place a link on your website to http://www.ianlunn.co.uk/.

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/

$(document).ready(function() { //when the document is ready...


	//save selectors as variables to increase performance
	var $window = $(window);
	var $firstBG = $('#block1');
	var $secondBG = $('#block2');
	var $thirdBG = $('#block3');
	var $fourthBG = $('#block4');
	var $fifthBG = $('#block5');
	var $sixthBG = $('#block6');
	var $seventhBG = $('#block7');
	var $eighthBG = $('#block8');
	var $ninthBG = $('#block9');
	var $tenthBG = $('#block10');
	var trainers = $("#block1 .bg");
	var trainerstoo = $("#block2 .bg");
	var trainersthree = $("#block3 .bg");
	var trainersfour = $("#block4 .bg");
	var trainersfive = $("#block5 .bg");
	var trainerssix = $("#block6 .bg");
	var trainersseven = $("#block7 .bg");
	var trainerseight = $("#block8 .bg");
	var trainersnine = $("#block9 .bg");
	var trainersten = $("#block10 .bg");
	
	var windowHeight = $window.height(); //get the height of the window
	
	
	//apply the class "inview" to a section that is in the viewport
	$('#block1, #block2, #block3, #block4, #block5, #block6, #block7, #block6, #block7, #block8, #block9, #block10').bind('inview', function (event, visible) {
			if (visible == true) {
			$(this).addClass("inview");
			} else {
			$(this).removeClass("inview");
			}
		});
	
			
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
		return x + "% " + (-((windowHeight + pos) - adjuster) * inertia)  + "px";
	}
	
	//function to be called whenever the window is scrolled or resized
	function Move(){ 
		var pos = $window.scrollTop(); //position of the scrollbar

		//if the first section is in view...
			//call the newPos function and change the background position
			$firstBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 800, 0.3)});
			trainers.css({'backgroundPosition': newPos(50, windowHeight, pos, 900, 0.6)});
		
		//if the second section is in view...
			//call the newPos function and change the background position
			$secondBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 1800, 0.3)});
			//call the newPos function and change the secnond background position
			trainerstoo.css({'backgroundPosition': newPos(50, windowHeight, pos, 1900, 0.6)});
		
		//if the third section is in view...
			//call the newPos function and change the background position
			$thirdBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 2700, 0.3)});
			trainersthree.css({'backgroundPosition': newPos(50, windowHeight, pos, 2800, 0.6)});
		
		
		//if the fourth section is in view...
			//call the newPos function and change the background position for CSS3 multiple backgrounds
			$fourthBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 3600, 0.3)});
			trainersfour.css({'backgroundPosition': newPos(50, windowHeight, pos, 3700, 0.6)});
		
		//if the fifth section is in view...
			//call the newPos function and change the background position for CSS3 multiple backgrounds
			$fifthBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 4500, 0.3)});
			trainersfive.css({'backgroundPosition': newPos(50, windowHeight, pos, 4600, 0.6)});
		
			//call the newPos function and change the background position for CSS3 multiple backgrounds
			$sixthBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 5400, 0.3)});
			trainerssix.css({'backgroundPosition': newPos(50, windowHeight, pos, 5500, 0.6)});
		
			//call the newPos function and change the background position for CSS3 multiple backgrounds
			$seventhBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 6300, 0.3)});
			trainersseven.css({'backgroundPosition': newPos(50, windowHeight, pos, 6400, 0.6)});
		
			//call the newPos function and change the background position for CSS3 multiple backgrounds
			$eighthBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 7200, 0.3)});
			trainerseight.css({'backgroundPosition': newPos(50, windowHeight, pos, 7300, 0.6)});
		
			//call the newPos function and change the background position for CSS3 multiple backgrounds
			$ninthBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 8100, 0.3)});
			trainersnine.css({'backgroundPosition': newPos(50, windowHeight, pos, 8200, 0.6)});
		
			//call the newPos function and change the background position for CSS3 multiple backgrounds
			$tenthBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 9000, 0.3)});
			trainersten.css({'backgroundPosition': newPos(50, windowHeight, pos, 9100, 0.6)});
		
		$('#pixels').html(pos); //display the number of pixels scrolled at the bottom of the page
	}
	
	
	RepositionNav(); //Reposition the Navigation to center it in the window when the script loads
	
	$window.resize(function(){ //if the user resizes the window...
		Move(); //move the background images in relation to the movement of the scrollbar
		RepositionNav(); //reposition the navigation list so it remains vertically central
	});		
	
	$window.bind('scroll', function(){ //when the user is scrolling...
		Move(); //move the background images in relation to the movement of the scrollbar
	});
	
});