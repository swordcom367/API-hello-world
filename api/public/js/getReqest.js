//const { json } = require("body-parser");
$(document).ready(function() {
    console.log("working");
    // all custom jQuery will go here
    $(".get").click(function() {
        console.log($("#username").val());
        $.ajax({
            type: 'GET',
            crossDomain: true,
            dataType: 'JSON',
            url: `http://localhost:3000/products/${$("#username").val()}`,
            success: function(jsondata){
                console.log(jsondata);
            }
         });
        //sendSteps();
    });

    $(".post").click(() => {
        console.log($("#username").val());
        $.ajax({
            type: 'POST',
            crossDomain: true,
            dataType: 'JSON',
            url: 'http://localhost:3000/products',
            data: {username: $("#username").val() },
            success: function(jsondata){
                console.log(jsondata);
            }
         });

    });
});

