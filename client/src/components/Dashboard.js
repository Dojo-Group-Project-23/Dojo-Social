import React, { useEffect, useState, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { SessionContext } from './Context/SessionContext'
import { Button } from 'react-bootstrap'
import Post from './posts/Post'
import PostForm from './posts/PostForm'

const Dashboard = () => {
    const navigate = useNavigate()
    const { sessionID, setSessionID } = useContext(SessionContext)
    const [loggedUser, setLoggedUser] = useState({name:''})
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])

    const firstRunOver = useRef(false)

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



    useEffect(() => {
        let endpoints = [`http://localhost:8000/api/posts`,`http://localhost:8000/api/comments`]
        axios.all(endpoints.map(endpoint => axios.get(endpoint, {withCredentials:true})))
            .then(res => {
                setPosts(res[0].data)
                setComments(res[1].data)
            })
    },[posts]) // <=== GND ADDED, I KNOW THIS IS BAD PRACTICE 

    return (
        <div style={{width:'fit-content', margin:'0 auto'}}>
            {/* Dashboard - {loggedUser.firstName ? loggedUser.lastName : "loading..."}
            <Button variant="link" onClick={() => navigate('/debugUsers')}>Debug</Button> */}
            <h1 style={{textAlign:'center'}}>Dojo-Wall</h1>
            <PostForm />
            {posts &&
                posts.map((p,i) => <Post key={i} thisPost={p} comments={comments}/>)
            }
        </div>
    )
}

export default Dashboard