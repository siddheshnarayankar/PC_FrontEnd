import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import moment from 'moment';
import { professionalAction, userActions } from "../../_actions";
import { saveAs } from "file-saver";
import { pdf, Document, Page } from "@react-pdf/renderer";
import {
  Drawer,
  Form,
  Select,
  Divider,
  PageHeader,
  Descriptions,
  message,
  Spin,
  DatePicker,
  Button,
  Row,Col
} from "antd";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { GPSInformationTable } from "./GPSInformationTable";
import './GPSInformation.css'
import { MyDocument } from './GPSPDFDocuments'
const { Option } = Select;
 
const { RangePicker } = DatePicker;
let columns = [];
let data = [];

 
  //const baseUrl = 'https://www.criminalmis.in/api';
 const baseUrl = 'http://localhost:8080/api';
class GPSInformation extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    loading:false,
    downloadLoding:false,
    tableColumns:[],
    tableData:[],
    gpsInformationList:[],
    filterDate:[]
  };
 
  componentDidMount() {
    const { user } = this.props;
    if (user && user.cityId && user && user.role ==='4') {
      // this.props.dispatch(userActions.getAll(user && user.cityId, 2));
    this.setState({
      loading:true
    })
    const { newsList ,gpsInformationList} = this.props;
    console.log(gpsInformationList)
    if(!gpsInformationList || !gpsInformationList.length){
            professionalAction.getGPSInformation().then((res)=>{
                  res && res.text().then(text => {
                    this.setState({
                      gpsInformationList: text && JSON.parse(text),
                      loading:false
                    })
                    this.props.dispatch(professionalAction.getGPSInformationSuccess(text && JSON.parse(text)));
            })
        })
      }{
        this.setState({
          gpsInformationList: gpsInformationList,
          loading:false
        })
      }

    } 
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

  

  onUserFormSave = () =>{
      this.userForm.current.onFinish(true);
  }
  onUserFormUpdate = () =>{
    this.userForm.current.onFinish(false);
  }
  changePagination = (value) => {
    if(value.currentDataSource){
      this.setState({
        gpsInformationList:value.currentDataSource
      })
    }
  }
   
 

  onFinishDateRangeGPSTable = (values) => {
   
    if(values){
      let dates =  values && values.map((item)=>{
        return item.toISOString() 
     })
      let temp =  _.filter(JSON.parse(JSON.stringify(this.state.gpsInformationList)), (o) => {
            if (moment(o.gpstimedate).isBetween(dates[0], dates[1])) {
                return o
            }
        });
        this.setState({
          gpsInformationList:temp,
          filterDate:[dates[0],dates[1]]
        })
    }else{
      setTimeout(() => {
        const { newsList ,gpsInformationList} = this.props;
        this.setState({
          gpsInformationList:gpsInformationList,
          filterDate:[]
        })
      }, 1000);
    }

  };
  
  genratepdf  = () =>{
     <PDFDownloadLink document={<MyDocument rows={this.state.gpsInformationList}   />} fileName="somename.pdf">
          {({ loading }) => (loading ? 'Loading document...' : 'Download now!')}
        </PDFDownloadLink>
  }


  // getPDFFile = () => {
  //   let startDate ='';
  //   if(this.state.startDate){
  //     startDate= this.state.startDate;
  //   }else{
  //     let newDate  = new Date();
  //     startDate = newDate.toISOString();
  //     //  startDate = "2021-04-02T14:29:24.630Z";
  //   }
  //   this.setState({
  //     downloadLoding:true
  //   })
  //    axios(`http://localhost:8080/api/criminal/getPdf/${startDate}/${this.state.endDate}`, {
  //           method: 'GET',
  //           responseType: 'blob' //Force to receive data in a Blob Format
  //       })
  //       .then(response => {
  //       //Create a Blob from the PDF Stream
  //           const file = new Blob(
  //             [response.data], 
  //             {type: 'application/pdf'});
  //       //Build a URL from the file
  //           const fileURL = URL.createObjectURL(file);
  //       //Open the URL on new Window
  //           window.open(fileURL);
  //           this.setState({
  //             downloadLoding:false
  //           })
  //       })
  //       .catch(error => {
  //           console.log(error);
  //           this.setState({
  //             downloadLoding:false
  //           })
  //       });
  // }   
  generatePDFDocument = async () => {
    this.setState({
      downloadLoding:true
    })
    const blob = await pdf(
      <MyDocument   rows={this.state.gpsInformationList} filterDate={this.state.filterDate} />
    ).toBlob();
  
    if(blob){
      this.setState({
        downloadLoding:false
      })
    }
  
    saveAs(blob, "CMISgpsReport");
  };
   
  render() {
    const { user,loading } = this.props;
    const requiredKeys = [];
    if (this.state.gpsInformationList  &&  this.state.gpsInformationList.length > 0) {
      
      let columns1 =
      this.state.gpsInformationList &&
      this.state.gpsInformationList.length && this.state.gpsInformationList.map((itemObj, index) => {
          return {
            ...itemObj,
            key: index + 1,
           'SrNo':index + 1
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
      // columns1.reverse();
     
      data = columns1;
      columns = columnList;
 
  
    }else{
      data = [];
    
    }
    return (
      <>
      
      <div className="col-md-6 col-md-offset-3" >
         <div className="site-page-header-ghost-wrapper">
         
    <PageHeader
      ghost={false}
      onBack={ false}
      title={user && user.userid}
      subTitle={user && user.role==='4'?'( ADMIN )':'( SUPER ADMIN )'}
      extra={[
 
        // <Button
        //   type="primary"
        //   className="mb-4"
        //   onClick={this.onOpenCrateUserDrawer}
        // >
        //   नवीन जोडा
        // </Button>,
      ]}
     
    >
      <Descriptions size="small" >
        <Descriptions.Item label={user && user.role==='8'?'State Name':'City Name'}>{user && user.role==='8'?'महाराष्ट्र':'महाराष्ट्र' + " " +'( ' + this.getCityName(user && user.cityId) + ' )'}</Descriptions.Item>
        <Descriptions.Item  label="Select Date" >
      
        <RangePicker  onChange={val => this.onFinishDateRangeGPSTable(val)} style={{marginRight:10}} />
      
        {/* <PDFDownloadLink
        document={<MyDocument cols={columns} rows={data}   /> }
        fileName="movielist.pdf"
        style={{
          textDecoration: "none",
        }}
      >
        <Button
          type="primary"
          className="mb-4"
        >
          Download PDF
        </Button>
      </PDFDownloadLink> */}
      <Button
          type="primary"
          className="mb-4"
          onClick={this.generatePDFDocument}
          loading={this.state.downloadLoding}
        >
        Download PDF
        </Button>
        </Descriptions.Item>
      </Descriptions>
    </PageHeader>
  </div>
       
        <Divider />
        <Spin spinning={loading} delay={500}>
          <div>
        <GPSInformationTable
          onNewsStatusChange = {this.onNewsStatusChange}
          data={data}
          columns={columns}
          userRole ={user}
          changePagination = {this.changePagination}
        ></GPSInformationTable>
        </div>
        </Spin>
      
      </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication, professionals } = state;
  const { user } = authentication;
  const { newsList,gpsInformationList ,loading} = professionals;
  return {
    user,
    users,
    newsList,
    gpsInformationList,
    professionals,
    loading
  };
}

const connectedGPSInformation = connect(mapStateToProps)(GPSInformation);
export { connectedGPSInformation as GPSInformation };
