const ProductFile = require('../models/ProductFile');
const Product = require('../models/Product');
const Country = require('../models/Country');

exports.uploadProductFile = async (req, res, next) => {
    try {
        const { product_id, country_id } = req.body;
        
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'PDF file is required'
            });
        }

        if (!product_id || !country_id) {
            return res.status(400).json({
                success: false,
                message: 'Product ID and Country ID are required'
            });
        }

        // Check if product file already exists
        const existingFile = await ProductFile.findOne({
            product_id,
            country_id,
            is_active: true
        });

        if (existingFile) {
            return res.status(400).json({
                success: false,
                message: 'Product file for this country already exists'
            });
        }

        // Use Cloudinary result from middleware
        if (!req.cloudinaryResult) {
            return res.status(500).json({
                success: false,
                message: 'File upload failed'
            });
        }

        const productFile = new ProductFile({
            product_id,
            country_id,
            cloudinary_url: req.cloudinaryResult.secure_url,
            file_name: req.file.originalname
        });

        await productFile.save();

        res.status(201).json({
            success: true,
            message: 'Product file uploaded successfully',
            data: productFile
        });
    } catch (error) {
        next(error);
    }
};

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