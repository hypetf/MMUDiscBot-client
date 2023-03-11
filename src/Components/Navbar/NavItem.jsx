import React from 'react'
import { useNavigate  } from 'react-router-dom'
import styles from '../../assets/css/NavItem.module.css'

export default function NavItem({ icon, label, href}) {
    const navigate = useNavigate();

    return (
        <div className={styles.NavItem} onClick={() => navigate(href)}>
            <img src={icon} />
            <p>{label}</p>
        </div>
  )
}
