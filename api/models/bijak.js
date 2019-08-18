const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var bijakSchema = new Schema({
    no: {type: Number},
    city: {type: String},
    dataOfReciept: {type: Date },
    dispatchDate: {type: Date},
    ms: {type: String},
    truckNo: {type: String},
    itemRows: [{
      sno: {type:Number},
      description: {type:String},
      ctnKg: {type:Number},
      rate: {type:Number},
      itemAmount: {type: Number}
    }],
    commission:{type:Number},
    truckFreight: {type: Number},
    railFreight: {type: Number},
    stationMandiExp: {type: Number},
    unloading:{type: Number},
    postage: {type:Number},
    phone:{type:Number},
    coldStorage:{type:Number},
    loading:{type:Number},
    charity:{type:Number},
    totalGrossSale:{type:Number},
    totalExpenses:{type:String},
    netSale:{type:String},
    totalNags: {type:Number},
    created_at: {type: Date, required:true },
    updated_at: {type: Date}
});

bijakSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Bijak', bijakSchema);