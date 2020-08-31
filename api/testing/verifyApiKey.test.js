 const verification = require("../routes/helper functions/verifyApiKey");
// const sqlHelper =require("../routes/helper functions/sqlHelper")
// const yaml = require('js-yaml')
// const fs = require('fs');
// const path = require('path');
//const sql = require('mssql');
 test("should verify the api key", () => {
    verification.verifyApiKey(function(result) {
        try {
            expect(data).toBe(true)
        }
        catch(err) {
            done(err);
        }
    },"test",1) 
});
// test("should get yaml", () => {
//     expect(sqlHelper.configuer().flags.databace).toBe("mSql");
// });