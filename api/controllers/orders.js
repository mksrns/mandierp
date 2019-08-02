const Order = require('../models/order');
const Customer = require('../models/customer');

exports.orders_get_all = (req, res, next) => {
    Order.find(function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            if(result.length >= 1){
                res.status(200).json({
                    count: result.length,
                    orders: result.map(res => {
                        return {
                            id: res._id,
                            customer: res.customer,
                            quantity: res.quantity,
                            request: {
                                type: 'GET',
                                url: "http://localhost:8080/orders/" + res._id
                            }                            
                        }
                    })
                });
            } else {
                res.status(404).json({
                    message: 'No Orders found'
                });
            }            
        }
    }).select("customer quantity _id").populate('customer', 'name contactInfo');
}

exports.orders_create_order = (req, res, next) => {
    Customer.findById(req.body.customerId, (err, result) => {
        if(err){
            res.status(500).json({msg: 'Customer not Found', error: err});
        } else { 
            if(!result){
                return res.status(404).json({
                    message: "Customer not found"
                });
            }
            const order = new Order({
                quantity: req.body.quantity,
                customer: req.body.customerId
            });
            
            order.save((err,result) => {
                if(err){
                    res.status(500).json({msg: 'Failed to add order', error: err});
                } else {

                    res.status(201).json({
                        message: "Order created Successfully",
                        createdOrder: result,
                        request: {
                            type: 'GET',
                            url: "http://localhost:8080/orders/" + result._id
                        }
                    });
                }
            });
        }
    });
}

exports.orders_get_order = (req, res, next) => {
    Order.findById(req.params.orderId, (err, result) => {
        if(err){
            res.status(500).json({
                message: "No orders",
                error: err
            });
        } else {
            if(!result){
                return res.status(404).json({
                    message: 'Order not found'
                });
            }
            res.status(200).json({
                order: result,
                request: {
                    type: 'GET',
                    url: "http://localhost:8080/orders/"
                }    
            });
        }
    }).populate('customer');
}

exports.orders_delete_order = (req, res, next) => {
    Order.remove({_id: req.params.orderId}, (err, result) => {
        if(err){
            res.status(500).json({
                message: 'Problem in deleting product',
                error: err
            });
        } else {
            res.status(200).json({
                message: 'Order deleted',
                request: {
                    type: 'POST',
                    url: "http://localhost:8080/orders/"
                }    
            });
        }
    });
}