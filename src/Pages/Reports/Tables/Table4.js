import React, { useEffect, useState } from "react";
import { Table, Input, Button, Space,Select,Tag,Divider,Image } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import _ from "lodash";
import moment from 'moment';

export class TableReport4 extends React.Component {
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
        title: "नाव",
        key: "name",
        render: (text, record) => (
          <Space size="middle" style={{maxWidth:300}}>
              {record.name}
          </Space>
        ),
     
      },
      {
        title: "आरोपीचे पोलिस ठाण",
        key: "districtName",
        render: (text, record) => (
          <Space size="middle" style={{maxWidth:300}}>
              {record.districtName}
          </Space>
        ),
      },
      {
        title: "Last Update Date",
        key: "lastUpdate",
        render: (text, record) => (
          <Space size="middle" style={{maxWidth:300}}>
              {moment(record.lastUpdate && record.lastUpdate).format('DD-MM-YYYY')}
          </Space>
        ),
      },
      {
        title: "count",
        key: "count",
        render: (text, record) => (
          <Space size="middle" style={{maxWidth:300}}>
              {record.count}
          </Space>
        ),
      },
      {
        title: "फोटो",
        key: "photo",
        render: (text, record) => (
          <Space size="middle" style={{maxWidth:300}}>
              <Image style={{width:60,height:60}} src={`https://pcimageupload.s3.ap-south-1.amazonaws.com/${record.photo}`}></Image>
          </Space>
        ),
      },
    ]
    let tebleData = this.props.data && this.props.data.map((item,index)=>{
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
