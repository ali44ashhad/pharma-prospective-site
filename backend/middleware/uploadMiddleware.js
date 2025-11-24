const multer = require('multer');
const { uploadToCloudinary } = require('../utils/fileUpload');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed'), false);
        }
    }
});

const uploadPDF = upload.single('pdfFile');

const handleCloudinaryUpload = async (req, res, next) => {
    try {
        if (!req.file) {
            return next();
        }

        req.cloudinaryResult = await uploadToCloudinary(
            req.file.buffer,
            req.file.originalname
        );
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadPDF,
    handleCloudinaryUpload
};