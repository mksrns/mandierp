const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var orderSchema = new Schema({
    customer: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required:true},
    quantity: {type: Number, default: 1}
});

module.exports = mongoose.model('Order', orderSchema);