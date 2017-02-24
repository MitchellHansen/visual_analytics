
let credentials = {
    "logged_in" : false,
    "auth_token": ""
};

let login_uuid = "345634563-erth3--dfgsdfg";

var selected_trial = "";
var selected_template = "";

window.onload = function(e){

    $("#test-status-list-filter-select").change(function(){
        get_test_set_statuses();
    });

    $("#test-template-filter").change(function(){
        get_template_ids();
    });

};


function download(text, name, type) {
  var a = document.getElementById("download-button");
  var file = new Blob([text], {type: type});
  a.href = URL.createObjectURL(file);
  a.download = name;
}

// Handlers take a buttons event and tie them to middle or api code

function admin_login_handler(){

    // Get the creds from the input, and pass them to the api
    var admin_credentials_combo = $("#admin-login-form").serializeArray();

    admin_login(admin_credentials_combo[0].value, admin_credentials_combo[1].value).done(function() {

        if (credentials.logged_in) {
            toggle_admin_view();
        }
        else{
            alert("Log in failed");
        }
    });


}
function trial_login_handler(){

    // Get the login token from the user and get the trial data associated with that login
    var login_code = $("#trial-login-form").serializeArray();
    //var trial_data = trial_login(login_code[0].value);

    trial_login(login_code[0].value);

    //toggle_trial_view();
    
    // Start trial
}

function view_template_handler(){

    if (selected_template == ""){
        // do nothing
    }
    else {
        toggle_template_view();
    }
}

function new_template_handler(){

    if (selected_template == ""){
        // do nothing
    }
    else {
        toggle_template_new();
    }
}

function view_trial_handler(){

    if (selected_trial == ""){
        // error
    }
    else {

        get_test_set_details(credentials.auth_token).done(function(value) {
            populate_view_test_page(value);
            toggle_test_view();
        });

    }
}

function new_trial_handler(){

    if (selected_trial == ""){
        // error
    }
    else {

        get_test_set_details(credentials.auth_token).done(function(value) {
            populate_view_test_page(value);
            toggle_test_view();
        });

    }
}

function export_trial_handler(){

    if (selected_trial == ""){
        // error
    }
    else {

        var csv;
        export_csv().done(function(value) {
            csv = value;
            download(csv, selected_trial + ".csv", 'text/plain');
        });
    }
}

function delete_test_set_handler(){

    if (selected_trial == ""){

    }
    else {

        delete_test_set(credentials.auth_token).done(function(value) {

        });
    }
}

function open_test_handler(){

    if (selected_trial == ""){

    }
    else {

        open_test(credentials.auth_token).done(function(value) {

        });
    }
}

function close_test_handler(){

    if (selected_trial == ""){

    }
    else {

        close_test(credentials.auth_token).done(function(value) {

        });
    }
}

function begin_training_handler(){
    toggle_training_intro_view();
}

function training_fwd_movement() {
    transfer_through_training();
}

function begin_trial(trial_data){

}

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
