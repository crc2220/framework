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

	var eventType =((document.ontouchstart!==null)?'click':'touchstart');

	function ie_ver(){  
	    var iev=0;
	    var ieold = (/MSIE (\d+\.\d+);/.test(navigator.userAgent));
	    var trident = !!navigator.userAgent.match(/Trident\/7.0/);
	    var rv=navigator.userAgent.indexOf("rv:11.0");

	    if (ieold) iev=new Number(RegExp.$1);
	    if (navigator.appVersion.indexOf("MSIE 10") != -1) iev=10;
	    if (trident&&rv!=-1) iev=11;

	    return iev;         
	}

	function msieversion() {    
	    var msie = ie_ver();
	    if (msie != 0)      
	          $('a, hr').addClass('ie');    
	    else     
	    return false;
	}

	msieversion();
	

    Tabs();
    Modals();
    Tooltips();
    Menu();
});
