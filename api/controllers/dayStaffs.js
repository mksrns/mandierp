const DayStaff = require('../models/dayStaff');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/database');

exports.dayStaffs_get_all = (req, res, next) => {
    DayStaff.find(function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            if(result.length >= 1){
                res.status(200).json({
                    count: result.length,
                    dayStaff: result.map(res => {
                        return {
                            name: { 
                                firstname: res.name.firstname,
                                lastname: res.name.lastname
                            },
                            username: res.username,
                            dayStaffImage: res.dayStaffImage,
                            id:res._id,
                            contactInfo: {
                                address:{
                                    email: res.contactInfo.email,
                                    street: res.contactInfo.address.street,
                                    city: res.contactInfo.address.city,
                                    state: res.contactInfo.address.state,
                                    pincode: res.contactInfo.address.pincode
                                },
                                email:res.contactInfo.email,
                                telephone:{
                                    tel1: res.contactInfo.telephone[0],
                                    tel2: res.contactInfo.telephone[1]
                                }
                            },
                            created_at:res.created_at,
                            updated_at:res.updated_at,
                            request: {
                                type: 'GET',
                                URL: 'http://localhost:8080/dayStaffs/' + res._id
                            }
                        }
                    })
                });
            } else {
                res.status(404).json({
                    message: 'No Entries found'
                });
            }            
        }
    });
}

exports.dayStaffs_get_dayStaff = (req, res, next) => {
    DayStaff.findById(req.params.dayStaffId, function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            if(result){
                res.status(200).json({
                    dayStaff: result,
                    request: {
                        type: 'GET',
                        description: 'Get all dayStaffs',
                        url: "http://localhost:8080/dayStaffs/"
                    }
                });
            } else {
                res.status(404).json({
                    message: 'No Entries found'
                });
            }            
        }
    });
}

exports.dayStaffs_create_dayStaff = (req, res, next) => {
    DayStaff.find({username: req.body.username}, (err, result) => {
        if(result.length >= 1){
            return res.status(409).json({
                message: "username exists"
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const dayStaff = new DayStaff({
                        name: {
                            firstname: req.body.firstname,
                            lastname: req.body.lastname
                        },
                        //dayStaffImage: req.file.path,
                        username: req.body.username,
                        password: hash,
                        created_at: new Date(),
                        contactInfo: {
                            telephone: [
                                req.body.tel1,
                                req.body.tel2
                            ],
                            email: req.body.email,
                            address: {
                                street: req.body.street,
                                city: req.body.city,
                                state: req.body.state,
                                pincode: req.body.pincode,
                            }
                        }
                    });
                    dayStaff.save((err,result) => {
                        if(err){
                            res.status(500).json({msg: 'Failed to add dayStaff', error: err});
                        } else {
                            res.status(201).json({
                                message: "DayStaff added Successfully",
                                createdData: result,
                                request: {
                                    type: 'GET',
                                    url: "http://localhost:8080/dayStaffs/" + result._id
                                }
                            });
                        }
                    });
                }
            })
        }
    });
}

exports.dayStaff_login = (req, res, next) => {
    DayStaff.find({username: req.body.username}, (err, result) => {
        if(err){
            res.status(500).json({
                error: err
            });
        } else {
            if(result.length < 1){
                return res.status(401).json({
                    message: "Auth Failed"
                });
            } 
            bcrypt.compare(req.body.password, result[0].password, (err, result) => {
                if(err){
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                } 
                if(result){
                    const token = jwt.sign({
                        username: result.username,
                        Id: result._id
                    },
                    config.secret, 
                    {
                        expiresIn: "1h"
                    }
                    );
                    return res.status(200).json({
                        message: "Auth successfull",
                        token: token
                    });
                }
                return res.status(401).json({
                    message: "Auth failed"
                });
            });
        }
    });
}

exports.dayStaffs_update_dayStaff = (req, res, next) => {
    
    var dayStaff = {
        name:{
            firstname:req.body.firstname,
            lastname:req.body.lastname
        },
        username: req.body.username,
        password: req.body.password,
        updated_at: new Date(),
        contactInfo: {
            telephone: [
                req.body.tel1,
                req.body.tel2
            ],
            email: req.body.email,
            address: {
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                pincode: req.body.pincode,
            }
        }
    };
    
    /*const updateOps = {}; 
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    } */

    DayStaff.findByIdAndUpdate({_id:req.params.dayStaffId}, dayStaff, {new:true}, function(err, result){
        if(err){ 
            res.status(500).json({error: err});
        } else {
            res.status(200).json({
                message: 'Daystaff updated',
                request: {
                    type: 'GET',
                    url: "http://localhost:8080/dayStaffss/" + result._id
                }
            });
        }
    });
    // console.log(updateOps);
}

exports.dayStaffs_delete_dayStaff = (req, res, next) => {
    DayStaff.remove({_id:req.params.dayStaffId}, function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            res.status(200).json({
                message: 'DayStaff deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:8080/dayStaffs/'
                }
            });
        }
    });
}