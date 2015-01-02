jQuery(document).ready(function($) {
 	
 	var $window = $(window);
	var $winWidth = $(window).width();
	$window.on('resize', function(){
		$winWidth = $(window).width();
		console.log($winWidth);
	});

	console.log($winWidth);
    Tabs();
    Modals();
    Tooltips();
    Menu();
});
