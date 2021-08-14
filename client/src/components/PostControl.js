import React from 'react'
import { Link } from 'react-router-dom'
const PostControl = ({ link, id }) => {
    return (
        <div className="post-control">
            <button>
                <i className="fas fa-edit"></i>
            </button>
            <button>
                <i className="fas fa-trash-alt"></i>
            </button>
        </div>
    )
}

export default PostControl
