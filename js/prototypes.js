/*jshint browser: true, devel: true, jquery: true*/

$(document).ready(function () {

//ECB REVISED FLOW PROTOTYPE
    

    // Open & close modals
    $('#ecb-prototype .modal-trigger').on('click', function(){
        var modal = $(this).attr('data-modal');
        $('#' + modal).addClass('show');
        $('.modal-overlay').addClass('show');
    });
    $('#ecb-prototype .modal-example .close').on('click', function(){
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




}); //End doc ready
