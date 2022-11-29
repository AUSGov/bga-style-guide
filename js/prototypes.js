/*jshint browser: true, devel: true, jquery: true*/

$(document).ready(function () {

//ECB REVISED FLOW PROTOTYPE

    // Open & close modals
    $('#ecb-prototype .modal-trigger').on('click', function(){
        var modal = $(this).attr('data-modal');
        $('#' + modal).addClass('show');
        $('.modal-overlay').addClass('show');
    });
    $('#ecb-prototype .modal-example .close, #ecb-prototype .modal-example .cancel').on('click', function(){
        $(this).parents('.modal-example').removeClass('show');
        $('.modal-overlay').removeClass('show');
    });

    // Stop form in email modal from reloading the page
    $("#email-form").submit(function(e) {
        e.preventDefault();
    });

    // Show hide content within email modal
    $('#step-email-address .progress-step').on('click', function(){
        $('#step-email-address').removeClass('show');
        $('#step-verify-email').addClass('show');
    });

    // Close modal and scroll page on download / email success
    $('.success-scroll').on('click', function(){
        $(this).parents('.modal-example').removeClass('show');
        $('.modal-overlay').removeClass('show');

        setTimeout(function () {
            var anchor = $("#next-steps");
            $('html,body').animate({scrollTop: anchor.offset().top},'fast');
        }, 200);
    });


    // Stepped nav functionality
    if ( $('#ecb-prototype .stepped-navigation-wrapper').length )  {
        
        var active_step = 'nav-step-' + $('.step-title').attr('data-step');

        $('#' + active_step).addClass('active');
        localStorage.setItem(active_step, 'visited');

        var step_titles = ["position.html", "hours.html", "pay.html", "review.html", "finalise.html"]; 
        //host = window.location.host;
        var  completed_steps = active_step - 1;

        for (var step = 0; step < step_titles.length; step++) {
            var step_number = step + 1,
            step_str = 'nav-step-' + step_number;
            var state = localStorage.getItem(step_str);
         
            if ( state == "visited" && !$('#' + step_str).hasClass('active') ) {
                $('#' + step_str).addClass('completed').attr('href', '/bga-style-guide/prototypes/ecb/' + step_titles[step]);
            }
        }
    }

    // Reset tool on "Create new contract"
    $('#ecb-prototype .clear-tool').on('click', function(){
        localStorage.clear();
    });


    // Sticky stepped nav behaviour
    if ($('#ecb-prototype .stepped-navigation-wrapper').length) {
        var sticky_position = $('.stepped-navigation-wrapper .stepped-navigation-wrapper').offset();
        
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


    // Save text input & select answers and re-populate on page load
    $('#ecb-prototype input[type=text], #ecb-prototype select').on('change', function(){
        var input_field = $(this).attr('id'),
        input_value = $(this).val();
        localStorage.setItem(input_field, input_value);
    });

    var save_input_answers = function(id){
        if (localStorage.getItem(id) !== null) {
            var user_input = localStorage.getItem(id);
            $('#' + id).val(user_input);
            
            if (user_input !== "") {
                $('.' + id).addClass('added');
            }
        }
    };

    // Save checkbox answers and re-populate on page load
    $('#ecb-prototype input[type=checkbox]').on('change', function(){
        var input_field = $(this).attr('id');
        if ( $(this).is(":checked")) {
            input_value = $(this).parents('.checkboxes').find('label').text();
            localStorage.setItem(input_field, input_value);
        } else {
            localStorage.setItem(input_field, "");
        }
    });
    var save_checkbox_answers = function(id) {
        if (localStorage.getItem(id) !== null) {
            var user_input = localStorage.getItem(id);

            if (user_input !== "") {
                $('#' + id).prop('checked', true);
                $('.' + id).addClass('added');
            }
        }
    };

    // Save radio answers and re-populate on page load
    $('#ecb-prototype input[type=radio]').on('change', function(){
        var input_field = $(this).parents('.radios').attr('id'),
        input_value = $(this).attr('id');
        localStorage.setItem(input_field, input_value);
        console.log(input_field);
        
    });
    var save_radio_answers = function(radio_group) {
        if (localStorage.getItem(radio_group) !== null) {
            var user_input = localStorage.getItem(radio_group);
            $('#' + user_input).prop('checked', true);
            $('.' + radio_group).addClass('added');
        }
    };


    // Apply saved user answer on page load
    if ( $('.position-page').length ) {
        save_input_answers('position-title');
        save_input_answers('business-structure');
        save_radio_answers('employment-type');
    }

    if ( $('.hours-page').length ) {
        save_input_answers('hours-worked');
        save_checkbox_answers('flexible-hours');
    }

    if ( $('.pay-page').length ) {
        save_input_answers('pay-rate');
        save_radio_answers('pay-rate-units');
        save_radio_answers('pay-frequency');
    }

    if ( $('.review-page').length ) {
        if ( localStorage.getItem('flexible-hours') == "" ) {
            $('.results-edit-answers-component.flexible-hours').addClass('d-none');
        }
    }



}); //End doc ready
