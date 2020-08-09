const yaml = require('js-yaml')
const fs = require('fs');
const path = require('path');
// sql impmentation

//grabs data from congig yaml file
let config;
fs.readFile(path.resolve(__dirname, "sqlConfig.yaml"),'utf8' , function (err,data) {
    if (err) {
        return console.log(err);
    }
    config = yaml.safeLoad(data);
});

// a publicly exposed modual
module.exports.getData = function getData(_callback,peramiter) {
    console.log(config.flags.databace + " databace");
    console.log(peramiter)
    switch(config.flags.databace) {
        case 'mSql':
            getMsqlData(_callback,peramiter,config.MSqlconnectionConfig);
        break;
        case 'mySql':
            getMySqlData(_callback,peramiter,config.MySqlonnectionConfig);
        break;
        case null:
            console.log("please flag databace")
            break;
        case undefined:
            console.log("please flag databace")
            break;
    }
}
//returns array of json
function getMySqlData(_callback,peramiter,dataConfig) {
    const mysql = require('mysql');
    var con = mysql.createConnection(dataConfig);
    con.connect(function(err) {
        if (err) { 
            throw err 
        } else {
            sqlStringAssembly(function(sqlQuery) {
                con.query(sqlQuery, function (err, result,fields) {
                    if(!err) {
                        _callback(result);
                    } else {
                        console.log(err);
                    }
                });
            },peramiter,dataConfig);
        }
    });
}
//returns an array of json
function getMsqlData(_callback,peramiter) { 
    const sql = require('mssql');
    let connection = sql.connect(dataConfig,(err) => {
        if(err) {
        return console.log(err);
        } else {
            var request = new sql.Request();
            sqlStringAssembly(function(sqlQuery) {
                request.query(sqlQuery, function (err, data) {
                    if (err) console.log(err)
                    // send records as a response
                    _callback(data.recordset);
                });
            },peramiter,dataConfig);
        }
    });
}

function sqlStringAssembly(_callback,peramiter,config) {
    let sqlQuery ="";
    console.log(peramiter + " parm");
    if(peramiter != undefined) {
        if(peramiter == "all") {
            sqlQuery= `select username,entitlement,password from Accounts`
        } else {
            sqlQuery = `select username,entitlement,password from Accounts where username='${peramiter}';`
        }
    } else {
        sqlQuery= `select username,entitlement,password from Accounts`
    }
    _callback(sqlQuery);
}