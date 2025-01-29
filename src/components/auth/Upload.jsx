import React, {useEffect, useState, useMemo} from 'react';
import {useDropzone} from 'react-dropzone';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'; 
import axios from 'axios';   
import "../../pintura/pintura.css";
import { openDefaultEditor } from "../../pintura/pintura";
import {useNavigate } from 'react-router-dom';  

const locationIqKey = process.env.REACT_APP_LOCATIONIQ_API_KEY;

 const Upload = () => {
 const navigate = useNavigate();  
 const [auth, setAuth] = useState('');
 const [files, setFiles] = useState([]); 
 const [input, setInput] = useState('');
 const [tags, setTags] = useState([]);
 const [isKeyReleased, setIsKeyReleased] = useState(false); 
 const [desc, setDesc] = useState('');
 const [address, setAddress] = useState("");
 const [suggestions, setsuggestions] = useState([]);
 const [sgstate, setSgstate] = useState(false);
 const [latitude, setLatitude] = useState("");
 const [longitude, setLongitude] = useState("");
 const [city, setCity] = useState("");
 const [country, setCountry] = useState("");
 const [fetchloc, setFetchloc] = useState(false);
 const MySwal = withReactContent(Swal);

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
      axios.post('http://localhost/api/user.php',null,config).then((result)=>{
       if(result.data.message == 'success'){
            setAuth(result.data.id); 
           
           }  
           else{
             localStorage.removeItem("token");
             navigate('/login'); 
         
           }
      });
    }
   },[])


  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#ddd', 
    borderStyle: 'dashed', 
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    fontFamily:'Poppins',
    cursor:'pointer'
  };
  
  const focusedStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };
 
 const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 0
  };
  
  const thumb = {
    display: 'inline-flex',
    marginTop: 40,
    marginBottom: 0,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 2,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    position:'relative',
    minWidth: 0,
  };
  
  const thumbButton = {
   position: "absolute",
   right:4,
   bottom: 5,
   color:'#ffffff',
   background:'#262626',
   borderRadius:'24px',
   fontSize:'12px',
   width:'50px'
 
 };
 
 const editImage = (event, image, done) => {
   event.stopPropagation();
   const imageFile = image.pintura ? image.pintura.file : image;
   const imageState = image.pintura ? image.pintura.data : {};
 
   const editor = openDefaultEditor({
     src: imageFile,
     imageState
   });
 
   
 
   editor.on("process", ({ dest, imageState }) => {
     Object.assign(dest, {
       pintura: { file: imageFile, data: imageState }
     });
     done(dest);
   });
 };
 

 
 
  

   const position = async (e) => {
    setFetchloc(true);
    e.preventDefault();
    e.stopPropagation();
    await navigator.geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude); 
        axios.post('https://us1.locationiq.com/v1/reverse?key='+locationIqKey+'&lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&format=json').then((result)=>{
          setFetchloc(false);
          setAddress(result.data.display_name);
          setCity(result.data.address.city);
          setCountry(result.data.address.country); 
      }); 
    }, 
      err => console.log(err)
    );
   }

   const handleChange = (e) =>  { setAddress(e.target.value); }

   const handleSuggesstion = (e) => {
    let value = e.target.value;
     if(value.length > 2 && value !== '')
     {
      setSgstate(true);
      axios.post('https://us1.locationiq.com/v1/search?key='+locationIqKey+'&q={'+value+'}&format=json').then((result)=>{
       setsuggestions(result.data);
        
      }); 
    }
    else
    {
      setSgstate(false);
    }
   }

   const getLatLong = data => () => {
    setSgstate(false);
    axios.post('https://us1.locationiq.com/v1/reverse?key='+locationIqKey+'&lat='+data.lat+'&lon='+data.lon+'&format=json').then((result)=>{ 
      setAddress(data.display_name); 
      setLatitude(data.lat);
      setLongitude(data.lon);  
      setCity(result.data.address.city);
      setCountry(result.data.address.country); 
  }); 
   }

   const listSgsn = suggestions.map(suggestions => (
    <li onClick={getLatLong(suggestions)} key={suggestions.place_id} className='p-3 border-b last:border-b-0 border-gray-300 cursor-pointer'><i className="fad fa-dot-circle text-gray-400"></i> <span className='inline-block ml-1'>{suggestions.display_name}</span></li> 
   ));

    const {
      getRootProps,
      getInputProps,
      isFocused,
      isDragAccept,
      isDragReject
    } = useDropzone({
     accept: {
       'image/*': ['.jpeg','.jpg','.png']
     },
     onDrop: acceptedFiles => {
       setFiles(acceptedFiles.map(file => Object.assign(file, {
         preview: URL.createObjectURL(file)
       })));
     }
   }); 

   const style = useMemo(() => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }), [
      isFocused,
      isDragAccept,
      isDragReject,
      
    ]); 

    const removeFile = file => (e) => {
      e.stopPropagation();
      
      const newFiles = [...files]
      newFiles.splice(newFiles.indexOf(file), 1)
      setFiles(newFiles)
    }
    
   const thumbs = files.map((file,index) => (
     <div style={thumb} key={file.name}>
       <div style={thumbInner}>
       <button onClick={removeFile(file)} className='absolute -right-2 -top-2 h-5 w-5 flex items-center justify-center rounded-full  bg-red-600'><i className="fal fa-times text-white "></i></button>
         <img
           src={file.preview} 
           className='rounded-xl w-full h-full object-cover' 
           onLoad={() => { URL.revokeObjectURL(file.preview) }}
         />
         <button
        style={thumbButton} className='shadow-lg'
        onClick={(event) =>
          editImage(event, file, (output) => {
            const updatedFiles = [...files]; 
            updatedFiles[index] = output; 
            if (file.preview) URL.revokeObjectURL(file.preview); 
            Object.assign(output, {
              preview: URL.createObjectURL(output)
            }); 
            setFiles(updatedFiles);
          })
          
        }
      >
        Edit
      </button>
        
       </div>
     </div>
   ));

  
   useEffect(() => { 
     return () => files.forEach(file => URL.revokeObjectURL(file.preview));
   }, [files]);

  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();
  
    if (key === 'Enter' && trimmedInput.length  && !tags.includes(trimmedInput)) {
      e.preventDefault();    
      e.stopPropagation();    
      setTags(prevState => [...prevState, trimmedInput]);
      setInput('');
    }
  
    if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setTags(tagsCopy);
      setInput(poppedTag);
    }
  
    setIsKeyReleased(false);
  };
  
  const onKeyUp = () => {setIsKeyReleased(true);}
  
  const deleteTag = (index) => {
    setTags(prevState => prevState.filter((tag, i) => i !== index))
  }
  
  const handleTextarea = (e) => {
    setDesc(e.target.value);
   }

   const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    
    files.forEach(file=>{
    formData.append('images[]', file); 
    });
    tags.forEach(tag=>{
      formData.append('tag[]', tag); 
      });
    formData.append('userid', auth); 
    formData.append('description', desc); 
    formData.append('address', address); 
    formData.append('latitude', latitude); 
    formData.append('longitude', longitude); 
    formData.append('city', city); 
    formData.append('country', country); 
     
  
    
     axios.post('http://localhost/api/upload.php',formData).then((result)=>{
      console.log(result);
      if(result.data.message == 'success'){
        MySwal.fire({
          icon: 'success',
          title: 'Yay',
          text: 'Successfully Uploaded'
        }) 
        setFiles([]);
        setTags([]);
        setDesc("");
        setAddress("");
        setLatitude("");
        setLongitude("");
      }
     }); 
   }


 

   return (
    <div className='w-full flex justify-center'>
      <div className='w-9/12 pr-24 pl-24'>
        <h1 className='text-3xl mt-16 font-semibold'><i className="fad fa-stars text-gray-400"></i>  
        <span className="text-gray-400 inline-block ml-1">Start Sharing!</span> 
        </h1>
        <form onSubmit={handleSubmit} className='mt-12'>
      <section className="container">
       <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p><i className="fal fa-photo-video"></i> Drag 'n' drop some files here, or click to select files</p> 
        <aside style={thumbsContainer}>
        {thumbs}
      </aside>
      </div> 
    </section>
 
    <label className='mt-6 text-lg font-semibold block '><i className="far fa-tags"></i> Tags</label>
    <div className="flex mt-2.5 border border-gray-300 w-full pl-4 p-1 rounded-lg overflow-x-scroll custom-scrollbar h-auto">
     
    {tags.map((tag, index) => (
  <div className="flex items-center m-2 pl-4 pr-2  text-xs rounded-3xl bg-gray-100"  key={Math.random()}>
    {tag}
    <button className='ml-2 bg-gray-200 rounded-full h-6 w-6' onClick={() => deleteTag(index)}><i className="fal fa-times"></i></button>
  </div>
))}
  <input 
     className='w-full min-w-[50%] border-none p-4 pl-4 focus:outline-none'
      value={input}
      placeholder="Enter Tags"
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onChange={onChange}
  />
</div>
 
    <div className='mt-6 mb-4'>
      <label className='mt-3 mb-2.5 text-lg font-semibold block'><i className="far fa-scroll-old"></i> Description</label>
      <textarea className='w-full resize-none border border-gray-300 focus:outline-none p-4 rounded-lg' rows='3' placeholder='Tell us about your clicks' value={desc} onChange={handleTextarea}></textarea>
    </div> 

    <div className='mt-6 mb-4'>
      <label className='mt-3 mb-2.5 text-lg font-semibold block'><i className="far fa-map-marker-alt"></i> Location</label>
      <input type="text" className='w-full border border-gray-300 focus:outline-none p-4 rounded-lg' value={address} onKeyDown={handleSuggesstion} onChange={handleChange} placeholder="Enter Location" /> 
      {sgstate &&  <ul className='w-full mt-2 shadow-md  bg-white p-4  max-h-64 overflow-y-scroll'>
       {listSgsn}
     </ul> }
     <button className='mt-5  text-blue-500 shadow-md rounded-3xl px-6 py-2.5 font-Poppins text-sm' onClick={position} disabled={fetchloc}>
     {fetchloc && <span><i className="fas fa-sync-alt fa-spin"></i> Getting Current Location</span>}
      {!fetchloc && <span><i className="fad fa-location"></i> Use Current Location</span>}
      </button> 
     </div> 

    <button className='float-right px-6 py-2 rounded-3xl bg-[#1a8917] hover:bg-[#0f730d] text-white'>Submit</button>
    </form>
    </div>
    </div>

   );
}

 

export default Upload;