import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/predefinedQuestions` // Adjust this URL to match your API endpoint
});
const PredefinedQuestionsForm = ({ selectedQuestion, onSave }) => {
    const [name, setName] = useState('');
    const [sentences, setSentences] = useState(['']);
    const [urls, setUrls] = useState(['']);

    useEffect(() => {
        if (selectedQuestion) {
            setName(selectedQuestion.name);
            setSentences(selectedQuestion.sentences);
            setUrls(selectedQuestion.urls);
        } else {
            setName('');
            setSentences(['']);
            setUrls(['']);
        }
    }, [selectedQuestion]);

    const handleSentenceChange = (index, value) => {
        const newSentences = [...sentences];
        newSentences[index] = value;
        setSentences(newSentences);
    };

    const handleUrlChange = (index, value) => {
        const newUrls = [...urls];
        newUrls[index] = value;
        setUrls(newUrls);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { name, sentences, urls };
        
        try {
            if (selectedQuestion) {
                await api.put(`/${selectedQuestion._id}`, data);
            } else {
                await api.post('/', data);
            }
            onSave();
        } catch (error) {
            console.error('Error saving predefined question:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Sentences:</label>
                {sentences.map((sentence, index) => (
                    <input
                        key={index}
                        type="text"
                        value={sentence}
                        onChange={(e) => handleSentenceChange(index, e.target.value)}
                    />
                ))}
                <button type="button" onClick={() => setSentences([...sentences, ''])}>
                    Add Sentence
                </button>
            </div>
            <div>
                <label>URLs:</label>
                {urls.map((url, index) => (
                    <input
                        key={index}
                        type="text"
                        value={url}
                        onChange={(e) => handleUrlChange(index, e.target.value)}
                    />
                ))}
                <button type="button" onClick={() => setUrls([...urls, ''])}>
                    Add URL
                </button>
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default PredefinedQuestionsForm;
