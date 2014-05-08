
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

var $parentDiv = $('#ib-main-wrapper'),documt = $(document),inpt=$('#searchGo'),resu=$('#results'),ints=$('input#searchTerm'),formz=$('form#searchus'),animals=$('#donation-container .animals ul li a'),colors=$('#donation-container .colourBar ul li a'), prevTile = $('a#preview-tile'), prevClose = $('#prevClose a'), ctdn = jQuery('#widget-days-left');

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
                    
                  }
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
              loadContentItem       = function( $item, callback ) {
                
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
                      $teaser = $this.find('div.ib-teaser'),
                      $content= $this.find('div.ib-content-full'),
                      $tsdates = $this.find('div.ts-dates'),
                      $tscity = $this.find('div.ts-city'),
                      $categz = $this.find('div.categz'),
                      $tssocial = $this.find('div.socialz'),
                      $popupbg = $this.find('div.popupbg'),
                      $close  = $this.find('span.ib-close');
                      
                    if( hasContentPreview ) {
                      $teaser.html( teaser )
                      $content.html( content )
                      $tsdates.html( tsdates )
                      $tscity.html( tscity )
                      $categz.html( categz )
                      $tssocial.html( tssocial )
                      $popupbg.html( popupbg )
                    }
                  
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
              preloadImage        = function( src, callback ) {
              
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
                  
                  ( current === imgItemsCount - 1 ) ? current = 0 : ++current;
                  
                }
                else if( dir === 'prev' ) {
                  
                  ( current === 0 ) ? current = imgItemsCount - 1 : --current;
                  
                }
                
                var $item   = $ibImgItems.eq( current ),
                  largeSrc  = $item.children('img').data('largesrc'),
                  description = $item.children('span').text();
                  
                preloadImage( largeSrc, function() {
                  
                  $loading.hide();
                  
                  //get dimentions for the image, based on the windows size
                  var dim = getImageDim( largeSrc );
                  
                  $preview.children('img.ib-preview-img')
                            .attr( 'src', largeSrc )
                          .css({
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
ctdn.countdown({until: new Date(2014, 5 - 1, 11, 18, 00, 00), format: 'dHMS', timezone: -5,layout: '<div class="countdown_section">' + '<span class="countdown_amount">{dnn}&nbsp;</span></div>'});

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
  var Box = $('#WrpopupPrev-box'), vname = $('#vtile-name').val(), vloc = $('#vtile-location').val(), hname = $('#honor-name').val(), hemail = $('#honor-email').val(), mname = $('#memory-name').val(), todayDate = $('#today-date').text(), tileFname = $('#WrpopupPrev .prevName h2'), inOf = $('#WrpopupPrev .prevHonor'), tileLoc = $('#WrpopupPrev .prevCity'), tileDate = $('#WrpopupPrev .prevDates'), hLength = $('#honor-name').val().length, tileFrom = $('#WrpopupPrev .prevAllgift span');
  tileLoc.text(vloc);tileDate.text(todayDate);tileFrom.text(vname);
  if(hLength > 0) {inOf.text('In honor of');tileFname.text(hname);}else {inOf.text('In memory of');tileFname.text(mname);}
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


setTimeout(function () {
  var doct = $(document),tyl = $('.tyle');
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

}, 2000);

setTimeout(function () {
  lDelay = $('.load-delay');
  lDelay.each(function () {
      var imagex = $(this), imgOriginal = imagex.data('original');
      $(imagex).attr('src', imgOriginal);
  });
}, 10000);

function addWave() {
var wrid = $('#ib-main-wrapper'),parz = $('div.tyle', wrid);
  parz.slice(0,36).each(function(i) {
var row = $(this);
    setTimeout(function() {
    row.addClass('skew').delay(200).queue(function(){
    $(this).removeClass('skew').dequeue();
});
  }, 100*i);
});
parz.slice(36,72).each(function(i) {
var row = $(this);
   setTimeout(function() {
    row.addClass('skew').delay(230).queue(function(){
    $(this).removeClass('skew').dequeue();
});
  }, 110*i);
});
parz.slice(72,108).each(function(i) {
var row = $(this);
    setTimeout(function() {
    row.addClass('skew').delay(260).queue(function(){
    $(this).removeClass('skew').dequeue();
});
  }, 120*i);
});
parz.slice(108,144).each(function(i) {
var row = $(this);
    setTimeout(function() {
    row.addClass('skew').delay(290).queue(function(){
    $(this).removeClass('skew').dequeue();
});
  }, 130*i);
});
parz.slice(144,180).each(function(i) {
var row = $(this);
    setTimeout(function() {
    row.addClass('skew').delay(320).queue(function(){
    $(this).removeClass('skew').dequeue();
});
  }, 140*i);
});
parz.slice(180,216).each(function(i) {
var row = $(this);
    setTimeout(function() {
    row.addClass('skew').delay(350).queue(function(){
    $(this).removeClass('skew').dequeue();
});
  }, 150*i);
});
}

//jQuery.fn.reverse = [].reverse;
//$('.tyle').slice(0,).repeat().each($).animate({opacity:0},$).animate({opacity:1});
setInterval(addWave, 15000);




inpt.on("click", function(e) {
  e.preventDefault();
  var inval = $.trim($('input#searchTerm').val()).replace(/ /g,'');
  resu.empty();   
  if(!inval==''){
    var $innerListItem = $('div.ib-main .tyle[rel*="'+inval+'"]');
    if($innerListItem.length > 0 && $innerListItem.length < 6){
      //console.log($innerListItem);
      resu.empty();ints.val('');
      resu.fadeIn().append("<div class='headerList'>WE FOUND INDIVIDUALS " + $innerListItem.length + " WITH THE NAME "+ inval +"</div><ul id='newList'></ul>");
      $innerListItem.each(function() {
      var fullname = $(this).find('.ib-teaser h2').text(),gotoId = $(this).attr('id'),locat= $(this).find('.ts-city').text();
     $("#newList").append("<li><a class='"+gotoId+"' href='#'><span class='tileAttr'>"+fullname+"</span> <span class='tileAttr'>"+locat+"</span></a></li>");
      });

}else if($innerListItem.length > 5){
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


$('a#convioz').on("click", function(e) {
 e.preventDefault();
 var donorStr = "&donor.email=" + $('input#donor-email').val() + "&card_cvv="+ $('input#donor-cvv').val() + "&card_exp_date_month="+$.trim($('#select-exp-day ul.dd-options li a.dd-option-selected').text())+"&card_exp_date_year="+ $.trim($('#select-exp-year ul.dd-options li a.dd-option-selected').text())+ "&card_number="+$('input#donor-cc-number').val()+"&other_amount="+ $('input#other_amount').val();

var uriStr = "method=donate&v=1.0&api_key=zooapikey&df_preview=true&source=NYA Microsite Donation Form&form_id=5640&level_id=8462&donor_email_opt_inname=implicit&donor_email_opt_insubmit=true&billing.name.first="+ $('input#donor-first-name').val()+ "&billing.name.last="+ $('input#donor-last-name').val()+ "&billing.address.street1="+$('input#donor-address').val()+"&billing.address.street2="+$('input#donor-address-more').val()+"&billing.address.city="+$('input#donor-city').val()+"&billing.address.state="+$.trim($('#select-state ul.dd-options li a.dd-option-selected').text())+"&billing.address.zip="+$('input#donor-postal-code').val();

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
                url: 'http://ny3.dev/wp-content/themes/spectrum-parallax-blog/entries.php',
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


var isDragging = false;
$("#ib-main-wrapper").mousedown(function() {
    $(window).mousemove(function() {
        isDragging = true, btn = $('#tile-donate-btn'), frTile = $('#ib-main-wrapper'),tinytile = $("#ib-content-preview");
        $(window).unbind("mousemove");
btn.css('opacity',0).hide(10);
tinytile.find('div.ib-teaser, div.ib-content-full, span.ib-close').hide().end().hide(function() {isAnimating = false;});
frTile.css('width',1234);
    });
})
.mouseup(function() {
    var wasDragging = isDragging, btn = $('#tile-donate-btn'), frTile = $('#ib-main-wrapper');
    btn.show();
    isDragging = false;
    frTile.css('width',583);
    btn.css('opacity',1);
    $(window).unbind("mousemove");
    if (!wasDragging) {
      btn.css('opacity',1).show(10);
    }
});


});
