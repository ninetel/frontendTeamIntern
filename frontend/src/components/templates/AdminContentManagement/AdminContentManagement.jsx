import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContentManager = () => {
    const [contents, setContents] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editContentId, setEditContentId] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`);
        setCategories(response.data);
    };

    const fetchContents = async (categoryId, subcategoryId) => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/categories/${categoryId}/subcategories/${subcategoryId}/items`);
        setContents(response.data);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategoryId(e.target.value);
        setSelectedSubcategoryId('');
        setContents([]);
    };

    const handleSubcategoryChange = (e) => {
        const selectedId = e.target.value;
        setSelectedSubcategoryId(selectedId);
        if (selectedId) {
            fetchContents(selectedCategoryId, selectedId);
        } else {
            setContents([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editContentId) {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/contents/${selectedCategoryId}/subcategories/${selectedSubcategoryId}/items/${editContentId}`, { title, content });
        } else {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/contents/${selectedCategoryId}/subcategories/${selectedSubcategoryId}/items`, { title, content });
        }
        resetForm();
        fetchContents(selectedCategoryId, selectedSubcategoryId);
    };

    const handleEdit = (content) => {
        setEditContentId(content._id);
        setTitle(content.title);
        setContent(content.content);
    };

    const handleDelete = async (contentId) => {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/contents/${selectedCategoryId}/subcategories/${selectedSubcategoryId}/items/${contentId}`);
        fetchContents(selectedCategoryId, selectedSubcategoryId);
    };

    const resetForm = () => {
        setTitle('');
        setContent('');
        setEditContentId(null);
    };

    return (
        <div className="max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Manage Contents</h2>

            <div className="space-y-4">
                <select
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedCategoryId}
                    onChange={handleCategoryChange}
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                {selectedCategoryId && (
                    <select
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedSubcategoryId}
                        onChange={handleSubcategoryChange}
                        required
                    >
                        <option value="">Select Subcategory</option>
                        {categories.find((category) => category._id === selectedCategoryId)?.subcategories.map((subcategory) => (
                            <option key={subcategory._id} value={subcategory._id}>
                                {subcategory.name}
                            </option>
                        ))}
                    </select>
                )}

                {selectedSubcategoryId && (
                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-700">Add New Content</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Title"
                                required
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Content"
                                required
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                            >
                                {editContentId ? 'Update Content' : 'Add Content'}
                            </button>
                        </form>
                        
                        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-700">Contents</h3>
                        <ul className="space-y-4">
                            {contents.map((content) => (
                                <li key={content._id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                                    <h4 className="text-lg font-semibold text-gray-800">{content.title}</h4>
                                    <p className="text-gray-600 mt-2">{content.content}</p>
                                    <div className="flex space-x-4 mt-3">
                                        <button
                                            onClick={() => handleEdit(content)}
                                            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-300"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(content._id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContentManager;
