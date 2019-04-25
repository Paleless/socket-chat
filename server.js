const express = require('express')
const http = require('http')
const app = express()

const server = http.createServer(app)
const io = require('socket.io')(server)
const Channel = require('./channel.js')
const channels = []

const channel_a = new Channel(io)

app.use(express.static('./public/dist/'))
app.use((req, res, next) => {
    res.status(404).send('404')
    next()
})

app.use((err, req, res, next) => {
    res.status(500).send(500)
})

server.listen(3000, () => {
    console.log("Server is running at http://localhost:3000")
})