const Category = require('../models/category');

exports.categorys_get_all = (req, res, next) => {
    Category.find(function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            if(result.length >= 1){
                res.status(200).json({
                    count: result.length,
                    category: result
                    // .map(res => {
                    //     return {
                    //         id: res._id,
                    //         name: res.name,
                    //         created_at:res.created_at,
                    //         updated_at:res.updated_at
                    //     }
                    // })
                });
            } else {
                res.status(404).json({
                    message: 'No Entries found'
                });
            }            
        }
    });
}

exports.categorys_get_category = (req, res, next) => {
    Category.findById(req.params.categoryId, function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            if(result){
                res.status(200).json({
                    category: result,
                    request: {
                        type: 'GET',
                        description: 'Get all Category',
                        url: "http://localhost:8080/categorys/"
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

exports.categorys_create_category = (req, res, next) => {
    const category = new Category({
        name: req.body.name,
        number: req.body.number,
        subCategory:[
            {
                name: req.body.subCategory.name,
                number: req.body.number,
                minorCategory: [{
                    name: req.body.name,
                    numbers: req.body.number,
                }]
            }
        ],
        created_at: new Date()
    });
    category.save((err,result) => {
        if(err){
            res.status(500).json({msg: 'Failed to add category', error: err});
        } else {
            res.status(201).json({
                message: "categorys added Successfully",
                createdData: result,
                request: {
                    type: 'GET',
                    url: "http://localhost:8080/categorys/" + result._id
                }
            });
        }
    });
}
