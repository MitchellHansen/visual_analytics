
// =================================
// These functions all have to do with the right panel on the home screen

function show_trial_login(){
    $("#right-hand-container").children().hide();
    $("#trial-login-div").show();
}

function show_training_info(){
    $("#right-hand-container").children().hide();
    $("#training-info-div").show();
}

function show_about(){
    $("#right-hand-container").children().hide();
    $("#about-div").show();
}

function show_admin_login(){
    $("#right-hand-container").children().hide();
    $("#admin-login-div").show();
}

// =================================
// =================================


function transfer_to_test_view(){
    $("#main-admin-panel").slideToggle();
    $("#admin-test-view-panel").slideToggle();
}

function transfer_to_test_edit(){
}

function transfer_to_test_new(){
}

function transfer_to_test_template_edit(){
}


function show_training(){



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

    // Roll up the navbar and open the content container
    roll_up_reveal_navbar();
    $("#main-admin-panel").show();

    // Try and get the test-set names and statuses
    if (!get_test_set_statuses()){

    }
    if (!get_test_template_data()){

    }
}

