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
var components_list = ['bga-hero-pathway-list', 'bga-standard-pathway-list', 'bga-light-pathway-list', 'bga-feature-image-pathway', 'bga-image-pathway-list', 'bga-inline-pathway-list', 'bga-page-headers', 'bga-call-to-action', 'bga-call-out-box', 'bga-contact-us-call-out-box', 'bga-event-registration-call-out-box', 'bga-call-out-link', 'bga-feature-box', 'bga-accordion', 'bga-mini-list', 'bga-table', 'bga-image', 'bga-video-player', 'bga-audio-player', 'bga-download-list', 'bga-grant-status-indicator', 'bga-pull-quote', 'bga-notifications', 'bga-modal-dialog', 'bga-disclaimer-alerts', 'bga-global-alert', 'bga-site-header', 'bga-site-footer', 'bga-anchor-menu', 'bga-breacdrumbs', 'bga-pagination', 'bga-print-and-share-utilities', 'bga-chat-button', 'bga-in-page-feedback', 'bga-subscribe', 'bga-subsite-header', 'bga-subsite-footer', 'bga-guided-search', 'bga-stepped-navigation', 'bga-progress-bar', 'bga-save-your-progress-sidebar', 'bga-more-information-sidebar', 'bga-tool-start-component', 'bga-search-result-information-tiles', 'bga-toast-notification', 'bga-form-field-group', 'bga-tool-results'];
    
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
$('.breakpoints .btn-group').each(function(){
    $(this).find('input').first().attr('checked', 'checked');
});    
    
