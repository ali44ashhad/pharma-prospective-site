const express = require('express');
const router = express.Router();
const accessRequestController = require('../controllers/accessRequestController');
const { authenticateAdmin } = require('../middleware/authMiddleware');

// Public route
router.post('/', accessRequestController.createAccessRequest);

// Admin routes
router.get('/pending', authenticateAdmin, accessRequestController.getPendingRequests);
router.put('/:requestId/approve', authenticateAdmin, accessRequestController.approveRequest);
router.put('/:requestId/reject', authenticateAdmin, accessRequestController.rejectRequest);

module.exports = router;