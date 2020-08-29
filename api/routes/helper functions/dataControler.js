const sqlHelper = require("./sqlHelper");

//grabs user by passing a user name and then using a a callback function to grab the user
module.exports.getUser  = function getUser(_callback,username) {
    sqlHelper.readYaml(function(result) { 
        sqlHelper.getData(function(result) {
            if(result.length == 1) {
            _callback(result[0]);
            } else {
                _callback(null);
            }
        },username,"Accounts",["username","entitlement","password"],"username",result);
    });
}
module.exports.addUser = function addUser(username,password,entaitalment) {
    let peramiters = [`'${username}'`, entaitalment,`'${password}'`];
    sqlHelper.readYaml(function(result) { 
    sqlHelper.setData(peramiters,"Accounts",["username","entitlement","password"],result);
    })
}

//takes an array of api key peramiters and 
module.exports.getApiKey = function getApiKey(_callback,username) {
    sqlHelper.readYaml(function(result) { 
        sqlHelper.getData(function (result) {
            if(result.length == 1) {
                _callback(result[0]);
                } else {
                    _callback(undefined);
                }
        },username,"Keys",["apiKey","username","startTime","lastTime","entitalment"],"username",result)
    });
}
module.exports.addApiKey = function setApiKey(key,username,entitalment) {
    paramiters =[`'${key}'`,`'${username}'`, "CURRENT_TIMESTAMP" , "CURRENT_TIMESTAMP" , entitalment];
    console.log(paramiters);
    sqlHelper.readYaml(function(result) { 
        sqlHelper.setData(paramiters,"Keys",["apiKey","username","startTime","lastTime","entitalment"],result);
    });
}

module.exports.UpdateLastAwakeTime = function UpdateLastAwakeTime(key) {
    changeData=["CURRENT_TIMESTAMP"]
    console.log("should be updateing time ")
    console.log(key);
    sqlHelper.readYaml(function(result) { 
        sqlHelper.updateData(changeData,"Keys",["lastTime"],["apiKey"],`'${key}'`,result);
    });
}
module.exports.getPermitions = function getPermitions(key,_callback) {
    sqlHelper.readYaml(function(result) { 
        sqlHelper.getData(function(result) {
            if(result.length == 1) {
                _callback(result[0]);
                } else {
                _callback(undefined);
            }
        },key,"Keys",["apiKey","username","entitalment"],"apiKey",result)
    });
}