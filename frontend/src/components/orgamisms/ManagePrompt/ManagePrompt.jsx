import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, Col, Row, Button, Rate, Modal, Form, Input, Upload } from "antd";
import axios from "axios";
import { useAppSelector } from "../../../../store/store";
import { TbUpload } from "react-icons/tb";
import {
  fetchPrompts,
  createPrompt,
  deletePrompt,
  editPrompt,
  approvePrompt,
  rejectPrompt,
  getPrompt,
} from "../../../../api/Query/promptQueries";
const AdminManagePromptOrg = () => {
  console.log("Inside of Adminii Manage prompt");
  const accessToken = useAppSelector(
    (state) => state.authentication.accessToken
  );
  // Fetch all prompts
  const {
    data: prompts,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["prompts"],
    queryFn: () => fetchPrompts(accessToken),
    enabled: !!accessToken,
  });
  console.log("data", prompts);
  // Mutation for deleting a prompt
  const mutationDelete = useMutation({
    mutationFn: (id) => deletePrompt(id, accessToken),
    onSuccess: () => {
      refetch();
    },
  });
  // Mutation for updating a prompt
  const mutationEdit = useMutation({
    mutationFn: ({ id, data }) => editPrompt({ id, data, accessToken }),
    onSuccess: () => {
      // invalidateQueries(["prompts"]);
      refetch();
    },
  });
  // Mutation for updating a prompt
  const mutationApprovePrompt = useMutation({
    mutationFn: ({ id, data }) => {
      // Set the status to "approved" before calling the editPrompt function
      const updatedData = { ...data, status: "approved" };
      return editPrompt({ id, data: updatedData, accessToken });
    },
    onSuccess: () => {
      // invalidateQueries(["prompts"]);
      refetch();
      alert("Prompt approved");
    },
  });
  // Mutation for updating a prompt
  const mutationRejectPrompt = useMutation({
    mutationFn: ({ id, data }) => {
      const updatedData = { ...data, status: "rejected" };
      return editPrompt({ id, data: updatedData, accessToken });
    },
    onSuccess: () => {
      // invalidateQueries(["prompts"]);
      refetch();
      alert("Prompt rejected");
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState(null);
  const [values, setValues] = useState({});
  // console.log("editprompt", editingPrompt);
  const showEditModal = (prompt) => {
    setEditingPrompt(prompt);
    form.setFieldsValue(prompt);
    setValues(prompt);
    setIsModalOpen(true);
  };
  const [form] = Form.useForm();
  const handleEdit = () => {
    mutationEdit.mutate({ id: editingPrompt._id, data: values });
    setIsModalOpen(false);
  };
  const handleApprove = (id) => {
    mutationApprovePrompt.mutate({ id: id, data: values });
  };
  const handleDelete = (id) => {
    mutationDelete.mutate(id);
  };
  const handleReject = (id) => {
    mutationRejectPrompt.mutate({ id: id, data: values });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  return (
    <div style={{ width: "100%" }}>
      <Row
        large
        style={{ width: "100%" }}
        gutter={[16, 16]} // Optional: Adds space between columns and rows
      >
        {prompts.map((prompt) => (
          <Col span={12} key={prompt.id}>
            <Card
              title={`${prompt.promptTitle}`}
              key={`${prompt._id}`}
              bordered={false}
            >
              <p>Created Date: {prompt.createdDate}</p>
              <p>prompt Description: {prompt.promptDescription}</p>
              <p>Status: {prompt.status}</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                  paddingRight: "80px",
                  // paddingLeft: "20px"
                }}
              >
                <Button
                  style={{
                    backgroundColor: "#33b249",
                    borderColor: "#33b249",
                    color: "#fff",
                  }}
                  onClick={() => handleApprove(prompt._id)}
                >
                  Approve
                </Button>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#faad14",
                    borderColor: "#faad14",
                    color: "#fff",
                  }}
                  onClick={() => handleReject(prompt._id)}
                >
                  Reject
                </Button>
                <Button type="default" onClick={() => showEditModal(prompt)}>
                  Edit
                </Button>
                <Button
                  danger
                  type="primary"
                  onClick={() => handleDelete(prompt._id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        title="Edit prompt"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} initialValues={values}>
          <Col span={12} style={{ padding: "0 10px 0 0" }}>
            <Form.Item label="prompt Title">
              <Input
                name="promptTitle"
                onChange={handleChange}
                value={values.promptTitle}
              />
            </Form.Item>
          </Col>
          <Form.Item label="prompt Status">
            <Input
              name="status"
              onChange={handleChange}
              value={values.status}
            />
          </Form.Item>
          <Form.Item label="prompt Description">
            <Input
              name="promptDescription"
              onChange={handleChange}
              value={values.promptDescription}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={handleEdit}>
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default AdminManagePromptOrg;