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
    console.log('current contract: ' + current_contract);

    // Function to save individual response to contracts object
    var save_response_to_contracts = function(current_contract, input_field, input_value){
        contracts[current_contract][input_field] = input_value;
        localStorage.setItem('contracts', JSON.stringify(contracts));
    };

    // Save text input & select answers and re-populate on page load
    $('#ecb-prototype input[type=text], #ecb-prototype select').on('change', function () {
        var input_field = $(this).attr('id'),
        input_value = $(this).val();
        save_response_to_contracts(current_contract, input_field, input_value);
    });

    var populate_inputs_and_selects = function () {
        $('input[type="text"], select').each(function(){ 
            var input_field = $(this).attr('id'),
            input_value = contracts[current_contract][input_field];
            
            if (input_value) {
                $(this).val(input_value);
                $('.clause-box.' + input_field).addClass('added').find('.component-text span').text(input_value);
            };

            if (input_field == 'pay-rate') {
                var pay_rate_units = contracts[current_contract]['pay-rate-units-text'];
                console.log(pay_rate_units);
                $('.pay-unit, .pay-units').text(pay_rate_units);
            }
        });
    };
    populate_inputs_and_selects();
    
    // Save checkbox answers and re-populate on page load
    $('#ecb-prototype input[type=checkbox]').on('change', function () {
        var input_field = $(this).attr('id');
        if ($(this).is(":checked")) {
            input_value = $(this).parents('.checkboxes').find('label').text();

            save_response_to_contracts(current_contract, input_field, input_value);
        } else {
            save_response_to_contracts(current_contract, input_field, "");
        }
    });
    var populate_checkboxes = function () {
        $('input[type="checkbox"]').each(function(){
            var input_field = $(this).attr('id'),
            input_value = contracts[current_contract][input_field];
            
            if (input_value) {
                $(this).prop('checked', true);
                $('.clause-box.' + input_field).addClass('added');
            };
        });
    };
    populate_checkboxes();


    // Save radio answers and re-populate on page load
    $('#ecb-prototype input[type=radio]').on('change', function () {
        var input_field = $(this).parents('.radios').attr('id'),
            input_value = $(this).attr('id');
            field_text = $(this).attr('data-value');
       
        save_response_to_contracts(current_contract, input_field, input_value);
        save_response_to_contracts(current_contract, input_field + '-text', field_text);
    });
    var populate_radios = function (){
        $('input[type="radio"]').each(function(){
            var input_field = $(this).parents('.radios').attr('id'),
            input_value = contracts[current_contract][input_field],
            field_text = contracts[current_contract][input_field + '-text'];

            if (input_value) {
                $('#' + input_value).prop('checked', true);
                $('.clause-box.' + input_field).addClass('added').find('.component-text span').text(field_text);
            };

        });
    };
    populate_radios();

    // Change PAY UNITS on radio button selection (pay page)
    $('#ecb-prototype #pay-rate-units input').on('change', function () {
        var pay_text = $(this).attr('data-value');
        $('#pay-rate-units label span').text(pay_text);
        $('.pay-unit').text(pay_text);
        $('.pay-units').text(pay_text);
        });
  
    // Populate edit boxes on review page with user answers
    if ($('.review-page').length) {
        
        $('.results-edit-answers-component.dynamic').each(function () {
            var id = $(this).attr('id');
            answer_text = contracts[current_contract][id];
            $(this).find('.answers span').text(answer_text);

            if (id == 'pay-rate') {
                $('.pay-units').text(contracts[current_contract]['pay-rate-units-text']);
            }
        });

        $('.results-edit-answers-component.optional').each(function () {
            var id = $(this).attr('id');
            answer_text = contracts[current_contract][id];

            if (answer_text) {
                $(this).removeClass('d-none');
            }
        });
        
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