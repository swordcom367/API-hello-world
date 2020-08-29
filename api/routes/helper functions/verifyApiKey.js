const dc = require("./dataControler.js")
//this verifys the api keys 
module.exports.verifyApiKey = async function(_calback,key,reqiredPermition) {
    dc.getPermitions(key,function(result) {
        if(result.entitalment >= reqiredPermition) {
            _calback(true)
        } else {
            console.log("fase")
            _calback(false);
        }
    });
}