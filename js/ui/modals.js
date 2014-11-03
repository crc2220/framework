var Modals = function(){
    var modalContent = $('.ui_modal-content'),
            modal        = $('.ui_modal');
        
        var openModal = function(self){
            $('<div/>', {
                class: 'ui_modal-overlay'
            }).appendTo('body');
        
            $('<div/>', {
                class: 'ui_modal'
            }).appendTo('body');
            
            tl = new TimelineMax();
            tl.to($('.ui_modal-overlay'), .4, {opacity: 1})
            // $('.ui_modal-overlay').fadeIn(900);
            .to($('.ui_modal'), .1, {opacity: 1})
            .from($('.ui_modal'), 1, {top: '-10%', ease: Elastic.easeOut});
            
            var dataModal = $(self).data('modal');
            
            $('.ui_modal').html(dataModal);
            
            $('<span/>', {
                class: 'ui_modal-close'
            }).appendTo('.ui_modal');
            
            $('.ui_modal-close').on('click', function(){
                closeModal(); 
            });
        };
        
        var closeModal = function(){
            tl = new TimelineMax();
            tl.to($('.ui_modal'),1, {top: '-10%', ease: Elastic.easeIn})
            // $('.ui_modal-overlay').fadeIn(900);
            
            .to($('.ui_modal-overlay'), 1, {opacity: 0, onComplete: removeModal});
            
        };
        
         var removeModal = function(){
            $('.ui_modal-overlay').remove();
            $('.ui_modal').remove();
        };
      
        $('.ui_btn-modal').on('click', function(){
            var self = this;
            openModal(self); 
        });

};