/*jshint browser: true, devel: true, jquery: true*/


$(document).ready(function () {

    //ECB REVISED FLOW PROTOTYPE

    // Stepped nav functionality
    var stepped_nav_functionality = function(path){
        
        var active_step = 'nav-step-' + $('.step-title').attr('data-step'),
        active_number = parseInt($('.step-title').attr('data-step'));

        $('#' + active_step).addClass('active');

        sessionStorage.setItem(active_step, 'visited');

        var step_titles = ["position.html", "hours.html", "pay.html", "leave.html", "obligations.html", "ending-employment", "review.html", "finalise.html"];

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

    if ($('#ecb-prototype .stepped-navigation-wrapper').length) {

        var location = window.location.href,
        path;

        if(location.includes('tasks')) {
            if (location.includes('mobile')) {
                path = '/bga-style-guide/prototypes/ecb/tasks-mobile/';
            } else {
                path = '/bga-style-guide/prototypes/ecb/tasks/';
            }
        } else {
            path = '/bga-style-guide/prototypes/ecb/';
        }
        
        stepped_nav_functionality(path);

    }

    // Reset tool on "Create new contract"
   $('#ecb-prototype .clear-tool').on('click', function(e) {
        e.preventDefault();
        
        var location = $(this).attr('href'),
        fragment = sessionStorage.getItem('fragment'),
        current_task = sessionStorage.getItem('current_task'),
        task1 =  sessionStorage.getItem('task1'),
        task2 =sessionStorage.getItem('task2'),
        task3 = sessionStorage.getItem('task3'),
        task4 = sessionStorage.getItem('task4');
        
        sessionStorage.clear();

        if(fragment) {
            sessionStorage.setItem('fragment', fragment);
        };
        if (current_task) {
            sessionStorage.setItem('current_task', current_task);
        }
        if (task1) {
            sessionStorage.setItem('task1', task1);
        }
        if (task2) {
            sessionStorage.setItem('task2', task2);
        }
        if (task3) {
            sessionStorage.setItem('task3', task3);
        }
        if (task4) {
            sessionStorage.setItem('task4', task4);
        }
        sessionStorage.setItem('ecb-link-clicked','true');

        window.location = location;
    });

    // Sticky stepped nav behaviour
    if ($('#ecb-prototype .stepped-navigation-wrapper').length) {

        var window_width = window.innerWidth,
            sticky_position;

        if (window_width <= 768) {
            sticky_position = $('.stepped-navigation-wrapper').offset();
        } else {
            sticky_position = $('.stepped-navigation-wrapper .stepped-navigation-wrapper').offset();
        }

        $(window).scroll(function () {
            if ($(window).scrollTop() > sticky_position.top) {
                $('#page-header').addClass('fixed');
                $('.page-content').addClass('fixed');
            } else {
                $('#page-header').removeClass('fixed');
                $('.page-content').removeClass('fixed');
            }
        });
    }
    
    // Variables to store multiple contracts
    if($('#ecb-prototype').length) {
        var contracts = JSON.parse(localStorage.getItem('contracts'));
        if (!contracts) {   
            contracts = {
                contract0 : {},
                contract1 : {},
                contract2 : {},
                contract3 : {},
                contract4 : {}
            };
        };
        console.log(contracts);

        var current_contract = localStorage.getItem('current contract');
        if (!current_contract) {   
            current_contract = "contract0";
        };
        //console.log('current contract: ' + current_contract);
    }

    // !!! Populating clause boxes with user answers after input is in bga-scripts.js
    

    // Function to save individual response to contracts object
    var save_response_to_contracts = function(current_contract, input_field, input_value){
        contracts[current_contract][input_field] = input_value;
        localStorage.setItem('contracts', JSON.stringify(contracts));
    };

    // Save text input & select answers and re-populate on page load
    $('#ecb-prototype input[type=text], #ecb-prototype select').on('change', function () {
        var input_field = $(this).attr('id'),
        input_value = $(this).val();
        console.log(input_value);

        if ($(this).hasClass('optional-clause') && !input_value) {
            input_value = $(this).attr('data-value');
            console.log(input_value);
            save_response_to_contracts(current_contract, input_field, '');
        } else {
            save_response_to_contracts(current_contract, input_field, input_value);
        }
    });

    var populate_inputs_and_selects = function () {
        $('#ecb-prototype input[type="text"], #ecb-prototype select').each(function(){ 
            var input_field = $(this).attr('id'),
            input_value = contracts[current_contract][input_field];
            
            if (input_value) {
                $(this).val(input_value);
                $('.clause-box span[data-answer="' + input_field +'"]').parents('.clause-box').addClass('added');
            };
        });
    };
    populate_inputs_and_selects();
    
    // Save checkbox answers and re-populate on page load
    
    $('#ecb-prototype input[type=checkbox]').on('change', function () {
        
        // Checkboxes to include optional clauses
        if ($(this).parents('.clause-box')) {
            
            var input_checkbox = $(this).attr('id'),
            input_field = input_checkbox.substring(0, input_checkbox.length - 7),
            input_value = contracts[current_contract][input_field],
            original_text = $('input#' + input_field).attr('data-value');

            if ($(this).is(":checked")) {
                save_response_to_contracts(current_contract, input_checkbox, 'checked');
                $('span.' + input_field).text(input_value);

            } else {
                save_response_to_contracts(current_contract, input_checkbox, "");
                $('span.' + input_field).text(original_text);
            }
        }

    });
    
    var populate_checkboxes = function () {
        $('#ecb-prototype input[type="checkbox"]').each(function(){
            var input_field = $(this).attr('id'),
            input_value = contracts[current_contract][input_field];
            
            if (input_value) {
                $(this).prop('checked', true);
                $('.clause-box span[data-answer="' + input_field +'"]').parents('.clause-box').addClass('added');
            };
        });
    };
    populate_checkboxes();
    

    // Save radio answers and re-populate on page load
    $('#ecb-prototype input[type=radio]').on('change', function () {
        var input_field = $(this).parents('.radios').attr('id');
            input_value = $(this).attr('data-value');
       
        save_response_to_contracts(current_contract, input_field, input_value);
    });
    var populate_radios = function (){
        $('#ecb-prototype input[type="radio"]').each(function(){
            var input_field = $(this).parents('.radios').attr('id'),
            input_value = contracts[current_contract][input_field];

            if (input_value) {
                $('input[data-value="' + input_value + '"]').prop('checked', true);
                $('.clause-box span[data-answer="' + input_field +'"]').text(input_value).parents('.clause-box').addClass('added');
            };

        });
    };
    populate_radios();

    
    // Save dynamic list response and re-populate on page load
    $('.clause-box-dynamic-list li').on('click', function () {
        var input_field = $(this).parents('ul').attr('id'),
        input_value = $(this).text();
        save_response_to_contracts(current_contract, input_field, input_value);
    });

    $('#ecb-prototype input.dynamic-list-input').each(function(){
        var input_field = $(this).attr('data-list'),
            input_value = contracts[current_contract][input_field];
            
            if (input_value) {
                $(this).val(input_value);
                //$('.clause-box.' + input_field).addClass('added').find('.component-text span').text(input_value);
                $('.clause-box span[data-answer="' + input_field +'"]').text(input_value).parents('.clause-box').addClass('added');
            };
    });


    // Textareas
    $('#ecb-prototype textarea').on('blur', function(){  
        var input_field = $(this).attr('id'),
            input_value = $(this).val();
        save_response_to_contracts(current_contract, input_field, input_value);
        
        if (input_value) {
        $('.clause-box .' + input_field).empty().append('<strong class="mb-4">' + input_value + '</strong>');
        } else {
            $('.clause-box .' + input_field).empty();
        }
    });
    
    var populate_textareas = function(){
        $('#ecb-prototype textarea').each(function(){
            var input_field = $(this).attr('id'),
            input_value = contracts[current_contract][input_field]; 
            
            if (input_value) {
                $('.clause-box .' + input_field).empty().append('<strong class="mb-4">' + input_value + '</strong>');
                $('textarea#'+ input_field).val(input_value);
                } else {
                    $('textarea#'+ input_field).val("");
                    $('.clause-box .' + input_field).empty();
                }
        });
    };  
    populate_textareas();

    // Populate clause boxes with answers on page reload
    $('.clause-box span').each(function(){
        var answer = contracts[current_contract][$(this).attr('data-answer')];
        $(this).text(answer);

    });

    // Change optional tags to 'included' if they have been added by the user.
    $('.clause-box .tag span').each(function(){
        if ($(this).parents('.clause-box').hasClass('added')) {
            $(this).text('Included');
        }
    });


    // Change PAY UNITS next to input on radio button selection (pay page)
    if ($('#ecb-prototype .pay-unit').length) {
        var pay_units = contracts[current_contract]['pay-rate-units'];

        console.log('pay units');
        if (pay_units) {
            $('#ecb-prototype .pay-unit').text(pay_units);
        }
    }
    $('#ecb-prototype #pay-rate-units input').on('change', function () {
        var pay_text = $(this).attr('data-value');
        $('.pay-unit').text(pay_text);
        });
    

    // Duties update textarea based on radio selection.
    $('#ecb-prototype #duties input[type=radio]').on('change', function () {
        if ($(this).hasClass('dynamic-hide')) {
            $(this).parents('.question-section').find('.clause-box .textarea-input').text('');
            save_response_to_contracts(current_contract, 'duties-textarea', '');
        } else if ($(this).hasClass('dynamic-show')) {
            var textarea_input = $('textarea#duties-textarea').val()
            $(this).parents('.question-section').find('.clause-box .textarea-input').empty().append('<strong class="mb-4">' + textarea_input + '</strong>');
            save_response_to_contracts(current_contract, 'duties-textarea', textarea_input);
        }
    });
    // Workplace update clause box with workplace
    $('#ecb-prototype button.workplace').on('click', function(){
        var street = contracts[current_contract].street1,
        city = contracts[current_contract].city1,
        state = contracts[current_contract].state1,
        postcode = contracts[current_contract].postcode1;

        $('.clause-box .address1').empty().append('<p class="mb-0"><strong>'+street+'</strong></p><p class="mb-0"><strong>'+city+'</strong></p><p class="mb-0"><strong>'+state+'</strong></p><p><strong>'+postcode+'</strong></p>');
    }); 
    $('#ecb-prototype #workplace input[type=radio]').on('change', function () {
        if ($(this).hasClass('dynamic-hide')) {
            $('.clause-box .address1').addClass('d-none');
            $('.clause-box .no-answer').removeClass('d-none');

        } else {
            $('.clause-box .address1').removeClass('d-none');
            $('.clause-box .no-answer').addClass('d-none');
        }
    });
    // Workplace repopulate on page load
    if ($('.clause-box.workplace').length) {
        if (contracts[current_contract]['workplace'] == 'workplace-now') {
            var street = contracts[current_contract].street1,
            city = contracts[current_contract].city1,
            state = contracts[current_contract].state1,
            postcode = contracts[current_contract].postcode1;

            $('.clause-box .address1').empty().append('<p class="mb-0"><strong>'+street+'</strong></p><p class="mb-0"><strong>'+city+'</strong></p><p class="mb-0"><strong>'+state+'</strong></p><p><strong>'+postcode+'</strong></p>');
        }
    }


    // Show hide part two of dynamic sections.
    $('#ecb-prototype .dynamic-hide').on('click', function () {
        $(this).parents('.question-section').find('.dynamic-display').addClass('d-none');
    });
    $('#ecb-prototype .dynamic-show').on('click', function () {
        $(this).parents('.question-section').find('.dynamic-display').removeClass('d-none');
    });
    $('#ecb-prototype .dynamic-toggle').on('click', function () {
        $(this).parents('.question-section').find('.dynamic-display').toggleClass('d-none');
    });

    var display_dynamic_on_load = function () {
        $("#ecb-prototype input[type=radio].dynamic-show").each(function(){
            if ($(this).is(':checked')) {
                $(this).parents('.question-section').find('.dynamic-display').removeClass('d-none');
            }
        });
        $("#ecb-prototype input.dynamic-toggle").each(function(){
            var input_field = $(this).attr('id');
                input_field = input_field.substring(0, input_field.length - 7);

                var input_value = contracts[current_contract][input_field];
    
            if ($(this).is(':checked')) {
                $(this).parents('.question-section').find('.dynamic-display').removeClass('d-none');
                $('.clause-box span.' + input_field).text(input_value);
            }
        });
           
    };
    display_dynamic_on_load();



  
    // Populate edit boxes on review page with user answers
    if ($('.review-page').length) {
        
        $('.results-edit-answers-component.dynamic .answer').each(function () {
            var id = $(this).attr('id');
            answer_text = contracts[current_contract][id];
            $(this).text(answer_text);
        });

        $('.results-edit-answers-component.optional').each(function () {
            var id = $(this).attr('id');
            answer_text = contracts[current_contract][id];

            if (answer_text) {
                $(this).removeClass('d-none');
                $('.answer#'+id).text(answer_text);
            }
        });
        
        // Add duties description
        if( contracts[current_contract]['duties-textarea']) {
            $('.results-edit-answers-component .duties-textarea').append('<strong class="mb-4">' + contracts[current_contract]['duties-textarea'] + '</strong>')
        }
        // Add workplace
        if( contracts[current_contract]['workplace'] == 'workplace-now') {
            var street = contracts[current_contract].street1,
            city = contracts[current_contract].city1,
            state = contracts[current_contract].state1,
            postcode = contracts[current_contract].postcode1;

            $('.results-edit-answers-component .address1').append('<p class="mb-0"><strong>'+street+'</strong></p><p class="mb-0"><strong>'+city+'</strong></p><p class="mb-0"><strong>'+state+'</strong></p><p><strong>'+postcode+'</strong></p>');
        } else {
            $('.results-edit-answers-component .address1').append('<p><strong>[Workplace address]</strong></p>');
        };


    }

    

    // Track button clicks with URL fragments
    /*
    $('#verify-btn').on('click', function(){
        if (sessionStorage.current_task == "task1") {
            set_fragment("T1-email");
        }
    });
 
    $('#ecb-prototype .stepped-navigation .step').on('click', function(e){
       
        if ($(this).hasClass('active')) {
            e.preventDefault();
        } else {
            e.preventDefault();
            sessionStorage.setItem('ecb-link-clicked','true');
            var href = $(this).attr('href');

            if (sessionStorage.current_task == "task2") {
                set_fragment("T2-nav"); 
            } else if (sessionStorage.current_task == "task4") {
                set_fragment("T4-nav");
            } 
            
            window.location = href;
        }

    });

    $('.ecb-button-group .prev, .ecb-button-group .next').on('click', function(e){     
        e.preventDefault();
        sessionStorage.setItem('ecb-link-clicked','true'); 
        var href = $(this).attr('href');

        if (sessionStorage.current_task == "task2") {
            set_fragment("T2-bottom"); 
        } else if (sessionStorage.current_task == "task4") {
            set_fragment("T4-bottom"); 
        }
        window.location = href

    });


    $('.checklist-item-title, .checklist-toggle').on('click', function(){
        if (sessionStorage.current_task == "task3") {
            set_fragment("T3-openitem");
        }
    });

    $('.new-contract').on('click', function(e){     
        e.preventDefault();
        sessionStorage.setItem('ecb-link-clicked','true');

        if (sessionStorage.current_task == "task4") {
            set_fragment("T4-createbtn");
        }
    });

    $('.edit-btn').on('click', function(){
        e.preventDefault();
        sessionStorage.setItem('ecb-link-clicked','true');
        var href = $(this).attr('href');
        window.location = href
    });
    */

    // On page unload add page location to sessionStorage in 'prev_location' item
    /*
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
    

}); //End doc ready

// Ensure URL fragments are added to the url (this catches back button clicks that)
/*
window.onhashchange = function() {
    var existing_fragment = sessionStorage.getItem('fragment');
    if (existing_fragment) {
        window.location.hash = existing_fragment;
    };
}
*/