import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [editUrlId, setEditUrlId] = useState(null);
    const [editUrlValue, setEditUrlValue] = useState('');
    const [subcategoryNames, setSubcategoryNames] = useState({});
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState('');
    const [editSubcategoryId, setEditSubcategoryId] = useState(null);
    const [editSubcategoryName, setEditSubcategoryName] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`);
        setCategories(response.data);
    };

    const addCategory = async () => {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/categories/add`, { name: categoryName });
        setCategories([...categories, response.data]);
        setCategoryName('');
    };

    const addSubcategory = async (categoryId) => {
        const subcategoryName = subcategoryNames[categoryId] || '';
        if (subcategoryName.trim() === '') return;
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/categories/${categoryId}/subcategory`, { name: subcategoryName });
        setCategories(categories.map(cat => (cat._id === categoryId ? response.data : cat)));
        setSubcategoryNames(prevState => ({ ...prevState, [categoryId]: '' }));
    };

    const editCategory = async (categoryId) => {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/categories/${categoryId}`, { name: editCategoryName });
        setCategories(categories.map(cat => (cat._id === categoryId ? response.data : cat)));
        setEditCategoryId(null);
        setEditCategoryName('');
    };

    const deleteCategory = async (categoryId) => {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/categories/${categoryId}`);
        setCategories(categories.filter(cat => cat._id !== categoryId));
    };

    const deleteSubcategory = async (categoryId, subCategoryId) => {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/categories/${categoryId}/subcategory/${subCategoryId}`);
        setCategories(categories.map(cat => (cat._id === categoryId ? response.data : cat)));
    };

    const addOrUpdateUrl = async (categoryId) => {
        const url = editUrlValue.trim();
        if (url === '') return;
    
        try {
            let response;
            if (editUrlId) {
                // Update existing URL
                response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/categories/${categoryId}/url/${editUrlId}`, { url });
            } else {
                // Add new URL
                response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/categories/${categoryId}/url`, { url });
            }
            setCategories(categories.map(cat => (cat._id === categoryId ? response.data : cat)));
        } catch (error) {
            console.error("Error updating/adding URL:", error);
        } finally {
            // Reset input and editing state
            setEditUrlId(null);
            setEditUrlValue('');
        }
    };

    const deleteUrl = async (categoryId, urlId) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/categories/${categoryId}/url/${urlId}`);
            setCategories(categories.map(cat => (cat._id === categoryId ? response.data : cat)));
        } catch (error) {
            console.error("Error deleting URL:", error);
        }
    };
    

    const handleEditUrl = (urlItem) => {
        setEditUrlId(urlItem._id);
        setEditUrlValue(urlItem.url);
    };

    

    const handleEditSubcategory = (subcategory) => {
        setEditSubcategoryId(subcategory._id);
        setEditSubcategoryName(subcategory.name);
    };

    const updateSubcategory = async (categoryId) => {
        if (!editSubcategoryId) return;

        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/categories/${categoryId}/subcategory/${editSubcategoryId}`, { name: editSubcategoryName });
        setCategories(categories.map(cat => (cat._id === categoryId ? response.data : cat)));
        setEditSubcategoryId(null);
        setEditSubcategoryName('');
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ marginBottom: '20px' }}>Category Manager</h1>

            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="New Category Name"
                    style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <button onClick={addCategory} style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#28a745', color: 'white' }}>Add Category</button>
            </div>

            <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                {categories.map(category => (
                    <li key={category._id} style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
                        <h2 style={{ margin: '0' }}>{category.name}</h2>
                        <div style={{ marginBottom: '10px' }}>
                            <button onClick={() => { setEditCategoryId(category._id); setEditCategoryName(category.name); }} style={{ marginRight: '10px' }}>Edit</button>
                            <button onClick={() => deleteCategory(category._id)} style={{ backgroundColor: '#dc3545', color: 'white' }}>Delete Category</button>
                        </div>

                        <h4>URLs</h4>
                        <input
                            type="text"
                            value={editUrlValue}
                            onChange={(e) => setEditUrlValue(e.target.value)}
                            placeholder="Add/Edit URL"
                            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                        <button onClick={() => addOrUpdateUrl(category._id)} style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#28a745', color: 'white' }}>
                            {editUrlId ? 'Update URL' : 'Add URL'}
                        </button>

                        {/* Display Saved URLs */}
                        <ul style={{ listStyleType: 'none', paddingLeft: '0', marginTop: '10px' }}>
                            {category.urls && category.urls.map((url, index) => (
                                <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ flex: 1 }}>{url}</span>
                                    <div>
                                        <button onClick={() => handleEditUrl(url, index)} style={{ marginRight: '10px' }}>Edit</button>
                                        <button onClick={() => deleteUrl(category._id, index)} style={{ backgroundColor: '#dc3545', color: 'white' }}>Delete URL</button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <ul style={{ listStyleType: 'none', paddingLeft: '0', marginTop: '10px' }}>
                            {category.subcategories.map(subcategory => (
                                <li key={subcategory._id} style={{ marginBottom: '15px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        {/* {editSubcategoryId === subcategory._id ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={editSubcategoryName}
                                                    onChange={(e) => setEditSubcategoryName(e.target.value)}
                                                    style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                                />
                                                <button onClick={() => updateSubcategory(category._id)}>Save</button>
                                            </>
                                        ) : (
                                            <>
                                                <span>{subcategory.name}</span>
                                                <div>
                                                    <button onClick={() => handleEditSubcategory(subcategory)} style={{ marginRight: '10px' }}>Edit</button>
                                                    <button onClick={() => deleteSubcategory(category._id, subcategory._id)} style={{ backgroundColor: '#dc3545', color: 'white' }}>Delete</button>
                                                </div>
                                            </>
                                        )} */}
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <h4>Subcategories</h4>
                        <input
                            type="text"
                            value={subcategoryNames[category._id] || ''}
                            onChange={(e) => setSubcategoryNames(prev => ({ ...prev, [category._id]: e.target.value }))}
                            placeholder="New Subcategory Name"
                            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                        <button onClick={() => addSubcategory(category._id)} style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#28a745', color: 'white' }}>Add Subcategory</button>

                        <ul style={{ listStyleType: 'none', paddingLeft: '0', marginTop: '10px' }}>
                            {category.subcategories.map(subcategory => (
                                <li key={subcategory._id} style={{ marginBottom: '15px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        {editSubcategoryId === subcategory._id ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={editSubcategoryName}
                                                    onChange={(e) => setEditSubcategoryName(e.target.value)}
                                                    style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                                />
                                                <button onClick={() => updateSubcategory(category._id)}>Save</button>
                                            </>
                                        ) : (
                                            <>
                                                <span>{subcategory.name}</span>
                                                <div>
                                                    <button onClick={() => handleEditSubcategory(subcategory)} style={{ marginRight: '10px' }}>Edit</button>
                                                    <button onClick={() => deleteSubcategory(category._id, subcategory._id)} style={{ backgroundColor: '#dc3545', color: 'white' }}>Delete</button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryManagement;
