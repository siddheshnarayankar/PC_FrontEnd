import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  Drawer,
  Button,
  Radio,
  Space,
  Row,
  Col,
  Form,
  Input,
  Select,
  DatePicker,
} from "antd";
import _ from 'lodash';

const { Option } = Select;
const { forwardRef, useRef, useImperativeHandle } = React;
export const UserForm = forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const [user, SetUser] = useState({});
  const [basicDistricts, SetBasicDistricts] = useState([]);
  const [pc_cities, SetPC_cities] = useState([]);
  const [isSave, setIsSave] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedStatus, setselectedStatus] = useState(0);
  useEffect(() => {
    SetUser(props.user);
  }, [props.user]);

  useEffect(() => {
     if(props.resetFrom && props.resetFrom){
      form.resetFields();
     }
  }, [props.resetFrom]);

  useImperativeHandle(ref, () => ({
    onFinish(flag) {
     setIsSave(flag);
      form.submit();
    },
  }));

  useEffect(() => {
    const { users } = props.users;
    if (props.districtData && props.districtData.length) {
      
      let temp = props.districtData.map((item)=>{
              return {
                ...item,
                isUsed:!!_.filter(users,(o)=> { return o.districtId === item.id}).length
              }
      })
      SetBasicDistricts(temp);
    }
    if (props.cityData && props.cityData.length) {
      let temp = props.cityData.map((item)=>{
              return {
                ...item,
                isUsed:!!_.filter(users,(o)=> { return o.cityId === item.id}).length
              }
      })
      SetPC_cities(temp);
    }
  }, [props.cityData, props.districtData,props.users]);

  useEffect(() => {
    if (props.userFormEditData) {
      setIsUpdate(true);
        let val = props.userFormEditData;
        delete val.password;
        val.password = val.phone && val.phone.substr(val.phone && val.phone.length - 4) + val.cityId + val.districtId;
      form.setFieldsValue({
        ...val
      });
    }
  }, [props.userFormEditData]);

  useEffect(() => {
    if (props.isUpdate) {
      setIsUpdate(true);
    }else{
      setIsUpdate(false);
    }
  }, [props.isUpdate]);

  const onFinish = (values) => {
    if(isSave){
        props.onFormFinish(values);
      }else{
          let updateobject = {
              ...values,
              status:selectedStatus
          }
        props.onFormUpdate(updateobject);
      }
  };

  const onStatusChange = (value) =>{
    setselectedStatus(value)
  }

  return (
    <Form layout="vertical" onFinish={onFinish} form={form}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="firstName"
            label="First Name"
           
          >
            <Input placeholder="Please Enter the User Id"  disabled={true} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="lastName"
            label="Last Name"
            
          >
            <Input placeholder="Please Enter the Mobile Number"  disabled={true}/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="phone"
            label="Phone Number"
            disabled={true}
          >
            <Input placeholder="Please Enter the Mobile Number"  disabled={true} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="password"
            label="Password"
            disabled={true}
          >
            <Input placeholder="Please Enter the Password" disabled={true} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span = {12}>
        <Form.Item
              name="status"
              label="Status"
            >
              <Select
                placeholder="Please select an status" 
                onChange = {onStatusChange}
              >
                    <Option key={1} value={0}>
                           Pending
                    </Option>
                    <Option key={2} value={1}>
                            Approved
                    </Option>
                    <Option key={3} value={2}>
                           Rejected
                    </Option>
              </Select>
        </Form.Item>
        </Col>
      </Row>
      

    </Form>
  );
});
