import React from "react";
import {Card,  Form, Input, Button, Checkbox, Alert, message } from "antd";
import { connect } from "react-redux";
import { userActions } from "../../_actions";
import './LoginPage.css'
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // reset login status
    this.props.dispatch(userActions.logout());
    this.onFinish = this.onFinish.bind(this);
    this.onFinishFailed = this.onFinishFailed.bind(this);
    const { loggedIn } = this.props;
    this.state = {
      loggedIn: loggedIn,
    }
  }
 

  componentDidUpdate(prevState) {
    if(this.props.loggedIn == false){
        message.error('User Details not valid!!')
    }
  }

  onFinish = (values) => {
    const { dispatch } = this.props;
    if (values.userid && values.password) {
      dispatch(userActions.login(values.userid, values.password,values.phone));
    }
    const { loggedIn } = this.props;
    this.setState({
      loggedIn:loggedIn
    })
  };
 onFinishFailed = (errorInfo) => {
  };
  render() {
    return (
       
      <Card className="loginCard" title="Login" bordered={false} >
      <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={this.onFinish}
      onFinishFailed={this.onFinishFailed}
    >
      <Form.Item
        label="userid"
        name="userid"
        rules={[
          {
            required: true,
            message: 'Please input your userid!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Mobile Number"
        name="phone"
        rules={[
          {
            required: true,
            message: 'Please input your Mobile Number!',
          },
        ]}
      >
         <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
   
      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
       {/* <Alert message="User not valid !!" type="error" showIcon /> */}
    </Card>
    );
  }
}

function mapStateToProps(state) {
  const { loggedIn } = state.authentication;
  return {
    loggedIn,
  };
}
const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
