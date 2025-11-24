const express = require('express');
const router = express.Router();
const productFileController = require('../controllers/productFileController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Protected routes - users can access their permitted files
router.get('/secure-url/:id', authenticateToken, productFileController.getSecurePdfUrl);

module.exports = router;