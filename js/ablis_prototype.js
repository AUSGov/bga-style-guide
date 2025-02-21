/*jshint browser: true, devel: true, jquery: true*/

$(document).ready(function () {

    // Check is page is in ablis prototype
    if ($('#ablis-prototype').length) {
        console.log("ablis page");
        // Hide empty <p>
        $('p:empty').hide();


    // Create object to store stepped nav steps (prototype 2)
    var stepped_nav = JSON.parse(sessionStorage.getItem('stepped_nav'));
    if (!stepped_nav) {   
        stepped_nav = {
            urls : {
                'nav-step-1' : "business-details.html",
                'nav-step-2' : "operations.html",
                'nav-step-3' : "products-and-services.html",
                'nav-step-4' : "workers.html",
                'nav-step-5' : "buildings-and-land.html",
                'nav-step-6' : "equipment-and-transport.html",
                'nav-step-7' : "results-melbourne-ballarat.html",
                'nav-step-8' : "results-melbourne-ballarat.html"
            }, 
            visited_steps : {
                'nav-step-1' : "",
                'nav-step-2' : "",
                'nav-step-3' : "",
                'nav-step-4' : "",
                'nav-step-5' : "",
                'nav-step-6' : "",
                'nav-step-7' : "",
                'nav-step-8' : ""
            },
            completed_steps : {
                'nav-step-1' : "",
                'nav-step-2' : "",
                'nav-step-3' : "",
                'nav-step-4' : "",
                'nav-step-5' : "",
                'nav-step-6' : "",
                'nav-step-7' : "",
                'nav-step-8' : ""
            }
        };
        sessionStorage.setItem('stepped_nav', JSON.stringify(stepped_nav));
    };
    // If first time visiting business details page then hide stepped nav.
    if ($('#nav-step-1').length) {
        if ( stepped_nav['completed_steps']['nav-step-1'] == "completed") {
            $('.stepped-navigation-wrapper .stepped-navigation-wrapper').removeClass('d-none');
        }
    }

    // Stepped nav functionality
    var stepped_nav_functionality = function(path){
        var active_step = 'nav-step-' + $('.step-title').attr('data-step');
        $('#' + active_step).addClass('active');

        stepped_nav['visited_steps'][active_step] = 'visited';
        sessionStorage.setItem('stepped_nav', JSON.stringify(stepped_nav));

        for (var key in stepped_nav['visited_steps']) {
            if ( stepped_nav['visited_steps'][key] == 'visited') {
                if (!$('#' + key).hasClass('active')) {
                    $('#' + key).addClass('visited').attr('href', path + stepped_nav['urls'][key]);
                }
            } 
        }
        for (var key in stepped_nav['completed_steps']) {
            if ( stepped_nav['completed_steps'][key] == 'completed') {
                $('#' + key).addClass('completed').attr('href', path + stepped_nav['urls'][key]);
                $('#' + key).removeClass('visited');
            }
        }

        console.log(stepped_nav['visited_steps']);
        console.log(stepped_nav['completed_steps']);
    };
    
    if ($('#ablis-prototype .stepped-navigation-wrapper').length) {
        var path = '/bga-style-guide/prototypes/ablis2/finder/';
        stepped_nav_functionality(path);
    }

    // Validate questions are answered and record page as completed
    $('.next-btn').on('click', function(e){
        e.preventDefault(); 
        var radios_validated = false,
        select_validated = false,
        input_validated = false;

        // Add page validation here
        //------------------------------------------------------------------------------------------------------
        
        
        // Radio button validation & set results-btn destination
        if ($('.radios.required:visible').length > 0) {
            var q_count = $('.radios.required:visible').length,
            validated_count = 0;
            
            $('.radios.required:visible').each(function(){
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

            $('select.required:visible').each(function(){
                if ($(this).val()) {
                    selected_count++; 
                    $(this).parents('.form-element-wrapper').removeClass('error');
                    $(this).parents('.form-element-wrapper').next('.error-message').addClass('d-none');  
                }  else {
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
        if ($('input.required:visible').length > 0) {
            var input_count = $('input.required:visible').length,
            valid_count = 0;

            $('input.required:visible').each(function(){
                if ($(this).val()) {
                    valid_count++;  
                    $(this).parents('.form-element-wrapper').removeClass('error');
                    $(this).parents('.form-element-wrapper').next('.error-message').addClass('d-none');  
                } else {
                    $(this).parents('.form-element-wrapper').addClass('error');
                    $(this).parents('.form-element-wrapper').next('.error-message').removeClass('d-none');
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


        // Recorded page as completed in sessionStorage (for stepped navigation)
        var step = 'nav-step-' + $('.step-title').attr('data-step');
        stepped_nav['completed_steps'][step] = 'completed';
        sessionStorage.setItem('stepped_nav', JSON.stringify(stepped_nav));

        // Reset button destination
        var destination = $(this).attr('href');
        if ($(this).attr('id') == 'results-btn') {
            var council = ablis_questions['council'];
            destination = '/bga-style-guide/prototypes/ablis2/finder/results-' + council + '-ballarat.html'; 
        }

        if (radios_validated == true && select_validated == true && input_validated == true) {
            window.location = destination;
        } else {
            console.log('not validated');
            $('html, body').animate({
                scrollTop: $(".error:first-of-type").offset().top - 24
            }, 400);
        }
         
    });

    

        // Create question map and store in sessionStorage
        var ablis_questions = JSON.parse(sessionStorage.getItem('ablis_questions'));
        if (!ablis_questions) {   
            ablis_questions = {
                location_1 : "",
                location_2 : "",
                council_1 : "",
                council_2 : "",
                council : "melbourne",
                activity_1 : "",
                activity_2 : "",
                industry : "",
                structure : "",
                responses : {
                    "all":"yes",
                    "q1":"no", 
                    "q2":"no",
                    "q3":"no",
                    "q4":"no",
                    "q5":"no",
                    "q6":"no",
                    "q7":"no",
                    "q8":"no",
                    "q9":"no",
                    "q10":"no",
                    "q11":"no", 
                    "q12":"no",
                    "q13":"no",
                    "q14":"no",
                    "q15":"no",
                    "q16":"no",
                    "q17":"no",
                    "q18":"no",
                    "q19":"no",
                    "q20":"no",
                    "q21":"no", 
                    "q22":"no",
                    "q23":"no",
                    "q24":"no",
                    "q25":"no",
                    "q26":"no",
                    "q27":"no",
                    "q28":"no",
                    "q29":"no",
                    "q30":"no",
                    "q31":"no", 
                    "q32":"no",
                    "q33":"no",
                    "q34":"no",
                    "q35":"no",
                    "q36":"no",
                    "q37":"no",
                    "q38":"no",
                    "q39":"no",
                    "q40":"no",
                    "q41":"no", 
                    "q42":"no",
                    "q43":"no",
                    "q44":"no",
                    "q45":"no",
                    "q46":"no",
                    "q47":"no",
                    "q48":"no",
                    "q49":"no",
                    "q50":"no",
                    },
                answered : {}
            };
            sessionStorage.setItem('ablis_questions', JSON.stringify(ablis_questions));
        };
    
        // Reset tool on start now click 
        $('#start-now').on('click', function(){
            sessionStorage.clear();
        });

        // STORE QUESTION RESPONSES
        $('.question input[type=radio]').on('change', function () {
            var question = $(this).parents('.question').attr('id');
                response = $(this).attr('data-value');
        
                ablis_questions['responses'][question] = response;
                ablis_questions['answered'][question] = 'true';
                sessionStorage.setItem('ablis_questions', JSON.stringify(ablis_questions));
                
                $(this).parents('.form-element-wrapper').next('.error-message').addClass('d-none');

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

            $('.dynamic-list-ablis input').each(function(){
                var list = $(this).parents('.dynamic-list-ablis'),
                list_id = list.find('ul').attr('id'),
                list_close = list.find('a#list-close'),
                q_council = $(this).parents('.field-wrapper').find('.council-question'),
                answer = ablis_questions[list_id];
               
                if (answer) {
                    $(this).val(answer);
                    list.removeClass('d-none');
                    list_close.addClass('show');

                    if ( answer.includes('Melbourne')) {
                        var council = ablis_questions['council'];
                        q_council.removeClass('d-none');
                        q_council.find('input[data-value=' + council  +']').prop('checked', true);
                    } 

                    if ( list_id == 'primary-activity-2' ) {
                        $('#primary-activity .field-wrapper.d-none').removeClass('d-none');
                    }
                    if ( list_id == 'location_2') {
                        $('#location .field-wrapper.d-none').removeClass('d-none');
                    }
                } 

            });

            $("select").each(function(){
                var id = $(this).attr('id'),
                selection = ablis_questions[id];
                $(this).val(selection);

            });
        }

        // BUSINESS DETAIL QUESTIONS
        // dynamic lists (including setting location)
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
            } else {
                $('ul#'+ list_id).removeClass('open');
                $(this).parents('.dynamic-list-ablis').find('a#list-close').removeClass('show');
            }

            if (list_len == hidden_count) {
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

            var list_item = $(this).text(),
            parent_list = $(this).parents('ul').attr('id');
            //console.log(parent_list);
            ablis_questions[parent_list] = list_item;
            sessionStorage.setItem('ablis_questions', JSON.stringify(ablis_questions));

            if (parent_list.includes('location')) {
                var q_council = $(this).parents('.field-wrapper').find('.council-question');
    
                if (list_item.includes('Melbourne')) {
                    q_council.removeClass('d-none');
                } else {
                    q_council.addClass('d-none');
                }
            };

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
            sessionStorage.setItem('ablis_questions', JSON.stringify(ablis_questions));

            if (parent_list.includes('location')) {
                var q_council = $(this).parents('.field-wrapper').find('.council-question');
                q_council.find('input').prop("checked", false);
                q_council.addClass('d-none');
            } 

        });


        // Get chosen council and set result page accordingly.
        $('#council-1 input[type=radio], #council-2 input[type=radio]').on('click', function(){
            $(this).parents('.radio-wrapper').find('.error-message').addClass('d-none').removeClass('error');

            var council = $(this).attr('data-value'),
            field = $(this).parents('.council-question').attr('id');

            ablis_questions[field] = council;
            ablis_questions['council'] = council;
            sessionStorage.setItem('ablis_questions', JSON.stringify(ablis_questions));
        });


        // Add another location 
        $('.add-field').on('click', function(){
            $(this).prev('.field-wrapper').removeClass('d-none');
        });

        // Remove additional location
        $('.remove-field').on('click', function(){
            $(this).parents('.field-wrapper').addClass('d-none');
        });


        // Store answers from dropdown selects
        $("select").on('change', function(){
            $(this).parents('.form-element-wrapper').removeClass('error');
            $(this).parents('.form-element-wrapper').next('.error-message').addClass('d-none');
            

            var id = $(this).attr('id');
            var selection = $(this).val();

            ablis_questions[id] = selection;
            sessionStorage.setItem('ablis_questions', JSON.stringify(ablis_questions));
        });
        
        

       


        // RESULT PAGES ------------------------------------------------------
        if ($('.results-page').length || $('.search-page').length) {
            console.log('results page');

            // Sticky header
            if ($('.sticky-wrapper').length) {
                var header_width = $('.header-content').innerWidth(),
                sticky_position = $('.sticky-wrapper').offset();

                $(window).scroll(function () {
                    if ($(window).scrollTop() > sticky_position.top) {
                        $('.sticky-wrapper').addClass('fixed')
                        $('.sticky-header').css('width', header_width);  
                    } else {
                        $('.sticky-wrapper').removeClass('fixed').css('width', 'auto');
                        $('.sticky-header').css('width', "auto");
                    }
                });
            };
            
            $(window).resize(function () {
                // ADD CODE TO CHECK STICKY HEADER WIDTH ON RESIZE
            }); 
            

            // Get question responses and display results accordingly
            $('.ablis-result').each(function(){
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

            $('.ablis-result, .ablis-search-result').each(function(){
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
        
            var check_service_exists = function(service_count, service_class, service_id){
                if (service_count > 0) {
                    $('.result-count.' + service_class).text(service_count);
                } else {
                    $('.summary.' + service_class).addClass('d-none');
                    $('#' + service_id).addClass('d-none');
                }
            };

            check_service_exists(licence_count, 'licences', 'licences-group');
            check_service_exists(regulation_count, 'regulations', 'regulatory-obigations-group');
            check_service_exists(code_count, 'codes', 'code-of-practice-group');
            check_service_exists(advisory_count, 'advisory', 'advisory-materials-group');



            // Add total recommendations count to top of th epage
            var total_count = licence_count + regulation_count + code_count + advisory_count;
            //console.log(total_count);
            $('.showing-number span.count').text(total_count);


            // Expand result tile accordions
            $('.result-header').on('click', function(){

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
            var set_description_heights = function(){
                $('.serviceSection').each(function(){
                    $(this).find(':first-child').find(':first-child').addClass('first-element');
                    
                    var clone = $(this).clone().css({'padding-left':'48px', 'padding-right':'40px'}).appendTo('.results-wrapper').addClass('clone');
                    var first_elem = clone.find(':first-child').find(':first-child');
                    var first_elem_height = first_elem.height();
                    $(this).height(first_elem_height);
            
                    clone.remove();       
                });
            };
            set_description_heights();
            
            $(window).resize(function () {
                set_description_heights();
            }); 

            // Open / close descriptions in result tiles
            $('.ablis-result .expand, .ablis-search-result .expand').on('click', function(){
                var description_wrapper = $(this).parents('.description').find('.serviceSection'),
                first_elem = description_wrapper.find('.first-element');
                first_elem_height = first_elem.height();

                if (description_wrapper.height() == first_elem.height()) {
                    description_wrapper.height('auto');
                    $(this).text('less...');
                } else {
                    description_wrapper.height(first_elem_height);
                    $(this).text('more...');
                }
            });
        }


    }
    

}); // End doc ready


