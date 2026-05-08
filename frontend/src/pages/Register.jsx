import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../utils/api';
import { useAuth } from '../context/authContext';
// Added Eye and EyeOff to imports
import { Mail, Lock, User, Loader2, Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Track visibility for both password fields
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirmPassword: false,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      const response = await authAPI.register(formData);
      login(response.data.user, response.data.token);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.error || error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-orange-100 dark:border-gray-700 space-y-8 transition-all">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">Join Us</h1>
            <p className="text-gray-500 dark:text-gray-400">Create your account to get started</p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 rounded-md text-sm animate-in fade-in slide-in-from-top-1">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { label: 'Username', name: 'username', type: 'text', icon: User, placeholder: 'johndoe' },
              { label: 'Email', name: 'email', type: 'email', icon: Mail, placeholder: 'you@example.com' },
              { label: 'Password', name: 'password', type: 'password', icon: Lock, placeholder: '••••••••', isPassword: true },
              { label: 'Confirm Password', name: 'confirmPassword', type: 'password', icon: Lock, placeholder: '••••••••', isPassword: true },
            ].map((field) => (
              <div key={field.name} className="space-y-1">
                <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                  <field.icon size={14} className="mr-2 text-orange-500" />
                  {field.label}
                </label>
                
                {/* Wrap in relative div to position the eye icon */}
                <div className="relative">
                  <input
                    type={field.isPassword ? (showPasswords[field.name] ? 'text' : 'password') : field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-gray-900 dark:text-white ${field.isPassword ? 'pr-12' : ''}`}
                    required
                  />
                  
                  {/* Show eye button only for password fields */}
                  {field.isPassword && (
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility(field.name)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors"
                    >
                      {showPasswords[field.name] ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 active:scale-[0.98] text-white font-bold rounded-xl shadow-lg shadow-orange-200 dark:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-orange-600 hover:text-orange-700 font-bold underline-offset-4 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}