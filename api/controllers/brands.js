const Brand = require('../models/brand');

exports.brands_get_all = (req, res, next) => {
    Brand.find(function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            if(result.length >= 1){
                res.status(200).json({
                    count: result.length,
                    brand: result.map(res => {
                        return {
                            id: res._id,
                            name: res.name,
                            created_at:res.created_at,
                            updated_at:res.updated_at
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

exports.brands_get_brand = (req, res, next) => {
    Brand.findById(req.params.brandId, function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            if(result){
                res.status(200).json({
                    brand: result,
                    request: {
                        type: 'GET',
                        description: 'Get all brand',
                        url: "http://localhost:8080/brands/"
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

exports.brands_create_brand = (req, res, next) => {
    const brand = new Brand({
        name: req.body.name,
        created_at: new Date()
    });
    brand.save((err,result) => {
        if(err){
            res.status(500).json({msg: 'Failed to add brand', error: err});
        } else {
            res.status(201).json({
                message: "brands added Successfully",
                createdData: result,
                request: {
                    type: 'GET',
                    url: "http://localhost:8080/brands/" + result._id
                }
            });
        }
    });
}

exports.brands_delete_brand = (req, res, next) => {
    Brand.remove({_id:req.params.brandId}, function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            res.status(200).json({
                message: 'brand deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:8080/brands/'
                }
            });
        }
    });
}