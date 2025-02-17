/*jshint browser: true, devel: true, jquery: true*/

$(document).ready(function () {

    // Check is page is in ablis prototype
    if ($('#ablis-prototype').length) {
        console.log("ablis page");
        // Hide empty <p>
        $('p:empty').hide();
    

        // Create question map and store in sessionStorage
        var ablis_questions = JSON.parse(sessionStorage.getItem('ablis_questions'));
        if (!ablis_questions) {   
            ablis_questions = {
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
                answered : {},
                council : "melbourne",
                industry : "Accommodation and food services"
            };
            sessionStorage.setItem('ablis_questions', JSON.stringify(ablis_questions));
        };
    

        // STORE QUESTION RESPONSES
        $('.question input[type=radio]').on('change', function () {
            var question = $(this).parents('.question').attr('id');
                response = $(this).attr('data-value');
        
                ablis_questions['responses'][question] = response;
                ablis_questions['answered'][question] = 'true';
                sessionStorage.setItem('ablis_questions', JSON.stringify(ablis_questions));
                //console.log(JSON.parse(sessionStorage.getItem('ablis_questions')));

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

        //Re-populate radio buttons on page load
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
            var list_item = $(this).text(),
            parent_section = $(this).parents('.question-section').attr('id');

            if (parent_section == 'location') {
                var q_council = $(this).parents('.question-section').find('.council-question');
                if (list_item.includes('Melbourne')) {
                    console.log(list_item);
                    q_council.removeClass('d-none');

                } else {
                    console.log('not melbourne');
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


