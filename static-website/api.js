
// ============================================================================================================
// API call to  : "/auth/admin_login"
// SENDS        : Username, Password
// RECEIVES     : Unique login token
// ============================================================================================================

function admin_login(email, password){

    return $.ajax({

        url: "http://68.186.100.115/auth/admin_login",
        contentType: "application/json;charset=UTF-8",
        type: "POST",
        async: true,

        data :JSON.stringify({
            "email"   : email,
            "password": password
        }),

        dataType: "json",
        success: function(result){

            console.log(result);
        },

        error: function(e) {

            alert("Api call failed, see console for details");
            console.log(e);
        },
    });
}

// ============================================================================================================
// API call to  : "/auth/trial_login"
// SENDS        : UUID
// RECEIVES     : Success or fail
// ============================================================================================================

function trial_login(login_uuid){

    return $.ajax({

        url: "http://68.186.100.115/auth/trial_login",
        contentType: "application/json;charset=UTF-8",
        type: "POST",
        async: false,

        data :JSON.stringify({
            "login_uuid": login_uuid
        }),

        dataType: "json",
        success: function(result){

            console.log(result);
        },

        error: function(e) {

            alert("Api call failed, see console for details");
            console.log(e);
        },
    });
}


// ============================================================================================================
//  API CALL TO :  "/auth/get_test_set_statuses"
//  SENDS       : Login Token, Optional filter
//  RECEIVES    : JSON list of test set id and their statuses
//                JSON = {
//                         "test1":"0",
//                         "test2":"1",
//                         "test3":"2",
//                         "test4":"3",
//                         "test5":"2"
//               };
// {0, ANY} {1, RUNNING} {2, COMPLETE} {3, PARKED}
// ============================================================================================================

function get_test_set_statuses(auth_token, filter){

    return $.ajax({

        url: "http://68.186.100.115/auth/get_test_set_statuses",
        contentType: "application/json;charset=UTF-8",
        type: "POST",
        async: true,

        data :JSON.stringify({
            "login_token" : auth_token,
            "filters"     : filter
        }),

        dataType: "json",
        success: function(result){

            console.log(result);
        },

        error: function(e) {

            alert("Api call failed, see console for details");
            console.log(e);
        },
    });

}

// ============================================================================================================
//  API CALL TO : "/auth/get_test_set_details"
//  SENDS       : Log in code
//  RECEIVES    : JSON object with the trial info
//                JSON = {
//                         "trial_name":"trial-1",
//                         "test-list": [1, 2, 3, 4, 5],
//                         "tests-complete":"3",
//                         "wait-time":"60",
//                         "close-time":"timestamp of some sort"
//               };
// ============================================================================================================
function get_test_set_details(auth_token, test_set_id){

    return $.ajax({

        url: "http://68.186.100.115/auth/get_test_set_details",
        contentType: "application/json;charset=UTF-8",
        type: "POST",
        async: true,

        data :JSON.stringify({
            "login_token": auth_token,
            "test_set_id": test_set_id
        }),

        dataType: "json",
        success: function(result){

            console.log(result);
        },

        error: function(e) {

            alert("Api call failed, see console for details");
            console.log(e);
        },
    });

}

// ============================================================================================================
//  API CALL TO : "/auth/get_template_ids"
//  SENDS       : Login Token, filter
//  RECEIVES    : JSON list template-ids combined with their test type
//                JSON = {
//                        "star-graph-1":"1",
//                        "star-graph-2":"1",
//                        "line-graph-2":"2",
//                        "polar-graph":"3",
//                        "line-graph-4":"2"
//               };
// ============================================================================================================

function get_template_ids(auth_token, filter) {


    return $.ajax({

        url: "http://68.186.100.115/auth/get_template_ids",
        contentType: "application/json;charset=UTF-8",
        type: "POST",
        async: true,

        data: JSON.stringify({
            "login_token": auth_token,
            "filters"    : filter
        }),

        dataType: "json",
        success: function (result) {

            console.log(result);
        },

        error: function(e) {

            alert("Api call failed, see console for details");
            console.log(e);
        },
    });
}

// ============================================================================================================
//  API CALL TO : "/auth/submit_user_trial_results"
//  SENDS       : The results of the trial
//  RECEIVES    : Success or fail
// ============================================================================================================

