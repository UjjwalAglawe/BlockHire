import React, { useState, useEffect } from 'react';
import axios from 'axios';
import uploadToPinata from '../../uploadImg';
import { useDispatch, useSelector } from 'react-redux';
import { addProjectStart, addProjectFailure, addProjectSuccess  } from '../../reducer/project/projectSlice';

import { useNavigate } from "react-router-dom";

function FreelancerAddProjects() {
    const [name, setName] = useState('');
    const [tools, setTools] = useState(['']);
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get user and freelancer data from Redux store
    const user = useSelector((state) => state.user);
    const freelancer = useSelector((state) => state.freelancer);

    console.log("User is", user);
    console.log("Freelancer is", freelancer);
    
    const freelancerId = user.currentUser.freelancer.id;

    useEffect(() => {
        if (!freelancerId) {
            setMessage('Error: Freelancer ID not found. Please make sure you are logged in as a freelancer.');
        }
    }, [freelancerId]);

    // Handle input changes for dynamic fields (tools)
    const handleInputChange = (setter, index, value) => {
        setter(prev => {
            const updated = [...prev];
            updated[index] = value;
            return updated;
        });
    };

    // Add new input field dynamically
    const handleAddField = (setter) => {
        setter(prev => [...prev, '']);
    };

    // Remove a specific field
    const handleRemoveField = (setter, index) => {
        setter(prev => prev.filter((_, i) => i !== index));
    };

    // Handle image upload
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                setLoading(true);
                const ipfsUrl = await uploadToPinata(file);
                
                if (ipfsUrl) {
                    setThumbnailUrl(ipfsUrl);
                    setMessage('Image uploaded successfully!');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                setMessage('Error uploading image. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(addProjectStart());

        if (!freelancerId) {
            setMessage('Error: Freelancer ID not found. Please make sure you are logged in as a freelancer.');
            return;
        }

        if (!name || !description) {
            setMessage('Title and description are required.');
            return;
        }

        if (!thumbnailUrl) {
            setMessage('Please upload a project thumbnail.');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            // Prepare the project data
            const projectData = {
                title: name.trim(),
                description: description.trim(),
                projectUrl: url ? url.trim() : '',
                thumbnailUrl: thumbnailUrl.trim(),
                tools: tools.filter(tool => tool.trim() !== '').map(tool => tool.trim())
            };

            console.log('Sending project data:', {
                freelancerId,
                ...projectData
            });

            const response = await axios.post(
                `http://localhost:4000/api/freelancers/${freelancerId}/projects`,
                projectData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Server response:', response.data);

            if (response.data.success) {
                setMessage('Project added successfully!');
                console.log('Project created:', response.data);

                // Clear form after successful submission
                setName('');
                setDescription('');
                setUrl('');
                setTools(['']);
                setThumbnailUrl('');

                dispatch(addProjectSuccess(response.data.data));
                navigate('/freelancerProfile/projects');
            } else {
                throw new Error(response.data.message || 'Failed to add project');
            }
        } catch (error) {
            console.error('Error adding project:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            
            const errorMessage = error.response?.data?.message || 
                               error.response?.data?.error || 
                               error.message || 
                               'Failed to add project. Please try again.';
            
            dispatch(addProjectFailure(errorMessage));
            setMessage(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    
    if (!freelancerId) {
        return (
            <div className="font-title p-6">
                <div className="bg-red-100 text-red-700 p-4 rounded">
                    Please make sure you are logged in as a freelancer to add projects.
                </div>
            </div>
        );
    }

    return (
        <div className="font-title p-6">
            <h2 className="text-2xl font-bold mb-4">Add New Project</h2>
            {message && (
                <div className={`mb-4 p-4 rounded ${
                    message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                
                <div>
                    <label className="block text-lg font-semibold mb-2">
                        Project Name:
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border rounded-lg px-3 py-2 w-full"
                        placeholder="e.g. Face Detection Model"
                        required
                    />
                </div>

                <div>
                    <label className="block text-lg font-semibold mb-2">
                        Description:
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border rounded-lg px-3 py-2 w-full resize-none"
                        placeholder="Describe your project..."
                        rows="5"
                        required
                    />
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Tools:</h3>
                    {tools.map((tool, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="text"
                                value={tool}
                                onChange={(e) => handleInputChange(setTools, index, e.target.value)}
                                className="border rounded-lg px-3 py-2 flex-1 mr-2"
                                placeholder={`Tool ${index + 1}`}
                            />
                            {tools.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveField(setTools, index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => handleAddField(setTools)}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        + Add Tool
                    </button>
                </div>

                <div>
                    <label className="block text-lg font-semibold mb-2">
                        Project URL:
                    </label>
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="border rounded-lg px-3 py-2 w-full"
                        placeholder="e.g. https://github.com/user/project"
                    />
                </div>

                <div>
                    <label className="block text-lg font-semibold mb-2">
                        Project Thumbnail:
                    </label>
                    <input
                        type="file"
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="border rounded-lg px-3 py-2 w-full"
                        disabled={loading}
                    />
                    {thumbnailUrl && (
                        <div className="mt-2">
                            <img 
                                src={thumbnailUrl} 
                                alt="Project thumbnail" 
                                className="max-w-xs rounded-lg shadow-md"
                            />
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary hover:text-black transition duration-200 ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {loading ? 'Submitting...' : 'Submit Project'}
                </button>
            </form>
        </div>
    );
}

export default FreelancerAddProjects;
