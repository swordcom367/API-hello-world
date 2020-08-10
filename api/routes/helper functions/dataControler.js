const sqlHelper = require("./sqlHelper");

//grabs user by passing a user name and then using a a callback function to grab the user
module.exports.getUser  = function getUser(_callback,username) {
    sqlHelper.getData(function(result) {
        if(result.length == 1) {
        _callback(result[0]);
        } else {
            _callback(null);
        }
    },username,"Accounts",["username","entitlement","password"]);
}
//takes an array of api key peramiters and 
module.exports.getApiKey = function getApiKey(_callback,username) {
    sqlHelper.getData(function (result) {
        if(result.length == 1) {
            _callback(result[0]);
            } else {
                _callback(null);
            }
    },username,"Keys",["apiKey","username","startTime","lastTime","entitalment"])
}
module.exports.addApiKey = function setApiKey(username,key,entitalment) {
    paramiters =[key , username, "CURRENT_TIMESTAMP	" , "CURRENT_TIMESTAMP	" , entitalment];
    sqlHelper.setData(function (result) {
        if(result.length == 1) {
            _callback(result[0]);
            } else {
                _callback(null);
            }
    },paramiters,"Keys",["apiKey","username","startTime","lastTime","entitalment"])
}