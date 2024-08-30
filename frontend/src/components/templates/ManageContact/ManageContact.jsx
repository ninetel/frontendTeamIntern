
import React, { useState, useEffect } from 'react';
import { useMutation } from "@tanstack/react-query";
import { Select, Table, Button, Form, Modal, Input, message } from 'antd';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { deleteContact, editContact } from '../../../../api/Query/ContactQueries';
import { useAppSelector } from '../../../../store/store';

const { Option } = Select;

const ManageContact = () => {
  const [contactTypes, setContactTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [values, setValues] = useState({});
  const [form] = Form.useForm();

  const accessToken = useAppSelector((state) => state.authentication.accessToken);

  useEffect(() => {
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

  const fetchContacts = async () => {
    if (selectedType) {
      try {
        const response = await axios.get("http://localhost:3000/api/contacts");
        const filteredContacts = response.data.find(
          (contact) => contact.contactType === selectedType
        );
        setContacts(filteredContacts ? filteredContacts.contacts : []);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [selectedType]);

  const mutationDelete = useMutation({
    mutationFn: (id) => deleteContact(id, accessToken),
    onSuccess: () => {
      message.success('Contact deleted successfully');
      fetchContacts(); // Refetch contacts after deletion
    },
    onError: (error) => {
      message.error(`Error deleting contact: ${error.message}`);
    }
  });

  const mutationEdit = useMutation({
    mutationFn: ({ id, data }) => editContact({ id, data, accessToken }),
    onSuccess: () => {
      message.success('Contact updated successfully');
      fetchContacts(); // Refetch contacts after edit
      setIsModalOpen(false);
    },
    onError: (error) => {
      message.error(`Error editing contact: ${error.message}`);
    }
  });

  const showEditModal = (contact) => {
    setEditingContact(contact);
    form.setFieldsValue(contact);
    setValues(contact);
    setIsModalOpen(true);
  };

  // const handleEdit = () => {
  //   if (editingContact) {
  //     mutationEdit.mutate({ id: editingContact._id, data: values });
  //   }
  // };
  const handleEdit = () => {
    if (editingContact) {
      mutationEdit.mutate(
        { id: editingContact._id, data: values },
        {
          onSuccess: (data) => {
            // Handle successful update
            console.log('Contact updated successfully:', data);
            fetchContacts();
            setIsModalOpen(false);
          },
          onError: (error) => {
            // Handle error case
            console.error('Error updating contact:', error.response?.data || error.message);
            alert('Failed to update contact. Please try again.');
          },
        }
      );
    }
  };
  

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this contact?',
      content: 'This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        mutationDelete.mutate(id);
      },
      onCancel: () => {
        message.info('Delete action canceled');
      }
    });
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
    // {
    //   title: 'Actions',
    //   key: 'actions',
    //   render: (text, record) => (
    //     <div className="flex space-x-2">
    //       <Button
    //         type="primary"
    //         onClick={() => showEditModal(record)}
    //         icon={<FaEdit size={20} />}
    //       >
    //         Edit
    //       </Button>
    //       <Button
    //         danger
    //         onClick={() => handleDelete(record._id)}
    //         icon={<MdDeleteOutline size={20} />}
    //       >
    //         Delete
    //       </Button>
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className="p-20">
      <h2 className="text-2xl font-semibold mb-4 ">Manage Contacts</h2>

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
