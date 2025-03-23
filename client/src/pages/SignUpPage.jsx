import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import OAuth from '../Components/OAuth/OAuth';
//import OAuth from '../components/OAuth';

const SignUpPage = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Please fill in all fields');
            return;
        }
    
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
    
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }
    
        setError('');
    
        try {
            const res = await axios.post('/api/auth/signup', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            console.log(res.data); 

            if (res.data.success === false) {
                setError(res.data.message || 'Signup failed. Please try again.');
                return;
            }
    
            navigate('/signin');
        } catch (error) {
           
            setError(error.response?.data?.message || 'An error occurred. Please try again.'); 
        }
    };
    

    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    return (

        <div className="min-h-screen  flex items-center justify-center p-4 bg-purple-200">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-xl p-6">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-purple-700">Create Account</h2>
                    <p className="text-gray-600 text-sm mt-1">Sign up to get started</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword.password ? "text" : "password"}
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('password')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword.password ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        <p className="text-xs text-gray-500">Must be at least 8 characters long</p>
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showPassword.confirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('confirmPassword')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword.confirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="text-sm text-red-500">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md shadow-sm transition-colors duration-200"
                    >
                        Sign Up
                    </button>

                    <OAuth/>

                    <div className="text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/signin" className="text-purple-600 hover:text-purple-700 hover:underline">
                            Sign In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;


