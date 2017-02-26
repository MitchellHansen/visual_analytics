
let credentials = {
    "logged_in" : false,
    "auth_token": ""
};

let login_uuid = "345634563-erth3--dfgsdfg";

var selected_trial = "";
var selected_template = "";

window.onload = function(e) {

    // Set the onchange function for the admin page test filter
    $("#test-status-list-filter-select").change(function() {
        get_test_set_statuses(credentials.auth_token, $("#test-status-list-filter-select").val());
    });

    // Set the onchange functions for the admin page template filter
    $("#test-template-filter").change(function() {
        get_template_ids(credentials.auth_token, $("#test-template-filter").val());
    });

};

// ======================================================================
// =  Handlers take a buttons event and tie them to middle or api code  =
// ======================================================================

// When the admin clicks the [Login] button on the [admin sign in page]
function admin_login_handler() {

    // Get the creds from the input, and pass them to the api
    let admin_credentials_combo = $("#admin-login-form").serializeArray();

    // API call to the admin_login endpoint
    admin_login(admin_credentials_combo[0].value, admin_credentials_combo[1].value).done(function(value) {

        if (value.status == "success"){

            credentials.logged_in = true;
            credentials.auth_token = value.token;
            toggle_admin_panel();

        } else if (value.status == "failed") {

            alert("Email and password is not correct");
        }
    });
}

// When the user clicks [Login] on the [testing login page]
function trial_login_handler() {

    // Get the login token from the user and get the trial data associated with that login
    let login_code = $("#trial-login-form").serializeArray();

    if (login_code == "") {
        // do nothing

    } else {

        trial_login(login_code[0].value).done(function(value) {

            if (value.status == "success") {

                screen = screen_enum.TESTING_START;
                toggle_start_testing();

            } else if (value.status == "failed") {

                alert("Token invalid or timestamp incorrect");
            }
        });
    }
}

function continue_test_handler() {


}

// When the user clicks the [View Template] button on the [admin home page]
function view_template_handler() {

    if (selected_template == "") {
        // do nothing

    } else {

        get_template_details(credentials.auth_token, selected_template).done(function(value) {

            if (value.status == "success") {

                populate_view_template_page(value);
                toggle_view_template();

            } else if (value.status == "failed") {

                alert("Token invalid or timestamp incorrect");
            }


        });
    }
}

// When the user clicks the [View Template] button on the [admin home page]
function new_template_handler() {

    if (credentials.logged_in == false) {
        alert("You are not logged in. Try logging in again");

    } else {
      
        toggle_new_template();
    }
}

// When the user clicks the [Delete Template] button on the [admin home page]
function delete_template_handler() {

    if (credentials.logged_in == false) {
        alert("You are not logged in. Try logging in again");

    } else {

        delete_template(credentials.auth_token, selected_template).done(function(value) {

            // Refresh the template list
            if (!get_template_ids(credentials.auth_token, $("#test-template-filter").val())) {
                // error
            }
        });
    }
}

// When the user clicks the [View Test Set] button on the [admin home page]
function view_test_set_handler() {

    if (selected_trial == "") {
        // do nothing
    }
    else {

        get_test_set_details(credentials.auth_token, selected_trial).done(function(value) {
            populate_view_test_page(value);
            toggle_view_test_set();
        });
    }
}

// When the user clicks the [New Test Set] button on the [admin home page]
function new_test_set_handler() {

    if (credentials.logged_in == false) {

        alert("You are not logged in. Try logging in again");
    }
    else {

        toggle_new_test_set();
    }
}

function download(text, name, type) {

    let a = document.getElementById("download-button");
    let file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
}

// When the user clicks the [Export] button on the [admin home page]
function export_test_set_handler() {

    if (selected_trial == "") {
        // error
    }
    else {

        let csv;
        export_csv(credentials.auth_token, selected_trial).done(function(value) {
            csv = value;
            download(csv, selected_trial + ".csv", 'text/plain');
        });
    }
}


function delete_test_set_handler() {

    if (selected_trial == "") {

    }
    else {

        delete_test_set(credentials.auth_token, selected_trial).done(function(value) {

            // Refresh the test sets
            if (!get_test_set_statuses(credentials.auth_token, $("#test-status-list-filter-select").val())) {
                // error
            }
        });
    }
}

function open_test_handler(){

    if (selected_trial == ""){

    }
    else {

        open_test(credentials.auth_token, selected_trial).done(function(value) {

            // Refresh the test sets
            if (!get_test_set_statuses(credentials.auth_token, $("#test-status-list-filter-select").val())) {
                // error
            }
        });
    }
}

function close_test_handler() {

    if (selected_trial == "") {

    }
    else {

        close_test(credentials.auth_token, selected_trial).done(function(value) {

            // Refresh the test sets
            if (!get_test_set_statuses(credentials.auth_token, $("#test-status-list-filter-select").val())) {
                // error
            }
        });
    }
}



