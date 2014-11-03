var Tabs = function(){
    var tabContent = $('.ui_tab-content'),
        tab        = $('.ui_tab');
    
    $(tabContent).hide();
    
    $('.row > .ui_tab:first-child').addClass('ui_tab-active');
    $('.row').find('.ui_tab-content:first').fadeIn();
    
    $(tab).on('click', function(){
        $(this).parent('.ui_tab-nav').siblings('.ui_tab-content').hide();
        $(this).siblings().removeClass('ui_tab-active');
        $(this).addClass('ui_tab-active');
        var thisTab = $(this).data('tab');
        $(this).parent('.ui_tab-nav').siblings('.ui_tab-content').each(function(){
            if($(this).data('tab') === thisTab ){
                $(this).fadeIn();
            }
        });
    });
 
};