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
import { UploadOutlined} from "@ant-design/icons";
import { NotificationsForm } from "./NotificationsForm";
import { NotificationsTable } from "./NotificationsTable";
import './Notifications.css'

const { Option } = Select;
const FormItem = Form.Item;
let columns = [];
let data = [];
 const baseUrl = 'https://www.criminalmis.in/api';
 // const baseUrl = 'http://localhost:8080/api';
class Notifications extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    isCreateUserDrawerVisible: false,
    isUpdate:false,
    userFormEditData:[],
    resetFrom:false,
    userList:[],
    progress:0,
    fileList:[],
    uploadedFileName:''
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
    if (user && user.cityId && user && user.role ==='4') {
      this.props.dispatch(professionalAction.getNews(1));
    } else if (user && user.role === "8") {
      this.props.dispatch(professionalAction.getNews(1));
    }

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

  onCityChange = (cityid) =>{
    const { user } = this.props;
    if (user && user.cityId && user && user.role ==='4') {
      this.props.dispatch(userActions.getAll(cityid, 2));
    }  
  }


  onNewsStatusChange = (values,flag) =>{
    if(values){
      let updateObj ={
        status:flag
      }
      this.props.dispatch(professionalAction.updateNews(values.id,updateObj));
      message.success('Update the Notification status !!!')
    }
  }
 
  onFormFinish =  (values) => {
    const { user ,users,professionals} = this.props;
    if(values && parseInt(values.newsType) !== 1){
      this.uploadImage(values)
    }else{
      let obj = {
        uploadedFileName:null,
        uploadedFileUrl:null,
        descriptions:values.newdescription,
        newsType:values.newsType,
        status:1,
        userId:user && user.id,
        itemType:1,
        role:user && user.role,
        cityId:null,
        publishedDate:new Date()
      }
      // onSuccess("Ok");
      this.props.dispatch(professionalAction.createNews(obj))
      this.setState((prevState) => ({
        isCreateUserDrawerVisible: false,
        resetFrom:true,
      }));
      message.success('Notification save Successfully !!!');
    }
    // this.props.dispatch(userActions.createUser(ob))
       
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
    const { pc_cities } = this.props && this.props.professionals;
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

  uploadImage = async options => {
    const { onSuccess, onError, files, onProgress } = options;
    const { user ,users,professionals} = this.props;

    const appendType = options &&  parseInt(options.newsType) === 2?'profileImage':'videoUpload';
    const imageUploadUrl = options &&  parseInt(options.newsType) === 2?'/imageupload/profile-img-upload':'/imageupload/video-upload';

    const fmData = new FormData();
    // this.setProgress(0);
    this.setState({
      progress:0
    })
    const config = {
      headers: {  
      'accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${fmData._boundary}`},
    };
 
    fmData.append(appendType,files && files.file.originFileObj,files && files.file && files.file.name);
    try {
      const res = await axios.post(
        baseUrl + imageUploadUrl,
        fmData,
        config 
      );
      if(res.data && res.data.error){
          message.error('something went wrong !!!');
      }else{
          if(res.data){
            let obj = {
              uploadedFileName:res.data.imageName,
              uploadedFileUrl:res.data.imageLocation,
              descriptions:options.newdescription,
              newsType:options.newsType,
              status:1,
              userId:user && user.id,
              itemType:1,
              role:user && user.role,
              cityId:null,
              publishedDate:new Date()
            }
            // onSuccess("Ok");
            this.props.dispatch(professionalAction.createNews(obj))
            this.setState((prevState) => ({
              isCreateUserDrawerVisible: false,
              resetFrom:true,
            }));
            message.success('Notification save Successfully !!!');
          }
       }
    } catch (err) {
      // const error = new Error("Some error");
      // onError({ err });
      message.error('something went wrong !!!');
    }
  };


  

  render() {
    const { users } = this.props;
    const { user } = this.props;
    const { newsList } = this.props;

    const requiredKeys = [];
    if (newsList && newsList.length && newsList.length > 0) {

      // newsList.reverse();
      let columns1 =
      newsList &&
      newsList.length &&
      newsList.map((itemObj, index) => {
          return {
            ...itemObj,
            key: index + 1,
           'SrNo':index + 1
          };
        });

      let tablelabes = columns1 && Object.keys(columns1[0]);
     
      let tableColumns = [];
      tableColumns && tableColumns.unshift("SrNo")
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
      // columns1.reverse();
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
        <Descriptions.Item  label="" >
        </Descriptions.Item>
      </Descriptions>
    </PageHeader>
  </div>
       
        <Divider />
        <Drawer
          title="नवीन बातमी जोडा"
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
          <NotificationsForm
            ref={this.userForm}
            user={user}
            isUpdate = {this.state.isUpdate}
            users = {users}
            onFormFinish = {this.onFormFinish}
            onFormUpdate = {this.onFormUpdate}
            userFormEditData= {this.state.userFormEditData}
            resetFrom= {this.state.resetFrom}
          ></NotificationsForm>
        </Drawer>
        <NotificationsTable
          onEdituser={this.onEdituser}
          onNewsStatusChange = {this.onNewsStatusChange}
          data={data}
          columns={columns}
          userRole ={user}
        ></NotificationsTable>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication, professionals } = state;
  const { user } = authentication;
  const { newsList } = professionals;
  return {
    user,
    users,
    newsList,
    professionals
  };
}

const connectedNotifications = connect(mapStateToProps)(Notifications);
export { connectedNotifications as Notifications };
