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

function App() {
  const [sessionID, setSessionID] = useState()

  return (
      <div className="App">
      <SessionContext.Provider value={{sessionID, setSessionID}}>
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
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
      </SessionContext.Provider>
      </div>
  );
}

export default App;