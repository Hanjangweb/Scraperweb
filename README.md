# HackerNews Scraper - MERN Stack Application

A full-stack MERN application that scrapes top stories from Hacker News, displays them with a modern UI, and allows authenticated users to bookmark their favorite stories.

##  Features

- **Web Scraping**: Automatically scrapes top 10 stories from Hacker News on server start
- **User Authentication**: JWT-based authentication with secure login and registration
- **Story Management**: 
  - View all scraped stories sorted by points
  - Fetch individual story details
  - Pagination support
- **Bookmarking**: 
  - Authenticated users can bookmark/unbookmark stories
  - Dedicated bookmarks page with pagination
  - Persistent bookmark storage
- **Modern UI**: 
  - Built with React and Tailwind CSS 4
  - Responsive design for all devices
  - Dark mode support
  - Smooth animations and transitions
- **API Endpoints**: 
  - Trigger manual scraping via API
  - RESTful API design

##  Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Cheerio** - Web scraping
- **Axios** - HTTP client
- **BCryptjs** - Password hashing
- **CORS** - Cross-origin requests

### Frontend
- **React 19** - UI framework
- **React Router DOM** - Routing
- **Tailwind CSS 4** - Styling
- **Axios** - HTTP client
- **Lucide React** - Icons
- **Vite** - Build tool

##  Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (Atlas or local instance)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=30d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

4. Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend will start on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Stories
- `GET /api/stories` - Get all stories (with pagination)
  - Query params: `page=1&limit=10`
- `GET /api/stories/:id` - Get a single story
- `POST /api/scrape` - Trigger manual scraping
- `POST /api/stories/:id/bookmark` - Toggle bookmark (requires auth)
- `GET /api/stories/user/bookmarks` - Get user's bookmarks (requires auth)
  - Query params: `page=1&limit=10`

### Request/Response Examples

#### Register
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword",
  "confirmPassword": "securepassword"
}
```

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

Response:
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

#### Get Stories
```bash
GET /api/stories?page=1&limit=10
```

Response:
```json
{
  "success": true,
  "total": 100,
  "page": 1,
  "limit": 10,
  "stories": [
    {
      "_id": "story_id",
      "title": "Story Title",
      "url": "https://example.com",
      "points": 150,
      "author": "author_name",
      "postedAt": "2024-01-01T12:00:00Z",
      "bookmarkedBy": []
    }
  ]
}
```

##  Project Structure

```
mini-application/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Auth logic
│   │   └── storiesController.js  # Stories logic
│   ├── middleware/
│   │   ├── auth.js               # JWT middleware
│   │   └── errorHandler.js       # Error handling
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Story.js              # Story schema
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   └── stories.js            # Stories routes
│   ├── utils/
│   │   ├── scraper.js            # Hacker News scraper
│   │   └── jwt.js                # JWT token generation
│   ├── server.js                 # Express app setup
│   ├── .env                      # Environment variables
│   ├── .env.example              # Example env file
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation bar
│   │   │   ├── StoryCard.jsx     # Story card component
│   │   │   ├── Loading.jsx       # Loading spinner
│   │   │   └── ProtectedRoute.jsx# Route protection
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Auth state management
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Home page with stories
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Register.jsx      # Register page
│   │   │   └── Bookmarks.jsx     # Bookmarks page
│   │   ├── utils/
│   │   │   └── api.js            # API client
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # Entry point
│   │   └── index.css             # Global styles
│   ├── .env                      # Environment variables
│   ├── .env.example              # Example env file
│   ├── tailwind.config.js        # Tailwind configuration
│   ├── postcss.config.js         # PostCSS configuration
│   ├── vite.config.js            # Vite configuration
│   └── package.json
│
└── README.md                     # This file
```

##  Authentication Flow

1. User registers/logs in with email and password
2. Backend validates credentials and generates JWT token
3. Frontend stores token in localStorage
4. Token is sent with each request in Authorization header
5. Backend verifies token before allowing protected operations

##  Features in Detail

### Scraping
- Runs automatically on server start
- Extracts title, URL, points, author, and posted time
- Can be manually triggered via `/api/scrape` endpoint
- Stores unique stories in MongoDB

### User Bookmarks
- Click heart icon on story card to bookmark
- Bookmarks are persisted in database
- Dedicated bookmarks page shows all saved stories
- Only authenticated users can bookmark

### Pagination
- All list endpoints support pagination
- Default: 10 items per page
- Customizable via `limit` query parameter
- Page numbering starts at 1

##  Development

### Running Both Servers
In two separate terminal windows:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Building for Production

Backend:
```bash
cd backend
npm start
```

Frontend:
```bash
cd frontend
npm run build
npm run preview
```

##  Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB connection string in `.env`
- Check if MongoDB service is running
- Ensure IP whitelist includes your IP in MongoDB Atlas

### CORS Errors
- Check `FRONTEND_URL` in backend `.env` matches your frontend URL
- Verify CORS middleware is correctly configured

### API 404 Errors
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env`
- Verify all routes are correctly defined

### Scraping Issues
- Check internet connection
- Hacker News website structure may have changed
- Verify Cheerio selectors are up to date

##  Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [JWT Introduction](https://jwt.io/introduction)

##  License

This project is open source and available under the MIT License.

##  Contributing

Contributions are welcome! Feel free to submit pull requests or open issues for bugs and feature requests.

---

