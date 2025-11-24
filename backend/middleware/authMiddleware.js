const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access token required'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Verify user still exists and is active
        const user = await User.findById(decoded.userId);
        if (!user || !user.is_active) {
            return res.status(403).json({
                success: false,
                message: 'User account not found or inactive'
            });
        }

        req.userId = decoded.userId;
        req.userEmail = decoded.email;
        next();
    } catch (err) {
        return res.status(403).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

exports.authenticateAdmin = async (req, res, next) => {
    const adminToken = req.headers['admin-token'];
    
    if (!adminToken || adminToken !== process.env.ADMIN_SECRET) {
        return res.status(403).json({
            success: false,
            message: 'Admin access required'
        });
    }
    
    // Set admin ID for tracking who granted permissions
    req.adminId = 'admin-system'; // You can modify this to use actual admin user ID
    
    next();
};