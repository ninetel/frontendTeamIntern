
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionManagerForm from '../../questionManagerForm';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/predefinedQuestions`
});

const PredefinedQuestionsForm = ({ onSave }) => {
    const [name, setName] = useState('');
    const [savedName, setSavedName] = useState([]);
    // const [isNameSaved, setIsNameSaved] = useState(false);

    const changeValue = (e) => {
        setName(e.target.value);
    };

    const handleNameSubmit = async (e) => {
        // console.log(name)
        e.preventDefault();
        const newEntry = { name, sentences: [], urls: [] };
        setSavedName([...savedName, newEntry]);
        setName(''); // Clear name input after saving
        try {
            await api.post('/', {name}); 
        } catch (error) {
            console.error('Error saving predefined question:', error);
        }
    };

    const handleSentenceChange = (index, newSentences) => {
        setSavedName((prev) =>
            prev.map((entry, i) => (i === index ? { ...entry, sentences: newSentences } : entry))
        );
    };

    const handleUrlChange = (index, newUrls) => {
        setSavedName((prev) =>
            prev.map((entry, i) => (i === index ? { ...entry, urls: newUrls } : entry))
        );
    };

    return (
        <div>
            <form onSubmit={handleNameSubmit} className="mb-4">
                <div className="mb-2">
                    <label className="block mb-1">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={changeValue}
                        className="border px-2 py-1 w-full"
                        required
                    />
                </div>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-4">
                    Save Name
                </button>
            </form>

            <div className="flex flex-col space-y-2">
                {savedName.map((entry, index) => (
                    <QuestionManagerForm
                        key={index}
                        index={index}
                        entry={entry}
                        onSave={onSave}
                        // isNameSaved={isNameSaved}
                        savedName={savedName}
                        setSavedName={setSavedName}
                        handleSentenceChange={handleSentenceChange}
                        handleUrlChange={handleUrlChange}
                    />
                ))}
            </div>
        </div>
    );
};

// export default PredefinedQuestionsForm;


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
