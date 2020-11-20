const express = require ("express")
const mongoose = require ('mongoose')
const dotenv = require ('dotenv')

const connetDB = require ('./config/db')

const app = express()

// Swagger
const swaggerJsonDoc = require ('swagger-jsdoc')
const swaggerUI = require ('swagger-ui-express')

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Documenting REST API's With Node JS and MongoDB",
            description: "This is an implementation of how to document your RESTful API's using SWAGGER",
            servers: ['http://localhost:3000']
        },
        "components": {
            "schemas": {
                "Post": {
                    "properties": {
                        "title": {
                            "type": "string", "required": true
                        },
                        "author": {
                            "type": "string", "required": true
                        },
                        "body": {
                            "type": "string", "required": true
                        }
                    }
                }
            }
        }
    },
    apis: ['./routes/api/post.js']
}

// BodyParser Middleware
app.use(express.json())


// Load config
dotenv.config({ path: "./config/.env" });

connetDB()

// Post Routes
const postsRoutes = require ('./routes/api/post')

// Routes
app.get('/', (req, res) => {
    res.send(('Hello'))
})

app.use('/api/posts', postsRoutes)

const swaggerDocs = swaggerJsonDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))



const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`server run at port ${PORT}`))

module.exports = app