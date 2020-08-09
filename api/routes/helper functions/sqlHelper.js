const sql = require('mssql');
const yaml = require('js-yaml')
const fs = require('fs');
const path = require('path');

let config;
fs.readFile(path.resolve(__dirname, "sqlConfig.yaml"),'utf8' , function (err,data) {
    if (err) {
        return console.log(err);
    }
    config = yaml.safeLoad(data);
    console.log(config.connectionConfig);
});

// a publicly exposed modual
module.exports.getData = function getData(_callback,peramiter) { 
    let connection = sql.connect(config.connectionConfig,(err) => {
        if(err) {
        return console.log(err);
        } else {
            var request = new sql.Request();
            let sqlQuery ="";
            console.log(peramiter);
            if(peramiter != undefined) {
                if(peramiter == "all") {
                    sqlQuery= "select user_name,entitlement,password from foo.dbo.Accounts"
                } else {
                    sqlQuery = `select user_name,entitlement,password from foo.dbo.Accounts where user_name='${peramiter}';`
                }
            } else {
                sqlQuery= "select user_name,entitlement,password from foo.dbo.Accounts"
            }
            request.query(sqlQuery, function (err, data) {
                    
                if (err) console.log(err)
                console.log(data);
                // send records as a response
                _callback(data);
            });
        }
    });
}