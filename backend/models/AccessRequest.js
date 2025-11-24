const mongoose = require('mongoose');

const accessRequestSchema = new mongoose.Schema({
    user_email: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    contact_number: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    product_file_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductFile',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('AccessRequest', accessRequestSchema);