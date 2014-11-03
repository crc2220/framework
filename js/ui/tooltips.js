var Tooltips = function(){
$('.ui_tt').on('mouseenter', function(){
      var self = $(this);
      $('<div/>', {
        class: 'ui_tt-content'
      }).appendTo(self);
      var ttContent = $(self).data('tt');
      
      var loadContent = function(){
        $('.ui_tt-content').html('<p>'+ttContent+'</p>');
        TweenMax.from($('.ui_tt-content p'), .25, {marginLeft: '-30%'});
      };
      
      tl = new TimelineMax();
      tl.to($('.ui_tt-content'), .1, {display: 'block'})
      .to($('.ui_tt-content'), .2, {borderBottom: 20, width: 300})
      .fromTo($('.ui_tt-content'), .3, {
        backgroundColor: 'rgba(0,0,0,.0)',
        rotationX:30, 
        transformOrigin:"50% bottom"
      }, {
        backgroundColor: 'rgba(0,0,0,.75)',
        rotationX:0, 
        onComplete: loadContent
      });
      
    });
    $('.ui_tt').on('mouseleave', function(){
      $('.ui_tt-content').fadeOut(200, function(){
        $('.ui_tt-content').remove();
    });
});
};