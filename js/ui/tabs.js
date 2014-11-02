var Tabs = function(){
    var tabContent = $('.ui_tab-content'),
        tab        = $('.ui_tab');
    
    $(tabContent).hide();
    
    $(tab).first().addClass('ui_tab-active');
    $(tabContent).first().show();
    
    $(tab).on('click', function(){
        $(tabContent).hide();
        $(tab).removeClass('ui_tab-active');
        $(this).addClass('ui_tab-active');
        var thisTab = $(this).data('tab');
        $(tabContent).each(function(){
            if($(this).data('tab') === thisTab ){
                $(this).fadeIn();
            }
        });
    });
 
};