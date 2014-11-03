jQuery(document).ready(function($) {
 
    Tabs();
    Modals();
    Tooltips();
    $('.ui_tt').on('mouseenter', function(){
      var self = $(this);
      $('<div/>', {
        class: 'ui_tt-content'
      }).appendTo(self);
      tl = new TimelineMax();
      tl.to($('.ui_tt-content'), .1, {display: 'block'})
      .to($('.ui_tt-content'), .4, {borderBottom: 20, width: 300})
      .fromTo($('.ui_tt-content'), .4, {backgroundColor: 'rgba(0,0,0,.0)',rotationX:30, transformOrigin:"50% bottom"}, {backgroundColor: 'rgba(0,0,0,.75)',rotationX:0});
    });
    $('.ui_tt').on('mouseleave', function(){
      $('.ui_tt-content').fadeOut(200, 
        function(){
          $('.ui_tt-content').remove();
        });
    });
});