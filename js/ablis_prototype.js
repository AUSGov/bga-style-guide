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
                    "q1":"yes", 
                    "q2":"yes",
                    "q3":"yes",
                    "q4":"yes",
                    "q5":"yes",
                    "q6":"yes",
                    "q7":"yes",
                    "q8":"yes",
                    "q9":"yes",
                    "q10":"yes",
                    "q11":"yes", 
                    "q12":"yes",
                    "q13":"yes",
                    "q14":"yes",
                    "q15":"yes",
                    "q16":"yes",
                    "q17":"yes",
                    "q18":"yes",
                    "q19":"yes",
                    "q20":"yes",
                    "q21":"yes", 
                    "q22":"yes",
                    "q23":"yes",
                    "q24":"yes",
                    "q25":"yes",
                    "q26":"yes",
                    "q27":"yes",
                    "q28":"yes",
                    "q29":"yes",
                    "q30":"yes",
                    "q31":"yes", 
                    "q32":"yes",
                    "q33":"yes",
                    "q34":"yes",
                    "q35":"yes",
                    "q36":"yes",
                    "q37":"yes",
                    "q38":"yes",
                    "q39":"yes",
                    "q40":"yes",
                    "q41":"yes", 
                    "q42":"yes",
                    "q43":"yes",
                    "q44":"yes",
                    "q45":"yes",
                    "q46":"yes",
                    "q47":"yes",
                    "q48":"yes",
                    "q49":"yes",
                    "q50":"yes",
                    }  
            };
            //console.log(ablis_questions);
            sessionStorage.setItem('ablis_questions', JSON.stringify(ablis_questions));
        };
        //console.log(ablis_questions);
        //console.log(JSON.parse(sessionStorage.getItem('question_set')));

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
            


            // Calculate different service type counts
            var licence_count = 0,
            regulation_count = 0,
            code_count = 0,
            advisory_count = 0;

            //console.log(ablis_questions['responses']);
            for (var q in ablis_questions['responses']) {
                //console.log(q);
                //console.log(ablis_questions['responses']);
                
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                if (ablis_questions['responses'][q] == 'yes') {
                    $('.ablis-result["data-question" = ' + q +']').removeClass('d-none');
                } else if (ablis_questions['responses'][q] == 'no') {
                    $('.ablis-result["data-question" = ' + q +']').addClass('d-none');
                }
            }

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


