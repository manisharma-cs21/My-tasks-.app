import { useState } from 'react'
import '../style/addTask.css'
import { useNavigate ,Link} from 'react-router-dom';
export default function AddTask(){
    const navigate=useNavigate()
    const [taskData,setTaskData]=useState();
    const handleAddTask= async()=>{
        console.log(taskData);
        let result= await fetch('https://tasks-backend-nk84.onrender.com/add-task',{
            credentials:'include',
            method:'Post',
            body:JSON.stringify(taskData),
            headers:{
                'Content-Type':'Application/Json'
            }
        })
        result= await result.json();
        if(result){
            navigate('/')
            console.log("New Task Added");
            
        }

        
    }

    return(
        
        <div className="container">
            <nav className='nav'>
                <Link to="/">Back</Link>
                </nav>
            <h1>Add New Task</h1>
          
                <label htmlFor="">Title</label>
                <input onChange={(event)=>setTaskData({...taskData,title:event.target.value})} type="text" name="title" placeholder="Enter task title" />
                <label htmlFor="">Description</label>
                <textarea onChange={(event)=>setTaskData({...taskData,description:event.target.value})} rows={4} name="description" placeholder="Enter task Description" id=""></textarea>
                <button onClick={handleAddTask} className="submit">Add New Task</button>
           
        </div>
    )
}