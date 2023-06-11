import React, { useState, useEffect } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Table, Modal, Input, Upload } from "antd";


const baseUrl = process.env.REACT_APP_BASE_URL;
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";

interface Props {}

interface Item {
  id: number;
  ItemNo: string;
  Description: string;
  Rate: string;
  Qty: string;
  Amount: string;
  Unit: string;
}

const FileImportComponent: React.FC<Props> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [typeError, setTypeError] = useState<string | null>(null);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(`${baseUrl}/api/data`)
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);
  // payments.map(payment=>(payment.))

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        setFile(selectedFile);
      } else {
        setTypeError("Please select only excel file types");
        setFile(null);
      }
    } else {
      console.log("Please select your file");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("fileName", file);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Data submitted successfully");
      } else {
        alert("Error submitting data");
      }
    } catch (error) {
      alert(error);
      // Handle error
    }
  };

  
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "ItemNo",
      dataIndex: "ItemNo",
    },
    {
      key: "3",
      title: "Description",
      dataIndex: "Description",
    },
    {
      key: "4",
      title: "Unit",
      dataIndex: "Unit",
    },
    {
      key: "5",
      title: "Qty",
      dataIndex: "Qty",
    },
    {
      key: "6",
      title: "Rate",
      dataIndex: "Rate",
    },
    {
      key: "7",
      title: "Amount",
      dataIndex: "Amount",
    },

    {
      key: "7",
      title: "Actions",
      render: (record: Item) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditItem(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteItem(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  // const onAddItem = () => {
  //   const randomNumber: number = Math.floor(Math.random() * 100);
  //   // const randomString: string = randomNumber.toString();
  //   console.log(randomNumber);
  //   randomNumber.toString();
  //   const newStudent: Item = {
  //     id: randomNumber,
  //     Description: "Name " + randomNumber,
  //     Rate: randomNumber + "@gmail.com",
  //     Amount: "Address " + randomNumber,
  //     Qty: "lame",
  //     Unit: "m3",
  //     ItemNo: randomNumber.toString()
  //   };
  //   setDataSource((pre) => {
  //     return [...pre, newStudent];
  //   });
  // };

  const onDeleteItem = (record: Item) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setItems((pre) => {
          return pre.filter((item: Item) => item.id !== record.id);
        });
      },
    });
  };

  const onEditItem = (record: Item) => {
    setIsEditing(true);
    setEditingItem({ ...record });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingItem(null);
  };

  return (
    <>
      <h3>Upload & View Excel Sheets</h3>

      <form className="form-group custom-form" onSubmit={handleSubmit}>
        <input
          type="file"
          className="form-control"
          required
          onChange={handleFile}
        />
        <button type="submit" className="btn btn-success btn-md mt-2 ">
          UPLOAD
        </button>
        {typeError && <div className="alert alert-danger">{typeError}</div>}
      </form>

      <div className="container ">
        <br></br> <hr></hr>
        {/* view file section */}
        <h5>View Excel file</h5>
        {/* <Button onClick={onAddStudent}>Add a new Student</Button> */}
        <Table columns={columns} dataSource={items}></Table>
        <Modal
          title="Edit Student"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setItems((pre:any) => {
              return pre.map((item:Item) => {
                if (item.id === editingItem!.id) {
                  return editingItem!;
                } else {
                  return item;
                }
              });
            });
            resetEditing();
          }}
        >
          <Input
            value={editingItem?.ItemNo}
            onChange={(e) => {
              setEditingItem((pre) => {
                return { ...pre!, name: e.target.value };
              });
            }}
          />
          <Input
            value={editingItem?.Description}
            onChange={(e) => {
              setEditingItem((pre) => {
                return { ...pre!, email: e.target.value };
              });
            }}
          />
          <Input
            value={editingItem?.Rate}
            onChange={(e) => {
              setEditingItem((pre) => {
                return { ...pre!, address: e.target.value };
              });
            }}
          />
          <Input
            value={editingItem?.Rate}
            onChange={(e) => {
              setEditingItem((pre) => {
                return { ...pre!, address: e.target.value };
              });
            }}
          />
          <Input
            value={editingItem?.Rate}
            onChange={(e) => {
              setEditingItem((pre) => {
                return { ...pre!, address: e.target.value };
              });
            }}
          />
        </Modal>
      </div>
    </>
  );
};

export default FileImportComponent;
