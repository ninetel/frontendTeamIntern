import React from 'react';

const PredefinedQuestionsItem = ({ question, onEdit, onDelete }) => {
    return (
        <div>
            <h3>{question.name}</h3>
            <ul>
                {question.sentences.map((sentence, index) => (
                    <li key={index}>{sentence}</li>
                ))}
            </ul>
            <ul>
                {question.urls.map((url, index) => (
                    <li key={index}>{url}</li>
                ))}
            </ul>
            <button onClick={() => onEdit(question)}>Edit</button>
            <button onClick={() => onDelete(question._id)}>Delete</button>
        </div>
    );
};

export default PredefinedQuestionsItem;
