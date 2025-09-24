import { useState } from 'react'
import '../style/addTask.css'
import { useNavigate,Link } from 'react-router-dom';
import { useEffect } from 'react';
export default function Login(){

    const [userData,setUserData]=useState()
    const navigate=useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('login')){
          navigate('/')    
        }
    })

    const handleLogin=async()=>{
        let result= await fetch('https://tasks-backend-nk84.onrender.com/login',{
            method:'Post',
            body:JSON.stringify(userData),
            headers:{
                'Content-Type':'Application/Json'
            }
        })
        result= await result.json();
            if(result.success){
                document.cookie="token="+result.token
                localStorage.setItem('login',userData.email)
                window.dispatchEvent(new Event('localStorage-change'))

                navigate('/')
            }
            else{
                alert('USER INFORMATION MISMATCH !TRY')
            }

    }
    

    return(
        <div className="container">
            <h1>Login</h1>
                
                <label htmlFor="">Email</label>
                <input
                 onChange={(event)=>setUserData({...userData,email:event.target.value})}
                 type="text" name="email" placeholder="Enter email" />

                <label htmlFor="">Password</label>
                <input
                 onChange={(event)=>setUserData({...userData,password:event.target.value})}
                 type="password" name="password" placeholder="Enter password" />
                
                
                <button onClick={handleLogin} className="submit">Login</button>
                <Link className='link' to="/signup">Create Account</Link>
           
        </div>
    )
}