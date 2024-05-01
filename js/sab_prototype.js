/*jshint browser: true, devel: true, jquery: true*/


$(document).ready(function () {

    if ( $("#sab-prototype ")) {

        var page_id = $('body').attr('id');
        console.log(page_id);
       
        //Concept 1
        $('.sab-menu-item.'+page_id).addClass('current');

        $('#sab-prototype .submenu-toggle').on('click', function(){
            var parentItem =  $(this).parents('.sab-menu-item');

            parentItem.toggleClass('show');
            $(this).parents('.sab-sub-item').toggleClass('show');

            if (parentItem.hasClass('show')) {
                $(this).find('span').text('Hide');
            } else {
                $(this).find('span').text('Show');
            }
        });

        $('.action-select-options').on('change', function(){
            var option = $(this).val(),
                parent = $(this).parents('.action-checklist');
            
            parent.find('.actions').each(function(){
                $(this).addClass('d-none');
            });

            $('.actions[data-value="' + option + '"]').removeClass('d-none');
        });

        //Concept 2
        $('.active .sab2-tile .title').on('click', function(){
            var parentTile =  $(this).parents('.sab2-tile');
            var tilesWrapper =  $(this).parents('.sab2-tile-wrapper');
            
            if (parentTile.hasClass('show')) {
                parentTile.removeClass('show');
            } else {
                tilesWrapper.find('.sab2-tile').each(function(){
                   $(this).removeClass('show'); 
                });
                parentTile.addClass('show');
            }
        });

        $('.sab2-checklist-panel .close').on('click', function(){
            $('.sab2-checklist-panel').addClass('d-none');
            $('.checklist-underlay').addClass('d-none');
        });

        $('.sab-checklist-trigger').on('click', function(){
            $('.sab2-checklist-panel').removeClass('d-none');
            $('.checklist-underlay').removeClass('d-none');
        });

              
    }


}); //End doc ready