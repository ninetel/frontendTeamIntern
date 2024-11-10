import axios from 'axios';
import React, { useEffect, useState } from 'react';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/predefinedQuestions`
});


const UrlForm = ({ onSave }) => {
    const [currentUrl, setCurrentUrl] = useState('');
    const [url, setUrl] = useState<any>([]);
    
    const fetchUrl = async () => {
        try {
            const response = await api.get('/');
            console.log(response.data.urls)
            setUrl(response.data.urls);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchUrl();
    }, []);

    const handleUrlSubmit = async (e) => {
        e.preventDefault();
        // const newUrls = [...urls, currentUrl];
        // onSave(newUrls);
        setCurrentUrl(''); // Clear input

        try {
            await api.post('/', {currentUrl});
        } catch (error) {
            console.log(error)
        }
    };

    const handleDeleteUrl = async (index) => {
        // const newSentences = urls.filter((_, i) => i !== index);
        // onSave(newSentences);
        await api.delete(`/${index}`);
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
                {url.map((url, i) => (
                     <div key={i} className="flex justify-between space-y-1 items-center">
                     <p>{url}</p>
                     <button
                         onClick={() => handleDeleteUrl(url._id)}
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
