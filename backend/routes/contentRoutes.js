const express = require('express');
const Category = require('../models/Category'); // Assuming Category model is updated as per the new structure
const router = express.Router();

// Create a new title and content under a specific subcategory
router.post('/:categoryId/subcategories/:subcategoryId/items', async (req, res) => {
    try {
        const { title, content } = req.body;
        const { categoryId, subcategoryId } = req.params;

        // Find the category
        const category = await Category.findById(categoryId);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        // Find the subcategory
        const subcategory = category.subcategories.id(subcategoryId);
        if (!subcategory) return res.status(404).json({ message: 'Subcategory not found' });

        // Add new title and content to the subcategory
        subcategory.items.push({ title, content });
        await category.save();
        res.status(201).json(subcategory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Edit title and content by ID
router.put('/:categoryId/subcategories/:subcategoryId/items/:itemId', async (req, res) => {
    try {
        const { categoryId, subcategoryId, itemId } = req.params;
        const { title, content } = req.body;

        // Find the category
        const category = await Category.findById(categoryId);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        // Find the subcategory
        const subcategory = category.subcategories.id(subcategoryId);
        if (!subcategory) return res.status(404).json({ message: 'Subcategory not found' });

        // Find the item to update
        const item = subcategory.items.id(itemId);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        // Update title and content
        item.title = title;
        item.content = content;
        await category.save();
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// // Delete title and content by ID
// router.delete('/:categoryId/subcategories/:subcategoryId/items/:itemId', async (req, res) => {
//     try {
//         const { categoryId, subcategoryId, itemId } = req.params;

//         // Find the category
//         const category = await Category.findById(categoryId);
//         if (!category) return res.status(404).json({ message: 'Category not found' });

//         // Find the subcategory
//         const subcategory = category.subcategories.id(subcategoryId);
//         if (!subcategory) return res.status(404).json({ message: 'Subcategory not found' });

//         // Find the item to delete
//         const item = subcategory.items.id(itemId);
//         if (!item) return res.status(404).json({ message: 'Item not found' });

//         // Remove the item from the subcategory
//         item.remove();
//         await category.save();
//         res.status(204).send(); // No content
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });
// Delete title and content by ID
router.delete('/:categoryId/subcategories/:subcategoryId/items/:itemId', async (req, res) => {
    try {
        const { categoryId, subcategoryId, itemId } = req.params;

        // Find the category
        const category = await Category.findById(categoryId);
        if (!category) {
            console.error('Category not found');
            return res.status(404).json({ message: 'Category not found' });
        }

        // Find the subcategory
        const subcategory = category.subcategories.id(subcategoryId);
        if (!subcategory) {
            console.error('Subcategory not found');
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        // Find the item to delete
        const item = subcategory.items.id(itemId);
        if (!item) {
            console.error('Item not found');
            return res.status(404).json({ message: 'Item not found' });
        }

        // Remove the item from the subcategory
        subcategory.items.pull(itemId);
        await category.save();
        res.status(204).send(); // No content
    } catch (err) {
        console.error('Error in DELETE request:', err);
        res.status(500).json({ error: err.message });
    }
});

// Get all titles and contents under a specific category
router.get('/:categoryId/subcategories/:subcategoryId/items', async (req, res) => {
    try {
        const { categoryId, subcategoryId } = req.params;

        // Find the category
        const category = await Category.findById(categoryId).populate('subcategories.items');
        if (!category) return res.status(404).json({ message: 'Category not found' });

        // Find the subcategory
        const subcategory = category.subcategories.id(subcategoryId);
        if (!subcategory) return res.status(404).json({ message: 'Subcategory not found' });

        res.json(subcategory.items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get content by item ID
router.get('/:categoryId/subcategories/:subcategoryId/items/:itemId', async (req, res) => {
    try {
        const { categoryId, subcategoryId, itemId } = req.params;

        // Find the category
        const category = await Category.findById(categoryId);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        // Find the subcategory
        const subcategory = category.subcategories.id(subcategoryId);
        if (!subcategory) return res.status(404).json({ message: 'Subcategory not found' });

        // Find the item by ID
        const item = subcategory.items.id(itemId);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
