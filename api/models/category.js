const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name: {type: String},
    number: {type: Number},
    subCategory: [{
        name: {type: String},
        number: {type: Number},
        minorCategory:[{
            name: {type: String},
            number: {type: Number},
        }]
    }],
    created_at: {type: Date, required:true },
    updated_at: {type: Date},
});

module.exports = mongoose.model('Category', categorySchema);