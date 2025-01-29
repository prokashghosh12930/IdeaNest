import {React , useState, useEffect} from 'react';
import {useNavigate, NavLink } from 'react-router-dom';
import SignupImg from '../../assets/images/signup.jpg';  
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'; 
import { useScript } from "../../hooks/useScript";
import jwt_decode from 'jwt-decode'; 

const Login = () => {
const navigate = useNavigate(); 
useEffect(()=> {
        const token = localStorage.getItem('token');
        if(token !== null)
        {
          navigate('/user'); 
        }
        
},[])  
const MySwal = withReactContent(Swal);
const [loading, setLoading] = useState(false);
const [data, setData] = useState({ 
     email:"",
     password:""
})  
const handleChange = (e) => {
       setData({...data, [e.target.name] : e.target.value}); 
}
const handleSubmit = (e) => {
e.preventDefault();
setLoading(true);
const sendData = { 
        email:data.email,
        password:data.password
       }
       axios.post('http://localhost/api/login.php',sendData).then((result)=>{ 
        if(result.data.message == 'success')
        {  
                window.localStorage.setItem('token', result.data.token);
                setData({name : "",email:"",password:""}) 
                const Toast = MySwal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', MySwal.stopTimer)
                          toast.addEventListener('mouseleave', MySwal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'success',
                        title: 'Signed in successfully'
                      }).then(function() {
                       navigate('/user'); 
                    });
                setLoading(false);
        }
        else
        {       MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: result.data.message
              })
                setLoading(false);
        }
       })



}

function handleCallbackResponse(res){
        const userObject = jwt_decode(res.credential);  
        const sendData = {
              image:userObject.picture,
              name:userObject.name,
              email:userObject.email
             }
                axios.post('http://localhost/api/oauth.php',sendData).then((result)=>{
                        window.localStorage.setItem('token', result.data.token);
                        navigate('/user'); 
                })
      } 

