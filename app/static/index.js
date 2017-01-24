function show_admin_login(){
    $("#right-hand-container").children().hide();
    $("#admin-login-div").show();

    //  document.getElementById("textStuff").innerHTML="Testing";
}
function show_training(){
    $.ajax({url: "/auth/about", async: false, success: function(result){
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

