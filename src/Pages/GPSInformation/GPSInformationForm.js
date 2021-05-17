import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

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
  Upload,
  message
} from "antd";
import _ from 'lodash';



import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const { Option } = Select;
const { forwardRef, useRef, useImperativeHandle } = React;
export const NewsForm = forwardRef((props, ref) => {

  const [form] = Form.useForm();
  const [newsType, setNewType] = useState(null);
 
  const [user, SetUser] = useState({});
  const [basicDistricts, SetBasicDistricts] = useState([]);
  const [pc_cities, SetPC_cities] = useState([]);
  const [isSave, setIsSave] = useState(null);
  const [fileData, setFileData] = useState({});
  const [imageUrl, setImageUrl] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [imageSuccess, setImageSuccess] = useState(false);

  useEffect(() => {
    SetUser(props.user);
  }, [props.user]);

  useEffect(() => {
     if(props.resetFrom && props.resetFrom){
      form.resetFields();
      setImageUrl('')
     }
  }, [props.resetFrom]);

  useImperativeHandle(ref, () => ({
    onFinish(flag) {
     setIsSave(flag);
      form.submit();
    },
  }));

   

 

  const onFinish = (values) => {
    if(isSave){
        let obj = {
          ...values,
          files:fileData
        }
        props.onFormFinish(obj);
      }else{
        props.onFormUpdate(values);
      }
  };


  // const handleUpload = (value) =>{
  //     setFileData(value);
  // }

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function beforeUpload(file) {
      if(parseInt(newsType) === 2){
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
       return isJpgOrPng && isLt2M;
      }else if(parseInt(newsType) === 3) {
            const isJpgOrPng = file.type === 'video/mp4';
            if (!isJpgOrPng) {
              message.error('You can only upload mp4 file!');
            }
            const isLt2M = file.size < 20000000;
            if (!isLt2M) {
              message.error('Video must smaller than 20MB!');
            }
            return isJpgOrPng && isLt2M;
      }else {
              const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
              if (!isJpgOrPng) {
                message.error('You can only upload JPG/PNG file!');
              }
              const isLt2M = file.size / 1024 / 1024 < 2;
              if (!isLt2M) {
                message.error('Image must smaller than 2MB!');
              }
              return isJpgOrPng && isLt2M;
      }
  }

  const handleUpload = info => {

    if (info.file.status === 'uploading') {
      // this.setState({ loading: true });
      setImageLoading(true);
      setFileData(info);
      return;
    }

    if(imageSuccess){
      getBase64(info.file.originFileObj, imageUrl =>
        {
          setImageLoading(false);
          setImageUrl(imageUrl)
        }
        );
    }else{
      setImageLoading(false);
      setImageUrl('');
      setImageSuccess(false);
    }
 
  

    // if (info.file.status === 'uploading') {
    //   // this.setState({ loading: true });
    //   setImageLoading(true);
    //   setFileData(info);
    //   return;
    // }
    // if (info.file.status === 'done') {
    //   // Get this url from response in real world.
    //   getBase64(info.file.originFileObj, imageUrl =>
    //     {
    //       setImageLoading(false);
    //       setImageUrl(imageUrl)
    //     }
    //   );
    // }
  };

  const handleRemoveAccusedImage = (file) =>{
    // let temp = fileList;
    // let tempIndex = _.findIndex(fileList,file)
    // temp && temp.length && temp.splice(tempIndex,1);
    // SetfileList([
    //   ...temp
    // ]);
    setImageUrl('')
  }
  const uploadButton = (
    <div  >
      {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8, }}>Upload</div>
    </div>
  );
  return (
    <Form layout="vertical" onFinish={onFinish} form={form}>
      
      <Row gutter={16}>
      <Col span={12}>
      <Form.Item
              name="newsType"
              label="News Type"
              rules={[
                {
                  required: true,
                  message: "Please select an news type",
                },
              ]}
            >
              <Select
                placeholder="Please select an news type"
                rules={[{ required: true, message: "Please select news type" }]}
                style={{width:'100%'}}
                value={newsType}
                onChange={(e) =>{setNewType(e)}}
              >
                    <Option key={1} value="1">Text</Option>
                    <Option key={2} value="2">Image</Option>
                    <Option key={3} value="3">Video</Option>
              </Select>
            </Form.Item>
            </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
              <Form.Item
                name="newdescription"
                label="Descriptions"
              >
                  <TextArea     placeholder="Please enter descriptions.." allowClear  />
              </Form.Item>
        </Col>
      </Row>
      <Row span={24}>
       {
         parseInt(newsType) === 2 || parseInt(newsType) === 3 ?<Col span={14} className="NewsUploadImage">
         <Upload  
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action=""
            beforeUpload={(file) => {setImageSuccess(beforeUpload(file))}}
            onChange={handleUpload}
            onRemove = {handleRemoveAccusedImage}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ maxWidth:'100%',maxHeight:'100%', objectFit:'contain' }} /> : uploadButton}
          </Upload>
        </Col>:null
       } 
        
        
      </Row>
    </Form>
  );
});