useScript("https://accounts.google.com/gsi/client", () => {
    window.google.accounts.id.initialize({
      client_id: "925771794516-c41uu1tbkianfjig93kqomqkbffpsbgg.apps.googleusercontent.com", 
      callback: handleCallbackResponse,
      auto_select: false,
    });

    window.google.accounts.id.renderButton(document.getElementById('googleBtn'), {
      size: "large",width:'400px',shape:'circle'
    }); 
});

 


    return (
       <>
        <div className='flex '>
            <div className='w-1/2 flex flex-col items-center justify-center h-screen'>
            <NavLink to="/">
                       
<svg height="38" width="38" version="1.1" id="Capa_1" viewBox="0 0 58.013 58.013">
    <path
      style={{ fill: "#BF4D90" }}
      d="M17.575,29.007c-1.247-0.43-2.42-1.13-3.411-2.121l-5.657-5.657c-0.344-0.344-0.644-0.714-0.92-1.097
      c0,0-0.001-0.001-0.001-0.001C3.303,20.815,0,24.539,0,29.007c0,4.95,4.05,9,9,9h8c4.95,0,9-4.05,9-9
      c0-0.435-0.042-0.859-0.102-1.278c-0.749,0.557-1.563,0.983-2.417,1.278C21.571,28.348,19.485,28.348,17.575,29.007z"
    />
    <path
      style={{ fill: "#ED8A19" }}
      d="M37.888,7.58c-0.69-4.277-4.411-7.574-8.875-7.574s-8.185,3.297-8.875,7.574
      c0.383,0.276,0.753,0.576,1.097,0.92l5.657,5.657c0.991,0.991,1.692,2.164,2.121,3.411c0.658,1.91,0.658,3.996,0,5.906
      c-0.296,0.858-0.724,1.677-1.285,2.429c0.421,0.061,0.848,0.104,1.285,0.104s0.864-0.042,1.285-0.104
      c0.929-0.135,1.811-0.411,2.627-0.809c1.816-0.885,3.291-2.36,4.176-4.176c0.578-1.186,0.912-2.51,0.912-3.912v-8
      C38.013,8.52,37.963,8.046,37.888,7.58z"
    />
    <path
      style={{ fill: "#7FABDA" }}
      d="M36.791,49.513l-5.657-5.657c-0.991-0.991-1.692-2.164-2.121-3.411c-0.658-1.91-0.658-3.996,0-5.906
      c0.296-0.858,0.724-1.677,1.285-2.429c-0.421-0.061-0.848-0.104-1.285-0.104s-0.864,0.042-1.285,0.104
      c-0.929,0.135-1.811,0.411-2.627,0.809c-1.816,0.885-3.291,2.36-4.176,4.176c-0.578,1.186-0.912,2.51-0.912,3.912v8
      c0,0.486,0.05,0.96,0.125,1.426c0.69,4.277,4.411,7.574,8.875,7.574s8.185-3.297,8.875-7.574
      C37.505,50.156,37.135,49.856,36.791,49.513z"
    /> 

<path style={{ fill:"#A4E869" }} d="M50.439,20.132c-0.276,0.383-0.576,0.753-0.92,1.097l-5.657,5.657
	c-0.991,0.991-2.164,1.691-3.411,2.121c-1.91,0.658-3.996,0.658-5.906,0c-0.858-0.296-1.677-0.724-2.429-1.285
	c-0.061,0.421-0.103,0.848-0.103,1.285c0,0.437,0.042,0.864,0.103,1.285c0.135,0.929,0.411,1.811,0.809,2.627
	c0.885,1.816,2.36,3.291,4.176,4.176c1.186,0.578,2.51,0.912,3.912,0.912h8c0.486,0,0.96-0.05,1.426-0.125
	c4.277-0.69,7.574-4.411,7.574-8.875S54.716,20.821,50.439,20.132z"/>
<path style= {{fill:"#EFCE4A"}}  d="M49.519,8.5C46.363,5.344,41.4,5.044,37.888,7.58c0.075,0.466,0.125,0.94,0.125,1.426v8
	c0,1.402-0.334,2.726-0.912,3.912c-0.885,1.816-2.36,3.291-4.176,4.176c-0.816,0.398-1.698,0.674-2.627,0.809
	c0.255,0.341,0.527,0.673,0.836,0.982s0.641,0.581,0.982,0.836c0.752,0.561,1.571,0.99,2.429,1.285c1.91,0.658,3.996,0.658,5.906,0
	c1.247-0.43,2.42-1.13,3.411-2.121l5.657-5.657c0.344-0.344,0.644-0.714,0.92-1.097C52.976,16.619,52.675,11.657,49.519,8.5z"/>
<path style= {{fill:"#61B872"}}  d="M50.439,37.882c-0.466,0.075-0.94,0.125-1.426,0.125h-8c-1.402,0-2.726-0.334-3.912-0.912
	c-1.816-0.885-3.291-2.36-4.176-4.176c-0.398-0.816-0.674-1.698-0.809-2.627c-0.341,0.255-0.673,0.527-0.982,0.836
	s-0.581,0.641-0.836,0.982c-0.561,0.752-0.99,1.571-1.285,2.429c-0.658,1.91-0.658,3.996,0,5.906c0.43,1.247,1.13,2.42,2.121,3.411
	l5.657,5.657c0.344,0.344,0.714,0.644,1.097,0.92c3.512,2.536,8.475,2.236,11.631-0.92S52.976,41.394,50.439,37.882z"/>
<path style= {{fill:"#ED7161"}}  d="M29.013,17.569c-0.43-1.247-1.13-2.42-2.121-3.411L21.235,8.5c-0.344-0.344-0.714-0.644-1.097-0.92
	C16.626,5.044,11.663,5.344,8.507,8.5c-3.156,3.156-3.456,8.117-0.921,11.629C8.048,20.056,8.518,20.007,9,20.007h8
	c4.515,0,8.271,3.373,8.898,7.722c0.004-0.003,0.008-0.005,0.012-0.008c0.341-0.255,0.673-0.527,0.982-0.836
	s0.581-0.641,0.836-0.982c0.561-0.752,0.99-1.571,1.285-2.429C29.671,21.564,29.671,19.478,29.013,17.569z"/>
<path style= {{fill:"#BF4D90"}}  d="M17,20.007H9c-0.482,0-0.952,0.049-1.414,0.123c0,0,0.001,0.001,0.001,0.002
	c0.276,0.383,0.576,0.753,0.92,1.097l5.657,5.657c0.991,0.991,2.164,1.691,3.411,2.121c1.91-0.658,3.996-0.658,5.906,0
	c0.854-0.294,1.668-0.721,2.417-1.278C25.271,23.38,21.515,20.007,17,20.007z"/>
<path style= {{fill:"#9777A8"}}  d="M26.892,31.128c-0.309-0.309-0.641-0.581-0.982-0.836c-0.752-0.561-1.571-0.99-2.429-1.285
	c-1.91-0.658-3.996-0.658-5.906,0c-1.247,0.43-2.42,1.13-3.411,2.121l-5.657,5.657c-0.344,0.344-0.644,0.714-0.92,1.097
	c-2.536,3.512-2.236,8.475,0.92,11.631s8.119,3.456,11.631,0.92c-0.075-0.466-0.125-0.94-0.125-1.426v-8
	c0-1.402,0.334-2.726,0.912-3.912c0.885-1.816,2.36-3.291,4.176-4.176c0.816-0.398,1.698-0.674,2.627-0.809
	C27.473,31.769,27.201,31.437,26.892,31.128z"/>
  </svg>
            </NavLink>
            <h1 className='text-3xl font-Emilys font-semibold mt-4'>Welcome To IdeaNest</h1>
            <form autoComplete='off' className='flex flex-col' onSubmit={handleSubmit}>
                     
                    <label className='mt-8 ml-2'>Email</label>
                    <input type='text' placeholder='Enter Email Address' className='w-[25rem] mt-2.5 bg-[#efefef] outline-none py-3 px-4 rounded-full font-Poppins 
                    text-sm' name='email' onChange={handleChange} value={data.email} />
 
                    <label className='mt-5 ml-2'>Password</label>
                    <input type='password' placeholder='Create Password' className='w-[25rem] mt-2.5 bg-[#efefef] outline-none py-3 px-4 rounded-full font-Poppins 
                    text-sm' name='password' onChange={handleChange} value={data.password} />

                    <button className='w-[25rem] mt-8 bg-[#e60022] text-white outline-none py-2.5 px-4 rounded-full font-Poppins 
                    text-md '>
                        {loading && <Progressing />}
                        {!loading && 'Login'} 
                    </button> 
                
            </form> 
            <h3 className='text-sm font-semibold mt-4'>OR</h3>
            

    
            <div id="googleBtn"  className='mt-5 flex'></div>  

                    <NavLink to="/signup">
                    <h4 className='text-sm mt-4'>Don't have an account ? <span className='cursor-pointer font-semibold'>Signup</span></h4>
                    </NavLink>
            </div>
  
            <div className='w-1/2 flex bg-[#e60022] items-center h-screen overflow-hidden'>
            <img src={SignupImg} className='relative -left-1/2 object-contain' />  
            </div>
        </div>
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
   export default Login;