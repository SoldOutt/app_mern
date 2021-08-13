import React from 'react'
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
    // useEffect(() => getAllPosts(), [])

    //xuất ra ngoài
    const postContextDate = { postState, getAllPosts }
    return (
        <PostContext.Provider value={postContextDate}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider
