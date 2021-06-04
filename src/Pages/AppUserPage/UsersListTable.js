import React, { useEffect, useState } from "react";
import { Table, Input, Button, Space,Select, Tag } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import _ from "lodash";


const { Option } = Select;
 
export class UsersListTable extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    currentStatus:0
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

  onStatusChange = (data) =>{
      setTimeout(() => {
        let ob = {
          ...data,
          currentIndex:this.state.currentStatus
        }
        this.props.onEdituser(ob);
      }, 100);
  }

  render() {

    let tempColumns = [];

    if(this.props.userRole && this.props.userRole.role ==='8'){
        tempColumns = _.filter(this.props.columns ,(o)=>{return o.title !=="district"});
    }else if(this.props.userRole && this.props.userRole.role ==='4'){
        tempColumns =  this.props.columns
    }
    


    let columns =tempColumns.map((res) => {
      return {
        ...res,
        ...this.getColumnSearchProps(res.dataIndex),
      };
    });

 
    
    columns.push({
          title: "Status",
          key: "status",
          dataIndex: 'status',
          filters: [
            {
              text: 'Approved',
              value: 'Approved',
            },
            {
              text: 'Pending',
              value: 'Pending',
            },
          ],
          onFilter: (value, record) => record.status.indexOf(value) === 0,
          render: (text, record) => (
            <>
            {/* <Tag color={status==='Approved'?'green':status==='Pending'?'yellow':'red'} key={1}>
                     {status}
            </Tag> */}
            
            
            <Select
                placeholder="Please select Crime Type"
                style={{width:'100%',color:record && record.status==='Approved'?'green':record && record.status==='Pending'?'orange':'red' }}
                value={record && record.status==='Approved'?1:record && record.status==='Pending'?0:2}
                onChange={(currentIndex) => {
                  this.setState({ currentStatus: currentIndex }, () => {
                    this.onStatusChange(record)
                  }); 
                  }}
              >
                    <Option key={1} value={1} style={{color:'green'}}>Approved</Option>
                    <Option key={2} value={0} style={{color:'orange'}}>Pending</Option>
                    <Option key={3} value={2} style={{color:'red'}}>Rejected</Option>
              </Select>
            </>
          )
      });


    //    columns.push({
    //   ...{
    //     title: "Action",
    //     key: "action",
    //     render: (text, record) => (
    //       <Space size="middle">
    //         <a onClick={() => {this.handleEditForm(record)}}>Change</a>
    //         {/* <a>update</a> */}
    //       </Space>
    //     ),
    //   },
    // });

    return <Table columns={columns} dataSource={this.props.data} />;
  }
}
