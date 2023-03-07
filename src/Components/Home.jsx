import React from 'react'
import Blob from './Blob'
import styles from '../assets/css/Home.module.css'
import FileUploader from './FileUploader'
import Welcome from './Welcome'

export default function Home() {
  return (
    <div className={styles.Home}>
        {/* <FileUploader /> */}
        <Welcome />
    </div>
  )
}
