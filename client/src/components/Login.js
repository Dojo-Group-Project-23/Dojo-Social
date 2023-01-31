import React, { useRef, useState, useEffect, useContext } from "react"
import './css/Login.css'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { SessionContext } from './Context/SessionContext'

const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/

const Login = () => {
    const navigate = useNavigate()
    const { sessionID, setSessionID } = useContext(SessionContext)

    const firstRunOver = useRef(false)

    const emailRef = useRef()
    const passwordRef = useRef()

    const [email, setEmail] = useState('')
    const [emailValid, setEmailValid] = useState(false)

    const [password, setPassword] = useState('')
    const [passwordValid, setPasswordValid] = useState(false)

    const [backendMsg, setBackendMsg] = useState('')

    // useEffect (() => {
    //     emailRef.current.focus(); 
    // }, [])

    useEffect(() => {
        if(firstRunOver.current === true) {
        console.log('sessionID')
        console.log(sessionID)
        console.log('is it undefined')
        console.log(sessionID != undefined ? "nope" : "yup")
        if(sessionID != undefined) {navigate('/dashboard')}
        }        
        return () => { 
            console.log('unmounted1')
            firstRunOver.current = true
        }
    }, [])

    useEffect (() => {
        if(firstRunOver) {
        const result = EMAIL_REGEX.test(email)
        setEmailValid(result)
        }
    }, [email])

    useEffect (() => {
        if(firstRunOver) {
        const result = PASSWORD_REGEX.test(password)
        setPasswordValid(result)
        }
    }, [password])

    const printConsole = () => {
        const data = {
            value: {
                email,
                password
            },
            valid: {
                emailValid,
                passwordValid
            }
        }
        console.log(data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const user = {email:email, password:password}
            axios.post('http://localhost:8000/api/login', user)
            .then(response => {
                if(response.data.msg === 'success') {
                    console.log('success')
                    console.log(response.data.user)
                    try{
                        setSessionID(response.data.user._id)
                    }catch{
                        console.log(response.data.user._id)
                    }
                    navigate('/dashboard')
                }
                else{
                    console.log('backend custom error')
                    console.log('response.data.msg')
                    setBackendMsg(response.data.msg)
                }
            })
            .catch(error => {
                console.log('axios catch error')
                    setBackendMsg(error.message)
            })
        }
        catch (err) { 
            printConsole('try catch error')
            setBackendMsg(err.message)
        }
    }

    return (
        <section className="formContainer">
        <p>{ backendMsg ? backendMsg : "" }</p>
        <h1>Login<span><p>{ backendMsg ? "  " + backendMsg : "" }</p></span></h1>
        <Form onSubmit={handleSubmit}>
            <Form.Label htmlFor='emailForm'>Email:
            <span className={emailValid ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={emailValid || !email ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
            </span>
            </Form.Label>
            <Form.Control
                type='text'
                id='emailForm'
                ref={emailRef}
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={emailValid ? "false" : "true"}
                aria-describedby="emailErrorMsg"
            />
            <p id="emailErrorMsg" className={!emailValid && email ? "instructions show" : "instructions hide"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Must be a valid email format
            </p> 

            <Form.Label htmlFor='passwordForm'>Password:
            <span className={passwordValid ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={passwordValid || !password ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
            </span>
            </Form.Label>
            <Form.Control
                type='password'
                id='passwordForm'
                ref={passwordRef}
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-invalid={passwordValid ? "false" : "true"}
                aria-describedby="passwordErrorMsg"
            />
            <p id="passwordErrorMsg" className={!passwordValid && password ? "instructions show" : "instructions hide"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Minimum eight characters, at least one uppercase letter, one lowercase, one number and one special character
            </p> 

            <Button type="submit" className={'loginButton mb-5'} disabled={!emailValid || !passwordValid ? true : false}>Login</Button>
        </Form>
        <span>Don't have an account?</span><Button type="button" href="/register" variant="link">Register</Button>
        
    </section>
    )
}

export default Login