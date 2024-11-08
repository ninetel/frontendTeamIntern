import React from 'react';
import PredefinedQuestionsItem from './PredefinedQuestionsItem';

const PredefinedQuestionsList = ({ questions, onEdit, onDelete }) => {
    return (
        <div>
            {questions.map((question) => (
                <PredefinedQuestionsItem
                    key={question._id}
                    question={question}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default PredefinedQuestionsList;
