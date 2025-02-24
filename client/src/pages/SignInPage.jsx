import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
//import OAuth from "../Components/OAuth"

const SignInPage = () => {


    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        setError('');

        console.log(formData)

        try{
            const res = await axios.post('/api/auth/signin', formData, {
                headers: {
                    "Content-Type" : "application/json", 
                },
            })

            console.log(res.data);

            if (res.data.success === false) {
                setError(res.data.message || 'Signup failed. Please try again.');
                return;
            }
    
            navigate('/');

        }
        catch(error){
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
        }

        console.log('Sign In Data:', formData);
    };

    return (
        <div className="flex justify-center items-center min-h-screen  bg-purple-200">
            <div className="w-full max-w-md mx-4 bg-white rounded-lg shadow-xl p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-purple-700">Welcome Back</h2>
                    <p className="text-gray-600 mt-2">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 pr-12"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="text-sm text-red-500">
                            {error}
                        </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                        <a href="#" className="text-purple-600 hover:text-purple-700 hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md shadow-sm transition-colors duration-200"
                    >
                        Sign In
                    </button>

                    {/* <OAuth/> */}

                    <div className="text-center text-sm text-gray-600 pt-4">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-purple-600 hover:text-purple-700 hover:underline">Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignInPage;