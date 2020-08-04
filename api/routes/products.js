const express = require('express');
const e = require('express');
const router = express.Router();

router.get('/',(req,res,next) => {
    res.status(200).json({
        message: "Handling Get Reqests"
    });
});
router.get('/:productId',(req,res,next) =>  {
    const id = req.params.prodictId;
    if(id == 'special') {
        res.status(200).json( {
            message: "you discoverd the easter egg",
            id:id
        });
    } else {
        res.status(200).json( {
            message: "prodict secrion", 
            id: id
        })
    }
});

router.post('/',(req,res,next)=> {
    res.status(200).json( {
        message: "Hanndling Post reqesets"
    });
});

module.exports = router;