const express = require('express');
const {
  getAllStories,
  getStoryById,
  toggleBookmark,
  getUserBookmarks,
  scrapeStories,
} = require('../controllers/storiesController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllStories);
router.get('/user/bookmarks', protect, getUserBookmarks);
router.get('/:id', getStoryById);
router.post('/scrape', scrapeStories);
router.post('/:id/bookmark', protect, toggleBookmark);

module.exports = router;
