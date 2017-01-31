
var logged_in = false;
var token = "asdofijwer";
var selected_trial = "";
var selected_template = "";

function admin_login_handler(){

    // Get the creds from the input, and pass them to the api
    var admin_credentials_combo = $("#admin-login-form").serializeArray();
    token = admin_login(admin_credentials_combo[0].value, admin_credentials_combo[1].value);

    if (token){
        // Sign in invalid
    }

    toggle_admin_view();

}
function trial_login_handler(){

    // Get the login token from the user and get the trial data associated with that login
    var login_code = $("#trial-login-form").serializeArray();
    var trial_data = trial_login(login_code[0].value);

    //toggle_trial_view();

    // Start trial
}

function view_template_handler(){

    if (selected_template == ""){
        // do nothing
    }
    else {

    }
}

function view_trial_handler(){

    if (selected_trial == ""){
        // error
    }
    else {
        var details = get_trial_details();
        populate_view_test_page(details);
        toggle_test_view();
    }

}


function begin_training_handler(){

}

function begin_trial(trial_data){

}

function populate_view_test_page(test_details){

    // list all the id's

    $("#trial-view-admin-panel-id-list").empty();

    var html = "";
    for (var i in test_details.user_ids){
        html += test_details.user_ids[i] + "<br>";
    }

    $("#trial-view-admin-panel-id-list").append(html);


    // Now fill in the other details

}

function populate_admin_page_active_tests(test_statuses){

    // Remove all the old data
    $("#test-status-list").empty();

    // For each of the tests the we received back

    for (var key in test_statuses) {
        if (test_statuses.hasOwnProperty(key)) {

            var id = "test-" + key;

            // Clone the template element
            var elem = $("#test-status-list-element-template").clone();
            $(elem).attr("id", id);

            // Get it's status
            if (test_statuses[key] == "RUNNING"){

                // Set the right hand symbol text & the left hand test name text
                $(elem).children().children().last().text("⏲");
            }
            else  if (test_statuses[key] == "PARKED"){

                $(elem).children().children().last().text("✔");
            }
            else  if (test_statuses[key] == "COMPLETE"){

                $(elem).children().children().last().text("🛑");
            }
            else {
                $(elem).children().children().last().text("ERROR");
            }

            // Set the button text
            $(elem).children().children().first().text(key);

            // Set the onclick for the button
             $(elem).children().children().first().attr("onclick", "set_trial_selection(\"" + id + "\")");

            // Append our cloned element to the scroll box
            $("#test-status-list").append(elem);

            // Make sure that we un-hid it
            $("#" + id).show();
        }
    }
}

function populate_admin_page_test_templates(test_templates){

    for (var key in test_templates) {
        if (test_templates.hasOwnProperty(key)) {

            var id = "template-" + key;

            // clone the element, set it's id to be the name of the template
            var elem = $("#test-status-list-element-template").clone();
            $(elem).attr("id", id);

            // Set the onclick to select that name when clicked
            // I hate web
            $(elem).children().children().first().attr("onclick", "set_template_selection(\"" + id + "\")");

            // set the button text and graph type text
            $(elem).children().children().last().text(test_templates[key]);
            $(elem).children().children().first().text(key);

            // Add it to the list and show it
            $("#test-template-list").append(elem);
            $("#" + id).show();
        }
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






