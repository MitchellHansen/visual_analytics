
// API call to  : "/auth/admin_login"
// SENDS        : Username, Password
// RECEIVES     : Unique login token
// ============================================================================================================

function admin_login(username, password){

//    $.ajax({
//
//        url: "/auth/admin_login",
//        contentType: "application/json; charset=utf-8",
//        type: "POST",
//        async: false,
//
//        data :{
//            email : $('emailInput').val(),
//            password : $('passwordInput').val()
//        },
//
//        // We are going to need a way to verify our logged in status, while
//        // disallowing users the access to a "logged_in=true" variable.
//        // We could return a "one time code" when one logs in
//        success: function(result){
//
//            // auth_token = result.key;
//            // From that we could then interact with the api using this token
//
//            console.log(result);
//
//            if (result == "success"){
//                logged_in = true;
//                show_admin_window();
//            }
//            else{
//                // Show help message
//            }
//        }
//
//        // The only difficulty here is that we will need to cache these codes for a time period.
//        // Perhaps we can have another table which contains all the generated codes and their expiration
//        // stamp along with the admin ID for which they were generated for.
//
//    });

    // Lets just pretend that returns success
    var result = "success";
    var token = "abcdefg";

    if (result == "success"){
        return token;
    }
    else{
        // Show help message
    }

}


//  API CALL TO :  "/auth/get_test_set_statuses"
//  SENDS       : Login Token, Optional filter
//  RECEIVES    : JSON list of test set names and their statuses
//  dummy_data = {"test1":"RUNNING", "test2":"RUNNING", "test3":"COMPLETE", "test4":"PARKED", "test5":"COMPLETE"};
// ============================================================================================================

function get_test_set_statuses(){

    if (!logged_in || token == ""){
        // Not logged in
    }

    // {0, ANY} {1, RUNNING} {2, COMPLETE} {3, PARKED}
    var filter = $("#test-status-list-filter-select").val();

//    $.ajax({
//
//        url: "/auth/get_test_set_statuses",
//        contentType: "application/json; charset=utf-8",
//        type: "POST",
//        async: false,
//
//        data :{
//            admin_token  : token,
//            list_filter  : filter
//        },
//
//        success: function(result){
//
//            console.log(result);
//
//        }
//    });

    var dummy_data = {"test1":"RUNNING", "test2":"RUNNING", "test3":"COMPLETE", "test4":"PARKED", "test5":"COMPLETE"};

    // Lets just pretend that returns success
    var result = "success";

    if (result == "success"){
        populate_admin_page_active_tests(dummy_data);
        //populate_admin_page_active_tests(result.test_statuses);
    }
    else{
        // Show help message
    }
}


//  API CALL TO : "/auth/get_test_templates"
//  SENDS       : Login Token, Optional filter for test type i.e {1, 2, 3, 4}
//  RECEIVES    : JSON list of test template names and their test types
//  dummy_data = {"star-graph-1":"1", "star-graph-2":"1", "line-graph-2":"2", "polar-graph":"3", "line-graph-4":"2"};
// ============================================================================================================

function get_test_template_data(){

    if (!logged_in || token == ""){
        // Not logged in
    }

    // Get from the filter selection the type of test templates we want to see
    var test_type = $("#test-template-filter").val();

//    $.ajax({
//
//        url: "/auth/get_test_templates",
//        contentType: "application/json; charset=utf-8",
//        type: "POST",
//        async: false,
//
//        data :{
//            token     : token,
//            test_type : // an integer for test type, maybe could be a string if we wanted
//        },
//
//        success: function(result){
//
//            console.log(result);
//
//        }
//    });

    var dummy_data = {"star-graph-1":"1", "star-graph-2":"1", "line-graph-2":"2", "polar-graph":"3", "line-graph-4":"2"};

    // Lets just pretend that returns success
    var result = "success";

    if (result == "success"){
        populate_admin_page_test_templates(dummy_data);
        //populate_admin_page_active_tests(result.test_statuses);
    }
    else{
        // Show help message
    }
}


//  API CALL TO : "/auth/trial_log_in"
//  SENDS       : Log in code
//  RECEIVES    : JSON object with the trial info
//  dummy_data = {"trial_name":"trial-1",
//                "total-tests":"5",
//                "tests-complete":"3",
//                "wait-time":"60",
//                "close-time":"timestamp of some sort"
//                }
// ============================================================================================================
function trial_login(login_code){


//    $.ajax({
//
//        url: "/auth/trial_log_in",
//        contentType: "application/json; charset=utf-8",
//        type: "POST",
//        async: false,
//
//        data :{
//            token : token
//        },
//
//        success: function(result){
//            console.log(result);
//        }
//    });

  dummy_data = {"trial_name":"trial-1",
                "total_tests":"5",
                "tests_complete":"3",
                "wait_time":"60",
                "time_left":"timestamp of some sort",
                "status": "PARKED"
                };

    // Lets just pretend that returns success
    var result = "success";

    if (result == "success"){
        return dummy_data;
        //return result;
    }
    else{
        console.log("Something went wrong");
        console.log(result);
    }
}


//  API CALL TO : "/auth/get_trial_details"
//  SENDS       : auth_token, trial_id
//  RECEIVES    : JSON object with the trial info
//  dummy_data = {"trial_name":"trial-1",
//                "total-tests":"5",
//                "test_ids":"3",
//                "wait-time":"60",
//                "close-time":"timestamp of some sort"
//                }
// ============================================================================================================
function get_trial_details(auth_token, trial_id){


//    $.ajax({
//
//        url: "/auth/get_trial_details",
//        contentType: "application/json; charset=utf-8",
//        type: "POST",
//        async: false,
//
//        data :{
//            token : token
//        },
//
//        success: function(result){
//            console.log(result);
//        }
//    });

 dummy_data = {"trial_name":"trial-1",
               "total_tests":"5",
               "template_ids": [1, 2, 3, 4],
               "user_ids" : ["asdf", "qwer", "zxcv", "rtg"],
               "wait_time":"60",
               "close_time":"timestamp of some sort"
               }

    // Lets just pretend that returns success
    var result = "success";

    if (result == "success"){
        return dummy_data;
        //return result;
    }
    else{
        console.log("Something went wrong");
        console.log(result);
    }
}
















