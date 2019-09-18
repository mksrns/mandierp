const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var productSchema = new Schema({
    name: {type: String},
    sku: {type: String},
    description: {type: String},
    product_image: {type: String},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required:true},
    brand: {type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required:true},
    created_at: {type: Date, required:true },
    updated_at: {type: Date},
});

module.exports = mongoose.model('Product', productSchema);