import React, { useEffect, useState } from "react";
import { Table, Tag, Space } from "antd";
import _ from "lodash";

const data = [];

export const GhunhaInfomationTable = (props) => {
  const [tblData, SetTblData] = useState([]);

  const requiredKyes = [
    "stateName",
    "cityName",
    "districtName",
    "headingName",
    "registernumber",
  ];

  const columns = [
    {
      title: "गुन्हाचे राज्य",
      dataIndex: "stateName",
      key: "stateName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "गुन्हाचे जिल्हा",
      dataIndex: "cityName",
      key: "cityName",
    },
    {
      title: "गुन्हाचे पोलीस ठाणे",
      dataIndex: "districtName",
      key: "districtName",
    },
    {
      title: "गु.र.नंबर",
      dataIndex: "registernumber",
      key: "registernumber",
    },
    {
      title: "शिर्षक",
      dataIndex: "headingName",
      key: "headingName",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => gunhaFormEdit(record)}>Update</a>
          <a onClick={() => gunhaFormDelete(record)}>Delete</a>
        </Space>
      ),
    },
  ];

  // useEffect(() => {
  //   const { gunhaInfor } = props.professionals;
  //   if (gunhaInfor && gunhaInfor.length) {

  //   }
  // }, [props.isAccusedFormEdit && props.isAccusedFormEdit.idEdit]);

  const getStateName = (id) => {
    const { pc_countrystates } = props.professionals;
    if (pc_countrystates && pc_countrystates.length) {
      return (
        _.filter(pc_countrystates, function (o) {
          return o.id === id;
        })[0] &&
        _.filter(pc_countrystates, function (o) {
          return o.id === id;
        })[0].state
      );
    }
  };

  const getDistrictName = (id) => {
    const { gunhaDistricts } = props.professionals;
    if (gunhaDistricts && gunhaDistricts.length) {
      return (
        _.filter(gunhaDistricts, function (o) {
          return o.id === id;
        })[0] &&
        _.filter(gunhaDistricts, function (o) {
          return o.id === id;
        })[0].DistrictName
      );
    }
  };
  const getCityName = (id) => {
    const { pc_cities } = props.professionals;
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

  const getCriminalTitles = (id) => {
    const { pc_crimetitles } = props.professionals;
    if (pc_crimetitles && pc_crimetitles.length) {
      return (
        _.filter(pc_crimetitles, function (o) {
          return o.id === id;
        })[0] &&
        _.filter(pc_crimetitles, function (o) {
          return o.id === id;
        })[0].crime_title
      );
    }
  };

  // useEffect(() => {
  //   let tempData = [];
  //   tempData =
  //     props.data &&
  //     props.data.map((res, index) => {
  //       return {
  //         ...res,
  //         key: index + 1,
  //         cityName: getCityName(res.city),
  //         headingName: res.headingName
  //           ? res.headingName
  //           : getCriminalTitles(res.heading),
  //         stateName: getStateName(res.state),
  //         // districtName:getDistrictName(res.district)
  //       };
  //     });
  //   SetTblData(tempData);
  //   // SetTblData
  // }, [props.isEditForms]);

  useEffect(() => {
      let tempData = [];
      
      tempData =
        props.data &&
        props.data.map((res, index) => {
          return {
            ...res,
            key: index + 1,
            cityName: getCityName(res && res.city),
            headingName: res && res.headingName
              ? res.headingName
              : getCriminalTitles(res && res.heading),
            stateName: getStateName(res && res.state),
          };
        });
        SetTblData(tempData);
    // SetTblData
  }, [props.data]);

  const gunhaFormEdit = (data) => {
    props.editGhunhaInfomation(data, _.findIndex(props.data, function(o) { return o.id == data.id; }));
  };
  const gunhaFormDelete = (data) => {
    props.deleteGhunhaInfomation(data, _.findIndex(props.data, function(o) { return o.id == data.id; }));
  };
  
  return <Table columns={columns} dataSource={tblData} />;
};
