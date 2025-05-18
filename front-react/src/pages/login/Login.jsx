import React, { useEffect } from 'react'
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person'; 
import {addUser, loginUser} from './LoginFunctions'
import './Login.css';
export default function Login() {
const[action, setAction] = React.useState("Sign Up");
const [userData, setUserData] = React.useState({
    username: "",
    email: "",
    password: "",    
});
const signUp = async (userData) =>{
    setAction("Sign Up");
    try{
    const response = await addUser (userData)
    console.log(response)
    }catch(err){
        console.error(err)
    }
}
const logIn = async (userData) => {
    setAction("Login")
    try{
        const response = await loginUser(userData)
        console.log(response)
    }catch(err){
        console.error(err)
    }
}
const change = (e) => {
    setUserData({...userData, [e.target.name]:e.target.value})
}
useEffect(()=>{
    document.body.className = "login-page";
    return ()=>{
        document.body.className = "";
    };
  }
);
  return (
    <div className='container'>
        <div className='header'> 
            <div className='text'>{action}</div>
            <div className= 'underline'> </div>
            </div>
            <div className ='inputs'>
            {action==="Login"?<div></div>:<div className='input'>
                <div className='icon'>
                <PersonIcon/>
                </div>
                <input type='text' placeholder='Username' name = "username" value ={userData.username} onChange={change}/>
            </div>}    
            
            <div className='input'>
                <div className='icon'>
                <EmailIcon/>
                </div>
                <input type='email' placeholder='Email' name = "email" value ={userData.email} onChange ={change} />
            </div>
            <div className='input'>
                <div className='icon'>
                <LockIcon/>
                </div>
                <input type='password' placeholder='Password' name = "password" value = {userData.password} onChange={change} />
        </div>  
        {action==="Sign Up"?<div></div>: <div className='forgot-password'><span>Forgot your Password?</span></div>}
        <div className='submit-container'>
            <div className={action==="Login"?"submit gray":"submit"} onClick={()=>signUp(userData)}>
                Sign Up</div>
            <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>logIn(userData)}>Login</div>
            
        </div>
    </div>
</div>
  )
}
