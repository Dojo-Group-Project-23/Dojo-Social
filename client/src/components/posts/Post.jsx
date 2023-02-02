import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { SessionContext } from '../Context/SessionContext'
import Comment from './Comment'
import CommentForm from './CommentForm'
import DeleteBtn from './DeleteBtn'
import PostEditForm from './PostEditForm'

const Post = ({thisPost,comments,getPageData}) => {
    const {sessionID} = useContext(SessionContext) 

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
            <h6>{thisPost.user.firstName} {thisPost.user.lastName}</h6>
            <div>
                <article style={{
                margin:'2vw 20px 0',
                }}>
                    <p>{thisPost.content}</p>
                    {comments &&
                        comments.map((c,i) => {
                            return(
                                c.post._id === thisPost._id ? <Comment key={i}  comment={c}/> : null
                            )
                        })
                    }
                </article>
                <CommentForm />
                {sessionID === thisPost.user._id ?
                    <>
                        <Link className='btn btn-secondary btn-sm' to={`/posts/${thisPost._id}/edit`}>Edit</Link>
                        <DeleteBtn 
                            docModel={'posts'}
                            docId={thisPost._id}
                            event={getPageData}
                            title={'Delete'}
                            leftMargin={'10%'}
                        />
                    </>
                    : null
                }
            </div>
        </div>
    )
}

export default Post