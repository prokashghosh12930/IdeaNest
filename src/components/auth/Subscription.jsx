import {React, Fragment, useEffect, useRef, useState } from 'react';
import {useNavigate } from 'react-router-dom';  
import axios from 'axios'; 
const Subscription = () => {
const navigate = useNavigate();  
const [plandata, setPlandata] = useState({
   plan:"",
   subscribed:"",
   expired:""
});

useEffect(()=> {
   const token = localStorage.getItem('token');
   if(token === null)
   {
     navigate('/login'); 
   }
   else
   {  
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
     axios.post('http://localhost/api/fetchSubscription.php',null,config).then((result)=>{
      setPlandata({plan:result.data.plan,subscribed:result.data.subscribed,expired:result.data.expiry});  
          
     });
   }
  },[])

  



 return (
    <>
     <div className='w-full flex justify-center'>
     <div className='w-9/12'> 
     <div className='p-24 flex items-center'>
     <div className='bg-[#f0f2f5] w-100 px-6 py-4 w-full rounded-lg  '>
      <span className='font-Poppins font-semibold'><i className="fas fa-badge-check text-green-500 mr-1"></i> {plandata.plan} Plan</span>
      <hr className='mt-4 ' />
     
         <span className='text-gray-500 inline-block text-xs mt-4'>Subscribed ~ {plandata.subscribed} </span> 
         <span className='text-gray-500 float-right text-xs mt-4'>  Expired ~ {plandata.expired}</span> 
      
     </div>
     </div>
     </div>
     </div>
    </>
 )
}
export default Subscription;