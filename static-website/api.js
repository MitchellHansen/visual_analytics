
// API call to  : "/auth/admin_login"
// SENDS        : Username, Password
// RECEIVES     : Unique login token
// ============================================================================================================

function admin_login(email, password){

    $.ajax({

        url: "http://68.186.100.115/auth/admin_login",
        contentType: "application/json;charset=UTF-8",
        type: "POST",
        async: false,

        data :JSON.stringify({
            "email": email,
            "password": password
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

    if (!logged_in || token == ""){
        // Not logged in
    }

    // {0, ANY} {1, RUNNING} {2, COMPLETE} {3, PARKED}
    var filter = $("#test-status-list-filter-select").val();

    $.ajax({

        url: "http://68.186.100.115/auth/get_test_set_statuses",
        contentType: "application/json;charset=UTF-8",
        type: "POST",
        async: true,

        data :JSON.stringify({
        "login_token":token,
        "filters": filter
        }),

        dataType: "json",
        success: function(result){

            console.log(result);

            populate_admin_page_active_tests(result);

        },

        error: function(e) {
            alert("Api call failed");
            console.log(e);
        },
    });

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

    if (!logged_in || token == ""){
        // Not logged in
    }

    return $.ajax({

        url: "http://68.186.100.115/auth/get_test_set_details",
        contentType: "application/json;charset=UTF-8",
        type: "POST",
        async: false,

        data :JSON.stringify({
            "login_token": token,
            "test_set_id": "Test1"
        }),

        dataType: "json",
        success: function(result){

            console.log(result);
        },

        error: function(e) {

            alert("Api call failed");
            console.log(e);
            return "asdf";
        },
    });

}


//  API CALL TO : "/auth/export_trial"
//  SENDS       : auth_token, trial_id
//  RECEIVES    : JSON object with the trial info
//  dummy_data = straight up csv text;
// ============================================================================================================
function exported_trial_details(auth_token, trial_id){


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

 dummy_data = "column1, column2, column3\nrow1, row1, row1\nrow2, row2, row2";

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














