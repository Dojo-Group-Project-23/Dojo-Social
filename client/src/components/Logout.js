import React, { useEffect, useState, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { SessionContext } from './Context/SessionContext'

export default function Logout() {
    const navigate = useNavigate()
    const { sessionID, setSessionID } = useContext(SessionContext)
    
    async function logUserOut() {
    window.sessionStorage.setItem('loggedInUser', undefined)
    console.log('loggin Out')
    setSessionID(undefined)
    await axios.get('http://localhost:8000/api/logout/')
    .then(res => console.log(res.data.msg))
    .catch(err => console.log(err.msg))
    navigate('/')
    }

    useEffect(() => {
        logUserOut()
    })    

    return (
        <div>Logging Out...</div>
    )
}
