
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import QuestionManagerForm from '../../questionManagerForm';

// const api = axios.create({
//     baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/predefinedQuestions`
// });

// const PredefinedQuestionsForm = ({ onSave }) => {
//     const [name, setName] = useState('');
//     const [savedName, setSavedName] = useState([]);
//     // const [isNameSaved, setIsNameSaved] = useState(false);

//     const changeValue = (e) => {
//         setName(e.target.value);
//     };

//     const handleNameSubmit = async (e) => {
//         // console.log(name)
//         e.preventDefault();
//         const newEntry = { name, sentences: [], urls: [] };
//         setSavedName([...savedName, newEntry]);
//         setName(''); // Clear name input after saving
//         try {
//             await api.post('/', {name}); 
//         } catch (error) {
//             console.error('Error saving predefined question:', error);
//         }
//     };

//     const handleSentenceChange = (index, newSentences) => {
//         setSavedName((prev) =>
//             prev.map((entry, i) => (i === index ? { ...entry, sentences: newSentences } : entry))
//         );
//     };

//     const handleUrlChange = (index, newUrls) => {
//         setSavedName((prev) =>
//             prev.map((entry, i) => (i === index ? { ...entry, urls: newUrls } : entry))
//         );
//     };

//     return (
//         <div>
//             <form onSubmit={handleNameSubmit} className="mb-4">
//                 <div className="mb-2">
//                     <label className="block mb-1">Name:</label>
//                     <input
//                         type="text"
//                         value={name}
//                         onChange={changeValue}
//                         className="border px-2 py-1 w-full"
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-4">
//                     Save Name
//                 </button>
//             </form>

//             <div className="flex flex-col space-y-2">
//                 {savedName.map((entry, index) => (
//                     <QuestionManagerForm
//                         key={index}
//                         index={index}
//                         entry={entry}
//                         onSave={onSave}
//                         // isNameSaved={isNameSaved}
//                         savedName={savedName}
//                         setSavedName={setSavedName}
//                         handleSentenceChange={handleSentenceChange}
//                         handleUrlChange={handleUrlChange}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

// // export default PredefinedQuestionsForm;


// const PredefinedQuestionsList = ({ questions, onDelete }) => {
//     return (
//         <div>
//             {questions.map((question) => (
//                 <div key={question._id} className="mb-4 p-4 border rounded shadow">
//                     <h3 className="text-lg font-semibold">{question.name}</h3>
//                     <button
//                         onClick={() => onDelete(question._id)}
//                         className="bg-red-500 text-white px-4 py-2 mt-2 mb-4"
//                     >
//                         Delete Name
//                     </button>
//                     <div>
//                         <h4 className="text-md font-semibold">Sentences:</h4>
//                         {question.sentences.map((sentence, index) => (
//                             <div key={index} className="flex justify-between items-center">
//                                 <p>{sentence}</p>
//                             </div>
//                         ))}
//                     </div>
//                     <div>
//                         <h4 className="text-md font-semibold">URLs:</h4>
//                         {question.urls.map((url, index) => (
//                             <div key={index} className="flex justify-between items-center">
//                                 <p>{url}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// const AdminPredefinedQuestions = () => {
//     const [questions, setQuestions] = useState([]);

//     const fetchQuestions = async () => {
//         try {
//             const response = await api.get('/');
//             setQuestions(response.data);
//         } catch (error) {
//             console.error('Error fetching predefined questions:', error);
//         }
//     };

//     useEffect(() => {
//         fetchQuestions();
//     }, []);

//     const handleSave = async (data) => {
//         try {
//             await api.post('/', data);
//             fetchQuestions();
//         } catch (error) {
//             console.error('Error saving predefined question:', error);
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             await api.delete(`/${id}`);
//             fetchQuestions();
//         } catch (error) {
//             console.error('Error deleting predefined question:', error);
//         }
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">Predefined Questions Manager</h1>
//             <PredefinedQuestionsForm onSave={handleSave} />
//             <PredefinedQuestionsList questions={questions} onDelete={handleDelete} />
//         </div>
//     );
// };

// export default AdminPredefinedQuestions;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const api = axios.create({
//     baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/predefinedQuestions`
// });

// const PredefinedQuestionsManager = () => {
//     const [name, setName] = useState('');
//     const [savedNames, setSavedNames] = useState([]);
//     const [editingIndex, setEditingIndex] = useState(-1);
//     const [newSentence, setNewSentence] = useState('');
//     const [newUrl, setNewUrl] = useState('');

//     useEffect(() => {
//         fetchQuestions();
//     }, []);

//     const fetchQuestions = async () => {
//         try {
//             const response = await api.get('/');
//             setSavedNames(response.data);
//         } catch (error) {
//             console.error('Error fetching predefined questions:', error);
//         }
//     };

//     const handleNameSubmit = async (e) => {
//         e.preventDefault();
//         const newEntry = { name, sentences: [], urls: [] };
//         try {
//             const response = await api.post('/', newEntry);
//             setSavedNames([...savedNames, response.data]);
//             setName('');
//         } catch (error) {
//             console.error('Error saving predefined question:', error);
//         }
//     };

//     const handleNameChange = (index, newName) => {
//         setSavedNames((prev) =>
//             prev.map((entry, i) => (i === index ? { ...entry, name: newName } : entry))
//         );
//     };

//     const handleEditName = (index) => {
//         setEditingIndex(index);
//     };

//     const handleSaveName = async (index, entry) => {
//         try {
//             await api.put(`/${entry._id}`, entry);
//             setEditingIndex(-1);
//         } catch (error) {
//             console.error('Error updating predefined question:', error);
//         }
//     };

//     const handleDeleteName = async (id, index) => {
//         try {
//             await api.delete(`/${id}`);
//             setSavedNames((prev) => prev.filter((_, i) => i !== index));
//         } catch (error) {
//             console.error('Error deleting predefined question:', error);
//         }
//     };

//     const handleSentenceChange = (index, newSentences) => {
//         setSavedNames((prev) =>
//             prev.map((entry, i) => (i === index ? { ...entry, sentences: newSentences } : entry))
//         );
//     };

//     const handleAddSentence = (index) => {
//         if (newSentence) {
//             handleSentenceChange(index, [...savedNames[index].sentences, newSentence]);
//             setNewSentence('');
//         }
//     };

//     const handleDeleteSentence = (index, sentenceIndex) => {
//         handleSentenceChange(index, savedNames[index].sentences.filter((_, i) => i !== sentenceIndex));
//     };

//     const handleUrlChange = (index, newUrls) => {
//         setSavedNames((prev) =>
//             prev.map((entry, i) => (i === index ? { ...entry, urls: newUrls } : entry))
//         );
//     };

//     const handleAddUrl = (index) => {
//         if (newUrl) {
//             handleUrlChange(index, [...savedNames[index].urls, newUrl]);
//             setNewUrl('');
//         }
//     };

//     const handleDeleteUrl = (index, urlIndex) => {
//         handleUrlChange(index, savedNames[index].urls.filter((_, i) => i !== urlIndex));
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">Predefined Questions Manager</h1>
//             <form onSubmit={handleNameSubmit} className="mb-4">
//                 <div className="mb-2">
//                     <label className="block mb-1">Name:</label>
//                     <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         className="border px-2 py-1 w-full"
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-4">
//                     Save Name
//                 </button>
//             </form>

//             <div className="flex flex-col space-y-2">
//                 {savedNames.map((entry, index) => (
//                     <div key={entry._id} className="p-4 border rounded shadow mb-4">
//                         <div className="flex justify-between items-center mb-2">
//                             {editingIndex === index ? (
//                                 <input
//                                     type="text"
//                                     value={entry.name}
//                                     onChange={(e) => handleNameChange(index, e.target.value)}
//                                     className="border px-2 py-1 w-full mr-2"
//                                 />
//                             ) : (
//                                 <p className="flex-1">{entry.name}</p>
//                             )}
//                             {editingIndex === index ? (
//                                 <button
//                                     onClick={() => handleSaveName(index, entry)}
//                                     className="bg-green-500 text-white px-4 py-2"
//                                 >
//                                     Save
//                                 </button>
//                             ) : (
//                                 <button
//                                     onClick={() => handleEditName(index)}
//                                     className="bg-yellow-500 text-white px-4 py-2"
//                                 >
//                                     Edit Name
//                                 </button>
//                             )}
//                             <button
//                                 onClick={() => handleDeleteName(entry._id, index)}
//                                 className="bg-red-500 text-white px-4 py-2 ml-2"
//                             >
//                                 Delete Name
//                             </button>
//                         </div>

//                         <div className="mb-2">
//                             <h4 className="text-md font-semibold">Sentences:</h4>
//                             <div className="flex items-center">
//                                 <input
//                                     type="text"
//                                     value={newSentence}
//                                     onChange={(e) => setNewSentence(e.target.value)}
//                                     className="border px-2 py-1 mr-2"
//                                     placeholder="Add a new sentence"
//                                 />
//                                 <button
//                                     onClick={() => handleAddSentence(index)}
//                                     className="bg-blue-500 text-white px-4 py-2 mt-2"
//                                 >
//                                     Add Sentence
//                                 </button>
//                             </div>
//                             {entry.sentences.map((sentence, sIndex) => (
//                                 <div key={sIndex} className="flex justify-between items-center mb-1">
//                                     <p className="flex-1">{sentence}</p>
//                                     <button
//                                         onClick={() => handleDeleteSentence(index, sIndex)}
//                                         className="bg-red-500 text-white px-2 py-1"
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                             ))}
                            
//                         </div>

//                         <div className="mb-2">
//                             <h4 className="text-md font-semibold">URLs:</h4>
//                             <div className="flex items-center">
//                                 <input
//                                     type="text"
//                                     value={newUrl}
//                                     onChange={(e) => setNewUrl(e.target.value)}
//                                     className="border px-2 py-1 mr-2"
//                                     placeholder="Add a new URL"
//                                 />
//                                 <button
//                                     onClick={() => handleAddUrl(index)}
//                                     className="bg-blue-500 text-white px-4 py-2 mt-2"
//                                 >
//                                     Add URL
//                                 </button>
//                             </div>
//                             {entry.urls.map((url, uIndex) => (
//                                 <div key={uIndex} className="flex justify-between items-center mb-1">
//                                     <p className="flex-1">{url}</p>
//                                     <button
//                                         onClick={() => handleDeleteUrl(index, uIndex)}
//                                         className="bg-red-500 text-white px-2 py-1"
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                             ))}
                            
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default PredefinedQuestionsManager;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const api = axios.create({
//     baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/predefinedQuestions`
// });

// const PredefinedQuestionsManager = () => {
//     const [name, setName] = useState('');
//     const [savedNames, setSavedNames] = useState([]);
//     const [editingIndex, setEditingIndex] = useState(-1);
//     const [newSentence, setNewSentence] = useState('');
//     const [newUrl, setNewUrl] = useState('');
    
//     // Fetch all predefined questions
//     useEffect(() => {
//         fetchQuestions();
//     }, []);

//     const fetchQuestions = async () => {
//         try {
//             const response = await api.get('/');
//             setSavedNames(response.data);
//         } catch (error) {
//             console.error('Error fetching predefined questions:', error);
//         }
//     };

//     // Handle the creation of a new predefined question
//     const handleNameSubmit = async (e) => {
//         e.preventDefault();
//         const newEntry = { name, sentences: [], urls: [] };
//         try {
//             const response = await api.post('/', newEntry);
//             setSavedNames([...savedNames, response.data]);
//             setName('');
//         } catch (error) {
//             console.error('Error saving predefined question:', error);
//         }
//     };

//     // Handle updating the name of a predefined question
//     const handleNameChange = (index, newName) => {
//         setSavedNames((prev) =>
//             prev.map((entry, i) => (i === index ? { ...entry, name: newName } : entry))
//         );
//     };

//     const handleEditName = (index) => {
//         setEditingIndex(index);
//     };

//     const handleSaveName = async (index, entry) => {
//         try {
//             const updatedEntry = await api.put(`/${entry._id}`, entry);
//             setSavedNames((prev) =>
//                 prev.map((item, i) => (i === index ? updatedEntry.data : item))
//             );
//             setEditingIndex(-1);
//         } catch (error) {
//             console.error('Error updating predefined question:', error);
//         }
//     };

//     // Handle deletion of a predefined question
//     const handleDeleteName = async (id, index) => {
//         try {
//             await api.delete(`/${id}`);
//             setSavedNames((prev) => prev.filter((_, i) => i !== index));
//         } catch (error) {
//             console.error('Error deleting predefined question:', error);
//         }
//     };

//     // Handle changes in sentences and updating them
//     const handleSentenceChange = (index, newSentences) => {
//         setSavedNames((prev) =>
//             prev.map((entry, i) => (i === index ? { ...entry, sentences: newSentences } : entry))
//         );
//     };

//     const handleAddSentence = (index) => {
//         if (newSentence) {
//             handleSentenceChange(index, [...savedNames[index].sentences, newSentence]);
//             setNewSentence('');
//         }
//     };

//     const handleDeleteSentence = (index, sentenceIndex) => {
//         handleSentenceChange(index, savedNames[index].sentences.filter((_, i) => i !== sentenceIndex));
//     };

//     // Handle changes in URLs and updating them
//     const handleUrlChange = (index, newUrls) => {
//         setSavedNames((prev) =>
//             prev.map((entry, i) => (i === index ? { ...entry, urls: newUrls } : entry))
//         );
//     };

//     const handleAddUrl = (index) => {
//         if (newUrl) {
//             handleUrlChange(index, [...savedNames[index].urls, newUrl]);
//             setNewUrl('');
//         }
//     };

//     const handleDeleteUrl = (index, urlIndex) => {
//         handleUrlChange(index, savedNames[index].urls.filter((_, i) => i !== urlIndex));
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">Predefined Questions Manager</h1>
//             <form onSubmit={handleNameSubmit} className="mb-4">
//                 <div className="mb-2">
//                     <label className="block mb-1">Name:</label>
//                     <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         className="border px-2 py-1 w-full"
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-4">
//                     Save Name
//                 </button>
//             </form>

//             <div className="flex flex-col space-y-2">
//                 {savedNames.map((entry, index) => (
//                     <div key={entry._id} className="p-4 border rounded shadow mb-4">
//                         <div className="flex justify-between items-center mb-2">
//                             {editingIndex === index ? (
//                                 <input
//                                     type="text"
//                                     value={entry.name}
//                                     onChange={(e) => handleNameChange(index, e.target.value)}
//                                     className="border px-2 py-1 w-full mr-2"
//                                 />
//                             ) : (
//                                 <p className="flex-1">{entry.name}</p>
//                             )}
//                             {editingIndex === index ? (
//                                 <button
//                                     onClick={() => handleSaveName(index, entry)}
//                                     className="bg-green-500 text-white px-4 py-2"
//                                 >
//                                     Save
//                                 </button>
//                             ) : (
//                                 <button
//                                     onClick={() => handleEditName(index)}
//                                     className="bg-yellow-500 text-white px-4 py-2"
//                                 >
//                                     Edit Name
//                                 </button>
//                             )}
//                             <button
//                                 onClick={() => handleDeleteName(entry._id, index)}
//                                 className="bg-red-500 text-white px-4 py-2 ml-2"
//                             >
//                                 Delete Name
//                             </button>
//                         </div>

//                         <div className="mb-2">
//                             <h4 className="text-md font-semibold">Sentences:</h4>
//                             {entry.sentences.map((sentence, sIndex) => (
//                                 <div key={sIndex} className="flex justify-between items-center mb-1">
//                                     <p className="flex-1">{sentence}</p>
//                                     <button
//                                         onClick={() => handleDeleteSentence(index, sIndex)}
//                                         className="bg-red-500 text-white px-2 py-1"
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                             ))}
//                             <div className="flex items-center">
//                                 <input
//                                     type="text"
//                                     value={newSentence}
//                                     onChange={(e) => setNewSentence(e.target.value)}
//                                     className="border px-2 py-1 mr-2"
//                                     placeholder="Add a new sentence"
//                                 />
//                                 <button
//                                     onClick={() => handleAddSentence(index)}
//                                     className="bg-blue-500 text-white px-4 py-2 mt-2"
//                                 >
//                                     Add Sentence
//                                 </button>
//                             </div>
//                         </div>

