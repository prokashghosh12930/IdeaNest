import React from 'react';
import AuthNav from './AuthNav.jsx';
import { Outlet } from 'react-router-dom'; 

const AuthLayout = () => {
 return (
    <>
    <div className='flex'>
    <AuthNav />
    <Outlet />
    </div>
    </>
 )
}
export default AuthLayout;