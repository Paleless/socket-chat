const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server)

//channel
class Channel {
    constructor(roomname) {
        this.roomname = roomname || '/'
        this.user_count = 0
        this.users = []
        this.init()
    }

    init() {
        const roomname = this.roomname
        const room = io.of(roomname)
        room.on('connection', (socket) => {
            console.log('an user entered in: ' + roomname)
            this.user_count += 1
            room.emit('count', this.user_count)
            socket.on('chat_message', ({ username, msg }) => {
                console.log('received: ' + msg)
                socket.broadcast.emit('chat_message', ({ username, msg }))
            })
            socket.on('disconnect', () => {
                console.log('user disconnected')
                this.user_count -= 1
                room.emit('count', this.user_count)
            })
        })
    }
}
const channels = []

const channel_a = new Channel()

app.use(express.static('./public/'))
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