// THIS FUNCTION USES GLOBAL VARS
function submit_user_trial_results(){

    return $.ajax({

        url: "http://68.186.100.115/auth/submit_user_trial_results",
        contentType: "application/json;charset=UTF-8",
        type: "POST",
        async: true,

        data : JSON.stringify({
            "login_uuid": login_uuid,
            "results"   : training_graph_arr,
            "time"      : "0"
        }),

        dataType: "json",
        success: function(result){

            console.log(result);
        },

        error: function(e) {

            alert("Api call failed, see console for details");
            console.log(e);
        },
    });

}

// ============================================================================================================
//  API CALL TO : "/auth/export_csv"
//  SENDS       : Auth token, the trial to export
//  RECEIVES    : A CSV file in text form
// ============================================================================================================

function export_csv(auth_token, trial_id){

    return $.ajax({

        url: "http://68.186.100.115/auth/export_csv",
        contentType: "application/json;charset=UTF-8",
        type: "POST",
        async: true,

        data : JSON.stringify({
            "login_token" : auth_token,
            "test_set_id" : trial_id
        }),

        dataType: "text",
        success: function(result){

            console.log(result);
        },

        error: function(e) {

            alert("Api call failed, see console for details");
            console.log(e);
        },
    });
}

// ============================================================================================================
//  API CALL TO : "/auth/delete_test_set"
//  SENDS       : The selected trial ID
//  RECEIVES    : Success or fail
// ============================================================================================================

function delete_test_set(auth_token, trial_id){

    return $.ajax({

        url: "http://68.186.100.115/auth/delete_test_set",
        contentType: "application/json;charset=UTF-8",
        type: "POST",
        async: true,

        data : JSON.stringify({
            "login_token" : auth_token,
            "test_set_id" : trial_id
        }),

        dataType: "json",
        success: function(result){

            console.log(result);
        },

        error: function(e) {

            alert("Api call failed, see console for details");
            console.log(e);
        },
    });
}

// ============================================================================================================
//  API CALL TO : "/auth/delete_template"
//  SENDS       : The selected template ID
//  RECEIVES    : Success or fail
// ============================================================================================================

function delete_template(auth_token, template_id){

    return $.ajax({

        url: "http://68.186.100.115/auth/delete_template",
        contentType: "application/json;charset=UTF-8",
        type: "POST",
        async: true,

        data : JSON.stringify({
            "login_token" : auth_token,
            "template_id" : template_id
        }),

        dataType: "json",
        success: function(result){

            console.log(result);
        },

        error: function(e) {

            alert("Api call failed, see console for details");
            console.log(e);
        },
    });
}

// ============================================================================================================
//  API CALL TO : "/auth/new_test_set"
//  SENDS       : A JSON object specifying the test set variables
//                JSON = {
//                         "login_token"  : credentials.auth_token,
//                         "test_set_id"  : "trial-1",
//                         "template_ids" : ["template-1" , "template-1", "template-2"],
//                         "wait_time"    : "60",
//                         "close_time"   : "timestamp of some sort",
//                         "uuid_count"   : 30
//                };
//  RECEIVES    : Success or fail
// ============================================================================================================

function new_test_set(test_set_id, template_list, wait_time, close_time, uuid_count, auth_token){

    return $.ajax({

        url: "http://68.186.100.115/auth/new_test_set",
        contentType: "application/json;charset=UTF-8",
        type: "POST",
        async: true,

        data : JSON.stringify({
            "login_token" : auth_token,
            "test_set_id" : test_set_id,
            "template_ids": template_list,
            "wait_time"   : wait_time,
            "close_time"  : close_time,
            "uuid_count"  : uuid_count
        }),

        dataType: "json",
        success: function(result){

            console.log(result);
        },

        error: function(e) {

            if (e.responseText == ""){

            } else {
                alert("Api call failed");
                console.log(e);
            }
        },
    });
}


// ============================================================================================================
//  API CALL TO : "/auth/get_next_test"
//  SENDS       : Users uuid
//  RECEIVES    : If there is another test in the queue it receives a JSON object like this
//                JSON = {
//                    "class1_example" : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//                    "class2_example" : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//                    "class1_data"    : [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
//                    "class1_data"    : [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
//                    "time": "60",
//                };
//
//                Otherwise, it will get a JSON object specifying the users results
//                JSON = {
//                    "total_time": "1234",
//                };
// ============================================================================================================

