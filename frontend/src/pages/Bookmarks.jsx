import React, { useState, useEffect } from 'react';
import { storiesAPI } from '../utils/api';
import { useAuth } from '../context/authContext';
import StoryCard from '../components/StoryCard';
import Loading from '../components/Loading';

export default function Bookmarks() {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  useEffect(() => {
    fetchBookmarks();
  }, [page]);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await storiesAPI.getBookmarks(page, limit);
      setBookmarks(response.data.bookmarks);
      setTotalPages(Math.ceil(response.data.total / limit));
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to fetch bookmarks');
    } finally {
      setLoading(false);
    }
  };

  const handleBookmarkChange = (storyId, isBookmarked) => {
    if (!isBookmarked) {
      setBookmarks((prev) => prev.filter((b) => b._id !== storyId));
    } else {
      // In case we ever need to update the state without removing (though unlikely on this page)
      setBookmarks(prev => 
        prev.map(s => {
          if (s._id === storyId) {
            const currentUserId = user?.id;
            const newBookmarkedBy = isBookmarked
              ? [...(s.bookmarkedBy || []), currentUserId]
              : (s.bookmarkedBy || []).filter(id => id !== currentUserId);
            return { ...s, bookmarkedBy: newBookmarkedBy };
          }
          return s;
        })
      );
    }
  };

  if (loading && page === 1) return <Loading />;

  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Bookmarks</h1>

        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {bookmarks.length > 0 ? (
            bookmarks.map((story) => (
              <StoryCard
                key={story._id}
                story={story}
                onBookmarkChange={handleBookmarkChange}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">No bookmarks yet</p>
              <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                Start bookmarking stories to see them here
              </p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Previous
            </button>
            <span className="text-gray-700 dark:text-gray-300">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
