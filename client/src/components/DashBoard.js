import React from 'react'
import { PostContext } from '../contexts/PostContext'
import { useContext, useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner'

const DashBoard = () => {
    const {
        postState: { posts, postsLoading },
        getAllPosts,
    } = useContext(PostContext)
    useEffect(() => getAllPosts(), [])

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
        body = posts.map((post) => {
            ;<h2>a</h2>
        })
    }

    return (
        <>
            <h1>DashBoard</h1>
            {body}
        </>
    )
}

export default DashBoard
