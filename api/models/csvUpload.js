const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var csvUploadSchema = new Schema({
    csvUploadImage: { type: String },
    name: {type: String}
});

module.exports = mongoose.model('csvUpload', csvUploadSchema);