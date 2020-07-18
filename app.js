const http = require('http')
const dotEnv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')

dotEnv.config()

const app = express()
const server = http.createServer(app)

mongoose.connect(process.env.MOGODB_URI)

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Server is running')
})

server.listen(process.env.PORT)