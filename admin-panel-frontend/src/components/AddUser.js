import { PlusCircleOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import './AddUser.css'
import AddUserForm from './AddUserForm';


function AddUser() {

    const [isAddUserOpen, setIsAddUserOpen] = useState(false);


  return (
    <div className='add-user-container'>
        <PlusCircleOutlined className="circle-svg" onClick={(e) => setIsAddUserOpen(!isAddUserOpen)}/>
        {
            isAddUserOpen&&
            <AddUserForm/>
        }
    </div>
  )
}

export default AddUser