import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storiesAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import StoryCard from '../components/StoryCard';
import Loading from '../components/Loading';
import { RefreshCw, LayoutGrid, Bookmark, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const limit = 10;

  useEffect(() => {
    fetchStories();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const fetchStories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await storiesAPI.getAllStories(page, limit);
      setStories(response.data.stories);
      setTotalPages(Math.ceil(response.data.total / limit));
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to fetch stories');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await storiesAPI.scrapeStories();
      setPage(1);
      await fetchStories();
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleBookmarkChange = (storyId, isBookmarked) => {
    setStories(prev => 
      prev.map(s => s._id === storyId ? { ...s, bookmarked: isBookmarked } : s)
    );
  };

  if (loading && page === 1) return <Loading />;

  return (
    <div className="min-h-screen bg-[#FFF9F5] dark:bg-gray-950 transition-colors pb-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 p-2 rounded-xl shadow-lg shadow-orange-200">
              <LayoutGrid className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Top Stories</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Discover what's trending right now</p>
            </div>
          </div>
          
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-orange-600 dark:text-orange-400 font-bold rounded-2xl shadow-sm border border-orange-100 dark:border-gray-700 hover:bg-orange-50 transition-all active:scale-95 disabled:opacity-50"
          >
            <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
            {refreshing ? 'Refreshing...' : 'Refresh Feed'}
          </button>
        </div>

        {/* Stories Grid */}
        <div className="space-y-6 mb-12">
          {stories.map((story) => (
            <StoryCard
              key={story._id}
              story={story}
              onBookmarkChange={handleBookmarkChange}
              onAuthRequired={() => setShowAuthModal(true)}
            />
          ))}
        </div>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 py-8">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:bg-orange-50 dark:hover:bg-gray-700 transition-all disabled:opacity-30 disabled:hover:bg-white"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex items-center gap-2">
              <span className="px-4 py-2 bg-orange-600 text-white font-bold rounded-xl shadow-md">
                {page}
              </span>
              <span className="text-gray-400 font-medium">of</span>
              <span className="text-gray-900 dark:text-white font-bold">
                {totalPages}
              </span>
            </div>

            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:bg-orange-50 dark:hover:bg-gray-700 transition-all disabled:opacity-30 disabled:hover:bg-white"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        {/* Auth Popup Modal */}
        {showAuthModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAuthModal(false)} />
            <div className="relative bg-white dark:bg-gray-900 w-full max-w-sm p-8 rounded-[40px] shadow-2xl border border-orange-100 dark:border-gray-800 animate-in zoom-in duration-300">
              <button onClick={() => setShowAuthModal(false)} className="absolute cursor-pointer right-6 top-6 p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors">
                <X size={20} />
              </button>
              <div className="text-center space-y-6">
                <div className="mx-auto w-20 h-20 bg-orange-50 dark:bg-orange-900/20 rounded-[30px] flex items-center justify-center">
                  <Bookmark className="text-orange-600" size={36} />
                </div>
                <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Save for later?</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed px-4">Login to bookmark your favorite stories and read them later.</p>
                <div className="flex flex-col gap-3 pt-2">
                  <button onClick={() => navigate('/login')} className="w-full cursor-pointer py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl shadow-lg shadow-orange-200 transition-all active:scale-[0.98]">Continue to Login</button>
                  <button onClick={() => setShowAuthModal(false)} className="w-full cursor-pointer py-4 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-bold rounded-2xl hover:bg-gray-100 transition-all">Maybe Later</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

  );
}