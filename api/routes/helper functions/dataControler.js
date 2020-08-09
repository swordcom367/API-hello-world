const sqlHelper = require("./sqlHelper");

//grabs user by passing a user name and then using a a callback function to grab the user
module.exports.getUser  = function getUser(_callback,username) {
    sqlHelper.getData(function(result) {
        if(result.length == 1) {
        _callback(result[0]);
        } else {
            _callback(null);
        }
    },username);
}