import React, { useState, useEffect } from 'react';
import { Select, List, Card } from 'antd';
import axios from 'axios';

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

  return (
    <div style={{ padding: '20px' }}>
      <h2>Manage Contacts</h2>

      <Select
        style={{ width: 300, marginBottom: 20 }}
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
          grid={{ gutter: 16, column: 4 }}
          dataSource={contacts}
          renderItem={(contact) => (
            <List.Item>
              <Card title={contact.username}>
                <p>Phone: {contact.phoneNumber}</p>
                <p>Email: {contact.email}</p>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default ManageContact;
