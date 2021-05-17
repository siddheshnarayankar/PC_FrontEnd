import React from "react";
import { connect } from "react-redux";
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
  Steps,
  message,
  Divider,
  Popconfirm,
  Descriptions,
  PageHeader,
} from "antd";
import { BasicInformation } from "./Forms/BasicInformation";
import { GhunhaInfomation } from "./Forms/GhunhaInfomation";
import { OtherInformation } from "./Forms/OtherInformation";

import { GhunhaInfomationTable } from "./FormsTable/GhunhaInfomationTable";
import { professionalAction } from "../../_actions/professional.actions";
import _ from "lodash";
import { BaseFormTable } from "./FormsTable/BaseFormTable";
import Modal from "antd/lib/modal/Modal";
import { ViewFormModel } from "./ViewForm/ViewFormModel";

const { Step } = Steps;
const { Option } = Select;
const text = "Are you sure to delete this task?";
const steps = [
  {
    title: "आरोपी",
    content: "First-content",
    flag: 1,
  },
  {
    title: "गुन्हा",
    content: "Second-content",
    flag: 2,
  },
  {
    title: "आरोपीची इतर माहिती",
    content: "Last-content",
    flag: 3,
  },
];
class ProfessionalForm extends React.Component {
  state = {
    accusedDrawer: false,
    ghunhaDrawer: false,
    isGunhaEdit: false,
    newGunha: 0,
    current: 0,
    ghunhaInfomationData: [],
    basicInformationData: [],
    otherInformationData: [],
    editGunhaInformationData: [],
    editGunhaInformationIndex: null,
    isBasicInforSuccess: false,
    districts: [],
    isAccusedFormEdit: [],
    isEditForms: false,
    resetBasicForm: false,
    setCriminalViewModel: false,
  };
  basicInformationRef = React.createRef();
  ghunhaInfomationRef = React.createRef();
  otherInfomationRef = React.createRef();

  componentDidMount() {
    if (this.props.user && this.props.user) {
      this.props.dispatch(
        // professionalAction.getCriminalsById(this.props.user.id)
        professionalAction.getCriminalsTableInfoById('userId',this.props.user.id)
      );
    }

    // this.props.dispatch(professionalAction.getAllMaster());
    // this.props.dispatch(professionalAction.getCity());
    // this.props.dispatch(professionalAction.getDharm());
    // // this.props.dispatch(professionalAction.getKalam());
    // this.props.dispatch(professionalAction.getKayda());
    // this.props.dispatch(professionalAction.getCrimeType());
    // this.props.dispatch(professionalAction.getCrimeTitle());
    // this.props.dispatch(professionalAction.getStatus());
  }

  errorMessage = (errorTxt) => {
    message.error(errorTxt);
  };

  showCriminalViewModel = () => {
    this.setState({
      setCriminalViewModel: true,
    });
  };
  closeCriminalViewModel = () => {
    this.setState({
      setCriminalViewModel: false,
    });
  };

  showAccusedDrawer = () => {
    this.setState({
      accusedDrawer: true,
      resetBasicForm: false,
      isEditForms: false,
    });
  };
  onCloseAccusedDrawer = () => {
    this.setState((prevState) => ({
      basicInformationData: [],
      otherInformationData: [],
      ghunhaInfomationData: [],
      editGunhaInformationData: [],
      ghunhaDrawer: false,
      accusedDrawer: false,
      current: 0,
      resetBasicForm: true,
      isEditForms: false,
    }));
  };
  showghunhaDrawer = () => {
    this.setState({
      ghunhaDrawer: true,
      newGunha: Math.floor(Math.random() * Math.floor(5)),
      isGunhaEdit: false,
    });
  };
  onghunhaDrawerClose = () => {
    this.setState({
      ghunhaDrawer: false,
    });
  };
  next = () => {
    if (this.state.current === 0) {
      this.basicInformationRef.current.onFinish();
    }
    if (this.state.current === 1) {
      if (this.state.ghunhaInfomationData.length) {
        this.setState({
          current: this.state.current + 1,
        });
      } else {
        this.errorMessage("किमान एक गुन्हा आवश्यक आहे");
      }
    }
  };
  prev = () => {
    if (this.state.current === 2) {
      this.otherInfomationRef.current.onFinish();
    }
    this.setState({
      current: this.state.current - 1,
    });
  };

