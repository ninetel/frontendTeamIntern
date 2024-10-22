import React, { useState, useEffect } from "react";
import { Input, Button, List, Modal, Spin, Typography } from "antd";
import axios from "axios";

const { Text } = Typography;

const AllowIframe = () => {
  const [message, setMessage] = useState("");
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUrl, setNewUrl] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUrl, setEditingUrl] = useState(null);

  const fetchUrls = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/urls`);
      setUrls(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching URLs:", error);
      setLoading(false);
    }
  };

  console.log("hellow world");
  console.log(import.meta.env.VITE_FRONTEND_URL);

  const handleCopyMessage = () => {
    const copyText = `
      <div style="
        position: fixed;
        bottom: 16px;
        right: 16px;
        width: 300px;
        height: 520px;
        z-index: 1000;
      ">
        <iframe
          src="http://chatwidgetadmin.nepsetrends.com/chatai"
          title="Chat"
          style="
            width: 100%;
            height: 100%;
            border: none;
          "
        ></iframe>
      </div>
    `;
    navigator.clipboard.writeText(copyText);
    setMessage(copyText);
  };

  const handleAddUrl = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/urls`, { url: newUrl });
      setUrls([...urls, response.data]);
      setNewUrl("");
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error adding URL:", error);
    }
  };

  const handleUpdateUrl = async (id, updatedUrl) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/urls/${id}`, { url: updatedUrl });
      fetchUrls();
    } catch (error) {
      console.error("Error updating URL:", error);
    }
  };

  const handleDeleteUrl = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/urls/${id}`);
      setUrls(urls.filter((url) => url._id !== id));
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };

  const showModal = (url) => {
    setEditingUrl(url);
    setIsModalVisible(true);
    setNewUrl(url ? url.url : "");
  };

  const handleOk = () => {
    if (editingUrl) {
      handleUpdateUrl(editingUrl._id, newUrl);
    } else {
      handleAddUrl();
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewUrl("");
    setEditingUrl(null);
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-gray-100 shadow-lg p-4 rounded-lg mt-6 w-2/3 sm:w-full h-fit">
      <h1 className="text-center text-3xl font-bold text-gray-600 mb-6">Magage Chart IFrame 👉</h1>
      <div className=" flex p-2 gap-4">
        <Button onClick={() => showModal(null)} className=" font-semibold hover:bg-yellow-500 bg-green-400 rounded-xl text-xl p-2" >
          Add New URL
        </Button>
        <Button onClick={handleCopyMessage} className=" font-semibold hover:bg-yellow-500 bg-green-400 rounded-xl text-xl">Get the Iframe</Button>


      </div>

      <div >

        <Modal
          title={editingUrl ? "Edit URL" : "Add New URL"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Input
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Enter URL"
          />
        </Modal>

        {loading ? (
          <Spin />
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={urls}
            renderItem={(url) => (
              <List.Item
                actions={
                  url.url ? [
                    <Button onClick={() => showModal(url)}>Edit</Button>,
                    <Button onClick={() => handleDeleteUrl(url._id)}>Delete</Button>,
                  ] : null
                }
              >
                <List.Item.Meta title={url.url} />
              </List.Item>
            )}
          />
        )}
      </div>

      {message && (
        <div className=" bg-white shadow-lg p-4 pt-4 rounded-lg w-full h-fit border-x-orange-400">
      <h1 className="text-center text-2xl font-bold text-gray-600 mb-2">IFrame <span className="text-gray-400 font-normal">⇛</span> </h1>

          <Text code>{message}</Text>
        </div>
      )}
    </div>
  );
};

export default AllowIframe;
