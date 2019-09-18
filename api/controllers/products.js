const Product = require('../models/product');
const Category = require('../models/category');
const Brand = require('../models/brand');

exports.products_get_all = (req, res, next) => {
    // Product.find(function(err, result){
    //     if(err){
    //         res.status(500).json({error: err});
    //     } else {
    //         if(result.length >= 1){
    //             res.status(200).json({
    //                 count: result.length,
    //                 product: result.map(res => {
    //                     return {
    //                         id: res._id,
    //                         name: res.name,
    //                         sku: res.sku,
    //                         product_image: res.product_image,
    //                         description: res.description,
    //                         category: res.category,
    //                         brand: res.brand,
    //                         created_at: res.created_at,
    //                         updated_at:res.updated_at,
    //                         request: {
    //                             type: 'GET',
    //                             url: "http://localhost:8080/products/" + res._id
    //                         }   
    //                     }
    //                 })
    //             });
    //         } else {
    //             res.status(404).json({
    //                 message: 'No Entries found'
    //             });
    //         }            
    //     }
    // }).populate('category brand', 'name')
    // // .limit(perPage).skip(perPage*pageNumber)
    // .sort({name: sort});

    var perPage = 12, pageNumber = req.query.page;
    var keyword = req.query.keyword;
    var category = req.query.filterCategory;
    var brand = req.query.filterBrand;
    var sort = req.query.sort;
    var brandArray = [], categoryArray = [];
    brandArray.push(brand);
    categoryArray.push(category);
    // var formattedCategory = categoryArray[0].split(',');
    // var formattedBrand = brandArray[0].split(',');
    console.log(sort);
    console.log(pageNumber);
    Product.aggregate([
        { "$lookup": {
            from: "brands",
            localField: "brand",
            foreignField: "_id",
            as: "brand"
        }},
        { "$lookup": {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category"
        }},
        { "$unwind": "$brand"},
        { "$unwind": "$category"},
        { "$project": {
            "id": 1,
            "name": 1,
            "sku": 1,
            "product_image": 1,
            "description": 1,
            "category._id": 1,
            "category.name": 1,
            "brand.name": 1,
            "created_at": 1,
        }},
        { "$sort": {name: parseInt(sort)} },
        // { "$match": { "$or": [
        //         // { "name": keyword },
        //         {"brand.name": { "$in": formattedBrand }}, 
        //         {"category.name": { "$in": formattedCategory }} 
        //     ]
        // }}, 
        { "$skip": (parseInt(pageNumber) -1) * perPage },
        { "$limit": perPage },
        // { "$match": { "category._id": { $: /^5d6a1/i } } },
        // { "$group": {_id: "$category"}},
        // { "$count": "allDocumentCount"}
    ]).exec((err, result) => {
        if (err) {
            res.status(500).json({error: err});
        } else {
           if(result.length >= 1){
                res.status(200).json({
                    count: result.length,
                    product: result
                });
           } else {
                res.status(404).json({
                    message: 'No Entries found'
                });
            }  
        }
    });
}

exports.products_get_product = (req, res, next) => {
    Product.findById(req.params.productId, function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            if(result){
                res.status(200).json({
                    product: result,
                    request: {
                        type: 'GET',
                        description: 'Get all product',
                        url: "http://localhost:8080/products/"
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

exports.products_create_product = (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        sku: req.body.sku,
        description: req.body.description,
        product_image: "https://via.placeholder.com/150/24f355",
        category: req.body.categoryId,
        brand: req.body.brandId,
        created_at: new Date()
    });
    product.save((err,result) => {
        if(err){
            res.status(500).json({msg: 'Failed to add product', error: err});
        } else {
            res.status(201).json({
                message: "products added Successfully",
                createdData: result,
                request: {
                    type: 'GET',
                    url: "http://localhost:8080/products/" + result._id
                }
            });
        }
    });
}

exports.products_delete_product = (req, res, next) => {
    Product.remove({_id:req.params.productId}, function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            res.status(200).json({
                message: 'product deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:8080/products/'
                }
            });
        }
    });
}