  done = () => {
    // this.otherInfomationRef.current.onFinish();
  };

  onGunhaFormFiniesh = (data) => {
    let newEntery = {
      ...data,
      districtName: this.getDistrictName(data.district),
    };
    this.setState((prevState) => ({
      ghunhaInfomationData: [...prevState.ghunhaInfomationData, newEntery],
      ghunhaDrawer: false,
    }));
  };
  onGunhaFormUpdate = (data) => {
    let newEntery = {
      ...data,
      districtName: this.getDistrictName(data.district),
    };
    let tempArray = this.state.ghunhaInfomationData;
    tempArray.splice(this.state.editGunhaInformationIndex, 1);
    this.setState((prevState) => ({
      ghunhaInfomationData: [],
      ghunhaInfomationData: [...tempArray, newEntery],
      ghunhaDrawer: false,
      editGunhaInformationIndex: null,
    }));
  };
  basicInformationFinish = (data) => {
    this.setState((prevState) => ({
      basicInformationData: [data],
    }));
    if (data) {
      this.setState({
        current: this.state.current + 1,
      });
    }
  };
  otherInformationFiniesh = (data) => {
    this.setState((prevState) => ({
      otherInformationData: [data],
    }));
  };

  uploadImage = (data) => {
    this.props.dispatch(professionalAction.uploadImage(data));
  };

  onGhunhaInfomationSave = () => {
    this.ghunhaInfomationRef.current.onFinish(true);
  };
  onGhunhaInfomationUpdate = () => {
    this.ghunhaInfomationRef.current.onFinish(false);
  };
  onGhunhaInfomationCancel = () => {
    this.setState((prevState) => ({
      ghunhaDrawer: false,
    }));
  };
  editGhunhaInfomation = (data, index) => {
    this.onCityChange(data.city, 2);
    this.setState((prevState) => ({
      editGunhaInformationData: [data],
      editGunhaInformationIndex: index,
      ghunhaDrawer: true,
      isGunhaEdit: true,
      newGunha: false,
    }));
  };
  deleteGhunhaInfomation = (data, index) => {
    let temp = this.state.ghunhaInfomationData;
    temp.splice(index, 1);
    this.setState((prevState) => ({
      ghunhaInfomationData: [...temp],
      editGunhaInformationIndex: index,
    }));
  };

  onCityChange = (cityId, form) => {
    if (cityId) {
      this.props.dispatch(professionalAction.getDistrict(cityId, form));
    }
  };

  onKaydaChange = (actId) => {
    if (actId) {
      this.props.dispatch(professionalAction.getKalam(actId));
    }
  };

