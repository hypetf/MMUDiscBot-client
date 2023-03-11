import React, {useContext, useEffect} from 'react'
import styles from '../assets/css/Upload.module.css'
import FileUploader from './FileUploader'
import FileList from './FileList'

export default function Upload() {
  return (
    <div className={styles.Upload}>
        <FileUploader />
        <FileList />
    </div>
  )
}
