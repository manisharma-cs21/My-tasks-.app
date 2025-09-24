import { useState } from 'react'
import '../style/addTask.css'
import { useNavigate,Link } from 'react-router-dom';
import { useEffect } from 'react';
export default function SignUp(){

    const [userData,setUserData]=useState()
    const navigate =useNavigate()

    useEffect(()=>{
        if(localStorage.getItem('login')){
            navigate('/')
        }
    })

    const handleSignUP=async()=>{
        let result= await fetch('https://tasks-backend-nk84.onrender.com/signup',{
            method:'Post',
            body:JSON.stringify(userData),
            headers:{
                'Content-Type':'application/json'
            }
        })
        result= await result.json();
        if(result.success){            // in starting we check result it means all details but at then the time of route protection we simply check res.success
                console.log(result); // like this
                document.cookie="token="+result.token
                localStorage.setItem('login',userData.email)
                window.dispatchEvent(new Event('localStorage-change'))
                navigate('/')     
        }
        else{
            alert('Try after some time')
        }

    }

    return(
        <div className="container">
            <h1>Sign UP</h1>
          
                <label htmlFor="">Name</label>
                <input onChange={(event)=>setUserData({...userData,name:event.target.value})}
                 type="text" name="name" placeholder="Enter username" />
                
                <label htmlFor="">Email</label>
                <input
                 onChange={(event)=>setUserData({...userData,email:event.target.value})}
                 type="text" name="email" placeholder="Enter email" />

                <label htmlFor="">Password</label>
                <input
                 onChange={(event)=>setUserData({...userData,password:event.target.value})}
                 type="text" name="password" placeholder="Enter password" />
                
                
                <button onClick={handleSignUP} className="submit">Sign Up</button>
                <Link className='link' to="/login">Login</Link>

           
        </div>
    )
}