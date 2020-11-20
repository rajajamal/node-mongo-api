const express = require ("express")
const mongoose = require ('mongoose')
const dotenv = require ('dotenv')

const connetDB = require ('./config/db')

const app = express()

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



const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`server run at port ${PORT}`))

module.exports = app