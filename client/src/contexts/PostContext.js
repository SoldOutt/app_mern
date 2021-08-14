import React, { useState } from 'react'
import { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import { postReducer } from '../reducers/postReducer'
import { API_URL } from './Constands'
export const PostContext = createContext()

const PostContextProvider = ({ children }) => {
    const [postState, dispatch] = useReducer(postReducer, {
        posts: [],
        postLoading: true,
    })
    const [showFormAddPost, setShowFormAddPost] = useState(false)
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

    //xuất ra ngoài
    const postContextDate = {
        postState,
        getAllPosts,
        showFormAddPost,
        setShowFormAddPost,
        saveNewPost,
    }
    return (
        <PostContext.Provider value={postContextDate}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider
