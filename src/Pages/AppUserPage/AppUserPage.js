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
import { UserForm } from "./userFrom";
import { UsersListTable } from "./UsersListTable";
 
const { Option } = Select;
const FormItem = Form.Item;
let columns = [];
let data = [];
class AppUserLogin extends React.Component {
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
    //this.props.dispatch(professionalAction.getCity());

    if (user && user.cityId && user && user.role ==='4') {
      this.props.dispatch(userActions.getAppUsers(user && user.cityId));
    } else if (user && user.role === "8") {
      this.props.dispatch(userActions.getAdminUsers(4));
    }

    // plain-text string
    const str = 'Base64 Encoding in Node.js';

    // create a buffer
    const buff = Buffer.from(str, 'utf-8');

    // decode buffer as Base64
    const base64 = buff.toString('base64');

    // print Base64 string
   
    // this.props.dispatch(professionalAction.getCity());

    // if (user && user.role === "8") {
    //   // this.props.dispatch(professionalAction.getCity());
    // } else if (user && user.role === "4") {
    //   this.props.dispatch(professionalAction.getDistrict(user && user.cityId, 1));
    // }
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

//   onCityChange = (cityid) =>{
//     const { user } = this.props;
//     if (user && user.cityId && user && user.role ==='4') {
//       this.props.dispatch(userActions.getAll(cityid, 2));
//     }  
//   }
  // shouldComponentUpdate(nextProps, nextState) {
    
  //     // if(this.props && this.props.users && this.props.users.error === nextProps && nextProps.users && nextProps.users.error){
  //     //     message.error('Mobile Number Already used')
  //     // }
  //   return false;  
  // }

  onFormFinish =  (values) => {
    const { user ,users,professionals} = this.props;
    
  };
  onFormUpdate =  (values) =>{
        
        const {id,districtName,cityName} = this.state.userFormEditData;
        let updatedObject = {
            ...values,
            districtName,
            cityName
        }
        if(values){
            this.props.dispatch(userActions.updateAppUser(updatedObject,id));
        }
        this.setState((prevState) => ({
            isCreateUserDrawerVisible: false,
            userFormEditData:[],
            isUpdate:false
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
    if(data){
      const {id,currentIndex} = data;
      let updatedObject = {
        ...data,
        status:currentIndex
      }
        this.props.dispatch(userActions.updateAppUser(updatedObject,id));
        message.success('Update Status Successfully !!!');
    }
  };
  
  

  onUserFormSave = () =>{
      this.userForm.current.onFinish(true);
  }
  onUserFormUpdate = () =>{
    this.userForm.current.onFinish(false);
  }
// this.decryptAES(itemObj.generalPassword, "password_1234")
  render() {
    const { users } = this.props;
    const { user } = this.props;
    const { pc_cities, basicDistricts } = this.props;

    const requiredKeys = ["Sr.No","name", "cityName", "districtName","phone","password"];
    const requiredKeysTitle = ["Sr.No","नाव", "घटक", "पोलिस ठाणे","phone","password"];
    if (users && users.appusers && users.appusers.length > 0) {
      let columns1 =
        users &&
        users.appusers &&
        users.appusers.map((itemObj, index) => {

          const temppass = itemObj.generalPassword?Buffer.from(itemObj.generalPassword, 'base64'):null;

          return {
            ...itemObj,
            key: index + 1,
            "password":  temppass ? temppass.toString('utf-8'):'N/A'
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

     
      tableColumns && tableColumns.unshift("Name")
      tableColumns && tableColumns.unshift("Sr.No")
      let columnList = tableColumns.map((item,index) => {
           return {
          title: requiredKeysTitle[index],
          dataIndex: item,
          key: item,
        };
      });

      columns1 && columns1.map((item) =>{
          item.status = parseInt(item.status) === 0 ? 'Pending':parseInt(item.status) === 1?'Approved':parseInt(item.status) === 2?'Rejected':''
      })
      columns1.reverse();
      let dataSoruce = columns1 && columns1.map((item,index) =>{
        return {
          ...item,
          "Sr.No":index + 1,
          "Name":item.firstName + " " + item.lastName,
        };
      }) 
      data = dataSoruce;
      columns = columnList;
    }else{
      data = []
      columns =[]
    }
    return (
      <div className="col-md-6 col-md-offset-3">
         <div className="site-page-header-ghost-wrapper">
    <PageHeader
      ghost={false}
      onBack={ false}
      title={user && user.userid}
      subTitle={user && user.role==='4'?'( ADMIN )':'( SUPER ADMIN )'}
    //   extra={[
 
    //     <Button
    //       type="primary"
    //       className="mb-4"
    //       onClick={this.onOpenCrateUserDrawer}
    //     >
    //       नवीन जोडा
    //     </Button>,
    //   ]}
    >
      <Descriptions size="small" column={3}>
        <Descriptions.Item label={user && user.role==='8'?'State Name':'City Name'}>{user && user.role==='8'?'महाराष्ट्र':'महाराष्ट्र' + " " +'( ' + this.getCityName(user && user.cityId) + ' )'}</Descriptions.Item>
        {/* <Descriptions.Item label="Crated Date"> </Descriptions.Item> */}
        {/* <Descriptions.Item  label="" >
       {
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
       }
        
        </Descriptions.Item> */}
      </Descriptions>
    </PageHeader>
  </div>
       
        <Divider />
        <Drawer
          title="अ‍ॅप वापरकर्ता"
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

const connectedAppUserLogin = connect(mapStateToProps)(AppUserLogin);
export { connectedAppUserLogin as AppUserLogin };
