import React, { useState } from 'react';

const UrlForm = ({ urls, onSave }) => {
    const [currentUrl, setCurrentUrl] = useState('');

    const handleUrlSubmit = (e) => {
        e.preventDefault();
        const newUrls = [...urls, currentUrl];
        onSave(newUrls);
        setCurrentUrl(''); // Clear input
    };

    const handleDeleteUrl = (index) => {
        const newSentences = urls.filter((_, i) => i !== index);
        onSave(newSentences);
    };

    return (
        <div className="flex flex-col">
            <form onSubmit={handleUrlSubmit} className="mb-4">
                <label>Add URL:</label>
                <input
                    type="text"
                    value={currentUrl}
                    onChange={(e) => setCurrentUrl(e.target.value)}
                    className="border px-2 py-1 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2">
                    Add URL
                </button>
            </form>
            <div>
                <h4>URLs:</h4>
                {urls.map((url, i) => (
                     <div key={i} className="flex justify-between space-y-1 items-center">
                     <p>{url}</p>
                     <button
                         onClick={() => handleDeleteUrl(i)}
                         className="bg-red-500 text-white px-2 py-1"
                     >
                         Delete
                     </button>
                 </div>
                ))}
            </div>
        </div>
    );
};

export default UrlForm;
