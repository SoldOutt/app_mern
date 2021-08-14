import React from 'react'
import { PostContext } from '../contexts/PostContext'
import { useContext, useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner'
import PostDetail from './PostDetail'
import FormAddPost from './FormAddPost'

const DashBoard = () => {
    const {
        postState: { posts, postsLoading },
        getAllPosts,
    } = useContext(PostContext)
    useEffect(() => getAllPosts(), [])
    const { showFormAddPost, setShowFormAddPost } = useContext(PostContext)
    let body

    if (postsLoading) {
        body = (
            <div className="d-flex justify-content-center mt-2">
                <Spinner animation="border" variant="info" />
            </div>
        )
    } else if (posts.length === 0) {
        body = (
            <div className="d-flex justify-content-center mt-2">
                <h2 className="text-center">Chưa có khóa học nào</h2>
            </div>
        )
    } else {
        console.log(posts)
        body = (
            <div className="container">
                <div className="row">
                    {posts.map((post, idx) => {
                        return <PostDetail key={idx} data={post} />
                    })}
                </div>
            </div>
        )
    }
    const openForm = () => {
        setShowFormAddPost(true)
    }
    return (
        <>
            <h1>DashBoard</h1>
            {body}
            <FormAddPost></FormAddPost>
            <button onClick={openForm} className="btn-floating">
                Add Post
            </button>
        </>
    )
}

export default DashBoard
