import './App.css';
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import LandingPage from './components/LandingPage'
import UsersDebug from './components/Test/UsersDebug';
import Login from './components/Login'
import Register  from './components/Register'
import DeleteUser from './components/DeleteUser'
import UpdateUser from './components/UpdateUser';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer'

import { SessionContext } from './components/Context/SessionContext'
import PostEditForm from './components/posts/PostEditForm';

function App() {
  const [sessionID, setSessionID] = useState()
  const [sessionUserName, setSessionUserName] = useState()

  return (
      <div className="App">
      <SessionContext.Provider value={{sessionID, setSessionID,sessionUserName, setSessionUserName}}>
        <BrowserRouter>
          <NavigationBar></NavigationBar>
          <Routes>
            <Route path='/landing' default element={<LandingPage/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/upate/:id' element={<UpdateUser/>} />
            <Route path='/delete/:id' element={<DeleteUser/>} />
            <Route path='/debugUsers' element={<UsersDebug/>} />
            <Route path='/posts/:id/edit' element={<PostEditForm/>} />
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
      </SessionContext.Provider>
      </div>
  );
}

export default App;