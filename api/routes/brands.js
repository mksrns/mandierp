const express = require('express');
const router = express.Router();
const BrandsController = require('../controllers/brands');

//Fetch all brand
router.get('/', BrandsController.brands_get_all);

//Fetch Individual brand
router.get('/:brandId', BrandsController.brands_get_brand);

//Insert brand
router.post('/', BrandsController.brands_create_brand);

//Update brand
//router.patch('/:brandId', BrandsController.brands_update_brand);

//Delete brand
router.delete('/:brandId', BrandsController.brands_delete_brand);

module.exports = router;