const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const productFileController = require('../controllers/productFileController');
const adminProductFileCtrl = require('../controllers/adminProductFileController');

const { authenticateAdmin } = require('../middleware/authMiddleware');
const { uploadPDF, handleCloudinaryUpload } = require('../middleware/uploadMiddleware');

/* ---------------------------
   User Management (Admin)
   --------------------------- */
router.post('/users', authenticateAdmin, adminController.createUser);
router.get('/users', authenticateAdmin, adminController.getAllUsers);
router.get('/users/:userId/permissions', authenticateAdmin, adminController.getUserPermissions);
router.delete('/users/:userId', authenticateAdmin, adminController.deleteUser);

/* ---------------------------
   Product File Management (Admin)
   --------------------------- */

// Upload product file (PDF) - secured for admins
router.post('/product-files', 
    authenticateAdmin, 
    uploadPDF, 
    handleCloudinaryUpload, 
    adminProductFileCtrl.uploadProductFile
);

// Admin listing & management endpoints (all protected)
router.get('/product-files', authenticateAdmin, adminProductFileCtrl.getAllProductFiles);
router.get('/product-files/:id', authenticateAdmin, productFileController.getProductFileById);
router.put('/product-files/:id', authenticateAdmin, productFileController.updateProductFile);
router.delete('/product-files/:id', authenticateAdmin, productFileController.deleteProductFile);

module.exports = router;
