;(function ($) {
    var on = $.fn.on, timer;
    $.fn.on = function () {
        var args = Array.apply(null, arguments);
        var last = args[args.length - 1];

        if (isNaN(last) || (last === 1 && args.pop())) return on.apply(this, args);

        var delay = args.pop();
        var fn = args.pop();

        args.push(function () {
            var self = this, params = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(self, params);
            }, delay);
        });

        return on.apply(this, args);
    };
}(this.jQuery || this.Zepto));

$.fn.is_on_screen = function(){
    var win = $(window);
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
 
    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
 
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};

function getUrlVars()
{
var vars = [], hash;
var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
for(var i = 0; i < hashes.length; i++)
{
hash = hashes[i].split('=');
vars.push(hash[0]);
vars[hash[0]] = hash[1];
}
return vars;
}

var $parentDiv = $('#ib-main-wrapper'),documt = $(document),inpt=$('#searchGo'),inpt2=$('#searchGo2'),resu=$('#results'),resu2=$('#results2'),ints=$('input#searchTerm'),ints2=$('input#searchTerm2'),formz=$('form#searchus'),formz2=$('form#searchus2'),animals=$('#donation-container .animals ul li a'),colors=$('#donation-container .colourBar ul li a'), prevTile = $('a#preview-tile'), prevClose = $('.prevClose a'), ctdn = jQuery('#widget-days-left'), clkDonate = $('a.click-donate'), indivTile = $('div.ib-main div.tyle'), clkArrow = $('#mission-block-container #arrow-down a'),mobMenu =$('#mobNav'),mobMenuAnc =$('#mobNav ul li a'),shimclose=$('.shimclose a'),mob1 = $('.ensb ul li a').eq(0),mob2 = $('.ensb ul li a').eq(1),mob3 = $('.ensb ul li a').eq(2),mob4 = $('.ensb ul li a').eq(3),donNex = $('#next a');

