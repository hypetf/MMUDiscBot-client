import React, { useEffect, useState } from 'react'
import styles from '../assets/css/FileList.module.css'
import fileAudioSvg from '../assets/media/fileMusic.svg'
import useSongsStore from '../utils/songsStore'

export default function FileList() {
    const songsList = useSongsStore(state => state.songs);
    const maxAudioNameLength = 30;

    return (
        <div className={styles.FileList}>
            {
                songsList.length > 0 ? <p>Latest uploads</p> : null
            }
            {
                songsList.length < 1 ? null
                : 
                songsList.map((item, key) => {
                        return <div key={key} className={styles.AudioItem}>
                            <img src={fileAudioSvg} />
                            <p className={styles.audioName}>{item.name.length > maxAudioNameLength ? `${item.name.substring(0,maxAudioNameLength)}...` : item.name}</p>&nbsp;&nbsp;<p className={styles.audioLength}> | &nbsp;{item.duration}</p>
                        </div>
                    })
            }
        </div>
    )
}
