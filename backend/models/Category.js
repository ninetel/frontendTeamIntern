const mongoose = require('mongoose');

const TitleContentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
});

const SubcategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    items: [TitleContentSchema], // Array of title and content objects
});

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    urls: { type: [String], default: [] }, // Array of URLs
    subcategories: [SubcategorySchema],
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
