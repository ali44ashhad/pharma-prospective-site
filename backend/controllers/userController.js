const UserPermission = require('../models/UserPermission');
const User = require('../models/User');

exports.getUserPermissions = async (req, res, next) => {
    try {
        const userId = req.userId;
        
        const permissions = await UserPermission.find({ user_id: userId })
            .populate({
                path: 'product_file_id',
                populate: [
                    { path: 'product_id', select: 'name description' },
                    { path: 'country_id', select: 'name code' }
                ]
            });
        
        res.json({
            success: true,
            data: permissions
        });
    } catch (error) {
        next(error);
    }
};

exports.getUserProfile = async (req, res, next) => {
    try {
        const userId = req.userId;
        
        const user = await User.findById(userId).select('-password_hash -temp_password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};