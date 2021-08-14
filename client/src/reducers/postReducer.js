export const postReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case 'POSTS_LOADED_SUCCESS':
            return {
                ...state,
                posts: payload,
                postsLoaded: false,
            }
        case 'SAVE_NEW_POST':
            return {
                ...state,
                posts: [...state.posts, payload],
            }
        case 'DELETE_POST':
            var listPost = state.posts.filter((x) => {
                return x._id !== payload
            })
            return {
                ...state,
                posts: listPost,
            }
        default:
            return state
    }
}
