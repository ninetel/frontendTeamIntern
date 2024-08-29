import React, { useState, useEffect } from 'react';
import { Select, List, Card, Button } from 'antd';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const { Option } = Select;

const ManageContact = () => {
  const [contactTypes, setContactTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Fetch unique contact types on component mount
    const fetchContactTypes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/contacts/types");
        setContactTypes(response.data);
      } catch (error) {
        console.error("Error fetching contact types:", error);
      }
    };

    fetchContactTypes();
  }, []);

  useEffect(() => {
    // Fetch contacts when a contact type is selected
    if (selectedType) {
      const fetchContacts = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/contacts");
          const filteredContacts = response.data.find(
            (contact) => contact.contactType === selectedType
          );
          setContacts(filteredContacts ? filteredContacts.contacts : []);
        } catch (error) {
          console.error("Error fetching contacts:", error);
        }
      };

      fetchContacts();
    }
  }, [selectedType]);

  const handleEdit = (contactId) => {
    // Handle edit functionality
    console.log(`Edit contact with ID: ${contactId}`);
  };

  const handleDelete = (contactId) => {
    // Handle delete functionality
    console.log(`Delete contact with ID: ${contactId}`);
  };

  return (
    <div className="p-20">
      <h2 className="text-2xl font-semibold mb-4 text-center">Manage Contacts</h2>

      <Select
        className="w-72 mb-10"
        placeholder="Select a Contact Type"
        onChange={(value) => setSelectedType(value)}
      >
        {contactTypes.map((type) => (
          <Option key={type} value={type}>
            {type}
          </Option>
        ))}
      </Select>

      {selectedType && (
        <List
          // grid={{ gutter: 16, column: 4 }}
          dataSource={contacts}
          renderItem={(contact) => (
            <List.Item>
              <Card
                className="shadow-lg rounded-lg p-6 w-full max-w-xs h-auto flex flex-col justify-between"
                title={<span className="font-bold text-lg">{contact.username}</span>}
              >
                <p className="text-gray-700 mb-2">Phone: {contact.phoneNumber}</p>
                <p className="text-gray-700">Email: {contact.email}</p>
                <div className="flex justify-end mt-4 space-x-2">
                  <Button
                    type="primary"
                    onClick={() => handleEdit(contact.id)}
                   icon={<FaEdit size={20}/>}
                  >
                    Edit
                  </Button>
                  <Button
                    danger
                    onClick={() => handleDelete(contact.id)}
                    icon={<MdDeleteOutline  size={20}/>}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default ManageContact;





// import React, { useState, useEffect } from 'react';
// import { useQuery, useMutation } from '@tanstack/react-query';
// import { Select, List, Card, Button, Modal, Form, Input } from 'antd';
// import axios from 'axios';

// const { Option } = Select;

// const ManageContact = () => {
//   const [selectedType, setSelectedType] = useState(null);
//   const [contacts, setContacts] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingContact, setEditingContact] = useState(null);
//   const [values, setValues] = useState({});
//   const [form] = Form.useForm();

//   // Fetch contact types
//   const { data: contactTypes, isLoading: typesLoading, isError: typesError } = useQuery(
//     'contactTypes',
//     () => axios.get('http://localhost:3000/api/contacts/types').then(res => res.data)
//   );

//   // Fetch contacts based on selected type
//   useEffect(() => {
//     if (selectedType) {
//       axios
//         .get('http://localhost:3000/api/contacts')
//         .then(response => {
//           const filteredContacts = response.data.filter(
//             contact => contact.contactType === selectedType
//           );
//           setContacts(filteredContacts);
//         })
//         .catch(error => console.error('Error fetching contacts:', error));
//     }
//   }, [selectedType]);

//   // Handle opening the edit modal
//   const showEditModal = contact => {
//     setEditingContact(contact);
//     form.setFieldsValue(contact);
//     setValues(contact);
//     setIsModalOpen(true);
//   };

//   // Handle editing a contact
//   const handleEdit = () => {
//     // Handle updating the contact here
//     setIsModalOpen(false);
//   };

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setValues(prevValues => ({
//       ...prevValues,
//       [name]: value,
//     }));
//   };

//   if (typesLoading) return <p>Loading...</p>;
//   if (typesError) return <p>Error loading contact types</p>;

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Manage Contacts</h2>

//       <Select
//         style={{ width: 300, marginBottom: 20 }}
//         placeholder="Select a Contact Type"
//         onChange={value => setSelectedType(value)}
//       >
//         {contactTypes.map(type => (
//           <Option key={type} value={type}>
//             {type}
//           </Option>
//         ))}
//       </Select>

//       {selectedType && (
//         <List
//           grid={{ gutter: 16, column: 4 }}
//           dataSource={contacts}
//           renderItem={contact => (
//             <List.Item>
//               <Card title={contact.username}>
//                 <p>Phone: {contact.phoneNumber}</p>
//                 <p>Email: {contact.email}</p>
//                 <Button type="default" onClick={() => showEditModal(contact)}>
//                   Edit
//                 </Button>
//               </Card>
//             </List.Item>
//           )}
//         />
//       )}

//       <Modal
//         title="Edit Contact"
//         open={isModalOpen}
//         onCancel={() => setIsModalOpen(false)}
//         footer={null}
//       >
//         <Form form={form} initialValues={values}>
//           <Form.Item label="Username">
//             <Input
//               name="username"
//               onChange={handleChange}
//               value={values.username}
//             />
//           </Form.Item>
//           <Form.Item label="Phone">
//             <Input
//               name="phoneNumber"
//               onChange={handleChange}
//               value={values.phoneNumber}
//             />
//           </Form.Item>
//           <Form.Item label="Email">
//             <Input
//               name="email"
//               onChange={handleChange}
//               value={values.email}
//             />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" onClick={handleEdit}>
//               Save Changes
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default ManageContact;
