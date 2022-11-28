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
            } else {
                $('#page-header').removeClass('fixed');
            }
        });
    } 




}); //End doc ready
