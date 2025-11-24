# Product Access Management System - Backend

## 🚀 Vercel Deployment Instructions

### Prerequisites
- MongoDB Atlas account (free tier works)
- Cloudinary account (for PDF storage)
- Vercel account

### Step 1: Setup MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist all IPs (0.0.0.0/0) for Vercel
5. Get your connection string

### Step 2: Setup Cloudinary
1. Go to [Cloudinary](https://cloudinary.com)
2. Sign up for free account
3. Get your credentials from Dashboard:
   - Cloud Name
   - API Key
   - API Secret

### Step 3: Deploy to Vercel
1. Install Vercel CLI (optional):
   ```bash
   npm i -g vercel
   ```

2. Push code to GitHub

3. Go to [Vercel Dashboard](https://vercel.com)

4. Import your repository

5. Add Environment Variables in Vercel:
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - Random secure string (generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
   - `ADMIN_SECRET` - Random secure string for admin access
   - `CLOUDINARY_CLOUD_NAME` - From Cloudinary dashboard
   - `CLOUDINARY_API_KEY` - From Cloudinary dashboard
   - `CLOUDINARY_API_SECRET` - From Cloudinary dashboard
   - `FRONTEND_URL` - Your frontend Vercel URL (will get after frontend deployment)

6. Deploy!

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in values:
   ```bash
   cp .env.example .env
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Server runs on http://localhost:5000

## 📝 API Endpoints

### Public
- `POST /api/auth/login` - User login
- `POST /api/access-requests` - Submit access request
- `GET /api/products` - Get all products
- `GET /api/products/:id/countries` - Get countries for product

### User (Requires JWT Token)
- `POST /api/auth/change-password` - Change password
- `GET /api/users/permissions` - Get user permissions
- `GET /api/users/profile` - Get user profile
- `GET /api/product-files/secure-url/:id` - Get secure PDF URL

### Admin (Requires admin-token header)
- `POST /api/admin/users` - Create user & grant access
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:userId/permissions` - Get user permissions
- `POST /api/admin/product-files` - Upload PDF
- `GET /api/admin/product-files` - Get all product files
- `PUT /api/admin/product-files/:id` - Update product file
- `DELETE /api/admin/product-files/:id` - Delete product file
- `GET /api/access-requests/pending` - Get pending requests
- `PUT /api/access-requests/:id/approve` - Approve request
- `PUT /api/access-requests/:id/reject` - Reject request

## 🔒 Security Notes
- All passwords are hashed with bcryptjs
- JWT tokens expire in 24 hours
- PDFs stored securely on Cloudinary
- Admin access requires secret token
- CORS configured for frontend only

## 📦 Dependencies
- express - Web framework
- mongoose - MongoDB ODM
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- cloudinary - File storage
- multer - File upload handling
- cors - CORS middleware
- dotenv - Environment variables

## 🐛 Troubleshooting

### Database Connection Failed
- Check MongoDB Atlas IP whitelist
- Verify connection string format
- Ensure user has read/write permissions

### File Upload Failed
- Verify Cloudinary credentials
- Check file size (max 10MB)
- Ensure PDF format only

### CORS Error
- Add frontend URL to `FRONTEND_URL` env variable
- Check CORS configuration in server.js

## 📞 Support
For issues, check error logs in Vercel dashboard or MongoDB Atlas logs.
