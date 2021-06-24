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
import { Document4 } from "./ReportDocuments/Document_4";
import { saveAs } from "file-saver";
import { pdf  } from "@react-pdf/renderer";
import { TableReport4 } from "./Tables/Table4";
 
const { RangePicker } = DatePicker;
const { Option } = Select;
 
 
class Reports4 extends React.Component {
  constructor(props) {
    super(props);
  }
 
  state = {
    loading:false,
    downloadLoding:false,
    report_4_startDate:'',
    report_4_endDate:'',
    report4_loader:false,
    report4_List:[],
    report4_List_Total:null,
    report4_API_loader:false
  };
  

 
  

  downloadReport1  = async () => {
    const { user } = this.props;
    let obj = {
      startDate:this.state.report_4_startDate,
      endDate:this.state.report_4_endDate,
      cityId:user && user.cityId
    }
    this.setState({
      report4_loader:true
    })
            const blob = await pdf(
              <Document4  rows={this.state.report4_List} filterDate={obj} total={this.state.report4_List_Total}  />
            ).toBlob();
            
            if(blob){
              this.setState({
                report4_loader:false
              })
              saveAs(blob, "अद्याप चेक न केलेले आरोपी");
            }
            
  }

  generatePDFReport1 = async () => {
    const { user } = this.props;
    let obj = {
      startDate:this.state.report_4_startDate,
      endDate:this.state.report_4_endDate,
      cityId:user && user.cityId
    }
    this.setState({
      report4_API_loader:true
    })
      professionalAction.getReport4(obj).then((res)=>{
      res && res && res.text().then(async (text) => {
             const tempData  =  text && JSON.parse(text);
             const tempFilterData = _.filter(tempData &&  tempData.data && _.flatten(tempData.data) , function(o) {return  Object.keys(o).length !== 0});
            this.setState({
              report4_API_loader:false,
              report4_List:tempFilterData,
              report4_List_Total:tempData && tempData.allTotalCriminals
            })
        })
    })
  };

  
 


  onFinishDateRangeGPSReport1 = (values) => {
    if(values){
      let dates =  values && values.map((item)=>{
        return item.toISOString() 
     })
     this.setState({
      report_4_startDate:dates[0],
      report_4_endDate:dates[1]
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
                title={'अद्याप चेक न केलेले आरोपी'}
                extra={[
                  <Button key="1" type="primary" disabled={!this.state.report4_List.length} loading={this.state.report4_loader} onClick={this.downloadReport1}>
                    Download
                  </Button>,
                ]}
            >
                <Descriptions size="small" column={2}>
                  <Descriptions.Item label="Select Date" >
                  <RangePicker  onChange={val => this.onFinishDateRangeGPSReport1(val)} style={{marginRight:10}} />
                  {/* <DatePicker  style={{marginRight:10}} onChange={val => this.onFinishDateRangeGPSReport1(val)} /> */}
                  <Button key="1" type="primary" disabled={!this.state.report_4_startDate} loading={this.state.report4_API_loader} onClick={this.generatePDFReport1}>
                    Find
                  </Button>
                  </Descriptions.Item>
                  
                </Descriptions>
              
       </PageHeader>
     
       <TableReport4 data={this.state.report4_List}  total={this.state.report4_List_Total} ></TableReport4>
        
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

const connectedReports4 = connect(mapStateToProps)(Reports4);
export { connectedReports4 as Reports4 };
