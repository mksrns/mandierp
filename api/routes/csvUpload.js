const express = require('express');
const router = express.Router();
const multer = require('multer');
const csvUploads = require('../models/csvUpload');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    //reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    }else{
        cb(null, false);
    }
};

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
});

router.post('/', upload.single('csvUploadImage'), (req, res, next) => {
    console.log(req.file);
    const csvUpload = new csvUploads({
        csvUploadImage: req.file.path
    });
    csvUpload.save((err,result) => {
        if(err){
            res.status(500).json({msg: 'Failed to upload csv', error: err});
        } else {
            res.status(201).json({
                message: "csv uploaded Successfully",
                createdData: result,
            });
        }
    });
});

module.exports = router;