//                         <div className="mb-2">
//                             <h4 className="text-md font-semibold">URLs:</h4>
//                             {entry.urls.map((url, uIndex) => (
//                                 <div key={uIndex} className="flex justify-between items-center mb-1">
//                                     <p className="flex-1">{url}</p>
//                                     <button
//                                         onClick={() => handleDeleteUrl(index, uIndex)}
//                                         className="bg-red-500 text-white px-2 py-1"
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                             ))}
//                             <div className="flex items-center">
//                                 <input
//                                     type="text"
//                                     value={newUrl}
//                                     onChange={(e) => setNewUrl(e.target.value)}
//                                     className="border px-2 py-1 mr-2"
//                                     placeholder="Add a new URL"
//                                 />
//                                 <button
//                                     onClick={() => handleAddUrl(index)}
//                                     className="bg-blue-500 text-white px-4 py-2 mt-2"
//                                 >
//                                     Add URL
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default PredefinedQuestionsManager;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/predefinedQuestions`
});

const PredefinedQuestionsManager = () => {
    const [name, setName] = useState('');
    const [savedNames, setSavedNames] = useState([]);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [newSentence, setNewSentence] = useState('');
    const [newUrl, setNewUrl] = useState('');
    
    // Fetch all predefined questions
    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await api.get('/');
            setSavedNames(response.data);
        } catch (error) {
            console.error('Error fetching predefined questions:', error);
        }
    };

    // Handle the creation of a new predefined question
    const handleNameSubmit = async (e) => {
        e.preventDefault();
        const newEntry = { name, sentences: [], urls: [] };
        try {
            const response = await api.post('/', newEntry);
            setSavedNames([...savedNames, response.data]);
            setName('');
        } catch (error) {
            console.error('Error saving predefined question:', error);
        }
    };

    // Handle updating the name of a predefined question
    const handleNameChange = (index, newName) => {
        setSavedNames((prev) =>
            prev.map((entry, i) => (i === index ? { ...entry, name: newName } : entry))
        );
    };

    const handleEditName = (index) => {
        setEditingIndex(index);
    };

    const handleSaveName = async (index, entry) => {
        try {
            const updatedEntry = await api.put(`/${entry._id}`, entry);
            setSavedNames((prev) =>
                prev.map((item, i) => (i === index ? updatedEntry.data : item))
            );
            setEditingIndex(-1);
        } catch (error) {
            console.error('Error updating predefined question:', error);
        }
    };

    // Handle deletion of a predefined question
    const handleDeleteName = async (id, index) => {
        try {
            await api.delete(`/${id}`);
            setSavedNames((prev) => prev.filter((_, i) => i !== index));
        } catch (error) {
            console.error('Error deleting predefined question:', error);
        }
    };

    // Handle changes in sentences and updating them
    const handleSentenceChange = (index, newSentences) => {
        setSavedNames((prev) =>
            prev.map((entry, i) => (i === index ? { ...entry, sentences: newSentences } : entry))
        );
    };

    const handleAddSentence = async (index) => {
        if (newSentence) {
            const updatedSentences = [...savedNames[index].sentences, newSentence];
            try {
                const updatedEntry = await api.put(`/${savedNames[index]._id}`, {
                    ...savedNames[index],
                    sentences: updatedSentences,
                });
                setSavedNames((prev) =>
                    prev.map((entry, i) => (i === index ? updatedEntry.data : entry))
                );
                setNewSentence('');
            } catch (error) {
                console.error('Error adding sentence:', error);
            }
        }
    };

    const handleDeleteSentence = async (index, sentenceIndex) => {
        const updatedSentences = savedNames[index].sentences.filter((_, i) => i !== sentenceIndex);
        try {
            const updatedEntry = await api.put(`/${savedNames[index]._id}`, {
                ...savedNames[index],
                sentences: updatedSentences,
            });
            setSavedNames((prev) =>
                prev.map((entry, i) => (i === index ? updatedEntry.data : entry))
            );
        } catch (error) {
            console.error('Error deleting sentence:', error);
        }
    };

    // Handle changes in URLs and updating them
    const handleUrlChange = (index, newUrls) => {
        setSavedNames((prev) =>
            prev.map((entry, i) => (i === index ? { ...entry, urls: newUrls } : entry))
        );
    };

    // const handleAddUrl = async (index) => {
    //     if (newUrl) {
    //         const updatedUrls = [...savedNames[index].urls, newUrl];
    //         console.log(updatedUrls)
    //         try {
    //             const updatedEntry = await api.put(`/${savedNames[index]._id}`, {
    //                 ...savedNames[index],
    //                 urls: newUrl,
    //             });
    //             setSavedNames((prev) =>
    //                 prev.map((entry, i) => (i === index ? updatedEntry.data : entry))
    //             );
    //             setNewUrl('');
    //         } catch (error) {
    //             console.error('Error adding URL:', error);
    //         }
    //     }
    // };
    const handleAddUrl = async (index) => {
        if (newUrl) {
            const predefinedQuestionId = savedNames[index]._id;  // Get the ID of the predefined question
            console.log("Sending ID:", predefinedQuestionId);
            console.log("Sending url:", newUrl);
    
            try {
                // Send a POST request with the ID of the predefined question and the URL in the body
                const updatedEntry = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/predefinedQuestions/addurl`, {
                    id:predefinedQuestionId,
                    url: newUrl
                });
    
                // Update the state with the new URL added
                setSavedNames((prev) =>
                    prev.map((entry, i) => (i === index ? updatedEntry.data : entry))
                );
                setNewUrl('');  // Clear the URL input field
            } catch (error) {
                console.error('Error adding URL:', error);
            }
        }
    };
    
    
    const handleDeleteUrl = async (index, urlIndex) => {
        const updatedUrls = savedNames[index].urls.filter((_, i) => i !== urlIndex);
        try {
            const updatedEntry = await api.put(`/${savedNames[index]._id}`, {
                ...savedNames[index],
                urls: updatedUrls,
            });
            setSavedNames((prev) =>
                prev.map((entry, i) => (i === index ? updatedEntry.data : entry))
            );
        } catch (error) {
            console.error('Error deleting URL:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Predefined Questions Manager</h1>
            <form onSubmit={handleNameSubmit} className="mb-4">
                <div className="mb-2">
                    <label className="block mb-1">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border px-2 py-1 w-full"
                        required
                    />
                </div>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-4">
                    Save Name
                </button>
            </form>

            <div className="flex flex-col space-y-2">
                {savedNames.map((entry, index) => (
                    <div key={entry._id} className="p-4 border rounded shadow mb-4">
                        <div className="flex justify-between items-center mb-2">
                            {editingIndex === index ? (
                                <input
                                    type="text"
                                    value={entry.name}
                                    onChange={(e) => handleNameChange(index, e.target.value)}
                                    className="border px-2 py-1 w-full mr-2"
                                />
                            ) : (
                                <p className="flex-1">{entry.name}</p>
                            )}
                            {editingIndex === index ? (
                                <button
                                    onClick={() => handleSaveName(index, entry)}
                                    className="bg-green-500 text-white px-4 py-2"
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleEditName(index)}
                                    className="bg-yellow-500 text-white px-4 py-2"
                                >
                                    Edit Name
                                </button>
                            )}
                            <button
                                onClick={() => handleDeleteName(entry._id, index)}
                                className="bg-red-500 text-white px-4 py-2 ml-2"
                            >
                                Delete Name
                            </button>
                        </div>

                        <div className="mb-2">
                            <h4 className="text-md font-semibold">Sentences:</h4>
                            {entry.sentences.map((sentence, sIndex) => (
                                <div key={sIndex} className="flex justify-between items-center mb-1">
                                    <p className="flex-1">{sentence}</p>
                                    <button
                                        onClick={() => handleDeleteSentence(index, sIndex)}
                                        className="bg-red-500 text-white px-2 py-1"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={newSentence}
                                    onChange={(e) => setNewSentence(e.target.value)}
                                    className="border px-2 py-1 mr-2"
                                    placeholder="Add a new sentence"
                                />
                                <button
                                    onClick={() => handleAddSentence(index)}
                                    className="bg-blue-500 text-white px-4 py-2 mt-2"
                                >
                                    Add Sentence
                                </button>
                            </div>
                        </div>

                        <div className="mb-2">
                            <h4 className="text-md font-semibold">URLs:</h4>
                            {entry.urls.map((url, uIndex) => (
                                <div key={uIndex} className="flex justify-between items-center mb-1">
                                    <p className="flex-1">{url}</p>
                                    <button
                                        onClick={() => handleDeleteUrl(index, uIndex)}
                                        className="bg-red-500 text-white px-2 py-1"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={newUrl}
                                    onChange={(e) => setNewUrl(e.target.value)}
                                    className="border px-2 py-1 mr-2"
                                    placeholder="Add a new URL"
                                />
                                <button
                                    onClick={() => handleAddUrl(index)}
                                    className="bg-blue-500 text-white px-4 py-2 mt-2"
                                >
                                    Add URL
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PredefinedQuestionsManager;
