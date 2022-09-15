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

    $('.filter-item').on('click', function () {

        //Clear filter classes from nav-tiles.
        reset_nav_tiles();

        $('#component_name').val('');

        var filter_states = [];
        var filter_option = $(this).find('input').attr('id');

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


    });



    // SEARCH COMPONENTS BY NAME
    var components_list = ['bga-hero-pathway-list', 'bga-standard-pathway-list', 'bga-light-pathway-list', 'bga-feature-image-pathway', 'bga-image-pathway-list', 'bga-inline-pathway-list', 'bga-page-headers', 'bga-call-to-action', 'bga-call-out-box', 'bga-contact-us-call-out-box', 'bga-event-registration-call-out-box', 'bga-call-out-link', 'bga-feature-box', 'bga-accordion', 'bga-mini-list', 'bga-table', 'bga-image', 'bga-video-player', 'bga-audio-player', 'bga-download-list', 'bga-grant-status-indicator', 'bga-pull-quote', 'bga-notifications', 'bga-modal-dialog', 'bga-disclaimer-alerts', 'bga-global-alert', 'bga-site-header', 'bga-site-footer', 'bga-anchor-menu', 'bga-breacdrumbs', 'bga-pagination', 'bga-print-and-share-utilities', 'bga-chat-button', 'bga-in-page-feedback', 'bga-subscribe', 'bga-subsite-header', 'bga-subsite-footer', 'bga-guided-search', 'bga-stepped-navigation', 'bga-progress-bar', 'bga-save-your-progress-sidebar', 'bga-information-sidebar', 'bga-tool-start-component', 'bga-global-search-result-tiles', 'bga-finder-tool-result-tiles', 'bga-toast-notification', 'bga-form-field-group', 'bga-tool-results', 'bga-clause-regulation-box', 'bga-breadcrumbs', 'bga-tile-filters'];

    $('#component_name').on('change', function () {

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


    });


    // Clear filters on components page
    $('.reset-filters').on('click', function () {

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
    });



    // ANCHOR MENU 
    if ($('.in-page #anchor-menu').length) {

        //Create object containing 
        var sections = {};
        $('.in-page #anchor-menu li a').each(function () {

            if ($(this).attr('href')) {
                var anchor_link = $(this).attr('href');
                var section_position = $(anchor_link).position();
                sections[anchor_link] = Math.round(section_position.top);
            }
        });

        // Stickiness
        var make_sticky = function () {
            var menu_position = Math.round($('.anchor-menu-wrapper').position().top);
            var menu_width = $('.anchor-menu-wrapper').width();
            var menu_height = $('.in-page.anchor-menu').height();
            var footer_height = $('#footer').height();
            var unfix = $(document).height() - footer_height - menu_height;

            $('in-page.anchor-menu').css('width', menu_width);

            if ($(window).width() >= 992) {

                $(window).scroll(function () {
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


    // COMPONENTS PAGE - LAYOUT EXAMPLES

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

    $('.form-element-wrapper .radio-button input').on('change', function () {
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
            $(".bga-site-header .level-2").each(function () {
                $(this).removeClass('open');
            });
            $(this).addClass('open');
            $(this).next('.submenu').slideDown();
        }

    });

    // Reset on breakpoint change
    $('#bga-site-header-group label:last-of-type').on('click', function () {
        $("#mobile-search").hide();
        $('.mobile-search').removeClass('open');
        $('.navbar').hide();
        $('.mobile-nav').removeClass('open');
    });
    $('#bga-site-header-group label.bp-xs').on('click', function () {
        $("#mobile-search").hide();
        $('.mobile-search').removeClass('open');
        $('.navbar').hide();
        $('.mobile-nav').removeClass('open');
    });
    $('#bga-site-header-group label.bp-md').on('click', function () {
        $("#mobile-search").hide();
        $('.mobile-search').removeClass('open');
        $('.navbar').show();
    });
    $('#bga-site-header-group label.bp-lg').on('click', function () {
        $("#mobile-search").hide();
        $('.mobile-search').removeClass('open');
        $('.navbar').show();
    });

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

    // COMPONENT EXAMPLE: STEPPED NAVIGATION
    $('.stepped-nav-toggle').on('click', function () {
        $(this).toggleClass('open');
        $(this).parents('.stepped-navigation-wrapper').find('.stepped-navigation').slideToggle();
    });
    // Reset css display on breakpoint button click and res
    $('#stepped-navigation-bp-md').on('click', function () {
        $('.stepped-nav-toggle').removeClass('open');
        $('.stepped-navigation-wrapper').find('.stepped-navigation').css('display', 'flex');
    });
    $('#stepped-navigation-bp-final').on('click', function () {
        $('.stepped-nav-toggle').removeClass('open');
        $('.stepped-navigation-wrapper').find('.stepped-navigation').css('display', 'none');
    });
    $(window).resize(function () {
        if ($(window).width() < 768) {
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
        console.log('pop');
        $('#inpage-cta-toast').slideDown('slow');
    });
    $('#inpage-cta-toast button').on('click', function () {
        $('#inpage-cta-toast').css('display', 'none');
    });

    // COMPONENT EXAMPLE: INFORMATION SIDEBAR
    // Set height of sidebars
    function sidebar_fullheight() {


        $('.sidebar-wrapper.fullheight').each(function () {
            var question_height;

            if ($(window).width() > 768) {
                question_height = Math.round($(this).parents('.row').find('.question-section').height());
            } else {
                question_height = 230;
            }
            // Set sidebar height
            var text_height = question_height - 72;
            $(this).css('height', question_height + 'px');

            // Set .component_text height
            $(this).find('.component-text').css('height', text_height + 'px');

            // Check if text box is in overflow. Set read more link accordingly
            var full_text_height = $(this).find('.component-text').prop('scrollHeight');
            if (full_text_height > text_height) {
                $(this).find('.component-text').addClass('fixed-height');
                $(this).find('.more-info-toggle').removeClass('hide');
            } else {
                $(this).find('.component-text').removeClass('fixed-height');
                $(this).find('.more-info-toggle').addClass('hide');
            }
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
    var mobile_modal_display = function () {
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
                $(this).find('.scrollable').css('max-height', '400px');  
                $(this).find('.email-form').removeClass('open').find('form').css('display', 'block');
            });
        }
    };
    mobile_modal_display();

    $(window).resize(function () {
        mobile_modal_display();
    });

    $('#modal-bp-md').on('click', function(){
        mobile_modal_display();

        $('.modal-form .email-form').each(function () {
            $(this).removeClass('open').find('form').css('display', 'block');
        });
    });
    $('#modal-bp-final').on('click', function(){
        mobile_modal_display();

        $('.modal-form .email-form').each(function () {
            $(this).removeClass('open').find('form').slideUp();
        });
    });


    //Toggle modal form on mobile screens
    $('.mobile-form-toggle').on('click', function () {
        $(this).parents('.email-form').toggleClass('open').find('form').slideToggle();
    });

    //Checklist modal copy link
    $('.modal-example .copy-link').on('click',function(){
        $(this).addClass('copied');
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
        /*
        var new_position = $(this).attr('data-position'),
        current_position = parseInt($('.pagination-links li.current').attr('data-position'));
        $('.pagination-links li.current').removeClass('current');

        switch(new_position) {
            case "first":
                position = "1";
                break;
            case "previous":
                new_position = (current_position - 1).toString();
                break;
            case "next":
                new_position = (current_position + 1).toString();
                break;
            case "last":
                new_position = "8";
                break;
            default:
              new_position = new_position;
          }
          console.log("final: " + new_position);

          $('li').data('data-position', new_position);*/

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

    $('.chat.closed').hover(
        function () {
            if ($(window).width() >= 768) {
                $('.chat-closed-msg').addClass("show");
            }
        },
        function () {
            if ($(window).width() >= 768) {
                $('.chat-closed-msg').removeClass("show");
            }
        }
    );
    $('.chat.closed').on('click', function () {
        if ($(window).width() <= 768) {
            $('.chat-closed-msg').toggleClass("show");
        }
    });

    // COMPONENT EXAMPLE: PRINT SHARE UTILITIES
    $('#share-popover').on('click', function(){
        $('.share-container').toggleClass('show');
    });

    // CONTEXTUAL HELP {
    $('.complex-question').on('click', function(){
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
	}).on('hide', function(e) {
        $(this).parents('#datepicker-container').removeClass('open');
    }).on('show', function(e) {
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
    $('.filter-item-title').on('click', function(){
        
        $(this).parents('.filter-item').toggleClass('open').find('.filter-item-content').slideToggle();

        $('.filter-item-title').not(this).parents('.filter-item').removeClass('open').find('.filter-item-content').slideUp();
    });

    // filter bubbles
    $('.active-filters li').on('click', function(){
        var item_value = $(this).attr('data-value'),
        counter = parseInt($(this).parents('.filter-item').find('.mobile-counter').text());
        counter--;
        
        if (counter != 0) {
            $(this).parents('.filter-item').find('.mobile-counter').text(String(counter));
        } else  {
            $(this).parents('.filter-item').find('.mobile-counter').text('').removeClass('not-empty');
        }
        
        //checkboxes
        $('#' + item_value).prop("checked", false);
        $(this).removeClass('selected');
    

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

    // checkboxes & bubbles
    $('.checkboxes-secondary input').on('click', function(){
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
            } else  {
                $(this).parents('.filter-item').find('.mobile-counter').text('').removeClass('not-empty');
            }
        }
    });
    
    // dropdowns
    $('.filters.single-select select').on('change', function(){
        var item_value = $(this).val();

        $(this).parents('.filter-item').find('.active-filters li').each(function(){
            $(this).removeClass('selected');
            $(this).parents('.filter-item').find('.mobile-counter').text('').removeClass('not-empty');
        });
    
        if (item_value !== 'select-option') {
            $('li[data-value="' + item_value + '"]').addClass('selected');
            $(this).parents('.filter-item').find('.mobile-counter').text('1').addClass('not-empty');
        }  
    });

    // toggle switch
    $('.filters.toggle-switch input').on('click', function(){
        var item_value = $(this).attr('id');
        
        $(this).parents('.toggle-switch').toggleClass('selected');

        if ($(this).is(":checked")) {
            $('li[data-value="' + item_value + '"]').addClass('selected');
            $(this).parents('.filter-item').find('.mobile-counter').text('1').addClass('not-empty');
        } else {
            $('li[data-value="' + item_value + '"]').removeClass('selected');
            $(this).parents('.filter-item').find('.mobile-counter').text('').removeClass('not-empty');
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


}); //End doc ready


