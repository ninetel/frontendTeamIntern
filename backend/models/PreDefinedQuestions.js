const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the PredefinedQuestions model
const predefinedQuestionsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    sentences: {
        type: [String], // An array of strings to store the sentences
        required: true,
    },
    urls: {
        type: [String], // An array of URLs
        required: true,
        validate: {
            validator: function(v) {
                // Each URL must be valid if provided
                return v.every(url => /^https?:\/\/\S+\.\S+$/.test(url));
            },
            message: props => `One or more URLs are not valid!`
        },
    }
}, { timestamps: true });

// Create the model from the schema
const PredefinedQuestions = mongoose.model('PredefinedQuestions', predefinedQuestionsSchema);

module.exports = PredefinedQuestions;
