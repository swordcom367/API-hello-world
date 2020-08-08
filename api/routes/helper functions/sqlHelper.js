const sql = require('mssql');
var mssqlConfig = {
    server: "localhost",
    database: "foo",
    user: 'adm', 
    password: 'admin'
}
// a publicly exposed modual
module.exports.getData = function getData(_callback,peramiter) { 
    let connection = sql.connect(mssqlConfig,(err) => {
        if(err) {
        return console.log(err);
        } else {
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
    });
}