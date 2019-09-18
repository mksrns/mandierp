const express = require('express');
const router = express.Router();
const CategorysController = require('../controllers/categories');

//Fetch all category
router.get('/', CategorysController.categorys_get_all);

//Fetch Individual category
router.get('/:categoryId', CategorysController.categorys_get_category);

//Insert category
router.post('/', CategorysController.categorys_create_category);

//Update category
//router.patch('/:categoryId', CategorysController.categorys_update_category);

//Delete category
// router.delete('/:categoryId', CategorysController.categorys_delete_category);

module.exports = router;