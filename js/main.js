jQuery(document).ready(function($) {
 	
 	var $window = $(window);
	var $winWidth = $(window).width();
	$window.on('resize', function(){
		$winWidth = $(window).width();
	});

    Tabs();
    Modals();
    Tooltips();
    Menu();
});
