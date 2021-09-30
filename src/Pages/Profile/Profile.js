import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import { professionalAction, userActions } from "../../_actions";
import { AppTable } from "../../_components/AppTable";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Divider,
  PageHeader,
  Descriptions,
  message,
 
} from "antd";
import axios from 'axios';
import { UserForm } from "../HomePage/UserForm";
import { ProfileForm } from "./ProfileForm";
const { Option } = Select;
 
class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    isCreateUserDrawerVisible: false,
    isUpdate:false,
    userFormEditData:[],
    resetFrom:false,
    userList:[]
  };
  userForm = React.createRef();
  componentDidUpdate(){
  }

  componentDidMount() {

  }

  onFormUpdate =  (values) =>{
   const { user } = this.props;
    console.log(values);
    let userUpdateObj = {
        ...values,
        password:values.password ? values.password:null
    }
   this.props.dispatch(userActions.updateUser(userUpdateObj,user.id))
    message.success('Profile Update Successfully!!');
    message.success('System will be logged off now !!!');
    setTimeout(() => {
        this.props.dispatch(userActions.logout());
    }, 2000);
  }
  getCityName = (id) => {
    const { pc_cities } = this.props && this.props.professionals;
    if (pc_cities && pc_cities.length) {
      return _.filter(pc_cities, function (o) {
        return o.id === id;
      })[0] && _.filter(pc_cities, function (o) {
        return o.id === id;
      })[0].City;
    }
  };
  render() {
    const { user,users } = this.props;
    const { pc_cities, basicDistricts } = this.props;
    return (
      <div className="col-md-6 col-md-offset-3">
         <div className="site-page-header-ghost-wrapper">
    <PageHeader
      ghost={false}
      onBack={ false}
      title={user && user.userid}
      subTitle={user && user.role==='4'?'( ADMIN )':'( SUPER ADMIN )'}
      extra={[
 
      ]}
    >
      <Descriptions size="small" column={3}>
        <Descriptions.Item label={user && user.role==='8'?'State Name':'City Name'}>{user && user.role==='8'?'महाराष्ट्र':'महाराष्ट्र' + " " +'( ' + this.getCityName(user && user.cityId) + ' )'}</Descriptions.Item>
        <Descriptions.Item  label="" >
        </Descriptions.Item>
      </Descriptions>
    </PageHeader>
  </div>
       
        <Divider />
        <ProfileForm
            ref={this.userForm}
            user={user}
            cityData={pc_cities}
            isUpdate = {this.state.isUpdate}
            districtData ={basicDistricts}
            users = {users}
            onFormFinish = {this.onFormFinish}
            onFormUpdate = {this.onFormUpdate}
            userFormEditData= {user}
            resetFrom= {this.state.resetFrom}
          ></ProfileForm>
    
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication, professionals } = state;
  const { user } = authentication;
  const { newsList ,pc_cities, basicDistricts} = professionals;
  return {
    user,
    users,
    professionals,
    pc_cities,
    basicDistricts,
  };
}

const connectedProfile = connect(mapStateToProps)(Profile);
export { connectedProfile as Profile };
