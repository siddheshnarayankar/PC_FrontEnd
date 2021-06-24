import React from "react";
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
import { Document1 } from "./ReportDocuments/Document_1";
import { Document2 } from "./ReportDocuments/Document_2";
import { saveAs } from "file-saver";
import { pdf  } from "@react-pdf/renderer";
import { TableReport3 } from "./Tables/Table3";
 
const { RangePicker } = DatePicker;
const { Option } = Select;
 
 
class Reports3 extends React.Component {
  constructor(props) {
    super(props);
  }
 
  state = {
    loading:false,
    downloadLoding:false,
    report_1_startDate:'',
    report_1_endDate:'',
    report1_loader:false,
    report1_List:[],
    report1_List_Total:null,
    report1_API_loader:false
  };
  

 
  

  downloadReport1  = async () => {
    const { user } = this.props;
    let obj = {
      startDate:this.state.report_1_startDate,
      endDate:this.state.report_1_endDate,
      cityId:user && user.cityId
    }
    this.setState({
      report1_loader:true
    })
            const blob = await pdf(
              <Document1  rows={this.state.report1_List} filterDate={obj} total={this.state.report1_List_Total}  />
            ).toBlob();
            
            if(blob){
              this.setState({
                report1_loader:false
              })
              saveAs(blob, "पोलिस स्टेशन निहाय गस्त आकडेवारी अहवाल");
            }
            
  }

  generatePDFReport1 = async () => {
    const { user } = this.props;
    let obj = {
      startDate:this.state.report_1_startDate,
      endDate:this.state.report_1_endDate,
      cityId:user && user.cityId
    }
    this.setState({
      report1_API_loader:true
    })
      professionalAction.getReport3(obj).then((res)=>{
      res && res && res.text().then(async (text) => {
             const tempData  =  text && JSON.parse(text);
             const tempFilterData = _.filter(tempData &&  tempData.data && _.flatten(tempData.data) , function(o) {return  Object.keys(o).length !== 0});
            this.setState({
              report1_API_loader:false,
              report1_List:tempFilterData,
              report1_List_Total:tempData && tempData.allTotalCriminals
            })
        })
    })
  };

  
  onFinishDateRangeGPSTable = (values) => {
    if(values){
     this.setState({
      report_3_startDate:values.toISOString()
     })
    }
  }


  onFinishDateRangeGPSReport1 = (values) => {
    if(values){
     this.setState({
      report_1_startDate:values.toISOString()
     })
    }
  }

    
  render() {
    const { users } = this.props;
    const { user } = this.props;
    const {  professionals } = this.props;
    const { pc_cities,loading  } = professionals;
  
    return (
      <div className="col-md-6 col-md-offset-3">
         <div className="site-page-header-ghost-wrapper">
         <PageHeader
                className="site-page-header"
                ghost={false}
                onBack={ false}
                title={user && user.userid}
                subTitle={user && user.role==='4'?'( ADMIN )':'( SUPER ADMIN )'}
                
            >
            
       </PageHeader>
       <PageHeader
                className="site-page-header"
                ghost={false}
                onBack={ false}
                title={'पोलिस स्टेशन निहाय गस्त आकडेवारी अहवाल'}
                extra={[
                  <Button key="1" type="primary" disabled={!this.state.report1_List.length} loading={this.state.report1_loader} onClick={this.downloadReport1}>
                    Download
                  </Button>,
                ]}
            >
                <Descriptions size="small" column={2}>
                  <Descriptions.Item label="Select Date" >
                  <DatePicker  style={{marginRight:10}} onChange={val => this.onFinishDateRangeGPSReport1(val)} />
                  <Button key="1" type="primary" disabled={!this.state.report_1_startDate} loading={this.state.report1_API_loader} onClick={this.generatePDFReport1}>
                    Find
                  </Button>
                  </Descriptions.Item>
                  
                </Descriptions>
              
       </PageHeader>
     
       <TableReport3 data={this.state.report1_List}  total={this.state.report1_List_Total} ></TableReport3>
        
  </div>
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

const connectedReports3 = connect(mapStateToProps)(Reports3);
export { connectedReports3 as Reports3 };
