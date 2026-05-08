# MERN Stack Setup Guide

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://your_mongodb_url
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Start backend:
```bash
npm start
# or
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install --legacy-peer-deps
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm run dev
```

## Project Architecture

### Backend Structure
- **Models**: User, Story
- **Controllers**: Auth, Stories
- **Routes**: /api/auth, /api/stories
- **Middleware**: JWT authentication, Error handling
- **Utils**: Scraper, JWT token generation
- **Database**: MongoDB with Mongoose

### Frontend Structure
- **Pages**: Home, Login, Register, Bookmarks
- **Components**: Navbar, StoryCard, Loading, ProtectedRoute
- **Context**: AuthContext for state management
- **Utils**: API client with Axios
- **Styling**: Tailwind CSS 4

## Key Features Implemented

✅ Web Scraping (Cheerio)
✅ JWT Authentication
✅ User Registration & Login
✅ MongoDB Database
✅ Story Management with Pagination
✅ Bookmark Functionality
✅ React Context API State Management
✅ Responsive Design with Tailwind CSS
✅ Error Handling & Validation
✅ Auto-scraping on Server Start
✅ Manual Scraping via API

## Testing the APIs

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get All Stories
```bash
curl http://localhost:5000/api/stories
```

### Get Stories with Pagination
```bash
curl http://localhost:5000/api/stories?page=1&limit=10
```

### Trigger Manual Scrape
```bash
curl -X POST http://localhost:5000/api/scrape
```

### Toggle Bookmark (Requires Auth Token)
```bash
curl -X POST http://localhost:5000/api/stories/{storyId}/bookmark \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json"
```

### Get User Bookmarks (Requires Auth Token)
```bash
curl http://localhost:5000/api/stories/user/bookmarks \
  -H "Authorization: Bearer {token}"
```

## Environment Variables

### Backend (.env)
- `PORT`: Server port (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing
- `JWT_EXPIRE`: Token expiration time
- `NODE_ENV`: Environment (development/production)
- `FRONTEND_URL`: Frontend URL for CORS

### Frontend (.env)
- `VITE_API_URL`: Backend API URL

## Troubleshooting

### Cannot connect to MongoDB
- Check MongoDB URI in .env
- Ensure MongoDB is running
- Check IP whitelist in MongoDB Atlas

### CORS Errors
- Update FRONTEND_URL in backend .env
- Ensure it matches your frontend URL

### Scraping Fails
- Check internet connection
- Website structure might have changed
- Check browser console for details

### Port Already in Use
- Change PORT in .env
- Or kill the process using the port

## Performance Tips

1. Use pagination to limit data fetches
2. Implement caching for stories
3. Optimize MongoDB queries with proper indexing
4. Use lazy loading for components
5. Minimize API calls with proper state management

## Security Considerations

1. Always hash passwords (done with bcryptjs)
2. Validate input on both frontend and backend
3. Use JWT tokens with expiration
4. Implement rate limiting for APIs
5. Sanitize database queries
6. Use HTTPS in production

## Deployment Tips

1. Build frontend: `npm run build`
2. Deploy frontend to Vercel/Netlify
3. Deploy backend to Render/Railway
4. Update FRONTEND_URL and VITE_API_URL
5. Use production MongoDB URI
6. Set NODE_ENV=production
7. Use strong JWT_SECRET in production

## Additional Resources

- MongoDB: https://www.mongodb.com/
- Express: https://expressjs.com/
- React: https://react.dev/
- Tailwind CSS: https://tailwindcss.com/
- JWT: https://jwt.io/