function get_next_test(login_uuid){

    return $.ajax({

        url: "http://68.186.100.115/auth/generate_graphs_with_template",
        contentType: "application/json;charset=UTF-8",
        type: "POST",
        async: true,

        data : JSON.stringify({
            "login_token" : login_uuid,
        }),

        dataType: "json",
        success: function(result){

            console.log(result);
        },

        error: function(e) {

            if (e.responseText == ""){

            } else {
                alert("Api call failed");
                console.log(e);
            }
        },
    });
}

// ============================================================================================================
//  API CALL TO :  "/auth/open_test"
//  SENDS       : Auth creds and the id of the test to open
//  RECEIVES    : Success or fail
// ============================================================================================================

function open_test(auth_token, test_set_id){

    return $.ajax({

        url: "http://68.186.100.115/auth/open_test",
        contentType: "application/json;charset=UTF-8",
        type: "POST",
        async: true,

        data : JSON.stringify({
            "login_token" : auth_token,
            "test_set_id" : test_set_id
        }),

        dataType: "json",
        success: function(result){

            console.log(result);
        },

        error: function(e) {

            if (e.responseText == ""){

            } else {
                alert("Api call failed");
                console.log(e);
            }
        },
    });
}

// ============================================================================================================
//  API CALL TO :  "/auth/close_test"
//  SENDS       : Auth creds and the id of the test to close
//  RECEIVES    : Success or fail
// ============================================================================================================

function close_test(auth_token, test_set_id){

    return $.ajax({

        url: "http://68.186.100.115/auth/close_test",
        contentType: "application/json;charset=UTF-8",
        type: "POST",
        async: true,

        data : JSON.stringify({
            "login_token" : auth_token,
            "test_set_id" : test_set_id
        }),

        dataType: "json",
        success: function(result){

            console.log(result);
        },

        error: function(e) {

            if (e.responseText == ""){

            } else {
                alert("Api call failed");
                console.log(e);
            }
        },
    });
}

// ============================================================================================================
//  API CALL TO :  "/auth/get_template_details"
//  SENDS       : Auth token, the template id
//  RECEIVES    : JSON object with total_data_points, graph_type
// ============================================================================================================

function get_template_details(auth_token, template_id){

    return $.ajax({

        url: "http://68.186.100.115/auth/get_template_details",
        contentType: "application/json;charset=UTF-8",
        type: "POST",
        async: true,

        data : JSON.stringify({
            "login_token" : auth_token,
            "template_id" : template_id
        }),

        dataType: "json",
        success: function(result){

            console.log(result);
        },

        error: function(e) {

            if (e.responseText == ""){

            } else {
                alert("Api call failed");
                console.log(e);
            }
        },
    });
}

// ============================================================================================================
//  API CALL TO :  "/auth/new_test_template"
//  SENDS       : A JSON object specifying the template variables
//                JSON = {
//                         "login_token"  : credentials.auth_token,
//                         "test_set_id"  : "trial-1",
//                         "template_ids" : ["template-1" , "template-1", "template-2"],
//                         "wait_time"    : "60",
//                         "close_time"   : "timestamp of some sort",
//                         "uuid_count"   : 30
//                };
//  RECEIVES    : Success or fail
// ============================================================================================================

function new_test_template(auth_token, template_id, graph_type, total_data_points) {
    //The alert shows that the values passed in are correct it works
    //alert("auth_token " + auth_token + " Template Id " + template_id + " graphtype " + graph_type + " num of points " + total_data_points);

    return $.ajax({

        url: "http://68.186.100.115/auth/new_template",
        contentType: "application/json;charset=UTF-8",
        type: "POST",
        async: true,



        data: JSON.stringify({
            "login_token": auth_token,
            "template_id": template_id,
            "graph_type": graph_type,
            "total_data_points": total_data_points
        }),

        dataType: "json",
        success: function (result) {

            console.log(result);
        },

        error: function (e) {

            if (e.responseText == "") {

            } else {
                alert("Api call failed");
                console.log(e);
            }
        },
    });
}

