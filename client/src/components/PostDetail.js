import React from 'react'
import { Link } from 'react-router-dom'
import PostControl from './PostControl'

const PostDetail = ({ data }) => {
    return (
        <div className="col-md-4 mb-4">
            <div
                className={`box post-detail ${
                    data.status === 'Learned'
                        ? 'br-success'
                        : data.status === 'Learning'
                        ? 'br-warning'
                        : 'br-danger'
                }`}
            >
                <div className="post-detail_header">
                    <h3>{data.title}</h3>
                    <PostControl id={data._id} link={data.url}></PostControl>
                </div>
                <div className="post-contain px-3">
                    <p>
                        <span>Description: </span>
                        {data.description}
                    </p>
                    <p>
                        <span>Link: </span>
                        <a href={data.url}>Click here to go link</a>
                    </p>
                    <p>
                        <span>Status: </span>
                        {data.status}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PostDetail
