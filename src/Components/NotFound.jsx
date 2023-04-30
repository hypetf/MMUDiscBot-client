import React from 'react'
import styles from '../assets/css/NotFound.module.css'

export default function NotFound() {
  return (
    <div className={styles.NotFound}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {/* <p>
        <i>{error.statusText || error.message}</i>
      </p> */}
      <a href='/home'>Go back Home</a>
    </div>
  )
}
