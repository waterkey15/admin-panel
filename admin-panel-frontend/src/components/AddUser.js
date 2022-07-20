import { PlusCircleOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import './AddUser.css'
import AddUserForm from './AddUserForm';


function AddUser() {

  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const closeAddUser = () => {
    setIsAddUserOpen(false);
  }

  return (
    <div className='add-user-container'>
        <PlusCircleOutlined className="circle-svg" onClick={(e) => setIsAddUserOpen(!isAddUserOpen)}/>
        {
            isAddUserOpen&&
            <AddUserForm closeAddUserHandler={(e) => closeAddUser()}/>
        }
    </div>
  )
}

export default AddUser