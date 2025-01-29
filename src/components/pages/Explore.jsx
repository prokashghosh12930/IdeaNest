import { React,useEffect,useState , Fragment} from 'react';
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'; 
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'; 

const Explore = () => {
   const [image, setImage] = useState([]); 
   const [loadingstate, setLoadingstate] = useState(false);
   const [downloadingstate, setDownloadingstate] = useState(false);
   const [isOpen, setIsOpen] = useState(false); 
   const MySwal = withReactContent(Swal);

  const  closeModal = () => {
    setIsOpen(false);
  }
  const  openModal = () => {
    setIsOpen(true);
  }
 


   useEffect(()=> {
      axios.post('http://localhost/api/fetchImage.php').then((result)=>{ 
       result.data.map(image => (
         setImage(result.data)
       )); 
      
      setLoadingstate(true);
   })
      
},[]) 
const download = data => async (e) => {
   e.stopPropagation();
   e.preventDefault(); 
   const token = localStorage.getItem('token');
 if(token === null)
 {
  setLoadingstate(false);
   MySwal.fire({
      icon: 'warning',
      title: 'Oops',
      text: 'Please Login To Continue!'
    }) 
 }
 else
 {  
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  
   axios.post('http://localhost/api/user.php',null,config).then((result)=>{
    if(result.data.message == 'success'){
       setDownloadingstate(true);
       
      const formData = new FormData();
      formData.append('image', data.name); 
      formData.append('imageid', data.id); 
      formData.append('userid', result.data.id); 
       axios.post('http://localhost/api/download.php',formData).then((response)=>{
        setDownloadingstate(false);
        console.log(response);
        if(response.data.message == 'success')
        {
           
          saveAs(response.data.file, data.name); 
          openModal();
           
        }
        else{
          MySwal.fire({
            icon: 'info',
            title: 'Oops',
            text: response.data.message 
          })  
        } 

       });
     


        }  
        else{
         MySwal.fire({
            icon: 'warning',
            title: 'Oops',
            text: 'Please Login To Continue!'
          })  
        }
   });
 }
 
    
} 




  
    return (
       <>
       {!loadingstate && <Imageloader />} 
       {loadingstate && 
       <div className='mt-10  box-border flex justify-center items-center z-20'> 
       <div className='w-full p-4'>
       <div className="columns-4"> 
     {
       image.map(image => ( 
    <div key={image.id}  className=' rounded-lg mb-4 relative group'> 
    <img className='rounded-xl cursor-pointer  group-hover:brightness-75 transition-all duration-200 '  src={'http://localhost/api/images/'+image.name} /> 

     <div className="absolute rounded-full bottom-3 right-0 -translate-x-1/2">
      <button  disabled={downloadingstate} className='shadow-lg z-20 rounded-xl h-10 w-10 bg-gray-200 flex justify-center items-center  transition-all duration-150 scale-0 origin-right  group-hover:scale-100'  onClick={download(image)}>
      {downloadingstate && <i className="far fa-sync fa-spin"></i> }
      {!downloadingstate && <i className="far fa-arrow-to-bottom"></i> }
      </button> 
       </div>

       <div className="absolute rounded-lg bottom-2 left-3"> 
       <span className='shadow-lg z-20   h-10 w-full  flex justify-center items-center  transition-all duration-200 opacity-0 origin-right  group-hover:opacity-100 text-white text-sm'> 
       <img src={image.image} className='h-7 w-7 rounded-full mr-2 object-cover bg-white' />{image.username}
      </span> 
      </div> 

  

    </div>  ))
}
      

    </div>
  </div>
 </div>
  }

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Download successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                     Picture has been successfully downloaded.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
       </>
    )

   }
   const Imageloader = () => {
    return (
      <>
      <div className="mt-6 grid grid-cols-4 gap-4 font-mono text-white text-sm text-center font-bold  bg-stripes-fuchsia rounded-lg px-5 animate-pulse ">
    <div className="px-4 mx-1 mt-2 rounded-lg h-[50vh] bg-gray-200"></div>
    <div className="px-4 mx-1 mt-2 rounded-lg h-[50vh] bg-gray-200"></div>
    <div className="px-4 mx-1 mt-2 rounded-lg h-[50vh] bg-gray-200"></div>
    <div className="px-4 mx-1 mt-2 rounded-lg h-[50vh] bg-gray-200"></div>
    <div className="px-4 mx-1 mt-2 rounded-lg h-[50vh] bg-gray-200"></div>
    <div className="px-4 mx-1 mt-2 rounded-lg h-[50vh] bg-gray-200"></div>
    <div className="px-4 mx-1 mt-2 rounded-lg h-[50vh] bg-gray-200"></div>
    <div className="px-4 mx-1 mt-2 rounded-lg h-[50vh] bg-gray-200"></div> 
  </div>


       
      
      </>
)
}
 

   export default Explore;