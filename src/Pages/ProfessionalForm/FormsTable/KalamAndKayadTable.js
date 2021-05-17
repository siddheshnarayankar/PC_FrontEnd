import  React from "react";
import { Table, Tag, Space } from 'antd';


 
export const KalamAndKayadTable = (props) =>{

const deletekalamKayda = (values) =>{
  props.deletekalamKayda(values);
}
  

  const columns = [
    {
      title: 'कायदा',
      dataIndex: 'rulesName',
      key: 'rulesName',
    },
    {
      title: 'कलम',
      dataIndex: 'kalam',
      key: 'kalam',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a   onClick={() => deletekalamKayda(record)}>Delete</a>
        </Space>
      ),
    },
  ];

  
    return (
        <Table columns={columns} dataSource={props.data}  size="small"/> 
    )
}


