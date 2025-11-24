const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        // Find user
        const user = await User.findOne({ email, is_active: true });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        
        // Check temp password first
        if (user.temp_password && user.temp_password === password) {
            const token = jwt.sign(
                { userId: user._id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );
            
            return res.json({
                success: true,
                message: 'Login successful - Please change your password',
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    requiresPasswordChange: true
                }
            });
        }
        
        // Check hashed password
        if (user.password_hash) {
            const isMatch = await bcrypt.compare(password, user.password_hash);
            if (isMatch) {
                const token = jwt.sign(
                    { userId: user._id, email: user.email },
                    process.env.JWT_SECRET,
                    { expiresIn: '24h' }
                );
                
                return res.json({
                    success: true,
                    message: 'Login successful',
                    token,
                    user: {
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        requiresPasswordChange: false
                    }
                });
            }
        }
        
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    } catch (error) {
        next(error);
    }
};

exports.changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.userId;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        let isCurrentPasswordValid = false;
        
        // Check temp password
        if (user.temp_password && user.temp_password === currentPassword) {
            isCurrentPasswordValid = true;
        } 
        // Check hashed password
        else if (user.password_hash) {
            isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
        }
        
        if (!isCurrentPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }
        
        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        // Update user
        user.password_hash = hashedPassword;
        user.temp_password = null;
        await user.save();
        
        res.json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error) {
        next(error);
    }
};