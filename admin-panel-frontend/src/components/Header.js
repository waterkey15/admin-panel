import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Header.css';
import { Button } from 'antd';
import SigninForm from './SigninForm';
import { SET_USER } from '../features/user/userSlice';


function Header() {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const [isSignInOpen, setIsSignInOpen] = useState(false)

    const handleSignout = () => {
        dispatch((SET_USER({
            email: null,
            userID: null,
            role: null
        })));  
    }

    const closeSignInFrom = () => {
        setIsSignInOpen(!isSignInOpen)
    }
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
                <Button onClick={handleSignout}>Sign out</Button>
            </div>
        }
        {
            isSignInOpen&&
            <SigninForm handleCloseSigninForm = {(e) => closeSignInFrom()}/>
        }
    </div>
  )
}


export default Header