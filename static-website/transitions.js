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
                    TESTING_FINISH:14,
                    NEW_ADMIN:15,
                    TEMPLATE_RENDER:16
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
    else if (screen == screen_enum.NEW_ADMIN) {
        toggle_new_admin();
        screen = screen_enum.ADMIN_HOME;
    }
    else if (screen == screen_enum.TEMPLATE_RENDER) {
        toggle_view_template_render();
        screen = screen_enum.TEST_VIEW;
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
    $("#right-hand-container").children().addClass("hidden");
    $("#trial-login-div").toggleClass("hidden");
}

function show_training_info(){
    $("#right-hand-container").children().addClass("hidden");
    $("#training-info-div").toggleClass("hidden");
}

function show_about(){
    $("#right-hand-container").children().addClass("hidden");
    $("#about-div").toggleClass("hidden");
}

function show_admin_login(){
    $("#right-hand-container").children().addClass("hidden");
    $("#admin-login-div").toggleClass("hidden");
}

// ========================================================================
// =           Toggle functions for opening and closing pages             =
// ========================================================================

// Open and close the view test set page
function toggle_view_test_set(){

    $("#main-admin-panel").toggleClass("hidden");
    $("#view-test-set-admin-panel").toggleClass("hidden");

    if (screen == screen_enum.TEST_VIEW)
        screen = screen_enum.ADMIN_HOME;
    else
        screen = screen_enum.TEST_VIEW;
}

// Open and close the new test set page
function toggle_new_test_set(){

    $("#main-admin-panel").toggleClass("hidden");
    $("#new-test-set-admin-panel").toggleClass("hidden");

    if (screen == screen_enum.TEST_NEW)
        screen = screen_enum.ADMIN_HOME;
    else
        screen = screen_enum.TEST_NEW;
}

// Open and close the new template page
function toggle_new_template(){

    $("#main-admin-panel").toggleClass("hidden");
    $("#new-template-admin-panel").toggleClass("hidden");

    if (screen == screen_enum.TEMPLATE_NEW)
        screen = screen_enum.HOME;
    else
        screen = screen_enum.TEMPLATE_NEW;
}

// Open and close the new template page
function toggle_new_admin(){

    $("#main-admin-panel").toggleClass("hidden");
    $("#new-admin-admin-panel").toggleClass("hidden");

    if (screen == screen_enum.NEW_ADMIN)
        screen = screen_enum.HOME;
    else
        screen = screen_enum.NEW_ADMIN;
}

// Open and close the new template page
function toggle_view_template(){

    $("#main-admin-panel").toggleClass("hidden");
    $("#view-template-admin-panel").toggleClass("hidden");

    if (screen == screen_enum.TEMPLATE_VIEW)
        screen = screen_enum.HOME;
    else
        screen = screen_enum.TEMPLATE_VIEW;
}

function toggle_admin_panel() {

    $("#home-row").toggleClass("hidden");
    $("#navbar-row").toggleClass("hidden");
    $("#main-admin-panel").toggleClass("hidden");

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
    $("#home-row").toggleClass("hidden");
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

function toggle_finish_from_wait(){
    $("#testing-wait-panel").toggleClass("hidden");
    $("#testing-finish-panel").toggleClass("hidden");
}

function toggle_finish_from_test_start(){
    $("#testing-start-panel").toggleClass("hidden");
    $("#testing-finish-panel").toggleClass("hidden");
}

function stop_testing(){
    $("#testing-finish-panel").toggleClass("hidden");
    $("#home-row").toggleClass("hidden");
}

//Brings the user back to the main screen from the training info
function toggle_home_from_training() {
    $("#training-panel").toggleClass("hidden");
    $("#home-row").toggleClass("hidden");
    window.clearInterval(training_page_timer);
    training_page_timer = null;
}

//Brings the user back from the selection training to the training info
function toggle_intro_from_selection() {
    $("#training-selection").toggleClass("hidden");
    $("#training-panel").toggleClass("hidden");
    window.clearInterval(training_page_timer);
    training_page_timer = null;
}

//Brings the user back from the practice training to the selection training
function toggle_selection_from_practice() {
    $("#training-practice").toggleClass("hidden");
    $("#training-selection").toggleClass("hidden");
    window.clearInterval(training_page_timer);
    training_page_timer = null;
}

//Brings the user back from the practice training to the selection training
function toggle_practice_from_results() {
    $("#training-results").toggleClass("hidden");
    $("#training-practice").toggleClass("hidden");
    window.clearInterval(training_page_timer);
    training_page_timer = null;
}

//This is the function which brings the training screen to the front
function toggle_training_intro_view() {
    $("#home-row").toggleClass("hidden");
    $("#training-panel").toggleClass("hidden");
    $("#training-time").text(parseInt(120));

    window.clearInterval(training_page_timer);
    training_page_timer = null;
    screen = screen_enum.TRAINING_INFO;
}

function toggle_training_selection_view() {
    $("#training-panel").toggleClass("hidden");
    $("#training-selection").toggleClass("hidden");
    window.clearInterval(training_page_timer);
    training_page_timer = null;
    //screen = screen_enum.TRAINING_HOW_WORK;
}

function toggle_training_practice_view() {

    $("#graph-space-training").empty();

    if (training_page_timer == null){
      training_page_timer =  window.setInterval(training_page_timeout, 1000);
    }
    build($("#graph-space-training"), graph_context.TRAINING, graph_type.STAR, generate_class_data(20))

    $("#training-selection").toggleClass("hidden");
    $("#training-practice").toggleClass("hidden");
}

function toggle_training_results_view() {

    window.clearInterval(training_page_timer);
    training_page_timer = null;

    $("#training-practice").toggleClass("hidden");
    $("#training-results").toggleClass("hidden");

    let time = $("#training-time").text();
    $("#practice-time").text(time);

    let selected_points_arr = [];
    let selected_class_arr = [];

    for (let i = 0; i < training_graph_arr.length; i++){
        selected_points_arr.push(training_graph_arr[i].selected_point);
        selected_class_arr.push(training_graph_arr[i].class);
    }

    let score = 0;
    for (let i = 0; i < training_graph_arr.length/2; i++) {
        if (training_graph_arr[i].class == 1)
            score++;
    }
    for (let i = training_graph_arr.length/2; i < training_graph_arr.length; i++) {
        if (training_graph_arr[i].class == 2)
            score++;
    }

    score = (score / training_graph_arr.length) * 100;

    $("#practice-score").text(score + "%");

}

function toggle_back_to_home() {
    window.clearInterval(training_page_timer);
    training_page_timer = null;
    $("#training-results").toggleClass("hidden");
    $("#home-row").slideToggle();
}

function toggle_view_template_render(){

    $("#view-template-render-admin-panel").toggleClass("hidden");
    $("#view-test-set-admin-panel").toggleClass("hidden");

    if (screen == screen_enum.TEMPLATE_RENDER)
        screen = screen_enum.TEST_VIEW;
    else
        screen = screen_enum.TEMPLATE_RENDER;

}