import React, { useState } from 'react'
import { Button, Checkbox, Form, Input, Radio, Switch, message, Upload  } from 'antd';
import './SigninForm.css';
import { CloseOutlined,  LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { addUserBackend, sendPhoto } from '../backend-operations/userOperations';


const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }

  return isJpgOrPng && isLt2M;
};

function AddUserForm({closeAddUserHandler}) {

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const onFinish = (values) => {
        console.log('Success:', values);
        addUserBackend(values).then((result) => {
          if(result.success === false){
            setErrorMessage(result.message)
          }else{
            setSuccessMessage(result.message);
            setTimeout(() => {
              closeAddUserHandler()
            }, 2000);
          }
        })
        .catch((err) => {
          setErrorMessage(err)
        })
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };    

      const handleChange = (info) => {
        if (info.file.status === 'uploading') {
          setLoading(true);
          return;
        }
    
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          console.log(info.file.originFileObj);
          getBase64(info.file.originFileObj, (url) => {
            setLoading(false);
            setImageUrl(url);
            sendPhoto(info.file.originFileObj)
          });
        }
      };
    
      const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div
            style={{
              marginTop: 8,
            }}
          >
            Upload
          </div>
        </div>
      );


  return (
    <div className='form add-user-form'>
 <Form
  className='add-user-form'
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className='add-user-close-button-container'>
        <CloseOutlined className='close-button-icon' onClick={closeAddUserHandler}/>
      </div>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Age"
        name="age"
        rules={[
          {
            required: true,
            message: 'Please input your age!',
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="Mobile Phone"
        name="mobile"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item  label="Active" valuePropName="checked" name="switch">
        <Switch />
      </Form.Item>

      <Form.Item
        name="role"
        label="Role"
        rules={[{ required: true, message: 'Please pick an item!' }]}
      >
        <Radio.Group>
          <Radio.Button value="admin">Admin</Radio.Button>
          <Radio.Button value="user">User</Radio.Button>
        </Radio.Group>
      </Form.Item>


      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
      </Form.Item>
      
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: '100%',
                }}
              />
            ) : (
              uploadButton
            )}
        </Upload>

      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <div>
          {
            successMessage
          }
        </div>
        <div>
          {
            errorMessage
          }
        </div>
      </Form.Item>
    </Form>
    </div>
  )
}

export default AddUserForm