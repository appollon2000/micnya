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
//alert(parallaxHeight);

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
	//For support for up to 20 posts, uncomment the variable and additional code below
	var $eleventhBG = $('#block11');
	var $twelfthBG = $('#block12');
	var $thirteenthBG = $('#block13');
	var $fourteenthBG = $('#block14');
	var $fifteenthBG = $('#block15');
	var $sixteenthBG = $('#block16');
	var $seventeenthBG = $('#block17');
	var $eightteenthBG = $('#block18');
	var $nineteenthBG = $('#block19');
	var $twentythBG = $('#block20');
	var trainerseleven = $("#block11 .bg");
	var trainerstwelve = $("#block12 .bg");
	var trainersthirteen = $("#block13 .bg");
	var trainersfourteen = $("#block14 .bg");
	var trainersfifteen = $("#block15 .bg");
	var trainerssixteen = $("#block16 .bg");
	var trainersseventeen = $("#block17 .bg");
	var trainerseightteen = $("#block18 .bg");
	var trainersnineteen = $("#block19 .bg");
	var trainerstwenty = $("#block20 .bg");
	
	var windowHeight = $window.height(); //get the height of the window
	var trainerBump = 200;
	
	
	//apply the class "inview" to a section that is in the viewport
	$('#block1, #block2, #block3, #block4, #block5, #block6, #block7, #block6, #block7, #block8, #block9, #block10, #block11, #block12, #block13, #block14, #block15, #block16, #block17, #block18, #block19, #block20').bind('inview', function (event, visible) {
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

         
//        $('.parallax-container').each(function(i) {
//          if($(this).hasClass("inview"))
//          {
//             $(this).css({'backgroundPosition': newPos(50, windowHeight, pos, (parallaxHeight * (i+1)), 0.3)});
//             $(this).find('.bg').css({'backgroundPosition': newPos(50, windowHeight, pos, (parallaxHeight* (i+1))+trainerBump, 0.6)});
//
//	   	   }
//        });
//		
		//$.each ('.inview', function(i,parallax){
   		    //removeActive();
   		    //var selector = 'li#blockLink' + (i+1) + ' a';
		   // $(selector).addClass("active");
		  // alert('i = ' + i + ' => ' $(parallax).attr('name'));
		    //$(parallax).css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight * (i+1), 0.3)});
		    //trainers.css({'backgroundPosition': newPos(50, windowHeight, pos, (parallaxHeight* (i+1))+trainerBump, 0.6)});
 			//});
  	

		//if the first section is in view...
		if($firstBG.hasClass("inview")){
			//call the newPos function and change the background position
			removeActive();
			$("li#blockLink1 a").addClass("active");
			$firstBG.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight, 0.3)});
			trainers.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight+trainerBump, 0.6)});
		}
		
		//if the second section is in view...
		if($secondBG.hasClass("inview")){
			//call the newPos function and change the background position
			removeActive();
			$("li#blockLink2 a").addClass("active");
			$secondBG.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*2, 0.3)});
			//call the newPos function and change the secnond background position
			trainerstoo.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*2+trainerBump, 0.6)});
		}
		
		//if the third section is in view...
		if($thirdBG.hasClass("inview")){
			//call the newPos function and change the background position
			removeActive();
			$("li#blockLink3 a").addClass("active");
			$thirdBG.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*3, 0.3)});
			trainersthree.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*3+trainerBump, 0.6)});
		}
		
		//if the fourth section is in view...
		if($fourthBG.hasClass("inview")){
			//call the newPos function and change the background position for CSS3 multiple backgrounds
			removeActive();
			$("li#blockLink4 a").addClass("active");
			$fourthBG.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*4, 0.3)});
			trainersfour.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*4+trainerBump, 0.6)});
		}
		
		//if the fifth section is in view...
		if($fifthBG.hasClass("inview")){
			//call the newPos function and change the background position for CSS3 multiple backgrounds
			removeActive();
			$("li#blockLink5 a").addClass("active");
			$fifthBG.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*5, 0.3)});
			trainersfive.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*5+trainerBump, 0.6)});
		}
		
		if($sixthBG.hasClass("inview")){
			//call the newPos function and change the background position for CSS3 multiple backgrounds
			removeActive();
			$("li#blockLink6 a").addClass("active");
			$sixthBG.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*6, 0.3)});
			trainerssix.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*6+trainerBump, 0.6)});
		}
		
		if($seventhBG.hasClass("inview")){
			//call the newPos function and change the background position for CSS3 multiple backgrounds
			removeActive();
			$("li#blockLink7 a").addClass("active");
			$seventhBG.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*7, 0.3)});
			trainersseven.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*7+trainerBump, 0.6)});
		}
		
		if($eighthBG.hasClass("inview")){
			//call the newPos function and change the background position for CSS3 multiple backgrounds
			removeActive();
			$("li#blockLink8 a").addClass("active");
			$eighthBG.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*8, 0.3)});
			trainerseight.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*8+trainerBump, 0.6)});
		}
		
		if($ninthBG.hasClass("inview")){
			//call the newPos function and change the background position for CSS3 multiple backgrounds
			removeActive();
			$("li#blockLink9 a").addClass("active");
			$ninthBG.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*9, 0.3)});
			trainersnine.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*9+trainerBump, 0.6)});
		}
		
		if($tenthBG.hasClass("inview")){
			//call the newPos function and change the background position for CSS3 multiple backgrounds
			removeActive();
			$("li#blockLink10 a").addClass("active");
			$tenthBG.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*10, 0.3)});
			trainersten.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*10+trainerBump, 0.6)});
		}
		
		if($eleventhBG.hasClass("inview")){
			//call the newPos function and change the background position for CSS3 multiple backgrounds
			removeActive();
			$("li#blockLink11 a").addClass("active");
			$eleventhBG.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*11, 0.3)});
			trainerseleven.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*11+trainerBump, 0.6)});
		}
		
		if($twelfthBG.hasClass("inview")){
			//call the newPos function and change the background position for CSS3 multiple backgrounds
			removeActive();
			$("li#blockLink12 a").addClass("active");
			$twelfthBG.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*12, 0.3)});
			trainerstwelve.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*12+trainerBump, 0.6)});
		}
		
		if($thirteenthBG.hasClass("inview")){
			//call the newPos function and change the background position for CSS3 multiple backgrounds
			removeActive();
			$("li#blockLink13 a").addClass("active");
			$thirteenthBG.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*13, 0.3)});
			trainersthirteen.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*13+trainerBump, 0.6)});
		}
		
		if($fourteenthBG.hasClass("inview")){
			//call the newPos function and change the background position for CSS3 multiple backgrounds
			removeActive();
			$("li#blockLink14 a").addClass("active");
			$fourteenthBG.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*14, 0.3)});
			trainersfourteen.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*14+trainerBump, 0.6)});
		}
		
		if($fifteenthBG.hasClass("inview")){
			//call the newPos function and change the background position for CSS3 multiple backgrounds
			removeActive();
			$("li#blockLink15 a").addClass("active");
			$fifteenthBG.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*15, 0.3)});
			trainersfifteen.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*15+trainerBump, 0.6)});
		}
		
		if($sixteenthBG.hasClass("inview")){
			//call the newPos function and change the background position for CSS3 multiple backgrounds
			removeActive();
			$("li#blockLink16 a").addClass("active");
			$sixteenthBG.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*16, 0.3)});
			trainerssixteen.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*16+trainerBump, 0.6)});
		}
		
		if($seventeenthBG.hasClass("inview")){
			//call the newPos function and change the background position for CSS3 multiple backgrounds
			removeActive();
			$("li#blockLink17 a").addClass("active");
			$seventeenthBG.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*17, 0.3)});
			trainersseventeen.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*17+trainerBump, 0.6)});
		}
		
		if($eightteenthBG.hasClass("inview")){
			//call the newPos function and change the background position for CSS3 multiple backgrounds
			removeActive();
			$("li#blockLink18 a").addClass("active");
			$eightteenthBG.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*18, 0.3)});
			trainerseightteen.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*18+trainerBump, 0.6)});
		}
		
		if($nineteenthBG.hasClass("inview")){
			//call the newPos function and change the background position for CSS3 multiple backgrounds
			removeActive();
			$("li#blockLink19 a").addClass("active");
			$nineteenthBG.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*19, 0.3)});
			trainersnineteen.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*19+trainerBump, 0.6)});
		}
		
		if($twentythBG.hasClass("inview")){
			//call the newPos function and change the background position for CSS3 multiple backgrounds
			removeActive();
			$("li#blockLink20 a").addClass("active");
			$twentythBG.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*20, 0.3)});
			trainerstwenty.css({'backgroundPosition': newPos(50, windowHeight, pos, parallaxHeight*20+trainerBump, 0.6)});
		}
		
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