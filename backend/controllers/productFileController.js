const ProductFile = require('../models/ProductFile');
const Product = require('../models/Product');
const Country = require('../models/Country');
const { generateSecureUrl } = require('../utils/fileUpload');

exports.getAllProductFiles = async (req, res, next) => {
    try {
        const productFiles = await ProductFile.find({ is_active: true })
            .populate('product_id', 'name description')
            .populate('country_id', 'name code')
            .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            data: productFiles
        });
    } catch (error) {
        next(error);
    }
};

exports.getProductFileById = async (req, res, next) => {
    try {
        const productFileId = req.params.id;
        
        const productFile = await ProductFile.findById(productFileId)
            .populate('product_id', 'name description')
            .populate('country_id', 'name code');
        
        if (!productFile) {
            return res.status(404).json({
                success: false,
                message: 'Product file not found'
            });
        }
        
        res.json({
            success: true,
            data: productFile
        });
    } catch (error) {
        next(error);
    }
};

exports.getSecurePdfUrl = async (req, res, next) => {
    try {
        const productFileId = req.params.id;
        const userId = req.userId;
        
        // Check if user has permission to access this file
        const UserPermission = require('../models/UserPermission');
        const hasPermission = await UserPermission.findOne({
            user_id: userId,
            product_file_id: productFileId
        });
        
        if (!hasPermission) {
            return res.status(403).json({
                success: false,
                message: 'Access denied to this product file'
            });
        }
        
        const productFile = await ProductFile.findById(productFileId);
        if (!productFile) {
            return res.status(404).json({
                success: false,
                message: 'Product file not found'
            });
        }
        
        // Return the Cloudinary URL directly (already authenticated)
        res.json({
            success: true,
            data: {
                secure_url: productFile.cloudinary_url,
                file_name: productFile.file_name
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.updateProductFile = async (req, res, next) => {
    try {
        const productFileId = req.params.id;
        const { product_id, country_id, is_active } = req.body;
        
        const updateData = {};
        if (product_id) updateData.product_id = product_id;
        if (country_id) updateData.country_id = country_id;
        if (is_active !== undefined) updateData.is_active = is_active;
        
        const productFile = await ProductFile.findByIdAndUpdate(
            productFileId,
            updateData,
            { new: true }
        ).populate('product_id', 'name description')
         .populate('country_id', 'name code');
        
        if (!productFile) {
            return res.status(404).json({
                success: false,
                message: 'Product file not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Product file updated successfully',
            data: productFile
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteProductFile = async (req, res, next) => {
    try {
        const productFileId = req.params.id;
        
        const productFile = await ProductFile.findByIdAndUpdate(
            productFileId,
            { is_active: false },
            { new: true }
        );
        
        if (!productFile) {
            return res.status(404).json({
                success: false,
                message: 'Product file not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Product file deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};