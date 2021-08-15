import React, { useContext } from 'react'
// import { Link } from 'react-router-dom'
import { PostContext } from '../contexts/PostContext'
const PostControl = ({ link, id }) => {
    const { deletePost, findPost, setShowFormUpdatePost } =
        useContext(PostContext)
    const clickRemovePost = () => {
        deletePost(id)
    }
    const editPost = () => {
        findPost(id)
        setShowFormUpdatePost(true)
    }
    return (
        <div className="post-control">
            <button onClick={editPost}>
                <i className="fas fa-edit"></i>
            </button>
            <button>
                <i onClick={clickRemovePost} className="fas fa-trash-alt"></i>
            </button>
        </div>
    )
}

export default PostControl
