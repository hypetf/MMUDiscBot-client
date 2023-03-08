import React, {useContext, useEffect} from 'react'
import styles from '../assets/css/Home.module.css'
import FileUploader from './FileUploader'

export default function Upload() {
  return (
    <div className={styles.Home}>
        <FileUploader />
    </div>
  )
}
