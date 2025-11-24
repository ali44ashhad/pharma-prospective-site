const mongoose = require('mongoose');

const productFileSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    country_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    },
    cloudinary_url: {
        type: String,
        required: true
    },
    file_name: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Compound index to ensure unique product-country combination
productFileSchema.index({ product_id: 1, country_id: 1 }, { unique: true });

module.exports = mongoose.model('ProductFile', productFileSchema);