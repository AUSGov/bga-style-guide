/*jshint browser: true, devel: true, jquery: true*/


$(document).ready(function () {

    //ECB REVISED FLOW PROTOTYPE

    // Variables to store multiple contracts
    if($('#ecb-prototype').length) {
        var contracts = JSON.parse(localStorage.getItem('contracts'));
        if (!contracts) {   
            contracts = {
                contracttemp : {}
            };
        };
        console.log(contracts);

        var current_contract = localStorage.getItem('current contract');
        if (!current_contract) {   
            current_contract = "contracttemp";
        };
        console.log(current_contract);
    }
    
    // Function to save individual item to contracts object
    var save_response_to_contracts = function(current_contract, input_field, input_value){   
        if (input_field) {
            contracts[current_contract][input_field] = input_value;
            localStorage.setItem('contracts', JSON.stringify(contracts));
        } 
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

     // Functions to set expiry dates and calulate days to expiry
     var get_date = function(future_day, start_date){ 
        
        var date,
        date_array = [];

        if (start_date === undefined) {
            date = new Date();
        } else {
            date =  new Date(start_date);
        }
        
        date_array.push(date);
        
        date.setDate(date.getDate() + future_day);

        var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        var day = date.getDay(),
            month = date.getMonth();
            year = date.getFullYear();

        var save_date = dayNames[day] + ' ' + day.toString() + ' ' + monthNames[month] + ', ' + year.toString();
        date_array.push(save_date);

        console.log(date_array);
      
        return date_array;
    };
   
    var get_remaining_days = function(expiry_date){
        var date1 = new Date(expiry_date);
        var date2 = new Date();
        var diffTime = Math.abs(date2 - date1);
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        return diffDays;
    };

    // Check is user is returning to a saved contract
    if ( $('#ecb-prototype #page-header.stepped-nav').length ) {
        var returning = localStorage.getItem('returning'),
            expiry = contracts[current_contract]['date str'];
       
        var remaining_days = get_remaining_days(expiry);

        if ( returning == 'true' ) {
            $('#modal-returning, .modal-overlay').addClass('show');
            localStorage.setItem('returning', 'false');
            $('.days-left').text(remaining_days);
        } 
    };

    // Check if user has visited the review page 
    if ( $('#ecb-prototype #page-header.stepped-nav').length ) {
        var review_pg = contracts[current_contract]['nav-step-7'];

        if ( review_pg == 'visited' ) {
           $('a.return-to-review').removeClass('d-none');
        } 
    };

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
        
        if ( $('.obligation-review').length == $('.obligation-review.d-none').length ) {
            $('.obligation-heading').addClass('d-none');
        }

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
    
    

    // SAVING CONTRACT
    // Function to place the temp contract in a permanent contract and resent the temp contract to empty (used in the save process).
    var save_temp_contract = function(){
       
        function countProperties(obj) {
            var count = 0;
        
            for(var prop in obj) {
                if(obj.hasOwnProperty(prop))
                    ++count;
            }
        
            return count;
        }
        
        var contracts_len = countProperties(contracts);

        for (var contract in contracts) {
            if (Object.keys(contracts[contract]) != 0) {
                var contract_num = parseInt(contracts[contract]['contract-number']);

                if (contract_num >= contracts_len) {
                    contracts_len = contract_num + 1;
                }
            }
        }
        
        var new_contract_position = parseInt(contracts_len);

        contracts['contract' + new_contract_position] = Object.assign({}, contracts['contracttemp']);
        contracts['contract' + new_contract_position]['contract-number'] = new_contract_position;
        contracts['contracttemp'] = {};
        localStorage.setItem('contracts', JSON.stringify(contracts));   
        localStorage.setItem('last saved', 'contract' + new_contract_position);  
    };
   

    // Open & close modals
    $("body").on("click", ".modal-trigger", function(){

        var modal = $(this).attr('data-modal'); 
        $('#' + modal).addClass('show');
        $('.modal-overlay').addClass('show');
        
        if ( modal.includes('modal-save') ) { 
            $('#step-save-email-address').addClass('show');
            $('#step-save-verify-email .success-icon').removeClass('show'); 
            $('#step-save-verify-email input').each(function(){
                $(this).val('');
            });
        }

        if ( $(this).hasClass('delete')) {
            $('#modal-delete-contract .confirm-delete').removeClass('d-none');
            $('#modal-delete-contract .success-delete').addClass('d-none');
            
            var contract = $(this).parents('.contract').attr('id'),
            contract_name = contracts[contract]['position-title'];

            if (contract_name) {
            $('#modal-delete-contract .contract-name').text(contract_name);
            } else {
                $('#modal-delete-contract .contract-name').text("");
            }
            $('#modal-delete-contract button').attr('data-contract-num', contract);
        }

        if (modal.includes('new-contract')) {
            if (current_contract != 'contracttemp') {
                $('.not-saved').addClass('d-none');
                $('.already-saved').removeClass('d-none');

                var expiry = contracts[current_contract]['date str']
                days = get_remaining_days(expiry);
                $('.already-saved .days-left').text(days);
            }
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

        if (code == '1234' || code == 'RGAE') {
           
            $('#verify-form[data-id=' + id + '] .number-code').removeClass('error');
            $('#step-save-verify-email[data-id=' + id + '] .loading-animation').addClass('show');
            $(this).prop('disabled', true).addClass('disabled');

            var date_array = get_date(7);
            save_response_to_contracts(current_contract, 'expiry date', date_array[1]);
            save_response_to_contracts(current_contract, 'date str', date_array[0]);
            save_temp_contract(); 
            
            setTimeout(function () { 
                $('#step-save-verify-email[data-id=' + id + '] .loading-animation').removeClass('show');
                $('#step-save-verify-email[data-id=' + id + '] .success-icon').addClass('show');
                $('#step-save-verify-email[data-id=' + id + '] .success-icon .msg').fadeIn( 2000 );  
            }, 400);

            setTimeout(function () {
                $('#step-save-verify-email[data-id=' + id + '] .success-icon .msg').hide();
                $('#step-save-verify-email[data-id=' + id + '] .success-icon').removeClass('show');
                $('#step-save-verify-email[data-id=' + id + '] .loading-animation').addClass('show');
            }, 3000);

            setTimeout(function () {
                localStorage.setItem('current contract', 'contracttemp');
                localStorage.setItem('saved new', 'true');
                window.location = '/bga-style-guide/prototypes/ecb/manage-contracts';
            }, 3200);

        } else {
            $('#verify-form[data-id=' + id + '] .number-code').addClass('error');
        }

    });
    

    // Display contracts on manage contracts page
    var count_contracts = function(contracts){
        contracts_count = [];
       
        for (var contract in contracts) {
            if (Object.keys(contracts[contract]).length != 0) {
                contracts_count.unshift(contract);
            }
        }
        return contracts_count;
    };

    if ($('.page-manage-contracts').length) {
        
        current_contract = 'contracttemp';
        localStorage.setItem('current contract', 'contracttemp');
        
       var new_contract = localStorage.getItem('saved new');

       if (new_contract == 'true') {
            $('.modal-overlay').addClass('show');
            $('#new-contract-notification').addClass('show');
            localStorage.setItem('saved new', '');
        } 
        

        // Show /hide contracts in contact list
        var active_contracts = count_contracts(contracts);
        
        for (var i = 0; i < active_contracts.length; i++) { 
            var position = contracts[active_contracts[i]]['position-title'],
            id = active_contracts[i],
            expiry = contracts[active_contracts[i]]['expiry date'];

            if (!position) {
                position = '';
            }
            if (!expiry) {
                expiry = "in seven days";
            }

            $('.contracts-list').append('<div class="contract" id='+ id +'><div class="contract-details remove-element-padding"><a class="contract-name edit"><span>' + position + '</span> contract</a><p>Expires <span class="expiry">' + expiry + '</span></p></div><div class="contract-actions"><a class="edit">Edit<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.68223 15.516L6.74726 16.451L0.442295 17.9485L1.94069 11.6444L2.83642 10.6702L7.68223 15.516ZM10.6005 2.90609L15.408 7.71352L8.62244 14.4991L3.815 9.69162L10.6005 2.90609ZM13.5136 0.00871828L18.3202 4.81528L16.3822 6.75326L11.5756 1.94669L13.5136 0.00871828Z" fill="#2157AA"/></svg></a><a class="extend modal-trigger" data-modal="modal-extend-deadline">Extend deadline<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18C4.03738 18 0 13.9626 0 9C0 4.03738 4.03738 0 9 0C13.9626 0 18 4.03738 18 9C18 13.9626 13.9626 18 9 18ZM9 2.24975C5.27789 2.24975 2.24975 5.27789 2.24975 9C2.24975 12.7221 5.27789 15.7502 9 15.7502C12.7221 15.7502 15.7502 12.7221 15.7502 9C15.7502 5.27789 12.7221 2.24975 9 2.24975ZM13.4995 11.2497H13.4984H7.87512V5.62538H10.1249V9H13.4995V11.2486V11.2497Z" fill="#2157AA"/></svg></a><a class="delete modal-trigger" data-modal="modal-delete-contract">Delete<svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM3.46 8.88L4.87 7.47L7 9.59L9.12 7.47L10.53 8.88L8.41 11L10.53 13.12L9.12 14.53L7 12.41L4.88 14.53L3.47 13.12L5.59 11L3.46 8.88ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5Z" fill="#2157AA"/></svg></a></div></div>');
        } 
        
        // Show no contracts msg if no contracts are saved.
        if (active_contracts.length == 0) {
            $('.no-contract').removeClass('d-none');
        } else {
            $('.no-contract').addClass('d-none');
        } 

        // Display links to saved contracts
        $('a.contract-name,  a.edit').on('click', function(){
            var steps = ['nav-step-1', 'nav-step-2', 'nav-step-3', 'nav-step-4', 'nav-step-5', 'nav-step-6', 'nav-step-7', 'nav-step-8'];
            var pages = ['position', 'hours', 'pay', 'leave', 'obligations', 'ending-employment', 'review',  'finalise'];
            localStorage.setItem('returning', 'true');

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


        // Delete a saved contract
        $('#delete-contract-btn').on('click', function(){ 
            var deleted_contract = $(this).attr('data-contract-num');

            delete contracts[deleted_contract];

            //for (var item in contracts[deleted_contract]) delete contracts[deleted_contract][item];
            localStorage.setItem('contracts', JSON.stringify(contracts));

            //Set time out for displaying the success message and deleting the contract
            
            setTimeout(function () {
                $('.component-text.confirm-delete').addClass('d-none');
                $('.component-text.success-delete').removeClass('d-none');
                $('.contracts-list #' + deleted_contract).addClass('d-none');
                
                // Display the no contracts msg if there are no contracts left.
                if ( $(".contract:visible").length == 0 ) {
                    $('.no-contract').removeClass('d-none');
                };
               
            }, 400);
        }); 
    } 

    // Extend a saved contract
    $('.extend.modal-trigger').on('click', function(){
        var extended_contract = $(this).parents('.contract').attr('id');
        var date_str = contracts[extended_contract]['date str'];
        var extended_date = get_date(7, date_str);

        $('.new_expiry').text(extended_date[1]);
        $('.contract#' + extended_contract + ' .expiry').text(extended_date[1]);
        save_response_to_contracts(extended_contract, 'date str', extended_date[0]);
        save_response_to_contracts(extended_contract, 'expiry date', extended_date[1]);

    });

    // Set new contract from link on manage contracts page
    $('.ecb_new_contract').on('click', function(e){
        localStorage.setItem('current contract', 'contracttemp');
        window.location.pathname = "/bga-style-guide/prototypes/ecb/landing";
    });

    //Set new contract from 'create new contract' link on finalise page
    $('#save-contract-radios input').on('change', function(){
        var response = $(this).val();

        if (response == 'no') {
            $('.save-no').removeClass('d-none');
            
        } else if (response == 'yes') {
            $('.save-no').addClass('d-none');
            $('#ecb-modal-save').addClass('show');
            $('#modal-new-contract').removeClass('show');
        }
    });


    // Change 'save' component to 'manage contracts' component when user returns to the contract.
    if ( current_contract != 'contracttemp' ) {
        $('#ecb-prototype .save-content').addClass('d-none');
        $('#ecb-prototype .manage-contracts-content').removeClass('d-none');
        $('#ecb-prototype button#ecb-save-exit').addClass('d-none');
        $('#ecb-prototype a#ecb-manage-contracts').removeClass('d-none');
    }
    $('#ecb-manage-contracts').on('click', function(){
        localStorage.setItem('current contract', 'contracttemp');
        contracts['contracttemp'] = {};
        localStorage.setItem('contracts', JSON.stringify(contracts));
        window.location.pathname = "/bga-style-guide/prototypes/ecb/manage-contracts.html";
    });


    // Add position and dates to emails
    if ($('#ecb-prototype.ecb-email').length) {

        var recently_saved = localStorage.getItem('last saved'),
        position = contracts[recently_saved]['position-title'],
        expiry = contracts[recently_saved]['expiry date'],
        date_str = contracts[recently_saved]['date str'];
        
        var expiry_warning = get_date(2);
        var extended_date = get_date(7, date_str);

        $('.expiry_date').text(expiry);
        $('.position').text(position);
        $('.warning_date').text(expiry_warning[1]);
        $('.extended-date').text(extended_date[1]);
    }

   
    // Reset prototype
    $('#reset-prototype').on('click', function(){
        localStorage.clear();

        if ( $('.page-manage-contracts').length ) {
            $('.no-contract').removeClass('d-none');
            $('.contract').addClass('d-none');
        }

        window.location.pathname = "/bga-style-guide/prototypes/ecb/landing.html";
        
    });

}); //End doc ready
