import React, { useEffect, useState, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Navbar, NavDropdown } from 'react-bootstrap'
import { SessionContext } from './Context/SessionContext'
import axios from 'axios'

const NavigationBar = () => {
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
        <Navbar>
            <Container>
                <Navbar.Brand href="#">
                    <img
                    alt=""
                    src="https://trade-journal-363.s3.amazonaws.com/Dojo_Social_Icon.png" // img by GND
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    />{' '}
                    Learn Dojo
                </Navbar.Brand>


                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">

                {loggedUser?._id != undefined ? 
                [
                <NavDropdown key='4' title={'Logged in as: ' + loggedUser?.username } id="navbarScrollingDropdown">
                    <NavDropdown.Item key='1' href={'/update/' + loggedUser?._id}>
                        Edit
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item key='3' href="/logout">
                        Logout
                    </NavDropdown.Item>
                </NavDropdown>
                ]
                :
                [
                <NavDropdown key='8' title='Login' id="navbarScrollingDropdown">
                    <NavDropdown.Item key='10' href="/login">
                        Login
                    </NavDropdown.Item>
                    <NavDropdown.Item key='11' href="/register">
                        Register
                    </NavDropdown.Item>
                </NavDropdown>
                ]
            }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar