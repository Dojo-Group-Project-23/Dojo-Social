import React, { useRef, useState, useContext, useEffect } from "react"
import './css/Login.css'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import {Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { SessionContext } from './Context/SessionContext'

const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
const IMAGE_REGEX = /[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/

const UpdateUser = () => {
    const navigate = useNavigate()    
    const [loggedUser, setLoggedUser] = useState({name:''})

    const firstRunOver = useRef(false)
    const { sessionID, setSessionID } = useContext(SessionContext) 

    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const usernameRef = useRef()
    const imgURLRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmRef = useRef()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [imgURL, setImgURL] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')

    const [firstNameValid, setFirstNameValid] = useState(false)
    const [lastNameValid, setLastNameValid] = useState(false)
    const [usernameValid, setUsernameValid] = useState(false)
    const [imgURLValid, setImgURLValid] = useState(false)
    const [emailValid, setEmailValid] = useState(false)
    const [passwordValid, setPasswordValid] = useState(false)
    const [confirmValid, setConfirmValid] = useState(false)

    const [backendMsg, setBackendMsg] = useState('')

    useEffect (() => {
        emailRef.current.focus(); 
    }, [])

    useEffect(() => {
        //if(sessionID) {navigate('/dashboard')}
    }, [])

    useEffect(() => {
        if(firstName)
        setFirstNameValid(true) 
        else
        setFirstNameValid(false)
        if(lastName)
        setLastNameValid(true)
        else
        setLastNameValid(false)
        if(username.length > 2)
        setUsernameValid(true)
        else
        setUsernameValid(false)
        if(!imgURL || IMAGE_REGEX.test(imgURL))
        setImgURLValid(true)
        else
        setImgURLValid(true)
        printConsole()
    },[firstName, lastName, username, imgURL])

    const printConsole = () => {
        const data = {
            value: {
                firstName,
                lastName,
                username,
                imgURL,
                email,
                password,
                confirm
            },
            valid: {
                firstNameValid,
                lastNameValid,
                usernameValid,
                imgURLValid,
                emailValid,
                passwordValid,
                confirmValid
            }
        }
        console.log(data)
    }

    useEffect(() => {
        if(firstRunOver.current === true) {
            const getLoggedUser = async () => {
                setSessionID(window.sessionStorage.getItem('loggedInUser'))
                console.log("dashboard")
                console.log(sessionID)
                if(!sessionID) //{navigate('/login')} // Un-commented By GND
                try{
                await axios.get(`http://localhost:8000/api/users/${sessionID}`,{withCredentials:true})
                .then(response => {
                    console.log("axios response")
                    console.log(response.data)
                    setLoggedUser(response.data)
                    console.log("loged in") 
                    console.log(response.data.firstName)
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

    useEffect (() => {
        const result = EMAIL_REGEX.test(email)
        setEmailValid(result)
    }, [email])

    useEffect (() => {
        const result = PASSWORD_REGEX.test(password)
        setPasswordValid(result)
        const match = password === confirm
        setConfirmValid(match)
    }, [password, confirm])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const user = {
                firstName: firstName, 
                lastName: lastName, 
                email: email, 
                imgURL: imgURL, 
                password: password,
                confirmPassword: confirm
            }
            console.log('newUser')
            console.log(user)
            if(EMAIL_REGEX.test(email) && PASSWORD_REGEX.test(password)){ //someone who knows javascript could enable the button so i'm not assuming there all valid and checking again
                axios.put('http://localhost:8000/api/users/' + loggedUser._id, user)
                .then(response => {
                    if(response.data.msg === 'success') {
                        console.log('success')
                        console.log(response.data.user)
                        setSessionID(response.data.user._id)
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
        }
        catch (err) { 
            printConsole('try catch error')
            setBackendMsg(err.message)
        }
    }

    return (
        <section className="formContainer">
            <p>{ backendMsg ? backendMsg : "" }</p>
            <h1>Edit User</h1>
            <Form onSubmit={handleSubmit}>

            <Form.Label htmlFor='firstName'>First Name:
                <span className={firstNameValid ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={firstNameValid || !email ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
                </Form.Label>
                <Form.Control
                    type='text'
                    id='firstName'
                    ref={firstNameRef}
                    autoComplete="off"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    aria-invalid={firstNameValid ? "false" : "true"}
                    aria-describedby="emailErrorMsg"
                />
                <p id="firstNameErrorMsg" className={!firstNameValid && firstName ? "instructions show" : "instructions hide"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    First Name Required
                </p> 

                <Form.Label htmlFor='lastNameForm'>Last Name:
                <span className={lastNameValid ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={lastNameValid || !lastName ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
                </Form.Label>
                <Form.Control
                    type='text'
                    id='lastNameForm'
                    ref={lastNameRef}
                    autoComplete="off"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    aria-invalid={lastNameValid ? "false" : "true"}
                    aria-describedby="lastNameErrorMsg"
                />
                <p id="lastNameErrorMsg" className={!lastNameValid && lastName ? "instructions show" : "instructions hide"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Last Name Required
                </p> 

                {/* <Form.Label htmlFor='usernameForm'>Username:
                <span className={usernameValid ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={usernameValid || !username ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
                </Form.Label>
                <Form.Control
                    type='text'
                    id='usernameForm'
                    ref={usernameRef}
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    aria-invalid={usernameValid ? "false" : "true"}
                    aria-describedby="usernameErrorMsg"
                />
                <p id="usernameErrorMsg" className={!usernameValid && username ? "instructions show" : "instructions hide"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Required, must be at least 3 characters or longer
                </p>  */}

                <Form.Label htmlFor='imgURLForm'>Image File:
                <span className={imgURLValid ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={imgURLValid || !imgURL ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
                </Form.Label>
                <Form.Control
                    type='file'
                    accept=".jpg, .jpeg, .png, .gif"
                    id='imgURLForm'
                    ref={imgURLRef}
                    label={imgURL}
                    onChange={(e) => setImgURL(e.target?.files[0]?.name ? e.target.files[0].name : "")}
                    aria-invalid={imgURLValid ? "false" : "true"}
                    aria-describedby="imgURLErrorMsg"
                />
                <p id="imgURLErrorMsg" className={!imgURLValid && imgURL ? "instructions show" : "instructions hide"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must be a valid image format
                </p> 


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

                <Form.Label htmlFor='confirmForm'>Confirm:
                <span className={confirmValid && confirm ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={confirmValid || !confirm ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
                </Form.Label>
                <Form.Control
                    type='password'
                    id='confirmForm'
                    ref={confirmRef}
                    autoComplete="off"
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                    aria-invalid={confirmValid ? "false" : "true"}
                    aria-describedby="confirmErrorMsg"
                />
                <p id="confirmErrorMsg" className={!confirmValid && confirm ? "instructions show" : "instructions hide"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Passwords do not match
                </p> 

                <Button type="submit" className="mb-5 loginButton" disabled={!emailValid || !passwordValid || !confirmValid ? true : false}>Register</Button>
            </Form>
            <span>Already Registered?</span>
            <Button type="button" href="/login" variant="link">Sign In</Button>
        </section>
    )
}

export default UpdateUser