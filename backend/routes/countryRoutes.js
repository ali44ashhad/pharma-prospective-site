const express = require('express');
const router = express.Router();
const Country = require('../models/Country');

// Get all countries
router.get('/', async (req, res, next) => {
    try {
        const countries = await Country.find({ is_active: true })
            .sort({ name: 1 });
        
        res.json({
            success: true,
            data: countries
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
