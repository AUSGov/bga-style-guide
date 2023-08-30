/*jshint browser: true, devel: true, jquery: true*/

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

        //Set recommendations sidebar on page load
        var get_recommendations = function(){
            var structure = sessionStorage.getItem('business-structure');
            if (structure) {
                $('.recommendations-sidebar .chosen-structure').text(structure);
            }

            var registrations = sessionStorage.getItem('registrations');
            if (registrations) {
                $('.recommendations li').each(function(){
                    var registration = $(this).attr('data-value');
                    if (registrations.includes(registration)) {
                        $(this).addClass('show');
                    };
                });
                $('.recommendations li.no-recommendations').removeClass('show');
            }
        };
        get_recommendations(); 
        
        // Store selected question inputs
        var store_answers = function(trigger_q){
            console.log('triggered');
            // Get question and selected answer
            var question = $(trigger_q).parents('.radios').attr('id'), 
            selected_input = $('#' + question + ' input:checked').attr('id');

            // Get stored answers from sessionStorage
            var answers = sessionStorage.getItem('answers');
            if (!answers) {
                answers = '';
            }
            
            // Add answer to sessionStorage and remove other answers connected to the radio group
            $('#' + question + ' input').each(function(){
                if ($(this).is(":checked")) {
                    if (!answers.includes(selected_input)) {
                        answers = answers + selected_input + ', ';
                        sessionStorage.setItem('answers', answers);
                    }
                } else {
                    var answer = $(this).attr('id');
                    answers = answers.replace(answer + ', ', '');
                }
            }); 
        };
        $('.question-section input').on('change', function(){
            store_answers(this);
        });

        // Set previously selected answers on page load
        var get_answers = function(){
            var answers = sessionStorage.getItem('answers');
            if (!answers) {
                answers = '';
            }
            
            $('.question-section input').each(function(){
                var id = $(this).attr('id');
                if ( answers.includes(id) ){
                    $(this).prop('checked', true);
                };
            });
        };
        get_answers(); 

        // Functions to store recommendations
        var add_registration = function(new_reg){
            var registrations = sessionStorage.getItem('registrations');
            if (!registrations) {
                registrations = "";
            }
            if (!registrations.includes(new_reg)) {
                registrations = registrations + new_reg + ', ';
                $('.recommendations .' + new_reg).addClass('show');
            }
            sessionStorage.setItem('registrations', registrations);
        };
        var remove_registration = function(old_reg) {
            var registrations = sessionStorage.getItem('registrations');
            if (!registrations) {
                registrations = "";
            }
            if (registrations.includes(old_reg)) {
                registrations = registrations.replace(old_reg + ', ', '');
                $('.recommendations .' + old_reg).removeClass('show');
            }
            sessionStorage.setItem('registrations', registrations);
        };
        var clear_registrations = function(){
            $('.recommendations-sidebar .chosen-structure').text("No chosen structure yet");
            $('.recommendations li').each(function(){
                $(this).removeClass('show');
            }); 
            $('.no-recommendations').addClass('show');
            
            sessionStorage.setItem('registrations', '');
            sessionStorage.setItem('business-structure', '');
            //sessionStorage.setItem('answers', '');
        };
        var single_registration_q = function(target_q, registration){
            var answer = $(target_q).attr('data-value');

            if ($(target_q).is(":checked") && answer == registration) {
                add_registration(registration);
            } else {
                remove_registration(registration);
            };
            sticky_recommendations();
        };

        // Function to store dynamic question display for page reload
        var dynamic_display = function(){
            var dynamic_display = sessionStorage.getItem('dynamic_display', 'dynamic_display');
            if (!dynamic_display) {
                dynamic_display = '';
            }
            //console.log(dynamic_display);

            $('.dynamic-section').each(function(){
                var id = $(this).attr('id');
                
                if ( $(this).hasClass('d-none') ) {
                    dynamic_display = dynamic_display.replace(id + ', ', '');
                } else {
                    if (!dynamic_display.includes(id)){
                        dynamic_display = dynamic_display + id + ', ';
                    }
                }
               
            });
            //console.log(dynamic_display);
            sessionStorage.setItem('dynamic_display', dynamic_display);
          
        };
        // Set opened dynamic sections  on page load
        var get_dynamic_sections = function(){
            var open_sections = sessionStorage.getItem('dynamic_display');
            if (!open_sections) {
                open_sections = '';
            }
            $('.dynamic-section').each(function(){
                var section = $(this).attr('id');
                if ( open_sections.includes(section) ) {
                    $(this).removeClass('d-none');
                }
            });
        };
        get_dynamic_sections(); 

        // DYNAMIC QUESTIONS
        // Business structure page
        $('.q-know-structure .radio-button input').on('change', function(){
            var answer = $(this).attr('id');
           
            if ( answer == 'know-structure-yes' && $(this).is(":checked")) {
                $('.q-know-structure-yes').removeClass('d-none');
                $('.q-know-structure-no, .q-sole-trader-v-company, .q-partnership-v-company, .q-trust').addClass('d-none');
            } else if ( answer == 'know-structure-no' && $(this).is(":checked")) {
                $('.q-know-structure-yes').addClass('d-none');
                $('.q-know-structure-no').removeClass('d-none');
            }
            sticky_recommendations();
        });
        
        $('.q-know-structure-no .radio-button input').on('change', function(){
            var answer = $(this).attr('id');
            $(this).parents('.radios').addClass('answered');

            if ( $('.q-know-structure-no .radios').length == $('.q-know-structure-no .radios.answered').length ) {
                if ( $('#number-owners-one').is(":checked") && $('#hold-assets-no').is(":checked")) { //Sole trader
                    $('.q-sole-trader-v-company').removeClass('d-none');
                    $('.q-partnership-v-company').addClass('d-none');
                    $('.q-trust').addClass('d-none');

                    clear_registrations();
                }  
                else if ( $('#number-owners-two').is(":checked") && $('#hold-assets-no').is(":checked")) { // Partnership
                    $('.q-sole-trader-v-company').addClass('d-none');
                    $('.q-partnership-v-company').removeClass('d-none');
                    $('.q-trust').addClass('d-none');

                    clear_registrations();
                }  
                else if ( ($('#number-owners-two').is(":checked") && $('#hold-assets-yes').is(":checked")) || ($('#number-owners-one').is(":checked") && $('#hold-assets-yes').is(":checked")) ) { // Trust
                    $('.q-sole-trader-v-company').addClass('d-none');
                    $('.q-partnership-v-company').addClass('d-none');
                    $('.q-trust').removeClass('d-none');
                    
                    sessionStorage.setItem('business-structure', 'Trust');
                    $('.recommendations-sidebar .chosen-structure').text('Trust');
                    $('.no-recommendations').removeClass('show');

                    add_registration('business-tfn');
                    add_registration('abn');
                    remove_registration('individual-tfn'); 
                } 
            };   
            sticky_recommendations();
        });

        // Employees page   
        $('.q-payg .radio-button input').on('change', function(){
            var answer = $(this).attr('id');

            if ( answer == 'payg-yes' && $(this).is(":checked")) {
                $('.q-fbt').removeClass('d-none');
            } else {
                $('.q-fbt').addClass('d-none');
            }
            sticky_recommendations();
        });
        
        // Store visibility of dynamic sections in sessionStorage
        $('.dynamic-trigger input').on('change', function(){
            dynamic_display();
        });

        // RECOMMENDATIONS SIDEBAR
        // Business structure page add / remove recommendations
         $('.q-know-structure input#know-structure-no, .q-know-structure input#know-structure-yes').on('change', function(){
            clear_registrations();

             // Clear answered inputs
             $('.q-know-structure-yes .radio-button input, .q-know-structure-no .radio-button input').each(function(){
                $(this).prop('checked',false);
            });

            sticky_recommendations
        });
        
        $('.q-know-structure-yes input, #sole-trader-v-company input, #partnership-v-company input').on('change', function(){
            var answer = $(this).attr('data-value');

            // business structure
            sessionStorage.setItem('business-structure', answer);
            $('.recommendations-sidebar .chosen-structure').text(answer);
            
            // recommendations
            $('.no-recommendations').removeClass('show');
           
            if (answer == 'Sole trader') {
                add_registration('individual-tfn');
                add_registration('abn');
                remove_registration('business-tfn'); 
                remove_registration('company');
            } else if (answer == 'Company') {
                add_registration('business-tfn');
                add_registration('abn');
                add_registration('company');
                remove_registration('individual-tfn'); 
            } else {
                add_registration('business-tfn');
                add_registration('abn');
                remove_registration('individual-tfn'); 
                remove_registration('company');
            }
            sticky_recommendations();
        });


        // Business name page add / remove recommendations
        $('.q-business-name input').on('change', function(){
            single_registration_q(this, 'business-name');
        });

        $('.q-trade-mark input').on('change', function(){
            single_registration_q(this, 'trade-mark');
        });

        $('.q-domain-name input').on('change', function(){
            single_registration_q(this, 'domain-name');
        });

        //Employees page add / remove recommendations
        $('.q-payg input').on('change', function(){
            single_registration_q(this, 'payg');
        });

        $('.q-fbt input').on('change', function(){
            single_registration_q(this, 'fbt');
        });

        //Business taxes page add / remove recommendations
        $('.q-business-turnover input, .q-taxi-limousine input').on('change', function(){
            single_registration_q(this, 'gst');
        });

        $('.q-wet input').on('change', function(){
            single_registration_q(this, 'wet');
            add_registration('gst');
        });

        $('.q-ftc input').on('change', function(){
            single_registration_q(this, 'ftc');
            add_registration('gst');
        });

        $('.q-lct input').on('change', function(){
            single_registration_q(this, 'lct');
            add_registration('gst');
        });
        
        
        
        
        
        
        // Comparison accordions
        $('.treegrid .learn-more button').on('click', function(){
            $(this).parents('.learn-more').toggleClass('open');
            $(this).parents('tr').next('.more-info').slideToggle();
        });

        // Sidebar stickiness
        var sticky_recommendations = function() {
            var sidebar_position = Math.round($('.recommendations-sidebar-wrapper').position().top);
            var sidebar_width = $('.recommendations-sidebar-wrapper').width();
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
        sticky_recommendations();

        $(window).resize(function () {
            sticky_recommendations();
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
