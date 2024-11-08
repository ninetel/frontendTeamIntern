
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/predefinedQuestions` // Adjust this URL to match your API endpoint
});
 
const PredefinedQuestionsForm = ({ onSave }) => {
    const [name, setName] = useState('');
    const [isNameSaved, setIsNameSaved] = useState(false);
    const [sentences, setSentences] = useState([]);
    const [urls, setUrls] = useState([]);
    const [currentSentence, setCurrentSentence] = useState('');
    const [currentUrl, setCurrentUrl] = useState('');

    const handleNameSubmit = (e) => {
        e.preventDefault();
        onSave({ name, sentences, urls });
        setIsNameSaved(true);
    };

    const handleSentenceSubmit = (e) => {
        e.preventDefault();
        const newSentences = [...sentences, currentSentence];
        onSave({ name, sentences: newSentences, urls });
        setSentences(newSentences);
        setCurrentSentence('');
    };

    const handleUrlSubmit = (e) => {
        e.preventDefault();
        const newUrls = [...urls, currentUrl];
        onSave({ name, sentences, urls: newUrls });
        setUrls(newUrls);
        setCurrentUrl('');
    };

    const handleDeleteSentence = (index) => {
        const newSentences = sentences.filter((_, i) => i !== index);
        setSentences(newSentences);
    };

    const handleDeleteUrl = (index) => {
        const newUrls = urls.filter((_, i) => i !== index);
        setUrls(newUrls);
    };

    return (
        <div>
            <form onSubmit={handleNameSubmit} className="mb-4">
                <div className="mb-2">
                    <label className="block mb-1">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border px-2 py-1 w-full"
                        required
                    />
                </div>
                {!isNameSaved && (
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-4">
                        Save Name
                    </button>
                )}
            </form>
            {isNameSaved && (
                <>
                    <form onSubmit={handleSentenceSubmit} className="mb-4">
                        <div className="mb-2">
                            <label className="block mb-1">Add Sentence:</label>
                            <input
                                type="text"
                                value={currentSentence}
                                onChange={(e) => setCurrentSentence(e.target.value)}
                                className="border px-2 py-1 w-full"
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2">
                            Add Sentence
                        </button>
                    </form>
                    <form onSubmit={handleUrlSubmit} className="mb-4">
                        <div className="mb-2">
                            <label className="block mb-1">Add URL:</label>
                            <input
                                type="text"
                                value={currentUrl}
                                onChange={(e) => setCurrentUrl(e.target.value)}
                                className="border px-2 py-1 w-full"
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2">
                            Add URL
                        </button>
                    </form>
                </>
            )}
            <div>
                <h4 className="text-md font-semibold">Sentences:</h4>
                {sentences.map((sentence, index) => (
                    <div key={index} className="flex justify-between items-center mb-2">
                        <p>{sentence}</p>
                        <button
                            onClick={() => handleDeleteSentence(index)}
                            className="bg-red-500 text-white px-2 py-1"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
            <div>
                <h4 className="text-md font-semibold">URLs:</h4>
                {urls.map((url, index) => (
                    <div key={index} className="flex justify-between items-center mb-2">
                        <p>{url}</p>
                        <button
                            onClick={() => handleDeleteUrl(index)}
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

const PredefinedQuestionsList = ({ questions, onDelete }) => {
    return (
        <div>
            {questions.map((question) => (
                <div key={question._id} className="mb-4 p-4 border rounded shadow">
                    <h3 className="text-lg font-semibold">{question.name}</h3>
                    <button
                        onClick={() => onDelete(question._id)}
                        className="bg-red-500 text-white px-4 py-2 mt-2 mb-4"
                    >
                        Delete Name
                    </button>
                    <div>
                        <h4 className="text-md font-semibold">Sentences:</h4>
                        {question.sentences.map((sentence, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <p>{sentence}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h4 className="text-md font-semibold">URLs:</h4>
                        {question.urls.map((url, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <p>{url}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

const AdminPredefinedQuestions = () => {
    const [questions, setQuestions] = useState([]);

    const fetchQuestions = async () => {
        try {
            const response = await api.get('/');
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching predefined questions:', error);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const handleSave = async (data) => {
        try {
            await api.post('/', data);
            fetchQuestions();
        } catch (error) {
            console.error('Error saving predefined question:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/${id}`);
            fetchQuestions();
        } catch (error) {
            console.error('Error deleting predefined question:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Predefined Questions Manager</h1>
            <PredefinedQuestionsForm onSave={handleSave} />
            <PredefinedQuestionsList questions={questions} onDelete={handleDelete} />
        </div>
    );
};

export default AdminPredefinedQuestions;
