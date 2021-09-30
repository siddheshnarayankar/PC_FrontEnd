import React from "react";
import { Card, Form, Input, Button, Checkbox, Alert, Image, message, Row, Col } from "antd";
import { connect } from "react-redux";
import { userActions } from "../../_actions";
import './LoginPage.css'
import { Carousel } from 'antd';
import { slide1_1, slide1_2, slide1_3, bg1_1 } from "./sliders/slider";
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
const contentStyle = {
  height: '80vh',
  color: '#fff',
  lineHeight: '100vh',
  textAlign: 'center',
  background: '#364967',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};
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
    if (this.props.loggedIn == false) {
      message.error('User Details not valid!!')
    }
  }

  onFinish = (values) => {
    const { dispatch } = this.props;
    if (values.userid && values.password) {
      dispatch(userActions.login(values.userid, values.password, values.phone));
    }
    const { loggedIn } = this.props;
    this.setState({
      loggedIn: loggedIn
    })
  };
  onFinishFailed = (errorInfo) => {
  };
  render() {

    return (
      <>
        <div className="login-wrap" style={{ backgroundImage: `url(${bg1_1})`, backgroundSize: 'cover' }}>

          <Row>
            <Col span={24}>
              <div className="login-heading-wrap">
                <h1 className="login-heading">CMIS</h1>
                <h4 className="login-subheading">CRIMINAL MONITORING INTELLIGENT SYSTEM</h4>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              {/* <div className="video-wrap">
              <video width="320" height="240" controls loop={true} >
                  <source src={WEBSITE_1} type="video/mp4" />

                </video>
              </div> */}

              <div className="crousel">
                <Carousel effect="fade" autoplay  >
                  <div >
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <h3 style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', color: "#fff" }}>Criminal Monitoring Intelligent System

                      (CMIS)</h3>
                  </div>
                  <div>
                    <div style={{  textAlign:'center', color: "#fff" }}>
                      <b>Concept</b>
                      <br/>
                      <br/>
                      <p>This application can be used to a large extent to monitor the accused who
                        are committing crimes against goods as well as to reduce the crime ratio.</p>
                      <p>To curb the accused / Criminal with two or more offenses by taking
                        preventive action and monitoring them from time to time.</p>
                      <p>To take appropriate preventive action in case of fresh charges against
                        property offenders.</p>
                      <p>Surveillance of accused who repeatedly commit crimes against goods using
                        location tracking.</p>

                    </div>
                  </div>
                  <div>
                  <div style={{ textAlign:'center', color: "#fff" }}>
                      <b>Use of Application</b>
                      <br/>
                      <br/>
                      <p> The Beat Amaldar of Police Thane was aware of the criminals on the record in
                      his area, which helped him to check the criminals and monitor their
                      movements.</p>
                      <p>The fact that the offenders on the record are constantly visited at their place of
                      residence helps them to be held accountable by the police and prevent them if
                      they have any other plans</p>
                      <p>Obtaining up-to-date photos of criminals about goods.</p>
                      <p>It was easily possible to keep up-to-date records of the accused who committed
                      crimes against goods.</p>
                      <p>Immediate detection of offenders by way of criminal proceedings (MOB).</p>
                    </div>
                  </div>
                </Carousel>
              </div>
            </Col>
            <Col span={12}>

              <div className="leftLine"></div>
              <Card className="loginCard" bordered={false} >
                <Form

                  name="basic"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={this.onFinish}
                  onFinishFailed={this.onFinishFailed}
                >
                  <Form.Item
                    name="userid"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your userid!',
                      },
                    ]}
                  >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="UserId" />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Mobile Number!',
                      },
                    ]}
                  >
                    <Input prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="Mobile Number" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                  </Form.Item>

                  <Form.Item className='rememberMeCheckbox' name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <Form.Item  >
                    <Button type="default" htmlType="submit" block>
                      Sign In
                    </Button>
                  </Form.Item>
                </Form>
                {/* <Alert message="User not valid !!" type="error" showIcon /> */}
              </Card>
            </Col>
          </Row>
          <Row style={{
            position: 'absolute',
            bottom: '0px',
            textAlign: 'center', width: '100%'
          }}>
            <Col span={24}>
              <div className="login-footer-wrap">
                <span>©2021 Developed By I MARK TECHNOLOGY</span>
              </div>
            </Col>
          </Row>
        </div>
      </>
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
