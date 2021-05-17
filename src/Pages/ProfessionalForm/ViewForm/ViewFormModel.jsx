import React, { useState, useEffect } from "react";
import { Card, Descriptions, Divider, PageHeader } from "antd";
import _ from "lodash";
import moment from 'moment';
export const ViewFormModel = (props) => {
  const [basicInfo, setbasicInfor] = useState([]);
  const [otherInfo, setOtherInfo] = useState([]);
  const [gunhaInfo, setGunhaInfo] = useState([]);
  const {
    pc_cities,
    pc_status,
    pc_crimetitles,
    pc_crimetypes,
    pc_countrystates,
  } = props.dataStates;
  useEffect(
    (res) => {
      const { criminalViewList } = props.dataStates;

      if (
        criminalViewList &&
        criminalViewList.basicInfo &&
        criminalViewList.basicInfo
      ) {
        let tempbasic = {
          ...criminalViewList.basicInfo[0],
          heading: JSON.parse(
            "[" + criminalViewList.basicInfo[0].heading + "]"
          ),
          historydate:criminalViewList.basicInfo[0].historydate?moment(criminalViewList.basicInfo[0].historydate).format('YYYY-DD-MM'):null
        };
        setbasicInfor([tempbasic]);
      }
      if (
        criminalViewList &&
        criminalViewList.gunhaInfor &&
        criminalViewList.gunhaInfor
      ) {

        let temp = criminalViewList.gunhaInfor && criminalViewList.gunhaInfor.map((item)=>{
                  return {
                    ...item,
                      statusDate:item.statusDate?moment(item.statusDate).format('YYYY-DD-MM'):null,
                      registernumberYear:item.registernumberYear?moment(item.registernumberYear).format('YYYY'):null,
                      dateTime:item.dateTime?moment(item.dateTime).format('YYYY-DD-MM'):null
                  }
         })
        setGunhaInfo([...temp]);
      }
      if (
        criminalViewList &&
        criminalViewList.otherInfo &&
        criminalViewList.otherInfo
      ) {
        setOtherInfo([...criminalViewList.otherInfo]);
      }

      
    },
    [props.dataStates]
  );
  // STATE
  const getStateName = (id) => {
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

  // CITY
  const getCityName = (id) => {
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

  const getCrimetypes = (id) => {
    if (pc_crimetypes && pc_crimetypes.length) {
      return (
        _.filter(pc_crimetypes, function (o) {
          return o.id === id;
        })[0] &&
        _.filter(pc_crimetypes, function (o) {
          return o.id === id;
        })[0].crimetype
      );
    }
  };
  const getCrimeTitle = (id) => {
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
  const getStatus = (id) => {
    if (pc_status && pc_status.length) {
      return (
        _.filter(pc_status, function (o) {
          return o.id === id;
        })[0] &&
        _.filter(pc_status, function (o) {
          return o.id === id;
        })[0].name
      );
    }
  };

  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={false}
        title="आरोपी"
        subTitle="प्रोफेशनल क्रिमिनल"
      >
         <Descriptions size="small" column={1}>
            <Descriptions.Item>
                {otherInfo && otherInfo.length ? (
                  otherInfo[0].accusedImage && otherInfo[0].accusedImage.length && otherInfo[0].accusedImage.split(',').map((item)=>(
                  <Card
                    hoverable
                    style={{ width: 100 }}
                    cover={<img alt="example" src={'https://pcimageupload.s3.ap-south-1.amazonaws.com/' + item} />}
                  >
                  </Card>
                  ))
                  
                ) : null}
        </Descriptions.Item>
        </Descriptions>
        {basicInfo && basicInfo.length ? (
          <>
         
          <Descriptions size="small" column={3}>
          <Descriptions.Item style={{fontWight:'bold'}} label="आरोपीचे नाव">
             <div style={{fontWeight:'bold',fontSize:16}}>{basicInfo && basicInfo[0].name}</div>
          </Descriptions.Item>
            <Descriptions.Item label="शिर्षक">
              {basicInfo &&
                basicInfo[0].heading.map((res) => getCrimetypes(res) + ",  ")}
            </Descriptions.Item>
            <Descriptions.Item label="हिस्टोरिशिएटर आहे">
              {basicInfo && basicInfo[0].historySheeter===1 || basicInfo && basicInfo[0].historySheeter===3?'आहे':'नाही'}
            </Descriptions.Item>
            <Descriptions.Item label="हिस्ट्रीशिटर  समाविष्ट दिनांक">
              {basicInfo && basicInfo[0].historySheeter===1 || basicInfo && basicInfo[0].historySheeter===3?basicInfo && basicInfo[0].historydate:null}
            </Descriptions.Item>
         
            <Descriptions.Item label="आरोपीचे वय">
              {basicInfo && basicInfo[0].age}
            </Descriptions.Item>
            <Descriptions.Item label="मोबाईल नंबर">
              {basicInfo && basicInfo[0].mobileNumber}
            </Descriptions.Item>
            <Descriptions.Item label="राज्य">
              {getStateName(basicInfo && basicInfo[0].state)}
            </Descriptions.Item>
            <Descriptions.Item label="घटक">
              {getCityName(basicInfo && basicInfo[0].city)}
            </Descriptions.Item>
            <Descriptions.Item label="पोलीस ठाणे">
              {basicInfo && basicInfo[0].districtName}
            </Descriptions.Item>
          </Descriptions>
          </>
        ) : null}
      </PageHeader>

      <Divider style={{ margin: "10px 0px" }} />
      <PageHeader
        ghost={false}
        onBack={false}
        title="गुन्हा"
        subTitle="प्रोफेशनल क्रिमिनल"
      >
        {gunhaInfo &&
          gunhaInfo.length &&
          gunhaInfo.map((ginfo, index) => (
            <>
              <Divider orientation="left" style={{ margin: "10px 0px" }}>
                {"गुन्हा" + " - "}
                {index + 1}
              </Divider>
              <Descriptions size="small" column={3}>
                <Descriptions.Item label="गुन्हाचे राज्य">
                  {getStateName(ginfo.state)}
                </Descriptions.Item>
                <Descriptions.Item label="गुन्हाचे जिल्हा">
                  {getCityName(ginfo.city)}
                </Descriptions.Item>
                <Descriptions.Item label="गुन्हाचे पोलीस ठाणे">
                  {ginfo.districtName}
                </Descriptions.Item>
                <Descriptions.Item label="गु.र.नंबर">
                  {ginfo.registernumber}
                </Descriptions.Item>
                <Descriptions.Item label="गु.र.नंबर वर्ष">
                  {ginfo.registernumberYear}
                </Descriptions.Item>
                <Descriptions.Item label="गुन्हा दाखल दिनांक">
                  {ginfo.dateTime}
                </Descriptions.Item>
                <Descriptions.Item label="शिर्षक">
                  {getCrimeTitle(ginfo.heading)}
                </Descriptions.Item>
                <Descriptions.Item label="सद्धस्थिती">
                  {getStatus(ginfo.status)}
                </Descriptions.Item>

                {(ginfo && ginfo.status && ginfo.status === 2) ||
                (ginfo && ginfo.status && ginfo.status === 3) ? (
                  <>
                    <Descriptions.Item label="न्यायालयाचे प्रकार">
                      {ginfo.typesOfCourt}
                    </Descriptions.Item>
                    <Descriptions.Item label="सद्धस्थिती दिनांक">
                      {ginfo.statusDate}
                    </Descriptions.Item>
                    <Descriptions.Item label="केस नं">
                      {ginfo.caseNumbers}
                    </Descriptions.Item>
                  </>
                ) : null}

                {ginfo && ginfo.status && ginfo.status === 3 ? (
                  <>
                    <Descriptions.Item label="शिक्षा">
                      {ginfo.punishment}
                    </Descriptions.Item>
                    <Descriptions.Item label="दंड">
                      {ginfo.Penalty}
                    </Descriptions.Item>
                  </>
                ) : null}
              </Descriptions>
              <Divider style={{ margin: "10px 0px" }} orientation="left">
                कायदा - कलम
              </Divider>
              <Descriptions size="small" column={2}>
                {ginfo &&
                  ginfo.kalamAndkayda.map((res) => (
                    <>
                      <Descriptions.Item label="कायदा">
                        {res.rulesName}
                      </Descriptions.Item>
                      <Descriptions.Item label="कलम">
                        {res.kalam}
                      </Descriptions.Item>
                    </>
                  ))}
              </Descriptions>
              <Divider style={{ margin: "10px 0px" }} orientation="left">
                  सदस्याचे नाव
              </Divider>
              <Descriptions size="small" column={3}>
                {ginfo &&
                  ginfo.membersList.map((res) => (
                    <>
                    <Descriptions.Item label="गु.र.नंबर">
                        {res.regsiterNumber}
                      </Descriptions.Item>
                      <Descriptions.Item label="वर्ष">
                        {res.registernumberYear?moment(res.registernumberYear).format('YYYY'):null}
                      </Descriptions.Item>
                      <Descriptions.Item label="साथीदाराचे नाव">
                        {res.memberName}
                      </Descriptions.Item>
                    </>
                  ))}
              </Descriptions>
            </>
          ))}
      </PageHeader>
      <Divider style={{ margin: "10px 0px" }} />
      <PageHeader
        ghost={false}
        onBack={false}
        title="आरोपीची इतर माहिती"
        subTitle="प्रोफेशनल क्रिमिनल"
      >
        {otherInfo && otherInfo.length ? (
          <Descriptions size="small" column={2}>
            <Descriptions.Item label="टोळीचा सदस्य आहे का?">
              {otherInfo && otherInfo[0].isMemberOfGang}
            </Descriptions.Item>
            <Descriptions.Item label="आरोपीचा व्यवसाय/उत्पनाचे साधन">
              {otherInfo && otherInfo[0].accusedAssets}
            </Descriptions.Item>
            <Descriptions.Item label="आरोपीचा कुंटूबातील सदस्य">
              {otherInfo && otherInfo[0].accusedFamilyMember}
            </Descriptions.Item>
            <Descriptions.Item label="आरोपीचा कुंटूबातील सदस्य">
              {otherInfo && otherInfo[0].mobileNumber}
            </Descriptions.Item>
            <Descriptions.Item label="आरोपीचे वास्तव्याचे ठिकाण Lat & Long">
              {getStateName(otherInfo && otherInfo[0].accusedResidence)}
            </Descriptions.Item>
            <Descriptions.Item label="आरोपीचे गुन्हे करण्याचे कार्यक्षेत्र">
              {getCityName(otherInfo && otherInfo[0].accusedJurisdiction)}
            </Descriptions.Item>
            <Descriptions.Item label="दाखल गुन्ह्यांचे कोर्ट केस नंबर">
              {otherInfo && otherInfo[0].accusedCourtCaseNo}
            </Descriptions.Item>
            <Descriptions.Item label="आरोपीच्या कोर्टातील तारखा">
              {otherInfo && otherInfo[0].accusedCourtDate}
            </Descriptions.Item>
            <Descriptions.Item label="आरोपी सध्या जेलमध्ये /बाहेर">
              {otherInfo && otherInfo[0].accusedjailStatus}
            </Descriptions.Item>
            <Descriptions.Item label="आरोपीकडील वापरती वाहणे व त्यांचे Rto नंबर">
              {otherInfo && otherInfo[0].accusedVehicalDetails}
            </Descriptions.Item>
            <Descriptions.Item label="आरोपीच्या वकीलांचे नाव पत्ता व मोबाईल नंबर">
              {otherInfo && otherInfo[0].accusedLawyerDetails}
            </Descriptions.Item>
            <Descriptions.Item label="आरोपीला ओळखणारे पोलीस अधिकारी /कमेचारी(नांव,हुद्दा नेमणूक व मोबाईल नं">
              {otherInfo && otherInfo[0].accusedIdentifyingOfficer}
            </Descriptions.Item>
            <Descriptions.Item label="सपोर्ट करणारे नेता / संघटना">
              {otherInfo && otherInfo[0].accusedSupportingleaders}
            </Descriptions.Item>
          </Descriptions>
        ) : null}
      </PageHeader>
      <Divider style={{ margin: "10px 0px" }} />
      <PageHeader
        ghost={false}
        onBack={false}
        title="आरोपीचा फोटो ,हाताच्या ठसे आणि प्रोफेशनल आरोपी तपशील"
        subTitle="प्रोफेशनल क्रिमिनल"
      >
      <Descriptions size="small" column={3}>

<Descriptions.Item>
        {otherInfo && otherInfo.length ? (
          otherInfo[0].accusedPham && otherInfo[0].accusedPham.length && otherInfo[0].accusedPham.split(',').map((item)=>(
          <Card
            hoverable
            style={{ width: 100 }}
            cover={<img alt="example" src={'https://pcimageupload.s3.ap-south-1.amazonaws.com/' + item} />}
          >
          </Card>
          ))
          
        ) : null}

</Descriptions.Item>
<Descriptions.Item>
        {otherInfo && otherInfo.length ? (
          otherInfo[0].accusedRecords && otherInfo[0].accusedRecords.length && otherInfo[0].accusedRecords.split(',').map((item)=>(
            <a href={'https://pcimageupload.s3.ap-south-1.amazonaws.com/' + item}>{item}</a>
          ))
        ) : null}
         </Descriptions.Item>
          </Descriptions>

      </PageHeader>
    </div>
    
  );
};
