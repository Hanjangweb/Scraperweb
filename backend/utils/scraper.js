const axios = require('axios');
const cheerio = require('cheerio');
const Story = require('../models/Story');

const HACKER_NEWS_URL = 'https://news.ycombinator.com';
const LIMIT = 10;

const parsePostedAt = (ageText) => {
  const now = new Date();
  if (!ageText) return now;

  const relativeMatch = ageText.match(/(\d+)\s+(second|minute|hour|day|week|month|year)s?\s+ago/i);
  if (relativeMatch) {
    const value = parseInt(relativeMatch[1], 10);
    const unit = relativeMatch[2].toLowerCase();

    const postedDate = new Date(now);
    switch (unit) {
      case 'second':
        postedDate.setSeconds(postedDate.getSeconds() - value);
        break;
      case 'minute':
        postedDate.setMinutes(postedDate.getMinutes() - value);
        break;
      case 'hour':
        postedDate.setHours(postedDate.getHours() - value);
        break;
      case 'day':
        postedDate.setDate(postedDate.getDate() - value);
        break;
      case 'week':
        postedDate.setDate(postedDate.getDate() - value * 7);
        break;
      case 'month':
        postedDate.setMonth(postedDate.getMonth() - value);
        break;
      case 'year':
        postedDate.setFullYear(postedDate.getFullYear() - value);
        break;
      default:
        break;
    }

    return postedDate;
  }

  const parsed = new Date(ageText);
  return Number.isNaN(parsed.getTime()) ? now : parsed;
};

const scrapeHackerNews = async () => {
  try {
    console.log('🔄 Scraping Hacker News...');
    const response = await axios.get(HACKER_NEWS_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    const $ = cheerio.load(response.data);
    const stories = [];
    let count = 0;

    $('tr.athing').each((index, element) => {
      if (count >= LIMIT) return;

      const titleRow = $(element);
      const metaRow = titleRow.next();

      const titleElem = titleRow.find('span.titleline > a').first();
      const title = titleElem.text();
      const url = titleElem.attr('href');

      if (!title || !url) return;

      const pointsText = metaRow.find('span.score').text();
      const points = parseInt(pointsText) || 0;

      const authorText = metaRow.find('a.hnuser').text();
      const author = authorText || 'Unknown';

      const ageText = metaRow.find('span.age').attr('title');
      const postedAt = parsePostedAt(ageText);

      const hackerNewsId = titleRow.attr('id');

      stories.push({
        title,
        url,
        points,
        author,
        postedAt,
        hackerNewsId,
      });

      count++;
    });

    // Save to MongoDB
    for (const story of stories) {
      await Story.updateOne(
        { hackerNewsId: story.hackerNewsId },
        { $set: story },
        { upsert: true }
      );
    }

    console.log(`✅ Successfully scraped and saved ${stories.length} stories`);
    return stories;
  } catch (error) {
    console.error('❌ Scraping error:', error.message);
    throw error;
  }
};

const scrapeOnStart = async () => {
  try {
    // Wait for MongoDB to connect
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await scrapeHackerNews();
  } catch (error) {
    console.error('Failed to scrape on start:', error.message);
  }
};

module.exports = { scrapeHackerNews, scrapeOnStart };
