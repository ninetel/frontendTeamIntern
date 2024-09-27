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
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ height: "40%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Button onClick={handleCopyMessage}>Get the Iframe</Button>
        {message && (
          <div style={{ marginTop: "16px", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", width: "80%", maxWidth: "600px", wordWrap: "break-word" }}>
            <Text code>{message}</Text>
          </div>
        )}
      </div>

      <div style={{ height: "60%", overflowY: "auto" }}>
        <Button onClick={() => showModal(null)} style={{ margin: "16px" }}>
          Add New URL
        </Button>
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
    </div>
  );
};

export default AllowIframe;
