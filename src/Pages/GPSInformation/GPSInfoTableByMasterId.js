import React, { useEffect, useState } from "react";
import { Table, Input, Button, Space,Select,Tag,Divider, Descriptions } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import _ from "lodash";
import moment from 'moment';

export const GPSInfoTableByMasterId = () =>  {
  
    return (
        <>
       <Descriptions
      title="प्रोफेशनल आरोपीची GPS माहिती"
      className="allActiveGPSInfoTable"
      bordered
      column={{  sm: 1, xs: 2}}
    >
      <Descriptions.Item label="User ID">Cloud Database</Descriptions.Item>
      <Descriptions.Item label="Latitude">$80.00</Descriptions.Item>
      <Descriptions.Item label="Longitude">$80.00</Descriptions.Item>
      <Descriptions.Item label="Location URI">$80.00</Descriptions.Item>
      <Descriptions.Item label="GPS Date & Time">
      80.0
      </Descriptions.Item>
      <Descriptions.Item label="Image">
      80.0
      </Descriptions.Item>
    </Descriptions>
        </>
    );
  
}
 