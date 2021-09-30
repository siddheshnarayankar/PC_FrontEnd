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
  Divider,
  Card
} from "antd";
import _ from 'lodash';
const { forwardRef, useRef, useImperativeHandle } = React;
export const ProfileForm = forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const [user, SetUser] = useState({});
  const [basicDistricts, SetBasicDistricts] = useState([]);
  const [pc_cities, SetPC_cities] = useState([]);
  const [isSave, setIsSave] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
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
        props.onFormUpdate(values);
  };

  return (
    <Card style={{ width: '100%' }}>
  <Form layout="vertical"  onFinish={onFinish} form={form}>
     <Divider orientation="left">Basic Information</Divider>
     
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            name="name"
            label="नाव"
            rules={[
              {
                required: true,
                message: "कृपया वापरकर्त्याचे नाव प्रविष्ट करा",
              },
            ]}
          >
            <Input placeholder="कृपया वापरकर्त्याचे नाव प्रविष्ट करा" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="userid"
            label="User Id"
            rules={[{ required: true, message: "Please Enter the User Id" }]}
          >
            <Input placeholder="Please Enter the User Id" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="phone"
            label="Mobile Number"
           
            rules={[{ required: true, message: "Please Enter the Mobile Number" }]}
          >
            <Input placeholder="Please Enter the Mobile Number"   disabled={true}/>
          </Form.Item>
        </Col>
   </Row>
  
       
 <Divider orientation="left">Change Password</Divider>
 <div style={{width: '50%'}}>
      <Row gutter={24}>
        
        <Col span={12}>
        <Form.Item
        name="password"
        label="New Password"
        rules={[
          {
           
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
          
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
        </Col>
      </Row>
      
      </div>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
    </Card>
  );
});
