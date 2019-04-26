import React from 'react'
import styles from './index.module.css'
import { useState, useEffect } from 'react'

export default function Choice(props) {
    const run = (e) => {
        if (e.key === 'Enter') {
            const username = e.target.value
            props.history.push('/room', { username })
        }
    }
    return (
        <div className={styles.wrapper}>
            <input onKeyDown={run} placeholder="please input your name" className={styles.input} type="text"/>
        </div>
    )
}