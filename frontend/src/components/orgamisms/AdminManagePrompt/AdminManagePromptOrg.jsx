import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, Col, Row, Button, Modal, Form, Input, } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import axios from "axios";
import { useAppSelector } from "../../../../store/store";
import { TbUpload } from "react-icons/tb";
import ButtonComponent from './ButtonComponent.jsx';

import {
  fetchPrompts,
  createPrompt,
  deletePrompt,
  editPrompt,
  approvePrompt,
  rejectPrompt,
  getPrompt,
} from "../../../../api/Query/promptQueries";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/prompt`;

const AdminManagePromptOrg = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState(null);
  const [values, setValues] = useState({});
  const [searchItem, setSearchItem] = useState("");
  // const [filterItems , setFilterItems] = useState([]);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    // const filteredItems =  prompts.prompts.filter((x)=>{
    //   return searchItem.toLocaleLowerCase() === '' ? x :
    //     x.promptTitle.toLowerCase().includes(searchTerm.toLowerCase())
    //   }) 

    // setFilterItems(filteredItems);
  }






  const accessToken = useAppSelector(
    (state) => state.authentication.accessToken
  );

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




  const [expandedPrompts, setExpandedPrompts] = useState({});
  
  const toggleExpand = (id) => {
    setExpandedPrompts((prevState) => ({
      ...prevState ,
      [id]: !prevState[id],
    }));
  };

  const mutationDelete = useMutation({
    mutationFn: (id) => deletePrompt(id, accessToken),
    onSuccess: () => {
      refetch();
    },
  });

  const mutationEdit = useMutation({
    mutationFn: ({ id, data }) => editPrompt({ id, data, accessToken }),
    onSuccess: () => {
      // invalidateQueries(["prompts"]);
      refetch();
    },
  });
  const mutationApprovePrompt = useMutation({
    mutationFn: ({ id, data }) => {
      const updatedData = { ...data, status: "approved" };
      return editPrompt({ id, data: updatedData, accessToken });
    },

    onSuccess: () => {
      // invalidateQueries(["prompts"]);
      refetch();
      alert("Prompt approved");
    },
  });
  const mutationRejectPrompt = useMutation({
    mutationFn: ({ id, data }) => {
      const updatedData = { ...data, status: "rejected" };
      return editPrompt({ id, data: updatedData, accessToken });
    },
    onSuccess: () => {
      refetch();
      alert("Prompt rejected");
    },
  });



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
    <div className="">
      <div className=" text-center justify-center text-4xl font-bold pt-4 p-2 ">Manage Prompts 🤖 </div>
      <div className=" p-2">
        <div className=" w-fit flex items-center gap-2 text-sm rounded-full ring-[1.5px] ring-gray-300 px-2  hover:ring-gray-400 transition duration-300 shadow-lg">
          <SearchOutlined style={{ fontSize: '16px', color: '#555' }} />
          <Input
            type="text"
            value={searchItem}
            onChange={handleInputChange}
            placeholder="Search..."
            className=" border-none outline-none "
          />
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <Row>
          {
            prompts.prompts.filter((x) => {
              return searchItem.toLocaleLowerCase() === '' ? x :
                x.promptTitle.toLowerCase().includes(searchItem.toLowerCase())
            }).map((prompt) => (
              <Col span={12} key={prompt._id}>
                <Card className="m-4"
                  title={
                    <span className="text-2xl font-semibold text-center">
                      {prompt.promptTitle}
                    </span>
                  }
                  bordered={false}
                >
                  <h2 className="text-sm font-semibold gap-2 py-2">
                    Created Date: {new Date(prompt.createdDate).toLocaleString()}
                  </h2>
                  <button
                    className="absolut text-blue-500 bg-gray-100 rounded-sm"
                    onClick={() => toggleExpand(prompt._id)}
                  >
                    {expandedPrompts[prompt._id] ? "See Less" : "See More"}
                  </button>
               
                  <p 
                    className={`${expandedPrompts[prompt._id] ? "h-auto" : "h-[94px]"
                      } overflow-hidden pb-10 relative`}
                  >
                    Prompt Description: {prompt.promptDescription}

                  </p>
                  <p className=" text-xl font-semibold">Status: {prompt.status}</p>
                  <div className="flex justify-between mt-4 pr8">
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
    </div>
  );
};

export default AdminManagePromptOrg;