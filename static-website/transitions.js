

// To do a back button I think I'm just gonna do this jank jumplist
var screen_enum = { HOME: 1, TEST_EDIT:2, TEST_VIEW:3, TEMPLATE_EDIT:4, ADMIN_HOME:5 };
var screen = screen_enum.HOME;

function transfer_back(){

    if (screen == screen_enum.HOME){
        // Do nothing
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
        toggle_admin_view();
        screen == screen_enum.HOME;
        selected_template = "";
        selected_trial = "";
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
    //$("#admin-test-view-panel").slideToggle();
    $("#trial-view-admin-panel").slideToggle();

    if (screen == screen_enum.TEST_VIEW)
        screen = screen_enum.ADMIN_HOME;
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

function toggle_admin_view(){
    $("#home-row").slideToggle();
    $("#navbar-row").toggleClass("hidden");
    //$("#slider-container").slideToggle();
    $("#main-admin-panel").slideToggle();

    if (screen == screen_enum.ADMIN_HOME)
        screen = screen_enum.HOME;
    else
        screen = screen_enum.ADMIN_HOME;

    // Try and get the test-set names and statuses
    if (!get_test_set_statuses()){
        // error
    }
    if (!get_test_template_data()){
        // error
    }
}

function transfer_to_test_edit(){
}

function transfer_to_test_new(){
}

function transfer_to_test_template_edit(){
}

function show_admin_window(){

    // Roll up the navbar and open the content container
    toggle_admin_view();


}


