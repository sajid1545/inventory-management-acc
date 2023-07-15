const express = require('express');
const productController = require('../controllers/product.controller');

const router = express.Router();

router.route('/')
    .get(productController.getAllProducts)
    .post(productController.createProduct);

router.route('/bulk-update').patch(productController.bulkUpdateProducts);

module.exports = router;
