import React from "react";
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
const { Option } = Select;
export const KalamAndKayadForm = (props) => {
 const  onFinish = (values) => {
        props.onKalamAndKayadFormFinish(values);
      };
  return (


    <Form layout="vertical" hideRequiredMark  onFinish={onFinish} >
   
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            name="rules"
            label="कायदा"
            rules={[{ required: true, message: "Please select an rules" }]}
          >
            <Select placeholder="Please select an rules">
              <Option value="xiao">Xiaoxiao Fu</Option>
              <Option value="mao">Maomao Zhou</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="kalam"
            label="कलम"
            rules={[{ required: true, message: "Please select an kalam" }]}
          >
            <Select placeholder="Please select an kalam">
              <Option value="xiao">Xiaoxiao Fu</Option>
              <Option value="mao">Maomao Zhou</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col>
        <Form.Item >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
        </Col>
  </Row>
    </Form>
  );
};
