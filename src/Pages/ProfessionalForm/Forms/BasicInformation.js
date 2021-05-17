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
  Upload,
  InputNumber
} from "antd";
import _ from 'lodash';
import moment from 'moment';

const { Option } = Select;
const { forwardRef, useRef, useImperativeHandle } = React;
export const BasicInformation = forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const [citySelected, SetCitySelected] = useState(false);
  const [stateSelected, SetStateSelected] = useState(false);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [dharm, SetDharm] = useState([]);
  const [district, seDistrict] = useState([]);
  const [crimeType, SetCrimeType] = useState([]);
  const [ishistorySheeter, SetIshistorySheeter] = useState(2);
  const [bothAccused, SetbothAccused] = useState(null);
  // const [selectedStateId,setSelectedStateId] = useState();
  //  const dispatch = useDispatch(); // call hook and get dispatch
  const [inputField, setInputField] = useState({
    address: "",
    age: "",
    cast: "",
    city: "",
    district: "",
    mobileno: "",
    name: "",
    religion: "",
    state: "",
  });

  const onFinish = (values) => {
    
    let obj = {
      ...values,
      districtName:getDistrictName(values.district),
      cityName:getCityName(values.city),
      // historydate:form.getFieldValue(['historydate'])?form.getFieldValue(['historydate']):null
      // historySheeter:ishistorySheeter===1?true:ishistorySheeter===2?false:true,
      // bothCriminal:ishistorySheeter===3?true:false
    }
    props.basicInformationFinish(obj);
    // props.uploadImage(fileList);
  };

  useImperativeHandle(ref, () => ({
    onFinish() {
      form.submit();
    },
  }));
   
  
  
  useEffect(
    (res) => {
      if (props.dataStates && props.dataStates.pc_countrystates && props.dataStates.pc_countrystates) {
        setStates([...props.dataStates.pc_countrystates])
      }
      if (props.dataStates && props.dataStates.pc_cities && props.dataStates.pc_cities) {
        setCities([...props.dataStates.pc_cities])
      }
      if (props.dataStates && props.dataStates.pc_dharms && props.dataStates.pc_dharms) {
        SetDharm([...props.dataStates.pc_dharms])
      }
      if (props.dataStates && props.dataStates.pc_crimetypes && props.dataStates.pc_crimetypes) {
        SetCrimeType([...props.dataStates.pc_crimetypes])
      }
    },
    [props.dataStates]
  );


  useEffect(
    (res) => {
      if (props.basicInformationData && props.basicInformationData.length) {
        // setInputField(props.basicInformationData[0]);
        SetCitySelected(true);
        SetStateSelected(true);
        onCityChange(props.basicInformationData[0].city);
        form.setFieldsValue({
          ...props.basicInformationData[0],
          heading:JSON.parse("[" + props.basicInformationData[0].heading + "]"),
          historydate: props.basicInformationData[0].historydate?moment(props.basicInformationData[0].historydate):moment(),
        });
        SetIshistorySheeter(props.basicInformationData[0].historySheeter);
      }
    },
    [props.basicInformationData[0]]
  );

  useEffect(
    (res) => {
      if (props.dataStates && props.dataStates.basicDistricts) {
        // setInputField(props.basicInformationData[0]);
        seDistrict([...props.dataStates.basicDistricts]);
      }
    },
    [props.dataStates && props.dataStates.basicDistricts]
  );

  useEffect((res) =>{

    // if(props.basicInformationData[0]){

    // }

  },[props.isEditForms && props.isEditForms])

  const onCityChange = (value) => {
    clearDistrictSelected();
    SetCitySelected(true);
    props.onCityChange(value, 1);
  };
  const onStateChange = (value) => {
    SetStateSelected(true);
  };
  const clearDistrictSelected = () => {
    form.resetFields(["district"]);
  };

  const onhistorySheeterChange = e => {
    SetIshistorySheeter(e.target.value);
  };

 const getDistrictName = (id) => {
    const { basicDistricts } = props.dataStates;
    if (basicDistricts && basicDistricts.length) {
      return (
        _.filter(basicDistricts, function (o) {
          return o.id === id;
        })[0] &&
        _.filter(basicDistricts, function (o) {
          return o.id === id;
        })[0].DistrictName
      );
    }
  };
  const getCityName = (id) => {
    const { pc_cities } = props.dataStates;
    if (pc_cities && pc_cities.length) {
      return (
        _.filter(pc_cities, function (o) {
          return o.id === id;
        })[0] &&
        _.filter(pc_cities, function (o) {
          return o.id === id;
        })[0].City
      );
    }
  };
  return (
    <Form layout="vertical"  onFinish={onFinish} form={form}>
      <Row gutter={16}>
        <Col span={16}>
          <Form.Item
            name="heading"
            label="लघु शीर्ष"
            rules={[{ required: true, message: "Please select an state" }]}
          >
            <Select
              placeholder="Please select Crime Type"
              mode="multiple"
            >
              {crimeType &&
                crimeType.length &&
                crimeType.map((res, index) => (
                  <Option key={index} value={res.id}>
                    {res.crimetype}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
        </Row>
    <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="historySheeter"
            label="हिस्टोरिशिएटर आहे"
            rules={[{ required: true, message: "Please select historySheeter" }]}
          >
             <Radio.Group onChange={onhistorySheeterChange}   >
              <Radio value={1}>होय</Radio>
              <Radio value={2}>नाही</Radio>
              <Radio value={3}>दोघेही</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        {
          ishistorySheeter === 1 || ishistorySheeter === 3 ?(
          <Col span={8}>
            <Form.Item
              name="historydate"
              label="हिस्ट्रीशिटर  समाविष्ट दिनांक"
              rules={[{ required: true, message: "Please select history date" }]}
            >
                <DatePicker  style={{width:'100%'}}   />
            </Form.Item>
          </Col>
          ):null
        }
      </Row>
     
     


      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="name"
            label="आरोपीचे नाव"
            rules={[{ required: true, message: "Please enter user name" }]}
          >
            <Input placeholder="Please enter user name" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="age"
            label="आरोपीचे वय"
            rules={[{ required: true, message: "Please enter user age" }]}
          >
            <InputNumber style={{width:"100%"}} max={100} min={5} placeholder="Please enter user age" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="mobileNumber"
            label="मोबाईल नंबर"
            rules={[{ message: "Please enter user mobileno" }]}
          >
            <Input placeholder="Please enter user mobileno" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="state"
            label="राज्य"
            rules={[{ required: true, message: "Please select an state" }]}
          >
            <Select
              placeholder="Search to Select"
              optionFilterProp="children"
              onChange={onStateChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
              placeholder="Please select an state"
            >
              {states &&
                states.length &&
                states.map((res, index) => (
                  <Option key={index} value={res.id}>
                    {res.state}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="city"
            label="जिल्हा"
            rules={[{ required: true, message: "Please enter user city" }]}
          >
            <Select
              onChange={onCityChange}
              placeholder="Please select an City"
              disabled={!stateSelected}
              rules={[{ required: true, message: "Please select an City" }]}
            >
              {cities &&
                cities.length &&
                cities.map((res, index) => (
                  <Option key={index} value={res.id}>
                    {res.City}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="district"
            label="आरोपीचे पोलिस ठाणे"
            rules={[{ required: true, message: "Please enter user district" }]}
          >
            <Select
              optionFilterProp="children"
              placeholder="Please select an district"
              disabled={!citySelected}
            >
              {district &&
                district.length &&
                district.map((res, index) => (
                  <Option key={index} value={res.id}>
                    {res.DistrictName}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            name="religion"
            label="धर्म"
            rules={[{ required: true, message: "Please select an religion" }]}
          >
            <Select
              optionFilterProp="children"
              placeholder="Please select an dharm"
            >
              {dharm &&
                dharm.length &&
                dharm.map((res, index) => (
                  <Option key={index} value={res.id}>
                    {res.DharmName}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="cast"
            label="जात"
            rules={[{ message: "Please enter user cast" }]}
          >
            <Input placeholder="Please enter user cast" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            name="address"
            label="आरोपीचे पत्ता"
            rules={[
              {
                required: true,
                message: "please enter address",
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="please enter  address" />
          </Form.Item>
        </Col>
        {/* <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
            </Form.Item> */}
      </Row>
    </Form>
  );
});
