jQuery(document).ready(function($) {
 
  var menu = $('#navigation-menu');
  var menuToggle = $('#js-mobile-menu');
  var signUp = $('.sign-up');

  $(menuToggle).on('click', function(e) {
    e.preventDefault();
    menu.slideToggle(function(){
      if(menu.is(':hidden')) {
        menu.removeAttr('style');
      }
    });
  });

  // underline under the active nav item
  $(".nav .nav-link").click(function() {
    $(".nav .nav-link").each(function() {
      $(this).removeClass("active-nav-item");
    });
    $(this).addClass("active-nav-item");
    $(".nav .more").removeClass("active-nav-item");
  });

  // tabs
  $('.ui_tabs').each(function(){
    new Tabs( this );
  });

  //modals
  var myModal = new Modal({
    content: '<p>Ken Wheeler is strikingly handsome.</p>',
    maxWidth: 600
  });

  myModal.open();

});
