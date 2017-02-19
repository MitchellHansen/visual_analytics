
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
            "email": email,
            "password": password
        }),

        dataType: "json",
        success: function(result){

            if (result[0] != "Invalid Token"){
                credentials.logged_in = true;
                credentials.auth_token = result[0];
            } else {
                // log in failed
            }
        },

        error: function(e) {

            alert("Api call failed");
            console.log(e);
        },
    });
}


// API call to  : "/auth/trial_login"
// SENDS        : Username, Password
// RECEIVES     : Unique login token
// ============================================================================================================

function trial_login(login_uuid){

    $.ajax({

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
            token = result[0];
        },

        error: function(e) {

            alert("Api call failed");
            console.log(e);
        },
    });
}



//  API CALL TO :  "/auth/get_test_set_statuses"
//  SENDS       : Login Token, Optional filter
//  RECEIVES    : JSON list of test set id and their statuses
//  dummy_data = {"test1":"0", "test2":"1", "test3":"2", "test4":"3", "test5":"2"};
// ============================================================================================================

function get_test_set_statuses(){


    // {0, ANY} {1, RUNNING} {2, COMPLETE} {3, PARKED}
    var filter = $("#test-status-list-filter-select").val();

    return $.ajax({

        url: "http://68.186.100.115/auth/get_test_set_statuses",
        contentType: "application/json;charset=UTF-8",
        type: "POST",
        async: true,

        data :JSON.stringify({
            "login_token":credentials.auth_token,
            "filters": filter
        }),

        dataType: "json",
        success: function(result){

            console.log(result);

            populate_admin_page_active_tests(result);

        },

        error: function(e) {

            if (e.responseText == "No tests found"){
                populate_admin_page_active_tests();
            }else{
                alert("Api call failed");
                console.log(e);
            }
        },
    });

}

//  API CALL TO : "/auth/get_test_set_details"
//  SENDS       : Log in code
//  RECEIVES    : JSON object with the trial info
//  dummy_data = {"trial_name":"trial-1",
//                "test-list": [1, 2, 3, 4, 5],
//                "tests-complete":"3",
//                "wait-time":"60",
//                "close-time":"timestamp of some sort"
//                }
// ============================================================================================================
function get_test_set_details(login_code){

    return $.ajax({

        url: "http://68.186.100.115/auth/get_test_set_details",
        contentType: "application/json;charset=UTF-8",
        type: "POST",
        async: true,

        data :JSON.stringify({
            "login_token": credentials.auth_token,
            "test_set_id": "Test1"
        }),

        dataType: "json",
        success: function(result){
            return result;
        },

        error: function(e) {

            alert("Api call failed");
            console.log(e);
        },
    });

}



//  API CALL TO : "/auth/get_template_ids"
//  SENDS       : Login Token
//  RECEIVES    : JSON list template-ids combined with their test type
//  dummy_data = {"star-graph-1":"1", "star-graph-2":"1", "line-graph-2":"2", "polar-graph":"3", "line-graph-4":"2"};
// ============================================================================================================

function get_template_ids() {

    // Get from the filter selection the type of test templates we want to see
    let filter = $("#test-template-filter").val();

    return $.ajax({

        url: "http://68.186.100.115/auth/get_template_ids",
        contentType: "application/json;charset=UTF-8",
        type: "POST",
        async: true,

        data: JSON.stringify({
            "login_token": credentials.auth_token,
            "filters": filter
        }),

        dataType: "json",
        success: function (result) {

            populate_admin_page_test_templates(result);

        },

        error: function (e) {

            alert("Api call failed");
            console.log(e);
        },
    });
}


//  API CALL TO :  "/auth/submit_user_trial_results"
//  SENDS       : The results of the trial
//  RECEIVES    : Success or fail
// ============================================================================================================

function submit_user_trial_results(){

    return $.ajax({

        url: "http://68.186.100.115/auth/submit_user_trial_results",
        contentType: "application/json;charset=UTF-8",
        type: "POST",
        async: true,

        data : JSON.stringify({
            "login_uuid": login_uuid,
            "results" : training_graph_arr
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


//  API CALL TO :  "/auth/export_csv"
//  SENDS       : Exports the results of the trial
//  RECEIVES    : CSV
// ============================================================================================================

function export_csv(){

    return $.ajax({

        url: "http://68.186.100.115/auth/export_csv",
        contentType: "application/json;charset=UTF-8",
        type: "POST",
        async: true,

        data : JSON.stringify({
            "login_token": credentials.auth_token,
            "test_set_id" : selected_trial
        }),

        dataType: "text",
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


//  API CALL TO :  "/auth/delete_test_set"
//  SENDS       : The results of the trial
//  RECEIVES    : Success or fail
// ============================================================================================================

function delete_test_set(){

    return $.ajax({

        url: "http://68.186.100.115/auth/delete_test_set",
        contentType: "application/json;charset=UTF-8",
        type: "POST",
        async: true,

        data : JSON.stringify({
            "login_token": credentials.auth_token,
            "test_set_id" : selected_trial
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

//  API CALL TO :  "/auth/delete_template"
//  SENDS       : The results of the trial
//  RECEIVES    : Success or fail
// ============================================================================================================

function delete_template(){

    return $.ajax({

        url: "http://68.186.100.115/auth/delete_template",
        contentType: "application/json;charset=UTF-8",
        type: "POST",
        async: true,

        data : JSON.stringify({
            "login_token": credentials.auth_token,
            "template_id" : selected_template
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







