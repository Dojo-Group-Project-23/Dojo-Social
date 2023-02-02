import React from 'react'

const CommentForm = () => {
    return (
        <form className='mt-1'>
            <input 
            style={{
                    border:'1px solid black',
                    borderRadius:'5px',
                    width:'80%',
                    height:'31px',
                    position:'relative',
                    top:'2px',
                    borderRadius:'5px 0px 0px 5px'
                }} 
            type="text" />
            <button
                className='btn btn-secondary btn-sm'
                style={{
                    borderRadius:'0px 5px 5px 0px'
                }}
            >
                Send
            </button>
        </form>
    )
}

export default CommentForm