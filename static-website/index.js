
let credentials = {
    "logged_in" : false,
    "auth_token": ""
};

let login_uuid = "7df95981-904c-4e77-9d11-e83ed2b190ba";

var selected_trial = "";
var selected_template = "";

function test(){

    get_next_test(login_uuid).done(function(value) {
        console.log(value);
    });

}

window.onload = function(e) {

    // Set the onchange function for the admin page test filter
    $("#test-status-list-filter-select").change(function() {
        refresh_admin_page_lists();
    });

    // Set the onchange functions for the admin page template filter
    $("#test-template-filter").change(function() {
        refresh_admin_page_lists();
    });

};

// Refresh the admin page, clear all the selections
function refresh_admin_page_lists(){

    set_template_selection('');
    set_trial_selection('');

    get_template_ids(credentials.auth_token, $("#test-template-filter").val()).done(function(value) {
        populate_admin_page_test_templates(value);
    });
    get_test_set_statuses(credentials.auth_token, $("#test-status-list-filter-select").val()).done(function(value) {
        populate_admin_page_active_tests(value);
    });
}

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
            refresh_admin_page_lists();

        } else if (value.status == "failed") {

            alert("Email and password is not correct");
        }
    });
}

function new_admin_handler(){
    toggle_new_admin();
}

function new_admin_submit_handler(){

    new_admin(credentials.auth_token, $('#admin_email').val(), $('#admin_password').val()).done(function(value) {

        // check success
        toggle_new_admin();
    });

}

// When the user clicks [Login] on the [testing login page]
function test_login_handler() {

    // Get the login token from the user and get the trial data associated with that login
    login_uuid = $("#trial-login-form").serializeArray()[0].value;

    if (login_uuid == "") {
        // do nothing

    } else {

        trial_login(login_uuid).done(function(value) {

            if (value.status == "success" || value.status == "Success" ) {

                screen = screen_enum.TESTING_START;
                toggle_start_testing();

            } else if (value.status == "failed") {

                alert("Token invalid or timestamp incorrect");
            }
        });
    }
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

            refresh_admin_page_lists();
            selected_template = '';
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
        get_template_ids(credentials.auth_token, 0).done(function (value) {
            populate_admin_page_new_test_set_templates(value);
        });
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
            refresh_admin_page_lists();
        });
    }
}

function open_test_handler(){

    if (selected_trial == ""){

    }
    else {

        open_test(credentials.auth_token, selected_trial).done(function(value) {
            refresh_admin_page_lists();
        });
    }
}

function close_test_handler() {

    if (selected_trial == "") {

    }
    else {

        close_test(credentials.auth_token, selected_trial).done(function(value) {
            refresh_admin_page_lists();
        });
    }
}



function begin_training_handler() {
    toggle_training_intro_view();
}

function training_fwd_movement() {
    transfer_through_training();
}

function noSpaces(idName) {
    if (!idName) {
        var str = idName.val();
        str = str.replace(/\s+/g, '-');
        //alert(str);
        idName.val(str);
        //alert(idName.val());
    }
}

// ===============================================================
// = Populate functions take the *RAW* response from an API call =
// = and populate the page which the data is intended for        =
// ===============================================================

function populate_view_template_page(template_details) {

    $("#view-template-center").empty();

    // Now fill in the other details
    var tDP = template_details.total_data_points[0];
    var gtype = template_details.graph_type[0];


    $("#view-template-center").append('<p id="viewTC_Header">Details Of The Template</p>');
    $("#view-template-center").append('<p id="viewTC_para">data points in graph  : ' + template_details.total_data_points[0] + '<br>type of graph   : ' + template_details.graph_type[0]);
    $("#view-template-center").append('<p id="viewTC_para2">');
    build($('#viewTC_para2'), 2, gtype - 1, generate_class_data_viewTemplate_ed(tDP));

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
    $("#trial-view-admin-panel-details").append("<p>Trial Name    : " + test_details.test_details[0][0] + "<p>");
    $("#trial-view-admin-panel-details").append("<p>Wait time     : " + test_details.test_details[0][1] + "<p>");
    $("#trial-view-admin-panel-details").append("<p>Close time    : " + test_details.test_details[0][2] + "<p>");
    $("#trial-view-admin-panel-details").append("<p>Test Status   : " + test_details.test_details[0][3] + "<p>");
    $("#trial-view-admin-panel-details").append("<p>Test Duration : " + test_details.test_details[0][4] + "<p>");

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

    test_statuses = test_statuses.data;
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

    test_templates = test_templates.template_data;
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
        selected_template = '';
    }
    if (template_name != '') {
        selected_template = template_name;
        $("#" + selected_template).children().children().first().toggleClass("w3-green");
    }
}

