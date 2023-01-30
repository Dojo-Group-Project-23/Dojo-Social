import React, { useEffect, useState, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { SessionContext } from './Context/SessionContext'
import { Button } from 'react-bootstrap'

const Dashboard = () => {
    const navigate = useNavigate()
    const { sessionID, setSessionID } = useContext(SessionContext)
    const [loggedUser, setLoggedUser] = useState({name:''})

    const firstRunOver = useRef(false)

    useEffect(() => {
        if(firstRunOver.current === true) {
            const getLoggedUser = async () => {
                console.log("ok")
                console.log(sessionID)
                //if(!sessionID) {navigate('/login')}
                try{
                await axios.get(`http://localhost:8000/api/users/${sessionID}`)
                .then(response => {
                    console.log(response.data)
                    setLoggedUser(response.data)
                })
                .catch(error => {
                    console.log('axios catch')
                    console.log(error)
                    //navigate('/login')
                })
                } catch (err) {
                    console.log('try catch error')
                    console.log(err)
                }
            }

            getLoggedUser()
        }
        return () => {
            console.log('unmounted2')
            firstRunOver.current = true
        }
    }, [])

    return (
        <div>
            Dashboard - {loggedUser?.firstName ? loggedUser.lastName : "loading..."}
            <Button variant="link" onClick={() => navigate('/debugUsers')}>Debug</Button>
        </div>
    )
}

export default Dashboard