  getDistrictName = (id) => {
    const { gunhaDistricts } = this.props.professionals;
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

  onConfirm = () => {
    this.otherInfomationRef.current.onFinish();
    setTimeout(() => {
      let data = {
        basicInformation: { ...this.state.basicInformationData[0] },
        otherInformation: { ...this.state.otherInformationData[0] },
        gunhaInformation: [...this.state.ghunhaInfomationData],
        currentuser: { ...this.props.user },
        // this.state.basicInformationData
      };
      this.props.dispatch(professionalAction.createCriminal(data));
      // this.props.dispatch(professionalAction.getCriminalsTableInfoById(this.props.user.id));
      message.info("Save Successfully !!");
      this.onCloseAccusedDrawer();
    }, 1000);
  };

 

  onUpdateConfirm = () => {
    this.otherInfomationRef.current.onFinish();
    const { gunhaInfor, otherInfo } = this.props.professionals;
    // this.setState({
    //   ghunhaInfomationData: [
    //     ...this.state.ghunhaInfomationData,
    //   ],
    // });
    setTimeout(() => {
      let data = {
        basicInformation: { ...this.state.basicInformationData[0] },
        otherInformation: { ...this.state.otherInformationData[0] },
        gunhaInformation: [...this.state.ghunhaInfomationData],
        currentuser: { ...this.props.user },
        // this.state.basicInformationData
      };
      this.props.dispatch(
        professionalAction.updateCriminals(
          this.state.isAccusedFormEdit[0].editId,
          data
        )
      );
      message.info("Update  Successfully !!");
      this.onCloseAccusedDrawer();
      this.props.dispatch(
        professionalAction.getCriminalsTableInfoById('userId',this.props.user.id)
      );
    }, 1000);
  };

  onEditAccusedForm = (data) => {
    let temo = this.props.dispatch(
      professionalAction.getCriminalsById(data.id)
    );

    temo.then((res) => {
      const { gunhaInfor, otherInfo } = res;
      let getEditGunhaTemp = _.filter(gunhaInfor, (o) => {
        return o.masterId === data.id;
      });
      let getEditOtherTemp = _.filter(otherInfo, (o) => {
        return o.masterId === data.id;
      });
      this.setState({
        basicInformationData: [data],
        isAccusedFormEdit: [
          {
            editId: data.id,
            guhnhaEditId: getEditGunhaTemp[0] && getEditGunhaTemp[0].id,
            otherEditId: getEditOtherTemp[0] && getEditOtherTemp[0].id,
            isEdit: true,
          },
        ],
        ghunhaInfomationData: [...getEditGunhaTemp],
        otherInformationData: [...getEditOtherTemp],
        isEditForms: true,
        accusedDrawer: true,
        newGunha: false,
        resetBasicForm: false,
      });
    });
  };

  onViewAccusedForm = (data) => {
    if (data) {
      this.showCriminalViewModel();
      this.props.dispatch(professionalAction.getCriminalsViewsById(data));
    }
  };

  render() {
    const { criminalViewList } = this.props.professionals;
    const { professionals } = this.props;
    return (
      <div>
        <Button type="primary" onClick={this.showAccusedDrawer}>
          नवीन आरोपी समाविष्ट
        </Button>
        <Divider />
        <BaseFormTable
          onEditAccusedForm={this.onEditAccusedForm}
          onViewAccusedForm={this.onViewAccusedForm}
          criminalRecords={this.props.professionals}
        ></BaseFormTable>
        <Drawer
          title="प्रोफेशनल क्रिमिनल समाविष्ट"
          width={800}
          maskClosable={false}
          closable={false}
          onClose={this.onCloseAccusedDrawer}
          visible={this.state.accusedDrawer}
          footer={
            <div
              style={{
                textAlign: "right",
              }}
            >
              {/* <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={this.onClose} type="primary">
                Submit
              </Button> */}

              <div
                className="steps-action"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  <Button
                    onClick={this.onCloseAccusedDrawer}
                    style={{ marginRight: 8 }}
                  >
                    Cancel
                  </Button>
                </div>

                <div>
                  {this.state.current > 0 && (
                    <Button
                      onClick={() => this.prev()}
                      style={{ marginRight: 8 }}
                    >
                      Previous
                    </Button>
                  )}
                  {this.state.current < steps.length - 1 && (
                    <Button type="primary" onClick={() => this.next()}>
                      Next
                    </Button>
                  )}
                  {this.state.current === steps.length - 1 &&
                    // onClick={() => this.done()}

                    (this.state.isEditForms ? (
                      // <Popconfirm
                      //   placement="topLeft"
                      //   title={text}
                      //   onConfirm={this.onUpdateConfirm}
                      //   okText="Yes"
                      //   cancelText="No"
                      // >
                      //   <Button onClick={this.onUpdateConfirm} type="primary">Update</Button>
                      // </Popconfirm>
                      <Button onClick={this.onUpdateConfirm} type="primary">
                        Update
                      </Button>
                    ) : (
                      // <Popconfirm
                      //   placement="topLeft"
                      //   title={text}
                      //   onConfirm={this.onConfirm}
                      //   okText="Yes"
                      //   cancelText="No"
                      // >
                      //   <Button onClick={this.onConfirm} type="primary">Done</Button>
                      // </Popconfirm>
                      <Button onClick={this.onConfirm} type="primary">
                        Done
                      </Button>
                    ))}
                </div>
              </div>
            </div>
          }
        >
          <Steps current={this.state.current}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content mb-4" style={{ marginTop: "30px" }}>
            <Divider />
            {steps[this.state.current].flag === 1 ? (
              <BasicInformation
                ref={this.basicInformationRef}
                basicInformationFinish={this.basicInformationFinish}
                basicInformationData={this.state.basicInformationData}
                dataStates={this.props.professionals}
                onCityChange={this.onCityChange}
                isEditForms={this.state.isEditForms}
                uploadImage ={this.uploadImage}
              ></BasicInformation>
            ) : steps[this.state.current].flag === 2 ? (
              <div>
                <Button type="primary" onClick={this.showghunhaDrawer}>
                  आणखी गुन्हा जोडा
                </Button>
                {this.state.ghunhaInfomationData.length ? (
                  <GhunhaInfomationTable
                    data={this.state.ghunhaInfomationData}
                    editGhunhaInfomation={this.editGhunhaInfomation}
                    deleteGhunhaInfomation={this.deleteGhunhaInfomation}
                    professionals={this.props.professionals}
                    isEditForms={this.state.isEditForms}
                  ></GhunhaInfomationTable>
                ) : null}
                <Drawer
                  title="गुन्हा"
                  width={800}
                  maskClosable={false}
                  closable={false}
                  onClose={this.onghunhaDrawerClose}
                  visible={this.state.ghunhaDrawer}
                  footer={
                    <div
                      style={{
                        textAlign: "right",
                      }}
                    >
                      <Button
                        onClick={this.onGhunhaInfomationCancel}
                        style={{ marginRight: 8 }}
                      >
                        Cancel
                      </Button>
                      {!this.state.isGunhaEdit ? (
                        <Button
                          onClick={this.onGhunhaInfomationSave}
                          type="primary"
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          onClick={this.onGhunhaInfomationUpdate}
                          type="primary"
                        >
                          Update
                        </Button>
                      )}
                    </div>
                  }
                >
                  <GhunhaInfomation
                    ref={this.ghunhaInfomationRef}
                    newGunha={this.state.newGunha}
                    onGunhaFormFiniesh={this.onGunhaFormFiniesh}
                    onGunhaFormUpdate={this.onGunhaFormUpdate}
                    openKalamAndKaydaDrawer={this.openKalamAndKaydaDrawer}
                    dataStates={this.props.professionals}
                    editData={this.state.editGunhaInformationData}
                    onCityChange={this.onCityChange}
                    onKaydaChange={this.onKaydaChange}
                  ></GhunhaInfomation>
                </Drawer>
              </div>
            ) : steps[this.state.current].flag === 3 ? (
              <div>
                <OtherInformation
                  ref={this.otherInfomationRef}
                  uploadImage={this.uploadImage}
                  otherInformationData={this.state.otherInformationData}
                  otherInformationFiniesh={this.otherInformationFiniesh}
                  isEditForms={this.state.isEditForms}
                ></OtherInformation>
              </div>
            ) : (
              ""
            )}
          </div>
        </Drawer>

        {/* <Button type="primary" onClick={this.showCriminalViewModel}>
          Open Modal of 1000px width
        </Button> */}
        <Modal
          title="प्रोफेशनल क्रिमिनल"
          top
          visible={this.state.setCriminalViewModel}
          onOk={this.closeCriminalViewModel}
          onCancel={this.closeCriminalViewModel}
          width={95 + "%"}
        >
          <ViewFormModel dataStates={professionals}></ViewFormModel>
        </Modal>
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
const connectedProfessionalForm = connect(mapStateToProps)(ProfessionalForm);
export { connectedProfessionalForm as ProfessionalForm };
