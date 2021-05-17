import React, { useEffect, useState } from "react";
import {
  Drawer,
  Button,
  Radio,
  Space,
  Row,
  Col,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
} from "antd";
import { KalamAndKayadTable } from "../FormsTable/KalamAndKayadTable";
import { MembersFromTable} from "../FormsTable/MembersFromTable";
import _ from "lodash";
import moment from 'moment';
 
const { forwardRef, useRef, useImperativeHandle } = React;
const { Option } = Select;
const dateFormat = 'MM/DD/YYYY';
export const GhunhaInfomation = forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const [kalamkayda, setKalamKyadaArr] = useState([]);
  const [dateTime, setDate] = useState();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [kalams, setkalam] = useState([]);
  const [kayda, setkayda] = useState([]);
  const [district, seDistrict] = useState([]);
  const [status, SetStatus] = useState([]);
  const [crimeTitle, SetCrimeTitle] = useState([]);
  const [currentStatus, SetCurrentStatus] = useState(0);
  const [registerNumber, SetRegisterNumber] = useState(0);
  const [registerNumberValue, SetRegisterNumberValue] = useState("");
  const [newMemberList, SetNewMemberList] = useState([]);
  const [isMemberTxt, SetIsMemberTxt] = useState(null);

  const [citySelected, SetCitySelected] = useState(false);
  const [stateSelected, SetStateSelected] = useState(false);
  const [isKKButton, SetIsKKButton] = useState(false);
  const [isSave, setIsSave] = useState(null);
  const onFinish = (values) => {
    if(isSave){
      values.kalamAndkayda = [...kalamkayda];
      values.membersList = [...newMemberList];
      props.onGunhaFormFiniesh(values);
    }else{
      values.kalamAndkayda = [...kalamkayda];
      values.membersList = [...newMemberList];
      let obj = {
        ...values,
        id:props.editData[0].id
      }
      props.onGunhaFormUpdate(obj);
    }
    form.resetFields();
  };




  useImperativeHandle(ref, () => ({
    onFinish(falg) {
      setIsSave(falg);
      form.submit();  
      // form.submit();
    },
  }));


  const getActsNames = (id) => {
    const { pc_acts } = props.dataStates;
    if (pc_acts && pc_acts.length) {
      return (
        _.filter(pc_acts, function (o) {
          return o.act_cd === id;
        })[0] &&
        _.filter(pc_acts, function (o) {
          return o.act_cd === id;
        })[0].kayda
      );
    }
  };
  const getKalamNames = (id) => {
    const { pc_kalams } = props.dataStates;
    if (pc_kalams && pc_kalams.length) {
      return (
        _.filter(pc_kalams, function (o) {
          return o.id === id;
        })[0] &&
    _.filter(pc_kalams, function (o) {
          return o.id === id;
        })[0].section + '-' +_.filter(pc_kalams, function (o) {
          return o.id === id;
        })[0].section_desc
      );
    }
  };
  const addNewKalamKayda = () => {
    let ob = {
      rules: form.getFieldsValue().rules,
      kalam: form.getFieldsValue().kalam,
      rulesName:getActsNames(form.getFieldsValue().rules),
      // kalamName:getKalamNames(form.getFieldsValue().kalam)
    };
    setKalamKyadaArr([
      ...kalamkayda,
      {
        ...ob,
      },
    ]);
  };

  const deletekalamKayda = (values) =>{
    if(values){
      let tempkalamKayda =kalamkayda;
      let getIndex = _.findIndex(kalamkayda,values);
      let temp = tempkalamKayda.splice(getIndex,1)
      if(temp && temp.length){
        form.resetFields(['kalam'])
        form.resetFields(['rules'])
      }
      setTimeout(() => {
        setKalamKyadaArr([])
        setKalamKyadaArr(tempkalamKayda);
      }, 100);

     
    }

  }

  useEffect(
    (res) => {
      if (
        props.dataStates &&
        props.dataStates.pc_countrystates &&
        props.dataStates.pc_countrystates
      ) {
        setStates([...props.dataStates.pc_countrystates]);
      }
      if (
        props.dataStates &&
        props.dataStates.pc_cities &&
        props.dataStates.pc_cities
      ) {
        setCities([...props.dataStates.pc_cities]);
      }
      if (
        props.dataStates &&
        props.dataStates.pc_acts &&
        props.dataStates.pc_acts
      ) {
        setkayda([...props.dataStates.pc_acts]);
      }
      if (
        props.dataStates &&
        props.dataStates.pc_status &&
        props.dataStates.pc_status
      ) {
        SetStatus([...props.dataStates.pc_status]);
      }
      if (
        props.dataStates &&
        props.dataStates.pc_crimetitles &&
        props.dataStates.pc_crimetitles
      ) {
        SetCrimeTitle([...props.dataStates.pc_crimetitles]);
      }
    },
    [props.dataStates]
  );
  useEffect(() => {
    form.resetFields();
    setKalamKyadaArr([]);
    SetNewMemberList([]);
    setkalam([]);
    SetIsKKButton(false);
  }, [props.newGunha]);


  

  useEffect(
    (res) => {
      if (props.editData && props.editData.length && !props.newGunha) {
        // setInputField(props.basicInformationData[0]);

        let ob = {
          ...props.editData[0]
        }
        delete ob.dateTime;
        

        form.setFieldsValue({
         ... ob,
         dateTime:moment(props.editData[0].dateTime),
         kalam:props.editData[0] && props.editData[0].kalamAndkayda[0] && props.editData[0].kalamAndkayda[0].kalam,
         rules:props.editData[0] && props.editData[0].kalamAndkayda[0] && props.editData[0].kalamAndkayda[0].rules,
         statusDate:props.editData[0].statusDate?moment(props.editData[0].statusDate):moment(),
         registernumberYear:props.editData[0].registernumberYear?moment(props.editData[0].registernumberYear):moment(),
         statusDate:props.editData[0].statusDate?moment(props.editData[0].statusDate):moment(),
        })


        // setDate(props.editData[0].dateTime)
        SetCitySelected(true);
        SetStateSelected(true);
        SetRegisterNumber(true);
        SetIsKKButton(true)
        SetCurrentStatus(props.editData[0] && props.editData[0].status)
        SetRegisterNumberValue(props.editData[0] && props.editData[0].registernumber);
        setKalamKyadaArr(props.editData[0].kalamAndkayda)
        SetNewMemberList(props.editData[0].membersList)
      }
    },
    [props.editData && props.editData]
  );
  useEffect(
    (res) => {
      if (props.dataStates && props.dataStates.gunhaDistricts) {
        // setInputField(props.basicInformationData[0]);
        seDistrict([...props.dataStates.gunhaDistricts]);
      }
    },
    [props.dataStates && props.dataStates.gunhaDistricts]
  );

  useEffect(
    (res) => {
      if (props.dataStates && props.dataStates.pc_kalams) {
        // setInputField(props.basicInformationData[0]);
        setkalam([...props.dataStates.pc_kalams]);
        // SetIsKKButton(true);
      }
    },
    [props.dataStates && props.dataStates.pc_kalams]
  );

  const onStateChange = (value) => {
    SetStateSelected(true);
  };
  const clearDistrictSelected = () => {
    form.resetFields(["district"]);
  };
  const onCityChange = (value) => {
    clearDistrictSelected();
    SetCitySelected(true);
    props.onCityChange(value, 2);
  };

  const loadMore = (value) => {
  };

  const onkaydaChange = (value) => {
    clearKalamSelected();
    
    props.onKaydaChange(value);
  };
  const clearKalamSelected = () => {
    SetIsKKButton(false);
    form.resetFields(["kalam"]);
    // SetIsKKButton(true);
  };

  const onCurrentStatusChange = (value) =>{
    SetCurrentStatus(value)
  }

  const addNewMemberName = () =>{
    let newMember = {
        memberName:form.getFieldValue(['memberName']),
        regsiterNumber:form.getFieldValue(['registernumber']),
        registernumberYear:form.getFieldValue(['registernumberYear']),
    }
    SetNewMemberList([
      ...newMemberList,
        {
          ...newMember
        }
    ])
    form.resetFields(["memberName"]);
  }

  const onRegisterNumberChange = (e) =>{
        if(e.target.value){
          SetRegisterNumber(1);
          SetRegisterNumberValue(e.target.value);
        }else{
          SetRegisterNumber(0)
          SetRegisterNumberValue("");
        }
  }

  const onDeleteMembers = (values) =>{
    if(values){
      let tempMember =newMemberList;
      let getIndex = _.findIndex(newMemberList,values);
      let temp = tempMember.splice(getIndex,1);
     
      setTimeout(() => {
        SetNewMemberList([])
        SetNewMemberList(tempMember);
      }, 100);
    }
  
  }

  const onMembernameChange = (e) =>{
    if(e.target.value){
      SetIsMemberTxt(true);
    }else{
      SetIsMemberTxt(null);
    }
  }

  return (
    <div>
      <Form layout="vertical" hideRequiredMark onFinish={onFinish} form={form}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="state"
              label="गुन्हाचे राज्य"
              rules={[{ required: true, message: "Please select an state" }]}
            >
              <Select
                placeholder="Please select an state"
                onChange={onStateChange}
              >
                {states &&
                  states.length &&
                  states.map((res, index) => (
                    <Option key={index} value={res.id}>
                      {res.state}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="city"
              label="गुन्हाचे जिल्हा"
              rules={[{ required: true, message: "Please enter user city" }]}
            >
              <Select
                placeholder="Search to Select"
                optionFilterProp="children"
                onChange={onCityChange}
                disabled={!stateSelected}
                onPopupScroll={loadMore}
                placeholder="Please select an state"
              >
                {cities &&
                  cities.length &&
                  cities.map((res, index) => (
                    <Option key={index} value={res.id}>
                      {res.City}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="district"
              label="गुन्हाचे पोलीस ठाणे"
              rules={[
                { required: true, message: "Please enter user district" },
              ]}
            >
              <Select
                optionFilterProp="children"
                disabled={!citySelected}
                placeholder="Please select an district"
              >
                {district &&
                  district.length &&
                  district.map((res, index) => (
                    <Option key={index} value={res.id}>
                      {res.DistrictName}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Input.Group  >
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                  name="registernumber"
                  label="गु.र.नंबर"
                      rules={[
                        { required: true, message: "Please enter user registernumber" },
                      ]}
                    >
                        <Input  onChange={onRegisterNumberChange} placeholder="Please enter user registernumber" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                    name="registernumberYear"
                    label="गु.र.नंबर वर्ष"
                      rules={[
                        { required: true, message: "Please enter user registernumber" },
                      ]}
                    >
                      <DatePicker  style={{width:'100%'}} picker={'year'} />
                  </Form.Item>
                </Col>
              </Row>
            </Input.Group>
            </Col>
            <Col span={6}>
              <Form.Item
                name="dateTime"
                label="गुन्हा दाखल दिनांक"
                rules={[
                  { required: true, message: "Please choose the dateTime" },
                ]}
              >
                <DatePicker   style={{width:'100%'}}   />
              </Form.Item>
            </Col>
            <Col span={6}>
            <Form.Item
              name="heading"
              label="शिर्षक"
              rules={[{ required: true, message: "Please select an heading" }]}
            >
              <Select
                placeholder="Please select an heading"
              >
                {crimeTitle &&
                  crimeTitle.length &&
                  crimeTitle.map((res, index) => (
                    <Option key={index} value={res.id}>
                      {res.crime_title}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            </Col>
       </Row>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item
              name="status"
              label="सद्धस्थिती"
              rules={[{ required: true, message: "Please select an status" }]}
            >
              <Select
                placeholder="Please select an status"
                onChange={onCurrentStatusChange}
              >
                {status &&
                  status.length &&
                  status.map((res, index) => (
                    <Option key={index} value={res.id}>
                      {res.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
           {
             currentStatus === 2 || currentStatus === 3?(
                  <Form.Item
                  name="typesOfCourt"
                  label="न्यायालयाचे प्रकार"
                >
                  <Select
                    placeholder="Please select an status"
                  >
                  <Option key={1} value="सत्र न्यायालय">
                  सत्र न्यायालय
                  </Option>
                  <Option key={2} value="प्रथमवर्ग न्यायालय">
                  प्रथमवर्ग न्यायालय
                  </Option>
                  </Select>
                </Form.Item>
             ):null
           }
          </Col>
          <Col span={6}>
          {
             currentStatus === 2 || currentStatus === 3?(
              <Form.Item
              name="statusDate"
              label="दिनांक"
               
            >
              <DatePicker style={{width:'100%'}}     />
            </Form.Item>
             ):null
            }
          </Col>
          <Col span={6}>
          {
             currentStatus === 2||currentStatus === 3?(
            <Form.Item
              name="caseNumbers"
              label="केस नं"
            >
              <InputNumber min={1}   style={{width:'100%'}}  />
            </Form.Item>
             ):null
            }
          </Col>
        </Row>
        {
         currentStatus === 3?(
        <Row gutter={24}>
          <Col span={6}>
              <Form.Item
                name="punishment"
                label="शिक्षा"
              >
                  <Input placeholder="Please select punishment" />
              </Form.Item>
          </Col>
          <Col span={6}>
           
              <Form.Item
                name="Penalty"
                label="दंड"
              >
                  <Input placeholder="Please select penalty" />
              </Form.Item>
          </Col>
         </Row>
        ):null
        }
        <Row gutter={24}>
          <Col span={15}>
            <Form.Item
              name="rules"
              label="कायदा"
              rules={[{ required: true, message: "Please select an rules" }]}
            >
              <Select
                placeholder="Please select an rules"
                onChange={onkaydaChange}
              >
                {kayda &&
                  kayda.length &&
                  kayda.map((res, index) => (
                    <Option key={index} value={res.act_cd}>
                      {res.kayda}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              name="kalam"
              label="कलम"
              rules={[{ required: true, message: "Please select an kalam" }]}
            >
              <Select
                placeholder="Please select an kalam" onChange ={() => { SetIsKKButton(true)}}
              >
                {kalams &&
                  kalams.length &&
                  kalams.map((res, index) => (
                    <Option key={index} value={res.section}>
                      {res.section}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item>
              <Button
                style={{ marginTop: "30px" }}
                type="button"
                disabled={!isKKButton}
                onClick={addNewKalamKayda}
              >
                  जोडा
              </Button>
            </Form.Item>
          </Col>
        </Row>
       <Row gutter={24}>
         <Col span={24}>
         {kalamkayda && kalamkayda.length ? (
        <KalamAndKayadTable data={kalamkayda} deletekalamKayda= {deletekalamKayda} professionals={props.dataStates}></KalamAndKayadTable>
      ) : null}
         </Col>
       </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
                name="memberName"
                label="सदस्याचे नाव"
              >
                  <Input placeholder="Please select member" onChange={onMembernameChange} />
           </Form.Item>
          </Col>
          <Col span={8}>
              <Button
                style={{ marginTop: "30px" }}
                type="button"
                disabled={!registerNumber || !isMemberTxt}
                onClick={addNewMemberName}
              >
                  आणखी जोडा
              </Button>
          </Col>
        </Row>
        <Row gutter={24}>
         <Col span={24}>
         {newMemberList && newMemberList.length ? (
            <MembersFromTable data={newMemberList}  onDeleteMembers ={onDeleteMembers}></MembersFromTable>
           ) : null}
         </Col>
       </Row>
        {/* <Row>
        <Col>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row> */}
      </Form>
      
    </div>
  );
});
