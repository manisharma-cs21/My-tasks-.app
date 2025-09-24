import { useState } from 'react'
import './style/App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import AddTask from './components/AddTask'
import List from './components/List'
import UpdateTask from './components/UpdateTask'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Protected from './components/Protected'
import NotFound from './components/NotFound'


function App() {
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path='/' element={<Protected><List/></Protected>}/>
      <Route path='/add' element={<Protected><AddTask/></Protected>}/>
       <Route path='/update/:id' element={<UpdateTask/>}/>
       <Route path='/signup' element={<SignUp/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='*' element={<NotFound/>}/>
       
        </Routes>
    </>
  )
}

export default App
