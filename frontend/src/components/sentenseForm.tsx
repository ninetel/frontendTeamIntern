
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/predefinedQuestions`
});
const SentenseForm = ({ sentences, onSave }) => {
    const [currentSentence, setCurrentSentence] = useState('');
    const [sentence, setSentence] = useState<any>([]);

    const getSentence = async () => {
        try {
            const response = await api.get('/');
            setSentence(response.data.sentences);
            console.log(response.data.sentences)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getSentence()
    }, []);

    const handleSentenceSubmit = async (e) => {
        e.preventDefault();
        // const newSentences = [...sentences, currentSentence];
        // onSave(newSentences);
        setCurrentSentence('');
        // console.log(newSentences)

        try {
            await api.post('/', {currentSentence});
        } catch (error) {
            console.log(error)
        }
    };

    const handDeleteSentence = async (id: any) => {
        // const newSentences = sentences.filter((_, i) => i !== index);
        // onSave(newSentences);
        try {
            await api.delete(`/${id}`);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="flex flex-col space-y-2">
            <form onSubmit={handleSentenceSubmit} className="mb-4">
                <label>Add Sentence:</label>
                <input
                    type="text"
                    value={currentSentence}
                    onChange={(e) => setCurrentSentence(e.target.value)}
                    className="border px-2 py-1 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2">
                    Add Sentence
                </button>
            </form>
            <div>
                <h4>Sentences:</h4>
                {sentence && sentence.map((item: any, i: any) => (
                    <div key={i} className="flex justify-between space-y-1 items-center">
                        <p>{item}</p>
                        <button
                            onClick={() => handDeleteSentence(item._id)}
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

export default SentenseForm;

