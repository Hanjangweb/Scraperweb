# API Reference

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer {token}
```

## Error Responses

All endpoints may return error responses:

```json
{
  "error": "Error message describing what went wrong"
}
```

Common HTTP Status Codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Server Error

---

## Authentication Endpoints

### POST /auth/register

Register a new user account.

**Request Body:**
```json
{
  "username": "string (3+ characters, unique)",
  "email": "string (valid email, unique)",
  "password": "string (6+ characters)",
  "confirmPassword": "string (must match password)"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

**Error Response (400):**
```json
{
  "error": "User already exists"
}
```

---

### POST /auth/login

Authenticate user with email and password.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

**Error Response (401):**
```json
{
  "error": "Invalid credentials"
}
```

---

## Stories Endpoints

### GET /stories

Fetch all stories with optional pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)

**Request:**
```
GET /stories?page=1&limit=10
```

**Success Response (200):**
```json
{
  "success": true,
  "total": 150,
  "page": 1,
  "limit": 10,
  "stories": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Amazing Tech Story",
      "url": "https://example.com/article",
      "points": 500,
      "author": "technews",
      "postedAt": "2024-01-15T10:30:00Z",
      "hackerNewsId": "36111234",
      "bookmarkedBy": [],
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
    ...
  ]
}
```

---

### GET /stories/:id

Fetch a single story by ID.

**Request:**
```
GET /stories/507f1f77bcf86cd799439011
```

**Success Response (200):**
```json
{
  "success": true,
  "story": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Amazing Tech Story",
    "url": "https://example.com/article",
    "points": 500,
    "author": "technews",
    "postedAt": "2024-01-15T10:30:00Z",
    "hackerNewsId": "36111234",
    "bookmarkedBy": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "username": "user1",
        "email": "user1@example.com"
      }
    ],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Error Response (404):**
```json
{
  "error": "Story not found"
}
```

---

### POST /scrape

Trigger manual scraping of Hacker News (no authentication required).

**Request:**
```
POST /scrape
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Scraping completed successfully",
  "count": 10,
  "stories": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Story Title",
      "url": "https://...",
      "points": 123,
      "author": "author_name",
      "postedAt": "2024-01-15T10:30:00Z",
      "hackerNewsId": "36111234"
    },
    ...
  ]
}
```

**Error Response (500):**
```json
{
  "success": false,
  "error": "Failed to scrape stories"
}
```

---

### POST /stories/:id/bookmark

Toggle bookmark for a story (Authentication Required).

**Request:**
```
POST /stories/507f1f77bcf86cd799439011/bookmark
Authorization: Bearer {token}
```

**Success Response - Bookmarked (200):**
```json
{
  "success": true,
  "message": "Bookmark added",
  "bookmarked": true
}
```

**Success Response - Unbookmarked (200):**
```json
{
  "success": true,
  "message": "Bookmark removed",
  "bookmarked": false
}
```

**Error Response - Not Found (404):**
```json
{
  "error": "Story not found"
}
```

**Error Response - Unauthorized (401):**
```json
{
  "error": "Not authorized to access this route"
}
```

---

### GET /stories/user/bookmarks

Get all bookmarked stories for the current user (Authentication Required).

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Request:**
```
GET /stories/user/bookmarks?page=1&limit=10
Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "total": 5,
  "page": 1,
  "limit": 10,
  "bookmarks": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "My Favorite Story",
      "url": "https://example.com/article",
      "points": 500,
      "author": "author_name",
      "postedAt": "2024-01-15T10:30:00Z",
      "bookmarkedBy": ["507f1f77bcf86cd799439012"],
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
    ...
  ]
}
```

**Error Response - Unauthorized (401):**
```json
{
  "error": "Not authorized to access this route"
}
```

---

## Health Check

### GET /health

Check if the server is running.

**Request:**
```
GET /health
```

**Success Response (200):**
```json
{
  "message": "Server is running"
}
```

---

## Data Models

### User Schema
```javascript
{
  _id: ObjectId,
  username: String (unique, minlength: 3),
  email: String (unique, valid email),
  password: String (hashed, minlength: 6),
  createdAt: Date,
  updatedAt: Date
}
```

### Story Schema
```javascript
{
  _id: ObjectId,
  title: String (required),
  url: String (required),
  points: Number (default: 0),
  author: String (required),
  postedAt: Date (default: now),
  hackerNewsId: String (unique, sparse),
  bookmarkedBy: [ObjectId] (references User),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Rate Limiting

Currently no rate limiting is implemented. For production, consider adding:
- 100 requests per 15 minutes for authentication endpoints
- 1000 requests per 15 minutes for public endpoints
- 500 requests per 15 minutes for authenticated endpoints

---

## Authentication Token Format

JWT tokens include the user ID in the payload:

```json
{
  "id": "507f1f77bcf86cd799439011",
  "iat": 1705316400,
  "exp": 1737852400
}
```

Default expiration: 30 days

---

## Pagination Details

- Minimum page: 1
- Maximum page: calculated from total/limit
- Default limit: 10
- Maximum limit: 100 (recommend lowering in production)

Results are sorted by:
- Stories: points (descending)
- Bookmarks: createdAt (descending)

---

## Common Errors

### 400 Bad Request
- Missing required fields
- Invalid field format
- Duplicate values for unique fields
- Password mismatch

### 401 Unauthorized
- Missing token
- Invalid token
- Token expired
- Token format incorrect

### 404 Not Found
- Resource doesn't exist
- Invalid ObjectId format

### 500 Server Error
- Database connection error
- Unexpected server error
- External API error (scraping)

Check response body for detailed error message.

---

## CORS Headers

Allowed origins: Value of `FRONTEND_URL` environment variable

Allowed methods: GET, POST, OPTIONS, PUT, DELETE

Allowed headers: Content-Type, Authorization

---

## Example: Complete Authentication Flow

```javascript
// 1. Register
fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'john_doe',
    email: 'john@example.com',
    password: 'secure123',
    confirmPassword: 'secure123'
  })
}).then(r => r.json()).then(data => {
  localStorage.setItem('token', data.token);
});

// 2. Get Stories
fetch('http://localhost:5000/api/stories?page=1&limit=10', {
  headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
}).then(r => r.json());

// 3. Bookmark Story
fetch('http://localhost:5000/api/stories/{id}/bookmark', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
}).then(r => r.json());

// 4. Get Bookmarks
fetch('http://localhost:5000/api/stories/user/bookmarks', {
  headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
}).then(r => r.json());
```

---

For issues or questions, please check the README.md or SETUP_GUIDE.md files.
