const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the PredefinedQuestions model
const predefinedQuestionsSchema = new Schema({
    name: {
        type: String,
        required: true, // The name of the topic is required
    },
    sentences: {
        type: [String], // An array of strings to store the sentences
        required: true, // The list of sentences is required
    },
    urls: {
        type: [String], // An array of URLs
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