function set_trial_selection(trial_name) {
   if (selected_trial != ""){
       $("#" + selected_trial).children().children().first().toggleClass("w3-green");
       selected_trial = '';
   }
   if (trial_name != '') {
       selected_trial = trial_name;
       $("#" + selected_trial).children().children().first().toggleClass("w3-green");
   }
}

function populate_admin_page_new_test_set_templates(test_templates) {
    // Remove all the old data
    $("#CurrentTemplatesID").empty();

    // If we got blank data back
    if (test_templates == undefined)
        return;

    for (let i = 0; i < test_templates.template_data.length; i++) {
        var val = test_templates.template_data[i][0];
            $('#CurrentTemplatesID').append($('<option>',
                {
                    value: val,
                    text: val
                }));

    }
}


//Displays a time in int minutes for the admin
function timeChangeSecToMin() {
    var timeInSec = $('#test_set_wait_time').val();
    var timeInMin = parseInt(timeInSec / 60);
    $('#time_in_min').text(timeInMin);
}
function timeAllotedChangeSecToMin() {
    var timeInSec = $('#test_set_alloted_time').val();
    var timeInMin = parseInt(timeInSec / 60);
    $('#alloted_time_in_min').text(timeInMin);

}

function setMinTime() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd + 'T' + '00:00:00';
    document.getElementById("test_set_close_time").min = today;
    //$("#test_set_close_time").min(today);
}

function dropToMax() {
    if ($('#test_set_num_of_AC').val() > 60) {
        var max = parseInt(60);
        $('#test_set_num_of_AC').val(max);
    }
}

///////////Functions for the select boxes in New Test Set //////////////////////
function addToSelectedTemplates() {

     var $options = $('option:selected', '#CurrentTemplatesID').clone();

     $("#SelectedTemplatesID").append($options);

}
function addALLToSelectedTemplates() {
    var $option;
    $("#CurrentTemplatesID > option").each(function () {
        //alert(this.text + ' ' + this.value);
        $option = $(this).clone();
        $("#SelectedTemplatesID").append($option);

    });


}
function removeFromSelectedTemplates() {
    $('option:selected', '#SelectedTemplatesID').remove();
}
function removeALLFromSelectedTemplates() {
    $("#SelectedTemplatesID > option").each(function () {
        //alert(this.text + ' ' + this.value);
        this.remove();
    });
}
///////////Functions for the select boxes in New Test Set End///////////////////

function create_new_template_handler() {

    if (credentials.logged_in == false) {
        alert("You are not logged in. Try logging in again");

    } else {
        var templ_id = $('#template_id').val();
        var gtype = $("input[type='radio'][name='GraphType']:checked").val();
        var numofDP = $('#total_data_points').val();
        //alert("Template Id " + templ_id + " graphtype " + gtype + " num of points " + numofDP);

        new_test_template(credentials.auth_token, templ_id, gtype, numofDP).done(function (value) {

            toggle_new_template();
        });
    }
}

function create_new_test_set_handler() {

    if (credentials.logged_in == false) {
        alert("You are not logged in. Try logging in again");

    } else {
        let test_set_id = $('#test_set_id_name').val();
        let test_duration = $("#test_set_alloted_time").val();
        
        let wait_time = $('#test_set_wait_time').val();
        let close_time = $('#test_set_close_time').val();
        let uuid_count = $("#test_set_num_of_AC").val();
        //Need to make a list from #SelectedTemplatesID
		
		let template_list = $('#SelectedTemplatesID').children();
		let list = [];

		for (let i = 0; i < template_list.length; i++){
		    list.push($(template_list[i]).val());
        }

        new_test_set(credentials.auth_token, test_set_id, test_duration, list, wait_time, close_time, uuid_count).done(function (value) {
            alert("New Test Set submitted. \nPlease wait a few seconds for the database to accept the test after closing this alert!")
            toggle_new_test_set();
        });
    }
}

