import React, { useState } from 'react';

function FreelancerAddProjects() {
    const [whatToExpect, setWhatToExpect] = useState(['']);
    const [tools, setTools] = useState(['']);
    const [additionalPoints, setAdditionalPoints] = useState(['']);
    const [deadline, setDeadline] = useState('');
    const [images, setImages] = useState([]);

    const handleInputChange = (setter, index, value) => {
        setter(prev => {
            const updated = [...prev];
            updated[index] = value;
            return updated;
        });
    };

    const handleAddField = (setter) => {
        setter(prev => [...prev, '']);
    };

    const handleRemoveField = (setter, index) => {
        setter(prev => prev.filter((_, i) => i !== index));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages(prev => [...prev, ...files]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const projectData = {
            whatToExpect,
            tools,
            additionalPoints,
            deadline,
            images,
        };
        console.log('New Project:', projectData);
    };

    return (
        <div className="font-title p-6">
            <h2 className="text-2xl font-bold mb-4">Add New Project</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* What Can You Expect From Me */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">What can you expect from me:</h3>
                    <div className='text-gray-400 m-1'>Add what work your are going to provide.</div>
                    {whatToExpect.map((item, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="text"
                                value={item}
                                onChange={(e) => handleInputChange(setWhatToExpect, index, e.target.value)}
                                className="border rounded-lg px-3 py-2 flex-1 mr-2"
                                placeholder={`Point ${index + 1}`}
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveField(setWhatToExpect, index)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => handleAddField(setWhatToExpect)}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        + Add Point
                    </button>
                </div>

                {/* Tools */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Tools:</h3>
                    <div className='text-gray-400 m-1'>Tools which you are going to use.</div>
                    {tools.map((tool, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="text"
                                value={tool}
                                onChange={(e) => handleInputChange(setTools, index, e.target.value)}
                                className="border rounded-lg px-3 py-2 flex-1 mr-2"
                                placeholder={`Tool ${index + 1}`}
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveField(setTools, index)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>
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

                {/* Additional Points */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Additional Points:</h3>
                    <div className='text-gray-400 m-1'>Additional info.</div>
                    {additionalPoints.map((point, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="text"
                                value={point}
                                onChange={(e) => handleInputChange(setAdditionalPoints, index, e.target.value)}
                                className="border rounded-lg px-3 py-2 flex-1 mr-2"
                                placeholder={`Point ${index + 1}`}
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveField(setAdditionalPoints, index)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => handleAddField(setAdditionalPoints)}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        + Add Point
                    </button>
                </div>

                {/* Deadline */}
                <div>
                    <label htmlFor="deadline" className="block text-lg font-semibold mb-2">
                        Deadline:
                    </label>
                    <div className='text-gray-400 m-1'>How long it will take to complete the project.</div>
                    <input
                        type="text"
                        id="deadline"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="border rounded-lg px-3 py-2 w-full"
                        placeholder="e.g., 10-day delivery"
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label htmlFor="imageUpload" className="block text-lg font-semibold mb-2">
                        Upload Images:
                    </label>
                    <div className='text-gray-400 m-1'>To display your work.</div>
                    <input
                        type="file"
                        id="imageUpload"
                        onChange={handleImageUpload}
                        multiple
                        accept="image/*"
                        className="block border rounded-lg px-3 py-2 w-full"
                    />
                    <div className="mt-2">
                        {images.length > 0 && (
                            <ul className="list-disc pl-5">
                                {images.map((image, index) => (
                                    <li key={index}>{image.name}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary hover:text-black transition duration-200"
                >
                    Submit Project
                </button>
            </form>
        </div>
    );
}

export default FreelancerAddProjects;
