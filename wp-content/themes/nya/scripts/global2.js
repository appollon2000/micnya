var stripeResponseHandler = function(status, response) {
      var $form = $('#signupForm');

      if (response.error) {
        // Show the errors on the form
        $form.find('.payment-errors').empty().text(response.error.message);
        $form.find('button').prop('disabled', false);
      } else {
        // token contains id, last4, and card type
        var token = response.id;
        // Insert the token into the form so it gets submitted to the server
        $form.append($('<input type="hidden" name="stripeToken" />').val(token));
        // and re-submit
        $form.get(0).submit();
      }
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

var checkgift = $("input#gift"),tarea = $('form.cmxform textarea'),animals=$('form.cmxform .animals ul li a'),colors=$('form.cmxform .colourBar ul li a'),
mainForm=$('#signupForm')[0],qua0=$('#amvary'),qua1=$('#amvary1'),incap = $('#donateHolder input.capfield'),innum=$('input[type=number]'), allsel=$('#donateHolder select'),gTotal = $('input#tAmount'),mix1cl=$('#mix1 a#primnext'),mix1=$('#donateHolder #mix1'),
mix2=$('#donateHolder #mix2'),mix2cl1=$('#mix2 #buildtile a'),mix2cl2=$('#mix2 #buildgift a'),mix2=$('#donateHolder #mix2'),mix3=$('#donateHolder #mix3'),dbar2=$('#donateHolder a#dbar2'),
mix234=$('#donateHolder #mix2,#donateHolder #mix3,#donateHolder #mix4,#donateHolder #mix5'),dbar3=$('#donateHolder a#dbar3'),dbar4=$('#donateHolder a#dbar4'),mix134=$('#donateHolder #mix1,#donateHolder #mix3,#donateHolder #mix4'),cyc0 = $("#rec0Icon"),cyc1 = $("#rec1Icon"),
dbar5=$('#donateHolder a#dbar5'),dbar6=$('#donateHolder a#dbar6'),cyc2 = $("#rec2Icon"),cyc3 = $("#rec3Icon"),cyc4 = $("#rec4Icon"),turtle=$('#donaterow #turtle'),horse=$('#donaterow #sea-horse'),octo=$('#donaterow #octopus'),mix4=$('#donateHolder #mix4'),flash=$('.appear'),dbar1=$('#donateHolder a#dbar1'),vani=$('.vanish'),
bilan=$('#donateHolder #mix4 #bilan input#mero'),plusSign=$('#donateHolder .plussign a'),minusSign=$('#donateHolder .minussign a'),minusPar=$('#donateHolder .minussign'),sepie=$('#donateHolder .sepie'),sepie2=$('#donateHolder .sepie#rec2'),
frts=$("form.cmxform input#firstname").val(),lstn=$("form.cmxform input#lastname").val(),loca=$("form.cmxform input#location").val(),mail=$("form.cmxform input#email").val(),
sepie3=$('#donateHolder .sepie#rec3'),sepie4=$('#donateHolder .sepie#rec4'),step1=$('#donateHolder .step1'),step2=$('#donateHolder .step2'),step3=$('#donateHolder .step3'),step4=$('#donateHolder .step4'),step5=$('#donateHolder .step5'),
step6=$('#donateHolder .step6'),mix3cl1=$('#donateHolder a#threenext'),mix4cl1=$('#donateHolder a#fournext'),mix5=$('#donateHolder #mix5'),labelError=$('#donateHolder label.error'),resarea=$('#donateHolder textarea'),
truth1=$('input#truth1'),truth2=$('input#truth2'),payerr=$('.payment-errors'),stripay=$('#mix5 #totbilan span#stripay'),isgift=$('input#isgift'),thprev=$('#donateHolder a.thprev'),
iframe = $('#player1')[0], player1 = $f(iframe),cycshow= $('.cycle-slideshow'),hotarea= $('area'),tock=$('.cycle-slideshow .tock');
 $(function() {
      
        var $ibWrapper  = $('#ib-main-wrapper'),
         
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
                
                var containerMargins  = $('#ib-top').outerHeight(true) + $('#header').outerHeight(true) + parseInt( $ibItems.css('margin-top') );
                $ibWrapper.css( 'height', 540 - containerMargins )
                
              },
              initEvents   = function() {
              
                // open the item only if not dragging the container
                $ibItems.bind('click.ibTemplate', function( event ) {
                  
                  if( !kinetic_moving )
                    openItem( $(this) );
                
                  return false; 
                
                });
                
                // on window resize, set the wrapper and preview size accordingly
                $(window).bind('resize.ibTemplate', function( event ) {
                  
                  setWrapperSize();
                  
                  $('#ib-img-preview, #ib-content-preview').css({
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
                  
                  var hasImgPreview = ( $('#ib-img-preview').length > 0 );
                  
                  if( !hasImgPreview )
                    $('#previewTmpl').tmpl( largeImageData ).insertAfter( $ibWrapper );
                  else
                    $('#ib-img-preview').children('img.ib-preview-img')
                              .attr( 'src', largeSrc ).end()
                              .find('span.ib-preview-descr')
                              .text( description );
                    
                  //get dimentions for the image, based on the windows size
                  var dim = getImageDim( largeSrc );
                  
                  $item.removeClass('ib-img-loading');
                  
                  //set the returned values and show/animate preview
                  $('#ib-img-preview').css({
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
                    width : 1235,
                    left  : 0
                  }, 100, 'easeOutExpo', function() {
                  
                    $(this).animate({
                      height  : 540,
                      top   : 0
                    }, 100, function() {
                    
                      var $this = $(this);
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
                
                var hasContentPreview = ( $('#ib-content-preview').length > 0 ),
                  honor        = $item.children('div.honor').html(),
                  teaser        = $item.children('div.ib-teaser').html(),
                  categz        = $item.children('div.categz').html(),
                  tsdates        = $item.children('div.ts-dates').html(),
                  tscity        = $item.children('div.ts-city').html(),
                  tssocial        = $item.children('div.socialz').html(),
                  content       = $item.children('div.ib-content-full').html(),
                  contentData     = {
                    honor: honor,
                    teaser    : teaser,
                    categz    : categz,
                    tsdates    : tsdates,
                    tscity    : tscity,
                    tssocial    : tssocial,
                    content   : content
                  };
                  
                if( !hasContentPreview )
                  $('#contentTmpl').tmpl( contentData ).insertAfter( $ibWrapper );
                  
                //set the returned values and show/animate preview
                $('#ib-content-preview').css({
                  width : $item.width(),
                  height  : $item.height(),
                  left  : $item.offset().left,
                  top   : $item.offset().top
                }).show().animate({
                  width : 1235,
                  left  : 0
                }, 100, 'easeOutExpo', function() {
                
                  $(this).animate({
                    height  : 100,
                    top   : 0
                  }, 100, function() {
                    
                    var $this = $(this),
                      $teaser = $this.find('div.ib-teaser'),
                      $content= $this.find('div.ib-content-full'),
                      $close  = $this.find('span.ib-close');
                      
                    if( hasContentPreview ) {
                      $teaser.html( teaser )
                      $content.html( content )
                    }
                  
                    $teaser.show();
                    $content.show();
                    $close.show();
                    
                    if( callback ) callback.call();
                  
                  });
                
                });
                
                if( !hasContentPreview )
                  initContentPreviewEvents(); 
                
              },
              // preloads an image
              preloadImage        = function( src, callback ) {
              
                $('<img/>').load(function(){
                
                  if( callback ) callback.call();
                
                }).attr( 'src', src );
              
              },
              // load the events for the image preview : navigation ,close button, and window resize
              initImgPreviewEvents    = function() {
              
                var $preview  = $('#ib-img-preview');
                
                $preview.find('span.ib-nav-prev').bind('click.ibTemplate', function( event ) {
                  
                  navigate( 'prev' );
                  
                }).end().find('span.ib-nav-next').bind('click.ibTemplate', function( event ) {
                  
                  navigate( 'next' );
                  
                }).end().find('span.ib-close').bind('click.ibTemplate', function( event ) {
                  
                  closeImgPreview();
                  
                });
                
                //resizing the window resizes the preview image
                $(window).bind('resize.ibTemplate', function( event ) {
                  
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
              
                $('#ib-content-preview').find('span.ib-close').bind('click.ibTemplate', function( event ) {
                  
                  closeContentPreview();
                  
                });
                
              },
              // navigate the image items in fullscreen mode
              navigate          = function( dir ) {
                
                if( isAnimating ) return false;
                
                isAnimating   = true;
                
                var $preview  = $('#ib-img-preview'),
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
                
                $('#ib-img-preview').find('span.ib-preview-descr, div.ib-nav, span.ib-close')
                        .hide()
                        .end()
                        .animate({
                          height  : $item.height(),
                          top   : $item.offset().top
                          }, 100, 'easeOutExpo', function() {
                          
                          $(this).animate({
                            width : $item.width(),
                            left  : $item.offset().left
                            }, 100, function() {
                            
                              $(this).fadeOut(function() {isAnimating = false;});
                            
                          } );
                        
                        });
              
              },
              // closes the fullscreen content item
              closeContentPreview     = function() {
                
                if( isAnimating ) return false;
                
                isAnimating = true;
                
                var $item = $ibItems.not('.ib-image').eq( current );
                
                $('#ib-content-preview').find('div.ib-teaser, div.ib-content-full, span.ib-close')
                            .hide()
                            .end()
                            .animate({
                              height  : $item.height(),
                              top   : $item.offset().top-56
                            }, 500, 'easeOutExpo', function() {
                              
                              $(this).animate({
                                width : $item.width(),
                                left  : $item.offset().left-321
                              }, 400, function() {
                                
                                $(this).fadeOut(function() {isAnimating = false;});
                                
                              } );
                            
                            });
              
              },
              // get the size of one image to make it full size and centered
              getImageDim         = function( src ) {
                
                var img       = new Image();
                img.src       = src;
                
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
var divs = $("#recents  div.rotator");
for(var i = 0; i < divs.length; i+=5) {
divs.slice(i, i+5).wrapAll("<div class='rotie'></div>");
}
        
        var $parentDiv = $('#ib-main-wrapper'),inpt=$('#searchGo'),resu=$('#results'),lodi=$('#lodie'),ints=$('input#searchTerm'),formz=$('form#searchus');
        inpt.on("click", function(e) {
        e.preventDefault();
        var inval = $.trim($('input#searchTerm').val()).replace(/ /g,''),allanc=$('div.ib-main .tyle'),glosser=$('div.ib-main .tyle .glosser');
    allanc.removeClass('gloss');glosser.remove();
    resu.empty();
    
    
        if(!inval==''){
    var $innerListItem = $('div.ib-main .tyle[rel*="'+inval+'"]').eq(0);
if($innerListItem.length ==true){

resu.empty();ints.val('');
    $innerListItem.addClass('gloss');

        $parentDiv.animate({
        scrollTop: 0 + $innerListItem.position().top,scrollLeft:0 + $innerListItem.position().left
        }, 2000, function() {
      $.gloss();
      $innerListItem.trigger('mouseover').delay(500).queue(function() {
      var that = $(this);
      that.trigger('mouseout');
      that.dequeue();
      });
      var xint = 0;
      var intervalID =setInterval(function() {
      $innerListItem.trigger('mouseover').delay(500).queue(function() {
      var that = $(this);
      that.trigger('mouseout');
      that.dequeue();
      });
      if (++xint === 2) {
      window.clearInterval(intervalID);
      }
      }, 3000);
  });


}else{
resu.text('No Match Found!');
}

  }else {
    resu.text('No Match Found!');
      }
});


formz.keypress( function( e ) {
  var code = e.keyCode || e.which;
    if( code === 13 ) {
        e.preventDefault();
        var inval = $.trim($('input#searchTerm').val()).replace(/ /g,''),allanc=$('div.ib-main .tyle'),glosser=$('div.ib-main .tyle .glosser');
    allanc.removeClass('gloss');glosser.remove();
    resu.empty();

    if(!inval==''){ 
    var $innerListItem = $('div.ib-main .tyle[rel*="'+inval+'"]').eq(0);
if($innerListItem.length ==true){

resu.empty();ints.val('');
    $innerListItem.addClass('gloss');

        $parentDiv.animate({
        scrollTop: 0 + $innerListItem.position().top,scrollLeft:0 + $innerListItem.position().left
        }, 2000, function() {
      $.gloss();
      $innerListItem.trigger('mouseover').delay(500).queue(function() {
      var that = $(this);
      that.trigger('mouseout');
      that.dequeue();
      });
      var xint = 0;
      var intervalID =setInterval(function() {
      $innerListItem.trigger('mouseover').delay(500).queue(function() {
      var that = $(this);
      that.trigger('mouseout');
      that.dequeue();
      });
      if (++xint === 2) {
      window.clearInterval(intervalID);
      }
      }, 3000);
  });


}else{
resu.text('No Match Found!');
}

  }else {
    resu.text('No Match Found!');
      }    
    

}
});


var ny2ex = $("#nya-2 a#explore"),ny2srch = $("#unfold a#press"),ny3 = $("#nya-3 a"),showz=$("#showz"),mtile = $('.ib-main-wrapper'),recent=$('#recents'),ctn=$('.bkg'),srchinput= $('.blkz#nya-2 #dosearch'),
fake=$('.blkz#nya-2 #blankie'),fake2=$('.blkz#nya-3 #blankie2'),mast=$('.container #mast'),dnhold=$('.container #donateHolder');
ny2ex.on("click", function(event) {
var that=$(this);
event.preventDefault();
fake.show('fast');resu.empty();$('.cycle-pager').fadeOut();
showz.fadeOut(500).promise().done(function() {
recent.animate({
        right: -300,
        opacity:0
    }, 400, function() {
//ctn.fadeTo('slow',0);
mtile.fadeIn(400);
$('#ib-main-wrapper').animate({scrollTop: 0,scrollLeft:0}, 200);
mtile.animate({
    width:'1234'
},750, function() {
  that.fadeOut(400);

ny2srch.parent().css('display', 'block').hide().fadeIn(350).fadeTo(400,1, function() {
srchinput.fadeIn(200).fadeTo(300,1);
fake.hide();
});
});

});
});
});

ny2srch.on("click", function(event) {
var that=$(this);
event.preventDefault();
fake.show('fast');resu.empty();
mtile.animate({
        width:'0'
    }, {
    duration: 1000,
    easing: 'linear',
    queue: false
}).delay(400).fadeOut(700, function() {
// Animation complete.
showz.fadeIn(400).fadeTo(300,1);
//ctn.delay(700).fadeTo(700,1);
recent.animate({
        right: 30,
        opacity:1
    }, 750, function() {
srchinput.fadeOut(500).fadeTo(200,0);
that.parent().fadeOut(600, function() {
ny2ex.css('display', 'block').hide().fadeIn(350).fadeTo(300,1);$('.cycle-pager').fadeIn();
fake.hide();
});
});
});
});


ny3.on("click", function(event) {
event.preventDefault();
ny2srch.trigger('click');
dbar2.trigger('click');
flash.fadeTo(650,0).fadeOut(350, function() {
vani.fadeIn(200).fadeTo(550,1);
});
});

dbar1.on("click", function(event) {
event.preventDefault();
var dial = $("#dialog");
dial.dialog({
show: {
effect: "fade",
duration: 1000
},
hide: {
effect: "fade",
duration: 500
},
modal: true,
buttons: {
"Back": function() {
allsel.prop('selectedIndex',0);incap.removeClass('error').val('');resarea.val('');gTotal.val(0);bilan.val(0);payerr.empty();
isgift.val(0);truth1.val(0);truth2.val(0);
dial.dialog("close");
vani.fadeTo(650,0).fadeOut(50, function() {
flash.fadeIn(200).fadeTo(200,1);
})
},
Cancel: function() {
dial.dialog("close");
}
}
});
});

$.gloss();

 jQuery.validator.addMethod("greaterThanZero", function(value, element) {
return this.optional(element) || (parseInt(value) > 0);
}, "* Amount must be greater than zero");
  // validate signup form on keyup and submit
  $("#signupForm").validate({
    ignore: ".ignore",
    rules: {
      firstname: {
        required: true
      },
      lastname: {
        required: true
      },
      location: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      tilesAmount:{ greaterThanZero : true,number:true,digits: true },
      RectilesAmount:{ greaterThanZero : true,number:true,digits: true },
      quant0:{ greaterThanZero : true,number:true,digits: true },
      quant1:{ greaterThanZero : true,number:true,digits: true },
       recip01FirstName: {
        required: true
      },
      recip01LastName: {
         required: true
      },
        recip02FirstName: {
        required: true
      },
      recip02LastName: {
         required: true
      },
      recip03FirstName: {
        required: true
      },
      recip03LastName: {
         required: true
      },
      recip04FirstName: {
        required: true
      },
      recip04LastName: {
         required: true
      }    
    },

  });

$("#signupForm").submit(function(e) {
         var $form = $(this),isFormValid = true;
         if (($.trim(truth1.val()).length == 0 && $.trim(truth2.val()).length == 0) || ($.trim(truth1.val()) < 25 && $.trim(truth2.val()) < 25 )){
          isFormValid = false;
        }
        if(!isFormValid) { 
          $form.find('#perr').empty();
          document.getElementById("perr").innerHTML = "There is an error with the donation amount";
          $form.find('.payment-success').empty();
          return isFormValid;
        }else{

        $form.find('button').prop('disabled', true);
        Stripe.createToken($form, stripeResponseHandler);
        return false;
      }
      });

tarea.focus(function() {
if (this.value === this.defaultValue) {
    this.value = '';
}
}).blur(function() {
if (this.value === '') {
this.value = '';
}
});

innum.focus(function() {
if (this.value === this.defaultValue) {
    this.value = 0;
}
}).blur(function() {
if (this.value === '') {
this.value = 0;
}
});

animals.on("click", function(e) {
  e.preventDefault();
  var that = $(this),rel = that.attr('rel'),dat = that.attr('data');
  $("form.cmxform .animals ul li a[data='"+dat+"']").removeClass('lrner');
  $('form.cmxform input#'+dat).val(rel);
  that.addClass('lrner');
});

colors.on("click", function(e) {
  e.preventDefault();
  var that = $(this),rel = that.attr('rel'),dat = that.attr('data');
  $("form.cmxform .colourBar ul li a[data='"+dat+"']").removeClass('crner');
  $('form.cmxform input#'+dat).val(rel);
  that.addClass('crner');
});

mix1cl.on("click", function(e) {
e.preventDefault();
if(!step1.valid()){
return false;
}else{
turtle.stop(true,true).fadeTo(450,0).fadeOut(450);
mix1.stop(true,true).animate({
  opacity: 0
  }, 450, function() {
mix1.fadeOut(200);
octo.stop(true,true).fadeIn(550).fadeTo(550,1);
mix2.fadeIn(550, function() {
mix2.fadeTo(550,1);
});
});
}
});

mix2cl1.on("click", function(e) {
e.preventDefault();
allsel.prop('selectedIndex',0);incap.removeClass('error').val('');resarea.val('');gTotal.val(0);bilan.val(0);payerr.empty();
isgift.val(0);
octo.stop(true,true).fadeTo(450,0).fadeOut(450);
turtle.stop(true,true).fadeTo(450,0).fadeOut(450);
mix2.stop(true,true).animate({
  opacity: 0
  }, 450, function() {
mix2.fadeOut(200);
horse.stop(true,true).fadeIn(450).fadeTo(400,1);
cyc0.trigger('endCarousel');
mix3.fadeIn(450, function() {
mix3.fadeTo('slow',1);
cyc0.jCarouselLite({btnNext: "#next0",btnPrev: "#prev0",visible: 6,scroll:6,circular:true});
mix5.removeClass('mix3 mix4');
});
});
});

mix2cl2.on("click", function(e) {
e.preventDefault();
allsel.prop('selectedIndex',0);incap.removeClass('error').val('');resarea.val('');gTotal.val(0);bilan.val(0);payerr.empty();labelError.empty();
isgift.val(1);
octo.stop(true,true).fadeTo(450,0).fadeOut(450);
horse.stop(true,true).fadeTo(450,0).fadeOut(450);
turtle.stop(true,true).fadeTo(450,0).fadeOut(450);
mix2.stop(true,true).animate({
  opacity: 0
  }, 450, function() {
mix2.fadeOut(200);
cyc1.trigger('endCarousel');
cyc2.trigger('endCarousel');
cyc3.trigger('endCarousel');
cyc4.trigger('endCarousel');
mix4.fadeIn(450, function() {
mix4.fadeTo('slow',1);
cyc1.jCarouselLite({btnNext: "#next1",btnPrev: "#prev1",visible: 4,scroll:4,circular:true});
cyc2.jCarouselLite({btnNext: "#next2",btnPrev: "#prev2",visible: 4,scroll:4,circular:true});
cyc3.jCarouselLite({btnNext: "#next3",btnPrev: "#prev3",visible: 4,scroll:4,circular:true});
cyc4.jCarouselLite({btnNext: "#next4",btnPrev: "#prev4",visible: 4,scroll: 4,circular:true});
mix5.removeClass('mix3 mix4');
});
});
});

mix3cl1.on("click", function(e) {
e.preventDefault();
if(!step2.valid()){
return false;
}else{
mix3.stop(true,true).animate({
  opacity: 0
  }, 450, function() {
mix3.fadeOut(200);
payerr.empty();
mix5.fadeIn(550, function() {
truth2.val(0);
mix5.fadeTo(550,1).addClass('mix3');
});
});
}
});

mix4cl1.on("click", function(e) {
e.preventDefault();
var lng = parseInt(bilan.val());
if(!step3.valid()){
return false;
}
if (bilan.val()<1){
  alert('Amount cannot be 0!');
return false;
}
if(sepie2.css('opacity') > 0){
if(!step4.valid()){
return false;
}
}
if(sepie3.css('opacity') > 0){
if(!step5.valid()){
return false;
}
}
if(sepie4.css('opacity') > 0){
if(!step6.valid()){
return false;
}
}
stripay.text(lng);truth2.val(lng);
mix4.stop(true,true).animate({
  opacity: 0
  }, 450, function() {
mix4.fadeOut(200);
payerr.empty();
truth1.val(0);
mix5.fadeIn(550, function() {
mix5.fadeTo(550,1).addClass('mix4');
});
});
});

plusSign.on("click", function(e) {
e.preventDefault();
var that = $(this),mrel=$(this).attr('rel'),dta=$(this).attr('data-icon'),pVal=parseInt(qua1.val());
that.parent().hide();
minusPar.fadeOut('fast');
$('.sepie#'+mrel).addClass('voir').fadeTo(400, 1,function() {
$(".minussign[data-bubble='"+mrel+"']").fadeIn(50);
var uur = parseInt($('.sepie.voir').length)+1;
bilan.val(pVal*uur);stripay.text(pVal*uur);truth2.val(pVal*uur);
});
});

minusSign.on("click", function(e) {
e.preventDefault();
var that = $(this),mrel=$(this).attr('rel'),cls=$(this).attr('class'),qVal=parseInt(qua1.val());
minusPar.fadeOut('fast');
$('.sepie#'+mrel).find('input.capfield').val('');
$('.sepie#'+mrel).removeClass('voir').fadeTo(400, 0,function() {
$('.plussign#'+cls).fadeIn();
$(".minussign[data-minus='"+cls+"']").fadeIn();
var lur = parseInt($('.sepie.voir').length)+1;
bilan.val(qVal*lur);stripay.text(qVal*lur);truth2.val(qVal*lur);
});
});

dbar2.on("click", function(e) {
e.preventDefault();
octo.stop(true,true).fadeTo(450,0).fadeOut(450);
horse.stop(true,true).fadeTo(450,0).fadeOut(450);
mix234.stop(true,true).animate({
  opacity: 0
  }, 450, function() {
mix234.fadeOut(200);
mix1.fadeIn(750, function() {
mix1.fadeTo('slow',1);
turtle.stop(true,true).fadeIn(750).fadeTo(400,1);
});
});
});

dbar3.on("click", function(e) {
e.preventDefault();
octo.stop(true,true).fadeTo(450,0).fadeOut(450);
horse.stop(true,true).fadeTo(450,0).fadeOut(450);
mix2.stop(true,true).animate({
  opacity: 0
  }, 450, function() {
mix2.fadeOut(200);
mix1.fadeIn(750, function() {
mix1.fadeTo('slow',1);
turtle.stop(true,true).fadeIn(750).fadeTo(400,1);
});
});
});

dbar4.on("click", function(e) {
e.preventDefault();
var dial = $("#dialog");
dial.dialog({
show: {
effect: "fade",
duration: 1000
},
hide: {
effect: "fade",
duration: 500
},
modal: true,
buttons: {
"Back": function() {
turtle.stop(true,true).fadeTo(450,0).fadeOut(450);
horse.stop(true,true).fadeTo(450,0).fadeOut(450);
mix3.stop(true,true).animate({
  opacity: 0
  }, 450, function() {
dial.dialog("close");
mix3.fadeOut(200);
mix2.fadeIn(750, function() {
mix2.fadeTo('slow',1);
octo.stop(true,true).fadeIn(750).fadeTo(400,1);
allsel.prop('selectedIndex',0);incap.removeClass('error').val('');resarea.val('');gTotal.val(0);bilan.val(0);stripay.empty();isgift.val(0);truth1.val(0);truth2.val(0);
labelError.empty();
});
})
},
Cancel: function() {
dial.dialog("close");
}
}
});

});

dbar5.on("click", function(e) {
e.preventDefault();
var dial = $("#dialog");
dial.dialog({
show: {
effect: "fade",
duration: 1000
},
hide: {
effect: "fade",
duration: 500
},
modal: true,
buttons: {
"Back": function() {
turtle.stop(true,true).fadeTo(450,0).fadeOut(450);
horse.stop(true,true).fadeTo(450,0).fadeOut(450);
mix4.stop(true,true).animate({
  opacity: 0
  }, 450, function() {
dial.dialog("close");
mix4.fadeOut(200);
mix2.fadeIn(750, function() {
mix2.fadeTo('slow',1);
octo.stop(true,true).fadeIn(750).fadeTo(400,1);
allsel.prop('selectedIndex',0);incap.removeClass('error').val('');resarea.val('');gTotal.val(0);bilan.val(0);stripay.empty();isgift.val(0);truth1.val(0);truth2.val(0);
labelError.empty();
});
})
},
Cancel: function() {
dial.dialog("close");
}
}
});
});

dbar6.on("click", function(e) {
e.preventDefault();
var claz = mix5.attr('class');
mix5.stop(true,true).animate({
  opacity: 0
  }, 450, function() {
mix5.fadeOut(200);
$('#'+claz).fadeIn(750, function() {
$('#'+claz).fadeTo('slow',1);
});
});
});

qua0.on("change keyup keydown focus blur", function() {
var getValue=parseInt($(this).val());
gTotal.val(getValue);stripay.text(getValue);truth1.val(getValue);
});


qua1.on("change keyup keydown", function() {
var givValue=parseInt($(this).val()), bur = parseInt($('.sepie.voir').length)+1;
bilan.val(givValue*bur);stripay.text(givValue*bur);truth2.val(givValue*bur);
});  
   
$('#recents #giftholders').show();
var quotes = $("#recents .rotie");
var roties = $("#recents .rotator");
    var quoteIndex = 0;
    function showNextQuote() {
        ++quoteIndex;
        roties.removeClass('rollIn');
        quotes.eq(quoteIndex % quotes.length)
            .fadeIn(2000)
            .delay(10000)
            .fadeOut(2000, showNextQuote);
            roties.delay(100).addClass('rollIn');
            
            
    }
    function RotNextQuote() {
        roties.addClass('lightSpeedIn');
                
    }
  setTimeout(function() {
  showNextQuote();
  },1000);


if (getUrlVars()["tile"]) {
var nclk = $('#searchGo'),segm = getUrlVars()["tile"];
setTimeout(function() {
ny2ex.trigger('click');
ints.val(segm);
},50);
setTimeout(function() {
nclk.trigger('click');
},1400);
}

thprev.on("click", function(e) {
  e.preventDefault();
  var that = $(this),daticon = that.attr('data-rec'),datcol = that.attr('data-col'),ltrec=$('input#'+daticon).val(),ltcol=$('input#'+datcol).val(), bdy = $('body'),
  datfirst=that.attr('data-first'),datlast=that.attr('data-last'),mif=$('input#'+datfirst).val(),mil=$('input#'+datlast).val(),datav=that.attr('data-amv'),
  amva = $('select#'+datav+' option:selected').attr('class'),thisImg=$('#donateHolder img[data-img="'+daticon+'"]');bdy.removeClass('Bronze Silver Gold');
  that.attr('href','/wp-content/themes/blankslate/images/preview/'+ltrec+ltcol+'.png');
  that.attr('title',mif+' '+mil);thisImg.attr('alt',amva);bdy.addClass(amva);
});

$("a[rel^='prettyPhoto']").prettyPhoto({animation_speed:'normal',markup: '<div class="pp_pic_holder"> \
            <div class="ppt premium"></div> \
            <div class="pp_top"> \
              <div class="pp_left"></div> \
              <div class="pp_middle"></div> \
              <div class="pp_right"></div> \
            </div> \
            <div class="pp_content_container"> \
              <div class="pp_left"> \
              <div class="pp_right"> \
                <div class="pp_content"> \
                  <div class="pp_loaderIcon"></div> \
                  <div class="pp_fade"> \
                    <a href="#" class="pp_expand" title="Expand the image">Expand</a> \
                    <div class="pp_hoverContainer"> \
                      <a class="pp_next" href="#">next</a> \
                      <a class="pp_previous" href="#">previous</a> \
                    </div> \
                    <div id="pp_full_res"></div> \
                    <div class="pp_details"> \
                      <div class="pp_nav"> \
                        <a href="#" class="pp_arrow_previous">Previous</a> \
                        <p class="currentTextHolder">0/0</p> \
                        <a href="#" class="pp_arrow_next">Next</a> \
                      </div> \
                      <p class="pp_description"></p> \
                      {pp_social} \
                      <a class="pp_close" href="#">Close</a> \
                    </div> \
                  </div> \
                </div> \
              </div> \
              </div> \
            </div> \
            <div class="pp_bottom"> \
              <div class="pp_left"></div> \
              <div class="pp_middle"></div> \
              <div class="pp_right"></div> \
            </div> \
          </div> \
          <div class="pp_overlay"></div>',theme:'facebook',show_title: true,deeplinking: false,social_tools:false,default_width: 210,default_height: 210});

$("area[rel^='hotspot']").prettyPhoto({animation_speed:'normal',theme:'facebook',show_title: false,deeplinking: false,social_tools:false,default_width: 428,default_height: 390});
$("a[rel^='faqs']").prettyPhoto({animation_speed:'normal',markup: '<div class="pp_pic_holder"> \
            <div class="ppt premium"></div> \
            <div class="pp_top"> \
              <div class="pp_left"></div> \
              <div class="pp_middle"></div> \
              <div class="pp_right"></div> \
            </div> \
            <div class="pp_content_container"> \
              <div class="pp_left"> \
              <div class="pp_right"> \
                <div class="pp_content"> \
                  <div class="pp_loaderIcon"></div> \
                  <div class="pp_fade"> \
                    <a href="#" class="pp_expand" title="Expand the image">Expand</a> \
                    <div class="pp_hoverContainer"> \
                      <a class="pp_next" href="#">next</a> \
                      <a class="pp_previous" href="#">previous</a> \
                    </div> \
                    <div id="pp_full_res"></div> \
                    <div class="pp_details"> \
                      <div class="pp_nav"> \
                        <a href="#" class="pp_arrow_previous">Previous</a> \
                        <p class="currentTextHolder">0/0</p> \
                        <a href="#" class="pp_arrow_next">Next</a> \
                      </div> \
                      <p class="pp_description"></p> \
                      {pp_social} \
                    </div> \
                  </div> \
                </div> \
              </div> \
              </div> \
              <div class="clozy"> \
              <a href="#" class="pp_close">Close</a> \
              </div> \
            </div> \
            <div class="pp_bottom"> \
              <div class="pp_left"></div> \
              <div class="pp_middle"></div> \
              <div class="pp_right"></div> \
            </div> \
          </div> \
          <div class="pp_overlay"></div>',theme:'facebook',show_title: true,deeplinking: false,social_tools:false,default_height:390});
player1.addEvent('ready', function() {    
player1.addEvent('playProgress', onPlayProgress);
});
function onPlayProgress(data, id) {
cycshow.cycle('pause');
}
cycshow.on("click", function() {
var that = $(this);that.cycle('pause');
});
hotarea.on("click", function() {
cycshow.cycle('pause');
});
$('.cycle-pager span').on("click", function() {
cycshow.cycle('pause');player1.api('pause');console.log('video paused');
});

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
}, 3000);

setTimeout(function () {
tock.show();
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
setTimeout(function() {
$('.tyle').slice(72,108).each(function(i) {
var row = $(this);
    setTimeout(function() {
    row.addClass('wobble-vertical').animate({opacity:0},$).animate({opacity:1});
  }, 200*i);
});
}, 6000);
setTimeout(function() {
$('.tyle').slice(108,144).each(function(i) {
var row = $(this);
    setTimeout(function() {
    row.addClass('wobble-vertical').animate({opacity:0},$).animate({opacity:1});
  }, 200*i);
});
}, 6000);
setTimeout(function() {
$('.tyle').slice(144,180).each(function(i) {
var row = $(this);
    setTimeout(function() {
    row.addClass('wobble-vertical').animate({opacity:0},$).animate({opacity:1});
  }, 200*i);
});
}, 6000);

});

