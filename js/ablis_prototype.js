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
                contact_details : "",
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

        // SET CONTACT DETAILS IN FOOTER
        update_contact = function(state){
            $('.contact-details .contact-item').each(function(){
                $(this).addClass('d-none');
            });
            $('.contact-details .contact-item.' + state).removeClass('d-none');
        };

        $('.state-contact select').on('change', function(){
            var state = $(this).val();
            update_contact(state);

            ablis_questions['contact_details'] = state;
            sessionStorage.setItem('ablis_questions', JSON.stringify(ablis_questions));            
        });

        //Populate footer contact details on page load if location previously set.
        if ( ablis_questions['contact_details'] != "") {
            var state = ablis_questions['contact_details'];

            setTimeout(function() {
                $('.state-contact select').val(state);
            update_contact(state);
            }, 500);
        }


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
                // Set state details in footer to Victoria
                $('.state-contact select').val('victoria'); 
                update_contact('victoria');

                ablis_questions['contact_details'] = 'victoria';
                sessionStorage.setItem('ablis_questions', JSON.stringify(ablis_questions));

                // Hide / show council question
               
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

            stepped_nav['urls']['nav-step-7'] = "results-" + council + "-ballarat.html";
            sessionStorage.setItem('stepped_nav', JSON.stringify(stepped_nav));

            var path = '/bga-style-guide/prototypes/ablis2/finder/';
            stepped_nav_functionality(path);
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
        
        

        //FUNCTIONS FOR SEACH TILES ON RESULTS AND KEYWORD SEARCH PAGES

        // Set heights for descriptions in result tiles using the height of a cloned element 
        var set_description_heights = function(wrapper){
            $('.serviceSection').each(function(){
                $(this).find(':first-child').find(':first-child').addClass('first-element');
                
                var clone = $(this).clone().css({'padding-left':'48px', 'padding-right':'40px'}).appendTo(wrapper).addClass('clone');
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
        var open_close_descriptions = function(result_tile){  
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
        if ($('.results-page').length ) {
            console.log('results page');
            $('.state-wrapper').removeClass('d-none');

            var ablis_tasks = JSON.parse(sessionStorage.getItem('ablis_tasks'));

            if (!ablis_tasks) {   
                ablis_tasks = {
                    tasks_added : 'no',
                    tasks : {}
                };
                sessionStorage.setItem('ablis_tasks', JSON.stringify(ablis_tasks));
            };

            // Showing header buttons
            $('.modal-trigger-ablis-task-list').on('click', function(){
                $('#ablis-task-list.modal-example, .modal-overlay').addClass('show');
            });
            $('.modal-trigger-email-results').on('click', function(){
                $('#email-results.modal-example, .modal-overlay').addClass('show');
            });

            if ($('.sticky-wrapper').length) {
                var header = $(".sticky_background");
                var content = $(".content"); // Adjusts main content below
                var headerHeight = header.outerHeight();
                var scrollPoint = $('.sticky-wrapper').offset().top; // Change this to where you want the header to stick

                $(window).scroll(function() {
                    if ($(window).scrollTop() > scrollPoint) {
                        if (!header.hasClass("fixed")) {
                            header.hide().addClass("fixed").fadeIn(200); // Fade in
                            content.css("margin-top", headerHeight + "px"); // Prevent overlap
                        }
                    } else {
                        if (header.hasClass("fixed")) {
                            header.removeClass("fixed").fadeOut(200, function() {
                                $(this).show(); // Ensures header stays visible after fadeOut
                            });
                            content.css("margin-top", "0"); // Reset margin
                        }
                    }
                });
            };
            
            // Scroll to section on header summary link click
            $('.recommendations-summary .summary a').on('click', function(e){
                e.preventDefault();

                var target_elem = $(this).attr('href');
                $('html, body').animate({
                    scrollTop: $(target_elem).offset().top - 192
                }, 100);

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
            set_description_heights('.results-wrapper');
            
            $(window).resize(function () {
                set_description_heights('.results-wrapper');
                ////////////////////////////////////////////////////////////////////////////////
            }); 

            // Open / close descriptions in result tiles
            $('.ablis-result .expand, .ablis-search-result .expand').on('click', function(){
                open_close_descriptions($(this));
                
            });

            // Task list functionality
            var count_tasks = function(){
                var task_count = $('.shortlist.ablis-tasks .ablis-task').length;
                $('#ablis-task-list .task-counter, .header-cta-links .task-counter').text(task_count);

                if (task_count == 0) {
                    
                    $('#ablis-task-list .no-tasks').removeClass('d-none');
                } else {
                    $('#ablis-task-list .no-tasks').addClass('d-none');
                }
            };
            var add_task = function(class_str, href_str, title_str){
                var task_str = '<div class="shortlist-item ablis-task ' + class_str + ' px-0 py-3"><button class="remove-btn p-0 me-3"><svg data-name="Icon / close"xmlns="http://www.w3.org/2000/svg" width="14.142" height="14.142"viewBox="0 0 14.142 14.142"><path d="M7.071,8.485,1.414,14.142,0,12.728,5.657,7.071,0,1.414,1.414,0,7.071,5.657,12.728,0l1.414,1.414L8.485,7.071l5.657,5.657-1.414,1.414Z" fill="#333" /></svg></button><div class="item-content"><h4 class="p-0 m-0"><a href=' + href_str + '>' + title_str + '</a></h4></div> </div>';

                $('.shortlist.ablis-tasks').append(task_str);

                ablis_tasks['tasks'][class_str] = task_str;
                sessionStorage.setItem('ablis_tasks', JSON.stringify(ablis_tasks));
            };
            var remove_task = function(class_str){
                $('.shortlist.ablis-tasks').find('.' + class_str).remove();

                delete ablis_tasks['tasks'][class_str];

                sessionStorage.setItem('ablis_tasks', JSON.stringify(ablis_tasks));
            };

            // Repopulate task list on page load
            for (var item in ablis_tasks['tasks']) {
                $('.shortlist.ablis-tasks').append(ablis_tasks['tasks'][item]);
            }
            $('.shortlist-item.ablis-task').each(function(){
                title = $(this).find('.item-content a').text();
                $('.ablis-result .title:contains(' + title + ')').parents('.ablis-result').find('btn.add-task').addClass('added').text('Remove from tasks');
            });

            count_tasks();

            // Add or remove tasks on click of 'Add to tasks' btn
            $('btn.add-task').on('click', function(){
                var result_title = $(this).parents('.ablis-result').find('.title').text(),
                    result_class = result_title.replace(/\s/g, "").toLowerCase();
                    result_href = $(this).parents('.ablis-result').find('a.learn-more').attr('href');

                if ( ablis_tasks['tasks_added'] == 'no' ) { // Show instruction modal first time 'add to tasks' is clicked.
                    $('#tasks-instruction-modal.modal-example, .modal-overlay').addClass('show');
                    ablis_tasks['tasks_added'] = 'yes';
                    sessionStorage.setItem('ablis_tasks', JSON.stringify(ablis_tasks));

                    $(this).addClass('added').text('Remove from tasks');
                    add_task(result_class, result_href, result_title);
                    count_tasks();
                } 
                else { // Add or remove task.
                    if ($(this).hasClass('added')) { // Remove from task list
                        $(this).removeClass('added').text('Add to tasks');
                        remove_task(result_class);
                        count_tasks();
                    }
                    else { //Add to task list
                        $(this).addClass('added').text('Remove from tasks');
                        add_task(result_class, result_href, result_title);
                        count_tasks();
                    }


                }
            });

            // Remove tasks on .remove-btn click in the shortlist
            $(document).on('click', '.remove-btn' ,function(){
                var result = $(this).parents('.shortlist-item.ablis-task'),
                title = result.find('.item-content a').text(),
                class_str = title.replace(/\s/g, "").toLowerCase();

                result.remove();
                count_tasks();

                $('.ablis-result .title:contains(' + title + ')').parents('.ablis-result').find('btn.add-task').removeClass('added').text('Add to tasks');

                delete ablis_tasks['tasks'][class_str];
                sessionStorage.setItem('ablis_tasks', JSON.stringify(ablis_tasks));
            });


        };


        // SEARCH PAGE -------------------------------------------------------

        var ablis_search = JSON.parse(sessionStorage.getItem('ablis_search'));

        // Save keyword search variables in sessionStorage
        if (!ablis_search) {   
            ablis_search = {
                search_term : "",
                search_location : "",
                active_filters : {'licence' : false, 'regulatory-obligation' : false, 'code-of-practice' : false, 'advisory-material' : false, 'city-of-melbourne' : false, 'city-of-port-phillip' : false, 'victorian-state-government' : false, 'australian-government' : false}
            };
            sessionStorage.setItem('ablis_search', JSON.stringify(ablis_search));
        };

        // Check is search page
        if ($('.search-page').length) {
            console.log('search page');
            $('.state-wrapper').removeClass('d-none');
            
            // Set heights for descriptions in result tiles using the height of a cloned element 
            set_description_heights('.results-wrapper');

            // Open / close descriptions in result tiles
            $('.ablis-search-result .expand').on('click', function(){
                open_close_descriptions($(this));  
            });


            // Search button click
            $('#search-btn').on('click', function(){
                var keyword = $('#search_keyword').val(),
                location = $('.dynamic-list-ablis input').val();

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
            $('#reset-btn').on('click', function(){
                ablis_search['search_term'] = "";
                ablis_search['search_location'] = "";
                ablis_search['active_filters'] = {'licence' : false, 'regulatory-obligation' : false, 'code-of-practice' : false, 'advisory-material' : false, 'city-of-melbourne' : false, 'city-of-port-phillip' : false, 'victorian-state-government' : false, 'australian-government' : false}

                sessionStorage.setItem('ablis_search', JSON.stringify(ablis_search));

                $('#search_keyword').val("");
                $('.dynamic-list-ablis input').val("");

                $('.content-sticky-wrapper').addClass('d-none');
            });

            // Remove error state on input change (for search term)
            $('.keyword-wrapper input').on('change', function(){
                $(this).parents('.form-element-wrapper').removeClass('error');
                $(this).parents('.keyword-wrapper').find('.error-message').addClass('d-none');
            });
            

            // Keyword search filters
            var primary_filters = ['licence','regulatory-obligation', 'code-of-practice', 'advisory-material'],
            secondary_filters = ['city-of-melbourne', 'city-of-port-phillip', 'victorian-state-government', 'australian-government'];


            // Calculate number of search results for each filter
            var filter_counts = {
                'licence' : $('.ablis-search-result.licence').length,
                'regulatory-obligation' : $('.ablis-search-result.regulatory-obligation').length,
                'code-of-practice' : $('.ablis-search-result.code-of-practice').length,
                'advisory-material' : $('.ablis-search-result.advisory-material').length,
                'city-of-melbourne' : $('.ablis-search-result.city-of-melbourne').length,
                'city-of-port-phillip' : $('.ablis-search-result.city-of-port-phillip').length,
                'victorian-state-government' : $('.ablis-search-result.victorian-state-government').length,
                'australian-government' : $('.ablis-search-result.australian-government').length
            };
            for (var item in filter_counts) {
                $('.filter-item label[data-label=' + item + '] span').text('(' + filter_counts[item] + ')');
            }

            // Record when filters are selected / unselected on checkbox click
            var hide_more_than_10 = function(result_tile){ 
                $(result_tile).each(function(index, result) {
                    if ( index < 10 ) {
                        $(result).removeClass('d-none');
                    } else {
                        $(result).addClass('d-none');
                    }
                });
            };

           
            var check_active_filters = function(){
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
                     $('.ablis-search-result').each(function(){
                        $(this).addClass('d-none');
                    });

                    for (var item in ablis_search['active_filters']) {
                        if (ablis_search['active_filters'][item] == true){
                            if (primary_filters.includes(item)) {
                                $('.ablis-search-result.' + item).removeClass('d-none'); 
                            } 
                        }
                    };

                    for (var i=0; i < secondary_filters.length; i++) {
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
                    $('.ablis-search-result').each(function(){
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


            $('.filter-item .checkbox-item input').on('click', function(){
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
            $('.active-filters li').on('click', function(){
                var filter = $(this).attr('data-value');
                ablis_search['active_filters'][filter] = false;
                sessionStorage.setItem('ablis_search', JSON.stringify(ablis_search));

                check_active_filters();
            }); 

            // Clear filters with clear all filters button
            $('#clear-filters').on('click', function(){
                ablis_search['active_filters'] = {'licence' : false, 'regulatory-obligation' : false, 'code-of-practice' : false, 'advisory-material' : false, 'city-of-melbourne' : false, 'city-of-port-phillip' : false, 'victorian-state-government' : false, 'australian-government' : false};
            
                sessionStorage.setItem('ablis_search', JSON.stringify(ablis_search));

                $('.filter-item .checkbox-item input').each(function(){
                    $(this).prop('checked', false);
                });
                $('.active-filters li').each(function(){
                    $(this).removeClass('selected');
                });

                check_active_filters();
            });


            // Repopulate the page on refresh if the two search terms have been entered already.
            if ( !ablis_search['search_term'] == "" && !ablis_search['search_location'] == "" ) {
                var keyword = ablis_search['search_term'],
                location = ablis_search['search_location'];

                $('#search_keyword').val(keyword);
                $('.dynamic-list-ablis input').val(location);
                $('a#list-close').addClass('show');

                $('.content-sticky-wrapper').removeClass('d-none');

                $('.showing-number span.keyword').text(keyword);
                $('.showing-number span.location').text(location);
                
                set_description_heights('.results-wrapper');

                for (var item in ablis_search['active_filters']) {
                  
                    if (ablis_search['active_filters'][item] == true) {
                        $('.checkbox-item input#' + item).prop('checked', true);
                        $('.active-filters li[data-value=' + item + ']').addClass('selected');
                    };
                }
                check_active_filters();
            }
          
        };


        // INFORMATION PAGES

        // Set position of return to results button
        var set_return_btn_position = function(){
            var content_leftcoord = $('.content-wrapper').position().left,
            content_width = $('.content-wrapper').outerWidth(),
            content_rightcoord = content_leftcoord + content_width,
            window_width = $(window).width(),
            button_rightcoord = window_width - content_rightcoord;

            $('.results-return-wrapper').css('right', button_rightcoord + 'px').removeClass('d-none');

        };
        
        if ( $('button#results-return').length ) {
            set_return_btn_position();
        
            $(window).resize(function () {
                set_return_btn_position();
            });
        };

        // Return user to correct results page when 'return to results' button is clicked.
        $('button#results-return').on('click', function(){
            var council = ablis_questions['council'];
            destination = '/bga-style-guide/prototypes/ablis2/finder/results-' + council + '-ballarat.html';

            window.location = destination;
            
        });


    }
    

}); // End doc ready

