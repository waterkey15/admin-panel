import React, { Component, useEffect, useState } from 'react'
import { DownOutlined } from '@ant-design/icons';
import { Form, Radio, Space, Switch, Table } from 'antd';
import './UserList.css'
import { getAllUsers, setActiveUser } from '../backend-operations/userOperations';



  
  const defaultExpandable = {
    expandedRowRender: (record) => <p>{record.description}</p>,
  };
  
  const defaultTitle = () => 'Here is title';
  
  const defaultFooter = () => 'Here is footer';

function UserList({handleOpenEditForm, refreshList}) {
    const [loading, setLoading] = useState(false);
    const [size, setSize] = useState('large');
    const [expandable, setExpandable] = useState(defaultExpandable);
    const [showTitle, setShowTitle] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [showfooter, setShowFooter] = useState(true);
    const [rowSelection, setRowSelection] = useState({});
    const [hasData, setHasData] = useState(true);
    const [tableLayout, setTableLayout] = useState(undefined);
    const [top, setTop] = useState('none');
    const [bottom, setBottom] = useState('bottomRight');
    const [ellipsis, setEllipsis] = useState(false);
    const [yScroll, setYScroll] = useState(false);
    const [xScroll, setXScroll] = useState(undefined);
  


  
  




  const [data, setData] = useState([{
    key: 1,
    name: 'John Brown 1',
    age: Number(`33`),
    mobile: `607234242`,
    email: `aswadaw@gmail.com`,
    role: 'admin'
  },
  {
    key: 2,
    name: 'John Brown 2',
    age: Number(`65`),
    mobile: `607634242`,
    email: `aswadaw@gmail.com`,
    role: 'admin'

  },
  {
    key: 3,
    name: 'John Brown 3',
    age: Number(`12`),
    mobile: `607234242`,
    email: `aswadaw@gmail.com`,
    role: 'admin'
  },
  {
    key: 4,
    name: 'John Brown 4',
    age: Number(`84`),
    mobile: `607234242`,
    email: `aswadaw@gmail.com`,
    role: 'admin'

  },
  {
    key: 5,
    name: 'John Brown 5',
    age: Number(`35`),
    mobile: `607234242`,
    email: `aswadaw@gmail.com`,
    role: 'user'
  },
]);


const isIdActive = (id) => {
  for(var i = 0; i < data.length; i++){
    if(data[i].key === id){

      if(data[i].active == 1){
        return true;
      }else{
        return false;
      }
    }
  }
}


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
      title: 'Mobile',
      dataIndex: 'mobile',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },

  {
    title: 'Action',
    key: 'action',
    sorter: true,
    render: (event) => (
      <Space size="middle">
        <div>
          <Switch onChange={(e) => setActiveUser(event.key, e)} defaultChecked={isIdActive(event.key)} className="switch"/>
          <span className='active-txt'>Active</span>
        </div>

        <a onClick = {(e) => handleOpenEditForm(e.target.parentElement.parentElement.parentElement.parentElement.attributes[0].value)}>
          Edit
        </a>
      </Space>
    ),
  },
];
  
    const handleLoadingChange = (enable) => {
      setLoading(enable);
    };
  
    const handleSizeChange = (e) => {
      setSize(e.target.value);
    };
  
    const handleTableLayoutChange = (e) => {
      setTableLayout(e.target.value);
    };
  
  
    const handleEllipsisChange = (enable) => {
      setEllipsis(enable);
    };
  

  
    const handleRowSelectionChange = (enable) => {
      setRowSelection(enable ? {} : undefined);
    };
  
    const handleYScrollChange = (enable) => {
      setYScroll(enable);
    };
  
    const handleXScrollChange = (e) => {
      setXScroll(e.target.value);
    };
  
    const handleDataChange = (newHasData) => {
      setHasData(newHasData);
    };
  
    const scroll = {};
  
    if (yScroll) {
      scroll.y = 240;
    }
  
    if (xScroll) {
      scroll.x = '100vw';
    }
  
    const tableColumns = columns.map((item) => ({ ...item, ellipsis }));
  
    if (xScroll === 'fixed') {
      tableColumns[0].fixed = true;
      tableColumns[tableColumns.length - 1].fixed = 'right';
    }
  
    const tableProps = {
      loading,
      size,
      expandable,
      title: showTitle ? defaultTitle : undefined,
      showHeader,
      rowSelection,
      scroll,
      tableLayout,
    };
      
    useEffect(() => {
      getAllUsers().then((result) => {
        var users = result.data.data.message;
        var newUser;
        var newDataSet = []
        for(var i = 0; i < result.data.data.message.length; i++){
          newUser = {
            key: users[i].id,
            name: users[i].name,
            age: users[i].age,
            mobile: users[i].mobile,
            email: users[i].email,
            role: users[i].role,
            active: users[i].active
          }
          newDataSet.push(newUser)
        }
        setData(newDataSet)
      })
    }, [refreshList])

  return (

    <>
    <Form
      layout="inline"
      className="components-table-demo-control-bar user-list-holder"
      style={{
        marginBottom: 16,
      }}
    >


      <Form.Item label="Checkbox">
        <Switch checked={!!rowSelection} onChange={handleRowSelectionChange} />
      </Form.Item>


      <Form.Item label="Ellipsis">
        <Switch checked={!!ellipsis} onChange={handleEllipsisChange} />
      </Form.Item>
      <Form.Item label="Size">
        <Radio.Group value={size} onChange={handleSizeChange}>
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="middle">Middle</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Table Scroll">
        <Radio.Group value={xScroll} onChange={handleXScrollChange}>
          <Radio.Button value={undefined}>Unset</Radio.Button>
          <Radio.Button value="scroll">Scroll</Radio.Button>
          <Radio.Button value="fixed">Fixed Columns</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Table Layout">
        <Radio.Group value={tableLayout} onChange={handleTableLayoutChange}>
          <Radio.Button value={undefined}>Unset</Radio.Button>
          <Radio.Button value="fixed">Fixed</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Pagination Bottom">
        <Radio.Group
          value={bottom}
          onChange={(e) => {
            setBottom(e.target.value);
          }}
        >
          <Radio.Button value="bottomLeft">BottomLeft</Radio.Button>
          <Radio.Button value="bottomCenter">BottomCenter</Radio.Button>
          <Radio.Button value="bottomRight">BottomRight</Radio.Button>
          <Radio.Button value="none">None</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </Form>
    <Table
      {...tableProps}
      pagination={{
        position: [top, bottom],
      }}
      columns={tableColumns}
      dataSource={hasData ? data : []}
      scroll={scroll}
    />
  </>

  )
}

export default UserList