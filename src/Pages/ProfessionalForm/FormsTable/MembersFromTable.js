import  React, { useEffect, useState } from "react";
import { Table, Tag, Space } from 'antd';
import moment from 'moment'

 
export const MembersFromTable = (props) =>{

// const deletekalamKayda = (values) =>{
//   props.deletekalamKayda(values);
// }

 const [membersRecord,SetmembersRecord] = useState([]);



 const data = props.data && props.data.map((item)=>{
      return {
         ...item,
         registernumberYear: item.registernumberYear?moment(item.registernumberYear).format('YYYY'):moment()
      }
 })

 const onDeleteMembers = (value) =>{
       props.onDeleteMembers(value);
 }

//  useEffect(()=>{
//     if(props.data){
//         props.data && props.data.map((item)=>{

//          let temp =  [
//             ...membersRecord,
//             {
//              ...item,
//              registernumberYear: moment(item.registernumberYear).format('YYYY')
//             }
//          ]
       
//         SetmembersRecord([
//                 ...temp
//         ])
//         })
//     }
//  },[props.data])


  const columns = [
    {
      title: 'गु.र.नंबर',
      dataIndex: 'regsiterNumber',
      key: 'regsiterNumber',
    },
    {
      title: 'वर्ष',
      dataIndex: 'registernumberYear',
      key: 'registernumberYear',
    },
    {
        title: 'साथीदाराचे नाव',
        dataIndex: 'memberName',
        key: 'memberName',
      },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() =>  onDeleteMembers(record)}>Delete</a>
        </Space>
      ),
    },
  ];

  
    return (
        <Table columns={columns} dataSource={data}  size="small"/> 
    )
}


