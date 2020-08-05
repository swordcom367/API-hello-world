var xhttp = new XMLHttpRequest();
$(document).ready(function() {
    console.log("working");
    // all custom jQuery will go here
    $(".get").click(function() {
        console.log("CLICK EVENT YAYA");
        xhttp.readyState = function() {
            if(this.readyState == 4 && this.status==200) {
                $(".changing").text(this.responseText);
            }
        }
        xhttp.open("GET","localhost:3000/products",true);
        //xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhttp.send();
        // $.ajax({
        //     type: 'GET',
        //     crossDomain: true,
        //     dataType: 'JSONP',
        //     url: 'localhost:3000/products',
        //     success: function(jsondata){
        //         console.log(jsondata);
        //     }
        //  })
        //sendSteps();
    });
});
// function sendSteps(encodedLatLangs) {
//     $.ajax({
//         url: 'localhost:3000/products',
//         dataType: "jsonp",
//         contentType: "application/javascript; charset=utf-8",
//         crossDomain: true,
//         data: 'steps=' + encodeURIComponent(JSON.stringify(encodedLatLangs)),
//         success: function (response) {
//             console.log(done);
//         },
//         error: function (request, error) {
//             console.log('Ajax call gave an error');
//         }
//     });
// };

