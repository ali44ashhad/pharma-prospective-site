const User = require('../models/User');
const UserPermission = require('../models/UserPermission');
const AccessRequest = require('../models/AccessRequest');
const ProductFile = require('../models/ProductFile');
const { generateRandomPassword } = require('../utils/passwordGenerator');

exports.createUser = async (req, res, next) => {
    try {
        const { email, name, contact_number, product_file_id } = req.body;
        
        // Validate required fields
        if (!email || !name || !product_file_id) {
            return res.status(400).json({
                success: false,
                message: 'Email, name, and product file ID are required'
            });
        }

        // Check if user already exists
        let user = await User.findOne({ email: email.toLowerCase() });
        let isNewUser = false;
        
        if (user) {
            // User exists, check if permission already granted
            const existingPermission = await UserPermission.findOne({
                user_id: user._id,
                product_file_id
            });
            
            if (existingPermission) {
                return res.status(400).json({
                    success: false,
                    message: 'User already has access to this product'
                });
            }
        } else {
            // Create new user
            isNewUser = true;
            const tempPassword = generateRandomPassword(6);
            user = new User({
                email: email.toLowerCase(),
                name,
                contact_number,
                temp_password: tempPassword
            });
            await user.save();
        }
        
        // Grant permission
        const permission = new UserPermission({
            user_id: user._id,
            product_file_id,
            granted_by: req.adminId
        });
        await permission.save();

        // Update access request status if exists
        await AccessRequest.findOneAndUpdate(
            { 
                user_email: email.toLowerCase(), 
                product_file_id,
                status: 'pending'
            },
            { status: 'approved' }
        );
        
        const responseData = {
            success: true,
            message: isNewUser ? 'User created and access granted' : 'Access granted to existing user',
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                contact_number: user.contact_number
            }
        };
        
        // Include temp password only for newly created users
        if (isNewUser && user.temp_password) {
            responseData.temp_password = user.temp_password;
        }
        
        res.status(201).json(responseData);
    } catch (error) {
        next(error);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ is_active: true })
            .select('-password_hash -temp_password')
            .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        next(error);
    }
};

exports.getUserPermissions = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        
        const permissions = await UserPermission.find({ user_id: userId })
            .populate({
                path: 'product_file_id',
                populate: [
                    { path: 'product_id', select: 'name description' },
                    { path: 'country_id', select: 'name code' }
                ]
            })
            .populate('granted_by', 'name email');
        
        res.json({
            success: true,
            data: permissions
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        
        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        // Delete all user permissions
        await UserPermission.deleteMany({ user_id: userId });
        
        // Delete all access requests by this user
        await AccessRequest.deleteMany({ user_email: user.email });
        
        // Delete the user
        await User.findByIdAndDelete(userId);
        
        res.json({
            success: true,
            message: 'User and all associated data deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};