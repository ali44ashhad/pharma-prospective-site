const cloudinary = require('../config/cloudinary');
const stream = require('stream');

exports.uploadToCloudinary = (fileBuffer, fileName) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'raw',
                public_id: `products/${fileName.replace(/\.[^/.]+$/, "")}`,
                format: 'pdf',
                type: 'authenticated' // Makes the file private
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        // Create a buffer stream and pipe to Cloudinary
        const bufferStream = new stream.PassThrough();
        bufferStream.end(fileBuffer);
        bufferStream.pipe(uploadStream);
    });
};

exports.generateSecureUrl = (publicId) => {
    return cloudinary.url(publicId, {
        secure: true,
        resource_type: 'raw',
        type: 'authenticated',
        sign_url: true,
        expires_at: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour expiry
    });
};

exports.deleteFromCloudinary = (publicId) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, 
            { resource_type: 'raw' },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
    });
};