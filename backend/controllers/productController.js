const Product = require('../models/Product');
const ProductFile = require('../models/ProductFile');
const Country = require('../models/Country');

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find({ is_active: true });
        
        res.json({
            success: true,
            data: products
        });
    } catch (error) {
        next(error);
    }
};

exports.getProductCountries = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        
        const productFiles = await ProductFile.find({ 
            product_id: productId, 
            is_active: true 
        }).populate('country_id', 'name code');
        
        const countries = productFiles.map(pf => ({
            _id: pf.country_id._id,
            name: pf.country_id.name,
            code: pf.country_id.code,
            product_file_id: pf._id
        }));
        
        res.json({
            success: true,
            data: countries
        });
    } catch (error) {
        next(error);
    }
};

exports.getProductFile = async (req, res, next) => {
    try {
        const productFileId = req.params.productFileId;
        
        const productFile = await ProductFile.findById(productFileId)
            .populate('product_id', 'name')
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