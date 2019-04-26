const express = require('express')
const http = require('http')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)
const Channel = require('./channel.js')
const channels = [new Channel(io)]


app.use(express.static('./public/dist/'))
app.use(cors())
app.use(bodyParser.json())

app.post('/add/channel', (req, res) => {
    console.log(req.body)
    if (!req.body.roomname) {
        return res
            .status(400)
            .json({
                info: 'parms not right'
            })
    }
    const room = new Channel(req.body.roomname, io)
    channels.push(room)
    res.send(1)
})

app.get('/channels', (req, res) => {
    const roomnames = channels.map(channel => channel.roomname)
    res.json(roomnames)
})

app.post('/delete/channel', (req, res) => {
    const roomname = req.body.roomname
    console.log(roomname)
    const mark_index = channesl.findIndex(channel => chaneel.roomname === roomname)
    if (mark_index !== -1) {
        channels.splice(mark_index, 1)
        return res.send(1)
    }
    res.send(-1)
})

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