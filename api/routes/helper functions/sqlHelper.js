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
module.exports.getData = function getData(_callback,peramiter,table,Collums) {
    console.log(config.flags.databace + " databace");
    console.log(peramiter)
    switch(config.flags.databace) {
        case 'mSql':
            getMsqlData(_callback,peramiter,config.MSqlconnectionConfig,table,Collums);
        break;
        case 'mySql':
            getMySqlData(_callback,peramiter,config.MySqlonnectionConfig,table);
        break;
        case null:
            console.log("please flag databace")
            break;
        case undefined:
            console.log("please flag databace")
            break;
    }
}
module.exports.setData = function setData(_callback,peramiter,table,Collums) {
    console.log(config.flags.databace + " databace");
    console.log("set")
    console.log(peramiter + " true paramiter")
    switch(config.flags.databace) {
        case 'mSql':
            setMsqlData(_callback,peramiter,config.MSqlconnectionConfig,table,Collums);
        break;
        case 'mySql':
            setMySqlData(_callback,peramiter,config.MySqlonnectionConfig,table,);
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
function getMySqlData(_callback,peramiter,dataConfig,table,Collums) {
    const mysql = require('mysql');
    var con = mysql.createConnection(dataConfig);
    con.connect(function(err) {
        if (err) { 
            throw err 
        } else {
            sqlGetStringAssembly(function(sqlQuery) {
                con.query(sqlQuery, function (err, result,fields) {
                    if(!err) {
                        _callback(result);
                    } else {
                        console.log(err);
                    }
                });
            },peramiter,table,Collums);
        }
    });
}
//returns an array of json
function getMsqlData(_callback,peramiter,dataConfig,table,Collums) { 
    const sql = require('mssql');
    let connection = sql.connect(dataConfig,(err) => {
        if(err) {
        return console.log(err);
        } else {
            var request = new sql.Request();
            console.log(peramiter +" paramiter")
            sqlGetStringAssembly(function(sqlQuery) {
                request.query(sqlQuery, function (err, data) {
                    if (err) console.log(err)
                    // send records as a response
                    console.log(data);
                    _callback(data.recordset);
                });
            },peramiter,table,Collums);
        }
    });
}
//this is bad re work this becuse these are the same as get ms
function setMsqlData(_callback,peramiters,dataConfig,table,Collums) {
    console.log("ser m sql data peramiters " + peramiters)
    const sql = require('mssql');
    let connection = sql.connect(dataConfig,(err) => {
        if(err) {
        return console.log(err);
        } else {
            var request = new sql.Request();
            sqlSetStringAssembly(function(sqlQuery) {
                request.query(sqlQuery, function (err, data) {
                    if (err) console.log(err)
                    // send records as a response
                    console.log(data);
                    _callback(data.recordset);
                });
            },peramiters,table,Collums);
        }
    });
}
function sqlGetStringAssembly(_callback,peramiter,table,Collums) {
    console.log(table + " table");
    let sqlQuery ="";
    console.log(peramiter + " parm shit");
    let cols="";
    for (let index = 0; index < Collums.length; index++) {
         cols += Collums[index];
         if(index<Collums.length-1) {
             cols+=","
         }
        
    }
    if(peramiter != undefined) {
        if(peramiter == "all") {
            sqlQuery= `select ${cols} from ${table}`
        } else {
            //add in the array of peramiters
            sqlQuery = `select ${cols} from ${table} where username='${peramiter}';`
        }
    } else {
        sqlQuery= `select ${cols} from ${table}`
    }
    console.log(sqlQuery + " this is the sql query");
    _callback(sqlQuery);
}

function sqlSetStringAssembly(_callback,peramiters,table,Collums) {
    console.log("shit ");
    let cols="";
    for (let index = 0; index < Collums.length; index++) {
         cols += Collums[index];
         if(index<Collums.length-1) {
             cols+=","
         }
    }
    let val="";
    for (let index = 0; index < peramiters.length; index++) {
         val += peramiters[index];
         if(index<peramiters.length-1) {
             val+=","
         }
        
    }
    let sqlQuery= `INSERT INTO ${table} (${cols}) VALUES (${val});`
    console.log(sqlQuery);
    _callback(sqlQuery);

}