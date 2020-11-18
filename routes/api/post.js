const express = require ('express')
const router = express.Router()

// Post Models
const Posts = require ('../../models/Post')

// @routes GET api/posts
// @desc Get all post
router.get('/', async(req, res) => {
    try {
        const posts = await Posts.find()
        if(!posts) throw Error("No Items")
        res.status(200).json(posts)
    } catch(err) {
        res.status(400).json({msg: err})
    }
})

// @routes POST api/posts
// @desc Create post
router.post('/', async (req, res) => {
    const newPost = new Posts (req.body)

    try {
        const post = await newPost.save()
        if(!post) throw Error ('Can not save the post')
        res.status(200).json(post)

    } catch(err) {
        res.status(400).json({ msg: err })
    }
    
})

// @routes GET api/posts/:id
// @desc get a post
router.get('/:id', async(req, res) => {
    try {
        const post = await Posts.findById(req.params.id)
        if(!post) throw Error("No post found")
        res.status(200).json(post)
    } catch(err) {
        res.status(400).json({msg: err})
    }
})

// @routes DELETE api/posts/:id
// @desc Delete a post
router.delete('/:id', async(req, res) => {
    try {
        const posts = await Posts.findByIdAndDelete(req.params.id)
        if(!posts) throw Error("No post found")
        res.status(200).json({ success: true })
    } catch(err) {
        res.status(400).json({msg: err})
    }
})

// @routes UPDATE api/posts/:id
// @desc update a post
router.patch('/:id', async(req, res) => {
    try {
        const posts = await Posts.findByIdAndUpdate(req.params.id, req.body)
        if(!posts) throw Error("Error when updatating the post")
        res.status(200).json({ success: true })
    } catch(err) {
        res.status(400).json({msg: err})
    }
})

module.exports = router