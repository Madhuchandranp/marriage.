import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { mycontext } from './Relatives/Context';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Rhome from './Relatives/Rhome';
import FileUploadForm from './Relatives/fileUploadForm';
import Rnavbar from './Relatives/Rnavbar';
import Rsignup from './Relatives/Rsignup';
import Rlogin from './Relatives/Rlogin';
import CommentForm from './Relatives/CommentForm';


import Shome from './Self/Shome';
import Slogin from './Self/Slogin';
import Snavbar from './Self/Snavbar';
import Ssighnup from './Self/Ssignup';
import Spanel from './Self/Spanel';

import Flogin from './Friends/Flogin';
import Fsignup from './Friends/Fsignup';
import Mailsend from './Relatives/Mailsend';


function App() {

  const authToken=localStorage.getItem('authToken');

  const [photos, setPhotos] = useState([])
  const [image, setImage] = useState([])
  const [selectedFile, setSelectedFile] = useState(null);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [message, setMessage] = useState(false);
  const [text, setText] = useState('');
  const [comments, setComments] = useState([]);
  const [data, setData] = useState([]);
  const [loguser,setLoguser]=useState(null)
  const [ imge, setimge ] = useState();

  
  const values = {
    message, setMessage, 
    photos, setPhotos,
    name,setName,
    email, setEmail,
    image, setImage,
    password, setPassword,
    selectedFile, setSelectedFile,
    text, setText,
    comments, setComments,
    data,setData,
    loguser,setLoguser,
    imge, setimge,
  }

  return (
    <div className="App">
      <BrowserRouter>
        <mycontext.Provider value={values}>
          <Routes>

            <Route path="/Rhome" element={<Rhome />} />
            <Route path='/FileUploadForm' element={<FileUploadForm />} />
            <Route path='/Rsignup' element={<Rsignup/>}/>
            <Route path='/CommentForm' element={<CommentForm/>}/>
            <Route path='/' element={<Rlogin/>}/>
            <Route path='/Rnavbar' element={<Rnavbar />} />
            <Route path='/Mailsend' element={<Mailsend />} />
            
            <Route path='/Shome' element={<Shome />} />
            <Route path='/Slogin' element={<Slogin/>}/>
            <Route path='/Ssignup' element={<Ssighnup/>}/>
            <Route path='/Snavbar' element={<Snavbar/>}/>
            <Route path='/Spanel' element={<Spanel/>}/>


            <Route path='/Flogin' element={<Flogin/>}/>
            <Route path='/Fsignup' element={<Fsignup/>}/>


           
           </Routes>
        </mycontext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
