const express = require ('express')
const router = express.Router()

// Post Models
const Posts = require ('../../models/Post')

/**
 * @swagger
 * /api/posts:
 *      get:
 *          tags:
 *              - Posts
 *          description: Return all posts
 *          produces:
 *              - application/json
 *          responses:
 *              200:
 *                  description: An array of posts
 *                  schema:
 *                      $ref: '#/components/schemas/Post'
 *              500:
 *                  description: Server Error!
 */

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


/**
 * @swagger
 * /api/posts:
 *      post:
 *          tags:
 *              - Posts
 *          description: Add a new post to database
 *          produces:
 *              - application/json
 *          parameters:
 *              - title: post swagger
 *                description: testing post routes from swagger
 *                in: body
 *                required: true
 *                schema:
 *                      $ref: '#/components/schemas/Post'
 *          responses:
 *              200:
 *                  description: New post has been posted!
 *              500:
 *                  description: Server Error!
 */

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


/**
 * @swagger
 * /api/posts/{_id}:
 *   get:
 *     tags:
 *       - Posts
 *     description: Returns a single post
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: _id
 *         description: A single post Object's ID (Automatically assigned by MongoDB)
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single post
 *         schema:
 *           $ref: '#/components/schemas/Post'
 *       500:
 *         description: Server Error
 */

// @routes GET api/posts/:id
// @desc get a post
router.get('/:_id', async(req, res) => {
    try {
        const objectId = req.params._id
        const post = await Posts.findById({ "_id": objectId })
        if(!post) throw Error("No post found")
        res.status(200).json(post)
    } catch(err) {
        res.status(400).json({msg: err})
    }
})


/**
 * @swagger
 * /api/posts/{_id}:
 *   delete:
 *     tags:
 *       - Posts
 *     description: Delete a single post
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: _id
 *         description: Posts Object ID
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       500:
 *         description: Server error
 */

// @routes DELETE api/posts/:id
// @desc Delete a post
router.delete('/:_id', async(req, res) => {
    try {
        const objectId = req.params._id
        const posts = await Posts.findByIdAndDelete({ "_id": objectId })
        if(!posts) throw Error("No post found")
        res.status(200).json({ success: true })
    } catch(err) {
        res.status(400).json({msg: err})
    }
})


/**
 * @swagger
 * /api/posts/{_id}:
 *   patch:
 *     tags:
 *       - Posts
 *     description: Updates or modification a single post
 *     produces:
 *       - application/json
 *     parameters:
 *       - title: post
 *         description: posts object resources
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Post'
 *       - name: _id
 *         description: Post Object ID
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully added
 *       500:
 *         description: Server error
 */

// @routes UPDATE api/posts/:id
// @desc update a post
router.patch('/:_id', async(req, res) => {
    try {
        const objectId = req.params._id
        const posts = await Posts.findByIdAndUpdate({ "_id": objectId }, req.body)
        if(!posts) throw Error("Error when updatating the post")
        res.status(200).json({ success: true })
    } catch(err) {
        res.status(400).json({msg: err})
    }
})

module.exports = router