/*jshint browser: true, devel: true, jquery: true*/

$(document).ready(function () {

    //ECB REVISED FLOW PROTOTYPE

    // Open & close modals
    $('#ecb-prototype .modal-trigger').on('click', function () {
        var modal = $(this).attr('data-modal');
        $('#' + modal).addClass('show');
        $('.modal-overlay').addClass('show');

        if ( modal = 'modal-email') {
            $('#step-email-address').addClass('show');
            $('#step-verify-email, #step-email-success, .success-icon').removeClass('show'); 
            $('#step-verify-email input').each(function(){
                $(this).val('');
            });
        }
    });
    $('#ecb-prototype .modal-example .close, #ecb-prototype .modal-example .cancel').on('click', function () {
        $(this).parents('.modal-example').removeClass('show');
        $('.modal-overlay').removeClass('show');
    });

    // Stop forms in email modal from reloading the page
    $("#email-form, #verify-form").submit(function (e) {
        e.preventDefault();
    });

    // Show hide content within email modal
    $('#step-email-address .progress-step').on('click', function () {
        var email_address = $('#step-email-address input').val();
        
        $('#step-email-address').removeClass('show');
        $('#step-verify-email').addClass('show');
        if ( email_address.length ) {
            $('.user-email').text(email_address);
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
            // this actually breaks if you input an emoji like 👨‍👩‍👧‍👦....
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

    $('#step-verify-email #verify-btn').on('click', function(){
        var code = inputElements.map(({ value }) => value).join('');

        if (code == '1234' ) {
            $('.number-code').removeClass('error');
            $('#step-verify-email .success-icon').addClass('show');

            setTimeout(function () {
                $('#step-verify-email').removeClass('show');
                $('#step-email-success').addClass('show');
            }, 3000);

        } else {
            $('.number-code').addClass('error');
        }


    });



    // Close modal and scroll page on download / email success
    $('.success-scroll').on('click', function () {
        $(this).parents('.modal-example').removeClass('show');
        $('.modal-overlay').removeClass('show');

        setTimeout(function () {

            var window_width = window.innerWidth,
                anchor = $("#next-steps"),
                extra_padding;

            if (window_width <= 768) {
                extra_padding = 60;
            } else {
                extra_padding = 125;
            }

            $('html,body').animate({ scrollTop: anchor.offset().top - extra_padding }, 'fast');
        }, 200);
    });


    // Stepped nav functionality
    if ($('#ecb-prototype .stepped-navigation-wrapper').length) {

        var active_step = 'nav-step-' + $('.step-title').attr('data-step');

        $('#' + active_step).addClass('active');
        sessionStorage.setItem(active_step, 'visited');

        var step_titles = ["position.html", "hours.html", "pay.html", "review.html", "finalise.html"];
        //host = window.location.host;
        var completed_steps = active_step - 1;

        for (var step = 0; step < step_titles.length; step++) {
            var step_number = step + 1,
                step_str = 'nav-step-' + step_number;
            var state = sessionStorage.getItem(step_str);

            if (state == "visited" && !$('#' + step_str).hasClass('active')) {
                $('#' + step_str).addClass('completed').attr('href', '/bga-style-guide/prototypes/ecb/' + step_titles[step]);
            }
        }
    }

    // Reset tool on "Create new contract"
    $('#ecb-prototype .clear-tool').on('click', function () {
        sessionStorage.clear();
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


    // Save text input & select answers and re-populate on page load
    $('#ecb-prototype input[type=text], #ecb-prototype select').on('change', function () {
        var input_field = $(this).attr('id'),
            input_value = $(this).val();
        sessionStorage.setItem(input_field, input_value);
    });

    var save_input_answers = function (id) {
        if (sessionStorage.getItem(id) !== null) {
            var user_input = sessionStorage.getItem(id);
            $('#' + id).val(user_input);

            if (user_input !== "") {
                $('.' + id).addClass('added').find('.component-text span').text(user_input);
            }
        }
    };

    // Save checkbox answers and re-populate on page load
    $('#ecb-prototype input[type=checkbox]').on('change', function () {
        var input_field = $(this).attr('id');
        if ($(this).is(":checked")) {
            input_value = $(this).parents('.checkboxes').find('label').text();
            sessionStorage.setItem(input_field, input_value);
        } else {
            sessionStorage.setItem(input_field, "");
        }
    });
    var save_checkbox_answers = function (id) {
        if (sessionStorage.getItem(id) !== null) {
            var user_input = sessionStorage.getItem(id);

            if (user_input !== "") {
                $('#' + id).prop('checked', true);
                $('.' + id).addClass('added');
            }
        }
    };

    // Save radio answers and re-populate on page load
    $('#ecb-prototype input[type=radio]').on('change', function () {
        var input_field = $(this).parents('.radios').attr('id'),
            input_value = $(this).attr('id'),
            field_text = $(this).attr('data-value');
        sessionStorage.setItem(input_field, input_value);
        sessionStorage.setItem(input_field + '-text', field_text);
    });
    var save_radio_answers = function (radio_group) {
        if (sessionStorage.getItem(radio_group) !== null) {
            var user_input = sessionStorage.getItem(radio_group),
                field_text = sessionStorage.getItem(radio_group + '-text');

            $('#' + user_input).prop('checked', true);
            $('.' + radio_group).addClass('added').find('.component-text span').text(field_text);
        }
    };

    // Change PAY UNITS on radio button selection (pay page)
    $('#ecb-prototype #pay-rate-units input').on('change', function () {
        $('#pay-rate-units label span').text($(this).attr('data-value'));
        
        if ($(this).attr('data-value') == 'weekly') {
            $('.pay-unit').text('per week');
            $('.pay-rate .pay-units').text('per week');
            
        } else {
            $('.pay-unit').text('per hour');
            $('.pay-rate .pay-units').text('per hour');
        }
    });
    // Change PAY UNITS on text input change (pay page)
    $('.clause-box-input#pay-rate').on('change', function () {
        var pay_units = sessionStorage.getItem('pay-rate-units');

        if (pay_units == 'hourly') {
            $('.pay-unit, .pay-units').text('per hour');
        } else {
            $('.pay-unit, .pay-units').text('per week');
        }
    });

    // Apply saved user answer on page load
    if ($('.position-page').length) {
        save_input_answers('position-title');
        save_input_answers('business-structure');
        save_radio_answers('employment-type');
    }

    if ($('.hours-page').length) {
        save_input_answers('hours-worked');
        save_checkbox_answers('flexible-hours');
    }

    if ($('.pay-page').length) {
        save_input_answers('pay-rate');
        save_radio_answers('pay-rate-units');
        save_radio_answers('pay-frequency');

        var pay_units = sessionStorage.getItem('pay-rate-units');
        if ((pay_units !== null) && (pay_units == 'weekly')) {
            $('.pay-unit').text('per week');
            $('.pay-rate .pay-units').text('per week');
            $('#pay-rate-units label span').text('weekly');
        }
    }

    if ($('.review-page').length) {
        if (sessionStorage.getItem('flexible-hours') == "" || sessionStorage.getItem('flexible-hours') == null) {
            $('.results-edit-answers-component.flexible-hours').addClass('d-none');
        }

        $('.results-edit-answers-component').each(function () {
            var field_type = sessionStorage.getItem($(this).attr('data-field'));
            $(this).find('.answers span').text(field_type);
        });
        if (sessionStorage.getItem('pay-rate-units') == 'weekly') {
            $('.answers .pay-units').text('per week');
        }
    }


}); //End doc ready
