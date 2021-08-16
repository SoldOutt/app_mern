import React, { useContext, useEffect, useState } from 'react'
import { PostContext } from '../contexts/PostContext'

const FormUpdatePost = () => {
    const {
        postState: { postUpdate },
        showFormUpdatePost,
        setShowFormUpdatePost,
        updatePost,
        setShowToast,
    } = useContext(PostContext)
    const [formUpdatePost, setFormUpdatePost] = useState(postUpdate)
    const { title, description, url, status } = formUpdatePost
    const inputChange = (event) => {
        setFormUpdatePost({
            ...formUpdatePost,
            [event.target.name]: event.target.value,
        })
    }
    useEffect(() => {
        setFormUpdatePost(postUpdate)
    }, [postUpdate])
    // const clearForm = () => {
    //     setFormUpdatePost({
    //         title: '',
    //         description: '',
    //         url: '',
    //         status: 'To Learn',
    //     })
    // }
    const closeForm = () => {
        setShowFormUpdatePost(false)
        // clearForm()
    }
    const submitEditPost = async (event) => {
        event.preventDefault()
        const { success, message } = await updatePost(formUpdatePost)
        setShowToast({
            show: true,
            message,
            type: success ? 'success' : 'danger',
        })
        closeForm()
    }
    return (
        <div className={`form-add-post ${showFormUpdatePost ? '' : 'hidden'}`}>
            <form onSubmit={submitEditPost}>
                <h3>Do you want to change note ?? </h3>
                <div className="form-controll mb-4">
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={title}
                        onChange={inputChange}
                    />
                </div>
                <div className="form-controll mb-4">
                    <textarea
                        type="text"
                        placeholder="Description"
                        name="description"
                        value={description}
                        onChange={inputChange}
                    />
                </div>
                <div className="form-controll mb-4">
                    <input
                        type="text"
                        placeholder="Link to Tutorial"
                        name="url"
                        value={url}
                        onChange={inputChange}
                    />
                </div>
                <div className="form-controll mb-4">
                    <select name="status" value={status} onChange={inputChange}>
                        <option value="To Learn">To Learn</option>
                        <option value="Learned">Learned</option>
                        <option value="Learning">Learning</option>
                    </select>
                </div>
                <button className="btn btn-primary ">Submit</button>
                <button
                    type="button"
                    onClick={closeForm}
                    className="btn btn-dark mx-5"
                >
                    Cancel
                </button>
            </form>
        </div>
    )
}

export default FormUpdatePost
