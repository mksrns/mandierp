const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json(
        [
            {id:1,state:"bihar", city:[
                {id:1,state:"muzaffarpur"},
                {id:2,state:"hajipur"},
                {id:3,state:"begusarai"},
            ]},
            {id:2,state:"jharkhand", city:[
                {id:1,state:"mesra"},
                {id:2,state:"devghar"},
                {id:3,state:"sirdi"}
            ]},
            {id:3,state:"up"},
            {id:4,state:"maharastra"},
            {id:5,state:"shimla"},
            {id:6,state:"kashmir"},
            {id:7,state:"assam"},
            {id:8,state:"gujrat"}
        ]
    );
});

module.exports = router;