$('.breakpoints input').on('click', function(){
    var breakpoint,
    example_container = $(this).parents('.breakpoints').next('div.component-example');
    
    example_container.removeClass('bp-desktop bp-1200 bp-992 bp-768 bp-576 bp-350 bp-below1200 bp-below992 bp-below768 bp-below576 bp-below350');
    
    if ($(this).is(":first-of-type")) { 
        breakpoint = 'bp-desktop';
        example_container.addClass(breakpoint);
    } else {
        breakpoint = $(this).attr('data-breakpoint');
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
    
// Show first layout example (rest are set to display none by default)
if ($('.layouts-select').length) {
    var visible_layout = $('.layouts-select').val();
    $('.layout-example.' + visible_layout).addClass('show');    
} 
    
// Set first item on remaining accordions to be open by default
var show_first_item = function(layout_accordion, accordion_item, accordion_parent){
    // Hide all items
    $(layout_accordion + ' ' + accordion_item).each(function(){
        $(this).find('button').attr("aria-expanded","true").addClass('collapsed');
        $(this).find('.collapse').removeClass('show');
    });
   
    // Show first item
    $(layout_accordion).each(function(){
        $(this).find(accordion_item).first().addClass('first');   
    });
    $(layout_accordion + ' ' + accordion_item + '.first').find('button').attr("aria-expanded","true").removeClass('collapsed');
    $(layout_accordion + ' ' + accordion_item + '.first').find('.collapse').addClass('show');
};

show_first_item('.layout-accordion', '.accordion-item', '.layout-example');

// On layouts dropdown change show accordion that matches dropdown selection
if ($('.layouts-select').length) {
        $('.layouts-select').on('change', function(){
        $('.layout-example').each(function(){
            $(this).removeClass('show');
        });

        var new_layout = '.layout-example.' + $(this).val();
        $(new_layout).addClass('show');

        show_first_item(new_layout, '.accordion-item', '.layout-example');

        var accordion_toggle = $(new_layout).find('.accordion-toggle').find('span');
        accordion_toggle.text('Open all');

    });
}

// Open/close all button
$('.accordion-toggle').on('click', function(){
    var button_state = $(this).find('span').text();

    if ( button_state === "Open all" ) {
        $(this).addClass('close');
        $(this).find('span').text('Close all');
        $('.accordion-item').each(function(){
            $(this).addClass('show');
        });
        $(this).next('.accordion').find('.accordion-item').each(function(){
            $(this).find('.collapse').addClass('show');
            $(this).find('button').attr("aria-expanded","true").removeClass('collapsed');
        });
    } else {
        $(this).removeClass('close');
        $(this).find('span').text('Open all');
        $('.accordion-item').each(function(){
            $(this).removeClass('show');
        });   
        $(this).next('.accordion').find('.accordion-item').each(function(){
            $(this).find('.collapse').removeClass('show');
            $(this).find('button').attr("aria-expanded","false").addClass('collapsed'); 
        });
    }
});

// Check if all accordion items are opened or closed when one item is clicked.
$('.accordion-button').on('click', function(){
    
    $(this).parents('.accordion-item').toggleClass('show');

    var open_items = 0,
        closed_items = 0,
        parent_accordion = $(this).parents('.accordion'),
        total_items = parent_accordion.find('.accordion-item').length,
        accordion_toggle = parent_accordion.prev('.accordion-toggle').find('span');

    parent_accordion.find('.accordion-item').each(function(){
        if ( $(this).find('.accordion-button').hasClass('collapsed') ) {
            closed_items = closed_items +1;
        } else {
            open_items = open_items + 1;
        }
    });

   if ( open_items === total_items ) { 
       accordion_toggle.text('Close all');

    } else if ( closed_items === total_items ) {
        accordion_toggle.text('Open all');
    }

   
});
    
// FORM EXAMPLES

$('.form-example input').on('change', function(){
    if ( $(this).val() == 'error' ) {
        $(this).parents('.form-element-wrapper').addClass('error');
    } else {
        $(this).parents('.form-element-wrapper').removeClass('error');
    }
});
    
 $('.form-example select').on('change', function(){
     console.log($(this));
    if ( $(this).val() == 'error' ) {
        $(this).parents('.form-element-wrapper').addClass('error');
    } else {
        $(this).parents('.form-element-wrapper').removeClass('error');
    }
});   
    
$('.error-checkbox').on('click', function(){
    if ( $(this).is(":checked") ) {   
        $(this).parents('.form-element-wrapper').addClass('error');
    } else {
        $(this).parents('.form-element-wrapper').removeClass('error');
    }
});
    
$('.form-element-wrapper .radio-button input').on('change', function(){
    var error_radio = $(this).parents('.form-element-wrapper').find('.error-radio');
    
    if (error_radio.is(":checked")) {
        $(this).parents('.form-element-wrapper').addClass('error');
    } else {
        $(this).parents('.form-element-wrapper').removeClass('error');
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
    
    
    
// COPY ICON CODE
$('.copy-icon-example').on('click', function(){ 
    
    // Get SVG
    var svgSrc = $(this).find("img").attr('src');
    
    $.get(svgSrc, function (data) {
        var svgNode = data.childNodes;
        var svgCode = svgNode[0].outerHTML || new 
        XMLSerializer().serializeToString(svgNode[0]);
        
        // Copy code
        var $temp = $("<input>");
			$("body").append($temp);
			$temp.val(svgCode).select();
			document.execCommand("copy");
			$temp.remove();
        
        $(".example.copied").focus().blur();
    });
    
    // Change text on copy buttons
    $('.copy-icon-example').each(function(){
        $(this).removeClass('copied').find('.button-text span').text('Copy code');
    });
    
    if ( ! $(this).hasClass('copied') ) {
        $(this).addClass('copied').find('.button-text span').text('Copied');
        
    } 
});


// SEARCH INPUT EXAMPLE
$(".bga-site-header .search-container input").on('focus', function() {
    $(this).addClass('in-focus');
});
    
$(".bga-site-header .search-container input").on('focusout', function() {
    $(this).removeClass('in-focus');
});
 
// Mobile search
$('.bga-site-header .mobile-search').on('click', function(){
    $('.bga-site-header .navbar').slideUp();
    $('.bga-site-header .mobile-nav').removeClass('open');
    
    $('.bga-site-header #mobile-search').slideToggle();
    $(this).toggleClass('open');
});



// SITE NAV EXAMPLE
// Level 1 open and close on desktop and mobile.
$(".bga-site-header .level-1").on('click', function(){
    

    if ( !$('.bga-site-header .mobile-nav').is(":visible") ) { 

        $('.submenu').each(function(){
            
            if( $(this).prev().hasClass('open')) {
                $(this).slideUp();
            }
            else {
                $(this).hide();
            }

        });

    } else {
        $('.submenu').each(function(){
            $(this).slideUp();
        });
    }
    
    
    if ( $(this))
        if( $(this).hasClass('open')) {
            $(".bga-site-header .level-1").each(function(){
                $(this).removeClass('open');

            });
        } else {
            $(".bga-site-header .level-1").each(function(){
                $(this).removeClass('open');

            });

            $(this).addClass('open');
            $(this).next('.submenu').slideDown();
        }
});

// Mobile level 2 open and close
    $(".bga-site-header .level-2").on('click', function(){
        
            if( $(this).hasClass('open')) {
                $(".bga-site-header .level-2").each(function(){
                    $(this).removeClass('open');
                });
            } else {
                $(".bga-site-header .level-2").each(function(){
                    $(this).removeClass('open');
                });
                $(this).addClass('open');
                $(this).next('.submenu').slideDown();
            }
        
    });

// Reset on breakpoint change
$('#bga-site-header-group label:last-of-type').on('click', function(){  
    $("#mobile-search").hide();
    $('.mobile-search').removeClass('open');
    $('.navbar').hide();
    $('.mobile-nav').removeClass('open');
});
$('#bga-site-header-group label.bp-xs').on('click', function(){  
    $("#mobile-search").hide();
    $('.mobile-search').removeClass('open');
    $('.navbar').hide();
    $('.mobile-nav').removeClass('open');
});
$('#bga-site-header-group label.bp-md').on('click', function(){
    $("#mobile-search").hide();
    $('.mobile-search').removeClass('open');
    $('.navbar').show();
});
$('#bga-site-header-group label.bp-lg').on('click', function(){
    $("#mobile-search").hide();
    $('.mobile-search').removeClass('open');
    $('.navbar').show();
});

// Close nav on click outside  
$(document).mouseup(function(e) {
    
    var container = $('.bga-site-header .nav');
    
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        
        $('.bga-site-header .nav-dropdown').each(function(){
            $(this).removeClass('open');
        });
        $('.bga-site-header .level-1').each(function(){
            $(this).removeClass('open');    
        });
        $('.submenu').each(function(){
            $(this).slideUp();
        });
        
        if ($(window).width() < 576) {
            console.log('mobile');
        }
        
    }
});


// Mobile navigation
$('.bga-site-header .mobile-nav').on('click', function(){
    $('.bga-site-header #mobile-search').slideUp();
    $('.bga-site-header .mobile-search').removeClass('open');
    
    $('.bga-site-header .navbar').slideToggle();
    $(this).toggleClass('open');
});

$(window).resize(function(){
    if ( $(window).width() >= 767 ) {
        $('.bga-site-header #mobile-search').hide();
        $('.bga-site-header .mobile-search').removeClass('open');
    }
});

    
}); //End doc ready


