/*jshint browser: true, devel: true, jquery: true*/

$(document).ready(function () {

    // SET SHOWING NUMBER ON LANDING PAGES
    var get_component_number = function () {
        var component_num = $('.bga-component:visible').length;
        $('.component_number span').text(component_num);

        if (component_num === 0) {
            var search_term = $('#component_name').val();
            $('.no-results').addClass('show').find('span').text(search_term);

        } else {
            $('.no-results').removeClass('show');
        }
    };
    get_component_number();

    var reset_nav_tiles = function () {
        $('.nav-tile-wrapper').each(function () {
            $(this).removeClass('filters_on searched_on show');
        });
    };

    //FILTER ITEMS ON COMPONENTS PAGE

    var filter_items = function (filter_states, i) {
        $(filter_states[i]).each(function () {
            $(this).addClass('show');
        });
    };

    var calc_loading_position = function(){
        
        if($('.tiles-wrapper').length) {
            var tiles_position = Math.round($('.tiles-wrapper').position().top),x
            halfway_position = tiles_position / 2;
            scroll_position = $(window).scrollTop();

            if (scroll_position < tiles_position) {
                if (scroll_position < halfway_position) {
                    $('.tiles-loading').css('top', '65%');
                } else {
                    $('.tiles-loading').css('top', '35%');
                }
            } else {
                $('.tiles-loading').css('top', '25%');
            };
        };

    };
    

    $('.filter-item').on('click', function () {
        calc_loading_position();
        $('.tiles-wrapper').addClass('inactive');
        $('.tiles-loading').addClass('show');

        setTimeout(function () {
            //Clear filter classes from nav-tiles.
            reset_nav_tiles();
            
            $('#component_name').val('');

            var filter_states = [];

            // Create list of checked filters
            $('.filter-item input').each(function () {
                if ($(this).is(":checked")) {
                    var tile_id = '.' + $(this).attr('id');
                    filter_states.push(tile_id);
                }
            });

            if (filter_states.length > 0) {
                $('.nav-tile-wrapper').each(function () {
                    $(this).addClass('filters_on');
                });
                for (var i = 0; i < filter_states.length; i++) {
                    filter_items(filter_states, i);
                }
            }

            get_component_number();
            $('.tiles-loading').removeClass('show');
            $('.tiles-wrapper').removeClass('inactive');

        }, 400);

    });

    $('.showing-header .filter-toggle button').on('click', function(){
        $('#showing-filters-modal').addClass('show');
        $('.modal-overlay').addClass('show');

        mobile_modal_display();
        scroll_max_height('#showing-filters-modal', '.bottom-content', '.scrollable');
    });
    $('.view-results').on('click', function(){
        $('#showing-filters-modal, .modal-overlay').removeClass('show');
    });


    // PAGE PATTERNS - click on hotspots to go to rules
    $('.spot a').on('click', function () {

        var rule_number = "#rule-" + $(this).text();

        $('html, body').animate({
            scrollTop: $(rule_number).offset().top
        }, 300);

        setTimeout(function () {
            $(rule_number).find('.collapse').collapse('show');
        }, 1000);

    });

    $('.spot p').on('click', function () {
        var rule_number = "#rule-" + $(this).parents('.spot').find('a').text();

        $('html, body').animate({
            scrollTop: $(rule_number).offset().top
        }, 300);

        setTimeout(function () {
            $(rule_number).find('.collapse').collapse('show');
        }, 1000);

    });



    // SEARCH COMPONENTS BY NAME
    var components_list = ['bga-hero-pathway-list', 'bga-standard-pathway-list', 'bga-light-pathway-list', 'bga-feature-image-pathway', 'bga-image-pathway-list', 'bga-inline-pathway-list', 'bga-page-headers', 'bga-call-to-action', 'bga-email-download-contract-call-to-action', 'bga-call-out-box', 'bga-contact-us-call-out-box', 'bga-event-registration-call-to-action', 'bga-call-out-link', 'bga-feature-box', 'bga-accordion', 'bga-mini-list', 'bga-table', 'bga-list-group', 'bga-image', 'bga-video-player', 'bga-audio-player', 'bga-download-list', 'bga-grant-status-indicator', 'bga-pull-quote', 'bga-notifications', 'bga-modal-dialog', 'bga-disclaimer-alerts', 'bga-global-alert', 'bga-site-header', 'bga-global-pathway-to-services', 'bga-site-footer', 'bga-anchor-menu', 'bga-breacdrumbs', 'bga-pagination', 'bga-print-and-share-utilities', 'bga-chat-button', 'bga-in-page-feedback', 'bga-subscribe', 'bga-subsite-header', 'bga-subsite-footer', 'bga-guided-search', 'bga-stepped-navigation', 'bga-progress-bar', 'bga-save-your-progress-sidebar', 'bga-information-sidebar', 'bga-tool-start-component', 'bga-site-search-result-tiles', 'bga-finder-tool-result-tiles', 'bga-toast-notification', 'bga-form-field-group', 'bga-tool-results', 'bga-clause-regulation-box', 'bga-breadcrumbs', 'bga-tile-filters', 'bga-grant-rounds-accordion', 'bga-pathway-accordions', 'bga-lightweight-checklist-accordion', 'bga-standard-checklist-accordion', 'bga-home-page-banner', 'bga-category-page', 'bga-topic-page', 'bga-guide-page', 'bga-transaction-action-page', 'bga-101-page', 'bga-tutorial-page', 'bga-resource-article-page', 'bga-internal-grants-landing-page', 'bga-grant-recipients-page', 'bga-customer-stories-landing-page', 'bga-customer-story-page', 'bga-adviser-detail-page', 'bga-event-page', 'bga-tiled-page-with-filters', 'bga-site-search-page', 'bga-tiled-page-with-guided-search', 'bga-standard-checklist', 'bga-lightweight-checklist', 'bga-colour', 'bga-grid-and-page-layouts', 'bga-typography', 'bga-buttons-and-links', 'bga-text-inputs', 'bga-dropdown-select', 'bga-checkboxes-and-radio-buttons', 'bga-radio-buttons', 'bga-checkboxes', 'bga-datepicker', 'bga-contextual-help', 'bga-form-fields', 'bga-form-groups', 'bga-icons', 'bga-iconography', 'bga-logos', 'bga-illustrations', 'bga-infographics', 'bga-maintenance', 'bga-error', 'bga-tiled-page-with-guided-search', 'bga-internal-q-and-a-tools ', 'bga-question-and-answer-tools', 'bga-external-grants-landing-page', 'bga-branded-question-and-answer-tools', 'bga-external-bga-branded-q-and-a-tools', 'bga-tooltip', 'bga-cookie-notification', 'bga-animations', 'bga-tools-and-templates-tiles', 'bga-action-tiles', 'bga-in-page-tabs', 'bga-relevant-support-links', 'bga-map-elements'];

    var name_search = function(input){
        var str = $(input).val();
        str = str.toLowerCase();
        str = str.replace(' ', '-');
    
        calc_loading_position();
        $('.tiles-wrapper').addClass('inactive');
        $('.tiles-loading').addClass('show');

        setTimeout(function () {
        
            // Create list of components with str in their name
            var filtered_components = [];
            for (var i = 0; i < components_list.length; i++) {

                if (components_list[i].includes(str)) {
                    filtered_components.push(components_list[i]);
                }
            }
            
            reset_nav_tiles();

            $('.nav-tile-wrapper').each(function () {
                $(this).addClass('searched_on');
            });
            $('.filter-item input').each(function () {
                $(this).prop('checked', false);
            });

            // Filter items by searched str
            for (var j = 0; j < filtered_components.length; j++) {
                $('.' + filtered_components[j]).addClass('show');
            }

            // Reset component number
            get_component_number();
            $('.tiles-loading').removeClass('show');
            $('.tiles-wrapper').removeClass('inactive');

        }, 400);
    };
    
    $('#component_name').on('change', function () {
        name_search('#component_name');
    });
    $('.nav-tile-search button').on('click', function () {
        name_search('#component_name');
    });



     // Checkboxes & radios selected on 'enter' keypress
     $('input[type=checkbox], input[type=radio]').on('keypress', function (event) {
        if (event.which === 13) {
            $(this).prop('checked', !$(this).prop('checked'));
        }
    });


    // Clear filters on components page
    $('.reset-filters').on('click', function () {

        calc_loading_position();
        $('.tiles-wrapper').addClass('inactive');
        $('.tiles-loading').addClass('show');

        setTimeout(function () {

        // Reset classes on nav-tiles
        reset_nav_tiles();

        // Reset search input field
        $('#component_name').val('');

        // Reset checkboxes
        $('.filter-item input').each(function () {
            $(this).prop('checked', false);
        });

        // Reset component showing number
        get_component_number();
        $('.tiles-loading').removeClass('show');
        $('.tiles-wrapper').removeClass('inactive');

        }, 400);
    });





    // ILLUSTRATION ANATOMY EXAMPLE
    $('.img-anatomy-btn').on('click', function(){
        $(this).addClass('selected');
        $('.img-anatomy-btn').not(this).removeClass('selected');

        var img_type = '.' + $(this).attr('data-value');

        $(img_type).addClass('selected');
        $('.illustration-example-wrapper img').not(img_type).removeClass('selected');

    });

    // ANIMATION EXAMPLES
    $('#loading-trigger').on('click', function(){
        $('.loading-animation').toggleClass('show');
        if ($(this).text() == 'Trigger loading animation') {
            $(this).text('Stop loading animation');    
        } else {
            $(this).text('Trigger loading animation');    
        }
    });

    $('#success-trigger').on('click', function(){
        $('.success-animation').addClass('show');

        setTimeout(function () {
            $('.success-animation').removeClass('show');
        }, 2000);
    });

    $('#highlight-trigger').on('click', function(){
        var span = $('.highlight-animation p span'),
        span_text = span.text();

        if (span_text == "is about to change") {
            span.text("has changed").addClass('highlight');
        } else {
            span.text("is about to change").addClass('highlight');
        }

       setTimeout(function () {
            $('.highlight').removeClass('highlight');
        }, 1000);
        
    });


    // ANCHOR MENU 
    if ($('.in-page #anchor-menu').length) {

        //Create object containing sections
        var sections = {};
        var get_section_positions = function(){
             $('.in-page #anchor-menu li a').each(function () {
                if ($(this).attr('href')) {
                    var anchor_link = $(this).attr('href');
                    var section_position = $(anchor_link).position();
                    sections[anchor_link] = Math.round(section_position.top);
                }
            });
            //  console.log(sections);
        };
        get_section_positions();
       

        // Stickiness
        var make_sticky = function () {
            var menu_position = Math.round($('.anchor-menu-wrapper').position().top);
            var menu_width = $('.anchor-menu-wrapper').width();
            var menu_height = $('.in-page.anchor-menu').height();
            var footer_height = $('#footer').height();

            $('.in-page.anchor-menu').css('width', menu_width);

            if ($(window).width() >= 992) {

                $(window).scroll(function () {
                    var unfix = $(document).height() - footer_height - menu_height;
                    var scroll_position = $(window).scrollTop();

                    if (scroll_position >= menu_position && scroll_position < unfix) {
                        $('.in-page.anchor-menu').addClass('fixed');
                    } else {
                        $('.in-page.anchor-menu').removeClass('fixed');
                    }
                });
            } else if ($(window).width() < 992) {
                $(window).scroll(function () {
                    $('.in-page.anchor-menu').removeClass('fixed');
                });
            }
        };

        make_sticky();

        $(window).resize(function () {
            if ($(window).width() < 992) {
                $('.in-page.anchor-menu').removeClass('fixed');
            }
            make_sticky();
        });

        // Current section
        $(window).scroll(function () {
            get_section_positions();

            var current_section;
            for (var key in sections) {

                if ($(window).scrollTop() >= sections[key] - 16) {
                    current_section = key;
                }
            }
            $('.in-page #anchor-menu li a').each(function () {
                $(this).removeClass('current');

                if ($(this).attr('href') === current_section) {
                    $(this).addClass('current');
                }
            });


        });

    }


    // PREVENT EMPTY LINKS CAUSING PAGE SCROLL
    $('a').on('click', function (e) {
        if ($(this).attr('href') === "") {
            e.preventDefault();
        }
    });


    // COMPONENTS PAGE - BREAKPOINT RADIO BUTTONS
    $('.breakpoints .btn-group').each(function () {
        $(this).find('input').first().attr('checked', 'checked');
    });

    $('.breakpoints input').on('click', function () {
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
    var set_screen_width = function () {
        var screen_width = $(window).width();
        if (screen_width < 768) {
            $('.component-example').addClass('small-screen');
        } else {
            $('.component-example').removeClass('small-screen');
        }
    };
    set_screen_width();

    $(window).resize(function () {
        set_screen_width();
    });

    
    // IN PAGE TABS - style guide component pages
    var tab_functionality = function(tab, content) {
        $(tab).on('click', function () {
            var section = $(this).attr('data-tab');
    
            $(this).addClass('selected');
            $(tab).not(this).removeClass('selected');
    
            $(content).removeClass('selected');
            $(content + '.' + section).addClass('selected');
    
        });
    }
    
    tab_functionality('.section-tabs .tab', '.tab-section');

    $('.tabs-select select').on('change', function(){
        var section = $(this).val();

        $('.tab-section').removeClass('selected');
        $(".tab-section." + section).addClass('selected');
    });

    $(window).resize(function () {

        if ($(window).width() < 768) {
            var section = $('.tabs-select select').val();
            $('.tab-section').removeClass('selected');
            $("." + section).addClass('selected');
        } else {
            var section = $('.tab.selected').attr('data-tab');
            $('.tab-section').removeClass('selected');
            $("." + section).addClass('selected');
        }

    });


    // COMPONENTS PAGE - LAYOUT EXAMPLES    

    // In page tabs examples
    tab_functionality('.example .in-page-section-tabs .tab', '.example .in-page-tab-section');

    tab_functionality('.colour-bkg .in-page-section-tabs .tab', '.colour-bkg .in-page-tab-section');

    tab_functionality('.non-branded .in-page-section-tabs .tab', '.non-branded .in-page-tab-section');

    // Show first layout example (rest are set to display none by default)
    if ($('.layouts-select').length) {
        var visible_layout = $('.layouts-select').val();
        $('.layout-example.' + visible_layout).addClass('show');
    }

    // Set first item on remaining accordions to be open by default
    var show_first_item = function (layout_accordion, accordion_item, accordion_parent) {
        // Hide all items
        $(layout_accordion + ' ' + accordion_item).each(function () {
            $(this).find('button').attr("aria-expanded", "true").addClass('collapsed');
            $(this).find('.collapse').removeClass('show');
        });

        // Show first item
        $(layout_accordion).each(function () {
            $(this).find(accordion_item).first().addClass('first');
        });
        $(layout_accordion + ' ' + accordion_item + '.first').find('button').attr("aria-expanded", "true").removeClass('collapsed');
        $(layout_accordion + ' ' + accordion_item + '.first').find('.collapse').addClass('show');
    };

    show_first_item('.layout-accordion', '.accordion-item', '.layout-example');

    // On layouts dropdown change show accordion that matches dropdown selection
    if ($('.layouts-select').length) {
        $('.layouts-select').on('change', function () {
            $('.layout-example').each(function () {
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
    $('.accordion-toggle').on('click', function () {
        var button_state = $(this).find('span').text();

        if (button_state === "Open all") {
            $(this).addClass('close');
            $(this).find('span').text('Close all');
            $('.accordion-item').each(function () {
                $(this).addClass('show');
            });
            $(this).next('.accordion').find('.accordion-item').each(function () {
                $(this).find('.collapse').addClass('show');
                $(this).find('button').attr("aria-expanded", "true").removeClass('collapsed');
            });
        } else {
            $(this).removeClass('close');
            $(this).find('span').text('Open all');
            $('.accordion-item').each(function () {
                $(this).removeClass('show');
            });
            $(this).next('.accordion').find('.accordion-item').each(function () {
                $(this).find('.collapse').removeClass('show');
                $(this).find('button').attr("aria-expanded", "false").addClass('collapsed');
            });
        }
    });

    // Check if all accordion items are opened or closed when one item is clicked.
    $('.accordion-button').on('click', function () {

        $(this).parents('.accordion-item').toggleClass('show');

        var open_items = 0,
            closed_items = 0,
            parent_accordion = $(this).parents('.accordion'),
            total_items = parent_accordion.find('.accordion-item').length,
            accordion_toggle = parent_accordion.prev('.accordion-toggle').find('span');

        parent_accordion.find('.accordion-item').each(function () {
            if ($(this).find('.accordion-button').hasClass('collapsed')) {
                closed_items = closed_items + 1;
            } else {
                open_items = open_items + 1;
            }
        });

        if (open_items === total_items) {
            accordion_toggle.text('Close all');

        } else if (closed_items === total_items) {
            accordion_toggle.text('Open all');
        }


    });

    // FORM EXAMPLES

    $('.form-example input').on('change', function () {
        if ($(this).val() == 'error') {
            $(this).parents('.form-element-wrapper').addClass('error');
        } else {
            $(this).parents('.form-element-wrapper').removeClass('error');
        }
    });

    $('.form-example select').on('change', function () {

        if ($(this).val() == 'error') {
            $(this).parents('.form-element-wrapper').addClass('error');
        } else {
            $(this).parents('.form-element-wrapper').removeClass('error');
        }
    });

    $('.error-checkbox').on('click', function () {
        if ($(this).is(":checked")) {
            $(this).parents('.form-element-wrapper').addClass('error');
        } else {
            $(this).parents('.form-element-wrapper').removeClass('error');
        }
    });
    $('.select-bubbles .multi-select').on('click', function(){
        $(this).toggleClass('selected');

        if ( $(this).hasClass('error-trigger') ) {
            $(this).parents('.select-bubbles').toggleClass('error');
        }
    });

    $('.form-element-wrapper .radio-button input').on('change', function () {
        var error_radio = $(this).parents('.form-element-wrapper').find('.error-radio');

        if (error_radio.is(":checked")) {
            $(this).parents('.form-element-wrapper').addClass('error');
        } else {
            $(this).parents('.form-element-wrapper').removeClass('error');
        }
    });


    // TEXTAREA COUNT 
    if ($('#textarea-example')) {
        var max_length = parseInt($('#textarea-example').attr('data-count'));
        $('#textarea-example').highlightWithinTextarea({
            highlight: [max_length, 200000]
        });
    }

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
    $('.copy-icon-example').on('click', function () {

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
        $('.copy-icon-example').each(function () {
            $(this).removeClass('copied').find('.button-text span').text('Copy code');
        });

        if (!$(this).hasClass('copied')) {
            $(this).addClass('copied').find('.button-text span').text('Copied');

        }
    });

    // COPY ILLUSTRATION CODE
    $('.copy-illustration').on('click', function () {

        // Get SVG
        var svgSrc = $(this).parents('.illustration').find("img").attr('src');

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
        $(this).addClass('copied').find('span').text('Copied');
        $('.copy-illustration').not(this).removeClass('copied').find('span').text('Copy svg code');

    });
    // OPEN CLOSE sitecore illustration details
    $('.sitecore-toggle').on('click', function () {
        $(this).toggleClass('open');
        $(this).parents('.sitecore-info-container').find('.sitecore-details').slideToggle();
    });


    // SEARCH INPUT EXAMPLE
    $(".bga-site-header .search-container input").on('focus', function () {
        $(this).addClass('in-focus');
    });

    $(".bga-site-header .search-container input").on('focusout', function () {
        $(this).removeClass('in-focus');
    });

    // Mobile search
    $('.bga-site-header .mobile-search').on('click', function () {
        $('.bga-site-header .navbar').slideUp();
        $('.bga-site-header .mobile-nav').removeClass('open');

        $('.bga-site-header #mobile-search').slideToggle();
        $(this).toggleClass('open');
    });


    // SITE NAV EXAMPLE
    // Level 1 open and close on desktop and mobile.
    $(".bga-site-header .level-1").on('click', function () {


        if (!$('.bga-site-header .mobile-nav').is(":visible")) {

            $('.submenu').each(function () {

                if ($(this).prev().hasClass('open')) {
                    $(this).slideUp();
                }
                else {
                    $(this).hide();
                }

            });

        } else {
            $('.submenu').each(function () {
                $(this).slideUp();
            });
        }


        if ($(this))
            if ($(this).hasClass('open')) {
                $(".bga-site-header .level-1").each(function () {
                    $(this).removeClass('open');

                });
            } else {
                $(".bga-site-header .level-1").each(function () {
                    $(this).removeClass('open');

                });

                $(this).addClass('open');
                $(this).next('.submenu').slideDown();
            }
    });

    // Mobile level 2 open and close. 
    $(".bga-site-header .level-2").on('click', function () {

        if ($(this).hasClass('open')) {
            $(".bga-site-header .level-2").each(function () {
                $(this).removeClass('open');
            });
        } else {
            $(".bga-site-header .level-2").each(function (e) {
                $(this).removeClass('open');
            });
            $(this).addClass('open');
            $(this).next('.submenu').slideDown();
        }

    });

    // Reset on breakpoint change
    $('#bga-site-header-group label:last-of-type, #nb-site-header-group label:last-of-type').on('click', function () {
        var parent = $('.tab-section');
        parent.find("#mobile-search").hide();
        parent.find('.mobile-search').removeClass('open');
        parent.find('.navbar').hide();
        parent.find('.mobile-nav').removeClass('open');
    });
    $('#bga-site-header-group label.bp-xs, #nb-site-header-group label.bp-xs').on('click', function () {
        var parent = $('.tab-section');
        parent.find("#mobile-search").hide();
        parent.find('.mobile-search').removeClass('open');
        parent.find('.navbar').hide();
        parent.find('.mobile-nav').removeClass('open');
    });
    $('#bga-site-header-group label.bp-md, #nb-site-header-group label.bp-md').on('click', function () {
        var parent = $('.tab-section');
        parent.find("#mobile-search").hide();
        parent.find('.mobile-search').removeClass('open');
        parent.find('.navbar').show();
    });
    $('#bga-site-header-group label.bp-lg, #nb-site-header-group label.bp-lg').on('click', function () {
        var parent = $('.tab-section');
        parent.find("#mobile-search").hide();
        parent.find ('.mobile-search').removeClass('open');
        parent.find('.navbar').show();
    });

    // Reset on branded / unbranded tab change {
    if ( $('#bga-site-header-group').length ) {
        
        $('.section-tabs tab').on('click', function(){
            console.log('clicked'); 
            $("#mobile-search").hide();
            $('.mobile-search').removeClass('open');
            $('.navbar').show();
        });

    };

    // Close nav on click outside  
    $(document).mouseup(function (e) {

        var container = $('.bga-site-header .nav');

        if (!container.is(e.target) && container.has(e.target).length === 0) {

            $('.bga-site-header .nav-dropdown').each(function () {
                $(this).removeClass('open');
            });
            $('.bga-site-header .level-1').each(function () {
                $(this).removeClass('open');
            });
            $('.submenu').each(function () {
                $(this).slideUp();
            });
        }
    });


    // Mobile navigation
    $('.bga-site-header .mobile-nav').on('click', function () {
        $('.bga-site-header #mobile-search').slideUp();
        $('.bga-site-header .mobile-search').removeClass('open');

        $('.bga-site-header .navbar').slideToggle();
        $(this).toggleClass('open');
    });

    $(window).resize(function () {
        if ($(window).width() >= 992) {
            $('.bga-site-header #mobile-search').hide();
            $('.bga-site-header .mobile-search').removeClass('open');
        }
    });


    // COMPONENT EXAMPLE: TABLES
    $('tr td:first-of-type').on('click', function () {

        // toggle class to show / hide child <td>
        var parent = $(this).parent().get(0);

        $(parent).children('td').toggleClass('showGroup');

        // toggle class on parent
        $(parent).toggleClass('groupParent');

    });

    // COMPONENT EXAMPLE: GRANT STATUS INDICATOR
    // Grant status indicator
    $('.time-zone select').on('change', function () {
        var new_timezone = $(this).val(),
            dates_times = $(this).parents('.dates-times-wrapper');

        $(this).blur();

        dates_times.find('.dates-times .show').removeClass('show');
        dates_times.find('.' + new_timezone).addClass('show highlight');

        setTimeout(function () {
            $('.highlight').removeClass('highlight');
        }, 400);
    });



    // COMPONENT EXAMPLE: CLAUSE / REGULATION BOXES
    var clause_boxes = {}
   
    $('.clause-box-input').each(function () {
       
        var clause = $(this).attr('id'),
        original_text = $('.' + clause).find('.component-text span').text();
        clause_boxes[clause] = original_text;
    });
    $('.clause-box-radios').each(function () {
        var clause = $(this).attr('id'),
            original_text = $('.' + clause).find('.component-text span').text();
            clause_boxes[clause] = original_text;
    });

    $('.clause-box-input').change(function () {

        var clause = $(this).attr('id'),
            original_text = clause_boxes[clause],
            added_text;

        // Text input
        if ($(this).attr('type') == "text") {
            added_text = $(this).val();

            if (added_text != "") {
                $('.' + clause).addClass('added highlight').find('.component-text span').text(added_text);

                setTimeout(function () {
                    $('.highlight').removeClass('highlight');
                }, 800);

            } else {
                $('.' + clause).removeClass('added').find('.component-text span').text(original_text);
            }

            // Checkbox
        } else if ($(this).attr('type') == "checkbox") {

            if ($(this).is(":checked")) {
                added_text = "3 month";
                $('.' + clause).addClass('added highlight').find('.component-text span').text(added_text);
                $('.' + clause).find('.tag span').text('Included');

                setTimeout(function () {
                    $('.highlight').removeClass('highlight');
                }, 800);
            } else {
                $('.' + clause).removeClass('added').find('.component-text span').text(original_text);
                $('.' + clause).find('.tag span').text('Optional to include');
            }

        }
    });

    $('.clause-box-radios input').on('click', function () {

        var clause = $(this).parents('.clause-box-radios').attr('id'),
            original_text = clause_boxes[clause],
            added_text;

        // Text input
        added_text = $(this).attr('data-value');

        if (added_text != "") {
            $('.' + clause).addClass('added highlight').find('.component-text span').text(added_text);

            setTimeout(function () {
                $('.highlight').removeClass('highlight');
            }, 800);

        } else {
            $('.' + clause).removeClass('added').find('.component-text span').text(original_text);
        }
    });


    // COMPONENT EXAMPLE: STEPPED NAVIGATION
    $('.stepped-nav-toggle').on('click', function () {
        $(this).toggleClass('open');
        $(this).parents('.stepped-navigation-wrapper').find('.stepped-navigation').slideToggle();
    });
    // Reset css display on breakpoint button click and reset
    $('#bga-stepped-navigation-bp-lg, #nb-stepped-navigation-bp-lg, #bga-stepped-navigation-bp-md, #nb-stepped-navigation-bp-md').on('click', function () {
        var parent = $(this).parents('.tab-section');
        parent.find('.stepped-nav-toggle').removeClass('open');
        parent.find('.stepped-navigation-wrapper').find('.stepped-navigation').css('display', 'flex');
    });
    $('#bga-stepped-navigation-bp-final, #nb-stepped-navigation-bp-final').on('click', function () {
        var parent = $(this).parents('.tab-section');
        parent.find('.stepped-nav-toggle').removeClass('open');
        parent.find('.stepped-navigation-wrapper').find('.stepped-navigation').css('display', 'none');
    });
    $(window).resize(function () {
        var window_width = window.innerWidth;
    
        if (window_width <= 768) {
            $('.stepped-nav-toggle').removeClass('open');
            $('.stepped-navigation-wrapper').find('.stepped-navigation').css('display', 'none');
        } else {
            $('.stepped-nav-toggle').removeClass('open');
            $('.stepped-navigation-wrapper').find('.stepped-navigation').css('display', 'flex');
        }
    });

    // COMPONENT EXAMPLE: TOAST
    $('#toast-trigger').on('click', function () {
        $('#inpage-toast').slideDown('slow');
    });
    $('#inpage-toast button').on('click', function () {
        $('#inpage-toast').css('display', 'none');
    });

    $('#cta-toast-trigger').on('click', function () {
        $('#inpage-cta-toast').slideDown('slow');
    });
    $('#inpage-cta-toast button').on('click', function () {
        $('#inpage-cta-toast').css('display', 'none');
    });


    // COMPONENT EXAMPLE: COOKIE NOTIFICATION
    $('#cookie-trigger').on('click', function () {
        $('#inpage-cookie').slideDown('slow');
    });
    $('#inpage-cookie .cookie-link').on('click', function () {
        $('#inpage-cookie').css('display', 'none');
    });


    // COMPONENT EXAMPLE: INFORMATION SIDEBAR
    // Set height of sidebars
    function sidebar_fullheight() {

        var full_text_height;
        
        $('.sidebar-wrapper.fullheight').each(function () {
            var question_height;
            
            if ($(window).width() > 768) {
                question_height = Math.round($(this).parents('.row').find('.question-section').height());
            } else {
                question_height = 300;
            }

            // Set sidebar height
            if ( $(this).hasClass('extended') ){
                $(this).css('height', '100%');
                var text_height = $('.extended').height();

            } else {
                 var text_height = question_height - 72;
                $(this).css('height', question_height + 'px');
            }
            
            // Set .component_text height
            $(this).find('.component-text').css('height', text_height + 'px');
            
            // Check if text box is in overflow. Set read more link accordingly
            if (!$(this).parents('.non-branded').length) {
                full_text_height = $(this).find('.component-text').prop('scrollHeight');  
            }
 
            if ( $(this).hasClass('extended') ){
                $(this).find('.component-text').addClass('fixed-height');
                $(this).find('.more-info-toggle').removeClass('hide');
                
            } else {
                if (full_text_height > text_height) {
                    $(this).find('.component-text').addClass('fixed-height');
                    $(this).find('.more-info-toggle').removeClass('hide');
                } else {
                    $(this).find('.component-text').removeClass('fixed-height');
                    $(this).find('.more-info-toggle').addClass('hide');
                }
            };


        });
    }
    sidebar_fullheight();

    // Read more toggle function
    $('.more-info-toggle').on('click', function () {
        $(this).parents('.sidebar-wrapper').toggleClass('extended');

        if ($(this).parents('.sidebar-wrapper').hasClass('extended')) {
            $(this).parents('.sidebar-wrapper').css('height', '100%');
            $(this).find('span').text('Read less');
        } else {
            $(this).find('span').text('Read more');
        }
    });

    $(window).resize(function () {
        sidebar_fullheight();
    });


    // COMPONENT EXAMPLE: EDIT ANSWERS COMPONENT
    $('.edit-answers-toggle').on('click', function () {
        $(this).toggleClass('open');
        $(this).parents('.edit-answers-component').find('.component-content').slideToggle();
    });


    // COMPONENT EXAMPLE: MODALS

    // Function to detect if scrollable section is overflowing            
    var detect_overflowing = function (parent_elem, scrollable_name) {
        var scroll_height = parent_elem.find(scrollable_name)[0].scrollHeight;
        var container_height = parent_elem.find(scrollable_name)[0].offsetHeight;

        if (container_height < scroll_height) {
            parent_elem.removeClass('no-scroll');
        } else {
            parent_elem.addClass('no-scroll');
        }
    };

    // Function to set max-height of scrollable area
    var scroll_max_height = function(parent_elem, bottom_elem, scrollable_elem){
        var mobile_filter_height = $(parent_elem).height(),
        filter_bottom_height = $(bottom_elem).height() - 16,
        scroll_container_height = mobile_filter_height - filter_bottom_height;

        $(scrollable_elem).css('max-height', scroll_container_height);
    };


    //Grants shortlist scrollable area
    if ($('.modal-shortlist')) {
        $('.modal-shortlist').each(function () {
            // Add shortlist item count to counter
            var shortlist_count = $(this).find('.shortlist-item').length;
            $(this).find('.counter').text(shortlist_count);

            // Set class for scrollable appearance
            detect_overflowing($(this), ".scrollable");
        });

        // remove shortlist items on click
        $('.modal-shortlist .remove-btn').on('click', function () {
            $(this).parents('.shortlist-item').hide();
            var counter = $(this).parents('.modal-shortlist').find('.counter'),
                count = $(this).parents('.modal-shortlist').find('.shortlist-item:visible').length;
            counter.text(count);

            if (counter.text() == "0") {
                $(this).parents('.modal-shortlist').find('.no-shortlist').removeClass('hidden');
            }

            // Set class for scrollable appearance
            detect_overflowing($(this).parents('.modal-shortlist'), ".scrollable");
        });
    }
    
    // On scroll detect if content is at top or bottom of container and add classes accordingly.
    $(".modal-example .scrollable").on("scroll", function () {

        var scroll_wrapper = $(this).parents('.scroll-wrapper'),
            scroll_position = $(this).scrollTop(),
            scroll_height = $(this)[0].scrollHeight,
            container_height = $(this).innerHeight(),
            scroll_done = scroll_height - container_height;

        if (scroll_position === 0) {
            scroll_wrapper.removeClass('scrolling');
        } else if (scroll_position === scroll_done) {
            scroll_wrapper.addClass("scroll-done");
            scroll_wrapper.removeClass('scrolling');
        } else {
            scroll_wrapper.removeClass("scroll-done");
            scroll_wrapper.addClass('scrolling');
        }

    });

    // On smaller screen sizes set modal scrollable height to fit with the form toggle.
    mobile_modal_display = function () {
        if ($(window).width() < 768) {
            $('.modal-form').each(function () {
                var modal_height = $(this).outerHeight(),
                    top_section_height = $(this).find('.title-area').outerHeight() + 24, //bottom margin
                    toggle_height = $(this).find('.mobile-form-toggle').outerHeight(),
                    scrollable_height = modal_height - top_section_height - toggle_height - 32 - 24; //top and bottom padding 

                $(this).find('.scrollable').css('max-height', scrollable_height + 'px');

            });
        } else if ($(window).width() >= 768) {
            $('.modal-form').each(function () {
                //$(this).find('.modal-shortlist .scrollable, .print-group .scrollable').css('max-height', '428px');
                $(this).find('.email-form').removeClass('open').find('form').css('display', 'block');
            });
        }
    }
    mobile_modal_display();
    scroll_max_height('#showing-filters-modal', '.bottom-content', '.scrollable');

    $(window).resize(function () {
        mobile_modal_display();
        scroll_max_height('#showing-filters-modal', '.bottom-content', '.scrollable');
    }); 
    

     



    // GET CONTRACT MODALS
    // Open & close modals
    
    $('.modal-trigger').on('click', function () {
        var modal = $(this).attr('data-modal');
        var id= "bga";
            if (modal.includes('ecb')) {
                id='ecb'
            } else if (modal.includes('nb')) {
                id='nb'
            } 
        $('#' + modal).addClass('show');
        $('.modal-overlay').addClass('show');

        if ( modal.includes('modal-email') ) { 

            $('#step-email-address').addClass('show');
            $('#step-verify-email, #step-email-success, .success-icon').removeClass('show'); 
            $('#step-verify-email input').each(function(){
                $(this).val('');
            });

        } else if ( modal.includes('modal-download') ) {
            console.log('download');
            $('#step-download-generate').addClass('show');
            $('#step-success-animation').removeClass('show');
            $('#' + id + '-modal-download .close').addClass('hide');
            $('#' + id + '-modal-download .download-msg').addClass('hide');

            setTimeout(function () {
                $('#step-download-generate[data-id=' + id + ']').removeClass('show');
                $('#step-success-animation[data-id=' + id + ']').addClass('show');
            }, 2000);
            
            setTimeout(function () {
                $('#' + id + '-modal-download .hide').each(function(){
                    $(this).removeClass('hide');
                });
            }, 4000);
        }
    });

    $('.modal-example .close, #ecb-prototype .modal-example .cancel').on('click', function () {
        $(this).parents('.modal-example').removeClass('show');
        $('.modal-overlay').removeClass('show');
    });

    // Stop forms in email modal from reloading the page
    $("#email-form, #verify-form").submit(function (e) {
        e.preventDefault();
    });

    // Show hide content within email modal
    $('#step-email-address .progress-step').on('click', function () {
        var id = $(this).parents('.step').attr('data-id'),
        email_address = $('#step-email-address[data-id=' + id + '] input').val();
        
        $('#step-email-address[data-id=' + id + ']').removeClass('show');
        $('#step-verify-email[data-id=' + id + ']').addClass('show');
        if ( email_address.length ) {
            $('#step-verify-email[data-id=' + id + '] .user-email').text(email_address);
        } 
    });

    // Verify email code. THANK YOU - https://codepen.io/RobertAron/pen/gOLLXLo 
    var inputElements = [...document.querySelectorAll('input.code-input')]

    inputElements.forEach((ele, index) => {
        ele.addEventListener('keydown', (e) => {
            // if the keycode is backspace & the current field is empty
            // focus the input before the current. Then the event happens
            // which will clear the "before" input box.
            if (e.keyCode === 8 && e.target.value === '') inputElements[Math.max(0, index - 1)].focus();
        })
        ele.addEventListener('input', (e) => {
            // take the first character of the input
            // this actually breaks if you input an emoji
            // but I'm willing to overlook insane security code practices.
            var [first, ...rest] = e.target.value;
            e.target.value = first ?? '' // first will be undefined when backspace was entered, so set the input to ""
            var lastInputBox = index === inputElements.length - 1;
            var didInsertContent = first !== undefined;
            if (didInsertContent && !lastInputBox) {
                // continue to input the rest of the string
                inputElements[index + 1].focus();
                inputElements[index + 1].value = rest.join('');
                inputElements[index + 1].dispatchEvent(new Event('input'));
            }
        })
    })

    $('#step-verify-email #verify-btn').on('click', function(){
        var code = inputElements.map(({ value }) => value).join(''),
        id = $(this).parents('.step').attr('data-id');

        if (code == '1234' ) {
            $('#verify-form[data-id=' + id + '] .number-code').removeClass('error');
            $('#step-verify-email[data-id=' + id + '] .loading-animation').addClass('show');
            $(this).prop('disabled', true).addClass('disabled');
            
           setTimeout(function () {
               
                $('#step-verify-email[data-id=' + id + '] .loading-animation').removeClass('show');
                $('#step-verify-email[data-id=' + id + '] .success-icon').addClass('show');
                $('#step-verify-email[data-id=' + id + '] .success-icon .msg').fadeIn( 2000 );
                
            }, 1000);

           setTimeout(function () {
                $('#step-verify-email[data-id=' + id + '] .success-icon .msg').hide();
                $('#step-verify-email[data-id=' + id + '] .success-icon').removeClass('show');
                $('#step-verify-email[data-id=' + id + '] .loading-animation').addClass('show');
            }, 4000);

            setTimeout(function () {
                $('#step-verify-email[data-id=' + id + ']').removeClass('show');
                $('#step-email-success[data-id=' + id + ']').addClass('show');
                
            }, 6000);

        } else {
            $('#verify-form[data-id=' + id + '] .number-code').addClass('error');
        }

    });

    $('.resend a').on('click', function(){
        $(this).text('Code sent').addClass('sent');

        setTimeout(function () {
            $('.resend a').text('Resend code again').removeClass('sent');
        }, 3000);
    });


    // Close modal and scroll page on download / email success
    $('.success-scroll').on('click', function () {
        $(this).parents('.modal-example').removeClass('show');
        $('.modal-overlay').removeClass('show');

        if ($("html").hasClass('ecb-prototype')) {
            setTimeout(function () {

                var window_width = window.innerWidth,
                    anchor = $("#next-steps"),
                    extra_padding;

                if (window_width <= 768) {
                    extra_padding = 60;
                } else {
                    extra_padding = 125;
                }

                $('html,body').animate({ scrollTop: anchor.offset().top - extra_padding }, 'fast');
            }, 200);
        }

    });
    

    $('#bga-modal-bp-md, #nb-modal-bp-md').on('click', function () {
        mobile_modal_display();

        if ($(this).parents('.tab-section.bga-branded').length) {
            $('.bga-branded .modal-form .email-form').each(function () {
                $(this).removeClass('open').find('form').css('display', 'block');
            });
        }
        else if ($(this).parents('.tab-section.non-branded').length) {
            $('.non-branded .modal-form .email-form').each(function () {
                $(this).removeClass('open').find('form').css('display', 'block');
            });
        }
    });
    $('#bga-modal-bp-final, #nb-modal-bp-final').on('click', function () {
        mobile_modal_display();

        if ($(this).parents('.tab-section.bga-branded').length) {
            $('.bga-branded .modal-form .email-form').each(function () {
                $(this).removeClass('open').find('form').slideUp();
            });
        } else if ($(this).parents('.tab-section.non-branded').length) {
            $('.non-branded .modal-form .email-form').each(function () {
                $(this).removeClass('open').find('form').slideUp();
            });
        }
    });


    //Toggle modal form on mobile screens
    $('.mobile-form-toggle').on('click', function () {
        $(this).parents('.email-form').toggleClass('open').find('form').slideToggle();
    });

    //Checklist modal copy link
    $('.modal-example .copy-link').on('click', function () {
        $(this).addClass('copied');
    });


    //COMPONENT EXAMPLE: ADVISER MAP TILES
    $('.map .adviser-marker').on('click', function(){
        $(this).parents('.marker-wrapper').find('.adviser-tile').addClass('show');
    });
    $('.adviser-tile .close').on('click', function(){
        $(this).parents('.marker-wrapper').find('.adviser-tile').removeClass('show');
    });
    if ( $('.map .adviser-tile').length) {
        detect_overflowing($('.map .search-tile'), ".scrollable");
    }
    $(window).resize(function () {
        if ( $('.map .adviser-tile').length) {
            detect_overflowing($('.map .search-tile'), ".scrollable");
        }
    }); 


    // COMPONENT EXAMPLE: ANCHOR MENU
    $('.anchor-menu.example li a').on('click', function () {
        $('.anchor-menu.example li a').each(function () {
            $(this).removeClass('current');
        });
        $(this).addClass('current');
    });


    // COMPONENT EXAMPLE: PAGINATION

    $('.pagination-links li.number').on('click', function () {
        $('.pagination-links li.current').removeClass('current');
        $(this).addClass('current');

    });


    // COMPONENT EXAMPLE: GRANTS SEARCH TILE 
    $('.search-tile .apply-btn').on('click', function () {
        $(this).parents('.apply-details').toggleClass('open').find('.apply-details-content').slideToggle();

    });
    $('.shortlist-btn').on('click', function () {
        $(this).toggleClass('added');

        if ($(this).hasClass('added')) {
            $(this).text('Remove from shortlist');
        } else {
            $(this).text('Add to shortlist');
        }
    });

    // COMPONENT EXAMPLE: RSP TILE 
    $('.search-tile .codes-btn').on('click', function () {
        $(this).parents('.codes').toggleClass('open').find('.codes-content').slideToggle();
    });
   

    // COMPONENT EXAMPLE: EVENTS SEARCH TILE
    $('.events-tile .read-more-btn').on('click', function () {
        var parent_section = $(this).parents('.event-details');
        if (parent_section.hasClass('open')) {
            parent_section.removeClass('open');
            parent_section.find('.read-more-content').slideUp();
            $(this).find('span').text('Read more');
        } else {
            parent_section.addClass('open');
            parent_section.find('.read-more-content').slideDown();
            $(this).find('span').text('Read less');
        }
    });
    $('.events-tile .close-btn').on('click', function () {
        var parent_section = $(this).parents('.event-details');
        parent_section.removeClass('open');
        parent_section.find('.read-more-content').slideUp();
        parent_section.find('span').text('Read more');
    });


    // COMPONENT EXAMPLE: CHAT BUTTON

    $('.tooltip-click').on('click', function () {
        $(this).prev('.tooltip').toggleClass("show");
    });
    //close tooltip
    $('.tooltip .close').on('click', function () {
        $(this).parents('.tooltip').removeClass('show');
    });

    // TOOLTIP - HOVER
    //Hover only example (tooltip page)
    $('.tooltip-hover').hover(
        function () {
            $(this).prev('.tooltip').addClass("show");
        },
        function () {
            $(this).prev('.tooltip').removeClass("show");
        }
    );


    // COMPONENT EXAMPLE: PRINT SHARE UTILITIES
    $('.share-popover').on('click', function () {
        $(this).next('.share-container').toggleClass('show');
    });

    // CONTEXTUAL HELP {
    $('.complex-question').on('click', function () {
        $('.complex-answer').slideToggle();
        $(this).parents('.complex').toggleClass('open');
    });



    // COMPONENT EXAMPLE: Datepicker

    $('#datepicker .input-group.date').datepicker({
        format: "dd/mm/yyyy",
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        container: '#datepicker-container',
        orientation: "bottom left"
    }).on('hide', function (e) {
        $(this).parents('#datepicker-container').removeClass('open');
    }).on('show', function (e) {
        $(this).parents('#datepicker-container').addClass('open');
    });

    $('.close-button').unbind();

    $('.close-button').click(function () {
        if ($('.datepicker').is(":visible")) {
            $('.date').datepicker('hide');
        } else {
            $('.date').datepicker('show');
        }
    });



    // COMPONENT EXAMPLE: FILTERS
    $('.filter-item-title').on('click', function () {

        $(this).parents('.filter-item').toggleClass('open').find('.filter-item-content').slideToggle();

        $('.filter-item-title').not(this).parents('.filter-item').removeClass('open').find('.filter-item-content').slideUp();

         // RSP example - mobile scrollable height
         if ( $('#showing-filters-modal.modal-example').length ) {
            setTimeout(function () {
                detect_overflowing($('#showing-filters-modal'), ".scrollable");
            }, 400);  
        }
    });
    // Add modal id to filter page example of dynamic checkboxes.
    $('#bga-filters-bp-final').on('click', function(){
        $('.filters-wrapper.dynamic').attr('id', 'showing-filters-modal');
        $('.filter-group-title').removeClass('show');
        $('.mobile-counter').text('').removeClass('not-empty');
        
        $('.filters.checkboxes-dynamic .checkbox-item input:checked').prop("checked", false); 
       
        $('.single-select-dynamic').find('select').val('select-option');   
        $('.filter-item-content').removeClass('show'); 
        $('.single-select-dynamic').removeClass('open');
    });
    $('#bga-filters-bp-md').on('click', function(){
        $('.filters-wrapper.dynamic').removeAttr('id');
    });
    // Open / close parent accordion of dynamic filter on mobile only.
    $( "body" ).on( "click", "#showing-filters-modal .single-select-dynamic .filter-item label", function() {
        $(this).parents('.single-select-dynamic').toggleClass('open').find('.single-select-dynamic select').slideToggle();

        if ( !$(this).parents('.single-select-dynamic').hasClass('open')) {
            $('.filter-item-content').removeClass('show');
            $(this).parents('.single-select-dynamic').find('select').val('select-option');
            
            $('.filter-group-title').each(function(){
                var counter = $(this).find('.mobile-counter');             
                if (!counter.hasClass('not-empty')) {
                    $(this).removeClass('show');
                }
            });
        };
    });
   
    // filter bubbles
    $('.active-filters li').on('click', function () {
        var item_value = $(this).attr('data-value')
        item_parent = $(this).parents('ul').attr('data-filter-group'),
            counter = parseInt($(this).parents('.filter-item').find('.mobile-counter').text());
        counter--;

        if (counter != 0) {
            $(this).parents('.filter-item').find('.mobile-counter').text(String(counter));
        } else {
            $(this).parents('.filter-item').find('.mobile-counter').text('').removeClass('not-empty');
        }

        //checkboxes
        $('#' + item_value).prop("checked", false);
        $(this).removeClass('selected');

         // Remove dynamic filter group title
         if ( !$('.checkboxes-dynamic #' + item_parent + ' input' ).is(":checked") ) {
            console.log('childless');
            if ( $('.filters.single-select-dynamic select').val() != item_parent ) {
                $('.filter-group-title.' + item_parent).removeClass('show');
            } 
        };

        //single-select
        if ($(this).parents('.filters').hasClass('single-select')) {
            $(this).parents('.filters').find('select').val('select-option');
        }

        // Toggle switch
        if ($(this).parents('.filters').hasClass('toggle-switch')) {
            
            $('#' + item_value).prop("checked", false);
            $(this).parents('.toggle-switch').removeClass('selected');
        }

       
    });

    // checkboxes & bubbles (secondary)
    $('.checkboxes-secondary input').on('click', function () {
        var item_value = $(this).attr('id'),
            counter = parseInt($(this).parents('.filter-item').find('.mobile-counter').text());
        if (isNaN(counter)) {
            counter = 0;
        }

        if ($(this).is(":checked")) {
            $('li[data-value="' + item_value + '"]').addClass('selected');
            counter++;
            $(this).parents('.filter-item').find('.mobile-counter').text(String(counter)).addClass('not-empty');
           

        } else {
            $('li[data-value="' + item_value + '"]').removeClass('selected');
            counter--;

            if (counter != 0) {
                $(this).parents('.filter-item').find('.mobile-counter').text(String(counter)).addClass('not-empty');
            } else {
                $(this).parents('.filter-item').find('.mobile-counter').text('').removeClass('not-empty');
            }
        }
    });

    // checkboxes & bubbles (dynamic)
    $('.checkboxes-dynamic input').on('click', function () {
        var item_value = $(this).attr('id'),
            item_parent = $(this).parents('.filter-item-content').attr('id'),
            item_title = '.filter-group-title.' + item_parent,
            counter = parseInt($(item_title + ' .mobile-counter').text());
            
        if (isNaN(counter)) {
            counter = 0;
        }
        if ($(this).is(":checked")) {
            $('li[data-value="' + item_value + '"]').addClass('selected');
            counter++;
            $('#showing-filters-modal ' + item_title + ' .mobile-counter').text(String(counter)).addClass('not-empty');
            $('#showing-filters-modal ' + item_title).addClass('show');
        
        } else {
            $('li[data-value="' + item_value + '"]').removeClass('selected');
            counter--;

            if (counter != 0) {
                $('#showing-filters-modal ' + item_title + ' .mobile-counter').text(String(counter)).addClass('not-empty');
            } else {
                $('#showing-filters-modal ' + item_title + ' .mobile-counter').text('').removeClass('not-empty');
            }
        }

        // RSP modal example - mobile scrollable height
        if ( $('#showing-filters-modal.modal-example').length ) {
            setTimeout(function () {
                detect_overflowing($('#showing-filters-modal'), ".scrollable");
            }, 400);
        }
    });


    // dropdowns (single select)
    $('.filters.single-select select').on('change', function () {
        var item_value = $(this).val();

        $(this).parents('.filter-item').find('.active-filters li').each(function () {
            $(this).removeClass('selected');
            $(this).parents('.filter-item').find('.mobile-counter').text('').removeClass('not-empty');
        });

        if (item_value !== 'select-option') {
            $('li[data-value="' + item_value + '"]').addClass('selected');
            $(this).parents('.filter-item').find('.mobile-counter').text('1').addClass('not-empty');
        }
    });

    // dropdowns (dynamic)
    $('.filters.single-select-dynamic select').on('change', function(){
        var item_value = $(this).val(),
        item_parent = $(this).parents('.filter-item').attr('id');

        // Desktop filters
        $( ".filters-wrapper .active-filters .visible-filters" ).append( $('.filters-wrapper .filter-group.' + item_value) );

        //Mobile filters
        $( "#showing-filters-modal .active-filters .visible-filters" ).append( $('#showing-filters-modal .filter-group.' + item_value) );

        //Desktop and mobile
        $('.filter-group-title.' + item_value).addClass('show');
        //$('.filters-wrapper .filter-group-title.' + item_value).addClass('show');
        
        $('.filter-item-content.' + item_parent).removeClass('show');
        $('.filter-item-content#' + item_value).addClass('show');

        
        $('.filters-wrapper .filter-group-title.show').each(function(){
            var group = $(this).attr('data-filter-group');

            // Remove dynamic filter group title
            if ( !$('.filters-wrapper .checkboxes-dynamic #' + group + ' input' ).is(":checked")) {

                if ( $('.filters-wrapper .filters.single-select-dynamic select').val() != group ) {
                    $('.filters-wrapper .filter-group-title.' + group).removeClass('show');
                } 
            };
            
        });
       
        $('#showing-filters-modal .filter-group-title.show').each(function(){
            var group = $(this).attr('data-filter-group');

            // Remove dynamic filter group title
            if ( !$('#showing-filters-modal .checkboxes-dynamic #' + group + ' input' ).is(":checked")) {

                if ( $('#showing-filters-modal .filters.single-select-dynamic select').val() != group ) {
                    $('#showing-filters-modal .filter-group-title.' + group).removeClass('show');
                } 
            };
            
        });

     
         // RSP example - mobile scrollable height
         if ( $('#showing-filters-modal.modal-example').length ) {
            setTimeout(function () {
                detect_overflowing($('#showing-filters-modal'), ".scrollable");
            }, 400);
        }

    });

    // toggle switch
    $('.filters.toggle-switch input').on('click', function () {
        var item_value = $(this).attr('id'),
        parent = $(this).parents('.toggle-switch');

       parent.toggleClass('selected');

        if ($(this).is(":checked")) {
            parent.find('li[data-value="' + item_value + '"]').addClass('selected');
            parent.find('.filter-item').find('.mobile-counter').text('1').addClass('not-empty');
        } else {
            parent.find('li[data-value="' + item_value + '"]').removeClass('selected');
            parent.find('.filter-item').find('.mobile-counter').text('').removeClass('not-empty');
        }
    });


    // COMPONENT EXAMPLE: VIDEO & AUDIO PLAYER
    $('.media-player-transcript-toggle button').on('click', function () {
        var parent = $(this).parents('.media-player'),
            transcript = parent.find('.media-player-transcript'),
            transcript_toggle = parent.find('.media-player-transcript-toggle');

        if (transcript.hasClass('open')) {
            transcript.removeClass('open');
            transcript_toggle.find('span').text('Open Transcript');
            transcript_toggle.find('.iconAnimateWrapper svg').removeClass('open');
        } else {
            transcript.addClass('open');
            transcript_toggle.find('span').text('Close Transcript');
            transcript_toggle.find('.iconAnimateWrapper svg').addClass('open');
        }
    });


    // COMPONENT EXAMPLE: GUIDED SEARCH
    // toggle switch
    $('.guided-search-wrapper .toggle input').on('click', function () {
        var item_value = $(this).attr('id');
        $(this).parents('.toggle').toggleClass('selected');
    });
    // Multi-select bubbles
    $('.multi-select-wrapper .multi-select').on('click', function () {
        $(this).toggleClass('selected');
    });



    // COMPONENT EXAMPLE: CHECKLISTS

    // Lightweight checklist open all toggle
    $('.checklist-toggle').on('click', function () {
        var button_state = $(this).find('span').text();

        if (button_state === "Open all") {
            $(this).addClass('close');
            $(this).find('span').text('Close all');

            $('.checklist-item').each(function () {
                $(this).addClass('open');
            });
            $('.checklist-sub-item-wrapper').each(function () {
                $(this).slideDown(400);
            });


        } else {
            $(this).removeClass('close');
            $(this).find('span').text('Open all');

            $('.checklist-item').each(function () {
                $(this).removeClass('open');
            });
            $('.checklist-sub-item-wrapper').each(function () {
                $(this).slideUp(400);
            });

        }
    });

    // Open & close checklist items 
    $(".checklist-item-title").on("click", function () {
        $(this).next('.checklist-sub-item-wrapper').slideToggle(400);

        if ($(this).closest('.checklist-item').hasClass('open')) {

            $(this).closest('.checklist-item').removeClass('open');


            // Close sub-items when close step
            if ($(this).closest('.checklist-item').find('.checklist-sub-item').hasClass('open')) {

                $(this).closest('.checklist-item').find('.checklist-sub-item.open').find('.content-wrapper').slideToggle(400);
                $(this).closest('.checklist-item').find('.checklist-sub-item').removeClass('open');
            }

        } else {
            $(this).closest('.checklist-item').addClass('open');
        }

        if ($('.checklist-item.open').length == $('.checklist-item').length) {
            $('.checklist-toggle span').text('Close all');
            $('.checklist-toggle').addClass('close');
        }
        if ($('.checklist-item.open').length == 0) {
            $('.checklist-toggle span').text('Open all');
            $('.checklist-toggle').removeClass('close');
        }

    });

    // Close checklist step button
    $(' .checklist-close-step').on('click', function () {
        $(this).parents('.checklist-sub-item-wrapper').hide();
        $(this).parents('.checklist-item').removeClass('open');
    });


    // Open & close sub-checklist items
    $(".checklist-sub-item-title").on("click", function () {

        $(this).next('.content-wrapper').slideToggle(400);

        if ($(this).closest('.checklist-sub-item').hasClass('open')) {
            $(this).closest('.checklist-sub-item').removeClass('open');
        } else {
            $(this).closest('.checklist-sub-item').addClass('open');
        }

    });
    // Checkbox functionality
    $('.checklist-item-checkbox').on('click', function () {
        if ($(this).parents('.checklist-sub-item.must-do').hasClass('done')) {
            $(this).parents('.checklist-sub-item.must-do').removeClass('done');
        } else {
            $(this).parents('.checklist-sub-item.must-do').addClass('done');
        }

        $(this).parents('.checklist-item').find('.checklist-sub-item.must-do').each(function () {

            var item_completion = false;
            if ($(this).hasClass('done')) {
                item_completion = true;
            } else {
                item_completion = false;
                $(this).parents('.checklist-item').removeClass('item-done');
                return false;
            }
            if (item_completion === true) {
                $(this).parents('.checklist-item').addClass('item-done');
            }

        });
    });

    // Open & close lightweight checklist items
    //Close functionality 
    $('.lightweight .close-item btn').on('click', function () {
        // Scroll and close
        var parent_item = $(this).parents('.checklist-item');

        parent_item.removeClass('open');
        var parent_position = parent_item.position();
        $("html").animate({
            scrollTop: $(parent_item).offset().top
        },
            400 //speed
        );

        var content = $(this).parents('.checklist-sub-item-wrapper');
        setTimeout(function () {
            content.slideUp(1000);
        }, 400);
    });


    //COMPONENT EXAMPLE: In page feedback form
    var feedback_step1 = function(target_elem, parent_elem){
        var answer = target_elem.text(),
        parent = target_elem.parents(parent_elem);
        console.log(answer);
        console.log(parent);

        if (answer == 'Yes') {
            parent.find('.initial-question').removeClass('show');
            parent.find('.yes-answer').addClass('show');
            parent.find('.no-answer').removeClass('show');
            parent.find('.bga-btn.no').removeClass('selected');
        } else if (answer == 'No') {
            
            parent.find('.no-answer').addClass('show');
            parent.find('.yes-answer').removeClass('show');
            parent.find('.bga-btn.no').addClass('selected');
        }
    };
    $('#feedback-example .initial-question .bga-btn').on('click', function () {
        feedback_step1($(this).find('span'), "#feedback-example");
    });
    $('#nb-feedback-example .initial-question .bga-btn').on('click', function () {
        feedback_step1($(this).find('span'), "#nb-feedback-example");
    });

    var feedback_step2 = function(target_elem, parent_elem) {
        var parent = target_elem.parents(parent_elem);

        if (target_elem.hasClass('other')) {
            if (target_elem.is(":checked")) {
                parent.find('.textarea-container').addClass('show');
            } else {
                parent.find('.textarea-container').removeClass('show');
            }
        }
    };
    $('#feedback-example .no-answer .checkbox').on('click', function () {
        feedback_step2($(this), "#feedback-example");
    });
    $('#nb-feedback-example .no-answer .checkbox').on('click', function () {
        feedback_step2($(this), "#nb-feedback-example");
    });

    var feedback_step3 = function(target_elem, parent_elem) {
        var parent = target_elem.parents(parent_elem);
        
        parent.find('.initial-question').removeClass('show');
        parent.find('.no-answer').removeClass('show');
        parent.find('.thank-you-container').addClass('show');
    };
    $('#feedback-example .no-answer .bga-btn').on('click', function () {
        feedback_step3($(this), "#feedback-example");
    });
    $('#nb-feedback-example .no-answer .bga-btn').on('click', function () {
        feedback_step3($(this), "#nb-feedback-example");
    });

    // COMPONENT EXAMPLE: Showing number sticky header
    if ($('.showing-header-wrapper').length) {
        
        var window_width = window.innerWidth,
        sticky_position = $('.showing-header-wrapper').offset();

        $(window).scroll(function () {
            if ($(window).scrollTop() > sticky_position.top) {
                $('.showing-header-wrapper').addClass('fixed');
                $('.showing-page-content').addClass('fixed');
            } else {
                $('.showing-header-wrapper').removeClass('fixed');
                $('.showing-page-content').removeClass('fixed');
            }
        });

    };


    // COMPONENT EXAMPLE: global pathway to services
    $('button.service-links-trigger').on('click', function(){
        $('.service-links-wrapper').slideToggle();
        $(this).toggleClass('open');
    });
   


}); //End doc ready
