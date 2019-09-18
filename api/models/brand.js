const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var brandSchema = new Schema({
    name: {type: String},
    created_at: {type: Date, required:true },
    updated_at: {type: Date},
});

module.exports = mongoose.model('Brand', brandSchema);