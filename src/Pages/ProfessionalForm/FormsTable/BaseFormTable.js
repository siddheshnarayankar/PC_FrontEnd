import React, { useEffect, useState } from "react";
import { Table, Tag, Space } from "antd";
import _ from "lodash";
import { AppTable } from "../../../_components/AppTable";

 
export const BaseFormTable = (props) => {

    const [criminalData,setCriminalData] = useState([]);
    const [criminalHeaders,setCriminalHeaders] = useState([]);
    const requiredKeys = ["Sr.No","name", "age","address", "mobileNumber", "districtName","gunhaCount"];
    const requiredKeysTitle = ["Sr.No","नाव", "वय","पत्ता", "फोन नंबर", "आरोपीचे पोलिस ठाणे","एकूण गुन्हा"];

    const getCityName = (id) => {
      const { pc_cities } = props.criminalRecords;
      if (pc_cities && pc_cities.length) {
        return (
          _.filter(pc_cities, function (o) {
            return o.id === id;
          })[0] &&
          _.filter(pc_cities, function (o) {
            return o.id === id;
          })[0].City
        );
      }
    };
    useEffect(()=>{

        if(props.criminalRecords && props.criminalRecords.criminalsTableList){
            // setCriminalRecors(props.criminalRecords.basicInfo);
            let columns1 =
            props.criminalRecords &&
            props.criminalRecords &&
            props.criminalRecords.criminalsTableList.map((itemObj, index) => {
              return {
                ...itemObj,
                key: index + 1,
              };
            });

            columns1 && columns1.length && columns1.reverse();

           let tempObj =  columns1.map((res,index)=>{
                  return {
                      ...res,
                      'Sr.No':index+1
                  }
            })
            setCriminalData(tempObj);

            let tablelabes = columns1 && columns1.length && Object.keys(columns1[0]);
            tablelabes && tablelabes.unshift('Sr.No');
            
            let tableColumns = [];
            tablelabes && tablelabes.length && tablelabes.forEach((item) => {
              if (
                _.filter(requiredKeys, function (o) {
                  return o === item;
                }).length
              ) {
                tableColumns.push(item);
              }
            });

            let columnList = tableColumns.map((item,index) => {
                return {
               title: requiredKeysTitle[index],
               dataIndex: item,
               key: item,
             };
           });

           setCriminalHeaders(columnList);
        }

    },[props.criminalRecords])
 
 
    const onEditAccusedForm = (data) =>{
        props.onEditAccusedForm(data)
    }  
    const onViewAccusedForm = (data) =>{
      props.onViewAccusedForm(data)
    }  
    
  
  return (
    <AppTable
      isAccusedFormUpdate= {true}
      onEditAccusedForm ={onEditAccusedForm}
      onViewAccusedForm={onViewAccusedForm}
      data={criminalData}
      columns={criminalHeaders}
    ></AppTable>
  );
};
