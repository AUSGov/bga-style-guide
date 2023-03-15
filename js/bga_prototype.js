/*jshint browser: true, devel: true, jquery: true*/

$(document).ready(function () {

// Check page is part of the BGA prototype
if( $("#bga-prototype").length ) {

    console.log('bga prototype page');

    // Modal functionality
    // Empty href modal
    $('a[href=""]').on("click", function(){
        console.log('no link');
        $(".modal-example").addClass("show");
        $(".modal-overlay").addClass("show");
        
    });

    $('a').on("click", function(){
        
    });
    
    $(".modal-example .close").on("click", function(){
        $(".modal-example").removeClass("show");
        $(".modal-overlay").removeClass("show");
    });

    $(".modal-overlay").on("click", function(){
        $(".modal-example").removeClass("show");
        $(".modal-overlay").removeClass("show");
    });
    
    // Search not working modal
    /*$(".search-bar-search").on("click", function(){
        $(".modal-wrapper").addClass("active");
        $(".modal-background").addClass("active");
    });*/

        










} // End if #bga-prototype

}); // End doc ready