$j = jQuery.noConflict();
$(function() {

var $ibWrapper  = $j('#ib-main-wrapper'),

Template  = (function() {
    
    // true if dragging the container
  var kinetic_moving        = false,
    // current index of the opened item
    current           = -1,
    // true if the item is being opened / closed
    isAnimating         = false,
    // items on the grid
    $ibItems          = $ibWrapper.find('div.ib-main div.tyle'),
    // image items on the grid
    $ibImgItems         = $ibItems.not('.ib-content'),
    // total image items on the grid
    imgItemsCount       = $ibImgItems.length,
    init            = function() {
      
      // add a class ib-image to the image items
      $ibImgItems.addClass('ib-image');
      // apply the kinetic plugin to the wrapper
      loadKinetic();
      // load some events
      initEvents();
  
    },
    loadKinetic         = function() {
      setWrapperSize();              
      $ibWrapper.kinetic({
        moved : function() {
          
          kinetic_moving = true;
          
        },
        stopped : function() {
          
          kinetic_moving = false;
          
        },
        maxvelocity: 100,
        throttleFPS:100
      });
      
    },
    setWrapperSize  = function() {
      
      var containerMargins  = $j('#ib-top').outerHeight(true) + $j('#header').outerHeight(true) + parseInt( $ibItems.css('margin-top') );
      $ibWrapper.css({"height": 440,width: 583});
      
    },
    initEvents   = function() {
    
      // open the item only if not dragging the container
      $ibItems.bind('click.ibTemplate', function( event ) {
        
        if( !kinetic_moving )
          openItem( $j(this) );
      
        return false; 
      
      });
      
      // on window resize, set the wrapper and preview size accordingly
      $j(window).bind('resize.ibTemplate', function( event ) {
        
        setWrapperSize();
        
        $j('#ib-img-preview, #ib-content-preview').css({
          width : 583,
          height  : 440
        })
        
      });
    
    },
    openItem   = function( $item ) {
      
      if( isAnimating ) return false;
      
      // if content item
      if( $item.hasClass('ib-content') ) {
        
        isAnimating = true;
        current = $item.index('.ib-content');
        loadContentItem( $item, function() { isAnimating = false; } );
        
      }
      // if image item
      else {
      
        isAnimating = true;
        current = $item.index('.ib-image');
        loadImgPreview( $item, function() { isAnimating = false; } );
        
      }
      
    },
    // opens one image item (fullscreen)
    loadImgPreview        = function( $item, callback ) {
      
      var largeSrc    = $item.children('img').data('largesrc'),
        description   = $item.children('span').text(),
        largeImageData  = {
          src     : largeSrc,
          description : description
        };
      
      // preload large image
      $item.addClass('ib-loading');
      
      preloadImage( largeSrc, function() {
        
        $item.removeClass('ib-loading');
        
        var hasImgPreview = ( $j('#ib-img-preview').length > 0 );
        
        if( !hasImgPreview )
          $j('#previewTmpl').tmpl( largeImageData ).insertAfter( $ibWrapper );
        else
          $j('#ib-img-preview').children('img.ib-preview-img')
                    .attr( 'src', largeSrc ).end()
                    .find('span.ib-preview-descr')
                    .text( description );
          
        //get dimentions for the image, based on the windows size
        var dim = getImageDim( largeSrc );
        
        $item.removeClass('ib-img-loading');
        
        //set the returned values and show/animate preview
       $j('#ib-img-preview').css({
          width : $item.width(),
          height  : $item.height(),
          left  : $item.offset().left,
          top   : $item.offset().top
        }).children('img.ib-preview-img').hide().css({
          width : dim.width,
          height  : dim.height,
          left  : dim.left,
          top   : dim.top
        }).fadeIn( 400 ).end().show().animate({
          width : 250,
          left  : 0
        }, 100, 'easeOutExpo', function() {
        
          $j(this).animate({
            height  : 250,
            top   : 0
          }, 100, function() {
          
            var $this = $j(this);
            $this.find('span.ib-preview-descr, span.ib-close').show()
            if( imgItemsCount > 1 )
              $this.find('div.ib-nav').show();
              
            if( callback ) callback.call();
          
          });
        
        });
        
        if( !hasImgPreview )
          initImgPreviewEvents();
        
      } );
      
    },
    // opens one content item (fullscreen)
    loadContentItem  = function( $item, callback ) {
      
      var hasContentPreview = ($j('#ib-content-preview').length > 0 ),
        honor        = $item.children('div.honor').html(),
        teaser        = $item.children('div.ib-teaser').html(),
        categz        = $item.children('div.categz').html(),
        tsdates        = $item.children('div.ts-dates').html(),
        tscity        = $item.children('div.ts-city').html(),
        tssocial        = $item.children('div.socialz').html(),
        popupbg        = $item.children('div.popupbg').html(),
        content       = $item.children('div.ib-content-full').html(),
        contentData     = {
          honor: honor,
          teaser    : teaser,
          categz    : categz,
          tsdates   : tsdates,
          tscity    : tscity,
          tssocial  : tssocial,
          popupbg : popupbg,
          content : content
        };
        
      if( !hasContentPreview )
        $j('#contentTmpl').tmpl( contentData ).insertAfter( $ibWrapper );
        
      //set the returned values and show/animate preview
      $j('#ib-content-preview').removeAttr('rel').css({
        width : $item.width(),
        height  : $item.height(),
        left  : $item.offset().left,
        top   : $item.offset().top
      }).attr('rel',popupbg).show().fadeIn(function() {
      
        $j(this).animate({
        }, 100, function() {
          
          var $this = $j(this),
            $honor = $this.find('div.honor'),
            $teaser = $this.find('div.ib-teaser'),
            $content= $this.find('div.ib-content-full'),
            $tsdates = $this.find('div.ts-dates'),
            $tscity = $this.find('div.ts-city'),
            $categz = $this.find('div.categz'),
            $tssocial = $this.find('div.socialz'),
            $popupbg = $this.find('div.popupbg'),
            $close  = $this.find('span.ib-close');
            
          if( hasContentPreview ) {
            $honor.html( honor )
            $teaser.html( teaser )
            $content.html( content )
            $tsdates.html( tsdates )
            $tscity.html( tscity )
            $categz.html( categz )
            $tssocial.html( tssocial )
            $popupbg.html( popupbg )
          }
          $honor.show();
          $teaser.show();
          $content.show();
          $tsdates.show();
          $tscity.show();
          $categz.show();
          $categz.show();
          $tssocial.show();
          $close.show();
          
          if( callback ) callback.call();
        
        });
      
      });
      
      if( !hasContentPreview )
        initContentPreviewEvents(); 
      
    },
    // preloads an image
    preloadImage  = function( src, callback ) {
    
      $j('<img/>').load(function(){
      
        if( callback ) callback.call();
      
      }).attr( 'src', src );
    
    },
    // load the events for the image preview : navigation ,close button, and window resize
    initImgPreviewEvents    = function() {
    
      var $preview  =$j('#ib-img-preview');
      
      $preview.find('span.ib-nav-prev').bind('click.ibTemplate', function( event ) {
        
        navigate( 'prev' );
        
      }).end().find('span.ib-nav-next').bind('click.ibTemplate', function( event ) {
        
        navigate( 'next' );
        
      }).end().find('span.ib-close').bind('click.ibTemplate', function( event ) {
        
        closeImgPreview();
        
      });
      
      //resizing the window resizes the preview image
      $j(window).bind('resize.ibTemplate', function( event ) {
        
        var $largeImg = $preview.children('img.ib-preview-img'),
          dim     = getImageDim( $largeImg.attr('src') );
        
        $largeImg.css({
          width : dim.width,
          height  : dim.height,
          left  : dim.left,
          top   : dim.top
        })
        
      });
      
    },
    // load the events for the content preview : close button
    initContentPreviewEvents  = function() {
    
      $j('#ib-content-preview').find('span.ib-close').bind('click.ibTemplate', function( event ) {
        
        closeContentPreview();
        
      });
      
    },
    // navigate the image items in fullscreen mode
    navigate          = function( dir ) {
      
      if( isAnimating ) return false;
      
      isAnimating   = true;
      
      var $preview  = $j('#ib-img-preview'),
        $loading  = $preview.find('div.ib-loading-large');
      
      $loading.show();
      
      if( dir === 'next' ) {
        
        (current === imgItemsCount - 1) ? current = 0 : ++current;
        
      }
      else if(dir === 'prev') {
        
        (current === 0) ? current = imgItemsCount - 1 : --current;
        
      }
      
      var $item   = $ibImgItems.eq( current ),
        largeSrc  = $item.children('img').data('largesrc'),
        description = $item.children('span').text();
        
      preloadImage( largeSrc, function() {
        
        $loading.hide();
        
        //get dimentions for the image, based on the windows size
        var dim = getImageDim( largeSrc );
        
        $preview.children('img.ib-preview-img')
                  .attr( 'src', largeSrc ).css({
          width : dim.width,
          height  : dim.height,
          left  : dim.left,
          top   : dim.top
          })
                .end()
                .find('span.ib-preview-descr')
                .text( description );
        
        $ibWrapper.scrollTop( $item.offset().top )
              .scrollLeft( $item.offset().left );
        
        isAnimating = false;
        
      });
      
    },
    // closes the fullscreen image item
    closeImgPreview       = function() {
    
      if( isAnimating ) return false;
      
      isAnimating = true;
      
      var $item = $ibImgItems.eq( current );
      
      $j('#ib-img-preview').find('span.ib-preview-descr, div.ib-nav, span.ib-close')
              .hide()
              .end()
              .animate({
                height  : $item.height(),
                top   : $item.offset().top
                }, 100, 'easeOutExpo', function() {
                
                $j(this).animate({
                  width : $item.width(),
                  left  : $item.offset().left
                  }, 100, function() {
                  
                   $j(this).fadeOut(function() {isAnimating = false;});
                  
                } );
              
              });
              
              },
              // closes the fullscreen content item
              closeContentPreview     = function() { 
                if( isAnimating ) return false;   
                isAnimating = true;
                var $item = $ibItems.not('.ib-image').eq( current );
               $j('#ib-content-preview').find('div.ib-teaser, div.ib-content-full, span.ib-close')
                            .hide().end().fadeOut(function() {isAnimating = false;});     
              },
              // get the size of one image to make it full size and centered
              getImageDim  = function( src ) {
                
                var img = new Image();
                img.src  = src;                
                var w_w = 583,
                  w_h = 440,
                  r_w = w_h / w_w,
                  i_w = img.width,
                  i_h = img.height,
                  r_i = i_h / i_w,
                  new_w, new_h,
                  new_left, new_top;
                
                if( r_w > r_i ) {
                
                  new_h = w_h;
                  new_w = w_h / r_i;
                
                } 
                else {
                
                  new_h = w_w * r_i;
                  new_w = w_w;
                
                }           
                return {
                  width : new_w,
                  height  : new_h,
                  left  : (w_w - new_w) / 2,
                  top   : (w_h - new_h) / 2
                };
              
              };
            
            return { init : init };
            
          })();
        
        Template.init();
ctdn.countdown({until: new Date(2014, 6 - 1, 16, 18, 00, 00), format: 'dHMS', timezone: -5,layout: '<div class="countdown_section">' + '<span class="countdown_amount">{dnn}&nbsp;</span></div>'});
animals.on("click", function(e) {
  e.preventDefault();
  var that = $(this),rel = that.attr('rel'),dat = that.attr('data'), icz = that.attr('data-icon'), motif = $('#WrpopupPrev-box #WrpopupPrev');
  $("#rec0Icon ul li a[data='"+dat+"']").removeClass('lrner');
  $('input#'+dat).val(rel);
  motif.attr('rel',icz);
  that.addClass('lrner');
});
colors.on("click", function(e) {
  e.preventDefault();
  var that = $(this),rel = that.attr('rel'),dat = that.attr('data');
  $("#donorColour00 ul li a[data='"+dat+"']").removeClass('crner');
  $('input#'+dat).val(rel);
  that.addClass('crner');
});
prevTile.on("click", function(e) {
  e.preventDefault();
  var Box = $('#WrpopupPrev-box'), vname = $('#vtile-name').val(), vloc = $('#vtile-location').val(), hname = $('#honor-name').val(), hemail = $('#honor-email').val(), mname = $('#memory-name').val(), todayDate = $('#today-date').text(), tileFname = $('#WrpopupPrev .prevName h2'), inOf = $('#WrpopupPrev .prevHonor'), tileLoc = $('#WrpopupPrev .prevCity'), tileDate = $('#WrpopupPrev .prevDates'), prevContent = $('#WrpopupPrev .prevContent'), hLength = $('#honor-name').val().length, tileFrom = $('#WrpopupPrev .prevAllgift span'), txtArea = $('textarea.text-area-message').val(),infos=$('#WrpopupPrev .prevAllgift');
  tileLoc.text(vloc);tileDate.text(todayDate);tileFrom.text(vname);prevContent.text(txtArea);
   if(vname.length > 0 && hLength < 1){
    inOf.text('');
    tileFname.text(vname);
    infos.hide();
  }
  if(hLength > 0) {
    inOf.text('In honor of');
    tileFname.text(hname);
    infos.show();
  }
  if(mname.length > 0){
    inOf.text('In memory of');tileFname.text(mname);infos.show();
  }
  Box.show();
});
prevClose.on("click", function(e) {
  e.preventDefault();
  var Box = $('#WrpopupPrev-box');
  Box.hide();
});
documt.mouseup(function (e) {
  var container = $("#WrpopupPrev-box,#tilePreview"),boxOnly = $("#WrpopupPrev-box");
  if (!container.is(e.target) && container.has(e.target).length === 0) 
  {
    boxOnly.hide();
  }

});
documt.mouseup(function (e) {
  var container = $("#results1,#results2"),resbox1 = $('#results'),resbox2 = $('#results2');
  if (!container.is(e.target) && container.has(e.target).length === 0) 
  {
    resbox1.hide();
    resbox2.hide();
  }

});
clkDonate.on("click", function(e) {
  e.preventDefault();
if($('html').hasClass("mozyy")) {
var trigLink = $('ul#nav li#blockLink5 a'),maindonBtn = $('a#donate-now-button'), isOn = $('#donation-container').is(':visible');
if (!isOn){
$("html, body").animate({ scrollTop: 0}, 'fast');
setTimeout(function () {
$("html, body").animate({ scrollTop: $("#block5").offset().top-120});;
maindonBtn.trigger('click');
}, 1400);
}else {
  $("html, body").animate({ scrollTop: $("#donation-container").offset().top - 375 });
}
}else{

var trigLink = $('ul#nav li#blockLink5 a'),maindonBtn = $('a#donate-now-button'), isOn = $('#donation-container').is(':visible');
if (!isOn){
$("html, body").animate({ scrollTop: $("#block5").offset().top });
setTimeout(function () {
maindonBtn.trigger('click');
}, 1400);
}else {
  $("html, body").animate({ scrollTop: $("#block5").offset().top });
}
}
});

clkArrow.on("click", function(e) {
e.preventDefault();
var bdy = $("html, body");
bdy.animate({ scrollTop: 820}, 'slow');
});

setTimeout(function () {
  var doct = $(document),tyl = $('.tyle'),uli1 = $('ul#nav li a').eq(0),uli2 = $('ul#nav li a').eq(4),uli3 = $('ul#nav li a').eq(5),uli4 = $('ul#nav li a').eq(6);
  tyl.each(function(i) {
var row = $('.tyle:even');
var row2 = $('.tyle:odd');
row.addClass('zigzag');
row2.addClass('staticz');
row.slice(0,18).addClass('frontz');row2.slice(0,18).addClass('frontz');
});

doct.mouseup(function (e) {
  var container = $("#ib-content-preview,#ib-main-wrapper"),tinytile = $("#ib-content-preview"),resbox = $('#results');
  if (!container.is(e.target) && container.has(e.target).length === 0) 
  {
    tinytile.find('div.ib-teaser, div.ib-content-full, span.ib-close').hide().end().fadeOut(function() {isAnimating = false;});
  }
  if (!resbox.is(e.target) && resbox.has(e.target).length === 0) 
  {
    resbox.fadeOut();
  }
});

$('#select-state > .dd-select').attr('tabindex', '600');
$('#select-country > .dd-select').attr('tabindex', '800');
$('#select-exp-day > .dd-select').attr('tabindex', '1300');
$('#select-exp-year > .dd-select').attr('tabindex', '1400');
uli1.off("click");uli2.off("click");uli3.off("click");uli4.off("click");
uli1.on("click", function(e) {
e.preventDefault();
$("html, body").animate({ scrollTop: 0 });
});
uli2.on("click", function(e) {
e.preventDefault();
$("html, body").animate({ scrollTop: $("#block5").offset().top });
});
uli3.on("click", function(e) {
e.preventDefault();
$("html, body").animate({ scrollTop: $("#block6").offset().top });
});
uli4.on("click", function(e) {
e.preventDefault();
$("html, body").animate({ scrollTop: $("#block7").offset().top });
});
}, 1600);

setTimeout(function () {
  lDelay = $('.load-delay');
  lDelay.each(function () {
      var imagex = $(this), imgOriginal = imagex.data('original');
      $(imagex).attr('src', imgOriginal);
  });
}, 8000);

function addWave() {
var wrid = $('#ib-main-wrapper'),parz = $('div.tyle', wrid);
  parz.slice(0,36).each(function(i) {
var row = $(this);
    setTimeout(function() {
    row.addClass('skew').delay(150).queue(function(){
    $(this).removeClass('skew').dequeue();
});
  }, 60*i);
});
parz.slice(36,72).each(function(i) {
var row = $(this);
   setTimeout(function() {
    row.addClass('skew').delay(180).queue(function(){
    $(this).removeClass('skew').dequeue();
});
  }, 70*i);
});
parz.slice(72,108).each(function(i) {
var row = $(this);
    setTimeout(function() {
    row.addClass('skew').delay(210).queue(function(){
    $(this).removeClass('skew').dequeue();
});
  }, 80*i);
});
parz.slice(108,144).each(function(i) {
var row = $(this);
    setTimeout(function() {
    row.addClass('skew').delay(240).queue(function(){
    $(this).removeClass('skew').dequeue();
});
  }, 90*i);
});
parz.slice(144,180).each(function(i) {
var row = $(this);
    setTimeout(function() {
    row.addClass('skew').delay(270).queue(function(){
    $(this).removeClass('skew').dequeue();
});
  }, 100*i);
});
parz.slice(180,216).each(function(i) {
var row = $(this);
    setTimeout(function() {
    row.addClass('skew').delay(300).queue(function(){
    $(this).removeClass('skew').dequeue();
});
  }, 110*i);
});
}
function timeWave() {
  nIntervId = setInterval(addWave, 20000);
}
function stopWave() {
  clearInterval(nIntervId);
}

//jQuery.fn.reverse = [].reverse;
//$('.tyle').slice(0,).repeat().each($).animate({opacity:0},$).animate({opacity:1});

inpt.on("click", function(e) {
  e.preventDefault();
  $('#blockLink6 a').trigger('click');
  var inval = $.trim($('input#searchTerm').val()).replace(/ /g,''), rawVal = $('#dosearch input#searchTerm').val();
  resu.empty();   
  if(!inval==''){
    var $innerListItem = $('div.ib-main .tyle[rel*="'+inval+'"]');
    if($innerListItem.length > 0 && $innerListItem.length < 15){
      //console.log($innerListItem);
      resu.empty();ints.val('');
      resu.fadeIn().append("<div class='headerList'>WE FOUND INDIVIDUALS " + $innerListItem.length + " WITH THE NAME "+ rawVal +"</div><ul id='newList'></ul>");
      $innerListItem.each(function() {
var regh2 = ($(this).find('.ib-teaser h2').text().toLowerCase().indexOf(rawVal) >= 0), gifAll= ($(this).find('.allgift').text().replace('From: ','').toLowerCase().indexOf(rawVal) >= 0);
        if(regh2) {
          var fullname = $(this).find('.ib-teaser h2').text(),gotoId = $(this).attr('id'),locat= $(this).find('.ts-city').text();
          $("#newList").append("<li><a class='"+gotoId+"' href='#'><span class='tileAttr first'>"+fullname+"</span> <span class='tileAttr second'>"+locat+"</span></a></li>");
          }else {
          var donname = $(this).find('.allgift').text().replace('From: ',''),gotobId = $(this).attr('id'),locatn= $(this).find('.ts-city').text();
          $("#newList").append("<li><a class='"+gotobId+"' href='#'><span class='tileAttr first'>"+donname+"</span> <span class='tileAttr second'>"+locatn+"</span></a></li>");
        }
      });

}else if($innerListItem.length > 15){
resu.empty().fadeIn().append("<div class='noresults'>WE FOUND INDIVIDUALS " + $innerListItem.length + " WITH THE SAME NAME, PLEASE REFINE YOUR SEARCH");
}
else {
resu.empty().fadeIn().html('<div class="noresults">No matches were found!</div>');
}

}else {
resu.empty().fadeIn().html('<div class="noresults">No matches were found!</div>');
}
});

formz.keypress( function(e) {
var code = e.keyCode || e.which;
if( code === 13 ) {
e.preventDefault();
inpt.trigger('click');
}
});

inpt2.on("click", function(e) {
  e.preventDefault();
  var inval = $.trim($('input#searchTerm2').val()).replace(/ /g,''), rawVal = $('#dosearch2 input#searchTerm2').val();
  resu2.empty();   
  if(!inval==''){
    var $innerListItem = $('div.ib-main .tyle[rel*="'+inval+'"]');
    if($innerListItem.length > 0 && $innerListItem.length < 15){
      //console.log($innerListItem);
      resu2.empty();ints2.val('');
      resu2.fadeIn().append("<div class='headerList'>WE FOUND INDIVIDUALS " + $innerListItem.length + " WITH THE NAME "+ rawVal +"</div><ul id='newList2'></ul>");
      $innerListItem.each(function() {
var regh2 = ($(this).find('.ib-teaser h2').text().toLowerCase().indexOf(rawVal) >= 0), gifAll= ($(this).find('.allgift').text().replace('From: ','').toLowerCase().indexOf(rawVal) >= 0);
        if(regh2) {
          var fullname = $(this).find('.ib-teaser h2').text(),gotoId = $(this).attr('id'),locat= $(this).find('.ts-city').text();
          $("#newList2").append("<li><a class='"+gotoId+"' href='#'><span class='tileAttr first'>"+fullname+"</span> <span class='tileAttr second'>"+locat+"</span></a></li>");
          }else {
          var donname = $(this).find('.allgift').text().replace('From: ',''),gotobId = $(this).attr('id'),locatn= $(this).find('.ts-city').text();
          $("#newList2").append("<li><a class='"+gotobId+"' href='#'><span class='tileAttr first'>"+donname+"</span> <span class='tileAttr second'>"+locatn+"</span></a></li>");
          $("html, body").animate({ scrollTop: $("#block6").offset().top -300 });
        }
      });

}else if($innerListItem.length > 15){
resu2.empty().fadeIn().append("<div class='noresults'>WE FOUND INDIVIDUALS " + $innerListItem.length + " WITH THE SAME NAME, PLEASE REFINE YOUR SEARCH");
$("html, body").animate({ scrollTop: $("#block6").offset().top -300 });
}
else {
resu2.empty().fadeIn().html('<div class="noresults">No matches were found!</div>');
$("html, body").animate({ scrollTop: $("#block6").offset().top -300 });
}

}else {
resu2.empty().fadeIn().html('<div class="noresults">No matches were found!</div>');
$("html, body").animate({ scrollTop: $("#block6").offset().top -300 });
}
});

formz2.keypress( function(e) {
var code = e.keyCode || e.which;
if( code === 13 ) {
e.preventDefault();
inpt2.trigger('click');
$("html, body").animate({ scrollTop: $("#block6").offset().top -300 });
}
});

$(document).on('click', 'ul#newList li a', function (e) {
 e.preventDefault();
var mid = $(this).attr('class'),targz = $('#'+mid),mainFrame = $('#ib-main-wrapper'),rez=$('#results');
rez.fadeOut(800, function() {
mainFrame.animate({
scrollTop: 0 + targz.position().top,scrollLeft:0 + targz.position().left
}, 2300, function() {
targz[0].click();
});
});
});
$(document).on('click', 'ul#newList2 li a', function (e) {
 e.preventDefault();
var mid = $(this).attr('class'),targz = $('#'+mid),mainFrame = $('#ib-main-wrapper'),rez=$('#results2');
rez.fadeOut(800, function() {
mainFrame.animate({
scrollTop: 0 + targz.position().top,scrollLeft:0 + targz.position().left
}, 2300, function() {
targz[0].click();
});
});
});

$(document).on('click', '.shimclose a', function (e) {
 e.preventDefault();
 tinytile = $("#ib-content-preview"),resbox = $('#results');
 tinytile.find('div.ib-teaser, div.ib-content-full, span.ib-close').hide().end().fadeOut(function() {isAnimating = false;});
});

function onResponse(resp, status, jqXHR){
var failMsg;
var $resp = $($.parseXML(jqXHR.responseText));
if ($resp == null || typeof ($resp) == 'undefined' || !$resp) {
failMsg = 'ERROR!\n\nNo response. Please contact the administrator at nyashimmerwall@wcs.org\nYou have NOT been charged.';
}
else {
var $errors=$resp.find('errors');
if($errors.text()){
  //API returned an error
  var $reason = $errors.find('reason');
  if($reason.text()=='CARD_DECLINED') failMsg = 'ERROR!\n\nYour card has been declined.\nPlease check the billing information or try another card.\nYou have NOT been charged.';
  else if($reason.text()=='FIELD_VALIDATION'){
      $errors.children().each(function(i,v){
          var $val = $(v);
          if($val[0].localName=="fieldError") {
              if($val.text().indexOf('email address')!=-1) failMsg = 'ERROR!\n\nThere are problems with your email address. If problem persists, please contact the administrator at nyashimmerwall@wcs.org\nYour card has NOT been charged.';
              else if($val.text().indexOf('card number')!=-1) failMsg = 'ERROR!\n\nThe card number is invalid. Please enter a valid card number. If problem persists, please contact the administrator at nyashimmerwall@wcs.org\nYou have NOT been charged.';
              else if($val.text().indexOf('CVV number')!=-1) failMsg = 'ERROR!\n\nThe CVV number is invalid. Please enter a valid number. If problem persists, please contact the administrator at nyashimmerwall@wcs.org\nYou have NOT been charged.';
              else failMsg = 'ERROR!\n\nOne of your billing fields is invalid. If problem persists, please contact the administrator at nyashimmerwall@wcs.org\nYou have NOT been charged.'
          }
      })
  }
  else if($reason.text()=='UNSPECIFIED') failMsg = 'ERROR!\n\nSome of your credit card information is invalid. Please check again. If problem persists, please contact the administrator at '+App.Vars.masterEmail+'\nYou have NOT been charged.'
  else failMsg = 'ERROR!\n\nPlease contact the administrator at '+App.Vars.masterEmail+'\nYou have NOT been charged.';
}

}
if (failMsg) {
alert(failMsg);
}
else{
//API returned no errors
var transactionID=$resp.find('transaction_id').text();
console.log(transactionID);
}
}

function onFailure(jqXHR, textStatus, error){
  var failMsg = 'ERROR!\n\n'+error+'\n\nTransaction failed. Please contact the administrator at nyashimmerwall@wcs.org\nYou have NOT been charged.';
  alert(failMsg);
}

function onTimeout(){
  var failMsg = 'ERROR!\n\nYour transaction timed out. Please try again or contact the administrator at nyashimmerwall@wcs.org\nYou have NOT been charged.';
}


$(document).on('click', 'a.submit-transition', function (e) {
 e.preventDefault();
 var amnt = $('input#other_amount').val(), categz;

if(amnt >= 25 && amnt < 150) {         
categz = "Friend";         
} else if (amnt >= 150 && amnt < 250) {
categz = "Supporter";
} else {
categz = "Transformer";
}
 var donorStr = "&donor.email=" + $('input#donor-email').val() + "&card_cvv="+ $('input#donor-cvv').val() + "&card_exp_date_month="+$.trim($('#select-exp-day ul.dd-options li a.dd-option-selected').text())+"&card_exp_date_year="+ $.trim($('#select-exp-year ul.dd-options li a.dd-option-selected').text())+ "&card_number="+$('input#donor-cc-number').val()+"&other_amount="+ amnt;

var uriStr = "method=donate&v=1.0&api_key=zooapikey&df_preview=true&source=NYA Microsite Donation Form&form_id=7081&level_id=8462&donor_email_opt_inname=implicit&donor_email_opt_insubmit=true&billing.name.first="+ $('input#donor-first-name').val()+ "&billing.name.last="+ $('input#donor-last-name').val()+ "&billing.address.street1="+$('input#donor-address').val()+"&billing.address.street2="+$('input#donor-address-more').val()+"&billing.address.city="+$('input#donor-city').val()+"&billing.address.state="+$.trim($('#select-state ul.dd-options li a.dd-option-selected').text())+"&billing.address.zip="+$('input#donor-postal-code').val()+"&category="+categz;

var url = 'https://secure3.convio.net/wcs/site/CRDonationAPI?' + uriStr;
var longStr = url + donorStr;
var xdr;

        try {
            xdr = $.ajax({
                type: "POST",
                url: url,
                data: donorStr,
                dataType: "xml",
                 headers: {
            'Accept' :'application/xml',
            'Content-Type' :'application/x-www-form-urlencoded; charset=UTF-8'
        },

          success:function(xml) {
            a =  $(xml), trID=a.find('transaction_id').text();
             $.ajax({
                type: 'POST',
                url: '/wp-content/themes/spectrum-parallax-blog/entries.php',
                dataType: 'json',
                data: longStr + '&tr_ID=' + trID
                });

          }

            });
            xdr.done(onResponse);
            xdr.fail(onFailure);
        } catch (e){
            //ajax request failed (ie8or9)
            onFailure({},"","AJAX request did not get processed.")
        }
});

$(document).on('click', 'a.complete-tile', function (e) {
 e.preventDefault();
 var msg = $('#step-6 textarea').val(), animal = $('input#recicon0').val(), color = $('input#color0').val(), vname = $('#vtile-name').val(), vloc = $('#vtile-location').val(), hname = $('#honor-name').val(), hemail = $('#honor-email').val(), mname = $('#memory-name').val();
 var tileStr = "&message=" + msg + "&icon="+ animal + "&color=" + color + "&vname=" + vname + "&vloc=" + vloc +"&hname=" + hname + "&hemail=" + hemail + "&mname=" + mname;

$.ajax({
type: 'POST',
url: '/wp-content/themes/spectrum-parallax-blog/personal.php',
dataType: 'json',
data: tileStr
});

});

if( $('#mast').length > 0 ) { // if target element exists in DOM
  var tgHide = $('#searchBox');
  if( $('#mast').is_on_screen() ) { // if target element is visible on screen after DOM loaded
      tgHide.addClass('togHide');
  } else {
      tgHide.removeClass('togHide');
  }
}
$(window).scroll(function(){ // bind window scroll event
var scrolled = $(window).scrollTop();;
  if( $('#mast').length > 0 ) { // if target element exists in DOvar opaq = $(".opaq");M
    if( $('#mast').is_on_screen() ) { // if target element is visible on screen after DOM loaded
      tgHide.addClass('togHide');
  } else {
      tgHide.removeClass('togHide');
  }
  }
  if(scrolled >= 175) {
    $('#donation-widget #widget-donate').addClass('dbb');
    $('#logosm a').show();
  }
  else {
    $('#donation-widget #widget-donate').removeClass('dbb');
    $('#logosm a').hide();
  }

});
$("html, body").animate({ scrollTop:0 }, 500, function() {
  var bl6 = $('#block6');
  $(this).animate({ scrollTop:2 },100);
  bl6.addClass('shimbg');
});
if (getUrlVars()["vtile"]) {
setTimeout(function () {
$("html, body").animate({ scrollTop: $("#block6").offset().top }, 3000, function() {
$('#goto0').trigger('click');
});
}, 4400);
}
if (getUrlVars()["shimmer"]) {
setTimeout(function () {
$("html, body").animate({ scrollTop: $("#block6").offset().top }, 3000, function() {
});
}, 4400);
}
mobMenu.on("click", function(e) {
e.preventDefault();
var thUl = $('#mobNav .nav.navbar-nav');
thUl.slideToggle();
});
mob1.on("click", function(e) {
e.preventDefault();
$("html, body").animate({ scrollTop: 0 });
});
mob2.on("click", function(e) {
e.preventDefault();
$("html, body").animate({ scrollTop: $("#block5").offset().top });
});
mob3.on("click", function(e) {
e.preventDefault();
$("html, body").animate({ scrollTop: $("#block6").offset().top - 75 });
});
mob4.on("click", function(e) {
e.preventDefault();
$("html, body").animate({ scrollTop: $("#block7").offset().top });
});

$(window).resize(function(){
if ($(window).width() <= 1024) {
$('#donation-widget #widget-donate a#donateClk').removeClass('bigz');
$('#back-button').addClass('midz');
$('#donation-steps').removeClass('ligz');
if( $('#explore-further-donate').is_on_screen() ) {
     $('#footer').show();
  } else {
     $('#footer').hide();
  }
}
if ($(window).width() > 1024) {
     $('#footer').show();
     $('#donation-widget #widget-donate a#donateClk').addClass('bigz');
     $('#back-button').removeClass('midz');
     $('#donation-steps').addClass('ligz');
}
});
$(window).scroll(function(){
if ($(window).width() <= 1024) {

if( $('#explore-further-donate').is_on_screen() ) {
     $('#footer').show();
  } else {
     $('#footer').hide();
  }
}
if ($(window).width() > 1024) {
  $('#footer').show();
}
});
if($('html').hasClass("mozyy")) {
} else{
 timeWave(); 
}
});
$(window).resize(function(){
if ($(window).width() <= 675) {
$('#block5').find('#next a').on("click", function(e) {
 e.preventDefault();
$('#block5').addClass('boheight');
});
}
if ($(window).width() > 675) {
$('#block5').removeClass('boheight');
}
});
if ($(window).width() <= 675) {
$('#block5').find('#next a').on("click", function(e) {
e.preventDefault();
$('#block5').addClass('boheight');
});
}
if ($(window).width() > 675) {
$('#block5').removeClass('boheight');
}

if ($(window).width() <= 1024) {
$('#donation-widget #widget-donate a#donateClk').removeClass('bigz');
$('#back-button').addClass('midz');
$('#donation-steps').removeClass('ligz');
}
if ($(window).width() > 1024) {
$('#donation-widget #widget-donate a#donateClk').addClass('bigz');
$('#back-button').removeClass('midz');
$('#donation-steps').addClass('ligz');
}


