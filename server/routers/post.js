const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const verifyToken = require('../middleware/auth')
const User = require('../models/User')

//[GET] api/post
router.get('/', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.userId }).populate('users')
        res.json({ success: true, posts })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})

//[POST] api/post
router.post('/', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body

    if (!title) {
        res.status(400).json({ success: false, message: 'Title is required' })
    }
    // User.findOne({ _id: req.userId }, (err, data) => {
    //     console.log(data)
    // })

    // console.log(user.obj)
    try {
        const newPost = new Post({
            title,
            description,
            url: url.startsWith('http://') ? url : `http://${url}`,
            status: status || 'To Learn',
            user: req.userId,
        })
        await newPost.save()
        res.json({ success: true, message: 'Success!', newPost })
    } catch (err) {
        console.error(err)
        res.status(500).json({ success: false, message: err.message })
    }
})
//[PUT] api/post/:id
router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body
    if (!title) {
        res.status(400).json({ success: false, message: 'Title is required' })
    }

    try {
        let updatePost = {
            title,
            description: description || '',
            url: (url.startsWith('http://') ? url : `http://${url}`) || '',
            status: status || 'To Learn',
        }
        const postUpdateCondition = { _id: req.params.id, user: req.userId } //dieu kien xac thuc de thay doi post
        console.log(postUpdateCondition)
        updatePost = await Post.findOneAndUpdate(
            postUpdateCondition,
            updatePost,
            { new: true }
        ) //dieu kien thay doi, gia tri thay doi, tra ve gia tri la gia tri moi(neu khong sex tra ve gia tri la post cu)
        //Use not Author to update post
        if (!updatePost) {
            return res.status(401).json({
                success: 'false',
                message: 'Post or user not Authorised',
            })
        }

        // await newPost.save()
        res.json({ success: true, message: 'ok update r do', post: updatePost })
    } catch (err) {
        console.error(err)
        res.status(500).json({ success: false, message: err.message })
    }
})
//[DELETE] api/post/:id
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const postDeleteCondition = {
            _id: req.params.id,
            user: req.userId,
        }

        const deletePost = await Post.findOneAndDelete(postDeleteCondition) //dieu kien thay doi, gia tri thay doi, tra ve gia tri la gia tri moi(neu khong sex tra ve gia tri la post cu)
        //Use not Author to delete post
        if (!deletePost) {
            return res.status(401).json({
                success: 'false',
                message: 'Post or user not Authorised',
            })
        }

        // await newPost.save()
        res.json({ success: true, message: 'ok delete r do', post: deletePost })
    } catch (err) {
        console.error(err)
        res.status(500).json({ success: false, message: err.message })
    }
})
module.exports = router
