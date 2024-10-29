// models/Content.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' }, // Optional
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

const Content = mongoose.model('Content', PostSchema);

module.exports = Content;
