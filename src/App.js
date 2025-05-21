import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/pages/Layout.jsx';
import Home from './components/pages/Home.jsx';
import Explore from './components/pages/Explore.jsx';
import Pricing from './components/pages/Pricing.jsx';
import License from './components/pages/License.jsx'; 
import Signup from './components/pages/Signup.jsx'; 
import Login from './components/pages/Login.jsx';
import AuthLayout from './components/auth/AuthLayout.jsx';
import Profile from './components/auth/Profile.jsx'; 
import Subscription from './components/auth/Subscription.jsx'; 
import Api from './components/auth/Api.jsx'; 
import Upload from './components/auth/Upload.jsx';
import Contests from './components/pages/Contests.jsx';


const  App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<Home />} />
      <Route path="explore" element={<Explore />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="license" element={<License />} />  
      <Route path="contests" element={<Contests />} />
      </Route> 
      
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} /> 

      <Route path="/user" element={<AuthLayout/>}>
      <Route index element={<Profile />} />  
      <Route path="Subscription" element={<Subscription />} /> 
      <Route path="Api" element={<Api />} /> 
      <Route path="Upload" element={<Upload />} /> 
      </Route> 

    </Routes>
    </BrowserRouter>
    </>

   
  );
}

export default App;
