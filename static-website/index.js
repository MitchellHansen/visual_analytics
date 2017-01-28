

logged_in = false;
token = "asdofijwer";

function show_admin_login(){
    $("#right-hand-container").children().hide();
    $("#admin-login-div").show();
}

//  ---------------- API CALL TO { /auth/admin_login }

function admin_login(){

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
    if (result == "success"){
        logged_in = true;
        show_admin_window();
    }
    else{
        // Show help message
    }

}


function show_training(){
    $.ajax({url: "http://mitchellhansen.info/", async: false, success: function(result){
        console.log(result);
    }});

    // we need an animation to hide this title screen and pull up the trial screen
}
function show_about(){
    $("#right-hand-container").children().hide();
    $("#about-div").show();
}

function show_trial_login(){
    $("#right-hand-container").children().hide();
    $("#trial-login-div").show();
}

function test(){
    roll_up_reveal_navbar();
}

function roll_up_reveal_navbar(){
    $("#home-row").slideUp();
    $("#navbar-row").show();
    $("#slider-container").show();
}

function show_admin_window(){
    roll_up_reveal_navbar();
    get_test_statuses();
}

//  ---------------- API CALL TO { /auth/get_test_statuses }
function get_test_statuses(){

    if (!logged_in || token == ""){
        // Not logged in
    }

//    $.ajax({
//
//        url: "/auth/get_bulk_test_data",
//        contentType: "application/json; charset=utf-8",
//        type: "POST",
//        async: false,
//
//        data :{
//            token  : token,
//            status : { Either running, complete, parked, or any } perhaps as strings?
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

function populate_admin_page_active_tests(test_statuses){


    for (var key in test_statuses) {
        if (test_statuses.hasOwnProperty(key)) {

            var elem = $("#test-status-list-element-template").clone();
            $(elem).attr("id", key);

            if (test_statuses[key] == "RUNNING"){

                $(elem).children().children().last().text("⏲");
                $(elem).children().children().first().text(key);

            }
            else  if (test_statuses[key] == "PARKED"){

                $(elem).children().children().last().text("✔");
                $(elem).children().children().first().text(key);

            }
            else  if (test_statuses[key] == "COMPLETE"){

                $(elem).children().children().last().text("🛑");
                $(elem).children().children().first().text(key);

            }
            else {
                $(elem).children().children().last().text("ERROR");
                $(elem).children().children().first().text(key);
            }


            $("#test-status-list").append(elem);
            $("#" + key).show();
        }
    }
}


















