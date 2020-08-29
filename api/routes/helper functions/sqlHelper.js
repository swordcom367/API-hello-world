const yaml = require('js-yaml')
const fs = require('fs');
const path = require('path');
// sql impmentation

//grabs data from congig yaml file
//---------------------------------------- public 
module.exports.getData = function getData(_callback,peramiter,table,Collums,findCondition,config) {
    console.log(config.flags.databace + " databace");
    console.log(peramiter)
    switch(config.flags.databace) {
        case 'mSql':
            getMsqlData(_callback,peramiter,config.MSqlconnectionConfig,table,Collums,findCondition);
        break;
        case 'mySql':
            getMySqlData(_callback,peramiter,config.MySqlonnectionConfig,table,findCondition);
        break;
        case null:
            console.log("please flag databace")
            break;
        case undefined:
            console.log("please flag databace")
            break;
    }
}
module.exports.setData = function setData(peramiter,table,Collums,config) {
    switch(config.flags.databace) {
        case 'mSql':
            setMsqlData(peramiter,config.MSqlconnectionConfig,table,Collums);
        break;
        case 'mySql':
            setMySqlData(peramiter,config.MySqlonnectionConfig,table,);
        break;
        case null:
            console.log("please flag databace")
            break;
        case undefined:
            console.log("please flag databace")
            break;
    }
}
module.exports.updateData = function updateData(changeData,table,Collums,findParam,conndition,config) {
    console.log(config);
    switch(config.flags.databace) {
        case 'mSql':
            updateMsqlData(changeData,config.MSqlconnectionConfig,table,Collums,findParam,conndition);
        break;
        case 'mySql':
            updateMySqlData(changeData,config.MySqlonnectionConfig,table,Columns,findParam,conndition);
        break;
        case null:
            console.log("please flag databace")
            break;
        case undefined:
            console.log("please flag databace")
            break;
    }
}
//---------------------------------privite 
//returns array of json
function getMySqlData(_callback,peramiter,dataConfig,table,Collums,findCondition) {
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
            },peramiter,table,Collums,findCondition);
        }
    });
}
//returns an array of json
function getMsqlData(_callback,peramiter,dataConfig,table,Collums,findCondition) { 
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
                   // console.log(data);
                    _callback(data.recordset);
                });
            },peramiter,table,Collums,findCondition);
        }
    });
}
//this is bad re work this becuse these are the same as get ms
function setMsqlData(peramiters,dataConfig,table,Collums,findCondition) {
    const sql = require('mssql');
    let connection = sql.connect(dataConfig,(err) => {
        if(err) {
        return console.log(err);
        } else {
            var request = new sql.Request();
            sqlSetStringAssembly(function(sqlQuery) {
                request.query(sqlQuery, function (err, data) {
                    if (err) console.log(err)
                });
            },peramiters,table,Collums,findCondition);
        }
    });
}
function updateMsqlData(changeParam,dataConfig,table,Collums,findParam,conndition) {
    const sql = require('mssql');
    let connection = sql.connect(dataConfig,(err) => {
        if(err) {
        return console.log(err);
        } else {
            var request = new sql.Request();
            sqlUpdateStringAssembly(function(sqlQuery) {
                request.query(sqlQuery, function (err, data) {
                    if (err) console.log(err)
                });
            },changeParam,table,Collums,findParam,conndition);
        }
    });
}
//------------------------------------string assemby
// order must match what data is put into what collum
function sqlGetStringAssembly(_callback,peramiter,table,Collums,findCondition) {
    console.log(table + " table");
    let sqlQuery ="";
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
            sqlQuery = `select ${cols} from ${table} where ${findCondition}='${peramiter}';`
        }
    } else {
        sqlQuery= `select ${cols} from ${table}`
    }
    //console.log(sqlQuery + " this is the sql query");
    _callback(sqlQuery);
}
// order must match what data is put into what collum
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
    //console.log(console.log(val) + " value")
    let sqlQuery= `INSERT INTO ${table} (${cols}) VALUES (${val});`
    //console.log(sqlQuery);
    _callback(sqlQuery);

}

function sqlUpdateStringAssembly(_callback,changeData,table,Collums,findParam,conndition) {
    let setString =``;
    if(changeData.length == Collums.length) {
        for(let i=0;i< Collums.length;i++) {
            if(i==0) {
                setString =`SET ${Collums[i]}=${changeData[i]}`
            } else if(i<Collums.length-1) {
                setString +=`${Collums[i]}=${changeData[i]},`
            } else {
                setString += `${Collums[i]}=${changeParam[i]}`
            }
        } 
    }
    //console.log(setString);
    let sqlString = `UPDATE ${table} ${setString} where ${findParam} = ${conndition};`
   // console.log(sqlString);
    _callback(sqlString);
}
//---------------------------
//helper


module.exports.readYaml = function readYaml(_callback) {
   fs.readFile(path.resolve(__dirname, "sqlConfig.yaml"),'utf8' , function (err,data) {
        if (err) {
            return console.log(err);
        }
        console.log("shit");
        _callback(yaml.safeLoad(data));
    });
}