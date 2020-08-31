const express = require('express');
const router = express.Router();
const verification = require("./helper functions/verifyApiKey.js");

//---------------------routes
router.get('/',(req,res,next) => {
    //should get a list of the usernames but nothing else 
});

router.post('/',(req,res,next)=> {
    //should get a spesific username
   let apiKey = req.body.apiKey;
   console.log(req.body);
   //should be a call back function
   verification.verifyApiKey(function(result) {
    if(result==true) {
        res.status(200).json({
            key: apiKey
        });
    } else {
        res.status(401).json( {
            message: "no permision"
        });
    }
   },apiKey,2); 
});


module.exports = router;