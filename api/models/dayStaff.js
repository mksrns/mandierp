const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var dayStaffSchema = new Schema({
    name: {
        firstname: {type: String, required: true},
        lastname: {type: String}
    },
    dayStaffImage: { type: String },
    username: {type: String, required:true, unique: true
    },
    password: {type: String, required:true },
    created_at: {type: Date, required:true },
    updated_at: {type: Date},
    contactInfo:{
        telephone: [String],
        email: {type: String},
        address: {
            street: {type: String},
            city: {type: String},
            state: {type: String},
            pincode: {type: Number},
        }
    },
    /* order: {
        date: {type: Date},
        invoiceNumber: {type: String},
        paid: {type: Number},
        pending: {type: Number},
        description: {type: String},
    } */
});

module.exports = mongoose.model('DayStaff', dayStaffSchema);