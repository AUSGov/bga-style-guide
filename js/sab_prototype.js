/*jshint browser: true, devel: true, jquery: true*/


$(document).ready(function () {

    if ( $("#sab-prototype ")) {
        var page_id = $('body').attr('id');
        console.log(page_id);
       
        $('.sab-menu-item.'+page_id).addClass('current');

        $('#sab-prototype .submenu-toggle').on('click', function(){
            var parentItem =  $(this).parents('.sab-menu-item');

            parentItem.toggleClass('show');
            $(this).parents('.sab-sub-item').toggleClass('show');
        
        });
    }


}); //End doc ready