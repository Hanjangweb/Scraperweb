require('dotenv').config();
require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const storiesRoutes = require('./routes/stories');
const { errorHandler } = require('./middleware/errorHandler');
const { scrapeOnStart } = require('./utils/scraper');

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Initial scrape on server start
scrapeOnStart();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stories', storiesRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(` Server running on http://${HOST}:${PORT}`);
});
