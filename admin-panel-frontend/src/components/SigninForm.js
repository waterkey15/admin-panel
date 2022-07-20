import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import './SigninForm.css';
import { signIn } from '../backend-operations/userOperations';
import { SET_USER } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';


function SigninForm({handleCloseSigninForm}) {
  const dispatch = useDispatch();

  
    const onFinish = (values) => {
        console.log('Success:', values);
        signIn(values).then((results) => {
          console.log(results);
          dispatch((SET_USER({
            email: results.data.email,
            userID: results.data.name,
            role: results.data.role
          }))); 
          handleCloseSigninForm();
        })
        .catch((err) => {
          console.log(err);
        })
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };    



  return (
    <div className='form'>
 <Form
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
      <Form.Item
        label="Signin"
        name="email"
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
      </Form.Item>
    </Form>
    </div>
  )
}

export default SigninForm