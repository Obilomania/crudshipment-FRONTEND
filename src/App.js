import React, { useState } from "react";
import data from "./components/Data.jsx";
import "./App.css";
import "antd/dist/antd.css";
import { Table, Modal, Input } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";

function App() {
  /* ------------STATE TO GET DATA OFFLINE------------------------ */
  const [shipment, setShipment] = useState(data());

  /* ------------STATE TO GET POP MODAL CLOSE AND OPEN-------------- */
  const [modal, setModal] = useState(false);
  const [shipInfo, setshipInfo] = useState(null);
  /* -------------------COLUMN BUILD------------------------------- */
  const columns = [
    {
      key: "2",
      title: "ORDER NO",
      dataIndex: "orderNo",
    },
    {
      key: "3",
      title: "DELIVERY DATE",
      dataIndex: "date",
    },
    {
      key: "4",
      title: "CUSTOMER",
      dataIndex: "customer",
    },
    {
      key: "5",
      title: "TRACKING NO",
      dataIndex: "trackingNo",
    },
    {
      key: "6",
      title: "STATUS",
      dataIndex: "status",
    },
    {
      key: "7",
      title: "CONSIGNEE",
      dataIndex: "consignee",
    },
    {
      key: "7",
      title: "",
      render: (record) => {
        return (
          <Info>
            <button className="btn btn-info">
              <EyeOutlined
                onClick={() => {
                  viewShipment(record);
                }}
              />
            </button>

            <button className="btn btn-danger ">
              <DeleteOutlined
                onClick={() => {
                  deleteShipment(record);
                }}
              />
            </button>
          </Info>
        );
      },
    },
  ];
  /* -----------------------VIEW SHIPMENT------------------------------ */
  const viewShipment = (record) => {
    setModal(true);
    setshipInfo({ ...record });
  };

  /* ----------------------DELETE SHIPMENT-------------------------- */
  const deleteShipment = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setShipment((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });
      },
    });
  };

  return (
    <div className="container-fluid">
      <h2 className="text-center">SHIPPING INFORMATION</h2>
      <Table columns={columns} dataSource={shipment}></Table>

      {/* THE POP UP MODAL TO VIEW SHIPMENT DETAILS */}

      <Modal
        title="Shipment Detail"
        visible={modal}
        okText="Close"
        onCancel={() => {
          setModal(false);
        }}
        onOk={() => {
          setModal(false);
        }}
        width={870}
      >
        <ModalPop>
          <div className="inputContainer">
            <div>
              <label>Order No</label>
              <Input value={shipInfo?.orderNo} disabled />
            </div>
            <div>
              <label>Date</label>
              <Input value={shipInfo?.date} disabled />
            </div>
          </div>

          <div className="inputContainer">
            <div>
              <label>Customer</label>
              <Input value={shipInfo?.customer} disabled />
            </div>
            <div>
              <label>Tracking No</label>
              <Input value={shipInfo?.trackingNo} disabled />
            </div>
          </div>

          <div className="inputContainer">
            <div>
              <label>Status</label>
              <Input value={shipInfo?.status} disabled />
            </div>
            <div>
              <label>Consignee</label>
              <Input value={shipInfo?.consignee} disabled />
            </div>
          </div>
        </ModalPop>
      </Modal>
    </div>
  );
}

const Info = styled.div`
  display: flex;
  gap: 0.4rem; ;
`;
const ModalPop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  .inputContainer {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    gap: 1rem;
  }
  .inputContainer div{
    display:flex;
    flex-direction:column;
  } 
  label {
    font-weight: 800;
  }
  Input {
    font-weight: 800;
    color: black;
    text-align: center;
    margin-bottom: 0.8rem;
    width: 25rem;
  }
`;
export default App;
