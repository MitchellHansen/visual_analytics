

// To do a back button I think I'm just gonna do this jank jumplist
var screen_enum = { HOME: 1, TEST_EDIT:2, TEST_VIEW:3, TEMPLATE_EDIT:4, ADMIN_HOME:5, TRAINING_INFO:6, TRAINING_HOW_WORK:7,TRAINING_PRAC:8 ,TRAINING_RESULTS:9, TEST_NEW:10, TEMPLATE_VIEW:11  };
var screen = screen_enum.HOME;

function transfer_back(){

    if (screen == screen_enum.HOME){
        // Do nothing
    }
    else if (screen == screen_enum.TRAINING_INFO) {
        toggle_home_from_training();
        screen = screen_enum.HOME;
    }
    else if (screen == screen_enum.TRAINING_HOW_WORK) {
        toggle_intro_from_selection();
        screen = screen_enum.TRAINING_INFO;
    }
    else if (screen == screen_enum.TRAINING_PRAC) {
        toggle_selection_from_practice();
        screen = screen_enum.TRAINING_HOW_WORK;
    }
    else if (screen == screen_enum.TRAINING_RESULTS) {
        toggle_practice_from_results();
        screen = screen_enum.TRAINING_PRAC;
    }
    else if (screen == screen_enum.TEST_EDIT) {
        toggle_test_edit();
        screen = screen_enum.ADMIN_HOME;
    }
    else if (screen == screen_enum.TEST_VIEW) {
        toggle_test_view();
        screen = screen_enum.ADMIN_HOME;
    }
    else if (screen == screen_enum.TEST_NEW) {
        toggle_test_new();
        screen = screen_enum.ADMIN_HOME;
    }
    else if (screen == screen_enum.TEMPLATE_EDIT) {
        toggle_template_edit();
        screen = screen_enum.ADMIN_HOME;
    }
    else if (screen == screen_enum.ADMIN_HOME){
        toggle_admin_view();
        screen == screen_enum.HOME;
        selected_template = "";
        selected_trial = "";
    }

}
//I am going to try something similar to the back functionality Mitchell implimented with the transfer_back back button
//but this is for moving forward in the training
function transfer_through_training() {
    if (screen == screen_enum.HOME) {
        // Do nothing
    }
    else if (screen == screen_enum.TRAINING_INFO) {
        toggle_training_selection_view();
        screen = screen_enum.TRAINING_HOW_WORK;
    }
    else if (screen == screen_enum.TRAINING_HOW_WORK) {
        toggle_training_practice_view();
        screen = screen_enum.TRAINING_PRAC;
    }
    else if (screen == screen_enum.TRAINING_PRAC) {
        toggle_training_results_view();
        screen = screen_enum.TRAINING_RESULTS;
    }
    else if (screen == screen_enum.TRAINING_RESULTS) {
        toggle_back_to_home();
        screen = screen_enum.HOME;
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

function toggle_test_new(){

    $("#main-admin-panel").slideToggle();
    $("#trial-new-admin-panel").slideToggle();

    if (screen == screen_enum.TEST_NEW)
        screen = screen_enum.ADMIN_HOME;
    else
        screen = screen_enum.TEST_NEW;
}

function toggle_test_edit(){
    $("#main-admin-panel").slideToggle();
    $("#admin-test-edit-panel").slideToggle();
    screen = screen_enum.TEST_EDIT;
}

function toggle_template_edit(){
    $("#main-admin-panel").slideToggle();
    $("#template-edit-admin-panel").slideToggle();

    if (screen == screen_enum.TEMPLATE_EDIT)
        screen = screen_enum.HOME;
    else
        screen = screen_enum.TEMPLATE_EDIT;
}

function toggle_template_view(){
    $("#main-admin-panel").slideToggle();
    $("#template-view-admin-panel").slideToggle();

    if (screen == screen_enum.TEMPLATE_VIEW)
        screen = screen_enum.HOME;
    else
        screen = screen_enum.TEMPLATE_VIEW;
}

function toggle_admin_view() {

    $("#home-row").slideToggle();
    $("#navbar-row").toggleClass("hidden");
    $("#main-admin-panel").slideToggle();

    if (screen == screen_enum.ADMIN_HOME)
        screen = screen_enum.HOME;
    else {
        screen = screen_enum.ADMIN_HOME;
        // Try and get the test-set names and statuses
        if (!get_test_set_statuses()){
            // error
        }
        if (!get_template_ids()){
            // error
        }
    }
}

//Brings the user back to the main screen from the training info
function toggle_home_from_training() {
    $("#training-panel").toggleClass("hidden");
    $("#home-row").slideToggle();
}
//Brings the user back from the selection training to the training info
function toggle_intro_from_selection() {
    $("#training-selection").toggleClass("hidden");
    $("#training-panel").toggleClass("hidden");
}
//Brings the user back from the practice training to the selection training
function toggle_selection_from_practice() {
    $("#training-practice").toggleClass("hidden");
    $("#training-selection").toggleClass("hidden");
}
//Brings the user back from the practice training to the selection training
function toggle_practice_from_results() {
    $("#training-results").toggleClass("hidden");
    $("#training-practice").toggleClass("hidden");
}

//This is the function which brings the training screen to the front
function toggle_training_intro_view() {
    $("#home-row").slideToggle();
    //$("#navbar-row").toggleClass("hidden");
    //$("#training-panel").slideToggle();
    $("#training-panel").toggleClass("hidden");
   // $("#training-panel").slideToggle();

    screen = screen_enum.TRAINING_INFO;
}

function toggle_training_selection_view() {
    $("#training-panel").toggleClass("hidden");
    $("#training-selection").toggleClass("hidden");

    //screen = screen_enum.TRAINING_HOW_WORK;

}
function toggle_training_practice_view() {
    training_graph_arr.push(build($("#svg-row")));
    training_graph_arr.push(build($("#svg-row")));
    training_graph_arr.push(build($("#svg-row")));
    training_graph_arr.push(build($("#svg-row")));
    $("#training-selection").toggleClass("hidden");
    $("#training-practice").toggleClass("hidden");
}
function toggle_training_results_view() {
    $("#training-practice").toggleClass("hidden");
    $("#training-results").toggleClass("hidden");
}
function toggle_back_to_home() {
    $("#training-results").toggleClass("hidden");
    $("#home-row").slideToggle();
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


