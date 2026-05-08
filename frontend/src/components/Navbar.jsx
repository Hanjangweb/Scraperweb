import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, Bookmark, Home, User } from 'lucide-react';
import { useAuth } from '../context/authContext';

export default function Navbar() {
    const { user, logout, isAuthenticated, bookmarkCount } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Lock background scroll when drawer is open
    useEffect(() => {
        if (isDrawerOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isDrawerOpen]);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsDrawerOpen(false);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <nav className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200 transition-transform group-hover:rotate-6">
                                <span className="text-white font-black text-xl">H</span>
                            </div>
                            <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">
                                HackerNews
                            </span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-6">
                            <Link to="/" className={`nav-link ${isActive('/') ? 'text-orange-600' : ''}`}>Stories</Link>
                            {isAuthenticated && (
                                <Link to="/bookmarks" className={`nav-link flex items-center gap-2 ${isActive('/bookmarks') ? 'text-orange-600' : ''}`}>
                                    Bookmarks
                                    {bookmarkCount > 0 && (
                                        <span className="flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-orange-600 rounded-full shadow-sm animate-in zoom-in duration-300">
                                            {bookmarkCount > 99 ? '99+' : bookmarkCount}
                                        </span>
                                    )}
                                </Link>
                            )}

                            <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-700 mx-2" />

                            {isAuthenticated ? (
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 dark:bg-gray-800 rounded-full">
                                        <User size={16} className="text-orange-500" />
                                        <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{user?.username}</span>
                                    </div>
                                    <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                        <LogOut size={20} />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Link to="/login" className="px-5 py-2.5 font-bold text-gray-600 dark:text-gray-300">Login</Link>
                                    <Link to="/register" className="px-6 py-2.5 bg-orange-600 text-white font-bold rounded-xl shadow-md shadow-orange-100">Register</Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setIsDrawerOpen(true)}
                            className="md:hidden p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl text-orange-600"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* --- DRAWER COMPONENTS --- */}

            {/* 1. Backdrop Overlay */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={() => setIsDrawerOpen(false)}
            />

            {/* --- SIDE DRAWER --- */}
            <div className={`fixed top-0 right-0 h-full w-[80%] max-w-[320px] bg-white dark:bg-gray-900 z-[70] shadow-2xl transition-transform duration-300 transform ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'} p-8 flex flex-col`}>

                {/* Drawer Header */}
                <div className="flex justify-between items-center mb-10">
                    <span className="font-black text-xl text-orange-600 italic tracking-tighter">Menu</span>
                    <button onClick={() => setIsDrawerOpen(false)} className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500">
                        <X size={20} />
                    </button>
                </div>

                {/* User Profile Section (Only shows when logged in) */}
                {isAuthenticated && (
                    <div className="flex items-center gap-4 p-4 bg-orange-50 dark:bg-gray-800 rounded-3xl mb-8 border border-orange-100 dark:border-gray-700">
                        <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-md shadow-orange-200">
                            {user?.username?.charAt(0).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">Signed in as</p>
                            <p className="font-black text-gray-900 dark:text-white truncate">{user?.username}</p>
                        </div>
                    </div>
                )}

                {/* Main Navigation Links */}
                <div className="space-y-3 flex-1">
                    <Link
                        to="/"
                        onClick={() => setIsDrawerOpen(false)}
                        className={`flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${isActive('/')
                                ? 'bg-orange-600 text-white shadow-lg shadow-orange-200'
                                : 'text-gray-500 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-gray-800'
                            }`}
                    >
                        <Home size={22} />
                        Home Stories
                    </Link>

                    {isAuthenticated && (
                        <Link
                            to="/bookmarks"
                            onClick={() => setIsDrawerOpen(false)}
                            className={`flex items-center justify-between p-4 rounded-2xl font-bold transition-all ${isActive('/bookmarks')
                                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-200'
                                    : 'text-gray-500 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-gray-800'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <Bookmark size={22} />
                                Saved Bookmarks
                            </div>
                            {bookmarkCount > 0 && (
                                <span className={`flex items-center justify-center min-w-[24px] h-6 px-1.5 text-xs font-black rounded-full ${
                                    isActive('/bookmarks') ? 'bg-white text-orange-600' : 'bg-orange-600 text-white'
                                }`}>
                                    {bookmarkCount}
                                </span>
                            )}
                        </Link>
                    )}
                </div>

                {/* Footer Actions (Login/Register OR Logout) */}
                <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
                    {isAuthenticated ? (
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-3 p-4 bg-red-50 dark:bg-red-900/10 text-red-600 font-bold rounded-2xl hover:bg-red-100 transition-colors"
                        >
                            <LogOut size={20} />
                            Logout Session
                        </button>
                    ) : (
                        <div className="space-y-3">
                            <Link
                                to="/login"
                                onClick={() => setIsDrawerOpen(false)}
                                className="w-full py-4 text-center font-bold text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 rounded-2xl block hover:bg-gray-100 transition-colors"
                            >
                                Log In
                            </Link>
                            <Link
                                to="/register"
                                onClick={() => setIsDrawerOpen(false)}
                                className="w-full py-4 text-center font-bold text-white bg-orange-600 rounded-2xl shadow-lg shadow-orange-200 block active:scale-95 transition-transform"
                            >
                                Join Now
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}