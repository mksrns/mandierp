const express = require('express');
const router = express.Router();
const BijaksController = require('../controllers/bijaks');

//Fetch all bijak
router.get('/', BijaksController.bijaks_get_all);

//Fetch Individual bijak
router.get('/:bijakId', BijaksController.bijaks_get_bijak);

//Insert bijak
router.post('/', BijaksController.bijaks_create_bijak);

//Update bijak
//router.patch('/:bijakId', BijaksController.bijaks_update_bijak);

//Delete bijak
router.delete('/:bijakId', BijaksController.bijaks_delete_bijak);

module.exports = router;