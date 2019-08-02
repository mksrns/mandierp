const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAdminAuth = require('../middleware/check-adminAuth');
const DayStaffsController = require('../controllers/dayStaffs');

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

//Fetch all dayStaff
router.get('/', checkAdminAuth, DayStaffsController.dayStaffs_get_all);

//Fetch Individual dayStaff
router.get('/:dayStaffId', checkAdminAuth, DayStaffsController.dayStaffs_get_dayStaff);

//Insert dayStaff
router.post('/', checkAdminAuth, upload.single('dayStaffImage'), DayStaffsController.dayStaffs_create_dayStaff);

//login
router.post('/login', DayStaffsController.dayStaff_login);

//Update dayStaff
router.patch('/:dayStaffId', checkAdminAuth, DayStaffsController.dayStaffs_update_dayStaff);

//Delete dayStaff
router.delete('/:dayStaffId', checkAdminAuth, DayStaffsController.dayStaffs_delete_dayStaff);

module.exports = router;