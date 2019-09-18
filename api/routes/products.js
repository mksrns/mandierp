const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/products');

//Fetch all product
router.get('/', ProductsController.products_get_all);

//Fetch Individual product
router.get('/:productId', ProductsController.products_get_product);

//Insert product
router.post('/', ProductsController.products_create_product);

//Update product
//router.patch('/:productId', ProductsController.products_update_product);

//Delete product
router.delete('/:productId', ProductsController.products_delete_product);

module.exports = router;