function begin_training_handler() {
    toggle_training_intro_view();
}

function training_fwd_movement() {
    transfer_through_training();
}

// ===============================================================
// = Populate functions take the *RAW* response from an API call =
// = and populate the page which the data is intended for        =
// ===============================================================

function populate_view_template_page(template_details) {

    $("#view-template-admin-panel").empty();

    // Now fill in the other details
    $("#view-template-admin-panel").append("<p>d points  : " + template_details.total_data_points[0][0] + "<p>");
    $("#view-template-admin-panel").append("<p>type   : " + template_details.graph_type[0][0] + "<p>");

}

// Takes the response from the [get_test_set_statuses] API call and parses it into the
// trial-view-admin-panel-id-list, which is in need of a rename
function populate_view_test_page(test_details) {

    // list all the id's
    $("#trial-view-admin-panel-id-list").empty();

    let html = "<p>";
    for (let i in test_details.users){
        html += test_details.users[i][0] + "<br>";
    }
    html += "</p>";

    $("#trial-view-admin-panel-id-list").append(html);


    $("#trial-view-admin-panel-details").empty();

    // Now fill in the other details
    $("#trial-view-admin-panel-details").append("<p>Trial Name  : " + test_details.test_details[0][0] + "<p>");
    $("#trial-view-admin-panel-details").append("<p>Wait time   : " + test_details.test_details[0][1] + "<p>");
    $("#trial-view-admin-panel-details").append("<p>Close time  : " + test_details.test_details[0][2] + "<p>");
    $("#trial-view-admin-panel-details").append("<p>Total tests : " + test_details.test_details[0][3] + "<p>");

    $("#trial-view-admin-panel-details").append("<p>Templates used : <br>");

    html = "";
    for (let i in test_details.template_list){
        html += test_details.template_list[i][0] + "<br>";
    }

    html += "<p>";

    $("#trial-view-admin-panel-details").append(html);
}

// Takes the response from the [get_template_ids] API call and parses it into the
// test-status-list
function populate_admin_page_active_tests(test_statuses) {

    // Remove all the old data
    $("#test-status-list").empty();

    // If we got blank data back
    if (test_statuses == undefined)
        return;

    // For each of the tests the we received back
    for (let index = 0; index < test_statuses.length; index++) {

        let test_set_id = test_statuses[index][0];
        let test_set_status = test_statuses[index][1];

        // We have a sort of template thing in the bottom of the index.html
        // which we clone and then set to not hidden
        let elem = $("#test-status-list-element-template").clone();
        $(elem).attr("id", test_set_id);

        // Get it's status
        if (test_set_status == 1){

            // Set the right hand symbol text & the left hand test name text
            $(elem).children().children().last().text("ACTIVE");
        }
        else  if (test_set_status == 3){

            $(elem).children().children().last().text("WAITING");
        }
        else  if (test_set_status == 2){

            $(elem).children().children().last().text("STOPPED");
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

function populate_admin_page_test_templates(test_templates) {

    // Remove all the old data
    $("#test-template-list").empty();

    // If we got blank data back
    if (test_templates == undefined)
        return;

    // For each of the tests the we received back
    for (let index = 0; index < test_templates.length; index++) {

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

function set_template_selection(template_name) {
    if (selected_template != ""){
        $("#" + selected_template).children().children().first().toggleClass("w3-green");
    }
    selected_template = template_name;
    $("#" + selected_template).children().children().first().toggleClass("w3-green");
}

function set_trial_selection(trial_name) {
   if (selected_trial != ""){
        $("#" + selected_trial).children().children().first().toggleClass("w3-green");
    }
    selected_trial = trial_name;
    $("#" + selected_trial).children().children().first().toggleClass("w3-green");

}

function populate_admin_page_new_test_set_templates(test_templates) {

    // Remove all the old data
    $("#CurrentTemplatesID").empty();

    // If we got blank data back
    if (test_templates == undefined)
        return;

    $.each(test_templates, function (key, value) {
        var ms = $('#CurrentTemplatesID')
        ms.append($("<option></option>")
                   .attr("value", key)
                   .text(value));
    });
    
}

function addToSelectedTemplates() {
    var curVal = document.getElementById('CurrentTemplatesID').value;
    var curText = document.getElementById('CurrentTemplatesID').;
    if (curVal == null) {
        alert("curVal is null");
    }
    else {
        alert(curVal);
    }
    if (curText == null) {
        alert("curText is null");
    }
    else {
        alert(key);

    }


    var o = new Option("option text", "Value");
    o = chosenTemplate;
    
    $('#SelectedTemplatesID').append($('<option>',{
        value: 1,
        text: 2
    },'</option>'));
              
}