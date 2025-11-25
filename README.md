# Product Access Management System

Full-stack application for managing product access with user authentication, admin panel, and PDF file management.

## 🏗️ Architecture

```
prospective/
├── backend/          # Node.js + Express + MongoDB
└── frontend/         # React + Vite + Tailwind CSS
```

## 🚀 Quick Start

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Fill in .env with your credentials
npm run dev
```

Backend runs on: http://localhost:5000

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
# Update VITE_API_BASE_URL if needed
npm run dev
```

Frontend runs on: http://localhost:5173

## 📚 Documentation

- [Backend Documentation](./backend/README.md) - API endpoints, deployment guide
- [Frontend Documentation](./frontend/README.md) - React app setup, Vercel deployment

## 🔑 Features

### User Features
- ✅ Login with email/password
- ✅ Change password
- ✅ View assigned products
- ✅ Request access to new products
- ✅ Secure PDF viewing

### Admin Features
- ✅ Admin dashboard
- ✅ Create users & grant access
- ✅ Upload product PDFs to Cloudinary
- ✅ Manage product files
- ✅ Approve/reject access requests
- ✅ View all users & permissions

## 🛠️ Tech Stack

### Backend
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT + bcryptjs
- **File Storage:** Cloudinary
- **File Upload:** Multer

### Frontend
- **Framework:** React 19
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v4
- **HTTP Client:** Axios
- **Build Tool:** Vite
- **Notifications:** React Toastify

## 🌐 Deployment

Both backend and frontend are configured for **Vercel deployment**.

### 1. Deploy Backend First
```bash
cd backend
# See backend/README.md for detailed steps
vercel --prod
```

Get your backend URL (e.g., `https://your-backend.vercel.app`)

### 2. Deploy Frontend
```bash
cd frontend
# Add backend URL as environment variable in Vercel
# See frontend/README.md for detailed steps
vercel --prod
```

### 3. Update Backend CORS
Add your frontend URL to backend's `FRONTEND_URL` environment variable in Vercel.

## 🔐 Environment Variables

### Backend (.env)
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_SECRET=your_admin_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
FRONTEND_URL=your_frontend_url
```

### Frontend (.env.local)
```env
VITE_API_BASE_URL=http://localhost:5000
```

## 📖 API Overview

### Public Endpoints
- `POST /api/auth/login` - User login
- `POST /api/access-requests` - Submit access request
- `GET /api/products` - List products

### User Endpoints (JWT Required)
- `POST /api/auth/change-password` - Change password
- `GET /api/users/permissions` - Get user permissions
- `GET /api/product-files/secure-url/:id` - Get secure PDF URL

### Admin Endpoints (Admin Token Required)
- `POST /api/admin/users` - Create user
- `POST /api/admin/product-files` - Upload PDF
- `GET /api/admin/users` - List all users
- `GET /api/access-requests/pending` - Pending requests
- `PUT /api/access-requests/:id/approve` - Approve request

## 🧪 Testing

### Test Backend
```bash
cd backend
npm start

# Test health endpoint
curl http://localhost:5000
```

### Test Frontend
```bash
cd frontend
npm run dev

# Open http://localhost:5173
```

### Test Full Flow
1. Start both backend and frontend
2. Go to http://localhost:5173
3. Try user login (if you have seeded data)
4. Try admin login with admin secret
5. Test product browsing and access requests

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is private and proprietary.

## 📞 Support

For issues or questions:
1. Check backend/README.md for backend issues
2. Check frontend/README.md for frontend issues
3. Review error logs in Vercel dashboard

---

## 🎯 Production Checklist

Before deploying to production:

- [ ] MongoDB Atlas cluster created
- [ ] Cloudinary account setup
- [ ] Strong JWT_SECRET generated
- [ ] Strong ADMIN_SECRET generated
- [ ] Backend deployed to Vercel
- [ ] Frontend deployed to Vercel
- [ ] CORS configured with frontend URL
- [ ] Environment variables set in Vercel
- [ ] Database indexes created
- [ ] Test all authentication flows
- [ ] Test file uploads
- [ ] Test PDF viewing
- [ ] Mobile responsive check

---

Made with ❤️ by **FNA Marketing Solution**  
🔗 https://www.fnamarketingsolutions.com/

