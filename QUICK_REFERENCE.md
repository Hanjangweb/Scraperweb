# Quick Reference Guide

## Starting the Application

### Terminal 1 - Backend
```bash
cd backend
npm start
# Runs on http://localhost:5000
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
# Opens http://localhost:5173
```

## Environment Variables Setup

### Backend .env
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key
JWT_EXPIRE=30d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend .env
```env
VITE_API_URL=http://localhost:5000/api
```

## Key API Endpoints

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | /auth/register | ✗ | Create account |
| POST | /auth/login | ✗ | Login user |
| GET | /stories | ✗ | Get all stories |
| GET | /stories/:id | ✗ | Get single story |
| POST | /scrape | ✗ | Trigger scraping |
| POST | /stories/:id/bookmark | ✓ | Bookmark story |
| GET | /stories/user/bookmarks | ✓ | Get bookmarks |

## Frontend Routes

| Route | Authentication | Purpose |
|-------|-----------------|---------|
| / | ✗ | Home - Stories list |
| /login | ✗ | Login page |
| /register | ✗ | Register page |
| /bookmarks | ✓ | User bookmarks |

## Project Files Location

| What | Where |
|------|-------|
| Backend server | backend/server.js |
| Database models | backend/models/ |
| API routes | backend/routes/ |
| Business logic | backend/controllers/ |
| Web scraper | backend/utils/scraper.js |
| Frontend app | frontend/src/App.jsx |
| Pages | frontend/src/pages/ |
| Components | frontend/src/components/ |
| State management | frontend/src/context/AuthContext.jsx |
| API client | frontend/src/utils/api.js |

## Common Tasks

### Add a new API endpoint
1. Create route in `backend/routes/`
2. Create controller in `backend/controllers/`
3. Add model if needed in `backend/models/`
4. Test with Postman/cURL

### Add a new React component
1. Create file in `frontend/src/components/`
2. Import in parent component
3. Use in JSX
4. Style with Tailwind classes

### Debug Issues

**Backend not connecting to MongoDB:**
- Check MONGO_URI in .env
- Ensure MongoDB is running
- Check IP whitelist in MongoDB Atlas

**Frontend shows API errors:**
- Check browser console for error messages
- Verify VITE_API_URL in .env
- Ensure backend is running
- Check backend logs

**Styling not working:**
- Ensure Tailwind classes are correct
- Run `npm run build` to compile
- Check if Tailwind config includes the right paths

## Useful Commands

### Backend
```bash
npm start              # Run production
npm run dev           # Run with auto-reload
npm install           # Install dependencies
```

### Frontend
```bash
npm run dev           # Start dev server
npm run build         # Build for production
npm run preview       # Preview build locally
npm install --legacy-peer-deps  # Install dependencies
```

### Database
```bash
# Connect to MongoDB in terminal
mongosh "your_connection_string"

# View collections
show collections

# View stories
db.stories.find().pretty()

# View users
db.users.find().pretty()
```

## Testing Endpoints with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"pass123","confirmPassword":"pass123"}'
```

### Login (get token)
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123"}'
```

### Get Stories
```bash
curl http://localhost:5000/api/stories
```

### Bookmark (replace TOKEN and ID)
```bash
curl -X POST http://localhost:5000/api/stories/STORY_ID/bookmark \
  -H "Authorization: Bearer TOKEN"
```

## File Structure Explained

### Backend
- **server.js**: Express app initialization, routes setup
- **config/db.js**: MongoDB connection logic
- **models/**: Database schemas (User, Story)
- **routes/**: Express route handlers
- **controllers/**: Business logic functions
- **middleware/**: Auth, error handling
- **utils/**: Helper functions (scraper, JWT)

### Frontend
- **App.jsx**: Main component with routing
- **main.jsx**: React app entry point
- **context/**: React Context for state management
- **pages/**: Full page components
- **components/**: Reusable UI components
- **utils/**: API client and helpers
- **index.css**: Global Tailwind styles

## Performance Tips

1. Use pagination (`?page=1&limit=10`) for large datasets
2. Minimize API calls by caching when possible
3. Lazy load components in production
4. Use MongoDB indexes for frequently queried fields
5. Monitor database query performance

## Production Checklist

- [ ] Environment variables set correctly
- [ ] MongoDB URI points to production database
- [ ] JWT_SECRET is strong and unique
- [ ] FRONTEND_URL updated to production domain
- [ ] VITE_API_URL points to production backend
- [ ] Database backups configured
- [ ] Error logging enabled
- [ ] Performance monitoring set up
- [ ] Security headers configured
- [ ] HTTPS enabled

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 5000 in use | Change PORT in .env or kill process |
| npm install fails | Use `npm install --legacy-peer-deps` |
| Build fails | Clear node_modules and .vite, reinstall |
| MongoDB connection error | Check URI, IP whitelist, credentials |
| CORS error | Update FRONTEND_URL in backend .env |
| Tailwind not working | Rebuild with `npm run build` |
| Token expired | Log out and log back in |
| Stories not showing | Check MongoDB connection, run scraper |

## Git Workflow

```bash
# Initial setup
git init
git add .
git commit -m "Initial commit: MERN stack setup"

# For each feature
git checkout -b feature/feature-name
# Make changes
git add .
git commit -m "feat: add new feature"
git push origin feature/feature-name

# Merge to main
git checkout main
git merge feature/feature-name
git push origin main
```

## Resources

- [Express Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [React Docs](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [JWT](https://jwt.io/)

## Support

1. Check README.md for general info
2. Check SETUP_GUIDE.md for setup help
3. Check API.md for endpoint documentation
4. Check TESTING.md for testing procedures
5. Check console/terminal logs for errors

---

Last Updated: May 2026
