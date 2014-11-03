var Menu = function(){
	$( document).mousemove(function( e ) {
	  if(e.pageX< 20){
	    TweenMax.to($('.ui_menu'), .5, {left:0});
	    TweenMax.to($('.container'), .5, {left:300, position: 'absolute'});
	  } else if(e.pageX > 300){
	    TweenMax.to($('.ui_menu'), .5, {left:-300});
	    TweenMax.to($('.container'), .5, {left:0, position: 'relative'});
	  }
	});
}