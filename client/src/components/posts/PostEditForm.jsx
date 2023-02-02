import React from 'react'
import { useState,useEffect,useContext } from 'react'
import { SessionContext } from '../Context/SessionContext'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const PostEditForm = () => {
    const {id} = useParams()
    const [loaded,setLoaded] = useState(false)
    const {sessionID, sessionUserName} = useContext(SessionContext)
    const [content, setContent] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/posts/${id}`, {withCredentials:true})
            .then(res=>{
                setContent(res.data[0].content)
                setLoaded(true)
            })
    },[])


    const handleSubmit = e => {
        e.preventDefault()
        const updatedPosr = {
            user: sessionID,
            content
        }
        axios.put(`http://localhost:8000/api/posts/${id}`, updatedPosr, {withCredentials:true})
            .then(() => navigate('/dashboard'))
            .catch(err => console.log(err))
    }

    return (
        <div style={{
            margin:'2vw 20px 0',
            border:'1px solid black',
            borderRadius:'5px',
            boxShadow:'3px 3px 10px gray',
            padding:'10px',
            width:'50vw',
            minWidth:'320px'
        }}>
            <h3>Edit Post</h3>
                <form onSubmit={handleSubmit}>
                    <textarea
                        style={{
                            border:'1px solid black',
                            borderRadius:'5px',
                            width:'80%'
                        }}
                        rows="4"
                        value={content}
                        onChange={e=>setContent(e.target.value)}
                    ></textarea><br/>
                    <button 
                        className='btn btn-secondary btn-sm' 
                        style={{marginLeft:'70%'}}
                        >
                            Update
                    </button>
                </form>
        </div>
    )
}

export default PostEditForm