
let credentials = {
    "logged_in" : false,
    "auth_token": ""
};

let login_uuid = "345634563-erth3--dfgsdfg";

var selected_trial = "";
var selected_template = "";

window.onload = function(e){

    // Set the onchange function for the admin page test filter
    $("#test-status-list-filter-select").change(function(){
        get_test_set_statuses();
    });

    // Set the onchange functions for the admin page template filter
    $("#test-template-filter").change(function(){
        get_template_ids();
    });

};


// ======================================================================
// =  Handlers take a buttons event and tie them to middle or api code  =
// ======================================================================

// When the admin clicks the [Login] button on the [admin sign in page]
function admin_login_handler(){

    // Get the creds from the input, and pass them to the api
    var admin_credentials_combo = $("#admin-login-form").serializeArray();

    // API call to the admin_login endpoint
    admin_login(admin_credentials_combo[0].value, admin_credentials_combo[1].value).done(function() {

        if (credentials.logged_in) {
            toggle_admin_panel();
        }
        else{
            alert("Log in failed");
        }
    });
}

// When the user clicks [Login] on the [testing login page]
function trial_login_handler(){

    // Get the login token from the user and get the trial data associated with that login
    var login_code = $("#trial-login-form").serializeArray();

    if (login_code == ""){
        // do nothing

    } else {

        trial_login(login_code[0].value).done(function(value) {
            // Toggle view trial, or maybe start trial function
        });
    }
}

// When the user clicks the [View Template] button on the [admin home page]
function view_template_handler(){

    if (selected_template == ""){
        // do nothing

    } else {

        toggle_view_template();

    }
}

// When the user clicks the [View Template] button on the [admin home page]
function new_template_handler(){

    if (credentials.logged_in == false){
        alert("You are not logged in. Try logging in again");

    } else {

        toggle_new_template();

    }
}

// When the user clicks the [View Test Set] button on the [admin home page]
function view_test_set_handler(){

    if (selected_trial == ""){
        // do nothing
    }
    else {

        get_test_set_details(credentials.auth_token).done(function(value) {
            populate_view_test_page(value);
            toggle_view_test_set();
        });

    }
}

// When the user clicks the [New Test Set] button on the [admin home page]
function new_test_set_handler(){

    if (credentials.logged_in == false){

        alert("You are not logged in. Try logging in again");
    }
    else {

        toggle_new_test_set();
    }
}

// When the user clicks the [Export] button on the [admin home page]
function export_test_set_handler(){


    function download(text, name, type) {
      let a = document.getElementById("download-button");
      let file = new Blob([text], {type: type});
      a.href = URL.createObjectURL(file);
      a.download = name;
    }

    if (selected_trial == ""){
        // error
    }
    else {

        let csv;
        export_csv().done(function(value) {
            csv = value;
            download(csv, selected_trial + ".csv", 'text/plain');
        });
    }
}

//
function begin_training_handler(){
    toggle_training_intro_view();
}

function training_fwd_movement() {
    transfer_through_training();
}



// ===============================================================
// = Populate functions take the *RAW* response from an API call =
// = and populate the page which the data is intended for        =
// ===============================================================


function populate_view_test_page(test_details){

    // list all the id's
    $("#trial-view-admin-panel-id-list").empty();

    var html = "";
    for (var i in test_details.users){
        html += test_details.users[i][0] + "<br>";
    }

    $("#trial-view-admin-panel-id-list").append(html);


    $("#trial-view-admin-panel-details").empty();

    // Now fill in the other details
    $("#trial-view-admin-panel-details").append("<p>Trial Name  : " + test_details.test_details[0][0] + "<p>");
    $("#trial-view-admin-panel-details").append("<p>Wait time   : " + test_details.test_details[0][1] + "<p>");
    $("#trial-view-admin-panel-details").append("<p>Close time  : " + test_details.test_details[0][2] + "<p>");
    $("#trial-view-admin-panel-details").append("<p>Total tests : " + test_details.test_details[0][3] + "<p>");

}

function populate_admin_page_active_tests(test_statuses){

    // Remove all the old data
    $("#test-status-list").empty();

    // If we got blank data back
    if (test_statuses == undefined)
        return;

    // For each of the tests the we received back
    for (let index = 0; index < test_statuses.length; index++){

        var test_set_id = test_statuses[index][0];
        var test_set_status = test_statuses[index][1];

        // Clone the template element
        var elem = $("#test-status-list-element-template").clone();
        $(elem).attr("id", test_set_id);

        // Get it's status
        if (test_set_status == 1){

            // Set the right hand symbol text & the left hand test name text
            $(elem).children().children().last().text("⏲");
        }
        else  if (test_set_status == 3){

            $(elem).children().children().last().text("✔");
        }
        else  if (test_set_status == 2){

            $(elem).children().children().last().text("🛑");
        }
        else {
            $(elem).children().children().last().text("ERROR");
        }

        // Set the button text
        $(elem).children().children().first().text(test_set_id);

        // Set the onclick for the button
        $(elem).children().children().first().attr("onclick", "set_trial_selection(\"" + test_set_id + "\")");

        // Append our cloned element to the scroll box
        $("#test-status-list").append(elem);

        // Make sure that we un-hid it
        $("#" + test_set_id).show();
    }

}

function populate_admin_page_test_templates(test_templates){

    // Remove all the old data
    $("#test-template-list").empty();

    // If we got blank data back
    if (test_templates == undefined)
        return;

    // For each of the tests the we received back
    for (let index = 0; index < test_templates.length; index++){

        var template_id = test_templates[index][0];
        var template_type = test_templates[index][1];

        // clone the element, set it's id to be the name of the template
        var elem = $("#test-status-list-element-template").clone();
        $(elem).attr("id", template_id);

        // Set the onclick to select that name when clicked
        // I hate web
        $(elem).children().children().first().attr("onclick", "set_template_selection(\"" + template_id + "\")");

        // set the button text and graph type text
        $(elem).children().children().last().text(template_type);
        $(elem).children().children().first().text(template_id);

        // Add it to the list and show it
        $("#test-template-list").append(elem);
        $("#" + template_id).show();
    }
}

function set_template_selection(template_name){
    if (selected_template != ""){
        $("#" + selected_template).children().children().first().toggleClass("w3-green");
    }
    selected_template = template_name;
    $("#" + selected_template).children().children().first().toggleClass("w3-green");
}

function set_trial_selection(trial_name){
   if (selected_trial != ""){
        $("#" + selected_trial).children().children().first().toggleClass("w3-green");
    }
    selected_trial = trial_name;
    $("#" + selected_trial).children().children().first().toggleClass("w3-green");

}
