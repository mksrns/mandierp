const express = require('express');
const router = express.Router();
const multer = require('multer');
//const checkAdminAuth = require('../middleware/check-adminAuth');
const MerchantsController = require('../controllers/merchants');

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

//Fetch all merchant
router.get('/', MerchantsController.merchants_get_all);

//Fetch Individual merchant
router.get('/:merchantId', MerchantsController.merchants_get_merchant);

//Insert merchant
router.post('/', upload.single('merchantImage'), MerchantsController.merchants_create_merchant);

//Update merchant
router.patch('/:merchantId', MerchantsController.merchants_update_merchant);

//Delete merchant
router.delete('/:merchantId', MerchantsController.merchants_delete_merchant);

module.exports = router;