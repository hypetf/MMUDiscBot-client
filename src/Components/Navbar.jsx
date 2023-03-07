import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../assets/css/Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.Navbar}>
        <ul>
            <Link to={"/"}>
              <li className={styles.link}>About</li>
            </Link>
            
            <Link to={"/upload"}>
              <li id={styles.DiscordLoginBtn}>Login with Discord</li>
            </Link>
        </ul>
    </nav>
  )
}
