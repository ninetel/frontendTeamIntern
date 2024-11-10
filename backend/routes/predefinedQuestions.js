const express = require('express');
const router = express.Router();
const PredefinedQuestions = require('../models/PreDefinedQuestions'); // Adjust the path to your model

// Create a new predefined question
router.post('/', async (req, res) => {
    try {
        const { name, sentences, urls } = req.body;
        const newPredefinedQuestion = new PredefinedQuestions({ name, sentences, urls });
        await newPredefinedQuestion.save();
        res.status(201).json(newPredefinedQuestion);
    console.log("hello",newPredefinedQuestion)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all predefined questions
router.get('/', async (req, res) => {
    try {
        const predefinedQuestions = await PredefinedQuestions.find();
        res.status(200).json(predefinedQuestions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a predefined question by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, sentences, urls } = req.body;

        const updatedPredefinedQuestion = await PredefinedQuestions.findByIdAndUpdate(
            id,
            { name, sentences, urls },
            { new: true, runValidators: true }
        );

        if (!updatedPredefinedQuestion) {
            return res.status(404).json({ message: 'Predefined question not found' });
        }

        res.status(200).json(updatedPredefinedQuestion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a predefined question by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPredefinedQuestion = await PredefinedQuestions.findByIdAndDelete(id);

        if (!deletedPredefinedQuestion) {
            return res.status(404).json({ message: 'Predefined question not found' });
        }

        res.status(200).json({ message: 'Predefined question deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
