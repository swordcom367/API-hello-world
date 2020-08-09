const express = require('express');
const router = express.Router();
const sqlHelper = require("./helper functions/sqlHelper")

router.post('/',(req,res,next) => {
   var username = req.body.username;
   var password = req.body.password;
    if(sqlHelper.getData(function(result) {
        if(result.rowsAffected[0] > 0) {
                //console.log(result.recordset[0].user_name + " result");
            if(result.recordset[0].user_name == username && result.recordset[0].password == password) {
                let accsess=""
                switch(result.recordset[0].entitlement) {
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