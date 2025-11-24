# Product Access Management System - Frontend

## 🚀 Vercel Deployment Instructions

### Prerequisites
- Node.js 18+ installed
- Backend deployed on Vercel (see backend README)
- Vercel account

### Step 1: Configure Environment Variables

1. Copy `.env.example` to `.env.local` for local development:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local`:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

3. For production, you'll add environment variable in Vercel Dashboard (Step 3)

### Step 2: Test Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:5173

4. Test with backend running on http://localhost:5000

### Step 3: Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. Push code to GitHub:
   ```bash
   git add .
   git commit -m "Frontend deployment ready"
   git push origin main
   ```

2. Go to [Vercel Dashboard](https://vercel.com)

3. Click "Import Project"

4. Select your GitHub repository

5. Configure project:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend` (if in monorepo) or `./` (if separate)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

6. Add Environment Variable:
   - **Key:** `VITE_API_BASE_URL`
   - **Value:** Your deployed backend URL (e.g., `https://your-backend.vercel.app`)

7. Click "Deploy" 🚀

#### Option B: Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Add environment variable:
   ```bash
   vercel env add VITE_API_BASE_URL
   ```
   Enter your backend URL when prompted

5. Redeploy with environment variable:
   ```bash
   vercel --prod
   ```

### Step 4: Update Backend CORS

After frontend deployment, update backend environment variable:

1. Go to your backend Vercel project
2. Add/Update environment variable:
   - **Key:** `FRONTEND_URL`
   - **Value:** Your frontend URL (e.g., `https://your-app.vercel.app`)
3. Redeploy backend

## 🔧 Configuration Details

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `https://api.yourapp.com` |

### Build Configuration

The project uses Vite with:
- React 19
- React Router v7
- Tailwind CSS v4
- Axios for API calls
- React Toastify for notifications
- React Icons

### Features

✅ **Authentication**
- User login with JWT tokens
- Admin login with secret token
- Password change functionality
- Token stored in localStorage
- Automatic token refresh on page reload

✅ **Cookie Support**
- `withCredentials: true` enabled in axios
- Supports cross-origin credentials
- Session management

✅ **Responsive Design**
- Mobile-first approach
- Tailwind CSS v4
- Modern UI components

✅ **Production Optimized**
- Code splitting
- Lazy loading
- Asset optimization
- Cache headers configured

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, fonts
│   ├── components/     # React components
│   │   ├── admin/     # Admin components
│   │   ├── auth/      # Auth components
│   │   ├── common/    # Shared components
│   │   └── products/  # Product components
│   ├── contexts/      # React contexts
│   ├── hooks/         # Custom hooks
│   ├── pages/         # Page components
│   ├── services/      # API services
│   │   └── api.js    # Axios instance
│   ├── utils/         # Utility functions
│   │   └── constants.js
│   ├── App.jsx        # Main app component
│   └── main.jsx       # Entry point
├── .env.example       # Environment template
├── .env.local         # Local environment (gitignored)
├── .gitignore
├── vercel.json        # Vercel configuration
├── vite.config.js     # Vite configuration
└── package.json
```

## 🔐 Authentication Flow

### User Login
1. User enters email/password
2. API returns JWT token
3. Token stored in localStorage
4. Token sent in Authorization header for all requests
5. On 401 error, user redirected to login

### Admin Login
1. Admin enters admin secret token
2. Token validated by backend
3. Token stored in localStorage as 'admin_token'
4. Token sent in 'admin-token' header for admin requests
5. On 403 error, admin redirected to admin login

## 🌐 API Integration

### API Service (`src/services/api.js`)

Axios instance with:
- Base URL from environment variable
- Automatic token injection
- Error handling with redirects
- Cookie/credential support

Example usage:
```javascript
import api from './services/api';

// GET request
const response = await api.get('/api/products');

// POST request
const response = await api.post('/api/auth/login', { email, password });

// Admin request (auto adds admin-token header)
const response = await api.get('/api/admin/users');
```

## 🐛 Troubleshooting

### CORS Errors
- Ensure `FRONTEND_URL` is set in backend environment variables
- Check that backend CORS allows your frontend origin
- Verify `withCredentials: true` is set in axios

### API Connection Failed
- Check `VITE_API_BASE_URL` is correct
- Ensure backend is deployed and running
- Test backend health endpoint directly

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist .vite
npm install
npm run build
```

### Environment Variables Not Working
- Variable names MUST start with `VITE_`
- Restart dev server after changing .env file
- In Vercel, redeploy after adding env variables

## 📊 Performance

- Initial load: ~150KB gzipped
- Code splitting: React vendor + UI vendor chunks
- Assets cached for 1 year
- Service worker ready (if needed)

## 🔄 Updates & Maintenance

### Update Dependencies
```bash
npm update
npm audit fix
```

### Check for Security Issues
```bash
npm audit
```

## 🚦 Testing

### Local Testing with Production Build
```bash
npm run build
npm run preview
```

### Test with Backend
1. Start backend: `cd ../backend && npm start`
2. Start frontend: `npm run dev`
3. Test all features:
   - User login/logout
   - Admin login
   - Product browsing
   - Access requests
   - PDF viewing

## 📱 Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS Safari 14+, Chrome Android

## 🎨 Customization

### Branding
- Update logo in `src/assets/`
- Modify colors in Tailwind config
- Update favicon in `public/`

### Features
- Add new routes in `src/App.jsx`
- Create new pages in `src/pages/`
- Add API endpoints in `src/services/`

## 📞 Support

### Common Issues

**Issue:** Infinite redirect loops
**Solution:** Clear localStorage and cookies, then login again

**Issue:** Token expired
**Solution:** Tokens expire after 24 hours. Login again.

**Issue:** Admin access denied
**Solution:** Verify admin token matches backend `ADMIN_SECRET`

## ⚡ Quick Commands

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Deploy to Vercel
vercel --prod
```

---

Made with ❤️ for Vercel deployment
