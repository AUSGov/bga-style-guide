/*jshint browser: true, devel: true, jquery: true*/

$(document).ready(function () {

    // Check if page is in ablis prototype
    if ($('#ablis-final-prototype').length) {
        console.log("ablis page - final prototype");
        // Hide empty <p>
        $('p:empty').hide();


        // Dynamic nav default state stored in a variable
        dynamic_nav_default = {
            'step-1': {
                'url': "business-details.html",
                'visited': "yes",
                'completed': ""
            },
            'step-2': {
                'url': "operations.html",
                'visited': "",
                'completed': ""
            },
            'step-3': {
                'url': "products-and-services.html",
                'visited': "",
                'completed': ""
            },
            'step-4': {
                'url': "tax.html",
                'visited': "",
                'completed': ""
            },
            'step-5': {
                'url': "workers.html",
                'visited': "",
                'completed': ""
            },
            'step-6': {
                'url': "buildings-and-land.html",
                'visited': "",
                'completed': ""
            },
            'step-7': {
                'url': "equipment-and-transport.html",
                'visited': "",
                'completed': ""
            },
            'step-8': {
                'url': "public-spaces.html",
                'visited': "",
                'completed': ""
            },
            'step-9': {
                'url': "results.html",
                'visited': "",
                'completed': ""
            },
            'nav-is-set': 'false'
        };
        // Create object to store dynamic nav steps (prototype 1)
        var dynamic_nav = JSON.parse(sessionStorage.getItem('dynamic_nav'));

        if (!dynamic_nav) {
            dynamic_nav = dynamic_nav_default;
        }
        sessionStorage.setItem('dynamic_nav', JSON.stringify(dynamic_nav));

    };


    // Default question responses stored in a variable
    responses_default = {
        "all": "yes",
        "q1": "no",
        "q2": "no",
        "q3": "no",
        "q4": "no",
        "q5": "no",
        "q6": "no",
        "q7": "no",
        "q8": "no",
        "q9": "no",
        "q10": "no",
        "q11": "no",
        "q12": "no",
        "q13": "no",
        "q14": "no",
        "q15": "no",
        "q16": "no",
        "q17": "no",
        "q18": "no",
        "q19": "no",
        "q20": "no",
        "q21": "no",
        "q22": "no",
        "q23": "no",
        "q24": "no",
        "q25": "no",
        "q26": "no",
        "q27": "no",
        "q28": "no",
        "q29": "no",
        "q30": "no",
        "q31": "no",
        "q32": "no",
        "q33": "no",
        "q34": "no",
        "q35": "no",
        "q36": "no",
        "q37": "no",
        "q38": "no",
        "q39": "no",
        "q40": "no",
        "q41": "no",
        "q42": "no",
        "q43": "no",
        "q44": "no",
        "q45": "no",
        "q46": "no",
        "q47": "no",
        "q48": "no",
        "q49": "no",
        "q50": "no"
    };

    // Create question map and store in sessionStorage
    var ablis_questions = JSON.parse(sessionStorage.getItem('ablis_questions'));
    if (!ablis_questions) {
        ablis_questions = {
            location:[],
            'council-1': "",
            'council-2':"",
            primary_activity:[],
            industry: "",
            structure: "",
            contact_details: "",
            responses: responses_default,
            answered: {}
        };
        sessionStorage.setItem('ablis_questions', JSON.stringify(ablis_questions));
    };

    // Reset tool on start now click 
    $('#start-now, #start-now-mobile').on('click', function () {
        sessionStorage.clear();
    });


    //DYNAMIC NAV
    // Show/hide mobile dynamic nav on accordion click
    $(document).on('click', '.ablis-dynamic-nav-wrapper button.nav-is-set', function(){
        $(this).toggleClass('open');
        $('#ablis-dynamic-nav').slideToggle(400);
    });

    // Mobile nav - setup accordion
    var set_mobile_nav_accordion = function(){
        console.log('setting up mobile nav');

        var step = $('body').attr('data-step'),
            step_title = $('#ablis-dynamic-nav li[data-step="' +  step + '"] a').text(),
            step_num = $('#ablis-dynamic-nav li[data-step="' +  step + '"] .list-number').text();

        $('.ablis-dynamic-nav-wrapper .mobile-show .step-number').text(step_num);
        $('.ablis-dynamic-nav-wrapper .mobile-show .step-name strong').text(step_title);


        //Check is nav is set (answers on business details page have been completed and 'next' button has been clicked)
        if (dynamic_nav['nav-is-set'] == "true" ) {
            $('.ablis-dynamic-nav-wrapper .mobile-show').addClass('nav-is-set');
        
        } else {
            $('.ablis-dynamic-nav-wrapper .mobile-show').removeClass('nav-is-set');
        }
        $('.ablis-dynamic-nav-wrapper .mobile-show p.step-wrapper').removeClass('d-none');
    };

    // Dynamic nav functionality - setup nav states
    var set_dynamic_nav = function(){

        // Add classes and urls to dynamic nav links
        for (var item in dynamic_nav) {
            // check if item is current page and add active class
            if ( $('body').hasClass(item) ) {
                $('#ablis-dynamic-nav li.' + item).addClass('active');
            }

            // Add visited and completed states along with urls
            if (dynamic_nav[item]['visited'] == 'yes')  {
                $('#ablis-dynamic-nav li.' + item).addClass('visited');
                $('#ablis-dynamic-nav li.' + item).find('a').attr('href', dynamic_nav[item]['url']);
            } else {

            }
            if (dynamic_nav[item]['completed'] == 'yes') {
                $('#ablis-dynamic-nav li.' + item).addClass('completed');
            }
            
        }

        // Display/hide dynamic steps in the nav on page load
        // if business details are completed but the nav hasn't been set yet
        if ( (dynamic_nav['step-1']['completed'] == 'yes') && dynamic_nav['nav-is-set'] == 'false' ) { 
            $('#ablis-dynamic-nav .dynamic-steps').removeClass('d-none');

            dynamic_nav["nav-is-set"] = 'true';
            sessionStorage.setItem('dynamic_nav', JSON.stringify(dynamic_nav));

            $('#ablis-dynamic-nav .dynamic-steps').removeClass('d-none').hide();
            
            setTimeout(function () {
                $('#ablis-dynamic-nav .static-step').removeClass('initial-state');
                $('#ablis-dynamic-nav .dynamic-steps').slideDown(800);
            }, 600);
            
        } 
        // if the nav has been set
        else if ( dynamic_nav['nav-is-set'] == 'true') { 
            console.log('nav is set');
            $('#ablis-dynamic-nav .static-step').removeClass('initial-state');
            $('#ablis-dynamic-nav .dynamic-steps').removeClass('d-none');
            $('.ablis-dynamic-nav-wrapper .mobile-show').addClass('nav-is-set');
        }


    };

    if ('#ablis-dynamic-nav'.length) {
        set_dynamic_nav();
        set_mobile_nav_accordion();
    }

    var remove_nav_steps = function(){
        console.log('removing steps');

        dynamic_nav = dynamic_nav_default;
        sessionStorage.setItem('dynamic_nav', JSON.stringify(dynamic_nav));

        set_mobile_nav_accordion();

        ablis_questions['responses'] = responses_default;
        ablis_questions['answered'] =  {};
        sessionStorage.setItem('ablis_questions', JSON.stringify(ablis_questions));

        $('#ablis-dynamic-nav .static-step').addClass('initial-state');

        $('#ablis-dynamic-nav .dynamic-steps').slideUp(800, function() {
            $(this).css('display', 'none');
        });
        
        $('#ablis-dynamic-nav .static-step li').removeClass('completed visited');

        
    };
   

    // Update nav page visited state on page load
    if ( $('#ablis-dynamic-nav').length ) {
        var step = $('body').attr('data-step');
        dynamic_nav[step]['visited'] = 'yes';
        sessionStorage.setItem('dynamic_nav', JSON.stringify(dynamic_nav));

    }

    // Validate questions are answered and record page as completed
    $('.next-btn.validate_page').on('click', function (e) {
        e.preventDefault();

        console.log('validating page');
        var radios_validated = false,
            select_validated = false,
            input_validated = false;

        // Radio button validation & set results-btn destination
        if ($('.radios.required:visible').length > 0) {
            var q_count = $('.radios.required:visible').length,
                validated_count = 0;

            $('.radios.required:visible').each(function () {
                var q_name = $(this).parents('.radio-wrapper').attr('id');
                console.log(q_name);

                if ($('input[name="' + q_name + '"]:checked').length > 0) {
                    console.log('valid radio');
                    validated_count++;
                    $(this).parents('.form-element-wrapper').removeClass('error');
                    $(this).parents('.form-element-wrapper').next('.error-message').addClass('d-none');
                } else {
                    console.log('invalid radio');
                    $(this).parents('.form-element-wrapper').addClass('error');
                    $(this).parents('.form-element-wrapper').next('.error-message').removeClass('d-none');
                }
            });

            if (q_count == validated_count) {
                radios_validated = true;
            }
        } else {
            radios_validated = true;
        }

        // Select validation
        if ($('select.required:visible').length > 0) {

            var select_count = $('select.required:visible').length,
                selected_count = 0;

            $('select.required:visible').each(function () {
                if ($(this).val()) {
                    selected_count++;
                    $(this).parents('.form-element-wrapper').removeClass('error');
                    $(this).parents('.form-element-wrapper').next('.error-message').addClass('d-none');
                } else {
                    $(this).parents('.form-element-wrapper').addClass('error');
                    $(this).parents('.form-element-wrapper').next('.error-message').removeClass('d-none');
                }
            });

            if (select_count == selected_count) {
                select_validated = true;
            } else {
                select_validated = false;
            }

        } else {
            select_validated = true;
        }

        // Text input (dynamic lists)
        if ($('input.required').length > 0) {
            var input_count = $('input.required').length,
                valid_count = 0;

            $('input.required').each(function () {
                var selected_count = $(this).parents('.input-wrapper').find('.ablis-selected-option').length;
                console.log(selected_count);
                
                if (selected_count == 0) {
                    $(this).parents('.form-element-wrapper').addClass('error');
                    $(this).parents('.form-element-wrapper').next('.error-message').removeClass('d-none');
                } else {
                    valid_count++;
                    $(this).parents('.form-element-wrapper').removeClass('error');
                    $(this).parents('.form-element-wrapper').next('.error-message').addClass('d-none');
                }
            });

            if (input_count == valid_count) {
                input_validated = true;
            } else {
                input_validated = false;
            }
        } else {
            input_validated = true;
        }


        // Reset button destination
        var destination = $(this).attr('href');

        if (radios_validated == true && select_validated == true && input_validated == true) {
            var step = $('body').attr('data-step');
            console.log(step);
            dynamic_nav[step]['completed'] = 'yes';
            sessionStorage.setItem('dynamic_nav', JSON.stringify(dynamic_nav));
            
            window.location = destination;
        } else {
            console.log('not validated');
            $('html, body').animate({
                scrollTop: $(".error:first-of-type").offset().top - 24
            }, 400);
        }

    });
    

    // SET CONTACT DETAILS IN FOOTER
    update_contact = function (state) {
        $('.contact-details .contact-item').each(function () {
            $(this).addClass('d-none');
        });
        $('.state-wrapper').removeClass('d-none');
        $('.contact-details .contact-item.' + state).removeClass('d-none');
    };

    $('.state-contact select').on('change', function () {
        var state = $(this).val();
        update_contact(state);

        ablis_questions['contact_details'] = state;
        sessionStorage.setItem('ablis_questions', JSON.stringify(ablis_questions));
    });

    // Populate footer contact details on page load if location previously set.
    if (ablis_questions['contact_details'] != "") {
        var state = ablis_questions['contact_details'];

        setTimeout(function () {
            $('.state-contact select').val(state);
            update_contact(state);
        }, 500);
    }


    // STORE QUESTION RESPONSES ON CATEGORY PAGES
    $('.question input[type=radio]').on('change', function () {
        var question = $(this).parents('.question').attr('id');
        response = $(this).attr('data-value');

        ablis_questions['responses'][question] = response;
        ablis_questions['answered'][question] = 'true';
        sessionStorage.setItem('ablis_questions', JSON.stringify(ablis_questions));

        $(this).parents('.form-element-wrapper').next('.error-message').addClass('d-none');

    });

    $('.council-question input[type=radio]').on('change', function () {
        var q_parent = $(this).parents('.council-question').attr('id'),
        council = $(this).attr('data-value');
        console.log(q_parent);
        console.log(council);

        ablis_questions[q_parent] = council;
        sessionStorage.setItem('ablis_questions', JSON.stringify(ablis_questions));
    });

    // SHOW / HIDE DYNAMIC QUESTIONS
    $('.dynamic-trigger input[type=radio]').on('change', function () {
        var response = $(this).attr('data-value'),
        dynamic_section = $(this).parents('.dynamic-trigger').next('.dynamic-section');

            if (response == "yes") {
                dynamic_section.removeClass('d-none');
            } else {
                dynamic_section.addClass('d-none');
                dynamic_section.find('.question').each(function(){
                    var question = $(this).attr('id');
                    ablis_questions['responses'][question] = 'no';
                    delete ablis_questions['answered'][question];

                    sessionStorage.setItem('ablis_questions', JSON.stringify(ablis_questions));
                });
            }
    });


    //Re-populate category page answers on page load
    //Re-populate answers on page load
    if ($('.question-page').length) {
        console.log('question page');

        $('.question').each(function(){
            var question = $(this).attr('id'),
            response = ablis_questions['answered'][question],
            dynamic_trigger;

            if ($(this).hasClass('dynamic-trigger')) {
                dynamic_trigger = true;
            }
            
            if (response) {
                response = ablis_questions['responses'][question];
                $(this).find('input[data-value='+response+']').prop('checked', true);

                if (dynamic_trigger == true) {
                    if (response == 'yes') {
                        $(this).next('.dynamic-section').removeClass('d-none');
                    } else if (response == 'no') {
                        $(this).next('.dynamic-section').addClass('d-none');
                    }
                }
                
            }
        });

        $("select").each(function(){
            var id = $(this).attr('id'),
            selection = ablis_questions[id];
            $(this).val(selection);

        }); 
        
        $('.dynamic-list-ablis.multi-select input').each(function () {
            var parent_list = $(this).parents('.dynamic-list-ablis'),
                list_id = parent_list.find('ul').attr('id'),
                list_options = ablis_questions[list_id];
                selected_item = '<div data-value="' +list_options[i] + '" class="ablis-selected-option"><button class="selected-remove">Remove</button><p>' + list_options[i] +'</p></div>';

            for (var i=0; i < list_options.length; i++) {

                var selected_item  = $('<div data-value="' +list_options[i] + '" class="ablis-selected-option"><button class="selected-remove">Remove</button><p>' + list_options[i] +'</p></div>');

                var last_child = parent_list.find('.input-wrapper').children().last();

                if (last_child.length) {
                    selected_item.insertBefore(last_child);
                }
            }
        });

        if (ablis_questions['location'].includes('Melbourne, VIC, 3000')) {
            $('.council-1-wrapper').removeClass('d-none');

            var council = ablis_questions['council-1'];
            $('#council-1-' + council).prop('checked', true);

        } 
        if (ablis_questions['location'].includes('Perth, WA, 6000')) {
            $('.council-2-wrapper').removeClass('d-none');

            var council = ablis_questions['council-2'];
            $('#council-2-' + council).prop('checked', true);
        }
    }


    // BUSINESS DETAIL QUESTIONS
    // dynamic lists (including setting location)
    $('.dynamic-list-ablis.multi-select input').on('input', function () {
        var input = $(this).val(),
            input_len = input.length,
            input_lower_case = input.toLowerCase(),
            list_id = $(this).parents('.list-wrapper').find('ul').attr('id');

        if (input) {
            $('ul#' + list_id).addClass('open');
            $(this).parents('.dynamic-list-ablis').find('a#list-close').addClass('show');

            var list_len = $('ul#' + list_id + ' li').length;
            var hidden_count = 0;

            $('ul#' + list_id + ' li').each(function () {
                var str = $(this).text(),
                    str_lower_case = str.toLowerCase(),
                    str_start_pos = str_lower_case.indexOf(input_lower_case),
                    str_end_pos = str_start_pos + input_len;


                if (str_lower_case.includes(input_lower_case)) {
                    $(this).removeClass('hidden');

                    var case_str = str.slice(str_start_pos, str_end_pos),
                        str_1 = str.slice(0, str_start_pos),
                        str_2 = str.slice(str_end_pos);

                    var new_str = str_1 + "<span>" + case_str + "</span>" + str_2;

                    $(this).html(new_str);
                } else {
                    $(this).find("span").contents().unwrap();
                    $(this).addClass('hidden');
                    hidden_count++;
                }
            });

            $('ul#' + list_id + ' li.related, ul#' + list_id + ' p.related').each(function () {
                $(this).removeClass('hidden');
            });

        } else {
            $('ul#' + list_id).removeClass('open');
            $(this).parents('.dynamic-list-ablis').find('a#list-close').removeClass('show');
        }

        if (list_len == hidden_count) {
            $('ul#' + list_id + ' li.related,  ul#' + list_id + ' p.related').each(function () {
                $(this).addClass('hidden');
            });
            $(this).parents('.dynamic-list-ablis').find('.no-result').addClass('show');
        } else {
            $(this).parents('.dynamic-list-ablis').find('.no-result').removeClass('show');
        }
        if (!list_len) {
            $(this).parents('.dynamic-list-ablis').find('.no-result').removeClass('show');
        };
    });

    $('.dynamic-list-ablis.multi-select li').on('click', function () {
        $(this).parents('.dynamic-list-ablis').find('.error-message').addClass('d-none');
        $(this).parents('.form-element-wrapper').removeClass('error');


        var list_item = $(this).text(),
            parent_list = $(this).parents('ul').attr('id'),
            parent_wrapper = $(this).parents('.dynamic-list-ablis');

        ablis_questions[parent_list].push(list_item);
        sessionStorage.setItem('ablis_questions', JSON.stringify(ablis_questions));


        // Set state details in footer and show / hide council questions
        if (parent_list.includes('location')) {
            
            console.log(ablis_questions['contact_details']);

            var states = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];
            var selected_state = states.find(value => list_item.includes(value));
            
            $('.state-wrapper').removeClass('d-none');
            $('.state-contact select').val(selected_state);
            update_contact(selected_state);
            ablis_questions['contact_details'] = selected_state;
           
            if ( list_item == 'Melbourne, VIC, 3000' ) {
                $('.council-1-wrapper').removeClass('d-none');
            } else if ( list_item == 'Perth, WA, 6000' ) {
                $('.council-2-wrapper').removeClass('d-none');
                //ablis_questions['council-2'] = list_item;
            }

            sessionStorage.setItem('ablis_questions', JSON.stringify(ablis_questions));

        };

        


        // Add selected option to input-wrapper
        var selected_item  = $('<div data-value="' + list_item + '" class="ablis-selected-option"><button class="selected-remove">Remove</button><p>' + list_item +'</p></div>');

        var last_child = parent_wrapper.find('.input-wrapper').children().last();
    
        if (last_child.length) {
            selected_item.insertBefore(last_child);
        }

        $('.dynamic-list-ablis li.hidden').each(function () {
            $(this).removeClass('hidden');
        });
        $(this).parents('ul').removeClass('open');

        parent_wrapper.find('input').val('').focus();

    });

    $(document).on('click', '.dynamic-list-ablis.multi-select .selected-remove', function () {
        var parent_list = $(this).parents('.list-wrapper').find('ul').attr('id'),
            selected_item = $(this).parents('.ablis-selected-option').find('p').text(),
            selected_options = ablis_questions[parent_list];
        
        selected_options = selected_options.filter(item => item !== selected_item);

        $(this).parents('.ablis-selected-option').remove();
        ablis_questions[parent_list] = selected_options;

        if ( selected_item == "Melbourne, VIC, 3000" ) {
            ablis_questions['council-1'] = "";
            $('.council-1-wrapper').addClass('d-none');
            $('#council-1 input[type="radio"]').prop('checked', false);
        } else if ( selected_item == "Perth, WA, 6000" ) {
            ablis_questions['council-2'] = "";
            $('.council-2-wrapper').addClass('d-none');
            $('#council-2 input[type="radio"]').prop('checked', false);
        };

        sessionStorage.setItem('ablis_questions', JSON.stringify(ablis_questions));

        if ( $('body.step-1').length ) {
            remove_nav_steps();
        };




    });


    // Reset dynamic nav on input change
    $('.dynamic-list-ablis.multi-select input').on('change', function (){
        if ( $('body.step-1').length ) {
            remove_nav_steps();
        };
    
    });

    // Store answers from dropdown selects
    $("select").on('change', function () {
        $(this).parents('.form-element-wrapper').removeClass('error');
        $(this).parents('.form-element-wrapper').next('.error-message').addClass('d-none');

        var id = $(this).attr('id');
        var selection = $(this).val();

        ablis_questions[id] = selection;
        sessionStorage.setItem('ablis_questions', JSON.stringify(ablis_questions));

        if ( $('body.step-1').length ) {
            console.log('changing');
            remove_nav_steps();
        };
    });

   


    //FUNCTIONS FOR SEARCH TILES ON RESULTS AND KEYWORD SEARCH PAGES

    // Set heights for descriptions in result tiles using the height of a cloned element 
    var set_description_heights = function (wrapper) {
        $('.serviceSection').each(function () {
            $(this).find(':first-child').find(':first-child').addClass('first-element');

            var clone = $(this).clone().css({ 'padding-left': '48px', 'padding-right': '40px' }).appendTo(wrapper).addClass('clone');
            var first_elem = clone.find(':first-child').find(':first-child');
            var first_elem_height = first_elem.height();
            $(this).height(first_elem_height);

            if ($(this).find(':first-child').children().length == 1) {
                $(this).parents('.result-content').find('.expand').addClass('d-none');
            }

            clone.remove();
        });
    };

    // Open / close descriptions in result tiles
    var open_close_descriptions = function (result_tile) {
        var description_wrapper = result_tile.parents('.description').find('.serviceSection'),
            first_elem = description_wrapper.find('.first-element');
        first_elem_height = first_elem.height();

        if (description_wrapper.height() == first_elem.height()) {
            description_wrapper.height('auto');
            result_tile.text('less...');
        } else {
            description_wrapper.height(first_elem_height);
            result_tile.text('more...');
        }
    };




    // RESULT PAGES ------------------------------------------------------
    if ($('.results-page').length) {
        console.log('results page');
        $('.state-wrapper').removeClass('d-none');

        var ablis_tasks = JSON.parse(sessionStorage.getItem('ablis_tasks'));

        if (!ablis_tasks) {
            ablis_tasks = {
                tasks_added: 'no',
                tasks: {}
            };
            sessionStorage.setItem('ablis_tasks', JSON.stringify(ablis_tasks));
        };

        // Showing header button
        $('.modal-trigger-email-results').on('click', function () {
            $('#email-results.modal-example, .modal-overlay').addClass('show');
        });

        // Sticky header
        if ($('.sticky-wrapper').length) {
            var header = $(".sticky_background");
            var content = $(".recommendations-summary"); // Adjusts main content below, set on first non-sticky element
            var headerHeight = header.outerHeight() + 32;
            var scrollPoint = $('.sticky-wrapper').offset().top; // Change this to where you want the header to stick
            console.log(headerHeight);
            console.log(content);
            
            $(window).scroll(function () {
                if ($(window).scrollTop() > scrollPoint) {
                    if (!header.hasClass("fixed")) {
                        header.hide().addClass("fixed").fadeIn(200); // Fade in
                        content.css("margin-top", "130px"); // Prevent overlap
                    }
                } else {
                    if (header.hasClass("fixed")) {
                        header.removeClass("fixed").fadeOut(200, function () {
                            $(this).show(); // Ensures header stays visible after fadeOut
                        });
                        content.css("margin-top", "0"); // Reset margin
                    }
                }
            });
        };


        // Get question responses and display results accordingly
        $('.ablis-result').each(function () {
            var question = $(this).attr('data-question');

            var response = ablis_questions['responses'][question];
            //console.log(response);
            if (response == 'yes') {
                $(this).removeClass('d-none');
            } else if (response == 'no') {
                $(this).addClass('d-none');
            }

        });

        // Calculate different service type counts
        var licence_count = 0,
            regulation_count = 0,
            code_count = 0,
            advisory_count = 0;

        $('.ablis-result, .ablis-search-result').each(function () {
            if ($(this).hasClass('licence') && !$(this).hasClass('d-none')) {
                licence_count++;
            } else if ($(this).hasClass('regulatory-obligation') && !$(this).hasClass('d-none')) {
                regulation_count++;
            } else if ($(this).hasClass('code-of-practice') && !$(this).hasClass('d-none')) {
                code_count++;
            } else if ($(this).hasClass('advisory-material') && !$(this).hasClass('d-none')) {
                advisory_count++;
            }
        });

        var check_service_exists = function (service_count, service_class, service_id) {
            if (service_count > 0) {
                $('.result-count.' + service_class).text(service_count);
                $('.results-links span.' + service_class).text(service_count);
            } else {
                $('.summary.' + service_class).addClass('d-none');
                $('#' + service_id).addClass('d-none');
            }
        };

        check_service_exists(licence_count, 'licences', 'licences-group');
        check_service_exists(regulation_count, 'regulations', 'regulatory-obigations-group');
        check_service_exists(code_count, 'codes', 'code-of-practice-group');
        check_service_exists(advisory_count, 'advisory', 'advisory-materials-group');

        // Add total recommendations count to top of the page
        var total_count = licence_count + regulation_count + code_count + advisory_count;
        $('.showing-number span.count').text(total_count);


        // Scroll behaviour when clicking on summary links
        $('.summary a').on('click', function(e) {
            e.preventDefault();
            var target = $($(this).attr('href'));
            if (target.length) {
              $('html, body').animate({
                scrollTop: target.offset().top - 72
              }, 400);
            }
          });


        // Expand result tile accordions
        $('.result-header').on('click', function () {
            console.log('clicked');
            var result = $(this).parents('.ablis-result'),
                description = result.find('.result-content');
            result.toggleClass('open');

            if (result.hasClass('open')) {
                description.removeClass('d-none');

            } else {
                description.addClass('d-none');
            }
        });

        // Set heights for descriptions in result tiles using the height of a cloned element 
        set_description_heights('.results-wrapper');

        $(window).resize(function () {
            set_description_heights('.results-wrapper');
            ////////////////////////////////////////////////////////////////////////////////
        });

        // Open / close descriptions in result tiles
        $('.ablis-result .expand, .ablis-search-result .expand').on('click', function () {
            open_close_descriptions($(this));

        });


    };


        // If business details has previously been completed show reset questions warning
        if ( $('body.step-1').length && (dynamic_nav['step-1']['completed'] == "yes") ) {
            console.log('Business details page');
            $('.warning-notification-wrapper').removeClass('d-none');
        }



    // SEARCH PAGE -------------------------------------------------------

    var ablis_search = JSON.parse(sessionStorage.getItem('ablis_search'));

    // Save keyword search filtering variables in sessionStorage
    if (!ablis_search) {
        ablis_search = {
            search_term: "",
            search_location: "",
            active_filters: { 'licence': false, 'regulatory-obligation': false, 'code-of-practice': false, 'advisory-material': false, 'city-of-melbourne': false, 'city-of-port-phillip': false, 'victorian-state-government': false, 'australian-government': false }
        };
        sessionStorage.setItem('ablis_search', JSON.stringify(ablis_search));
    };

    // Check is search page
    if ($('.search-page').length) {
        console.log('search page');
        $('.state-wrapper').removeClass('d-none');

        // Predictive list for keyword search
        $('.predictive-list-ablis input').on('input', function(){
            var input = $(this).val(),
            input_len = input.length,
            input_lower_case = input.toLowerCase(),
            list_id = $(this).parents('.list-wrapper').find('ul').attr('id');   
        
            if(input) {
                $('ul#'+ list_id).addClass('open');
                $(this).parents('.predictive-list-ablis').find('a#list-close').addClass('show');
        
                //var list_len = $('ul#'+ list_id + ' li').length;
                var hidden_count = 0;
        
                
                $('ul#'+ list_id + ' li').each(function(){
                    var str = $(this).text(),
                    str_lower_case = str.toLowerCase(),
                    str_start_pos = str_lower_case.indexOf(input_lower_case), 
                    str_end_pos = str_start_pos + input_len;
                    
        
                    if (str_lower_case.includes(input_lower_case)) {
                        $(this).removeClass('hidden');
        
                        var case_str = str.slice(str_start_pos, str_end_pos),
                        str_1 = str.slice(0, str_start_pos),
                        str_2 = str.slice(str_end_pos);
        
                        var new_str = str_1 + "<span>" + case_str + "</span>" + str_2;
        
                        $(this).html(new_str);
                    } else { 
                        $(this).find("span").contents().unwrap();
                        $(this).addClass('hidden');
                        hidden_count++;
                    }
                });
        
                $('ul#'+ list_id + ' li.related, ul#'+ list_id + ' p.related').each(function(){
                    $(this).removeClass('hidden');
                });
                
        
            } else {
                $('ul#'+ list_id).removeClass('open');
                $(this).parents('.predictive-list-ablis').find('a#list-close').removeClass('show');
            }
        });
        
        $('.predictive-list-ablis li').on('click', function(){
            $(this).parents('.predictive-list-ablis').find('.error-message').addClass('d-none');
            $(this).parents('.form-element-wrapper').removeClass('error');
        
            var list_item = $(this).text();

            $(this).parents('.list-wrapper').find('input').val(list_item).addClass('selected');
        
            $('.predictive-list-ablis li.hidden').each(function(){
                $(this).removeClass('hidden');
            });
            
            $('.predictive-list-ablis a#list-close').addClass('show');
            $(this).parents('ul').removeClass('open');
            
        });
        
        $('a#list-close').on('click', function(){
            $(this).parents('.predictive-list-ablis').find('.no-result').removeClass('show');
            $(this).parents('.predictive-list-ablis').find('input').val('').removeClass('selected');
            $(this).parents('.predictive-list-ablis').find('ul').removeClass('open'); 
            $(this).removeClass('show');
        
            $(this).parents('.predictive-list-ablis').find('ul li').find("span").contents().unwrap();
            
            $(this).parents('.predictive-list-ablis').find('ul li.hidden').each(function(){
                $(this).removeClass('hidden');
            });
        
            var parent_list = $(this).parents('.predictive-list-ablis').find('ul').attr('id'); 
    
        
        });

        // Hide list if user clicks outside the predictive list input 
        $(document).on("click", function(event) {
            if (!$(event.target).closest("#keyword").length) {
                $("#keyword").removeClass('open');
            }
          });


        //Dynamic list in keyword search    
        $('.dynamic-list-ablis input').on('input', function(){
            var input = $(this).val(),
            input_len = input.length,
            input_lower_case = input.toLowerCase(),
            list_id = $(this).parents('.list-wrapper').find('ul').attr('id');
            

            if(input) {
                $('ul#'+ list_id).addClass('open');
                $(this).parents('.dynamic-list-ablis').find('a#list-close').addClass('show');

                var list_len = $('ul#'+ list_id + ' li').length;
                var hidden_count = 0;

                
                $('ul#'+ list_id + ' li').each(function(){
                    var str = $(this).text(),
                    str_lower_case = str.toLowerCase(),
                    str_start_pos = str_lower_case.indexOf(input_lower_case), 
                    str_end_pos = str_start_pos + input_len;
                    

                    if (str_lower_case.includes(input_lower_case)) {
                        $(this).removeClass('hidden');

                        var case_str = str.slice(str_start_pos, str_end_pos),
                        str_1 = str.slice(0, str_start_pos),
                        str_2 = str.slice(str_end_pos);

                        var new_str = str_1 + "<span>" + case_str + "</span>" + str_2;

                        $(this).html(new_str);
                    } else { 
                        $(this).find("span").contents().unwrap();
                        $(this).addClass('hidden');
                        hidden_count++;
                    }
                });

                $('ul#'+ list_id + ' li.related, ul#'+ list_id + ' p.related').each(function(){
                    $(this).removeClass('hidden');
                });
                

            } else {
                $('ul#'+ list_id).removeClass('open');
                $(this).parents('.dynamic-list-ablis').find('a#list-close').removeClass('show');
            }

            if (list_len == hidden_count) {
                $('ul#'+ list_id + ' li.related,  ul#'+ list_id + ' p.related').each(function(){
                    $(this).addClass('hidden');
                });
                $(this).parents('.dynamic-list-ablis').find('.no-result').addClass('show');
            } else {
                $(this).parents('.dynamic-list-ablis').find('.no-result').removeClass('show');
            } 
            if(!list_len) {
                $(this).parents('.dynamic-list-ablis').find('.no-result').removeClass('show');
            };
        });

        $('.dynamic-list-ablis li').on('click', function(){
            $(this).parents('.dynamic-list-ablis').find('.error-message').addClass('d-none');
            $(this).parents('.form-element-wrapper').removeClass('error');

            var list_item = $(this).text();

            $(this).parents('.list-wrapper').find('input').val(list_item).addClass('selected');

            $('.dynamic-list-ablis li.hidden').each(function(){
                $(this).removeClass('hidden');
            });
            $('a#list-close').addClass('show');
            $(this).parents('ul').removeClass('open');
            
        });

        
        $('a#list-close').on('click', function(){
            $(this).parents('.dynamic-list-ablis').find('.no-result').removeClass('show');
            $(this).parents('.dynamic-list-ablis').find('input').val('').removeClass('selected');
            $(this).parents('.dynamic-list-ablis').find('ul').removeClass('open'); 
            $(this).removeClass('show');

            $(this).parents('.dynamic-list-ablis').find('ul li').find("span").contents().unwrap();
            
            $(this).parents('.dynamic-list-ablis').find('ul li.hidden').each(function(){
                $(this).removeClass('hidden');
            });

            var parent_list = $(this).parents('.dynamic-list-ablis').find('ul').attr('id'); 

            ablis_questions[parent_list] = "";
        });
                
        

        // Set heights for descriptions in result tiles using the height of a cloned element 
        set_description_heights('.results-wrapper');

        // Open / close descriptions in result tiles
        $('.ablis-search-result .expand').on('click', function () {
            open_close_descriptions($(this));
        });


        // Record when filters are selected / unselected on checkbox click
        var hide_more_than_10 = function (result_tile) {
            $(result_tile).each(function (index, result) {
                if (index < 10) {
                    $(result).removeClass('d-none');
                } else {
                    $(result).addClass('d-none');
                }
            });
        };

        // Variables to store a temporarily promoted result
        var promoted_item,
            promoted_prev; //used to remember the original placement

        // Function to promote a result to the top of the list if it is used as a search term
        var promote_result = function(search_term){
            console.log(search_term);

            //return a previously promoted result
            if (promoted_prev) {
                promoted_prev.after(promoted_item);
            } else {
                //It was the first child originally, so just prepend again
                $('.search_result_group').prepend(promoted_item);
            }

            // Select and promote the new result
            var item = $('[data-value="'+ search_term +'"]');

            if (item.length > 0) {
                promoted_item = item;
                promoted_prev = item.prev();

                $('.search_result_group').prepend(item);
            }
                
            hide_more_than_10('.ablis-search-result');

        };
    
        // Search button click
        $('#search-btn').on('click', function(){
            var keyword = $('#search_keyword').val(),
            location = $('.dynamic-list-ablis input').val();

            promote_result(keyword);

            if (keyword && location) {
                $('.showing-number span.keyword').text(keyword);
                $('.showing-number span.location').text(location);
                
                ablis_search['search_term'] = keyword;
                ablis_search['search_location'] = location;
                sessionStorage.setItem('ablis_search', JSON.stringify(ablis_search));
                
                $('.content-sticky-wrapper').removeClass('d-none');
                set_description_heights('.results-wrapper');

                setTimeout(function () { 
                    $('html, body').animate({
                        scrollTop: $(".showing-header-container").offset().top
                    }, 100);
                }, 200);   
            } else {
                if (!keyword) {
                    $('.keyword-wrapper .form-element-wrapper').addClass('error');
                    $('.keyword-wrapper .error-message').removeClass('d-none');
                }  
                if (!location) {
                    $('.location-wrapper .form-element-wrapper').addClass('error');
                    $('.location-wrapper .error-message').removeClass('d-none');
                };
            };
            
        

        });
        

        // Reset form button click
        $('#reset-btn').on('click', function () {

            $('#search_keyword').val("");
            $('.dynamic-list-ablis input').val("");
            $('.ablis-selected-option').remove();

            $('.content-sticky-wrapper').addClass('d-none');
        });

        // Remove error state on input change (for search term)
        $('.keyword-wrapper input').on('change', function () {
            $(this).parents('.form-element-wrapper').removeClass('error');
            $(this).parents('.keyword-wrapper').find('.error-message').addClass('d-none');
        });


        // Keyword search filters
        var primary_filters = ['licence', 'regulatory-obligation', 'code-of-practice', 'advisory-material'],
            secondary_filters = ['city-of-melbourne', 'city-of-port-phillip', 'victorian-state-government', 'australian-government'];


        // Calculate number of search results for each filter
        var filter_counts = {
            'licence': $('.ablis-search-result.licence').length,
            'regulatory-obligation': $('.ablis-search-result.regulatory-obligation').length,
            'code-of-practice': $('.ablis-search-result.code-of-practice').length,
            'advisory-material': $('.ablis-search-result.advisory-material').length,
            'city-of-melbourne': $('.ablis-search-result.city-of-melbourne').length,
            'city-of-port-phillip': $('.ablis-search-result.city-of-port-phillip').length,
            'victorian-state-government': $('.ablis-search-result.victorian-state-government').length,
            'australian-government': $('.ablis-search-result.australian-government').length
        };
        for (var item in filter_counts) {
            $('.filter-item label[data-label=' + item + '] span').text('(' + filter_counts[item] + ')');
        }


        var check_active_filters = function () {
            // Determine if any filters are active
            var primary_active_filters = false,
                secondary_active_filters = false;

            for (var item in ablis_search['active_filters']) {
                if (ablis_search['active_filters'][item] == true) {
                    if (primary_filters.includes(item)) {
                        primary_active_filters = true;
                    }
                    if (secondary_filters.includes(item)) {
                        secondary_active_filters = true;
                    }
                }
            };

            // Return to default page view if no filters are active
            if (primary_active_filters == false && secondary_active_filters == false) {
                $('h2.showing-number span.count').text($('.ablis-search-result').length);
                hide_more_than_10('.ablis-search-result');

                $('.bga-pagination').removeClass('d-none');
                $('.no-results').addClass('d-none');
            }
            // Filter results if there are a primary and secondary filters active
            else if (primary_active_filters == true && secondary_active_filters == true) {
                // Hide all results to start with
                $('.ablis-search-result').each(function () {
                    $(this).addClass('d-none');
                });

                for (var item in ablis_search['active_filters']) {
                    if (ablis_search['active_filters'][item] == true) {
                        if (primary_filters.includes(item)) {
                            $('.ablis-search-result.' + item).removeClass('d-none');
                        }
                    }
                };

                for (var i = 0; i < secondary_filters.length; i++) {
                    if ((ablis_search['active_filters'][secondary_filters[i]] == false)) {
                        $('.ablis-search-result.' + secondary_filters[i]).addClass('d-none');
                    }
                };

                // Display the filtered result count
                var result_count = $('.ablis-search-result').length - $('.ablis-search-result.d-none').length;
                $('h2.showing-number span.count').text(result_count);

                if (result_count == 0) {
                    $('.bga-pagination').addClass('d-none');
                    $('.no-results').removeClass('d-none');
                } else {
                    $('.bga-pagination').removeClass('d-none');
                    $('.no-results').addClass('d-none');
                }

                // If more than 10 results are visible on the page hide the extras.
                hide_more_than_10('.ablis-search-result:visible');

            }
            // Filter results if there are only primary, or only secondary filters active
            else {

                // Hide all results to start with
                $('.ablis-search-result').each(function () {
                    $(this).addClass('d-none');
                });

                // Display all primary filtered results
                for (var item in ablis_search['active_filters']) {
                    if (ablis_search['active_filters'][item] == true) {
                        $('.ablis-search-result.' + item).removeClass('d-none');
                    }
                };

                // Display the filtered result count
                var result_count = $('.ablis-search-result').length - $('.ablis-search-result.d-none').length;
                $('h2.showing-number span.count').text(result_count);

                if (result_count == 0) {
                    $('.bga-pagination').addClass('d-none');
                    $('.no-results').removeClass('d-none');
                } else {
                    $('.bga-pagination').removeClass('d-none');
                    $('.no-results').addClass('d-none');
                }

                // If more than 10 results are visible on the page hide the extras.
                hide_more_than_10('.ablis-search-result:visible');
            }

        };

        $('.filter-item .checkbox-item input').on('click', function () {
            var filter = $(this).parents('.checkbox-item').find('label').attr('data-label');

            if ($(this).is(":checked")) {
                ablis_search['active_filters'][filter] = true;

            } else {
                ablis_search['active_filters'][filter] = false;
            }
            sessionStorage.setItem('ablis_search', JSON.stringify(ablis_search));

            check_active_filters();
        });

        // Record when filters are deselected using the bubbles
        $('.active-filters li').on('click', function () {
            var filter = $(this).attr('data-value');
            ablis_search['active_filters'][filter] = false;
            sessionStorage.setItem('ablis_search', JSON.stringify(ablis_search));

            check_active_filters();
        });

        // Clear filters with clear all filters button
        $('#clear-filters').on('click', function () {
            ablis_search['active_filters'] = { 'licence': false, 'regulatory-obligation': false, 'code-of-practice': false, 'advisory-material': false, 'city-of-melbourne': false, 'city-of-port-phillip': false, 'victorian-state-government': false, 'australian-government': false };

            sessionStorage.setItem('ablis_search', JSON.stringify(ablis_search));

            $('.filter-item .checkbox-item input').each(function () {
                $(this).prop('checked', false);
            });
            $('.active-filters li').each(function () {
                $(this).removeClass('selected');
            });

            check_active_filters();
        });



        

    };


    // INFORMATION PAGES


}); // End doc ready

