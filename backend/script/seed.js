const mongoose = require('mongoose');
const Product = require('../models/Product');
const Country = require('../models/Country');
const ProductFile = require('../models/ProductFile');
const User = require('../models/User');
require('dotenv').config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await Product.deleteMany({});
        await Country.deleteMany({});
        await ProductFile.deleteMany({});
        await User.deleteMany({});

        console.log('Cleared existing data');

        // Insert products
        const products = await Product.insertMany([
            { name: 'report', description: 'Detailed reports for various countries' },
            { name: 'analysis', description: 'In-depth analysis reports' },
            { name: 'testing', description: 'Testing methodologies and results' },
            { name: 'price_benchmark', description: 'Price benchmarking data' },
            { name: 'insights', description: 'Market insights and trends' }
        ]);

        console.log('Products inserted:', products.length);

        // Insert countries
        const countries = await Country.insertMany([
            { name: 'India', code: 'IN' },
            { name: 'United Arab Emirates', code: 'UAE' },
            { name: 'United States', code: 'US' },
            { name: 'United Kingdom', code: 'UK' },
            { name: 'Singapore', code: 'SG' },
            { name: 'Australia', code: 'AU' },
            { name: 'Canada', code: 'CA' },
            { name: 'Germany', code: 'DE' }
        ]);

        console.log('Countries inserted:', countries.length);

        // Create sample product files
        const productFiles = [];
        for (const product of products) {
            for (const country of countries.slice(0, 3)) { // Link each product to 3 countries
                productFiles.push({
                    product_id: product._id,
                    country_id: country._id,
                    cloudinary_url: `https://res.cloudinary.com/your-cloud/raw/upload/sample_${product.name}_${country.code}.pdf`,
                    file_name: `${product.name}_${country.code}.pdf`
                });
            }
        }

        await ProductFile.insertMany(productFiles);
        console.log('Product files inserted:', productFiles.length);

        // Create admin user
        const adminUser = new User({
            email: 'admin@example.com',
            name: 'System Admin',
            contact_number: '+911234567890',
            is_active: true
        });
        await adminUser.save();
        console.log('Admin user created');

        console.log('Database seeded successfully!');
        console.log('\nSample Data Created:');
        console.log('- Products:', products.length);
        console.log('- Countries:', countries.length);
        console.log('- Product Files:', productFiles.length);
        console.log('- Admin User: 1');
        
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedData();