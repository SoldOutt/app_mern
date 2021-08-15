import React, { useState } from 'react'
import { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import { postReducer } from '../reducers/postReducer'
import { API_URL } from './Constands'
export const PostContext = createContext()

const PostContextProvider = ({ children }) => {
    const [postState, dispatch] = useReducer(postReducer, {
        postUpdate: null,
        posts: [],
        postLoading: true,
    })

    const [showFormAddPost, setShowFormAddPost] = useState(false)
    const [showFormUpdatePost, setShowFormUpdatePost] = useState(false)
    const [showToast, setShowToast] = useState({
        show: true,
        message: '',
        type: null,
    })

    //Find post
    const findPost = (postId) => {
        const post = postState.posts.find((x) => x._id === postId)
        if (post) {
            dispatch({
                type: 'FIND_POST',
                payload: post,
            })
        }
    }

    const getAllPosts = async () => {
        try {
            const response = await axios.get(`${API_URL}/post`)
            if (response.data.success) {
                dispatch({
                    type: 'POSTS_LOADED_SUCCESS',
                    payload: response.data.posts,
                })
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: error.message }
        }
    }

    const saveNewPost = async (useForm) => {
        try {
            const response = await axios.post(`${API_URL}/post`, useForm)
            if (response.data.success) {
                dispatch({
                    type: 'SAVE_NEW_POST',
                    payload: response.data.newPost,
                })
                return response.data
            }
        } catch (err) {
            return err.response
                ? err.response.data
                : { success: false, message: 'server error' }
        }
    }
    // useEffect(() => getAllPosts(), [])

    const deletePost = async (postId) => {
        try {
            const response = await axios.delete(`${API_URL}/post/${postId}`)
            if (response.data.success) {
                dispatch({
                    type: 'DELETE_POST',
                    payload: postId,
                })
                return response.data
            }
        } catch (err) {
            return err.response
                ? err.response.data
                : { success: false, message: 'server error' }
        }
    }

    //updatePost
    const updatePost = async (useForm) => {
        try {
            const response = await axios.put(
                `${API_URL}/post/${useForm._id}`,
                useForm
            )
            if (response.data.success) {
                dispatch({
                    type: 'UPDATE_POST',
                    payload: useForm,
                })
                return response.data
            }
        } catch (err) {
            return err.response
                ? err.response.data
                : { success: false, message: 'server error' }
        }
    }
    //xuất ra ngoài
    const postContextDate = {
        postState,
        getAllPosts,
        showFormAddPost,
        setShowFormAddPost,
        showFormUpdatePost,
        setShowFormUpdatePost,
        saveNewPost,
        deletePost,
        showToast,
        setShowToast,
        findPost,
        updatePost,
    }
    return (
        <PostContext.Provider value={postContextDate}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider
