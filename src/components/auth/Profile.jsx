import { Dialog,Menu, Transition } from '@headlessui/react'
import {React, Fragment, useEffect, useRef, useState } from 'react';
import {NavLink,useNavigate } from 'react-router-dom';  
import axios from 'axios'; 
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'; 
const Profile = () => {
const MySwal = withReactContent(Swal);
const navigate = useNavigate();  
const [auth, setAuth] = useState({
   image:"",
   name:"",
   email:""
});
const [isOpen, setIsOpen] = useState(false); 
const  closeModal = () => {
  setIsOpen(false);
}
const  openModal = () => {
  setIsOpen(true);
}

useEffect(() => {
  const token = localStorage.getItem('token');
  if (token === null) {
    navigate('/login');
  } else {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    
    axios.post('http://localhost/api/user.php', null, config)
      .then((result) => { 
        if (result.data.message === 'success') { 
          setAuth({ image: result.data.image, name: result.data.name, email: result.data.email, created: result.data.created }); 
        } else {
         localStorage.removeItem("token");
          navigate('/login');
        }
      })
      .catch((error) => { 
        console.error('There was an error with the request:', error);
       localStorage.removeItem("token");
       navigate('/login');
      });
  }
}, []);

const logOut = () => { 
   MySwal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Logout!'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem('token');
   window.localStorage.clear();
      navigate('/login'); 
    }
  })
}

  

 return (
    <>
    <div className='w-full flex justify-center'>
     <div className='w-9/12'> 
     <div className='p-24 flex items-center'>
      <div>
      <img src={auth.image} className='rounded-full object-contain h-36 w-36 border border-gray-200' />
      <h1 className='text-2xl font-semibold mt-6 font-Poppins ml-4'>{auth.name} <sup><i className="fas fa-badge-check text-[#7934d9]"></i></sup></h1>  
        
      <span className='text-sm text-gray-500 font-Poppins block mt-1 ml-4'><i className="fad fa-calendar-alt"></i> &nbsp;Joined {auth.created}</span> 

     
 
      </div>

      <div className='ml-auto flex'>
        <div className='mr-3'>



       {/* <span className='bg-white cursor-pointer text-black border border-black px-6 py-3 rounded-3xl' onClick={openModal}>
        <i className="far fa-pencil-alt "></i> Edit
        </span>*/}

<Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg  transform overflow-hidden rounded-3xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg  font-medium leading-6 text-gray-900 flex   "
                  >
                   <div className='relative w-full text-xl font-Poppins'>
                   <i className="fal fa-times   mr-2 cursor-pointer" onClick={closeModal}></i> Edit Profile
                   
                    <button className='bg-[#0f1419] rounded-3xl px-5 py-1.5 text-sm text-white absolute right-0 -top-1.5 outline-none'>Save</button>
                    </div>
                   
                  </Dialog.Title>
                  <div className="rounded-full  h-28 w-28 mt-8 relative">
                  <span className=' absolute bg-[rgba(0,0,0,0.2)] z-10 w-full h-full rounded-full flex items-center justify-center'>
                    <input type="file" hidden id="profile"/>
                    <label for="profile" className='bg-[rgba(0,0,0,0.5)] h-12 w-12 rounded-full flex items-center justify-center text-white text-lg cursor-pointer'><i class="fal fa-camera-alt"></i></label>
                  </span>
                  
                  <img src={auth.image} className='rounded-full object-contain h-28 w-28 border border-gray-200' />
                  </div>

    <div className="relative mt-9">
    <input type="text" id="floating_filled" className="block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900   border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1d9bf0] focus:outline-none focus:ring-0 focus:border-[#1d9bf0] peer" value={auth.name} placeholder=" " />
    <label for="floating_filled" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-[#1d9bf0] peer-focus:dark:text-[#1d9bf0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Name</label>
</div>


<div className="relative mt-4">
    <input type="text" id="floating_filled" className="block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900   border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#1d9bf0] focus:outline-none focus:ring-0 focus:border-[#1d9bf0] peer" value={auth.email} placeholder=" " />
    <label for="floating_filled" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-[#1d9bf0] peer-focus:dark:text-[#1d9bf0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Email</label>
</div>



                 
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>


        </div>
        <div>
        <Menu>
          {({ open }) => (
            <> 
                <Menu.Button  >
                  <span className='bg-black text-white px-6 py-3 rounded-3xl'>
                <i className="far fa-cog"></i> Settings
                </span>
                   
                </Menu.Button>
               

              <Transition
                show={open}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  static
                  className="absolute right-0 w-56 mt-5 origin-top-right bg-white divide-y divide-gray-100 rounded-xl shadow-xl outline-none"
                > 
                  <div className="py-1">
                    {/*<Menu.Item>
                      {({ active }) => (
                        <span
                           
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                        >
                          Account settings
                        </span>
                      )}
                    </Menu.Item>*/}
                    
                    
                    <Menu.Item>
                      {({ active }) => (
                        <NavLink to="/license">
                           <span 
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                        >
                          License
                        </span>
                        </NavLink>
                      )}
                    </Menu.Item>
                  </div>

                  <div className="py-1">
                    <Menu.Item onClick={logOut}>
                      {({ active }) => (
                        <span
                          
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                        >
                          Sign out
                        </span>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>







         </div>
        </div>

         
      
     </div>
     </div>
     </div>
    </>
 )
}
export default Profile;