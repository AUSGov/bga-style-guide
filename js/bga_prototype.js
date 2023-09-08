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

        // STEPPED NAV
        // Stepped nav functionality
        var stepped_nav_functionality = function(step_titles, path){
       
            var active_step = 'nav-step-' + $('#stepped-nav-inpage').attr('data-step'),
            active_number = parseInt($('#stepped-nav-inpage').attr('data-step'));

            $('#' + active_step).addClass('active');

            sessionStorage.setItem(active_step, 'visited');

            for (var step = 0; step < step_titles.length; step++) {
                
                var step_number = step + 1,
                    step_str = 'nav-step-' + step_number;
                var state = sessionStorage.getItem(step_str);

                if (step_number < active_number) {
                    $('#' + step_str).addClass('completed').attr('href', path + step_titles[step]);
                } else if ( step_number > active_number) {
                    if (state == "visited" && !$('#' + step_str).hasClass('active')) {
                            $('#' + step_str).addClass('completed').attr('href', path + step_titles[step]);
                        }
                }
            }

            var completed_number;
            $('.stepped-navigation .step').each(function(index){
                var step = index + 1,
                visited_state = sessionStorage.getItem('nav-step-'+ step);
                if (visited_state == 'visited') {
                    completed_number = step;
                } 
            });
            if (completed_number > active_number) {
                $('.step.active').addClass('completed');
                $('.step.completed').last().addClass('visited').removeClass('completed');
            } else {
                $('.step.active').removeClass('completed');
            }

        };

        if ($('#stepped-nav-inpage').length) {
            var path = '/bga-style-guide/prototypes/help-me-decide/';
            stepped_nav_functionality(["business-or-hobby.html", "business-structure.html", "business-name.html", "employees.html", "business-taxes.html", "results.html"], path);
        }

        // Check if 'return to results button' should display
        var results_viewed = sessionStorage.getItem('results');
        if (results_viewed == 'viewed') {
            $('.bga-btn.results').removeClass('d-none');
        };


        // Check all visible radios on the page are answered before continuing 
        var get_unanswered = function(target_q){
 
            var host = window.location.hostname,
            protocol = window.location.protocol,
            path = $(target_q).attr('href'),
            unanswered = sessionStorage.getItem('unanswered'),
            structure = sessionStorage.getItem('business-structure'),
            page = $(target_q).parents('.button-group').attr('data-page'),
            unvisited = sessionStorage.getItem('unvisited');
            
            if (structure == "Hobby") {
                path = '/bga-style-guide/prototypes/help-me-decide/hobby.html';
            }

            if (!unanswered) {
                unanswered = "";
            }
            if (host == '127.0.0.1') {
                    host = '127.0.0.1:4000'
            };
            $('.radios:visible').each(function(){
                var question = $(this).attr('id') + '-unanswered';
               
                if (!$(this).find('input').is(":checked")) {
                    unanswered = unanswered + question + ', ';
                } else {
                    unanswered = unanswered.replace(question + ', ', '');
                }
            }); 
            sessionStorage.setItem('unanswered', unanswered);
            
            unvisited = unvisited.replace(page + ', ', '');
            sessionStorage.setItem('unvisited', unvisited);
    
            window.location = (protocol + '//' + host + path);
        };

        $('.bga-btn.next').on('click', function(e){
            e.preventDefault();
            get_unanswered(this);
        });
        $('.stepped-navigation .step').on('click', function(e){
            e.preventDefault();
            get_unanswered(this);
        });;
        

        //Set recommendations sidebar on page load
        var get_recommendations = function(){
            var structure = sessionStorage.getItem('business-structure');
            if (structure) {
                $('.recommendations-sidebar .chosen-structure span').text(structure);
                $('.recommendations-sidebar .chosen-structure').addClass('completed');
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
            // Get question and selected answer
            var question = $(trigger_q).parents('.radios').attr('id');

            // Get stored answers from sessionStorage
            var answers = sessionStorage.getItem('answers');
            if (!answers) {
                answers = '';
            }
            
            // Add answer to sessionStorage and remove other answers connected to the radio group
            $('#' + question + ' input').each(function(){
                var answer = $(this).attr('id');
                if ($(this).is(":checked")) { 
                    if (!answers.includes(answer)) {
                        answers = answers + answer + ', ';
                    }
                } else {
                    answers = answers.replace(answer + ', ', '');
                }
            }); 
            sessionStorage.setItem('answers', answers);
        };
        $('.question-section input').on('change', function(){
            store_answers(this);
        });

        var remove_answers = function(storage_item, old_answers) {
            var items = sessionStorage.getItem(storage_item);
            if (!items) {
                items = "";
            }
            for (var j = 0; j < old_answers.length; j++) {
                if (items.includes(old_answers[j])) {
                    items = items.replace(old_answers[j] + ', ', '');
                }
            }
            sessionStorage.setItem(storage_item, items);
        };

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
                } else {
                    $(this).prop('checked', false);
                };
            });
        };
        get_answers(); 

        // Functions to store recommendations
        var add_registrations = function(storage_item, new_regs){
            var registrations = sessionStorage.getItem(storage_item);
            if (!registrations) {
                registrations = "";
            }
            
            for (var i = 0; i < new_regs.length; i++) {
                if (!registrations.includes(new_regs[i])) {
                    registrations = registrations + new_regs[i] + ', ';
                    $('.recommendations .' + new_regs[i]).addClass('show');
                }
                sessionStorage.setItem(storage_item, registrations);
            }
        };
        var remove_registrations = function(storage_item, old_regs) {
            var registrations = sessionStorage.getItem(storage_item);
            if (!registrations) {
                registrations = "";
            }
            for (var k = 0; k < old_regs.length; k++) {
                if (registrations.includes(old_regs[k])) {
                    registrations = registrations.replace(old_regs[k] + ', ', '');
                    $('.recommendations .' + old_regs[k]).removeClass('show');
                }
            }
            sessionStorage.setItem(storage_item, registrations);
        };
        var single_registration_q = function(target_q, registration){
            var answer = $(target_q).attr('data-value');
            if ($(target_q).is(":checked") && answer == registration) {
                add_registrations('registrations', [registration]);
            } else {
                remove_registrations('registrations', [registration]);
            };
        };
        

        // Function to store dynamic question display for page reload
        var dynamic_display = function(){
            var dynamic_display = sessionStorage.getItem('dynamic_display');
            if (!dynamic_display) {
                dynamic_display = '';
            }

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
            sessionStorage.setItem('dynamic_display', dynamic_display);
          
        };
        // Set opened dynamic sections on page load
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

        // Clear tool on 'start now' click
        $('.start-component .bga-btn').on('click', function(){
            sessionStorage.clear();
            sessionStorage.setItem('unvisited', 'business-hobby-page, business-structure-page, business-name-page, employees-page, business-taxes-page, ');
        });

        // DYNAMIC QUESTIONS
        // Business or hobby page
        $('.q-business-hobby .radio-button input').on('change', function(){
            var answer = $(this).attr('id');
            sessionStorage.setItem('registrations', '');
            sessionStorage.setItem('business-structure', '');
            sessionStorage.setItem('answers', '');
            sessionStorage.setItem('unanswered', '');
            sessionStorage.setItem('dynamic_display','');

            //Set dynamic section
            if ( answer == 'business-hobby-unsure' && $(this).is(":checked")) {
                $('.q-business-v-hobby').removeClass('d-none');
                remove_answers('answers', ['business-hobby-no', 'business-hobby-yes']);
                sessionStorage.setItem('business-structure', '');
                
            } else if ( answer == 'business-hobby-no' && $(this).is(":checked")){
                $('.q-business-v-hobby').addClass('d-none');
                remove_answers('answers', ['business-hobby-unsure, business-hobby-yes']);
                sessionStorage.setItem('business-structure', 'Hobby');
            } else {
                $('.q-business-v-hobby').addClass('d-none');
                remove_answers('answers', ['business-hobby-unsure, business-hobby-no']);
                sessionStorage.setItem('business-structure', '');
            }
            
            $('.dynamic-section.q-business-v-hobby input').each(function(){
                $(this).prop('checked', false);
            });
        });
        $('.q-business-v-hobby input').on('click', function(){
            var answer = $(this).attr('id');

            if(answer == "business-v-hobby-hobby") {
                remove_answers('answers', ['business']);
                sessionStorage.setItem('business-structure', 'Hobby');
            } else {
                remove_answers('answers', ['Hobby']);
                sessionStorage.setItem('business-structure', '');
            }
        });
        
        // Business structure page
        $('.q-know-structure .radio-button input').on('change', function(){
            var answer = $(this).attr('id');
            
            // Clear all business structure results
            remove_answers('answers', ['sole-trader-4', 'partnership-4', 'company-4', 'trust-4', 'superannuation', 'number-owners-one', 'number-owners', 'number-owners-two', 'hold-assets-no', 'hold-assets-yes', 'partnership-1', 'partnership-2', 'sole-trader-1', 'sole-trader-2', 'company-1']);

            $('.recommendations-sidebar .chosen-structure span').text("No chosen structure yet"); 
            $('.recommendations-sidebar .chosen-structure').removeClass('completed');
            sessionStorage.setItem('business-structure', '');
            
            remove_registrations('registrations', ['individual-tfn', 'business-tfn', 'abn', 'company']);
            if($('.recommendations li.show').length == 0) {
                $('.recommendations li.no-recommendations').addClass('show');
            };

            //Set dynamic section
            if ( answer == 'know-structure-yes' && $(this).is(":checked")) {
                $('.q-know-structure-yes').removeClass('d-none');
                $('.q-know-structure-no, .q-sole-trader-v-company, .q-partnership-v-company, .q-trust').addClass('d-none');
                remove_answers('answers', ['know-structure-no']);
                
            } else if ( answer == 'know-structure-no' && $(this).is(":checked")) {
                $('.q-know-structure-yes').addClass('d-none');
                $('.q-know-structure-no').removeClass('d-none');
                remove_answers('answers', ['know-structure-yes']);
            }
        });
        
        $('.q-know-structure-no .radio-button input').on('change', function(){
            var answer = $(this).attr('id'),
            answered = sessionStorage.getItem('answers'),
            unanswered = sessionStorage.getItem('unanswered');

            // Add answered class to track questions required for dynamic display of comparison table sections.
            $(this).parents('.radios').addClass('answered');

            //Remove any unanswered questions from previously viewed questions
            unanswered = unanswered.replace('partnership-v-company-unanswered, ',  '');
            unanswered = unanswered.replace('sole-trader-v-company-unanswered, ',  '');
            sessionStorage.setItem('unanswered', unanswered);
           

            if (answered.includes('number-owners') && answered.includes('hold-assets')) {
                console.log('all checked');
                if ( $('#number-owners-one').is(":checked") && $('#hold-assets-no').is(":checked")) { //Sole trader
                    $('.q-sole-trader-v-company').removeClass('d-none');
                    $('.q-partnership-v-company').addClass('d-none');
                    $('.q-trust').addClass('d-none');
                }  
                else if ( $('#number-owners-two').is(":checked") && $('#hold-assets-no').is(":checked")) { // Partnership
                    $('.q-sole-trader-v-company').addClass('d-none');
                    $('.q-partnership-v-company').removeClass('d-none');
                    $('.q-trust').addClass('d-none');
                }  
                else if ( ($('#number-owners-two').is(":checked") && $('#hold-assets-yes').is(":checked")) || ($('#number-owners-one').is(":checked") && $('#hold-assets-yes').is(":checked")) ) { // Trust
                    $('.q-sole-trader-v-company').addClass('d-none');
                    $('.q-partnership-v-company').addClass('d-none');
                    $('.q-trust').removeClass('d-none');
                    
                    sessionStorage.setItem('business-structure', 'Trust');
                    $('.recommendations-sidebar .chosen-structure span').text('Trust');
                    $('.recommendations-sidebar .chosen-structure').addClass('completed');
                    $('.no-recommendations').removeClass('show');

                    add_registrations('registrations', ['business-tfn', 'abn']);
                    remove_registrations('registrations', ['individual-tfn']); 
                } 
                
            };   
        });

        // Employees page   
        $('.q-payg .radio-button input').on('change', function(){
            var answer = $(this).attr('id');

            if ( answer == 'payg-yes' && $(this).is(":checked")) {
                $('.q-fbt').removeClass('d-none');
            } else {
                $('.q-fbt').addClass('d-none');
            }
            $('.question-section input.q-fbt').each(function(){
                $(this).prop('checked', false);
            });
        });
        
        // Store visibility of dynamic sections in sessionStorage
        $('.dynamic-trigger input').on('change', function(){
            dynamic_display();
        });

        // RECOMMENDATIONS SIDEBAR
        // Business structure page add / remove recommendations
         $('.q-know-structure input#know-structure-no, .q-know-structure input#know-structure-yes').on('change', function(){
            remove_registrations('registrations', ['individual-abn']);

             // Clear answered inputs
             $('.q-know-structure-yes .radio-button input, .q-know-structure-no .radio-button input').each(function(){
                $(this).prop('checked',false);
            });
        });

        $('.q-know-structure-yes input, #sole-trader-v-company input, #partnership-v-company input').on('change', function(){
            var answer = $(this).attr('data-value');

            // business structure
            sessionStorage.setItem('business-structure', answer);
            $('.recommendations-sidebar .chosen-structure span').text(answer);
            $('.recommendations-sidebar .chosen-structure').addClass('completed');
            
            // recommendations
            $('.no-recommendations').removeClass('show');
           
            if (answer == 'Sole trader') {
                add_registrations('registrations', ['individual-tfn', 'abn']);
                remove_registrations('registrations', ['business-tfn', 'company']); 
            } else if (answer == 'Company') {
                add_registrations('registrations', ['business-tfn', 'abn', 'company']);
                remove_registrations('registrations', ['individual-tfn']); 
            } else {
                add_registrations('registrations', ['business-tfn', 'abn']);
                remove_registrations('registrations', ['individual-tfn', 'company']); 
            }
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
            remove_registrations('registrations', ['fbt']);
            remove_answers('answers', ['fbt-yes', 'fbt-no']);
            single_registration_q(this, 'payg');
        });

        $('.q-fbt input').on('change', function(){
            single_registration_q(this, 'fbt');
        });

        var check_gst = function(){
            var gst_inputs = ['#business-turnover-yes', '#taxi-limousine-yes', '#wet-yes', '#ftc-yes', '#lct-yes'],
            gst_required = false;

            for (var i = 0; i < gst_inputs.length; i++) {
                 if ($(gst_inputs[i]).is(':checked')) {
                    gst_required = true;
                    console.log('gst still required');
                    return;
                 }
            }
            if (gst_required == false) {
                remove_registrations('registrations', ['gst']);
            }
        };

        //Business taxes page add / remove recommendations
        $('.q-business-turnover input, .q-taxi-limousine input').on('change', function(){
            var answer = $(this).attr('data-value');
            if (answer == 'gst') {
                add_registrations('registrations', ['gst']);
            } else {
                check_gst();
            }
        });

        $('.q-wet input').on('change', function(){
            var answer = $(this).attr('data-value');
            if (answer == 'wet') {
                add_registrations('registrations', ['gst', 'wet']);
            } else {
                remove_registrations('registrations', ['wet']);
                check_gst();
            }
        });

        $('.q-ftc input').on('change', function(){
            var answer = $(this).attr('data-value');
            if (answer == 'ftc') {
                add_registrations('registrations', ['gst', 'ftc']);
            } else {
                remove_registrations('registrations', ['ftc']);
                check_gst();
            }
        });

        $('.q-lct input').on('change', function(){
            var answer = $(this).attr('data-value');
            if (answer == 'lct') {
                add_registrations('registrations', ['gst', 'lct']);
            } else {
                remove_registrations('registrations', ['lct']);
                check_gst();
            }

        });
        

        
        // Comparison accordions
        $('.treegrid .learn-more button').on('click', function(){
            $(this).parents('.learn-more').toggleClass('open');
            $(this).parents('tr').next('.more-info').slideToggle();
        });


        // Display results on results page
        if ($('#help-me-decide-prototype').hasClass('results-page')) {
            
            if ($('.results-viewed').length != 0){
                // Store result page loaded, for 'return to results' button.
                sessionStorage.setItem('results', 'viewed');
            }
            
            // Get results from sessionStorage
            var business_structure = sessionStorage.getItem('business-structure'), 
            registrations = sessionStorage.getItem('registrations'),
            answers = sessionStorage.getItem('answers'),
            unanswered = sessionStorage.getItem('unanswered'),
            unvisited = sessionStorage.getItem('unvisited');

            if (!answers) {
                answers = '';
            }
            if (!unanswered) {
                unanswered = '';
            };
            if (!registrations) {
                registrations = '';
            }


            // Checked what is answered and display results page accordingly

            if (!business_structure) {
                $(".error-notification-wrapper").removeClass('d-none');
            } else if ( business_structure && unanswered !== '') { 
                $('.business-structure-wrapper, .error-notification-wrapper').removeClass('d-none');

                // Show business structure call out
                business_structure = business_structure.replace(' ', '-');
                business_structure = business_structure.toLowerCase();
                $('#' + business_structure + '.callout-business-structure').removeClass('d-none');

            } else {
                $('.business-structure-wrapper, .registrations-wrapper, .next-steps-wrapper').removeClass('d-none');

                // Show business structure call out
                business_structure = business_structure.replace(' ', '-');
                business_structure = business_structure.toLowerCase();
                $('#' + business_structure + '.callout-business-structure').removeClass('d-none');

                // Show registration items in accordion
                $('.results-accordion .accordion-item').each(function(){
                    var registration = $(this).attr('id');
                    if (registrations.includes(registration)) {
                        $(this).removeClass('d-none');
                    }
                });
            }
           


            // Show answers in edit answers component
            $('.edit-answers-component .answers p').each(function(){
                var answer = $(this).attr('id');
            
                if (answers.includes(answer)) {
                    $(this).removeClass('d-none');
                }
                if (unanswered.includes(answer)) {
                    $(this).removeClass('d-none');
                }
            });
            
            // Check is any answers sections are empty because page wasn't visited
            
            $('.answers').each(function(){
                var page = $(this).attr('data-page');

                if ( (unvisited.includes(page) )) {
                    if ( page == 'business-hobby-page') {
                        $('.answers #business-hobby-unanswered').removeClass('d-none');
                    } else if (page == 'business-structure-page' ) {
                        $('.answers #know-structure-unanswered').removeClass('d-none');
                    } else if (page == 'business-name-page' ) {
                        $('.answers #business-name-unanswered').removeClass('d-none');
                        $('.answers #trade-mark-unanswered').removeClass('d-none');
                        $('.answers #domain-name-unanswered').removeClass('d-none');
                    } else if (page == 'employees-page' ) {
                        $('.answers #payg-unanswered').removeClass('d-none');
                    } else if (page == 'business-taxes-page' ) {
                        $('.answers #business-turnover-unanswered').removeClass('d-none');
                        $('.answers #taxi-limousine-unanswered').removeClass('d-none');
                        $('.answers #wet-unanswered').removeClass('d-none');
                        $('.answers #ftc-unanswered').removeClass('d-none');
                        $('.answers #lct-unanswered').removeClass('d-none');
                    }   

                }
            });
             

            // Show list of registrations in next steps
            var gst_reasons = ['taxi-limousine-yes','business-turnover-yes', 'wet-yes', 'ftc-yes', 'lct-yes'];
            $('.registrations-apply li').each(function(){
                var registration = $(this).attr('data-value');
                if (registrations.includes(registration)) {
                    $(this).removeClass('d-none');

                    if (registration == 'gst') {
                        for (var i = 0; i < gst_reasons.length; i++) {
                            if (answers.includes(gst_reasons[i])) {
                                $('.reason.'+ gst_reasons[i]).removeClass('d-none');
                            };
                        }  
                    }
                }
            });
            $('.results-accordion #gst .reason:visible:last').addClass('last');

            var other_registrations = ['individual-tfn', 'trade-mark', 'domain-name'];
            
            for (var i = 0; i < other_registrations.length; i++) {
                if ( registrations.includes(other_registrations[i]) ) {

                    $('.other-registrations').removeClass('d-none');
                    $('.other-registrations .' + other_registrations[i]).removeClass('d-none');
                }
            }


        } // end results page
        
        
        // Business structure cta on results page
        $('.callout-business-structure .learn-more').on('click', function(){
            $(this).next('.more-info').toggleClass('d-none');
            $(this).toggleClass('open')
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
