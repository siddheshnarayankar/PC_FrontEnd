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
  Modal,
  Spin
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FindAccusedTable } from "./FindAccusedTable";
import { ViewFormModel } from "../ProfessionalForm/ViewForm/ViewFormModel";
 
 

const { Option } = Select;
const FormItem = Form.Item;
let columns = [];
let data = [];
class FindAccusedPage extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    isCreateUserDrawerVisible: false,
    isUpdate:false,
    userFormEditData:[],
    resetFrom:false,
    userList:[],
    setCriminalViewModel: false,
  };
  userForm = React.createRef();
  controller = new AbortController();

  componentDidUpdate(){
    // const { authentication } = this.props;

    // if(authentication && authentication.user && authentication.user.role==='2'){
    //   return <Redirect to='/login'  />
    // }
  }
 
  componentDidMount() {
    const { user } = this.props;
   
    if (user && user.cityId && user && user.role ==='4') {
      const { criminalsTableList  } = this.props.professionals;
      if(!criminalsTableList){
        this.props.dispatch(professionalAction.getCriminalsTableInfoById('cityId',this.props.user.cityId,this.controller.signal));
      } 
    }  
  }

  componentWillUnmount(){
    this.controller.abort();
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
  showCriminalViewModel = () => {
    this.setState({
      setCriminalViewModel: true,
    });
  };
  closeCriminalViewModel = () => {
    this.setState({
      setCriminalViewModel: false,
    });
  };
  
  onCityChange = (selectedCity) =>{
      if(selectedCity){
        this.props.dispatch(professionalAction.getCriminalsTableInfoById('cityId',selectedCity));
      }
  }

  onViewAccusedDetails = (data) => {
    if (data) {
      this.showCriminalViewModel();
      this.props.dispatch(professionalAction.getCriminalsViewsById(data));
    }
  };

  render() {
    const { users } = this.props;
    const { user } = this.props;
    const {  professionals } = this.props;
    const { pc_cities,loading  } = professionals;
  
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
        <Descriptions.Item >
            <Form.Item
              name="city"
              label="घटक"
              style={{width:'30%'}}
            >
              <Select
                style={{width:'100%'}}
                onChange= {this.onCityChange}
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
        
          </Descriptions.Item>
        </Descriptions>
    </PageHeader>
  </div>
       
        <Divider />
                     
        <FindAccusedTable
           criminalRecords={professionals}
           onViewAccusedDetails= {this.onViewAccusedDetails}
        ></FindAccusedTable>
       
     <Modal
          title="प्रोफेशनल क्रिमिनल"
          top
          visible={this.state.setCriminalViewModel}
          onOk={this.closeCriminalViewModel}
          onCancel={this.closeCriminalViewModel}
          width={95 + "%"}
        >
          <ViewFormModel dataStates={professionals}></ViewFormModel>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
    const { users, authentication, professionals } = state;
    const { user } = authentication;
    return {
      user,
      users,
      professionals,
    };
  }

const connectedFindAccusedPage = connect(mapStateToProps)(FindAccusedPage);
export { connectedFindAccusedPage as FindAccusedPage };
