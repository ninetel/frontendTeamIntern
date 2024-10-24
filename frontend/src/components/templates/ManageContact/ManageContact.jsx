
import React, { useState, useEffect } from 'react';
import { Select, Table, Button, Form, Modal, Input, message } from 'antd';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useAppSelector } from '../../../../store/store';

const { Option } = Select;

const ManageContact = () => {
  const [contactTypes, setContactTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("Customer");
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [values, setValues] = useState({});
  const [form] = Form.useForm();

  const accessToken = useAppSelector((state) => state.authentication.accessToken);

  console.log("contact type data are_____________",contactTypes)

  useEffect(() => {
    const fetchContactTypes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/contacts/types`);
        setContactTypes(response?.data);
      } catch (error) {
        console.error("Error fetching contact types:", error);
      }
    };
    fetchContactTypes();
  }, []);

  const fetchContacts = async () => {
    if (selectedType) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/contacts`);
        const filteredContacts = response.data.find(
          (contact) => contact.contactType === selectedType
        );
        setContacts(filteredContacts ? filteredContacts.contacts : []);
        console.log("Fetched contacts:", filteredContacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [selectedType]);

  const handleEdit = async () => {
    if (editingContact) {
      console.log("Submitting updated values:", values);
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/contacts/edit_contact/${editingContact._id}`,
          values,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        console.log("Update response:", response.data);
        message.success('Contact updated successfully');
        setIsModalOpen(false);
        fetchContacts(); // Refetch contacts after edit
      } catch (error) {
        console.error('Error updating contact:', error.response?.data || error.message);
        message.error('Failed to update contact. Please try again.');
      }
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this contact?',
      content: 'This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/contacts/delete_contact/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          message.success('Contact deleted successfully');
          fetchContacts(); // Refetch contacts after deletion
        } catch (error) {
          console.error('Error deleting contact:', error.response?.data || error.message);
          message.error('Failed to delete contact. Please try again.');
        }
      },
      onCancel: () => {
        message.info('Delete action canceled');
      }
    });
  };

  const showEditModal = (contact) => {
    setEditingContact(contact);
    form.setFieldsValue(contact);
    setValues(contact);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div className="flex space-x-2">
          <Button
            type="primary"
            onClick={() => showEditModal(record)}
            icon={<FaEdit size={20} />}
          >
            Edit
          </Button>
          <Button
            danger
            onClick={() => handleDelete(record._id)}
            icon={<MdDeleteOutline size={20} />}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className=" mx-auto bg-white p-8 rounded-xl shadow-lg h-fit my-8">
      <h2 className="text-5xl font-bold p-4 text-center">Manage Contacts 📞</h2>
      <div class="w-full h-0.5 bg-gradient-to-r from-blue-500 via-gray-300 to-pink-500"></div>

      <div className=" mt-4 font-semibold text-2xl"> Select Contact: </div>
      <Select
        className="w-72 mb-8  border-green-600 border-2 border-r-2 rounded-lg content-center  "
        placeholder={<span className=' text-gray-800 font-semibold'>Select a Contact Type</span>}
        onChange={(value) => setSelectedType(value) }
        value={selectedType}
        defaultValue={"Customer"}
       
      >
        {contactTypes.map((type) => (
          <Option key={type} value={type}>
            {type}
          </Option>
        ))}
      </Select>

      {selectedType && (
        <Table
          columns={columns}
          dataSource={contacts}
          rowKey="_id"
        />
      )}

      <Modal
        title="Edit Contact"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleEdit}>
            Save Changes
          </Button>,
        ]}
      >
        <Form form={form} initialValues={values}>
          <Form.Item label="Username">
            <Input
              name="username"
              onChange={handleChange}
              value={values.username}
              required
            />
          </Form.Item>
          <Form.Item label="Phone">
            <Input
              name="phoneNumber"
              onChange={handleChange}
              value={values.phoneNumber}
              required
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              name="email"
              onChange={handleChange}
              value={values.email}
              required
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageContact;
