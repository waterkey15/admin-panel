import React, { useState } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Header from './components/Header';
import { useSelector } from 'react-redux';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import EditForm from './components/EditForm';
import { Tabs } from 'antd';
import AddUserForm from './components/AddUserForm';

const { TabPane } = Tabs;

function App() {


  const user = useSelector((state) => state.user.value);
  const [editFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(1);
  const [refreshList, setRefreshList] = useState(false);

  const openEditForm = (information) => {
    console.log(information);
    setSelectedUserId(information)
    setIsEditFormOpen(true)
  }

  const closeEditForm = () => {
    setIsEditFormOpen(false)
  }

  const refreshListFnc = () => {
    setRefreshList(!refreshList);
  }

  return (
    <div className="App">
      <Header/>
      {
        user.role ==="admin"&&user.active===1 &&
        <div>
          <Tabs defaultActiveKey="1" centered>
            <TabPane  tab="UserList" key="1" >
              <UserList refreshList={refreshList} handleOpenEditForm={(information) => openEditForm(information)}/>
              <AddUser handleRefreshList={(e) => refreshListFnc()}/>
            </TabPane>
            <TabPane tab="Add User" key="2">
            <AddUserForm />
            </TabPane>
          </Tabs>
        </div>
      }
      {
        (user.role ==="user"||user.active===0)&&user.role!==null &&
        <div>
          You are not allowed to see the user list
        </div>
      }
      {
        editFormOpen&&user.role ==="admin"&&user.active===1 &&
        <div className='edit-form-holder'>
          <div className='edit-form-div'>
            <EditForm id={selectedUserId} closeEditUserHandler={(e) => closeEditForm()}/>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
