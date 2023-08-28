/*jshint browser: true, devel: true, jquery: true*/

// Global objects storing answer combinations for help me decide
var sole_trader = {
    structure: 'Sole trader',
    registrations: ['reg-individual-tfn', 'reg-abn']
};
var partnership = {
    structure: 'Partnership',
    registrations: ['reg-business-tfn', 'reg-abn']
};
var company = {
    structure: 'Company',
    registrations: ['reg-business-tfn', 'reg-abn']
};
var trust = {
    structure: 'Trust',
    registrations: ['reg-business-tfn', 'reg-abn']
};
var superannuation = {
    structure: 'Superannuation',
    registrations: ['reg-business-tfn', 'reg-abn']
};


$(document).ready(function () {

    // Check page is part of the BGA prototype
    if ($("#bga-prototype").length) {

        console.log('bga prototype page');

        // Inactive feature modal
        /*$('a[href=""], a:not([href]), .search-container input, .name-search input, .business-info li, .callout-box button').on("click", function () {
            console.log('no link');
            $(".modal-example").addClass("show");
            $(".modal-overlay").addClass("show");

        });
        */
        $(".modal-example .close").on("click", function () {
            $(".modal-example").removeClass("show");
            $(".modal-overlay").removeClass("show");
        });

        $(".modal-overlay").on("click", function () {
            $(".modal-example").removeClass("show");
            $(".modal-overlay").removeClass("show");
        });


        // Deactivate second level page links on mobile so dropdowns work
        $('.level-2.nav-dropdown').on('click', function (e) {
            var screen_width = $(window).width();
            if (screen_width < 768) {
                e.preventDefault();
            }
        });


        // EASY READ
        $('.easy-read-menu-trigger').on('click', function(){
            $(this).parents('.menu-trigger').toggleClass('open');
            $('.menu-wrapper').toggleClass('show');
        });

        $('.easy-read-footer .bga-btn.standalone-1').on('click', function(){
            window.location.pathname = "/bga-style-guide/prototypes/bga/easy-read-standalone-1.html";
        });
        $('.easy-read-footer .bga-btn.standalone-2').on('click', function(){
            window.location.pathname = "/bga-style-guide/prototypes/bga/easy-read-standalone-2.html";
        });
        $('.easy-read-footer .bga-btn.standalone-3').on('click', function(){
            window.location.pathname = "/bga-style-guide/prototypes/bga/easy-read-standalone-3.html";
        });



        // Add fragments to URL to track task success
        // Add url fragments for task tracking in Loop11    
        /*
        var set_fragment = function (task_str) {
            var current_fragment = sessionStorage.getItem('fragment');
            if (!current_fragment) {
                current_fragment = "";
            }

            var new_fragment;

            if (current_fragment.includes(task_str)) {
                new_fragment = current_fragment;

            } else {
                new_fragment = current_fragment + task_str;
            }
            window.location.hash = new_fragment;
            sessionStorage.setItem('fragment', new_fragment);
        };
        */

        // GET current task function
        /* 
        var get_current_task = function () {
            var current_task;
            if ((sessionStorage.getItem('T3') == 'true')) {
                current_task = 'T3';
                $('.loop11-instructions .header-wrapper').addClass('show');
            } else if ((sessionStorage.getItem('T2') == 'true') & !(sessionStorage.getItem('T3') == 'true')) {
                current_task = 'T2';
                $('.loop11-instructions .header-wrapper').addClass('show');
            } else if ((sessionStorage.getItem('T1') == 'true') & !(sessionStorage.getItem('T2') == 'true') & !(sessionStorage.getItem('T3') == 'true')) {
                current_task = 'T1'
            }
            sessionStorage.setItem('current_task', current_task);
            console.log(current_task);

        };
        */

        // Set task number to true in sessionStorage when a task landing page loads & set nav steps for each task.

        /*
        if (window.location.href.includes("task1-start.html")) {
            sessionStorage.setItem('T1', 'true');
        }

        if (window.location.href.includes("task2-start.html")) {
            sessionStorage.setItem('T2', 'true');
        }

        if (window.location.href.includes("task3-start.html")) {
            sessionStorage.setItem('T3', 'true');
        }

        get_current_task();
        */

        // Track button clicks with URL fragments

        /*
        $('.nav-dropdown.level-1').on('click', function () {
            var task = sessionStorage.current_task;
            if (task != 'undefined') {
                set_fragment(task + "-openmenu");
            }
        });

        $('.nav .submenu li').on('click', function () {
            var task = sessionStorage.current_task;
            if (task != 'undefined') {
                set_fragment(task + "-linkclick");
            }
        });

        if (window.location.href.includes("manage-your-environmental-impact.html") || window.location.href.includes("manage-energy-use.html") || location.href.includes("environmental-impact.html") ) {
            var task = sessionStorage.current_task;
            if (task == 'T1') {
                set_fragment(task + "-success");
            }
        }

        if (window.location.href.includes("registrations-your-business-needs.html") || window.location.href.includes("register-for-an-australian-business-number-abn.html") ) {
            var task = sessionStorage.current_task;
            if (task == 'T2') {
                set_fragment(task + "-success");
            }
        }

        if (window.location.href.includes("grants-finder.html") ) {
            var task = sessionStorage.current_task;
            if (task == 'T3') {
                set_fragment(task + "-success");
            }
        }
        



        // On page unload add page location to sessionStorage in 'prev_location' item

        $(window).on('beforeunload', function () {
            var location = window.location.pathname;
            sessionStorage.setItem('prev-location', location);
        });

        // Load existing URL fragments on page load.
        var existing_fragment = sessionStorage.getItem('fragment');
        if (existing_fragment) {
            window.location.hash = existing_fragment;
        };

        */


    } // End if #bga-prototype


    // HELP ME DECIDE
    // Check page is Help me decide prototype
    if ($('#help-me-decide-prototype').length) {
        
        // Comparison accordions
        $('.treegrid .learn-more button').on('click', function(){
            $(this).parents('.learn-more').toggleClass('open');
            $(this).parents('tr').next('.more-info').slideToggle();
        });

        // Sidebar stickiness
        var sticky_sidebar = function() {
            console.log('sticky');
            var sidebar_position = Math.round($('.recommendations-sidebar').position().top);
            var sidebar_width = $('.recommendations-sidebar').width();
            var sidebar_height = $('.recommendations-sidebar').height();
            var footer_height = $('.bga-footer-example').height();
            //console.log('Side bar position: ' + sidebar_position);
            //console.log('Side bar width: ' + sidebar_width);
            //console.log('Side bar width: ' + sidebar_width);
            //console.log('Side bar height: ' + sidebar_height);
            //console.log('Footer height: ' + footer_height);
            

            $('.recommendations-sidebar').css('width', sidebar_width);

            if ($(window).width() >= 768) {
                $('.recommendations-sidebar').removeClass('mobile-hide');
                $(window).scroll(function () {
                    var unfix = $(document).height() - footer_height - sidebar_height;
                    var scroll_position = $(window).scrollTop();

                    if (scroll_position >= sidebar_position && scroll_position < unfix) {
                        $('.recommendations-sidebar').addClass('fixed');
                    } else {
                        $('.recommendations-sidebar').removeClass('fixed');
                    }
                });
            } else if ($(window).width() < 768) {
                $('.recommendations-sidebar').addClass('mobile-hide');
            }
        };
        sticky_sidebar();

        $(window).resize(function () {
            sticky_sidebar();
        }); 
        


        // Dynamic question logic - single question
        var dynamic_q_single = function(trigger_q, answer_1, dynamic_1, answer_2, dynamic_2){
            var answer = $(trigger_q).attr('id');
            //console.log(answer);
            if ( answer == answer_1 && $(trigger_q).is(":checked")) {
                $(dynamic_1).removeClass('d-none');
                $(dynamic_2).addClass('d-none');
            } else if ( answer_2 == answer_2 && $(trigger_q).is(":checked")) {
                $(dynamic_1).addClass('d-none');
                $(dynamic_2).removeClass('d-none');
            }
        };

        $('.q-know-structure .radio-button input').on('change', function(){
            dynamic_q_single(this, 'know-structure-yes', '.q-know-structure-yes', '.know-structure-no', '.q-know-structure-no');
        });

        // Dynamic question logic - multiple questions 
        var dynamic_q_multiple = function(section, trigger_q, answer_1, answer_2, answer_3, answer_4, display_1, display_2, display_3){
            var answer = $(trigger_q).attr('id');
            $(trigger_q).parents('.radios').addClass('answered');

            if ( $(section + ' .radios').length == $(section + ' .radios.answered').length ) {
                console.log('all are answered');
                if ( $(answer_1).is(":checked") && $(answer_4).is(":checked")) {
                    $(display_1).removeClass('d-none');
                    $(display_2).addClass('d-none');
                    $(display_3).addClass('d-none');
                }  else if ( $(answer_2).is(":checked") && $(answer_4).is(":checked")) {
                    $(display_1).addClass('d-none');
                    $(display_2).removeClass('d-none');
                    $(display_3).addClass('d-none');
                }  else if ( $(answer_2).is(":checked") && $(answer_3).is(":checked")) {
                    $(display_1).addClass('d-none');
                    $(display_2).addClass('d-none');
                    $(display_3).removeClass('d-none');
                } else if ( $(answer_1).is(":checked") && $(answer_3).is(":checked")) {
                    $(display_1).addClass('d-none');
                    $(display_2).addClass('d-none');
                    $(display_3).removeClass('d-none');
                }

            };
        }; 
        
        $('.q-know-structure-no .radio-button input').on('change', function(){
            dynamic_q_multiple('.q-know-structure-no', this, '#number-owners-one', '#number-owners-two', '#hold-assets-yes', '#hold-assets-no', '.q-sole-trader-v-company', '.q-partnership-v-company', '.q-trust');
        });



        // Recommendations sidebar logic

        // Know business structure - no recommendations
        $('.q-know-structure input#know-structure-no').on('change', function(){
            if ($(this).is(":checked")) {
                // Clear sidebar
                $('.recommendations-sidebar .chosen-structure').text("No chosen structure yet");
                $('.recommendations-sidebar .recommendations li').each(function(){
                    $(this).removeClass('show');
                });
                $('.no-recommendations').addClass('show');

                //Clear sessionStorage
                sessionStorage.clear();

                // Clear answered inputs
                $('.q-know-structure-yes .radio-button input').each(function(){
                    $(this).prop('checked',false);
                });
            }
        });


        // Know business structure - yes recommendations
        $('.q-know-structure-yes input').on('change', function(){
            var answer = $(this).attr('data-value');
            sessionStorage.setItem('business-structure', window[answer].structure);
            $('.recommendations-sidebar .chosen-structure').text(window[answer].structure);
            $('.no-recommendations').removeClass('show');

            for (var i = 0; i < window[answer].registrations.length; i++) {
                $('.'+ window[answer].registrations[i]).addClass('show');
                sessionStorage.setItem(window[answer].registrations[i], 'true');
            }
            if (answer == 'sole_trader') {
                    sessionStorage.removeItem('reg-business-tfn');
                    $('.reg-business-tfn').removeClass('show');
                } else {
                    sessionStorage.removeItem('reg-individual-tfn');
                    $('.reg-individual-tfn').removeClass('show');
            }
            //sticky_sidebar();

        });

        $('#sole-trader-v-company input').on('change', function(){
            var answer = $(this).attr('data-value');
            console.log($(this));
            sessionStorage.setItem('business-structure', window[answer].structure);
            $('.recommendations-sidebar .chosen-structure').text(window[answer].structure);
            $('.no-recommendations').removeClass('show');

            for (var i = 0; i < window[answer].registrations.length; i++) {
                $('.'+ window[answer].registrations[i]).addClass('show');
                sessionStorage.setItem(window[answer].registrations[i], 'true');
            }
            if (answer == 'sole_trader') {
                    sessionStorage.removeItem('reg-business-tfn');
                    $('.reg-business-tfn').removeClass('show');
                } else {
                    sessionStorage.removeItem('reg-individual-tfn');
                    $('.reg-individual-tfn').removeClass('show');
            }
            //sticky_sidebar();

        });

        


    }; // End Help me decide

}); // End doc ready


// Ensure URL fragments are added to the url (this catches back button clicks)
/*
window.onhashchange = function () {
    var existing_fragment = sessionStorage.getItem('fragment');
    if (existing_fragment) {
        window.location.hash = existing_fragment;
    };
}
*/
