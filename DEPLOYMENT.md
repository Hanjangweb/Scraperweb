# Deployment Guide

## Deploying to Production

### Prerequisites
- GitHub repository with code pushed
- Accounts on hosting platforms
- MongoDB Atlas cluster

### Option 1: Deploy to Render + Vercel

#### Backend Deployment (Render)

1. **Prepare backend:**
   ```bash
   cd backend
   npm install
   ```

2. **Create a `render.yaml` file in backend:**
   ```yaml
   version: 1
   services:
     - type: web
       name: hackernews-api
       runtime: node
       plan: free
       buildCommand: npm install
       startCommand: npm start
       envVars:
         - key: NODE_ENV
           value: production
         - key: PORT
           value: 5000
         - key: MONGO_URI
           scope: SECRET
         - key: JWT_SECRET
           scope: SECRET
         - key: JWT_EXPIRE
           value: 30d
         - key: FRONTEND_URL
           value: https://your-frontend-url.vercel.app
   ```

3. **Push to GitHub and connect Render:**
   - Go to https://render.com
   - Connect GitHub account
   - Create new Web Service
   - Select backend repository
   - Fill in environment variables
   - Deploy

#### Frontend Deployment (Vercel)

1. **Build frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Vercel:**
   ```bash
   npm install -g vercel
   vercel
   ```
   
   Or connect GitHub to Vercel dashboard:
   - Go to https://vercel.com
   - Import from Git
   - Select frontend folder
   - Set `VITE_API_URL` to your Render backend URL
   - Deploy

### Option 2: Deploy to Railway

1. **Create Railway Account:** https://railway.app

2. **Backend Setup:**
   ```bash
   railway link
   railway up
   ```

3. **Frontend Setup:**
   - Same as Vercel but use Railway deployment option

### Environment Variables for Production

**Backend (.env in production):**
```env
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_EXPIRE=30d
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

**Frontend (.env in production):**
```env
VITE_API_URL=https://your-backend-api-domain.com/api
```

### Post-Deployment Checklist

- [ ] Database connection working
- [ ] Backend health check endpoint responds
- [ ] Frontend loads without CORS errors
- [ ] Login/Register functionality works
- [ ] Stories display correctly
- [ ] Bookmarks feature works
- [ ] Scraping completes successfully
- [ ] All API endpoints respond correctly

### Monitoring

1. **Backend Logs:** Check Render/Railway dashboard
2. **Frontend Errors:** Use browser dev tools
3. **Database:** Monitor MongoDB Atlas dashboard
4. **Performance:** Use New Relic or similar APM tools

### Common Issues

**CORS Errors:**
- Ensure FRONTEND_URL matches actual frontend domain
- Check browser console for exact error

**Database Connection Fails:**
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas
- Ensure credentials are correct

**API 502 Errors:**
- Check backend logs
- Verify all required environment variables are set
- Check database connection

### Database Backup

1. **MongoDB Atlas:**
   - Automated backups enabled by default
   - Manual backup: Go to Atlas > Database > Backups > Backup Now

2. **Restore Process:**
   - Atlas provides point-in-time restore
   - Contact support for detailed recovery

### Security Best Practices

1. **Secrets Management:**
   - Never commit .env files
   - Use platform's secret management
   - Rotate JWT_SECRET periodically

2. **HTTPS:**
   - Ensure all connections are HTTPS
   - Use SSL/TLS certificates

3. **API Rate Limiting:**
   - Consider adding rate limiter middleware
   - Protect against DDoS

4. **Database:**
   - Regular backups
   - Monitor unauthorized access attempts
   - Use strong passwords

### Cost Optimization

- Use free tier of Render/Railway/Vercel
- MongoDB Atlas free tier (512MB storage)
- Monitor usage regularly
- Optimize database queries
- Use CDN for static assets

### Continuous Deployment with GitHub Actions

Automated deployment is configured using GitHub Actions. Every push to the `main` branch will trigger a deployment for both the backend (Render) and frontend (Vercel).

#### Setup Instructions

1.  **Backend (Render):**
    *   Go to your Render Dashboard.
    *   Select your Web Service.
    *   Go to **Settings**.
    *   Find the **Deploy Hook** section and copy the URL.
    *   In your GitHub repository, go to **Settings > Secrets and variables > Actions**.
    *   Create a new repository secret named `RENDER_DEPLOY_HOOK_URL` and paste the URL.

2.  **Frontend (Vercel):**
    *   **Vercel Token:** Go to your [Vercel Account Settings > Tokens](https://vercel.com/account/tokens) and create a new token.
    *   **Project ID & Org ID:**
        *   Install Vercel CLI locally: `npm install -g vercel`
        *   Run `vercel link` in the `frontend` directory.
        *   Check the `.vercel/project.json` file created to find `projectId` and `orgId`.
    *   In your GitHub repository, go to **Settings > Secrets and variables > Actions**.
    *   Create the following repository secrets:
        *   `VERCEL_TOKEN`: Your Vercel personal access token.
        *   `VERCEL_ORG_ID`: Your Vercel organization/user ID.
        *   `VERCEL_PROJECT_ID`: Your Vercel project ID.

3.  **Workflow File:**
    *   The workflow is located at `.github/workflows/deploy.yml`.
    *   It triggers on pushes to the `main` branch.

### Example GitHub Action (Summary)
   ```yaml
   name: Deploy
   on:
     push:
       branches: [main]
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - uses: actions/setup-node@v2
         - run: npm install
         - run: npm run build
         - run: npm run deploy
   ```

### Scaling Considerations

- Upgrade from free tier when needed
- Use MongoDB Atlas paid tier for production
- Implement caching strategies
- Consider microservices architecture
- Use load balancing for high traffic

### Support & Troubleshooting

- Platform documentation:
  - Render: https://render.com/docs
  - Vercel: https://vercel.com/docs
  - Railway: https://railway.app/docs
- MongoDB: https://docs.mongodb.com/
- Contact platform support for issues
