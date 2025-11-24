const { body, validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    next();
};

const accessRequestValidation = {
    create: [
        body('user_email').isEmail().normalizeEmail(),
        body('user_name').notEmpty().trim().isLength({ min: 2 }),
        body('contact_number').notEmpty().trim(),
        body('purpose').notEmpty().trim().isLength({ min: 10 }),
        body('product_file_id').isMongoId(),
        validateRequest
    ]
};

const userValidation = {
    login: [
        body('email').isEmail().normalizeEmail(),
        body('password').notEmpty(),
        validateRequest
    ],
    changePassword: [
        body('currentPassword').notEmpty(),
        body('newPassword').isLength({ min: 6 }),
        validateRequest
    ]
};

const adminValidation = {
    createUser: [
        body('email').isEmail().normalizeEmail(),
        body('name').notEmpty().trim().isLength({ min: 2 }),
        body('product_file_id').isMongoId(),
        validateRequest
    ],
    uploadProductFile: [
        body('product_id').isMongoId(),
        body('country_id').isMongoId(),
        validateRequest
    ]
};

module.exports = {
    validateRequest,
    accessRequestValidation,
    userValidation,
    adminValidation
};