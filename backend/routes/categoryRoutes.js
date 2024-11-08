
const express = require('express');
const Category = require('../models/Category');
const router = express.Router();

// Add Category
router.post('/add', async (req, res) => {
    try {
        const newCategory = new Category({
            name: req.body.name,
            urls: req.body.urls || [], // Accept URLs
            subcategories: [],
        });
        await newCategory.save();
        res.json(newCategory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add Subcategory
router.post('/:categoryId/subcategory', async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId);
        category.subcategories.push({ name: req.body.name });
        await category.save();
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Edit Category
router.put('/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name, urls: req.body.urls }, // Update URLs as well
            { new: true }
        );
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// GET contents based on categoryId and subcategoryId
router.get('/:categoryId/subcategories/:subcategoryId/items', async (req, res) => {
    try {
        const { categoryId, subcategoryId } = req.params;

        // Find the category and subcategory by their IDs
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Find the subcategory within the category
        const subcategory = category.subcategories.id(subcategoryId);
        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        // Return the items within the subcategory
        res.json(subcategory.items); // Assuming subcategory contains an array of items
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:categoryId/subcategories', async (req, res) => {
    try {
        const { categoryId } = req.params;
        
        // Fetch subcategories that match the provided category ID
        const subcategories = await Category.find({ categoryId });

        // If no subcategories are found, send an empty array
        if (!subcategories.length) {
            return res.status(404).json([]);
        }

        // Return the found subcategories
        return res.json(subcategories);
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Add URL to Category
// router.post('/:categoryId/url', async (req, res) => {
//     try {
//         const category = await Category.findById(req.params.categoryId);
//         if (!category) return res.status(404).json({ error: "Category not found" });

//         category.urls.push(req.body.url); // Add URL to the category
//         await category.save();
//         res.json(category);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });
// router.post('/:categoryId/url', async (req, res) => {
//     try {
//         const { categoryId } = req.params;
//         const { url } = req.body;

//         const category = await Category.findById(categoryId);
//         if (!category) return res.status(404).json({ message: 'Category not found' });

//         category.urls.push(url);
//         await category.save();

//         res.status(200).json(category);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });
// Add URL to Category
router.post('/:categoryId/url', async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId);
        if (!category) return res.status(404).json({ error: "Category not found" });

        const { url } = req.body; // Destructure url
        category.urls.push(url); // Add new URL to the array
        await category.save();
        res.status(201).json(category); // Set status to 201 Created
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Edit URL in Category
router.put('/:categoryId/url/:urlIndex', async (req, res) => {
    try {
        const { categoryId, urlIndex } = req.params;
        const { url } = req.body;

        const category = await Category.findById(categoryId);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        if (urlIndex >= category.urls.length) return res.status(400).json({ message: 'Invalid URL index' });

        category.urls[urlIndex] = url; // Update URL
        await category.save();

        res.status(200).json(category); // Return updated category
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Edit URL in Category
// router.put('/:categoryId/url/:urlId', async (req, res) => {
//     try {
//         const category = await Category.findById(req.params.categoryId);
//         if (!category) return res.status(404).json({ error: "Category not found" });

//         const urlIndex = category.urls.indexOf(req.params.urlId);
//         if (urlIndex === -1) return res.status(404).json({ error: "URL not found" });

//         // Update the URL
//         category.urls[urlIndex] = req.body.url;
//         await category.save();
//         res.json(category);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });
// router.put('/:categoryId/url/:urlIndex', async (req, res) => {
//     try {
//         const { categoryId, urlIndex } = req.params;
//         const { url } = req.body;

//         const category = await Category.findById(categoryId);
//         if (!category) return res.status(404).json({ message: 'Category not found' });

//         if (urlIndex >= category.urls.length) return res.status(400).json({ message: 'Invalid URL index' });

//         category.urls[urlIndex] = url;
//         await category.save();

//         res.status(200).json(category);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// Delete Category
// router.delete('/:categoryId/url/:urlIndex', async (req, res) => {
//     try {
//         const { categoryId, urlIndex } = req.params;

//         const category = await Category.findById(categoryId);
//         if (!category) return res.status(404).json({ message: 'Category not found' });

//         if (urlIndex >= category.urls.length) return res.status(400).json({ message: 'Invalid URL index' });

//         category.urls.splice(urlIndex, 1); // Remove the URL at urlIndex
//         await category.save();

//         res.status(200).json(category);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });
router.delete('/:categoryId', async (req, res) => {
    try {
        const { categoryId } = req.params;

        const category = await Category.findByIdAndDelete(categoryId);
        if (!category) return res.status(404).json({ message: 'Category not found' });


        // If the category is found and deleted, return a success message
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete URL from Category
router.delete('/:categoryId/url/:urlId', async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId);
        if (!category) return res.status(404).json({ error: "Category not found" });

        category.urls = category.urls.filter(url => url !== req.params.urlId); // Remove the URL
        await category.save();
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Edit Subcategory
router.put('/:categoryId/subcategory/:subCategoryId', async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId);
        if (!category) return res.status(404).json({ error: "Category not found" });

        const subcategory = category.subcategories.id(req.params.subCategoryId);
        if (!subcategory) return res.status(404).json({ error: "Subcategory not found" });

        // Update subcategory name
        subcategory.name = req.body.name;
        await category.save();
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE Subcategory
router.delete('/:categoryId/subcategory/:subcategoryId', async (req, res) => {
    const { categoryId, subcategoryId } = req.params;

    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Remove subcategory from the category's subcategories array
        category.subcategories = category.subcategories.filter(sub => sub._id.toString() !== subcategoryId);
        await category.save();

        res.status(200).json(category); // Return the updated category
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
// Get all Categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
