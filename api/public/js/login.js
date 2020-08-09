$(".submit").click(() => {
    console.log("click event");
    console.log($("#username").val());
    $.ajax({
        type: 'POST',
        crossDomain: true,
        dataType: 'JSON',
        url: 'http://localhost:3000/login',
        data: {
                username: $("#username").val(),
                password:$("#password").val() 
            },
        success: function(jsondata){
            console.log(jsondata);
        }
     });

});