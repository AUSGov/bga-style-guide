/*jshint browser: true, devel: true, jquery: true*/

$(document).ready(function () {

    // Check page is part of the BGA prototype
    if ($("#bga-prototype").length) {

        console.log('bga prototype page');

        // Inactive feature modal
        $('a[href=""], a:not([href]), .search-container input, .name-search input, .business-info li, .callout-box button').on("click", function () {
            console.log('no link');
            $(".modal-example").addClass("show");
            $(".modal-overlay").addClass("show");

        });

        $(".modal-example .close").on("click", function () {
            $(".modal-example").removeClass("show");
            $(".modal-overlay").removeClass("show");
        });

        $(".modal-overlay").on("click", function () {
            $(".modal-example").removeClass("show");
            $(".modal-overlay").removeClass("show");
        });


        // Deactivate second level page links on mobile so dropdowns work
        $('.level-2.nav-dropdown').on('click', function (e) {
            var screen_width = $(window).width();
            if (screen_width < 768) {
                e.preventDefault();
            }
        });


        // Add fragments to URL to track task success
        // Add url fragments for task tracking in Loop11    
        var set_fragment = function (task_str) {
            var current_fragment = sessionStorage.getItem('fragment');
            if (!current_fragment) {
                current_fragment = "";
            }

            var new_fragment;

            if (current_fragment.includes(task_str)) {
                new_fragment = current_fragment;

            } else {
                new_fragment = current_fragment + task_str;
            }
            window.location.hash = new_fragment;
            sessionStorage.setItem('fragment', new_fragment);
        };


        // GET current task function
        var get_current_task = function () {
            var current_task;
            if ((sessionStorage.getItem('T3') == 'true')) {
                current_task = 'T3';
                $('.loop11-instructions .header-wrapper').addClass('show');
            } else if ((sessionStorage.getItem('T2') == 'true') & !(sessionStorage.getItem('T3') == 'true')) {
                current_task = 'T2';
                $('.loop11-instructions .header-wrapper').addClass('show');
            } else if ((sessionStorage.getItem('T1') == 'true') & !(sessionStorage.getItem('T2') == 'true') & !(sessionStorage.getItem('T3') == 'true')) {
                current_task = 'T1'
            }
            sessionStorage.setItem('current_task', current_task);
            console.log(current_task);

        };


        // Set task number to true in sessionStorage when a task landing page loads & set nav steps for each task.

        if (window.location.href.includes("task1-start.html")) {
            sessionStorage.setItem('T1', 'true');
        }

        if (window.location.href.includes("task2-start.html")) {
            sessionStorage.setItem('T2', 'true');
        }

        if (window.location.href.includes("task3-start.html")) {
            sessionStorage.setItem('T3', 'true');
        }

        get_current_task();


        // Track button clicks with URL fragments

        $('.nav-dropdown.level-1').on('click', function () {
            var task = sessionStorage.current_task;
            if (task != 'undefined') {
                set_fragment(task + "-openmenu");
            }
        });

        $('.nav .submenu li').on('click', function () {
            var task = sessionStorage.current_task;
            if (task != 'undefined') {
                set_fragment(task + "-linkclick");
            }
        });

        if (window.location.href.includes("manage-your-environmental-impact.html") || window.location.href.includes("manage-energy-use.html") || location.href.includes("environmental-impact.html") ) {
            var task = sessionStorage.current_task;
            if (task == 'T1') {
                set_fragment(task + "-success");
            }
        }

        if (window.location.href.includes("registrations-your-business-needs.html") || window.location.href.includes("register-for-an-australian-business-number-abn.html") ) {
            var task = sessionStorage.current_task;
            if (task == 'T2') {
                set_fragment(task + "-success");
            }
        }

        if (window.location.href.includes("grants-finder.html") ) {
            var task = sessionStorage.current_task;
            if (task == 'T3') {
                set_fragment(task + "-success");
            }
        }
        



        // On page unload add page location to sessionStorage in 'prev_location' item

        $(window).on('beforeunload', function () {
            var location = window.location.pathname;
            sessionStorage.setItem('prev-location', location);
        });

        // Load existing URL fragments on page load.
        var existing_fragment = sessionStorage.getItem('fragment');
        if (existing_fragment) {
            window.location.hash = existing_fragment;
        };




    } // End if #bga-prototype

}); // End doc ready


// Ensure URL fragments are added to the url (this catches back button clicks)
window.onhashchange = function () {
    var existing_fragment = sessionStorage.getItem('fragment');
    if (existing_fragment) {
        window.location.hash = existing_fragment;
    };
}

