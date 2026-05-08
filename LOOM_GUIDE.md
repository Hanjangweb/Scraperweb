# Loom Video Walkthrough Guide

## Video Structure (5-10 minutes)

### 1. Introduction (0:30-1:00)
- "Hi, this is my MERN stack Hacker News scraper application"
- "I'll walk you through the project architecture and key features"
- Show the GitHub repo (with meaningful commits)

### 2. Project Overview (1:00-2:00)
- Show README.md with project description
- List the technologies used
- Highlight key features:
  - Automated web scraping
  - User authentication with JWT
  - Bookmark functionality
  - Modern UI with Tailwind CSS
  - Responsive design

### 3. Backend Walkthrough (2:00-4:00)

**Show backend structure:**
```
cd backend
- Show server.js (entry point)
- Show models/ (User.js, Story.js)
- Show controllers/ (auth, stories)
- Show routes/ (auth, stories)
- Show utils/scraper.js
```

**Key points to mention:**
- "MongoDB connection with retry logic"
- "Password hashing with bcryptjs"
- "JWT-based authentication"
- "Cheerio for web scraping Hacker News"
- "Clean separation of concerns"

**Show .env example:**
- MongoDB URI
- JWT_SECRET
- CORS configuration

### 4. Frontend Walkthrough (4:00-6:00)

**Show frontend structure:**
```
cd frontend
- Show src/ folder structure
- Show pages/ (Home, Login, Register, Bookmarks)
- Show components/ (Navbar, StoryCard, Loading)
- Show context/AuthContext.jsx
- Show utils/api.js
```

**Key features to demonstrate:**
- React Router for navigation
- Context API for state management
- Tailwind CSS 4 styling
- API client with interceptors
- Protected routes

**Show some code:**
- AuthContext.jsx (state management)
- StoryCard.jsx (component example)
- Home.jsx (page with pagination)

### 5. Application Demo (6:00-8:00)

**Start both servers:**
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

**Show working features:**

1. **Home Page**
   - Show top 10 stories scraped from Hacker News
   - Show pagination (Next/Prev) working smoothly
   - Show manual refresh button triggering a new scrape
   - Point out the responsive, premium UI design

2. **Authentication**
   - Register a new user with validation
   - Login with the new account
   - Show JWT token handling (stored in localStorage)

3. **Bookmarks**
   - Toggle bookmark on a story (auth required)
   - Show the heart icon filling up
   - Navigate to "My Bookmarks" page
   - Show bookmarked stories persist across refreshes

**Mention Port Configuration:**
- "Backend runs on port 5001 as configured in .env"
- "Frontend connects to port 5001 via VITE_API_URL"

4. **UI Features**
   - Show responsive design on mobile view
   - Show loading states
   - Show error handling
   - Point out Tailwind CSS styling

### 6. Code Highlights (8:00-9:00)

**Show key code snippets in VS Code:**

1. **Authentication flow:**
   ```javascript
   - authController.js (register/login logic)
   - auth.js middleware (JWT verification)
   ```

2. **Scraper logic:**
   ```javascript
   - utils/scraper.js (Cheerio HTML parsing)
   - How it extracts story data
   ```

3. **Bookmark toggle:**
   ```javascript
   - StoryCard.jsx (bookmark button logic)
   - API client interceptors
   ```

### 7. Conclusion (9:00-10:00)
- Summarize key achievements
- "All assignment requirements met and exceeded"
- "Clean, scalable code structure"
- "Ready for production deployment"
- Thank you

## Recording Tips

### Before Recording
- [ ] Clean up desktop and close unnecessary windows
- [ ] Test microphone and audio levels
- [ ] Have both servers running and tested
- [ ] Prepare code examples in VS Code
- [ ] Have the application running and tested
- [ ] Create a checklist of points to cover

### During Recording
- [ ] Speak clearly and at a moderate pace
- [ ] Use clear navigation and highlighting
- [ ] Stop and repeat if you make mistakes
- [ ] Point at code sections you're discussing
- [ ] Use zoom in VS Code for readability (Ctrl/Cmd + +)
- [ ] Pause between major sections
- [ ] Make eye contact with camera

### Recording Commands
- Click Loom icon → Start recording
- Share screen (select window)
- Talk through your demo
- Stop recording when done
- Loom auto-saves and provides shareable link

## What to Highlight

### Technical Decisions
1. "I chose MongoDB for flexible document storage"
2. "JWT for stateless authentication"
3. "React Context API for simple state management"
4. "Tailwind CSS for modern, responsive UI"

### Problem-Solving
1. "Handled web scraping challenges with Cheerio"
2. "Implemented retry logic for database connection"
3. "Managed authentication state efficiently"
4. "Created reusable components for better scalability"

### Best Practices
1. "Separated concerns with MVC pattern"
2. "Used environment variables for configuration"
3. "Implemented proper error handling"
4. "Created meaningful git commits"

## Script Template

"Hi everyone! This is [Your Name] and I've completed the MERN stack Hacker News scraper assignment.

The application has three main parts: a Node.js backend that scrapes Hacker News using Cheerio, a MongoDB database storing the stories, and a React frontend with modern Tailwind styling.

Let me show you the project structure... [Show backend] The backend uses Express with controllers and models. Authentication uses JWT tokens. [Show frontend] The frontend uses React Router, Context API, and Tailwind CSS.

Now let me demonstrate the working application... [Show app running] Users can register, login, view stories with pagination, and bookmark their favorites.

The key technical implementations include... [Show code examples]

This project demonstrates full-stack development skills with clean code, proper separation of concerns, and production-ready architecture."

## Troubleshooting Common Recording Issues

| Issue | Solution |
|-------|----------|
| Audio too quiet | Adjust microphone levels in Loom settings |
| Screen too small | Use zoom feature in Loom |
| App crashes during demo | Pause and restart, cut from final video |
| Made a mistake | Stop recording, fix, start new segment |
| WiFi issues | Save locally and upload later |
| Recording lag | Close unnecessary applications |

## Post-Recording

1. Review the video
2. Edit if needed (trim intro/outro, cut mistakes)
3. Add title and description with key points
4. Copy shareable link
5. Add to GitHub README
6. Share for submission

## Example Video Link Format

Include in your submission like this:
```
Loom Video: https://www.loom.com/share/[video-id]
Duration: 7 minutes 45 seconds
Explains: Architecture, Implementation, Demo
```

## Talking Points Checklist

- [ ] Project overview and objectives
- [ ] Technology stack choices
- [ ] Backend architecture (MVC pattern)
- [ ] Authentication implementation
- [ ] Database schema design
- [ ] Frontend component structure
- [ ] State management approach
- [ ] Styling strategy (Tailwind CSS)
- [ ] Working application demo
- [ ] Problem-solving approach
- [ ] Code quality and best practices
- [ ] Scalability considerations

---

Good luck with your video! Keep it engaging, speak clearly, and demonstrate both your technical skills and your ability to explain complex concepts.
