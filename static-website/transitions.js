// Transitions.js handles the various transitions and flows of the application.
// We have two main sections. The flow section which contains the transfer functions.
// And the toggle functions which open and close certain pages.
//
// The flow section relies on keeping track of what page the user is currently on
// and handling the possible options the user has to navigate forward and backwards.
//
// The toggle section handles each individual page toggle. We have used toggle functions
// to allow esay single function hiding and showing of pages. It's recommended that this
// is continued to remove the extra code needed to determine if the page is opening or closing

// To do a back button I think I'm just gonna do this jank jumplist

var screen_enum = {
                    HOME: 1,
                    ADMIN_HOME:2,
                    TEST_NEW:3,
                    TEST_VIEW:4,
                    TEMPLATE_NEW:5,
                    TEMPLATE_VIEW:6,
                    TRAINING_INFO:7,
                    TRAINING_HOW_WORK:8,
                    TRAINING_PRAC:9,
                    TRAINING_RESULTS:10,
                    TESTING_START:11,
                    TESTING_TEST:12,
                    TESTING_WAIT:13,
                    TESTING_FINISH:14
                  };

var screen = screen_enum.HOME;

function transfer_back(){

    if (screen == screen_enum.HOME){
        // Do nothing
    }

    // ============= TRAINING ======================

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

    // ============= TESTING =======================
    // Should the back button even be allowed in testing?

    else if (screen == screen_enum.TESTING_START) {
        //toggle_home_from_training();
        //screen = screen_enum.HOME;
    }
    else if (screen == screen_enum.TESTING_TEST) {
        //toggle_intro_from_selection();
        //screen = screen_enum.TRAINING_INFO;
    }
    else if (screen == screen_enum.TESTING_WAIT) {
        //toggle_selection_from_practice();
        //screen = screen_enum.TRAINING_HOW_WORK;
    }
    else if (screen == screen_enum.TESTING_FINISH) {
        //toggle_practice_from_results();
        //screen = screen_enum.TRAINING_PRAC;
    }

    // ============== ADMIN PAGE ===================

    else if (screen == screen_enum.TEST_NEW) {
        toggle_new_test_set();
        screen = screen_enum.ADMIN_HOME;
    }
    else if (screen == screen_enum.TEST_VIEW) {
        toggle_view_test_set();
        screen = screen_enum.ADMIN_HOME;
    }
    else if (screen == screen_enum.TEMPLATE_NEW) {
        toggle_new_template();
        screen = screen_enum.ADMIN_HOME;
    }
    else if (screen == screen_enum.TEMPLATE_VIEW) {
        toggle_view_template();
        screen = screen_enum.ADMIN_HOME;
    }
    else if (screen == screen_enum.ADMIN_HOME){
        toggle_admin_panel();
        screen = screen_enum.HOME;
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
// ===========================================================================
// = These functions all have to do with the right panel on the home screen  =
// ==========================================================================

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

// ========================================================================
// =           Toggle functions for opening and closing pages             =
// ========================================================================

// Open and close the view test set page
function toggle_view_test_set(){

    $("#main-admin-panel").slideToggle();
    $("#view-test-set-admin-panel").slideToggle();

    if (screen == screen_enum.TEST_VIEW)
        screen = screen_enum.ADMIN_HOME;
    else
        screen = screen_enum.TEST_VIEW;
}

// Open and close the new test set page
function toggle_new_test_set(){

    $("#main-admin-panel").slideToggle();
    $("#new-test-set-admin-panel").slideToggle();

    if (screen == screen_enum.TEST_NEW)
        screen = screen_enum.ADMIN_HOME;
    else
        screen = screen_enum.TEST_NEW;
}

// Open and close the new template page
function toggle_new_template(){

    $("#main-admin-panel").slideToggle();
    $("#new-template-admin-panel").slideToggle();

    if (screen == screen_enum.TEMPLATE_NEW)
        screen = screen_enum.HOME;
    else
        screen = screen_enum.TEMPLATE_NEW;
}


// Open and close the new template page
function toggle_view_template(){

    $("#main-admin-panel").slideToggle();
    $("#view-template-admin-panel").slideToggle();

    if (screen == screen_enum.TEMPLATE_VIEW)
        screen = screen_enum.HOME;
    else
        screen = screen_enum.TEMPLATE_VIEW;
}

function toggle_admin_panel() {

    $("#home-row").slideToggle();
    $("#navbar-row").toggleClass("hidden");
    $("#main-admin-panel").slideToggle();

    if (screen == screen_enum.ADMIN_HOME)
        screen = screen_enum.HOME;

    else {

        screen = screen_enum.ADMIN_HOME;
        // Try and get the test-set names and statuses
        if (!get_test_set_statuses(credentials.auth_token, $("#test-status-list-filter-select").val())){
            // error
        }
        if (!get_template_ids(credentials.auth_token, $("#test-template-filter").val())){
            // error
        }
    }
}

function toggle_start_testing(){
    $("#home-row").slideToggle();
    $("#testing-start-panel").toggleClass("hidden");
}

function toggle_test_from_start(){
    $("#testing-start-panel").toggleClass("hidden");
    $("#testing-test-panel").toggleClass("hidden");

    // Handle population logic
    // Keep track of time
}

function toggle_wait_from_test(){
    $("#testing-test-panel").toggleClass("hidden");
    $("#testing-wait-panel").toggleClass("hidden");

    // Keep track of time
    // maybe display something like a game?
}

function toggle_test_from_wait(){
    $("#testing-test-panel").toggleClass("hidden");
    $("#testing-wait-panel").toggleClass("hidden");

    // Handle population logic
    // Keep track of time
}

function toggle_wait_from_test(){
    $("#testing-test-panel").toggleClass("hidden");
    $("#testing-finish-panel").toggleClass("hidden");

}

function stop_testing(){
    $("#testing-finish-panel").toggleClass("hidden");
    $("#home-row").slideToggle();
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
    $("#training-panel").toggleClass("hidden");

    screen = screen_enum.TRAINING_INFO;
}

function toggle_training_selection_view() {
    $("#training-panel").toggleClass("hidden");
    $("#training-selection").toggleClass("hidden");

    //screen = screen_enum.TRAINING_HOW_WORK;
}
function toggle_training_practice_view() {

    $("#graph-space-training").empty();


    build($("#graph-space-training"), graph_context.TRAINING, graph_type.STAR, generate_class_data(20))


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
