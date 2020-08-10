const express = require('express');
const router = express.Router();
const dataControler = require("./helper functions/dataControler")
const uuid = require('uuid');
const e = require('express');

console.log(uuid.v1().length);
router.post('/',(req,res,next) => {
   var username = req.body.username;
   console.log(username + " post username")
   var password = req.body.password;
    if(dataControler.getUser(function(result) {
        if(result != null) {
                //console.log(result.recordset[0].user_name + " result");
            if(result.username == username && result.password == password) {
                let key='';
                let entitalment = result.entitlement
                console.log(entitalment);
                dataControler.getApiKey(function(result) {
                    if(result == undefined) {
                        key = uuid.v1();
                        dataControler.addApiKey(username,key,entitalment);
                    } else {
                        key = dataControler.getApiKey();
                    }
                },username)
                res.status(200).json( {
                    message: "login sucsessfull",
                    ApiKey: key
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