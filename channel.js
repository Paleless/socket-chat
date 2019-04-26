//channel
class Channel {
    constructor(roomname, io) {
        if (arguments.length === 0) {
            throw new Error('io is required')
        } else if (arguments.length === 1) {
            io = roomname
            roomname = '/'
        }
        this.io = io
        this.roomname = roomname
        this.users = []
        this.init()
    }


    init() {
        const io = this.io
        const roomname = this.roomname
        const room = io.of(roomname)
        room.use((socket, next) => {
            if (!socket.handshake.query.username) {
                socket.emit('error', 'username is required')
            } else {
                const username = socket.handshake.query.username
                socket.username = username
                next()
            }
        })
        room.on('connection', (socket) => {
            const username = socket.username
            const mark_index = this.users.length
            this.users.push(username)
            console.log(username + ' entered in: ' + roomname)
            room.emit('users_online', this.users)
            socket.on('chat_message', (msg) => {
                console.log('received: ' + msg)
                socket.broadcast.emit('chat_message', ({ username, msg }))
            })
            socket.on('disconnect', () => {
                console.log('user disconnected')
                this.users.splice(mark_index, 1)
                room.emit('users_online', this.users)
            })
        })
    }
}

module.exports = Channel