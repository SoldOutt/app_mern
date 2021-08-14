import React, { useContext, useState } from 'react'
import { PostContext } from '../contexts/PostContext'

const FormAddPost = () => {
    const { showFormAddPost, setShowFormAddPost, saveNewPost } =
        useContext(PostContext)
    const [formAddPost, setFormAddPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'To Learn',
    })
    const { title, description, url } = formAddPost
    const inputChange = (event) => {
        setFormAddPost({
            ...formAddPost,
            [event.target.name]: event.target.value,
        })
    }
    const clearForm = () => {
        setFormAddPost({
            title: '',
            description: '',
            url: '',
            status: 'To Learn',
        })
    }
    const closeForm = () => {
        setShowFormAddPost(false)
        clearForm()
    }
    const submitNewPost = async (event) => {
        event.preventDefault()
        await saveNewPost(formAddPost)
        closeForm()
    }
    return (
        <div className={`form-add-post ${showFormAddPost ? '' : 'hidden'}`}>
            <form onSubmit={submitNewPost}>
                <h3>Your Task you want to note ?? </h3>
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

export default FormAddPost
