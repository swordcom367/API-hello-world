const express = require('express');
const router = express.Router();
const dataControler = require("./helper functions/dataControler")
const uuid = require('uuid');
const e = require('express');

router.post('/',(req,res,next) => {
   var username = req.body.username;
   var password = req.body.password;
   var cmd = req.body.cmd;
   if(cmd == "login") { 
    LoginUser(username,password,res);
   } else if(cmd =="create") {
    createUser(username,password,res);
   }
});
function LoginUser(username,password,res) {
    if(dataControler.getUser(function(result) {
        if(result != null) {
            if(result.username == username && result.password == password) {
                let key='';
                let entitalment = result.entitlement
                dataControler.getApiKey(function(result) {
                    if(result == undefined) {
                        key = uuid.v1();
                        dataControler.addApiKey(key,username,entitalment);
                    } else {
                        key = result.apiKey;
                        dataControler.UpdateLastAwakeTime(key);
                    }
                    res.status(200).json( {
                        message: "login sucsessfull",
                        ApiKey: key
                    });
                },username);
            } else {
                console.log("first fail point");
                res.status(401).json( {
                    message: "password worng",
                });
            }
        } else {
            console.log("second fail point");
            res.status(401).json( {
                message: "login failed",
            });
        }
    },username));
}
function createUser(username,password,res) {
    console.log("creating user")
    dataControler.getUser(function(result) {
        if(result==null) {
            dataControler.addUser(username,password,1);
            key = uuid.v1();
            dataControler.addApiKey(key,username,1);
            LoginUser(username,password,res);
        } else {
            console.log("exsisting user")
            LoginUser(username,password,res);
        }
    },username)
}
module.exports = router;