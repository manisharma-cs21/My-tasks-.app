import { Fragment, useEffect, useState } from "react";
import '../style/list.css'
import { Link } from "react-router-dom";

export default function List() {

// All Effects
  const [taskData, setTaskData] = useState();
  const [selectedTask,setSelectedTask]=useState([]);

  useEffect(() => { // We use this for effecting 
    getListData();
  }, []);

  // For getting Task
  const getListData = async () => {
    let list = await fetch("http://localhost:3200/tasks",{
      credentials:'include'
    });
    list = await list.json();
    if (list.success) {
      setTaskData(list.result);
    }else{
      alert('Try After Some time')
    }
  }

  // For Deleting Task 
  const deleteTask=async(id)=>{
    let item = await fetch("http://localhost:3200/delete/"+id,{method:'delete',credentials:'include',});
    item = await item.json();
    if (item.success) {
        getListData();
    }else{
      alert('Try After Some time')
    }

  }
  // for select all function
  const SelectedAll=(event)=>{
    console.log(event.target.checked);
    if(event.target.checked){
        let items=taskData.map((item)=>item._id)
        setSelectedTask(items)
    }
    else{
        setSelectedTask([])
    }

  }
  // Sigle item
  const selectSingleItem=(id)=>{
    console.log(id);
    if(selectedTask.includes(id)){
        let items =selectedTask.filter((item)=>item!=id)
        setSelectedTask(items)
    }
    else{
        setSelectedTask([id,...selectedTask])
    }
    
  }

  // For Deleting multiple
  const deleteMultiple= async ()=>{
    console.log(selectedTask);

    let item = await fetch("http://localhost:3200/delete-multiple/",
        {
            credentials:'include',
            method:'delete',
            body:JSON.stringify(selectedTask),
            headers:{
                'Content-type':'Application/Json'           }
        });
    item = await item.json();
    if (item.success) {
        getListData();
    }else{
      alert('Try After Some time')
    }
    
  }
  
  

  return (
    <div className="list-container">
      <h1>List Page </h1>
      <button onClick={deleteMultiple} className="delete-item delete-multiple">Delete</button>
      <ul className="task-list">
         <li className="list-header"><input onChange={SelectedAll} type="checkbox" /></li>
        <li className="list-header">S.No</li>
        <li className="list-header" >Title</li>
        <li className="list-header">Description</li>
        <li className="list-header">Action</li>
        

        {
            // for geeting data using map loop in this we will get two input item and their index
        taskData && taskData.map((item, index) => (
            <Fragment key={item._id}>
             <li className="list-item"><input onChange={()=>selectSingleItem(item._id)} checked={selectedTask.includes(item._id)} type="checkbox" /></li>
              <li className="list-item">{index+1}</li>
              <li className="list-item">{item.title}</li>
              <li className="list-item">{item.description}</li>

  {/* if i want to dalete and update than i have to make a function for deleting task
  and on this function i call delete api convert into json format and than  */}

               <li className="list-item"><button onClick={()=>deleteTask(item._id)} className="delete-item">Delete</button>
               <Link  to={"update/"+item._id} className="update-item">Update</Link></li>
            </Fragment>
            ))
            }
      </ul>
    </div>
  );
}
