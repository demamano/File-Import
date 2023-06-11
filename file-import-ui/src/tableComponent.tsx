import React, { useState } from "react";
import { Table, Button } from "antd";

interface RowData {
  key: string;
  itemNo: string;
  description: string;
  rate: number;
  qty: number;
  amount: number;
}

interface TableComponentProps {
  data: RowData[];
  onRemoveRow: (key: string) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({
  data,
  onRemoveRow,
}) => {
  const [tableData, setTableData] = useState<RowData[]>(data);

  const handleRemove = (key: string) => {
    const updatedData = tableData.filter((row) => row.key !== key);
    setTableData(updatedData);
    onRemoveRow(key);
  };

  const columns = [
    {
      title: "Item No",
      dataIndex: "itemNo",
      key: "itemNo",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: RowData) => (
        <Button onClick={() => handleRemove(record.key)}>Remove</Button>
      ),
    },
  ];

  return <Table dataSource={tableData} columns={columns} />;
};

export default TableComponent;
