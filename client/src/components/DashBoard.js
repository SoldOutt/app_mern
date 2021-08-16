import React from 'react'
import { PostContext } from '../contexts/PostContext'
import { useContext, useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner'
import PostDetail from './PostDetail'
import FormAddPost from './FormAddPost'
import Toast from 'react-bootstrap/Toast'
import FormUpdatePost from './FormUpdatePost'

const DashBoard = () => {
    const {
        postState: { postUpdate, posts, postsLoading },
        getAllPosts,
        showToast: { show, message, type },
        setShowToast,
        updatePost,
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
        // console.log(posts)
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
        <div style={{ position: 'relative' }}>
            <h1>DashBoard</h1>
            {body}
            <FormAddPost></FormAddPost>
            {postUpdate !== null && <FormUpdatePost />}
            <button
                onClick={openForm}
                style={{ position: 'absolute', right: '10%', bottom: '10%' }}
                className="btn-floating btn btn-primary"
            >
                Add Post
            </button>
            <Toast
                style={{ position: 'fixed', top: '10%', right: '40px' }}
                show={show}
                className={`bg-${type} text-white`}
                onClose={setShowToast.bind(this, {
                    show: false,
                    message: '',
                    type: null,
                })}
                delay={2000}
                autohide
            >
                {message}
            </Toast>
        </div>
    )
}

export default DashBoard
