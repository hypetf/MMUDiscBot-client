import React, {useState} from 'react'
import styles from '../assets/css/UserMenu.module.css'
import useUserStore from '../utils/userStore'

export default function UserMenu() {
    const user = useUserStore(state => state.user);

    return (
        <div className={styles.UserMenu}>
            <div id={styles.avatarBg} style={{'backgroundImage': `url('${user.avatar}')`}}></div>

        </div>
    )
}
