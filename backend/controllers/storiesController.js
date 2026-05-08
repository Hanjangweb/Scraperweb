const Story = require('../models/Story');
const { scrapeHackerNews } = require('../utils/scraper');

exports.getAllStories = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalStories = await Story.countDocuments();
  const stories = await Story.find()
    .sort({ points: -1 })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    total: totalStories,
    page,
    limit,
    stories,
  });
};

exports.getStoryById = async (req, res) => {
  const story = await Story.findById(req.params.id).populate('bookmarkedBy', 'username email');

  if (!story) {
    return res.status(404).json({ error: 'Story not found' });
  }

  res.status(200).json({
    success: true,
    story,
  });
};

exports.toggleBookmark = async (req, res) => {
  const userId = req.userId;
  const storyId = req.params.id;

  const story = await Story.findById(storyId);

  if (!story) {
    return res.status(404).json({ error: 'Story not found' });
  }

  const isBookmarked = story.bookmarkedBy.includes(userId);

  if (isBookmarked) {
    await Story.findByIdAndUpdate(
      storyId,
      { $pull: { bookmarkedBy: userId } },
      { new: true }
    );
    res.status(200).json({ success: true, message: 'Bookmark removed', bookmarked: false });
  } else {
    await Story.findByIdAndUpdate(
      storyId,
      { $push: { bookmarkedBy: userId } },
      { new: true }
    );
    res.status(200).json({ success: true, message: 'Bookmark added', bookmarked: true });
  }
};

exports.getUserBookmarks = async (req, res) => {
  const userId = req.userId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalBookmarks = await Story.countDocuments({ bookmarkedBy: userId });
  const bookmarks = await Story.find({ bookmarkedBy: userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    total: totalBookmarks,
    page,
    limit,
    bookmarks,
  });
};

exports.scrapeStories = async (req, res) => {
  try {
    const stories = await scrapeHackerNews();
    res.status(200).json({
      success: true,
      message: 'Scraping completed successfully',
      count: stories.length,
      stories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to scrape stories',
    });
  }
};
