import React from 'react'
import s from './index.module.css'
import io from 'socket.io-client'
const { useState, useEffect } = React

export default function Choice(props) {
    if (!props.location.state) {
        props.history.push('/choice')
    }
    const user = props.location.state.username
    const [socket] = useState(() =>
        io('http://localhost:3000/', {
            query: {
                username: user
            }
        }))
    const [messages, set_messages] = useState([])
    const [msg, set_msg] = useState('')
    const [users, set_users] = useState([])
    useEffect(() => {
        set_msg('')
    }, [messages])
    useEffect(() => {
        socket.on('connect', () => {
            console.log('connected')
        })

        socket.on('disconnect', () => {
            console.log('disconnect')
        })

        socket.on('error', (err) => {
            console.log(err)
        })

        socket.on('chat_message', (info) => {
            set_messages(messages =>
                ([...messages, { ...info, msg_id: messages.length }]))
        })

        socket.on('users_online', (users) => {
            set_users(users)
        })
    }, [socket])

    function send_msg() {
        if (msg.trim() === '') return
        const msg_obj = {
            msg_id: messages.length,
            msg,
            username: user
        }
        socket.emit('chat_message', msg)
        set_messages(messages => ([...messages, msg_obj]))
    }

    function enter_handle(e) {
        e.key === 'Enter' && send_msg()
    }

    function set_msg_wra(e) {
        set_msg(e.target.value)
    }
    return (
        <div className={s.container}>
            <div className={s.tip_count}>在线人数 {users.length}</div>
            <div className={s.messages}>
                <ul>
                    {messages.map(({username, msg, msg_id})=>
                    (<li key={msg_id} className={username===user?s.msg_self:s.msg_other}>
                        <span className={s.username}>{username}</span>
                        {msg}
                    </li>))}
                </ul>
            </div>
            <div className={s.bottom}>
                <input onChange={set_msg_wra} onKeyDown={enter_handle} value={msg} type="text" className={s.input_box}/>
                <button onClick={send_msg} className={s.btn_send}>Send</button>
            </div>
        </div>
    )
}