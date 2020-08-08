const express = require('express');
const router = express.Router();
const sql = require('mssql')
const sqlHelper = require("./helper functions/sqlHelper.js")
//---------------------set up app
var mssqlConfig = {
    server: "localhost",
    database: "foo",
    user: 'adm', 
    password: 'admin'
}
//---------------------routes
router.get('/',(req,res,next) => {
    //-------------------geting parramiters
    var input = req.body.username;
    console.log(req.body);
    console.log(input +" input");
    //-------------------database grabing
    sqlHelper.getData(function(result) {
        res.status(200).json({
            message: "Handling Get Reqests",
            data: result.recordset
        });
    },input);
    //-------------------responce
});
router.get('/:productId',(req,res,next) =>  {
    //-------------------geting parramiters   
    var id = req.params.productId;
    //-------------------database grabing
    sqlHelper.getData( function(result) {
        res.status(200).json( {
            message: "prodict secrion", 
            username: result.recordset
        });
    },id);
});

router.post('/',(req,res,next)=> {
    var username = req.body.username;
    res.status(200).json( {
        message: "Hanndling Post reqesets",
        username: username
    });
});
//-------------------databace helper functions
 function getData(_callback,peramiter) { 
    console.log(peramiter)
    var request = new sql.Request();
    let sqlQuery ="";
    console.log(peramiter);
    if(peramiter != undefined) {
        if(peramiter == "all") {
            sqlQuery= "select user_name,entitlement from foo.dbo.Accounts"
        } else {
            sqlQuery = `select user_name,entitlement from foo.dbo.Accounts where user_name='${peramiter}';`
        }
    } else {
        sqlQuery= "select user_name,entitlement from foo.dbo.Accounts"
    }
    request.query(sqlQuery, function (err, data) {
            
        if (err) console.log(err)
        console.log(data);
        // send records as a response
        _callback(data);
    });
}

module.exports = router;