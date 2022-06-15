/*jshint browser: true, devel: true, jquery: true*/

$( document ).ready(function() {

    
// SET SHOWING NUMBER ON LANDING PAGES
var get_component_number = function(){
    var component_num = $('.bga-component:visible').length;
    $('.component_number span').text(component_num);
    
    if ( component_num === 0 ) {
        var search_term = $('#component_name').val();
        $('.no-results').addClass('show').find('span').text(search_term);
   
    } else {
        $('.no-results').removeClass('show');
    }
};   
get_component_number();
    
var reset_nav_tiles = function(){
    $('.nav-tile-wrapper').each(function(){
        $(this).removeClass('filters_on searched_on show');
    });
};
    
  

//FILTER ITEMS ON COMPONENTS PAGE
    
var filter_items = function(filter_states, i){ 
    $(filter_states[i]).each(function(){
        $(this).addClass('show');   
    });
};
    
$('.filter-item').on('click', function(){
     
    //Clear filter classes from nav-tiles.
    reset_nav_tiles();
    
    $('#component_name').val('');
    
    var filter_states = []; 
    var filter_option = $(this).find('input').attr('id');
     
    // Create list of checked filters
    $('.filter-item input').each(function(){ 
        if ( $(this).is(":checked") ) {
            var tile_id = '.' + $(this).attr('id');
            filter_states.push(tile_id);  
        }
    });
    
    
    if (filter_states.length > 0) {
        $('.nav-tile-wrapper').each(function(){
            $(this).addClass('filters_on');
        });
        for (var i = 0; i < filter_states.length; i++) { 
            filter_items(filter_states, i);    
        }  
    }
    
    get_component_number();    

     
 });    
  
    
    
// SEARCH COMPONENTS BY NAME
var components_list = ['bga-hero-pathway-list', 'bga-standard-pathway-list', 'bga-light-pathway-list', 'bga-feature-image-pathway', 'bga-image-pathway-list', 'bga-inline-pathway', 'bga-page-headers', 'bga-call-to-action', 'bga-call-out-box', 'bga-call-out-link', 'bga-feature-boxes', 'bga-accordion', 'bga-mini-list', 'bga-table', 'bga-image', 'bga-video-player', 'bga-audio-player', 'bga-download-list', 'bga-grant-status-indicator', 'bga-pull-quote', 'bga-notifications', 'bga-modal-dialog', 'bga-disclaimer-alerts', 'bga-global-alert', 'bga-site-header', 'bga-site-footer', 'bga-anchor-menu', 'bga-breacdrumbs', 'bga-pagination', 'bga-print-and-share-utilities', 'bga-chat-button', 'bga-in-page-feedback', 'bga-subscribe', 'bga-subsite-header', 'bga-subsite-footer', 'bga-stepped-navigation', 'bga-progress-bar', 'bga-save-your-progress-sidebar', 'bga-tool-start-component', 'bga-search-result-information-tiles'];
    
$('#component_name').on('change', function(){
   
    var str = $(this).val();
    str = str.toLowerCase();
    str = str.replace(' ', '-');
    
    // Create list of components with str in their name
    var filtered_components = [];
    for (var i = 0; i < components_list.length; i++) {
        
        if (components_list[i].includes(str)) {     
            filtered_components.push(components_list[i]);

        } 
    }

    reset_nav_tiles();
    
    $('.nav-tile-wrapper').each(function(){    
        $(this).addClass('searched_on');
    });
    $('.filter-item input').each(function(){
        $(this).prop('checked', false);
    });
    
    // Filter items by searched str
    for (var j = 0; j < filtered_components.length ; j++) {
        $('.' + filtered_components[j]).addClass('show');
    }
    
    
    // Reset component number
    get_component_number();    
    
    
});
    

// Clear filters on components page
$('.reset-filters').on('click', function(){
    
    // Reset classes on nav-tiles
    reset_nav_tiles();
    
    // Reset search input field
    $('#component_name').val('');
    
    // Reset checkboxes
    $('.filter-item input').each(function(){
        $(this).prop('checked', false);
    });
    
    // Reset component showing number
    get_component_number();
});
 
    
    
// ANCHOR MENU 

if( $('#anchor-menu').length ) {

    //Create object containing 
    var sections = {};
    $('#anchor-menu li a').each(function(){

        if ( $(this).attr('href') ) {
            var anchor_link = $(this).attr('href');
            var section_position = $(anchor_link).position();
            sections[anchor_link] = Math.round(section_position.top);
        }
    });

    // Stickiness
    var make_sticky = function () {
        var menu_position = Math.round($('.anchor-menu-wrapper').position().top);
        var menu_width = $('.anchor-menu-wrapper').width();
        var menu_height = $('.anchor-menu').height();
        var footer_height = $('#footer').height();
        var unfix = $(document).height() - footer_height - menu_height;

        $('.anchor-menu').css('width', menu_width);

        if ($(window).width() >= 992) {

            $(window).scroll(function () { 
                var scroll_position = $(window).scrollTop();

                if (scroll_position >= menu_position && scroll_position < unfix) {
                    $('.anchor-menu').addClass('fixed');
                } else {
                    $('.anchor-menu').removeClass('fixed');  
                }
            });    
        } else if ($(window).width() < 992){
           $(window).scroll(function () {
               $('.anchor-menu').removeClass('fixed');
            });
        }
    };

    make_sticky();

    $(window).resize(function(){

        if ($(window).width() < 992) {
            $('.anchor-menu').removeClass('fixed');
        }

        make_sticky();
    });

    // Current section
    $(window).scroll(function(){
        var current_section;

        for (var key in sections) {

            if ($(window).scrollTop() >= sections[key] - 16 ) {
                current_section = key;
            }
        }
        $('#anchor-menu li a').each(function(){
            $(this).removeClass('current');

            if ( $(this).attr('href') === current_section ) {
                $(this).addClass('current');
            }
        });


    });

    }
    
    
// PREVENT EMPTY LINKS CAUSING PAGE SCROLL
$('a').on('click', function(e){
    if ( $(this).attr('href') === "") {
        e.preventDefault();
    }
});
    
    
// COMPONENTS PAGE - BREAKPOINT RADIO BUTTONS
$('.breakpoints .hide').each(function(){
    $(this).remove();
});

$('.breakpoints .btn-group').each(function(){
    $(this).find('input').first().attr('checked', 'checked');
});    
    
$('.breakpoints input').on('click', function(){
    if ( $(this).is(":checked") ) {
        var breakpoint = $(this).attr('data-breakpoint'),
            example_container = $(this).parents('.breakpoints').next('div.component-example');
       
        example_container.removeClass('bp-min1200 bp-min992 bp-min768 bp-min576 bp-mobile');
        example_container.addClass(breakpoint);
    }
});
    
// Display mobile design on smaller screens
var set_screen_width = function(){
    var screen_width = $(window).width();
    if ( screen_width < 768 ) {
        $('.component-example').addClass('small-screen');
    } else {
        $('.component-example').removeClass('small-screen');
    }
}; 
set_screen_width();
  
$(window).resize(function() {
    set_screen_width();
});
    
    
// COMPONENTS PAGE - LAYOUT EXAMPLES
// remove unneeded options from layout select on pages that have select options
$('.layouts-select option.false').each(function(){
    $(this).remove();
});

// remove unneeded accordion items from select list
if ($('.layouts-select').length) {
    var visible_layout = $('.layouts-select').val();
    $('.layout-example.' + visible_layout).addClass('show');    
} 
$('.layout-accordion .accordion-item.false').each(function(){
    $(this).remove();
});


// Set first item on remaining accordions to be open by default
$('.layout-accordion').each(function(){
    $(this).find('.accordion-item').first().addClass('first');   
});
$('.layout-accordion .accordion-item.first').find('button').attr("aria-expanded","true").removeClass('collapsed');
$('.layout-accordion .accordion-item.first').find('.collapse').addClass('show');


// Hide all layout accordions by default. Show accordion that matches select layouts option on pages that have select options
if ($('.layouts-select').length) {
        $('.layouts-select').on('change', function(){
        $('.layout-example').each(function(){
            $(this).removeClass('show');
        });

        var new_layout = $(this).val();
        $('.layout-example.' + new_layout).addClass('show');
    });
}

// Open/close all button
$('.accordion-toggle').on('click', function(){
    var button_state = $(this).text();

    if ( button_state === "Open all" ) {
        $(this).text('Close all');
        $(this).next('.accordion').find('.accordion-item').each(function(){
            $(this).find('.collapse').addClass('show');
            $(this).find('button').attr("aria-expanded","true").removeClass('collapsed');

        });
    } else {
        $(this).text('Open all');   
        $(this).next('.accordion').find('.accordion-item').each(function(){
            $(this).find('.collapse').removeClass('show');
            $(this).find('button').attr("aria-expanded","false").addClass('collapsed'); 
        });
    }
});

// Check if all accordion items are opened or closed when one item is clicked.
$('.accordion-button').on('click', function(){
    var open_items = 0,
        closed_items = 0,
        total_items = $(this).parents('.layout-accordion').find('.accordion-item').length;

    $(this).parents('.layout-accordion').find('.accordion-item').each(function(){
        if ( $(this).find('.accordion-button').hasClass('collapsed') ) {
            closed_items = closed_items +1;
        } else {
            open_items = open_items + 1;
        }
    });

   if ( open_items === total_items ) { 
       $('.accordion-toggle').text('Close all');

    } else if ( closed_items === total_items ) {
        $('.accordion-toggle').text('Open all');
    }
});


    
// FORM EXAMPLES
$('.form-example input').on('change', function(){
    if ( $(this).val() == 'error' ) {
        $(this).parents('.form-element-wrapper').addClass('error');
        $(this).parents('.form-example').find('.error-feedback').addClass('show');
    } else {
        $(this).parents('.form-element-wrapper').removeClass('error');
        $(this).parents('.form-example').find('.error-feedback').removeClass('show');
    }
});

    
// TEXTAREA COUNT
	var max_length = 100;
	$('#textarea-example').highlightWithinTextarea({
		highlight: [max_length, 200000]
	});

	$('#textarea-example').on('input', function () {
        
        var textarea_text = $(this).val(),
			textarea_count = textarea_text.length;
        
        $('.textarea-char-count span.count').text(textarea_count);

		if (textarea_count <= max_length) {
			$('.hwt-content mark').addClass('hide-mark');
			$('.textarea-char-count').text(textarea_count + ' of ' + max_length + ' characters used').removeClass('excess-count');
			$('.textarea-char-count').addClass('under');
            $(this).parents('.form-element-wrapper').removeClass('error');
		} else if (textarea_count > max_length) {
			var excess_count = textarea_count - max_length;
			$('.textarea-char-count').text('Character limited exceeded by ' + excess_count).addClass('excess-count');
			$('.textarea-char-count').removeClass('under');
            $(this).parents('.form-element-wrapper').addClass('error');
		}
	});
    
}); //End doc ready


