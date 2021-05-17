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
import { PlusOutlined } from "@ant-design/icons";
import { UserForm } from "./UserForm";
import { UsersListTable } from "./UsersListTable";

const { Option } = Select;
const FormItem = Form.Item;
let columns = [];
let data = [];
class HomePage extends React.Component {
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
    // const { authentication } = this.props;

    // if(authentication && authentication.user && authentication.user.role==='2'){
    //   return <Redirect to='/login'  />
    // }
  }

  componentDidMount() {
    const { user } = this.props;
    // this.props.dispatch(professionalAction.getAllMaster());
    // this.props.dispatch(professionalAction.getCity());
    // this.props.dispatch(professionalAction.getDharm());
    // // this.props.dispatch(professionalAction.getKalam());
    // this.props.dispatch(professionalAction.getKayda());
    // this.props.dispatch(professionalAction.getCrimeType());
    // this.props.dispatch(professionalAction.getCrimeTitle());
    // this.props.dispatch(professionalAction.getStatus());
    if (user && user.cityId && user && user.role ==='4') {
      this.props.dispatch(userActions.getAll(user && user.cityId, 2));
    } else if (user && user.role === "8") {
      this.props.dispatch(userActions.getAdminUsers(4));
    }

    // this.props.dispatch(professionalAction.getCity());

    if (user && user.role === "8") {
      // this.props.dispatch(professionalAction.getCity());
    } else if (user && user.role === "4") {
      this.props.dispatch(professionalAction.getDistrict(user && user.cityId, 1));
    }
  }

  onOpenCrateUserDrawer = () => {
    this.setState({
      isCreateUserDrawerVisible: true,
      resetFrom:true,
      isUpdate:false
    });
  };
  onCloseCrateUserDrawer = () => {
    this.setState({
      isCreateUserDrawerVisible: false,
      resetFrom:false,
      isUpdate:false
    });
  };

  componentDidUpdate(prevState) {
    
  }

  onCityChange = (cityid) =>{
    const { user } = this.props;
    if (user && user.cityId && user && user.role ==='4') {
      this.props.dispatch(userActions.getAll(cityid, 2));
    }  
  }
  // shouldComponentUpdate(nextProps, nextState) {
    
  //     // if(this.props && this.props.users && this.props.users.error === nextProps && nextProps.users && nextProps.users.error){
  //     //     message.error('Mobile Number Already used')
  //     // }
  //   return false;  
  // }

  onFormFinish =  (values) => {
    const { user ,users,professionals} = this.props;
    let ob = {
      ...values,
      role: user.role === "8" ? "4" : user.role === "4" ? "2" : null,
      stateId: "1",
      cityId:
        user.role === "8"
          ? values.cityId
          : user.role === "4"
          ? user.cityId
          : null,
    };

     this.props.dispatch(userActions.createUser(ob))
     this.setState((prevState) => ({
      isCreateUserDrawerVisible: false,
    }));
  };
  onFormUpdate =  (values) =>{
    const {id} = this.state.userFormEditData;
   this.props.dispatch(userActions.updateUser(values,id))
    this.setState((prevState) => ({
      isCreateUserDrawerVisible: false,
      isUpdate:false,
    }));
  }
  getDistrictName = (id) => {
    const { basicDistricts } = this.props;
    if (basicDistricts && basicDistricts.length) {
      return _.filter(basicDistricts, function (o) {
        return o.id === id;
      })[0] &&  _.filter(basicDistricts, function (o) {
        return o.id === id;
      })[0].DistrictName;
    }
  };
  getCityName = (id) => {
    const { pc_cities } = this.props;
    if (pc_cities && pc_cities.length) {
      return _.filter(pc_cities, function (o) {
        return o.id === id;
      })[0] && _.filter(pc_cities, function (o) {
        return o.id === id;
      })[0].City;
    }
  };

  onEdituser = (data) => {
    this.setState((prevState) => ({
      isCreateUserDrawerVisible: true,
      isUpdate:true,
      userFormEditData:data
    }));
  };


  onUserFormSave = () =>{
      this.userForm.current.onFinish(true);
  }
  onUserFormUpdate = () =>{
    this.userForm.current.onFinish(false);
  }

  render() {
    const { users } = this.props;
    const { user } = this.props;
    const { pc_cities, basicDistricts } = this.props;

    const requiredKeys = ["userid", "name", "पोलिस ठाणे", "district", "phone"];
    if (users && users.users && users.users.length > 0) {
      let columns1 =
        users &&
        users.users &&
        users.users.map((itemObj, index) => {
          return {
            ...itemObj,
            key: index + 1,
            district: this.getDistrictName(itemObj.districtId),
            'पोलिस ठाणे': this.getCityName(itemObj.cityId),
          };
        });

      let tablelabes = columns1 && Object.keys(columns1[0]);

      let tableColumns = [];
      tablelabes.forEach((item) => {
        if (
          _.filter(requiredKeys, function (o) {
            return o === item;
          }).length
        ) {
          tableColumns.push(item);
        }
      });


      let columnList = tableColumns.map((item) => {
           return {
          title: item,
          dataIndex: item,
          key: item,
        };
      });
      columns1.reverse();
      data = columns1;
      columns = columnList;
    }else{
      data = []
    }
    return (
      <div className="col-md-6 col-md-offset-3">
         <div className="site-page-header-ghost-wrapper">
    <PageHeader
      ghost={false}
      onBack={ false}
      title={user && user.userid}
      subTitle={user && user.role==='4'?'( ADMIN )':'( SUPER ADMIN )'}
      extra={[
 
        <Button
          type="primary"
          className="mb-4"
          onClick={this.onOpenCrateUserDrawer}
        >
          नवीन जोडा
        </Button>,
      ]}
    >
      <Descriptions size="small" column={3}>
        <Descriptions.Item label={user && user.role==='8'?'State Name':'City Name'}>{user && user.role==='8'?'महाराष्ट्र':'महाराष्ट्र' + " " +'( ' + this.getCityName(user && user.cityId) + ' )'}</Descriptions.Item>
        {/* <Descriptions.Item label="Crated Date"> </Descriptions.Item> */}
        <Descriptions.Item  label="" >
       {/* {
         user && user.role ==='4' ?(
            <Form.Item
              name="city"
              label="पोलीस चौकी"
              style={{width:'100%'}}
            >
              <Select
                style={{width:'100%'}}
                placeholder="Please select an City"
                rules={[{ required: true, message: "Please select an City" }]}
                onChange={this.onCityChange}
              >
                {pc_cities &&
                  pc_cities.length &&
                  pc_cities.map((res, index) => (
                    <Option key={index} value={res.id}>
                      {res.City}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
         ):null
       } */}
        
        </Descriptions.Item>
      </Descriptions>
    </PageHeader>
  </div>
       
        <Divider />
        <Drawer
          title="नवीन वापरकर्ता जोडा"
          placement="right"
          width={720}
          closable={true}
          onClose={this.onCloseCrateUserDrawer}
          visible={this.state.isCreateUserDrawerVisible}
          footer={
            <div
              style={{
                textAlign: "right",
              }}
            >
              <Button
                onClick={this.onCloseCrateUserDrawer}
                style={{ marginRight: 8 }}
              >
                Cancel
              </Button>
              {!this.state.isUpdate ? (
                <Button
                  onClick={this.onUserFormSave}
                  type="primary"
                >
                  Save
                </Button>
              ) : (
                <Button
                  onClick={this.onUserFormUpdate}
                  type="primary"
                >
                  Update
                </Button>
              )}
            </div>
          }
        >
          <UserForm
            ref={this.userForm}
            user={user}
            cityData={pc_cities}
            isUpdate = {this.state.isUpdate}
            districtData ={basicDistricts}
            users = {users}
            onFormFinish = {this.onFormFinish}
            onFormUpdate = {this.onFormUpdate}
            userFormEditData= {this.state.userFormEditData}
            resetFrom= {this.state.resetFrom}
          ></UserForm>
        </Drawer>
        <UsersListTable
          onEdituser={this.onEdituser}
          data={data}
          columns={columns}
          userRole ={user}
        ></UsersListTable>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication, professionals } = state;
  const { user } = authentication;
  const { pc_cities, basicDistricts } = professionals;
  return {
    user,
    users,
    pc_cities,
    basicDistricts,
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
