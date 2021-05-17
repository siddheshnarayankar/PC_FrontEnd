import React, { useEffect, useState } from "react";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import _ from "lodash";
import { ConsoleSqlOutlined, SearchOutlined } from "@ant-design/icons";

 

export class FindAccusedBaseTable extends React.Component {
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
    if(this.props.isAccusedFormUpdate && this.props.isAccusedFormUpdate){
      this.props.onEditAccusedForm(data);
    }else{
      this.props.onEdituser(data);
    }
  }

  handleViewForm = (data) =>{
      this.props.onViewAccusedDetails(data);
  }

  onChangeTable = (pagination, filters, sorter, extra) =>{
    console.log(pagination);
    console.log(filters);
    console.log(sorter);
    console.log(extra);   
  }


  render() {
    const requiredSerchColumn = ['mobileNumber'];
    const requiredSortColumn = [ ];
    const requiredSearchAndSort = ['name','districtName'];
    const requiredFilterColumn = ['photo']

    // this.props && this.props.columns.push({
    //   ...{
    //     title: "फोटो",
    //     key: "photo",
    //     render: (text, record) => (
          
    //       <Space size="middle">
    //          {
    //            record.photo?<img style={{width:50,height:50}} src={'https://pcimageupload.s3.ap-south-1.amazonaws.com/' + record.photo}></img>:'नाही'
    //          }
    //       </Space>
    //     ),
    //   },
    // });

    let columns = this.props.columns.map((res) => {

      if(_.filter(requiredSearchAndSort,(o)=> o === res.dataIndex) && _.filter(requiredSearchAndSort,(o)=> o === res.dataIndex).length){
        return {
          ...res,
          ...this.getColumnSearchProps(res.dataIndex),
          defaultSortOrder: 'ascend',
          sorter: (a, b) =>  {
              return  a[res.dataIndex].length - b[res.dataIndex].length
          }
        };
      } else if(_.filter(requiredSerchColumn,(o)=> o === res.dataIndex) && _.filter(requiredSerchColumn,(o)=> o === res.dataIndex).length){
          return {
            ...res,
            ...this.getColumnSearchProps(res.dataIndex),
          };
        }else if(_.filter(requiredSortColumn,(o)=> o === res.dataIndex) && _.filter(requiredSortColumn,(o)=> o === res.dataIndex).length){
          return {
            ...res,
            defaultSortOrder: 'ascend',
            sorter: (a, b) =>  {
              if(a[res.dataIndex] < b[res.dataIndex]) { return -1; }
              if(a[res.dataIndex] > b[res.dataIndex]) { return 1; }
              return 0;
            }
          };
        }else if(_.filter(requiredFilterColumn,(o)=> o === res.dataIndex) && _.filter(requiredFilterColumn,(o)=> o === res.dataIndex).length){
          return {
            ...res,
            filters: [
              {
                text: 'फोटो',
                value: 'फोटो',
              },
              {
                text: 'नाही',
                value: 'नाही',
              },
            ],
          };
        }else{
          return {
            ...res,
          };
        }
    });

   
   


   columns.push({
      ...{
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
          }],
        onFilter: (value, record) => {

          if(value){
            return record.photo?record.photo.split().length === value:null
          }else{
            return record.photo === value
          }
        },
        render: (text, record) => (
          
          <Space size="middle">
             {
               record.photo?<img style={{width:50,height:50}} src={'https://pcimageupload.s3.ap-south-1.amazonaws.com/' + record.photo}></img>:'नाही'
             }
          </Space>
        ),
      },
    });

    columns.push({
      ...{
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <a  onClick={() => {this.handleViewForm(record.id)}}>View</a>
          </Space>
        ),
      },
    });


 



    return <Table columns={columns} dataSource={this.props.data}  onChange={this.onChangeTable}/>;
  }
}
