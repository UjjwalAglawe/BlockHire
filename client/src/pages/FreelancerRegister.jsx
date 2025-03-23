import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
//import { signup } from '../../reducer/signupSlice';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            profileImage: '',
            username: '',
            email: '',
            metaMaskAccount: '',
            location: '',
            aboutMe: '',
            university: '',
            languages: [''],
            occupation: [''],
            skills: [''],
            certificates: [''],
        },
    });

    //const client = useSelector((state) => state.signup.client);
    //const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (userData) => {
        alert('Sign up completed successfully!');
        //dispatch(signup(userData));
        navigate("/");
        console.log(userData);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setValue('profileImage', URL.createObjectURL(file));
        }
    };

    // Using useFieldArray for dynamic list fields
    const fieldsConfig = [
        { name: 'languages', label: 'Languages' },
        { name: 'occupation', label: 'Occupation' },
        { name: 'skills', label: 'Skills' },
        { name: 'certificates', label: 'Certificates' },
    ];

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 bg-white rounded-lg shadow-lg max-w-6xl mx-auto"
        >
            <h1 className="text-3xl text-primary font-extrabold font mb-4 text-center">BlockHire</h1>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign Up</h2>
            <h4> You are currently <span className='font-bold text-primary text-lg'></span>.</h4>

            {/* Show all fields if client is developer */}

            <>
                {/* Profile Picture */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Profile Picture</label>
                    <div className="flex items-center space-x-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                        </svg>
                        <label className="text-blue-600 cursor-pointer hover:underline">
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                            Upload Image
                        </label>
                    </div>
                </div>

                {/* Show Full Name, Email, MetaMask Account, Location, Languages */}
                <div className="space-y-4">
                    {[
                        { name: 'username', label: 'Full Name', type: 'text' },
                        { name: 'email', label: 'Email', type: 'email' },
                        { name: 'metaMaskAccount', label: 'MetaMask Account', type: 'text' },
                        { name: 'location', label: 'Location', type: 'text' },

                    ].map(({ name, label, type }) => (
                        <div key={name}>
                            <label className="block text-gray-700 font-medium mb-2">{label}</label>
                            {type === 'textarea' ? (
                                <textarea
                                    {...register(name, { required: true })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder={`Enter your ${label.toLowerCase()}`}
                                    rows="4"
                                />
                            ) : (
                                <input
                                    {...register(name, { required: true })}
                                    type={type}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder={`Enter your ${label.toLowerCase()}`}
                                />
                            )}
                            {errors[name] && <p className="text-red-500 text-sm">This field is required.</p>}
                        </div>
                    ))}
                </div>

                {/* Fields for About Me, University, and Dynamic Lists */}
                {[
                    { name: 'aboutMe', label: 'About Me', type: 'textarea' },
                    { name: 'university', label: 'University', type: 'text' },
                ].map(({ name, label, type }) => (
                    <div key={name}>
                        <label className="block text-gray-700 font-medium mb-2">{label}</label>
                        {type === 'textarea' ? (
                            <textarea
                                {...register(name)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder={`Enter your ${label.toLowerCase()}`}
                                rows="4"
                            />
                        ) : (
                            <input
                                {...register(name)}
                                type={type}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder={`Enter your ${label.toLowerCase()}`}
                            />
                        )}
                        {errors[name] && <p className="text-red-500 text-sm">This field is required.</p>}
                    </div>
                ))}

                {/* Dynamic List Fields (Languages, Occupation, Skills, etc.) */}
                {fieldsConfig.map(({ name, label }) => {
                    const { fields, append, remove } = useFieldArray({ control, name });
                    return (
                        <div key={name} className="mb-6">
                            <label className="block text-gray-700 font-medium mb-2">{label}</label>
                            {fields.map((item, index) => (
                                <div key={item.id} className={`flex items-center space-x-2 mb-2`}>
                                    <input
                                        {...register(`${name}.${index}`, { required: true })}
                                        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder={label}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        ❌
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => append('')}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                + Add {label}
                            </button>
                        </div>



                    );
                })}
            </>

            {/* {client === 'developer' ? (
                
            ) : (
                
            )} */}

            <>
                {/* Profile Picture */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Profile Picture</label>
                    <div className="flex items-center space-x-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                        </svg>
                        <label className="text-blue-600 cursor-pointer hover:underline">
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                            Upload Image
                        </label>
                    </div>
                </div>

                {/* Required Fields for client */}
                <div className="space-y-4">
                    {[
                        { name: 'username', label: 'Full Name', type: 'text' },
                        { name: 'email', label: 'Email', type: 'email' },
                        { name: 'metaMaskAccount', label: 'MetaMask Account', type: 'text' },
                        { name: 'location', label: 'Location', type: 'text' },

                    ].map(({ name, label, type }) => (
                        <div key={name}>
                            <label className="block text-gray-700 font-medium mb-2">{label}</label>
                            {type === 'textarea' ? (
                                <textarea
                                    {...register(name, { required: true })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder={`Enter your ${label.toLowerCase()}`}
                                    rows="4"
                                />
                            ) : (
                                <input
                                    {...register(name, { required: true })}
                                    type={type}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder={`Enter your ${label.toLowerCase()}`}
                                />
                            )}
                            {errors[name] && <p className="text-red-500 text-sm">This field is required.</p>}
                        </div>
                    ))}
                </div>
            </>

            {/* Save Button */}
            <button
                type="submit"
                className="w-full mt-2 bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Sign Up
            </button>
        </form>
    );
};

export default SignUp;