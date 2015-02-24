jQuery(document).ready(function($) {
 	
	$.fn.isAfter = function(sel){
	  return this.prevAll(sel).length !== 0;
	}
	$.fn.isBefore= function(sel){
	  return this.nextAll(sel).length !== 0;
	}
 	
 	// get window and window height(on resize)
 	var $window = $(window);
	var $winWidth = $(window).width();
	$window.on('resize', function(){
		$winWidth = $(window).width();
		console.log($winWidth);
	});
	console.log($winWidth);

	// test if mac or pc
	if (navigator.userAgent.indexOf('Mac OS X') != -1) {
	  $("body").addClass("mac");
	} else {
	  $("body").addClass("pc");
	}

    Tabs();
    Modals();
    Tooltips();
    Menu();
});
