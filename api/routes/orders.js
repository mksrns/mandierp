const express = require('express');
const router = express.Router();
const checkAdminAuth = require('../middleware/check-adminAuth');
const OrdersController = require('../controllers/orders');

router.get('/', checkAdminAuth, OrdersController.orders_get_all);

router.get('/:orderId', checkAdminAuth, OrdersController.orders_get_order);

router.post('/', checkAdminAuth, OrdersController.orders_create_order);

router.delete('/:orderId', checkAdminAuth, OrdersController.orders_delete_order);

module.exports = router;