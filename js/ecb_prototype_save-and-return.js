/*jshint browser: true, devel: true, jquery: true*/


$(document).ready(function () {

    //ECB REVISED FLOW PROTOTYPE

    // Variables to store multiple contracts
    if($('#ecb-prototype').length) {
        var contracts = JSON.parse(localStorage.getItem('contracts'));
        if (!contracts) {   
            contracts = {
                contract0 : {},
                contract1 : {},
                contract2 : {},
                contract3 : {},
                contract4 : {},
                contract5 : {},
                contract6 : {},
                contract7 : {},
                contract8 : {},
                contract9 : {}
            };
        };
        console.log(contracts);

        var current_contract = localStorage.getItem('current contract');
        if (!current_contract) {   
            current_contract = "contract0";
        };
    }

    // Function to save individual item to contracts object
    var save_response_to_contracts = function(current_contract, input_field, input_value){
        contracts[current_contract][input_field] = input_value;
        localStorage.setItem('contracts', JSON.stringify(contracts));
    };


    // Stepped nav functionality
    var stepped_nav_functionality = function(path){
        
        var active_step = 'nav-step-' + $('.step-title').attr('data-step'),
        active_number = parseInt($('.step-title').attr('data-step'));

        $('#' + active_step).addClass('active');

        save_response_to_contracts(current_contract, active_step, 'visited');

        var step_titles = ["position.html", "hours.html", "pay.html", "leave.html", "obligations.html", "ending-employment", "review.html", "finalise.html"];

        for (var step = 0; step < step_titles.length; step++) {
            var step_number = step + 1,
                step_str = 'nav-step-' + step_number;
            var state = contracts[current_contract][step_str];

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
            visited_state = contracts[current_contract]['nav-step-'+ step];
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


    // !!! DON'T FORGET - populating clause boxes with user answers after input is in bga-scripts.js

    // Save text input & select answers and re-populate on page load
    $('#ecb-prototype input[type=text], #ecb-prototype select').on('change', function () {
        var input_field = $(this).attr('id'),
        input_value = $(this).val();

        if ($(this).hasClass('optional-clause') && !input_value) {
            input_value = $(this).attr('data-value');
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
                $(this).parents('.clause-box').addClass('added');
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
            $('.clause-box .workplace').removeClass('d-none');

        } else {
            $('.clause-box .address1').removeClass('d-none');
            $('.clause-box .workplace').addClass('d-none');
        }
        $('.clause-box.workplace').addClass('added');
    });
    // Workplace repopulate on page load
    if ($('.clause-box.workplace').length) {
        var workplace_answer = contracts[current_contract]['workplace'];

        if (workplace_answer == 'workplace-now') {
            var street = contracts[current_contract].street1,
            city = contracts[current_contract].city1,
            state = contracts[current_contract].state1,
            postcode = contracts[current_contract].postcode1;

            $('.clause-box .address1').empty().append('<p class="mb-0"><strong>'+street+'</strong></p><p class="mb-0"><strong>'+city+'</strong></p><p class="mb-0"><strong>'+state+'</strong></p><p><strong>'+postcode+'</strong></p>');

            $('.clause-box .workplace').addClass('d-none'); 
            $('.clause-box.workplace').addClass('added');

        }  else if (workplace_answer == '[workplace address]'){
            $('.clause-box .address1').addClass('d-none');
            $('.clause-box.workplace').addClass('added');
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


    // Open & close modals
    $('.modal-trigger').on('click', function () {
        var modal = $(this).attr('data-modal');
        
        if ( modal.includes('modal-save') ) { 
            $('#step-save-email-address').addClass('show');
            $('#step-save-verify-email .success-icon').removeClass('show'); 
            $('#step-save-verify-email input').each(function(){
                $(this).val('');
            });
        } 
    });
    
    // Show hide content within email modal
    $('#step-save-email-address .progress-step').on('click', function () {
        var id = $(this).parents('.step').attr('data-id'),
        email_address = $('#step-save-email-address[data-id=' + id + '] input').val();
        
        $('#step-save-email-address[data-id=' + id + ']').removeClass('show');
        $('#step-save-verify-email[data-id=' + id + ']').addClass('show');
        if ( email_address.length ) {
            $('#step-save-verify-email[data-id=' + id + '] .user-email').text(email_address);
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
   
    
    $('#step-save-verify-email #verify-btn').on('click', function(){
        var code = inputElements.map(({ value }) => value).join(''),
        id = $(this).parents('.step').attr('data-id');

        if (code == '1234' ) {
            $('#verify-form[data-id=' + id + '] .number-code').removeClass('error');
            $('#step-save-verify-email[data-id=' + id + '] .loading-animation').addClass('show');
            $(this).prop('disabled', true).addClass('disabled');
            
            setTimeout(function () {
                
                $('#step-save-verify-email[data-id=' + id + '] .loading-animation').removeClass('show');
                $('#step-save-verify-email[data-id=' + id + '] .success-icon').addClass('show');
                $('#step-save-verify-email[data-id=' + id + '] .success-icon .msg').fadeIn( 2000 );
                
            }, 1000);

            setTimeout(function () {
                $('#step-save-verify-email[data-id=' + id + '] .success-icon .msg').hide();
                $('#step-save-verify-email[data-id=' + id + '] .success-icon').removeClass('show');
                $('#step-save-verify-email[data-id=' + id + '] .loading-animation').addClass('show');
            }, 5000);

            setTimeout(function () {
                localStorage.setItem('current contract', current_contract);
                window.location = '/bga-style-guide/prototypes/ecb/manage-contracts';
            }, 5200);

        } else {
            $('#verify-form[data-id=' + id + '] .number-code').addClass('error');
        }

    });
    
    // Display contracts on manage contracts page

    var count_contracts = function(contracts){
        contracts_count = [];
       
        for (var contract in contracts) {
            if (Object.keys(contracts[contract]).length != 0) {
                contracts_count.push(contract);
            }
        }
        return contracts_count;
    };

    if ($('.page-manage-contracts').length) {
    
        // Show /hide contracts in contact list
        var active_contracts = count_contracts(contracts);

        for (var i = 0; i < active_contracts.length; i++) { 
            var position = contracts[active_contracts[i]]['position-title'];
            $('.contract#' + active_contracts[i]).removeClass('d-none').find('.contract-name span').text(position);
        } 
        
        // Show no contracts msg if no contracts are saved.
        if (active_contracts.length == 0) {
            $('.no-contract').removeClass('d-none');
        } else {
            $('.no-contract').addClass('d-none');
        } 

        // Contract links
        $('a.contract-name,  a.edit').on('click', function(){
            var steps = ['nav-step-1', 'nav-step-2', 'nav-step-3', 'nav-step-4', 'nav-step-5', 'nav-step-6', 'nav-step-7', 'nav-step-8'];

            var pages = ['position', 'hours', 'pay', 'leave', 'obligations', 'ending-employment', 'review',  'finalise'];

            // reset current contract
            var contract = $(this).parents('.contract').attr('id');
            localStorage.setItem('current contract', contract);

            // get furthest page visited in nav and redirect to that page
            var page = 'position';
            for (var j = 0; j < steps.length; j++) {
                var last_step = contracts[contract][steps[j]];
                if (last_step) {
                    page =  pages[j];
                } 
            }
            window.location.pathname = "/bga-style-guide/prototypes/ecb/" + page;
        });
        
    } 

    // Set new contract 
    $('.ecb_new_contract').on('click', function(e){
        var active_contracts = count_contracts(contracts),
        new_contract =  active_contracts.length,
        new_contract = 'contract' + new_contract.toString();
        localStorage.setItem('current contract', new_contract);
        
        window.location.pathname = "/bga-style-guide/prototypes/ecb/landing";
    });
    

}); //End doc ready

