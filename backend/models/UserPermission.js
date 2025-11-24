const mongoose = require('mongoose');

const userPermissionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product_file_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductFile',
        required: true
    },
    granted_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Compound index to ensure unique user-file permission
userPermissionSchema.index({ user_id: 1, product_file_id: 1 }, { unique: true });

module.exports = mongoose.model('UserPermission', userPermissionSchema);