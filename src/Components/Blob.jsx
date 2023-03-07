import React from 'react'
import styles from '../assets/css/Blob.module.css'

export default function Blob({height, width, color, speed, opacity, id}) {
  return (
    <div className={styles.Blob} id={id ? `${id}` : ""}>
        <svg viewBox="0 0 100 100" height={height} width={width} xmlns="http://www.w3.org/2000/svg">
            <path stroke="none" strokeWidth="0" fill={color} opacity={opacity ? opacity : 1}>
                <animate attributeName='d'
                    dur={speed ? speed : "10s"}
                    repeatCount="indefinite"
                    values="
                        M79.5,68.5Q62,87,39,80.5Q16,74,13.5,48Q11,22,37.5,14Q64,6,80.5,28Q97,50,79.5,68.5Z;
                        M80.5,67.5Q61,85,41,78Q21,71,21.5,50Q22,29,42.5,20Q63,11,81.5,30.5Q100,50,80.5,67.5Z;
                        M76,68.5Q62,87,43.5,77.5Q25,68,20,46Q15,24,37.5,21Q60,18,75,34Q90,50,76,68.5Z;
                        M79.5,68.5Q62,87,39,80.5Q16,74,13.5,48Q11,22,37.5,14Q64,6,80.5,28Q97,50,79.5,68.5Z;
                    "
                ></animate>
            </path>
        </svg>
    </div>
  )
}

