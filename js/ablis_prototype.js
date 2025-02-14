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
                    }  
            };
            sessionStorage.setItem('ablis_questions', JSON.stringify(ablis_questions));
        };
    

        // STORE QUESTION RESPONSES
        $('.question input[type=radio]').on('change', function () {
            var question = $(this).parents('.question').attr('id');
                response = $(this).attr('data-value');
        
                ablis_questions['responses'][question] = response;
                sessionStorage.setItem('ablis_questions', JSON.stringify(ablis_questions));
                //console.log(JSON.parse(sessionStorage.getItem('ablis_questions')));

        });

        // SHOW / HIDE DYNAMIC QUESTIONS
        $('.dynamic-trigger input[type=radio]').on('change', function () {
            var response = $(this).attr('data-value');
                if (response == "yes") {
                    $(this).parents('.dynamic-trigger').next('.dynamic-section').removeClass('d-none');
                } else {
                    $(this).parents('.dynamic-trigger').next('.dynamic-section').addClass('d-none');
                }
        });

        //Re-populate radio buttons on page load
        if ($('.question-page').length) {
            console.log('question page');

            ///////////////////////////// ///////////////////////////// ///////////////////////////// ///////////////////////////// ///////////////////////////// ///////////////////////////// ///////////////////////////// ///////////////////////////// ///////////////////////////// ///////////////////////////// ///////////////////////////// ///////////////////////////// ///////////////////////////// ///////////////////////////// ///////////////////////////// ///////////////////////////// /////////////////////////////
        }

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
        
            $('.result-count.licences').text(licence_count);
            $('.result-count.regulations').text(regulation_count);
            $('.result-count.codes').text(code_count);
            $('.result-count.advisory').text(advisory_count);

            // Add total recommendations count to top of th epage
            var total_count = licence_count + regulation_count + code_count + advisory_count;
            console.log(total_count);
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


