
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
                $ibWrapper.css( 'height', 540 - containerMargins )
                
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
                    width : 1235,
                    height  : 540
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
                
                var w_w = 1235,
                  w_h = 540,
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


setTimeout(function () {
  $('.load-delay').each(function () {
      var imagex = $(this);
      var imgOriginal = imagex.data('original');
      $(imagex).attr('src', imgOriginal);
  });
  $('.tyle').each(function(i) {
var row = $('.tyle:even');
var row2 = $('.tyle:odd');
row.addClass('zigzag');
row2.addClass('staticz');
row.slice(0,18).addClass('frontz');row2.slice(0,18).addClass('frontz');
});
  
}, 4000);

setTimeout(function () {
  $('body').not('.ib-main-wrapper').on("click", function(e) {
   $('#ib-content-preview').find('div.ib-teaser, div.ib-content-full, span.ib-close').hide().end().fadeOut(function() {isAnimating = false;});
});
}, 750);


//jQuery.fn.reverse = [].reverse;
//$('.tyle').slice(0,).repeat().each($).animate({opacity:0},$).animate({opacity:1});
setTimeout(function() {
$('.tyle').slice(0,36).each(function(i) {
var row = $(this);
    setTimeout(function() {
    row.addClass('wobble-vertical').animate({opacity:0},$).animate({opacity:1});
  }, 200*i);
});
}, 6000);
setTimeout(function() {
$('.tyle').slice(36,72).each(function(i) {
var row = $(this);
    setTimeout(function() {
    row.addClass('wobble-vertical').animate({opacity:0},$).animate({opacity:1});
  }, 200*i);
});
}, 6000);

});

