const express = require('express');
const router = express.Router();
const dataControler = require("./helper functions/dataControler")

router.post('/',(req,res,next) => {
   var username = req.body.username;
   console.log(username + " post username")
   var password = req.body.password;
    if(dataControler.getUser(function(result) {
        if(result != null) {
                //console.log(result.recordset[0].user_name + " result");
            if(result.username == username && result.password == password) {
                let accsess=""
                switch(result.entitlement) {
                    case 0:
                        accsess="none";
                        break;
                    case 1:
                        accsess="little";
                        break;
                    case 2:
                        accsess="some";
                        break;
                    case 3:
                        accsess="all";
                        break;
                }

                res.status(200).json( {
                    message: "login sucsessfull",
                    ApiKey: accsess
                });


            } else {
                res.status(401).json( {
                    message: "login failed",
                });
            }
        } else {
            res.status(401).json( {
                message: "login failed",
            });
        }
    },username));
});

module.exports = router;