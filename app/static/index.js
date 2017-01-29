function show_admin_login(){
    $("#right-hand-container").children().hide();
    $("#admin-login-div").show();

    //  document.getElementById("textStuff").innerHTML="Testing";
}
function show_training(){
    $.ajax({url: "/auth/training", async: false, success: function(result){
        console.log(result);
    }});

    // we need an animation to hide this title screen and pull up the trial screen
}

$("button_submit".click(function())){

var email = ('#email').val();
var password = $('#password').val();
// you could create a console.log here to test username and password;
/*
console.log("email = "+email);
console.log("password = "+password);

*/

var foo = new object();
foo.email = email;
foo.password = password;

 alert(email);
            $.ajax({
                type:"GET",
                dataType:"json",
                data:foo ,
                url:"/auth/admin_login",
                success: function(data) {

		   //alert("i am in ");
                    $.each(data, function (key, value) {
                    console.log(value.email);
                        if (value.email != '' && value.password!='')
                            {
                                if(value.email!=email && value.password!=password)
                               // alert("correct password");
                                return false;
                            }
                    });


                },
                error: function() {

                }
           });


});

});

function show_about(){
    $("#right-hand-container").children().hide();
    $("#about-div").show();
}

function show_trial_login(){
    $("#right-hand-container").children().hide();
    $("#trial-login-div").show();
}
