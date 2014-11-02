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
            

      
            $('.ui_modal-overlay').fadeIn(900);
            $('.ui_modal').fadeIn();
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
            $('.ui_modal-overlay').fadeOut( function() { $(this).remove(); });
            
            $('.ui_modal').fadeOut( function() { $(this).remove(); });
        };
      
        $('.ui_btn-modal').on('click', function(){
            var self = this;
            openModal(self); 
        });

};