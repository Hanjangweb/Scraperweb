import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

// Stories API
export const storiesAPI = {
  getAllStories: (page = 1, limit = 10) =>
    api.get(`/stories?page=${page}&limit=${limit}`),
  getStory: (id) => api.get(`/stories/${id}`),
  toggleBookmark: (id) => api.post(`/stories/${id}/bookmark`),
  getBookmarks: (page = 1, limit = 10) =>
    api.get(`/stories/user/bookmarks?page=${page}&limit=${limit}`),
  getBookmarkCount: () => api.get('/stories/user/bookmarks/count'),
  scrapeStories: () => api.post('/stories/scrape'),
};

export default api;
