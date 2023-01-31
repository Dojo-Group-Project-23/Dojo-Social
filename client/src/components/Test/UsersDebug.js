import { Table, Button } from 'react-bootstrap';
import React, { useEffect, useState, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { SessionContext } from '../Context/SessionContext'

const UsersDebug = () => {
    const navigate = useNavigate()
    const { sessionID, setSessionID } = useContext(SessionContext)
    const [loggedUser, setLoggedUser] = useState({name:''})
    const [ users, setUsers ] = useState([{}])

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

            const getUsers = async () => {
                try{
                    await axios.get(`http://localhost:8000/api/users`)
                    .then(response => {
                        console.log(response.data)
                        setUsers(response.data)
                    })
                    .catch(error => {
                        console.log('axios getall catch')
                        console.log(error)
                    })
                } catch (err) {
                    console.log('try catch getall error')
                    console.log(err)
                }
            }
            getUsers()
        }
        return () => {
            console.log('unmounted2')
            firstRunOver.current = true
        }
    }, [])

    const userList = users.map((item) => {
        return [
        <tr key={item._id}>
            <td>{item._id}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.username}</td>
            <td>{item.email}</td>
            <td>{item.imgURL}</td>
            <td>{<Button variant="link" onClick={() => navigate(`/update/${item._id}`)}>Update</Button>}</td>
            <td>{<Button variant="link" onClick={() => navigate(`/delete/${item._id}`)}>Delete</Button>}</td>
        </tr>
        ]
    })
    
    return (
        <div>
            <h1>UsersDebug</h1>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>imgURL</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {userList}
                </tbody>
            </Table>
        </div>
    )
}

export default UsersDebug