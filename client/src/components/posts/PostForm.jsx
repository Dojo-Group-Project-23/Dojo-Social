import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { SessionContext } from '../Context/SessionContext'

const PostForm = () => {
    const {sessionID, sessionUserName} = useContext(SessionContext)
    const [content, setContent] = useState('')


    const handleSubmit = e => {
        e.preventDefault()
        const newPost = {
            user: sessionID,
            content
        }
        axios.post(`http://localhost:8000/api/posts`, newPost, {withCredentials:true})
            .then(() => setContent(''))
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
            <h5>{sessionUserName}</h5>
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
                        Post
                </button>
            </form>
        </div>
    )
}

export default PostForm