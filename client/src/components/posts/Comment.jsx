import React from 'react'

const Comment = ({comment}) => {
    return (
        <div style={{
            margin:'2vw 20px 0',
            backgroundColor:'#bbb',
            borderRadius: '5px',
            padding:'5px 20px',
            width:'fit-content'
        }}>
            <h6>{comment.user.firstName} {comment.user.lastName}</h6>
            <p style={{marginLeft:'2vw'}}>{comment.content}</p>
        </div>
    )
}

export default Comment