import React, {useCallback, useState} from 'react'
import styles from '../assets/css/FileUploader.module.css'
import {useDropzone} from 'react-dropzone'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSongsStore from '../utils/songsStore'
import axios from 'axios';

export default function FileUploader() {

  const songs = useSongsStore(state => state.songs);
  const updateSongsList = useSongsStore(state => state.updateSongsList);
  const notifyErr = (text) => toast.error(text);
  const notifyLoading = (text) => toast.loading(text);
  let toastIDLoading;

  function computeLength(file) {
    return new Promise((resolve) => {
      var objectURL = URL.createObjectURL(file);
      var mySound = new Audio([objectURL]);
      mySound.addEventListener(
        "canplaythrough",
        () => {
          URL.revokeObjectURL(objectURL);
          resolve({
            duration: mySound.duration
          });
        },
        false,
      );
    });  
  }
  function fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s}

  const loadToServer = (_file) => {
    let songLength;
    computeLength(_file).then((r) => {
      songLength = r.duration;
    })
    let b = false;

    const formData = new FormData();
    formData.append(
      "newAudio",
      _file,
      _file.name
    )

    axios({
      method: 'POST',
      url: '/api/upload/audio',
      data: formData
    })
    .then(res => {
      if(res.status === 200) {
        updateSongsList({
          "name" : _file.name,
          "duration" : `${fmtMSS(songLength.toString().split('.')[0])}`
        });
        b = true;
      }
      else {
        // notifyErr("Something went wrong while uploading the file to the server. Please try again later.");
        b=false;
      }
      // if(res.status === 400) {
      //   notifyErr("File type or size not accepted.");
      //   b=false;
      // }
      completeLoad(b);
    })
    .catch(err => {
      // notifyErr("Something went wrong while uploading the file to the server. Please try again later.");
      completeLoad(b);
    })
  }

  const completeLoad = (bool) => {
    if(bool === true)
      toast.update(toastIDLoading,{ render: "File successfully uploaded.", type: "success", isLoading: false, autoClose: 5000, closeOnClick: true, hideProgressBar: true })
    else
      toast.update(toastIDLoading,{ render: "Something went wrong while uploading the file to the server. Please try again later.", type: "error", isLoading: false, autoClose: 5000, closeOnClick: true, hideProgressBar: true })

    setTimeout(() => {
      window.location.reload();
      // document.getElementById('fileuploader').style = "border: 4px dashed rgba(200,200,200, .6);filter: none;background:unset;"
      // document.getElementById('opts').style = "display: unset;"
      // document.getElementById('inputProps').setAttribute('disabled', 'false');
    }, 3000);  
  }
  const onDrop = useCallback(acceptedFile => {
    if(acceptedFile.length > 0) {
      toastIDLoading = notifyLoading("Uploading file to the server...");
      document.getElementById('fileuploader').style = "border: 4px dashed rgba(200,200,200, .6);filter: none;background:unset;"
      document.getElementById('inputProps').setAttribute('disabled', 'true');
      document.getElementById('cloudSVG').style = "display: none";
      document.getElementById('loaderIco').style = "display: inline-block";
      document.getElementById('opts').style = "display: none;"
      loadToServer(acceptedFile[0]);
    }
    else
      notifyErr("File type or size not accepted.");
  }, [])

  const onDragEnter = useCallback(() => {
    document.getElementById('fileuploader').style = "border: 4px dashed var(--blue);filter: drop-shadow(0 0 10px var(--blue));background:#202020;"
  })

  const onDragLeave = useCallback(() => {
    document.getElementById('fileuploader').style = "border: 4px dashed rgba(200,200,200, .6);filter: none;background:unset;"
  })

  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      '' : ['.mp3', '.wav', '.oga', '.opus']
    },
    // accept: {
    //   'audio/*' : ['.mp3']
    // },
    excludeAcceptAllOption: true,
    maxFiles: 1,
    maxSize: 31457280,
    multiple: false,
    useFsAccessApi: false,
    onDragEnter: onDragEnter,
    onDragLeave: onDragLeave,
    onDrop: onDrop
  })
  

  return (
    <div className={styles.FileUploader} id="fileuploader" {...getRootProps()}>
      <div className={styles.svgIcoContainer} >
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" id="cloudSVG" strokeWidth="1" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
          <polyline points="9 15 12 12 15 15" />
          <line x1="12" y1="12" x2="12" y2="21" />
        </svg>
        <span className={styles.loader} id="loaderIco"></span>
      </div>

      <div id="opts">
        <button>
          Upload a File
        </button>
        <p id={styles.dragndropinfo}>or drag and drop...</p>
        <p id={styles.info}>Supported files: MP3, WAV, OGA, OPUS</p>
        <input id="inputProps" {...getInputProps()} name='audio' />
      </div>
    </div>
  )
}
