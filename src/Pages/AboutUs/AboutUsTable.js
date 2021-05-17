import React, { useEffect, useState } from "react";
import { Table, Input, Button, Space,Select,Tag } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import _ from "lodash";
import moment from 'moment';

export class AboutUsTable extends React.Component {
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
  getDateFormat = (value) =>{
    if(value){
      return moment(value).format('MMM-DD-YYYY');
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
        title: "Descriptions",
        key: "descriptions",
        ...this.getColumnSearchProps('descriptions'),
        render: (text, record) => (
          <Space size="middle" style={{maxWidth:300}}>
              {record.descriptions}
          </Space>
        ),
     
      },
   
      {
        title: "Upload Image",
        key: "uploadedFileUrl",
        render: (text, record) => (
          <Space size="middle">
               {
              parseInt(record.newsType) === 1?<span>--
              </span>: parseInt(record.newsType) === 2?<span>
              {record.uploadedFileUrl?<img src={record.uploadedFileUrl}  style={{width:60,height:60}} />:<span>No Image</span>}
              </span>:(
                  <video width="100" height="100" controls>
                  <source src={record.uploadedFileUrl}/>
                </video>
              )}
           
          </Space>
        ),
      },
      {
        title: "About Us Type",
        key: "newsType",
        render: (text, record) => (
          <Space size="middle">
            {
              parseInt(record.newsType) === 1?<span>
                Text
              </span>: parseInt(record.newsType) === 2?<span>
               Image
              </span>:<span>
               Video
              </span>
            }
          </Space>
        ),
      },
      {
        title: "Published date",
        key: "publishedDate",
        render: (text, record) => (
          <Space size="middle">
            { 
              // moment(record.publishedDate)
             record.publishedDate?this.getDateFormat(record.publishedDate):'No Date'
             
            }
          </Space>
        ),
      },
      {
        title: "Status",
        key: "status",
        render: (text, record) => (
          <Space size="middle">
            {
              parseInt(record.status) === 1?<span>
                <Tag color="#87d068"> <a  onClick={() => this.onChangeState(record,0)}>Active</a></Tag>
              </span>:<span>
              <Tag  color="#f50"><a  onClick={() => this.onChangeState(record,1)}>In Active</a></Tag>
              </span>
            }
          </Space>
        ),
      }
    ]
  
    columns.push(
      ...columnsOb
    );
    
  
    return <Table columns={columns} dataSource={this.props.data} />;
  }
}
