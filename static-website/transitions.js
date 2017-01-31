

// To do a back button I think I'm just gonna do this jank jumplist

var screen_enum = { HOME: 1, TEST_EDIT:2, TEST_VIEW:3, TEMPLATE_EDIT:4, ADMIN_HOME:5 };

var screen = screen_enum.HOME;

function transfer_back(){

    if (screen == screen_enum.HOME){

    }
    else if (screen == screen_enum.TEST_EDIT) {
        toggle_test_edit();
        screen == screen_enum.ADMIN_HOME;
    }
    else if (screen == screen_enum.TEST_VIEW) {
        toggle_test_view();
        screen == screen_enum.ADMIN_HOME;
    }
    else if (screen == screen_enum.TEMPLATE_EDIT) {
    }
    else if (screen == screen_enum.ADMIN_HOME){
    }

}

// =================================
// These functions all have to do with the right panel on the home screen

function show_trial_login(){
    $("#right-hand-container").children().hide();
    $("#trial-login-div").show();
}

function show_training_info(){
    $("#right-hand-container").children().hide();
    $("#training-info-div").show();
}

function show_about(){
    $("#right-hand-container").children().hide();
    $("#about-div").show();
}

function show_admin_login(){
    $("#right-hand-container").children().hide();
    $("#admin-login-div").show();
}

// =================================
// =================================


function transfer_to_test_view(){
    $("#main-admin-panel").slideToggle();
    $("#admin-test-view-panel").slideToggle();
    screen = screen_enum.TEST_VIEW;
}

function toggle_test_view(){

    $("#main-admin-panel").slideToggle();
    $("#admin-test-view-panel").slideToggle();

    if (screen == screen_enum.TEST_VIEW)
        screen = screen_enum.HOME;
    else
        screen = screen_enum.TEST_VIEW;
}

function toggle_test_edit(){
    $("#main-admin-panel").slideToggle();
    $("#admin-test-edit-panel").slideToggle();
    screen = screen_enum.TEST_EDIT;
}

function toggle_template_edit(){
    $("#main-admin-panel").slideToggle();
    $("#admin-test-view-panel").slideToggle();

    if (screen == screen_enum.TEST_VIEW)
        screen = screen_enum.HOME;
    else
        screen = screen_enum.TEST_VIEW;
}



function transfer_to_test_edit(){
}

function transfer_to_test_new(){
}

function transfer_to_test_template_edit(){
}


function show_training(){



}



function test(){
    roll_up_reveal_navbar();
}

function roll_up_reveal_navbar(){
    $("#home-row").slideUp();
    $("#navbar-row").show();
    $("#slider-container").show();
}

function show_admin_window(){


    // Roll up the navbar and open the content container
    roll_up_reveal_navbar();
    $("#main-admin-panel").slideDown();

    // Try and get the test-set names and statuses
    if (!get_test_set_statuses()){

    }
    if (!get_test_template_data()){

    }

    screen = screen_enum.ADMIN_HOME;
}


