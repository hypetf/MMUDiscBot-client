import React from 'react'
import styles from '../assets/css/Welcome.module.css'
import discbg from '../assets/media/discbg.png'

export default function Welcome() {
  return (
    <div className={styles.Welcome}>
        <img src={discbg} className={styles.discbg} alt="Asset" />
        <h1>
            DISCO BOT
        </h1>
        <p>
            Enjoy music with the best Discord Bot
        </p>
    </div>
  )
}
