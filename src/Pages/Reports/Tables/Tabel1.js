import React, { useEffect, useState } from "react";
import { Table, Input, Button, Space,Select,Tag,Divider } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import _ from "lodash";
import moment from 'moment';

export class Reports1 extends React.Component {
  render() {
    let tempColumns = [];
    // tempColumns =  this.props.columns
    // let columns =tempColumns.map((res) => {
    //   return {
    //     ...res,
    //   };
    // });

    let columnsOb = [
        {
            title: "SrNo",
            key: "srNo",
            render: (text, record) => (
              <Space size="middle" style={{maxWidth:300}}>
                  {record.srNo}
              </Space>
            ),
         
          },
      {
        title: "पोलिस ठाणे",
        key: "policeThane",
        render: (text, record) => (
          <Space size="middle" style={{maxWidth:300}}>
              {record.policeThane}
          </Space>
        ),
     
      },
      {
        title: "रेकॉर्ड गणना",
        key: "totalCriminals",
        render: (text, record) => (
          <Space size="middle" style={{maxWidth:300}}>
              {record.totalCriminals}
          </Space>
        ),
     
      },
       
    ]

    let tebleData = this.props.data&& this.props.data.map((item,index)=>{
        return {
            ...item,
            srNo:index + 1
        }
    })

 
    
  
    // columns.push(
    //   ...columnsOb
    // );

    return (
        <>
        <div style={{ marginBottom: 16 }}>
           
          <span style={{ marginLeft: 8 }}>
 
          </span>
        </div>
        <Divider orientation="left">एकूण आरोपी : {this.props.total}</Divider>
        <Table columns={columnsOb} dataSource={tebleData} />
        </>
    );
  }
}
