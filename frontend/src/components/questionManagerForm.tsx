'use client'

import React, { useEffect, useState } from 'react';
import SentenseForm from './sentenseForm';
import UrlForm from './urlForm';
import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/predefinedQuestions`
});

const QuestionManagerForm = ({
    entry,
    handleSentenceChange,
    handleUrlChange,
    index,
    onSave,
    // isNameSaved,
    savedName,
    setSavedName,
}) => {

    const [questions, setQuestions] = useState<any>([]);

    const fetchQuestions = async () => {
        try {
            const response = await api.get('/');
            // console.log("getting data are:::",response)
            setQuestions(response?.data);
        } catch (error) {
            console.error('Error fetching predefined questions:', error);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const handleDeleteName = async (index: any) => {
        // console.log(index)
        try {
            await api.delete(`/${index}`);
            fetchQuestions();
        } catch (error) {
            console.error('Error deleting predefined question:', error);
        }
    };
    return (
        <div className="flex flex-col border drop-shadow-sm rounded-md p-5">
            {
                questions && (
                    <div className="flex flex-col space-y-2">
                        <div className='flex justify-between w-full items-center mb-2'>
                            <div className='flex space-x-1'>
                                <h4 className="text-md font-semibold">Name:</h4>
                                <p>{questions[index]?.name}</p>
                            </div>
                            <button
                                onClick={() => handleDeleteName(questions[index]?._id)}
                                className="bg-red-500 text-white px-2 py-1"
                            >
                                Delete
                            </button>
                        </div>
                        <div className='flex flex-col space-y-4'>
                            <SentenseForm
                                sentences={entry.sentences}
                                onSave={(newSentences) => handleSentenceChange(index, newSentences)}
                            />
                            <UrlForm
                                urls={entry.urls}
                                onSave={(newUrls) => handleUrlChange(index, newUrls)}
                            />
                        </div>
                    </div>
                )}
        </div>
    );
};

export default QuestionManagerForm;
