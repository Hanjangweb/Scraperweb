# Testing Guide

## Backend API Testing

### Tools Needed
- Postman or Insomnia (GUI)
- cURL (Command line)
- Thunder Client (VS Code extension)

### Authentication Flow Test

**1. Register User**
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

Expected Response:
```json
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

**2. Login User**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Stories API Tests

**1. Get All Stories**
```bash
curl http://localhost:5000/api/stories
```

**2. Get Stories with Pagination**
```bash
curl "http://localhost:5000/api/stories?page=1&limit=5"
```

**3. Get Single Story**
```bash
curl http://localhost:5000/api/stories/{storyId}
```

**4. Trigger Manual Scrape**
```bash
curl -X POST http://localhost:5000/api/scrape
```

### Bookmark Tests (Requires Authentication)

**1. Toggle Bookmark**
```bash
curl -X POST http://localhost:5000/api/stories/{storyId}/bookmark \
  -H "Authorization: Bearer {your_token}" \
  -H "Content-Type: application/json"
```

**2. Get User Bookmarks**
```bash
curl http://localhost:5000/api/stories/user/bookmarks \
  -H "Authorization: Bearer {your_token}"
```

## Frontend Testing

### Manual Testing Checklist

- [ ] **Home Page:**
  - [ ] Stories display correctly
  - [ ] Pagination works
  - [ ] Refresh button works
  - [ ] No console errors

- [ ] **Authentication:**
  - [ ] Register page loads
  - [ ] Can create new account
  - [ ] Login page works
  - [ ] Can log in with credentials
  - [ ] JWT token stored in localStorage
  - [ ] Logout clears token

- [ ] **Bookmarks:**
  - [ ] Unauthenticated users see alert when clicking bookmark
  - [ ] Authenticated users can bookmark stories
  - [ ] Bookmarks page shows saved stories
  - [ ] Can unbookmark stories
  - [ ] Bookmarks persist on refresh

- [ ] **UI/UX:**
  - [ ] Responsive on mobile
  - [ ] Dark mode works (if enabled)
  - [ ] Loading states display
  - [ ] Error messages appear
  - [ ] Smooth animations

### Automated Testing (Future Enhancement)

```javascript
// Example Jest test
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';

describe('Home Page', () => {
  test('renders stories', () => {
    render(<Home />);
    expect(screen.getByText(/Top Stories/i)).toBeInTheDocument();
  });
});
```

## Database Testing

### MongoDB Connection Test

```javascript
// In Node.js
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected'))
  .catch(err => console.log('Error:', err));
```

### Data Validation Tests

1. **User Creation:**
   - Duplicate email rejected
   - Password hashed
   - Required fields validated

2. **Story Creation:**
   - Title required
   - URL required
   - Points default to 0
   - hackerNewsId unique

3. **Bookmark Operations:**
   - Users can add bookmarks
   - Duplicate bookmarks handled
   - Can remove bookmarks

## Load Testing

### Using Apache Bench (ab)
```bash
ab -n 1000 -c 10 http://localhost:5000/api/stories
```

### Using Artillery
```bash
npm install -g artillery

artillery quick --count 100 --num 1000 http://localhost:5000/api/stories
```

## API Performance Monitoring

### Response Times
- Stories list: < 200ms
- Single story: < 100ms
- Authentication: < 300ms
- Bookmarks: < 250ms

### Metrics to Track
- Response time
- Throughput (requests/sec)
- Error rate
- Database query time

## Security Testing

### Input Validation
```bash
# Test with special characters
curl -X POST http://localhost:5000/api/auth/register \
  -d '{"email":"<script>alert(1)</script>"}'

# Should reject or sanitize
```

### Authentication
```bash
# Test without token
curl http://localhost:5000/api/stories/user/bookmarks
# Should return 401

# Test with invalid token
curl -H "Authorization: Bearer invalid" \
  http://localhost:5000/api/stories/user/bookmarks
# Should return 401
```

## Error Handling Tests

### Test Cases
1. **Invalid Email:** Register with non-email format
2. **Password Mismatch:** Register with different password/confirm
3. **Duplicate User:** Register same email twice
4. **Invalid Credentials:** Login with wrong password
5. **Missing Fields:** Submit forms with empty fields
6. **Invalid ObjectId:** GET /api/stories/invalid_id
7. **Network Error:** Stop MongoDB and try query

## Testing Results Template

```
Test Date: [Date]
Tester: [Name]
Environment: [Dev/Staging/Production]

Backend API Tests:
✓ Register user
✓ Login user
✓ Get stories
✓ Paginate stories
✓ Bookmark story
✓ Get bookmarks

Frontend Tests:
✓ Home page loads
✓ Auth flow works
✓ Bookmarks feature works
✓ Responsive design works

Issues Found:
- [Issue 1]
- [Issue 2]

Recommendations:
- [Recommendation 1]
- [Recommendation 2]
```

## CI/CD Testing

### GitHub Actions Example

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    services:
      mongodb:
        image: mongo:5
        options: >-
          --health-cmd mongosh
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: cd backend && npm install && npm test
      - run: cd frontend && npm install && npm run lint
```

## Test Coverage Goals

- Backend: 80% code coverage
- Frontend: 70% component coverage
- Critical paths: 100% coverage

## Debugging Tips

1. **Enable debug logging:**
   ```bash
   DEBUG=* npm start
   ```

2. **Use MongoDB Compass** to visualize database

3. **Browser DevTools** for frontend debugging

4. **Postman Console** for API request/response details

5. **Backend Logs** with timestamps and error details

## Known Issues & Workarounds

None currently identified. Please report issues on GitHub.
