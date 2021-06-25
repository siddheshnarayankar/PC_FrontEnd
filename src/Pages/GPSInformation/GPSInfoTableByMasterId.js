import React, { useEffect, useState } from "react";
import { Table, Input, Button, Space,Select,Tag,Divider, Descriptions, Badge, Card } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import _ from "lodash";
import moment from 'moment';

export const GPSInfoTableByMasterId = (props) =>  {

 const getDateFormat = (value) =>{
    if(value){
      return moment(value).utcOffset(12).format('LLL');
    }
  }
console.log(props.selected)
  const onLockTheAddress = (data,flag) =>{
    if(data){
      let obj = {
        ...data,
        masterid:props.selected && props.selected.masterid,
        flag:flag
      }
      props.onLockTheAddress(obj);
    }
  }

 
 
    return (
     
       <Descriptions
      title= {props.selected && props.selected.name  }
      className="allActiveGPSInfoTable"
      bordered
      column={{  sm: 1, xs: 2}}
    >
      {
        props.data  && props.data.length &&  props.data.reverse().map((item)=>(
          <>
            
          <Descriptions.Item label="Image">
         {item && item.isActive ? <Badge.Ribbon text="Latest"></Badge.Ribbon>:null}  
             <img style={{width:'80px',height:'auto'}} src={'https://pcimageupload.s3.ap-south-1.amazonaws.com/' + item.image}></img>
          </Descriptions.Item>
           
          <Descriptions.Item label="User ID">{item && item.phone && item.phone}</Descriptions.Item>
          <Descriptions.Item label="Latitude">{item.latitude && item.latitude}</Descriptions.Item>
          <Descriptions.Item label="Longitude">{item.longitude && item.longitude}</Descriptions.Item>
          <Descriptions.Item label="Location URI">
            <a href={item.location && item.location} target="_blank"> {item.location && item.location}</a>
            </Descriptions.Item>
          <Descriptions.Item label="GPS Date & Time">
          {getDateFormat(item.gpstimedate && item.gpstimedate)}
          </Descriptions.Item>
          <Descriptions.Item label="Press for Lock Address">
            {item.isMarkUser && item.isMarkUser?<Button type="primary"  onClick={() => onLockTheAddress(item,0)}  >unLock</Button>
            : <Button type="primary"  onClick={() => onLockTheAddress(item,1)}  >Lock</Button>
            }
             
          </Descriptions.Item>
          
          <Space></Space>
          </>
        ))
      }
     </Descriptions>
       
    );
  
}
 