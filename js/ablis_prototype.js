/*jshint browser: true, devel: true, jquery: true*/

$(document).ready(function () {

    // Check is page is in ablis prototype
    if ($('#ablis-prototype').length) {
        console.log("ablis page");
        // Hide empty <p>
        $('p:empty').hide();
    }

    // RESULT PAGES ------------------------------------------------------
    if ($('.results-page').length) {
        console.log('results page');

        // Sticky header
        /*
        if ($('.sticky-wrapper').length) {
            var header_width = $('.header-content').innerWidth(),
            sticky_position = $('.sticky-wrapper').offset();

            $(window).scroll(function () {
                if ($(window).scrollTop() > sticky_position.top) {
                    $('.sticky-wrapper').addClass('fixed')
                    $('.sticky-header').css('width', header_width);  
                } else {
                    $('.sticky-wrapper').removeClass('fixed').css('width', 'auto');
                    $('.sticky-header').css('width', "auto");
                }
            });
        };
        */
        $(window).resize(function () {
            // ADD CODE TO CHECK STICKY HEADER WIDTH ON RESIZE
        }); 
        


        // Calculate different service type counts
        var licence_count = 0,
        regulation_count = 0,
        code_count = 0,
        advisory_count = 0;
        $('.ablis-result').each(function(){
            if ($(this).hasClass('licence')) {
                licence_count++;
            } else if ($(this).hasClass('regulatory-obligation')) {
                regulation_count++;
            } else if ($(this).hasClass('code-of-practice')) {
                code_count++;
            } else if ($(this).hasClass('advisory-material')) {
                advisory_count++;
            } 
        });
    
        $('.result-count.licences').text(licence_count);
        $('.result-count.regulations').text(regulation_count);
        $('.result-count.codes').text(code_count);
        $('.result-count.advisory').text(advisory_count);

        // Add total recommendations count to top of th epage
        var total_count = licence_count + regulation_count + code_count + advisory_count;
        $('.showing-number span').text(total_count);


        // Expand result tile accordions
        $('.result-header').on('click', function(){

            var result = $(this).parents('.ablis-result'),
            description = result.find('.result-content');
            result.toggleClass('open');

            if (result.hasClass('open')) {
                description.removeClass('d-none');

            } else {
                description.addClass('d-none');
            }
        });

        // Set heights for descriptions in result tiles using the height of a cloned element 
        var set_description_heights = function(){
            $('.serviceSection').each(function(){
                $(this).find(':first-child').find(':first-child').addClass('first-element');
        
                var clone = $(this).clone().css({'padding-left':'48px', 'padding-right':'40px'}).appendTo('.results-wrapper').addClass('clone');
                var first_elem = clone.find(':first-child').find(':first-child');
                var first_elem_height = first_elem.height();
                $(this).height(first_elem_height);
        
                clone.remove();       
            });
        };
        set_description_heights();
        
        $(window).resize(function () {
            set_description_heights();
        }); 

        // Open / close descriptions in result tiles
        $('.ablis-result .expand').on('click', function(){
            var description_wrapper = $(this).parents('.description').find('.serviceSection'),
            first_elem = description_wrapper.find('.first-element');
            first_elem_height = first_elem.height();

            if (description_wrapper.height() == first_elem.height()) {
                description_wrapper.height('auto');
                $(this).text('less...');
            } else {
                description_wrapper.height(first_elem_height);
                $(this).text('more...');
            }
        });
    }
    

}); // End doc ready


