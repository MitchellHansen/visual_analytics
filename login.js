//assuming that button_ submit is the id for the submit button
//@pushkin_Feleke
//
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
