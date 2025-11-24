const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:productId/countries', productController.getProductCountries);
router.get('/files/:productFileId', productController.getProductFile);

module.exports = router;