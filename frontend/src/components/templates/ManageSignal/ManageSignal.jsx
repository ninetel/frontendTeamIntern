import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, Col, Row, Button, Modal, Form, Input, Upload } from "antd";
import axios from "axios";
import { useAppSelector } from "../../../../store/store";
import { TbUpload } from "react-icons/tb";
import {
  fetchSignals,
  createSignal,
  deleteSignal,
  editSignal,
  getSignal,
} from "../../../../api/Query/SignalQueries";

const ManageSignal = () => {
  const accessToken = useAppSelector(
    (state) => state.authentication.accessToken
  );

  // Fetch all signals
  const {
    data: signals,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["signals"],
    queryFn: () => fetchSignals(accessToken),
    enabled: !!accessToken,
  });

  // Mutation for deleting a signal
  const mutationDelete = useMutation({
    mutationFn: (id) => deleteSignal(id, accessToken),
    onSuccess: () => {
      refetch();
    },
  });

  // Mutation for updating a signal
  const mutationEdit = useMutation({
    mutationFn: ({ id, data }) => editSignal({ id, data, accessToken }),
    onSuccess: () => {
      refetch();
    },
  });

  // State for managing modal visibility and form data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSignal, setEditingSignal] = useState(null);
  const [values, setValues] = useState({});
  const [form] = Form.useForm();

  const showEditModal = (signal) => {
    setEditingSignal(signal);
    form.setFieldsValue(signal);
    setValues(signal);
    setIsModalOpen(true);
  };

  const handleEdit = () => {
    mutationEdit.mutate({ id: editingSignal._id, data: values });
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    mutationDelete.mutate(id);
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
    <div>
      <div className=" text-4xl font-bold text-center p-2 pt-6">Admin Manage Signals </div>

      <Row gutter={30}>
        {signals.map((signal) => (
          <Col span={8} key={signal.id}>
            <Card
              title={`${signal.signalTitle} ${signal.signalType}`}
              key={signal._id}
              bordered={false}
            >
              {Array.isArray(signal.signalImage) ? (
                signal.signalImage.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Signal Image ${index}`}
                    style={{ width: "100%", height: "auto", display: "block", marginBottom: "10px" }}
                  />
                ))
              ) : typeof signal.signalImage === 'string' ? (
                <img
                  src={signal.signalImage}
                  alt="Signal Image"
                  style={{ width: "100%", height: "auto", display: "block", marginBottom: "10px", textAlign: "left" }}
                />
              ) : (
                <p>No image available</p>
              )}
              <p>Sector: {signal.sector}</p>
              <p>Open Price: {signal.openPrice}</p>
              <p>Book Profit(1): {signal.bookProfit1}</p>
              <p>Book Profit(2): {signal.bookProfit2}</p>
              <p>Book Profit(3): {signal.bookProfit3}</p>
              <p>Buy Range(1): {signal.buyRange1}</p>
              <p>Buy Range(2): {signal.buyRange2}</p>
              <p>Buy Range(3): {signal.buyRange3}</p>
              <p>Stop Loss: {signal.stopLoss}</p>
              <p>Time Frame: {signal.timeFrame}</p>
              <p>Image URLs:</p>
              {Array.isArray(signal.signalImage) ? (
                signal.signalImage.map((url, index) => (
                  <p key={index} style={{ textAlign: "left" }}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {url}
                    </a>
                  </p>
                ))
              ) : typeof signal.signalImage === 'string' ? (
                <p style={{ textAlign: "left" }}>
                  <a href={signal.signalImage} target="_blank" rel="noopener noreferrer">
                    {signal.signalImage}
                  </a>
                </p>
              ) : (
                <p>No image available</p>
              )}
              <p>Signal Status: {signal.status}</p>
              <p>Signal Description: {signal.signalDescription}</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                  paddingRight: "80px",
                }}
              >
                <Button type="primary">Result</Button>
                <Button type="default" onClick={() => showEditModal(signal)}>
                  Edit
                </Button>
                <Button
                  danger
                  type="primary"
                  onClick={() => handleDelete(signal._id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        title="Edit Signal"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} initialValues={values}>
          <Col span={24} style={{ padding: "0 10px 0 0" }}>
            <Form.Item label="Signal Title">
              <Input
                name="signalTitle"
                onChange={handleChange}
                value={values.signalTitle}
              />
            </Form.Item>
          </Col>
          <Col span={24} style={{ padding: "0 10px 0 0" }}>
            <Form.Item label="Sector">
              <Input
                name="sector"
                onChange={handleChange}
                value={values.sector}
              />
            </Form.Item>
          </Col>
          <Form.Item label="Book Profit (1)">
            <Input
              name="bookProfit1"
              onChange={handleChange}
              value={values.bookProfit1}
            />
          </Form.Item>
          <Form.Item label="Book Profit (2)">
            <Input
              name="bookProfit2"
              onChange={handleChange}
              value={values.bookProfit2}
            />
          </Form.Item>
          <Form.Item label="Book Profit (3)">
            <Input
              name="bookProfit3"
              onChange={handleChange}
              value={values.bookProfit3}
            />
          </Form.Item>
          <Form.Item label="Buy Range (1)">
            <Input
              name="buyRange1"
              onChange={handleChange}
              value={values.buyRange1}
            />
          </Form.Item>
          <Form.Item label="Buy Range (2)">
            <Input
              name="buyRange2"
              onChange={handleChange}
              value={values.buyRange2}
            />
          </Form.Item>
          <Form.Item label="Buy Range (3)">
            <Input
              name="buyRange3"
              onChange={handleChange}
              value={values.buyRange3}
            />
          </Form.Item>
          <Form.Item label="Stop Loss">
            <Input
              name="stopLoss"
              onChange={handleChange}
              value={values.stopLoss}
            />
          </Form.Item>
          <Form.Item label="Time Frame">
            <Input
              name="timeFrame"
              onChange={handleChange}
              value={values.timeFrame}
            />
          </Form.Item>
          <Form.Item label="Image URLs">
            {Array.isArray(values.signalImage) ? (
              values.signalImage.map((url, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                  <Input
                    name={`signalImage_${index}`}
                    onChange={(e) => {
                      const newUrls = [...values.signalImage];
                      newUrls[index] = e.target.value;
                      setValues((prevValues) => ({
                        ...prevValues,
                        signalImage: newUrls,
                      }));
                    }}
                    value={url}
                    style={{ flex: 1, marginRight: "10px" }}
                  />
                  <Button
                    danger
                    type="primary"
                    onClick={() => {
                      const newUrls = values.signalImage.filter((_, i) => i !== index);
                      setValues((prevValues) => ({
                        ...prevValues,
                        signalImage: newUrls,
                      }));
                    }}
                  >
                    Delete
                  </Button>
                </div>
              ))
            ) : (
              <Input
                name="signalImage"
                onChange={handleChange}
                value={values.signalImage}
              />
            )}
            <Button
              type="primary"
              onClick={() => {
                setValues((prevValues) => ({
                  ...prevValues,
                  signalImage: [...(values.signalImage || []), ""],
                }));
              }}
            >
              Add Image
            </Button>
          </Form.Item>
          <Form.Item label="Signal Description">
            <Input
              name="signalDescription"
              onChange={handleChange}
              value={values.signalDescription}
            />
          </Form.Item>
          <Form.Item label="Signal Status">
            <Input
              name="status"
              onChange={handleChange}
              value={values.status}
            />
          </Form.Item>
          <Button type="primary" onClick={handleEdit}>
            Update Signal
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageSignal;
