const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.awfww.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`,
            {
                useCreateIndex: true, //đọc docs
                useNewUrlParser: true, //đọc docs
                useUnifiedTopology: true, //đọc docs
                useFindAndModify: false, //đọc docs
            }
        )
        console.log('mongodb is connected')
    } catch (e) {
        console.log(e.message)
        process.exit(1)
    }
}
connectDB()
const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 3000
const authRouter = require('./routers/auth')
const postRouter = require('./routers/post')

app.use('/api/auth/', authRouter)
app.use('/api/post/', postRouter)
app.get('/', (req, res) => {
    res.send('ok')
})
app.listen(port, () => {
    console.log('listening on port ', port)
})
