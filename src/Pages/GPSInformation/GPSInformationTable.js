import React, { useEffect, useState } from "react";
import { Table, Input, Button, Space,Select,Tag } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import _ from "lodash";
import moment from 'moment';
 
 
export class GPSInformationTable extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
  };
 
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  handleEditForm = (data) =>{
      this.props.onEdituser(data);
  }

  onChangeState = (value,flag) =>{
    this.props.onNewsStatusChange(value,flag);   
  }

  onChangeTable = (pagination,filters, sorter, extra) =>{
    if(pagination){
      this.props.changePagination(extra)
    }
  }

  getDateFormat = (value) =>{
    if(value){
      return moment(value).format('LLL');
    }
  }

  render() {

    let tempColumns = [];

    // if(this.props.userRole && this.props.userRole.role ==='8'){
    //     tempColumns = _.filter(this.props.columns ,(o)=>{return o.title !=="district"});
    // }else if(this.props.userRole && this.props.userRole.role ==='4'){
    //     tempColumns =  this.props.columns
    // }
    
    tempColumns =  this.props.columns

    let columns =tempColumns.map((res) => {
      return {
        ...res,
        // ...this.getColumnSearchProps(res.dataIndex),
      };
    });


     
     

    let columnsOb = [
      {
        title: "SrNo",
        key: "name",
        render: (text, record) => (
          <Space size="large"    >
              {record && record.SrNo}
          </Space>
        ),
     
      },
      {
        title: "आरोपीचे नाव",
        key: "name",
        sorter: (a, b) =>  {
          if(a.name.length){
            return a.name.localeCompare(b.name)
          }
       },
        render: (text, record) => (
          <Space size="middle" >
              {record && record.name}
          </Space>
        ),
     
      },
      {
        title: "पोलीस स्टेशन",
        key: "districtName",
        sorter: (a, b) =>  {
          if(a.districtName.length && b.districtName.length){
            return a.districtName.localeCompare(b.districtName)
          }
        },
        render: (text, record) => (
          <Space size="middle" style={{width:100}}>
              {record && record.districtName}
          </Space>
        ),
     
      },
      //  {
      //   title: "पत्ता",
      //   key: "address",
      //   render: (text, record) => (
      //     <Space size="middle" style={{width:100}} >
      //         {record && record.baseInfo && record.baseInfo[0].address}
      //     </Space>
      //   ),
      // }, 
      {
        title: "User Name",
        key: "userName",
        ...this.getColumnSearchProps('userName'),
        render: (text, record) => (
          <Space size="middle"  >
              {record && record.userName?record.userName:'NO USER' }
          </Space>
        ),
      }, 
      {
        title: "फोटो",
        key: "photo",
        filters: [
          {
            text: 'फोटो',
            value: 1,
          },
          {
            text: 'नाही',
            value: null,
          },
        ],
        onFilter: (value, record) => {
          console.log(value)
          if(value){
            return record.image?record.image.length >= value:null
          }else{
            return record.image === value
          }
        },
        render: (text, record) => (
          <Space size="middle" >
               {record.image?<img src={'https://pcimageupload.s3.ap-south-1.amazonaws.com/' + record.image}  style={{width:60,height:60}} />:<span>No Image</span>} 
          </Space>
        ),
      }, 
      {
        title: "GPS Location",
        key: "gpsLocation",
        render: (text, record) => (
          <Space size="middle" style={{display:'flex',flexDirection:'column',alignSelf:'flex-start',}} >
              <div>
                 <span>Latitude</span>:<span>{record.latitude && record.latitude}</span>
              </div>
              <div>
                 <span>Longitude</span>:<span>{record.longitude && record.longitude}</span>
              </div>
              <div>
                 <span>Location URL</span>:
                 <span>
                    <a target="_blank" href={`https://www.google.com/maps?daddr=${record && record.latitude && record.latitude},${record && record.longitude && record.longitude}`}>Direction</a>
                 </span>
              </div>
          </Space>
        ),
      },
      {
        title: "गस्त वेळ",
        key: "gpstimedate",
        dataIndex:"gpstimedate",
        defaultSortOrder: 'ascend',
         sorter: (a, b) =>  {
          let conss =    moment(a.gpstimedate).format('YYYYMMDD') -moment(b.gpstimedate).format('YYYYMMDD')
            return conss
          },
        render: (text, record) => (
          <Space size="middle"   >
              {record && record.gpstimedate && record.gpstimedate? this.getDateFormat(record.gpstimedate):'No Date'}
          </Space>
        ),
      },
      {
        title: "मिळून आला/नाही ",
        key: "status",
        filters: [
          {
            text: 'आला',
            value: 1,
          },
          {
            text: 'नाही',
            value: 0,
          },
        ],
        onFilter: (value, record) => {
          if(value){
            return record.status?record.status === 'yes':null
          }else{
            return record.status !== 'No'
          }
        },
        render: (text, record) => (
          <Space size="middle" style={{display:'flex',flexDirection:'column',alignSelf:'flex-start'}} >
              {record.status?'होय':'नाही'}
              {record.statusDetails}
          </Space>
        ),
      }, 
    ]
 
    columns.push(
      ...columnsOb
    );

  
    return (
<>
 
 
 {/* <Table   columns={columns} dataSource={this.props.data}  
    pagination={{ total: this.props.totalItems }}
     /> */}
 <Table   columns={columns} dataSource={this.props.data}  
    pagination={{ total: this.props.totalItems }}
    onChange={this.onChangeTable} />
</>
    );
  }
}
