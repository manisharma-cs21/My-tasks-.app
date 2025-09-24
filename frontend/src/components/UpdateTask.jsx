import { useEffect, useState } from 'react'
import '../style/addTask.css'
import { useNavigate, useParams } from 'react-router-dom';
export default function UpdateTask(){
    const navigate=useNavigate()
    const [taskData,setTaskData]=useState({
        title:"",
        description:""
    });
    const {id}=useParams()    // I use this for getting id from input 
    


    useEffect(()=>{    // we use this function like when we open page then this state will occur
        getTask(id);
    },[])

    const getTask= async (id)=>{
        let task=await fetch(`https://tasks-backend-nk84.onrender.com/task/`+id)
        task= await task.json();
        if(task.result){
            setTaskData(task.result)
        }

    }

    //for updating 
    const updateTask= async()=>{
        console.log("function is called",taskData);
        let task= await fetch("http://localhost:3200/update-task",{
            method:'put',
            body:JSON.stringify(taskData),
            headers:{
                'Content-type':'Application/json'
            }
        })
        task=await task.json();
        if(task){
            navigate('/')
        }else{
      alert('Try After Some time')
    }
        
    }

    return(
        <div className="container">
            <h1>Update Task</h1>
          
                <label htmlFor="">Title</label>
                <input value={taskData?.title} onChange={(event)=>setTaskData({...taskData,title:event.target.value})} type="text" name="title" placeholder="Enter task title" />
                <label  htmlFor="">Description</label>
                <textarea value={taskData?.description} onChange={(event)=>setTaskData({...taskData,description:event.target.value})} rows={4} name="description" placeholder="Enter task Description" id=""></textarea>
                <button onClick={updateTask} className="submit">Update Task</button>
           
        </div>
    )
}
