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
    // console.log("hello",newPredefinedQuestion)
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


// Add a new sentence to a predefined question by its name
router.post('/:name/sentence', async (req, res) => {
    try {
        const { name } = req.params;
        const { sentence } = req.body;

        const predefinedQuestion = await PredefinedQuestions.findOne({ name });
        if (!predefinedQuestion) {
            return res.status(404).json({ message: 'Predefined question not found' });
        }

        predefinedQuestion.sentences.push(sentence);
        await predefinedQuestion.save();

        res.status(201).json(predefinedQuestion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// // Add a new URL to a predefined question by its name
// router.post('/:name/url', async (req, res) => {
//     try {
//         const { name } = req.params;
//         const { url } = req.body;
//         console.log("abdd")
//         const predefinedQuestion = await PredefinedQuestions.findOne({ name });
//         if (!predefinedQuestion) {
//             return res.status(404).json({ message: 'Predefined question not found' });
//         }

//         predefinedQuestion.urls.push(url);
//         await predefinedQuestion.save();

//         res.status(201).json(predefinedQuestion);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });
// Add a new URL to a predefined question by its name
router.post('/:name/url', async (req, res) => {
    try {
        const { name } = req.params;  // Retrieve the predefined question's name
        const { url } = req.body;     // Retrieve the new URL from the request body
        
        // Find the predefined question by its name
        const predefinedQuestion = await PredefinedQuestions.findOne({ name });
        
        if (!predefinedQuestion) {
            return res.status(404).json({ message: 'Predefined question not found' });
        }

        // Add the new URL to the array of URLs
        predefinedQuestion.urls.push(url);

        // Save the updated predefined question
        await predefinedQuestion.save();

        // Return the updated predefined question with the new URL
        res.status(201).json(predefinedQuestion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Add a new URL to a predefined question by its ID
router.post('/addurl', async (req, res) => {
    try {
        const { id } = req.body; // Get the predefined question ID from the URL
        const { url } = req.body;  // Get the new URL from the request body

        // console.log("Received ID:", id);
        // console.log("Adding URL:", url);

        // Find the predefined question by its ID in the database
        const predefinedQuestion = await PredefinedQuestions.findById(id);

        if (!predefinedQuestion) {
            return res.status(404).json({ message: 'Predefined question not found' });
        }

        // Push the new URL to the 'urls' array
        predefinedQuestion.urls.push(url);

        // Save the updated predefined question document
        await predefinedQuestion.save();

        // Return the updated predefined question with the new URL
        res.status(201).json(predefinedQuestion);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Get all sentences and URLs of a predefined question by its name
router.get('/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const predefinedQuestion = await PredefinedQuestions.findOne({ name });

        if (!predefinedQuestion) {
            return res.status(404).json({ message: 'Predefined question not found' });
        }

        res.status(200).json({
            sentences: predefinedQuestion.sentences,
            urls: predefinedQuestion.urls,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a sentence of a predefined question by its name
router.put('/:name/sentence/:index', async (req, res) => {
    try {
        const { name, index } = req.params;
        const { newSentence } = req.body;

        const predefinedQuestion = await PredefinedQuestions.findOne({ name });
        if (!predefinedQuestion) {
            return res.status(404).json({ message: 'Predefined question not found' });
        }

        if (index < 0 || index >= predefinedQuestion.sentences.length) {
            return res.status(404).json({ message: 'Sentence not found' });
        }

        predefinedQuestion.sentences[index] = newSentence;
        await predefinedQuestion.save();

        res.status(200).json(predefinedQuestion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a URL of a predefined question by its name
router.put('/:name/url/:index', async (req, res) => {
    try {
        const { name, index } = req.params;
        const { newUrl } = req.body;

        const predefinedQuestion = await PredefinedQuestions.findOne({ name });
        if (!predefinedQuestion) {
            return res.status(404).json({ message: 'Predefined question not found' });
        }

        if (index < 0 || index >= predefinedQuestion.urls.length) {
            return res.status(404).json({ message: 'URL not found' });
        }

        predefinedQuestion.urls[index] = newUrl;
        await predefinedQuestion.save();

        res.status(200).json(predefinedQuestion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a sentence from a predefined question by its name
router.delete('/:name/sentence/:index', async (req, res) => {
    try {
        const { name, index } = req.params;

        const predefinedQuestion = await PredefinedQuestions.findOne({ name });
        if (!predefinedQuestion) {
            return res.status(404).json({ message: 'Predefined question not found' });
        }

        if (index < 0 || index >= predefinedQuestion.sentences.length) {
            return res.status(404).json({ message: 'Sentence not found' });
        }

        predefinedQuestion.sentences.splice(index, 1);
        await predefinedQuestion.save();

        res.status(200).json(predefinedQuestion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a URL from a predefined question by its name
router.delete('/:name/url/:index', async (req, res) => {
    try {
        const { name, index } = req.params;

        const predefinedQuestion = await PredefinedQuestions.findOne({ name });
        if (!predefinedQuestion) {
            return res.status(404).json({ message: 'Predefined question not found' });
        }

        if (index < 0 || index >= predefinedQuestion.urls.length) {
            return res.status(404).json({ message: 'URL not found' });
        }

        predefinedQuestion.urls.splice(index, 1);
        await predefinedQuestion.save();

        res.status(200).json(predefinedQuestion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




module.exports = router;
