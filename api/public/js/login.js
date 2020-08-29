let cheked = document.getElementById('slider').checked;
let cmdString;
changeModes();
$('#slider').change(() => {
    cheked = document.getElementById('slider').checked;
    changeModes()
});

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
                password:$("#password").val(),
                cmd: cmdString
            },
        success: function(jsondata){
            console.log(jsondata);
            //this is where the api key will be stored 
            sessionStorage.ApiKey=jsondata.ApiKey;
            console.log(sessionStorage.ApiKey + " local storage");
        }
     });

});

function changeModes() {
    if(cheked == false) {
        cmdString= "login";
    } else {
        cmdString= "create" 
    }
    $("#status").html(cmdString);
}