import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { authAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function Login() {
    const location = useLocation();
    const [infoMessage, setInfoMessage] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const from = location.state?.from || '/';

    useEffect(() => {
        if (location.state?.message) {
            setInfoMessage(location.state.message);
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await authAPI.login(formData);
            login(response.data.user, response.data.token);
            navigate(from, { replace: true });
        } catch (error) {
            setError(error.response?.data?.error || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FFF9F5] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-[450px]">
                {/* Main Card */}
                <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 space-y-8">

                    <div className="text-center">
                        <h1 className="text-[40px] font-bold text-[#1A202C] mb-2">Login</h1>
                        <p className="text-gray-500 text-sm">Welcome back! Please enter your details</p>
                    </div>

                    {infoMessage && (
                        <div className="bg-blue-50 text-blue-700 px-4 py-3 rounded-xl text-sm border border-blue-100">
                            {infoMessage}
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm border border-red-100">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-600 ml-1">
                                <Mail size={16} className="mr-2 text-orange-500" />
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none text-gray-700 placeholder-gray-300"
                                required
                            />
                        </div>

                        {/* Password Field */}{/* Password Field */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-600 ml-1">
                                <Lock size={16} className="mr-2 text-orange-500" />
                                Password
                            </label>

                            {/* IMPORTANT: Added 'relative' here */}
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"} // Added toggle logic
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none text-gray-700 placeholder-gray-300 pr-14" // Added right padding so text doesn't overlap eye
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Orange Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#F25C05] hover:bg-[#D44B00] text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-4"
                        >
                            {loading ? 'Processing...' : 'Login'}
                        </button>
                    </form>

                    {/* Footer Link */}
                    <div className="text-center pt-2">
                        <p className="text-sm text-gray-500">
                            Already have an account?{' '}
                            <Link to="/register" className="text-[#F25C05] hover:underline font-bold">
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}