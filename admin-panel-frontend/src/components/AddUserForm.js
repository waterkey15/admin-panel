import React, { useState } from 'react'
import { Button, Checkbox, Form, Input, Radio, Switch } from 'antd';
import './SigninForm.css';
import { CloseOutlined } from '@ant-design/icons'
import { addUserBackend } from '../backend-operations/userOperations';


function AddUserForm({closeAddUserHandler}) {

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const onFinish = (values) => {
        console.log('Success:', values);
        addUserBackend(values).then((result) => {
          setSuccessMessage(result.message)
        })
        .catch((err) => {
          setErrorMessage(err)
        })
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };    



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
        <Checkbox>Remember me</Checkbox>
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