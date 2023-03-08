import React, {useCallback, useState} from 'react'
import styles from '../assets/css/FileUploader.module.css'
import {useDropzone} from 'react-dropzone'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function FileUploader() {
  const [files, setFiles] = useState([]);
  const [fileUploading, setFileUploading] = useState(false)

  const notifyErr = (text) => toast.error(text);
  const notifyLoading = (text) => toast.loading(text);
  let toastIDLoading;
  const loadToServer = () => {
    axios({
      method: 'POST',
      url: '/api/file/upload',
      data: files[0]
    })
    .then(res => {
      console.log(res.data);
      if(res.status === 200) {
        console.log(res.status);
      }
      else
        notifyErr("Something went wrong while uploading the file to the server. Please try again later.");
      completeLoad();
    })
    .catch(err => {
      console.log(err);
      completeLoad();
    })
  }

  const completeLoad = () => {
    toast.update(toastIDLoading,{ render: "File successfully uploaded.", type: "success", isLoading: false, autoClose: 5000, closeOnClick: true, hideProgressBar: true, });
    setTimeout(() => {
      setFileUploading(false);
      setFiles([]);
      window.location.reload();
      // document.getElementById('fileuploader').style = "border: 4px dashed rgba(200,200,200, .6);filter: none;background:unset;"
      // document.getElementById('opts').style = "display: unset;"
      // document.getElementById('inputProps').setAttribute('disabled', 'false');
    }, 1500);  
  }
  const onDrop = useCallback(acceptedFile => {
    if(acceptedFile.length > 0) {
      setFileUploading(true);
      toastIDLoading = notifyLoading("Uploading file to the server...");
      document.getElementById('fileuploader').style = "border: 4px dashed rgba(200,200,200, .6);filter: none;background:unset;"
      document.getElementById('inputProps').setAttribute('disabled', 'true');
      console.log(acceptedFile)
      document.getElementById('opts').style = "display: none;"
      setFiles(files => [...files, acceptedFile]);
      
      loadToServer();
    }
    else
      notifyErr("File type is not accepted.");
  }, [])

  const onDragEnter = useCallback(() => {
    document.getElementById('fileuploader').style = "border: 4px dashed var(--blue);filter: drop-shadow(0 0 10px var(--blue));background:#202020;"
  })

  const onDragLeave = useCallback(() => {
    document.getElementById('fileuploader').style = "border: 4px dashed rgba(200,200,200, .6);filter: none;background:unset;"
  })

  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'audio/*' : ['.mp3']
    },
    excludeAcceptAllOption: true,
    maxFiles: 1,
    multiple: false,
    onDragEnter: onDragEnter,
    onDragLeave: onDragLeave,
    onDrop: onDrop
  })
  

  return (
    <div className={styles.FileUploader} id="fileuploader" {...getRootProps()}>
      <div className={`${styles.svgIcoContainer} ${fileUploading ? `${styles.svgLoading}` : ''} `} >
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" strokeWidth="1" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
          <polyline points="9 15 12 12 15 15" />
          <line x1="12" y1="12" x2="12" y2="21" />
        </svg>
      </div>

      <div id="opts">
        <button>
          Upload a File
        </button>
        <p id={styles.dragndropinfo}>or drag and drop...</p>
        <p id={styles.info}>Supported files: MP3, IDK</p>
        <input id="inputProps" {...getInputProps()} />
      </div>
    </div>
  )
}
