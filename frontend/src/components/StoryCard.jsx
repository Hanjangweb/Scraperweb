import React, { useState } from 'react';
import { Heart, ExternalLink, User, Clock, Globe } from 'lucide-react';
import { storiesAPI } from '../utils/api';
import { useAuth } from '../context/authContext';

export default function StoryCard({ story, onBookmarkChange, onAuthRequired }) {
    const { isAuthenticated } = useAuth();
    const [isBookmarked, setIsBookmarked] = useState(
        story.bookmarkedBy?.length > 0 || false
    );
    const [loading, setLoading] = useState(false);

    // Reset bookmark UI if user logs out
    React.useEffect(() => {
        if (!isAuthenticated) {
            setIsBookmarked(false);
        } else {
            // Re-sync with story data if they log back in
            setIsBookmarked(story.bookmarkedBy?.length > 0 || false);
        }
    }, [isAuthenticated, story.bookmarkedBy]);

    const handleBookmark = async () => {
        // Trigger the Auth Modal in Home.jsx if user is not logged in
        if (!isAuthenticated) {
            if (onAuthRequired) onAuthRequired();
            return;
        }

        setLoading(true);
        try {
            const response = await storiesAPI.toggleBookmark(story._id);
            setIsBookmarked(response.data.bookmarked);
            onBookmarkChange?.(story._id, response.data.bookmarked);
        } catch (error) {
            console.error('Bookmark error:', error);
        } finally {
            setLoading(false);
        }
    };

    const getHostname = (url) => {
        try {
            return new URL(url).hostname.replace('www.', '');
        } catch {
            return url;
        }
    };

    const timeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
        };

        for (const [name, secondsInInterval] of Object.entries(intervals)) {
            const interval = Math.floor(seconds / secondsInInterval);
            if (interval >= 1) {
                return `${interval} ${name}${interval > 1 ? 's' : ''} ago`;
            }
        }
        return 'just now';
    };

    return (
        <div className="group relative bg-white dark:bg-gray-800 p-6 rounded-[32px] border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-300 animate-slideUp">
            <div className="flex flex-col gap-4">
                
                {/* Top Section: Domain & Points */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 px-3 py-1 bg-orange-50 dark:bg-orange-950/30 rounded-full">
                        <Globe size={14} className="text-orange-500" />
                        <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                            {getHostname(story.url)}
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {story.points} <span className="text-gray-400 font-medium">pts</span>
                        </span>
                    </div>
                </div>

                {/* Title Section */}
                <div className="space-y-2">
                    <a href={story.url} target="_blank" rel="noopener noreferrer" className="block">
                        <h3 className="text-xl font-extrabold text-gray-900 dark:text-white leading-tight group-hover:text-orange-600 transition-colors line-clamp-2">
                            {story.title}
                        </h3>
                    </a>
                </div>

                {/* Bottom Section: Meta & Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-700/50">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                            <User size={14} className="text-orange-400" />
                            <span className="text-xs font-semibold">{story.author}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-400">
                            <Clock size={14} />
                            <span className="text-xs">{timeAgo(story.postedAt)}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Bookmark Button */}
                        <button
                            onClick={handleBookmark}
                            disabled={loading}
                            title={isBookmarked ? "Remove bookmark" : "Save for later"}
                            className={`p-2.5 cursor-pointer rounded-2xl transition-all duration-200 ${
                                isBookmarked
                                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-200'
                                    : 'bg-gray-50 dark:bg-gray-700 text-gray-400 hover:text-orange-500 hover:bg-orange-50 hover:scale-110'
                            } disabled:opacity-50`}
                        >
                            <Heart size={18} fill={isBookmarked ? 'currentColor' : 'none'} strokeWidth={2.5} />
                        </button>
                        
                        {/* Link Button */}
                        <a
                            href={story.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 bg-gray-50 dark:bg-gray-700 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-2xl transition-all hover:scale-110"
                        >
                            <ExternalLink size={18} strokeWidth={2.5} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}