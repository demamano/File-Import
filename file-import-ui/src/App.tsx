import React from 'react';
// import type { FC } from 'react';
import 'antd/dist/reset.css';
// import './App.css';
import { useState } from "react";
import { Button, Table, Modal, Input, Upload } from "antd";
import { EditOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import * as XLSX from 'xlsx'
import axios from 'axios';
interface Student {
  id: number;
  name: string;
  email: string;
  address: string;
  lame: string;
}
type DataType = {
  key: string;
  itemNo: number;
  description: string;
  rate: number;
  qty: number;
  amount: number;

};
const App: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const [dataSource, setDataSource] = useState<Student[]>([
    {
      id: 1,
      name: "John",
      email: "john@gmail.com",
      address: "John Address",
      lame: "bora",
    },
    {
      id: 2,
      name: "David",
      email: "david@gmail.com",
      address: "David Address",
      lame: "bora",
    },
    {
      id: 3,
      name: "James",
      email: "james@gmail.com",
      address: "James Address",
      lame: "bora",
    },
    {
      id: 4,
      name: "Sam",
      email: "sam@gmail.com",
      address: "Sam Address",
      lame: "bora",
    },
  ]);

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "4",
      title: "Address",
      dataIndex: "address",
    },
    {
      key: "5",
      title: "Actions",
      render: (record: Student) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditStudent(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onAddStudent = () => {
    const randomNumber: number = Math.floor(Math.random() * 100);
    // const randomString: string = randomNumber.toString();
    console.log(randomNumber);
    randomNumber.toString();
    const newStudent: Student = {
      id: randomNumber,
      name: "Name " + randomNumber,
      email: randomNumber + "@gmail.com",
      address: "Address " + randomNumber,
      lame: "lame"
    };
    setDataSource((pre) => {
      return [...pre, newStudent];
    });
  };

  const onDeleteStudent = (record: Student) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });
      },
    });
  };

  const onEditStudent = (record: Student) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };
  // 222

  const [excelFile, setExcelFile] = useState<ArrayBuffer | null>(null);
  const [excelFileError, setExcelFileError] = useState<string | null>(null);
  const [excelData, setExcelData] = useState<Array<XLSX.ExcelDataType> | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const fileType = ['application/vnd.ms-excel'];

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target?.result as ArrayBuffer);
        };
      } else {
        setExcelFileError('Please select only excel file types');
        setExcelFile(null);
      }
    } else {
      console.log('Please select your file');
    }
  };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (excelFile !== null) {
  //     const workbook = XLSX.read(excelFile, { type: 'buffer' });
  //     const worksheetName = workbook.SheetNames[0];
  //     const worksheet = workbook.Sheets[worksheetName];
  //     const data = XLSX.utils.sheet_to_json(worksheet) as Array<XLSX.ExcelDataType>;
  //     setExcelData(data);
  //   } else {
  //     setExcelData(null);
  //   }
  // }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('excelFile', file);
      try {
        const response = await axios.post('/uploadExcel', formData);
        postMessage(`Excel data stored with ID ${response.data.id}.`);
      } catch (error) {
        console.error(error);
        postMessage('Failed to store Excel data.');
      }
    }
  };
  return (
    <>
      <div className='form'>
        <form className='form-group' autoComplete="off"
          onSubmit={handleSubmit}>
          <label><h5>Upload Excel file</h5></label>
          <br></br>
          <input type='file' className='form-control'
            onChange={handleFile} required></input>
          {/* {excelFileError&&<div className='text-danger'
          style={{marginTop:5+'px'}}>{excelFileError}</div>} */}
          <button type='submit' className='btn btn-success'
            style={{ marginTop: 5 + 'px' }}>Submit</button>
        </form>
      </div>

      <div className="container ">



        <br></br>
        <hr></hr>

        {/* view file section */}
        <h5>View Excel file</h5>

        <Button onClick={onAddStudent}>Add a new Student</Button>
        <Table columns={columns} dataSource={dataSource}></Table>
        <Modal
          title="Edit Student"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((student) => {
                if (student.id === editingStudent!.id) {
                  return editingStudent!;
                } else {
                  return student;
                }
              });
            });
            resetEditing();
          }}
        >
          <Input
            value={editingStudent?.name}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre!, name: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.email}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre!, email: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.address}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre!, address: e.target.value };
              });
            }}
          />
        </Modal>
        {/* </div> */}

      </div>
    </>
  );
};

export default App;