import {React,useState,Component} from 'react';
import Planet from '../../assets/images/planet.png';
import Footer from './Footer.jsx'; 
import axios from 'axios'; 
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'; 
const Pricing = () => {
   
  const MySwal = withReactContent(Swal);
  const [loading, setLoading] = useState({});

  const handleBasicPay = plandata => async (e) => {
    setLoading(prev => ({ ...prev, [plandata.id]: true })); 
    const token = localStorage.getItem('token');
    if(token === null)
     {
       setLoading(prev => ({ ...prev, [plandata.id]: false }));
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
        plandata['userid'] = result.data.id; 
         axios.post('http://localhost/api/changeSubscription.php',plandata).then((response)=>{ 
          setLoading(prev => ({ ...prev, [plandata.id]: false })); 
           if(response.data.message == 'success')
           {
            setLoading(prev => ({ ...prev, [plandata.id]: false })); 
            MySwal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Subscribed To Basic Plan'
              }) 
           }
           else
           {
            setLoading(prev => ({ ...prev, [plandata.id]: false }));  
              MySwal.fire({
              icon: 'warning',
              title: 'Warning',
              text: response.data.message
              }) 
           }
         });  
        }
      });
     }
  }


    const handlePay = plandata => async (e) => { 
       
       setLoading(prev => ({ ...prev, [plandata.id]: true }));

       const token = localStorage.getItem('token');
       if(token === null)
        {
          setLoading(prev => ({ ...prev, [plandata.id]: false }));
          MySwal.fire({
          icon: 'warning',
          title: 'Oops',
          text: 'Please Login To Continue!'
          }) 
        }
        else{
           
          const config = {
            headers: { Authorization: `Bearer ${token}` }
          };
           axios.post('http://localhost/api/user.php',null,config).then((result)=>{
            if(result.data.message == 'success'){  
            plandata['userid'] = result.data.id;
            plandata['email'] = result.data.email;  
             axios.post('http://localhost/api/create-checkout-session.php',plandata).then((response)=>{ 
              setLoading(prev => ({ ...prev, [plandata.id]: false }));
                window.location.href = response.data; 
             });  
            }
          });
        }
}
 


    return (
       <>
        
      
       <div className='flex flex-col w-full h-52 justify-center items-center mt-4'>
         <h1 className='text-[2.4rem] text-[#02044a] font-bold'>Choose the plan that’s right for you.</h1>
        <p className='text-[#6c6d95] mt-2 text-md'>No contracts , No surprise fees</p>
        </div>

        <div className='px-24 mt-10 sticky top-[4.5rem] bg-[#ffffff] p-4'>
        <div className="grid grid-cols-5 gap-4">

        <div className="col-span-2 px-4 py-0 space-x-6 rounded-xl flex items-center justify-center bg-[#f9f9fb]">
         <img src={Planet} className='object-contain h-36 w-36' />
         <div>
         <h2 className='text-2xl font-semibold font-Poppins text-[#00003f]'>Get Started!</h2>
         <p className='mt-1 font-Poppins text-[#4417de]'>Pricing &nbsp;<i className="fas fa-arrow-right"></i></p>
         </div>
         </div>  

        <div className='p-5'>
         <h4 className='text-lg text-[#28284a]'>Basic</h4> <h2 className='text-2xl mt-2 font-semibold'>&#8377;0 <span className='text-sm font-normal text-[#a4a5be]'>/ month</span></h2> 
      
         <button onClick={handleBasicPay({
          name:'IdeaNest Basic Plan Subscription',
          amount:'0',
          plan:'basic',
          id:1
          })}  className='px-7 py-3 text-sm mt-4 bg-[#f5f1ff] rounded-lg text-[#6132e3]'>
             {loading[1] && <Progressing />}
            {!loading[1] && 'Choose Plan'}
            </button>
         
         </div>  
         <div className='p-5'>
         <h4 className='text-lg text-[#28284a]'>Popular</h4>
         <h2 className='text-2xl mt-2 font-semibold'>&#8377;99 <span className='text-sm font-normal text-[#a4a5be]'>/ month</span></h2> 
        
         <button onClick={handlePay({
          name:'IdeaNest Popular Plan Subscription',
          amount:'99',
          plan:'popular',
          id:2
          })} className='px-7 py-3 text-sm mt-4 bg-[#f5f1ff] rounded-lg text-[#6132e3]'>
            {loading[2] && <Progressing />}
            {!loading[2] && 'Choose Plan'}
          </button>
         
         </div>  
         
         <div className='p-5'>
         <h4 className='text-lg text-[#28284a]'>Enterprise</h4> 
         <h2 className='text-2xl mt-2 font-semibold'>&#8377;199 <span className='text-sm font-normal text-[#a4a5be]'>/ month</span></h2> 
         
         <button onClick={handlePay({
          name:'IdeaNest Enterprise Plan Subscription',
          amount:'199',
          plan:'enterprise', 
          id:3
          })} className='px-7 py-3 text-sm mt-4 bg-[#f5f1ff] rounded-lg text-[#6132e3]'>
             {loading[3] && <Progressing />}
            {!loading[3] && 'Choose Plan'}
          </button>
        
         </div>  
        </div> 
        </div>




        
        <div className='px-24 mt-4'>
        <div className="grid grid-cols-5 gap-0 bg-[#5f30e2] p-5 rounded-xl flex-wrap m-0">
        
        <div className='px-5 col-span-2'>
         <h4 className='text-lg p-4  text-[#ffffff]'>Standard Image License</h4>  
         </div>   
         <div className='px-5'>
         <h4 className='rounded-t-lg  bg-[#ffffff] text-xl p-5 text-[#5f30e2]  flex items-center justify-center'><i className="fas fa-check-circle"></i></h4>  
         </div>  
         <div className='px-5'>
         <h4 className='bg-[#5f30e2] text-xl p-5 text-[#fbd4c7]  flex items-center justify-center'><i className="fas fa-check-circle"></i></h4>  
         </div> 
         <div className='px-5'>
         <h4 className=' rounded-t-lg  bg-[#ffffff] text-xl p-5 text-[#5f30e2]  flex items-center justify-center'><i className="fas fa-check-circle"></i></h4>  
         </div> 



          
        <div className='px-5 col-span-2'>
         <h4 className=' text-lg p-4 text-[#ffffff]'>Monthly replenishment of downloads</h4>  
         </div>   
         <div className='px-5'>
         <h4 className=' bg-[#ffffff] text-xl p-5 text-[#5f30e2]  flex items-center justify-center'><i className="far fa-times-circle"></i></h4>  
         </div>  
         <div className='px-5'>
         <h4 className='bg-[#5f30e2] text-xl p-5 text-[#fbd4c7]  flex items-center justify-center'><i className="fas fa-check-circle"></i></h4>  
         </div> 
         <div className='px-5'>
         <h4 className=' bg-[#ffffff] text-xl p-5 text-[#5f30e2]  flex items-center justify-center'><i className="fas fa-check-circle"></i></h4>  
         </div> 

       
        <div className='px-5 col-span-2'>
         <h4 className=' text-lg p-4 text-[#ffffff]'>Worry-free licensing and legal protection</h4>  
         </div>   
         <div className='px-5'>
         <h4 className=' bg-[#ffffff] text-xl p-5 text-[#5f30e2]  flex items-center justify-center'><i className="far fa-times-circle"></i></h4>  
         </div>  
         <div className='px-5'>
         <h4 className='bg-[#5f30e2] text-xl p-5 text-[#fbd4c7]  flex items-center justify-center'><i className="fas fa-check-circle"></i></h4>  
         </div> 
         <div className='px-5'>
         <h4 className=' bg-[#ffffff] text-xl p-5 text-[#5f30e2]  flex items-center justify-center'><i className="fas fa-check-circle"></i></h4>  
         </div> 


         
        <div className='px-5 col-span-2'>
         <h4 className=' text-lg p-4 text-[#ffffff]'>Royalty Free Images</h4>  
         </div>   
         <div className='px-5'>
         <h4 className=' bg-[#ffffff] text-xl p-5 text-[#5f30e2]  flex items-center justify-center'><i className="far fa-times-circle"></i></h4>  
         </div>  
         <div className='px-5'>
         <h4 className='bg-[#5f30e2] text-xl p-5 text-[#fbd4c7]  flex items-center justify-center'><i className="fas fa-check-circle"></i></h4>  
         </div> 
         <div className='px-5'>
         <h4 className=' bg-[#ffffff] text-xl p-5 text-[#5f30e2]  flex items-center justify-center'><i className="fas fa-check-circle"></i></h4>  
         </div> 


         
        <div className='px-5 col-span-2'>
         <h4 className=' text-lg p-4 text-[#ffffff]'>PNG , JPEG Format</h4>  
         </div>   
         <div className='px-5'>
         <h4 className=' bg-[#ffffff] text-xl p-5 text-[#5f30e2]  flex items-center justify-center'><i className="fas fa-check-circle"></i></h4>  
         </div>  
         <div className='px-5'>
         <h4 className='bg-[#5f30e2] text-xl p-5 text-[#fbd4c7]  flex items-center justify-center'><i className="fas fa-check-circle"></i></h4>  
         </div> 
         <div className='px-5'>
         <h4 className=' bg-[#ffffff] text-xl p-5 text-[#5f30e2]  flex items-center justify-center'><i className="fas fa-check-circle"></i></h4>  
         </div> 

 
        <div className='px-5 col-span-2'>
         <h4 className=' text-lg p-4 text-[#ffffff]'>HD Resolution</h4>  
         </div>   
         <div className='px-5'>
         <h4 className=' bg-[#ffffff] text-xl p-5 text-[#5f30e2]  flex items-center justify-center'><i className="fas fa-check-circle"></i></h4>  
         </div>  
         <div className='px-5'>
         <h4 className='bg-[#5f30e2] text-xl p-5 text-[#fbd4c7]  flex items-center justify-center'><i className="fas fa-check-circle"></i></h4>  
         </div> 
         <div className='px-5'>
         <h4 className=' bg-[#ffffff] text-xl p-5 text-[#5f30e2]  flex items-center justify-center'><i className="fas fa-check-circle"></i></h4>  
         </div> 

 
        <div className='px-5 col-span-2'>
         <h4 className=' text-lg p-4 text-[#ffffff]'>Unlimited Upload</h4>  
         </div>   
         <div className='px-5'>
         <h4 className=' bg-[#ffffff] text-xl p-5 text-[#5f30e2]  flex items-center justify-center'><i className="fas fa-check-circle"></i></h4>  
         </div>  
         <div className='px-5'>
         <h4 className='bg-[#5f30e2] text-xl p-5 text-[#fbd4c7]  flex items-center justify-center'><i className="fas fa-check-circle"></i></h4>  
         </div> 
         <div className='px-5'>
         <h4 className=' bg-[#ffffff] text-xl p-5 text-[#5f30e2]  flex items-center justify-center'><i className="fas fa-check-circle"></i></h4>  
         </div> 

 
        <div className='px-5 col-span-2'>
         <h4 className=' text-lg p-4 text-[#ffffff]'>Premium Support</h4>  
         </div>   
         <div className='px-5'>
         <h4 className=' bg-[#ffffff] text-xl p-5 text-[#5f30e2]  flex items-center justify-center'><i className="far fa-times-circle"></i></h4>  
         </div>  
         <div className='px-5'>
         <h4 className='bg-[#5f30e2] text-xl p-5 text-[#fbd4c7]  flex items-center justify-center'><i className="far fa-times-circle"></i></h4>  
         </div> 
         <div className='px-5'>
         <h4 className=' bg-[#ffffff] text-xl p-5 text-[#5f30e2]  flex items-center justify-center'><i className="fas fa-check-circle"></i></h4>  
         </div> 


         
        <div className='px-5 col-span-2'>
         <h4 className=' text-lg p-4 text-[#ffffff]'>API integration</h4>  
         </div>   
         <div className='px-5'>
         <h4 className=' bg-[#ffffff] text-xl p-5 text-[#5f30e2]  flex items-center justify-center'><i className="far fa-times-circle"></i></h4>  
         </div>  
         <div className='px-5'>
         <h4 className='bg-[#5f30e2] text-xl p-5 text-[#fbd4c7]  flex items-center justify-center'><i className="far fa-times-circle"></i></h4>  
         </div> 
         <div className='px-5'>
         <h4 className=' bg-[#ffffff] text-xl p-5 text-[#5f30e2]  flex items-center justify-center'><i className="fas fa-check-circle"></i></h4>  
         </div> 


         
        <div className='px-5 col-span-2'>
         <h4 className=' text-lg p-4 text-[#ffffff]'>AI powered predictive performance scoring</h4>  
         </div>   
         <div className='px-5'>
         <h4 className=' bg-[#ffffff] text-xl p-5 text-[#5f30e2]  flex items-center justify-center'><i className="far fa-times-circle"></i></h4>  
         </div>  
         <div className='px-5'>
         <h4 className='bg-[#5f30e2] text-xl p-5 text-[#fbd4c7]  flex items-center justify-center'><i className="far fa-times-circle"></i></h4>  
         </div> 
         <div className='px-5'>
         <h4 className=' bg-[#ffffff] text-xl p-5 text-[#5f30e2]  flex items-center justify-center'><i className="fas fa-check-circle"></i></h4>  
         </div> 


        
        <div className='px-5 col-span-2'>
         <h4 className=' text-lg p-4 text-[#ffffff]'>Leaderboard Ranking</h4>  
         </div>   
         <div className='px-5'>
         <h4 className='rounded-b-lg bg-[#ffffff] text-xl p-5 text-[#5f30e2]  flex items-center justify-center'><i className="far fa-times-circle"></i></h4>  
         </div>  
         <div className='px-5'>
         <h4 className='bg-[#5f30e2] text-xl p-5 text-[#fbd4c7]  flex items-center justify-center'><i className="far fa-times-circle"></i></h4>  
         </div> 
         <div className='px-5'>
         <h4 className='rounded-b-lg bg-[#ffffff] text-xl p-5 text-[#5f30e2]  flex items-center justify-center'><i className="fas fa-check-circle"></i></h4>  
         </div> 
 
 

        </div> 
        </div>  


      <Footer/>  
          
       </>
    )
   }

   const Progressing = () => {
    return (
            <>
            <i className="fad fa-spinner-third fa-spin"></i> Processing
            </>
    )
}

   export default Pricing; 