import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Header.css';
import { Button } from 'antd';
import SigninForm from './SigninForm';


function Header() {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const [isSignInOpen, setIsSignInOpen] = useState(false)

    console.log(user);
  return (
    <div className='header-container'>
        <h1 className='welcome-logo'>
            Welcome to the System
        </h1>
        {
            user.userID === null ? 
            <div>
                <Button onClick={(e) => setIsSignInOpen(!isSignInOpen)} type="primary" className='sign-in-button'>Sign In</Button>
            </div>
            :
            <div className='welcommer'>
                Welcome {user.userID}
                <Button>Sign out</Button>
            </div>
        }
        {
            isSignInOpen&&
            <SigninForm/>
        }
    </div>
  )
}


export default Header