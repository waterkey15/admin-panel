import { CloseOutlined } from '@ant-design/icons';
import {
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Radio
  } from 'antd';
  import React, { useEffect, useState } from 'react';
import { getSpecificUserInformation, updateUser } from '../backend-operations/userOperations';
  import './EditForm.css';
  const { Option } = Select;
  const residences = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 0,
      },
      sm: {
        span: 0,
      },
    },
    wrapperCol: {
      xs: {
        span: 0,
      },
      sm: {
        span: 0,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 0,
        offset: 0,
      },
      sm: {
        span: 0,
        offset: 0,
      },
    },
  };
  
  const EditForm = ({id, closeEditUserHandler}) => {
    const [form] = Form.useForm();
  
    const onFinish = (values) => {
      console.log('Received values of form: ', values);
      var sentValues = {
        id : id,
        name: values.name===undefined? name: values.name,
        age: values.age===undefined? name: values.age,
        mobile: values.mobile===undefined? name: values.mobile,
        role: values.role===undefined? name: values.role
      }
      updateUser(sentValues).then((result) => {
        closeEditUserHandler();
      })
      .catch((err) => {
        console.log(err)
      })
    };
  
    const prefixSelector = (
      <Form.Item name="prefix" noStyle>
        <Select
          style={{
            width: 70,
          }}
        >
          <Option value="86">+1</Option>
        </Select>
      </Form.Item>
    );
    const suffixSelector = (
      <Form.Item name="suffix" noStyle>
        <Select
          style={{
            width: 70,
          }}
        >
          <Option value="USD">$</Option>
          <Option value="CNY">¥</Option>
        </Select>
      </Form.Item>
    );
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  
    const onWebsiteChange = (value) => {
      if (!value) {
        setAutoCompleteResult([]);
      } else {
        setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
      }
    };
  
    const websiteOptions = autoCompleteResult.map((website) => ({
      label: website,
      value: website,
    }));

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [mobile, setMobile] = useState('')
    const [role, setRole] = useState('')


    useEffect(() => {
        getSpecificUserInformation(id).then((result) => {
            setEmail(result.data.email);
            setName(result.data.name)
            setMobile(result.data.mobile)
            setAge(result.data.age)
            setRole(result.data.role)
        })
        .catch((err) => {
            console.log(err);
        })
    }, [email, name, age, mobile, role])





    return (
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        scrollToFirstError
      >
        <div className='close-update-button'>
        <h2>Edit User</h2>
        <CloseOutlined onClick={closeEditUserHandler}/>
        </div>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              message: 'Please input your E-mail!',
            },
            {
                "name": [
                  "username"
                ],
                "value": "Ant Design"
              }
          ]}
        >
          <Input readOnly placeHolder={email}/>
        </Form.Item>
  
  
        <Form.Item
          name="name"
          label="Name"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: 'Please input your nickname!',
              whitespace: true,
            },
          ]}
        >
          <Input placeholder={name} value={name}/>
        </Form.Item>
  
  
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: '100%',
            }}
            placeHolder={mobile}
          />
        </Form.Item>

        <Form.Item
          name="age"
          label="Age"
          rules={[
            {
              required: true,
              message: 'Please input your age!',
            },
          ]}
        >
          <Input placeholder={age} />
        </Form.Item>
        <Form.Item name="role" label="Role">
        <Radio.Group defaultValue={"user"}>
          <Radio value="admin">admin</Radio>
          <Radio value="user">user</Radio>
        </Radio.Group>
      </Form.Item>


        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    );
  };
  
  export default EditForm;