const chai = require ('chai')
const chaiHttp = require ('chai-http')

const server = require('../app')
const Post = require('../models/Post')


// Assertion 
chai.use(chaiHttp)
chai.should()


describe ('Testing Posts API', () => {
    /**
     * Test the GET routes
     */
    describe('GET /api/posts', () => {
        it('should GET all the posts', (done) => {
            chai.request(server)
                .get('/api/posts')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                done()
                })
        })
        // testing wrong endpoint
        it('should not GET all the posts', (done) => {
            chai.request(server)
                .get('/api/post')
                .end((err, res) => {
                    res.should.have.status(404)
                done()
                })
        })
    })


    /**
     * Test the POST routes
     */
    describe('POST /api/posts', () => {
        it('should POST create post', (done) => {
            chai.request(server)
                .post('/api/posts')
                .send({title: "Post One", author: "raja jamal", body: "This is post one"})
                .end((err, res) => {
                    res.should.have.status(200)
                done()
                })
        })

    })

    /**
     * Test the GET api/posts/:id routes
     */
    describe('GET /api/posts/:id', () => {
        it('should Get a single post given the id', (done) => {
            let post = new Post ({title: "Post from test", author: "raja jamal", body: "This is come from testing"})
            post.save ((err, post) => {
                chai.request(server)
                .get('/api/posts/' + post.id)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('title')
                    res.body.should.have.property('author')
                    res.body.should.have.property('body')
                    res.body.should.have.property('_id').eq(post.id)
                done()
                })
            })
            
        })

    })

    /**
     * Test the DELETE api/posts/:id routes
     */
    describe('DELETE /api/posts/:id', () => {
        it('should DELETE a single post given the id', (done) => {
            let post = new Post ({title: "Post from delete test", author: "raja jamal", body: "This is come from delete testing"})
            post.save ((err, post) => {
                chai.request(server)
                .delete('/api/posts/' + post.id)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                done()
                })
            })
            
        })

    })
   
    /**
     * Test the PATCH api/posts/:id routes
     */
    describe('PATCH /api/posts/:id', () => {
        it('should update a single post given the id', (done) => {
            let post = new Post ({title: "Post from patch test", author: "raja jamal", body: "This is come from delete testing"})
            post.save ((err, post) => {
                chai.request(server)
                .patch('/api/posts/' + post.id)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                done()
                })
            })
            
        })

    })
   

})