function graph_type_radio_handler(value, data_points){
    build($("#templateGraphDiv"), 2, value, generate_parent_data(data_points));
}

function data_point_change_handler(value, data_points){
    build($("#templateGraphDiv"), 2, value - 1, generate_parent_data(data_points));
}

// =======================================================================
// =                        Test page functionality                      =
// =======================================================================

testing_page_timer = null;
wait_page_timer = null;

function testing_page_timeout() {

    if (parseInt($("#test-time").html()) <= 1){
        window.clearInterval(testing_page_timer);
        continue_to_wait_page_handler();
    }

    $("#test-time").text(parseInt($("#test-time").html()) - 1);
}

function wait_page_timeout(){

    if (parseInt($("#wait-time").html()) <= 1){
        window.clearInterval(wait_page_timer);
        continue_testing_handler();
    }

    $("#wait-time").text(parseInt($("#wait-time").html()) - 1);
}

function start_testing_handler(){


    get_next_test(login_uuid).done(function(value) {

        if (value.messesge == "all templates complete"){
            toggle_finish_from_test_start();
        }

        let graph_data = {
            class_1_parent: eval(value.data.class1_parent_data_points),
            class_2_parent: eval(value.data.class2_parent_data_points),
            class_1_child: eval(value.data.class1_generated_data_points),
            class_2_child: eval(value.data.class2_generated_data_points)
        };

        toggle_test_from_start();

        testing_page_timer =  window.setInterval(testing_page_timeout, 1000);
        $("#test-time").text(value.data.test_duration);
        $("#wait-time").text(value.data.wait_time);
        $("#test-count-remaining").text(parseInt(value.remaining)-1);


        build($("#graph-space-testing"), graph_context.TESTING, graph_type.STAR, graph_data);

    });
}

function continue_to_wait_page_handler(){


    // Parse the graph data to send to the server

    let time = $("#test-time").text();

    let selected_points_arr = [];
    let selected_class_arr = [];

    for (let i = 0; i < testing_graph_arr.length; i++){
        selected_points_arr.push(testing_graph_arr[i].selected_point);
        selected_class_arr.push(testing_graph_arr[i].class);
    }

    let score = 0;
    for (let i = 0; i < testing_graph_arr.length/2; i++) {
        if (testing_graph_arr[i].class == 1)
            score++;
    }
    for (let i = testing_graph_arr.length/2; i < testing_graph_arr.length; i++) {
        if (testing_graph_arr[i].class == 2)
            score++;
    }

    score = (score / testing_graph_arr.length) * 100;

    submit_user_trial_results(login_uuid, selected_points_arr, selected_class_arr, score, time).done(function(value) {

        toggle_wait_from_test();

        window.clearInterval(testing_page_timer);
        wait_page_timer = window.setInterval(wait_page_timeout, 1000);

    });
}

function continue_testing_handler() {

    get_next_test(login_uuid).done(function(value) {

        if (value.messesge == "all templates complete"){
            toggle_finish_from_wait();
        }

        let graph_data = {
            class_1_parent: eval(value.data.class1_parent_data_points),
            class_2_parent: eval(value.data.class2_parent_data_points),
            class_1_child: eval(value.data.class1_generated_data_points),
            class_2_child: eval(value.data.class2_generated_data_points)
        };

        // Transition the page
        toggle_test_from_wait();

        testing_page_timer = window.setInterval(testing_page_timeout, 1000);
        $("#test-time").text(value.data.test_duration);
        $("#wait-time").text(value.data.wait_time);
        $("#test-count-remaining").text(parseInt(value.remaining)-1);

        build($("#graph-space-testing"), graph_context.TESTING, graph_type.STAR, graph_data);
    });
}

























