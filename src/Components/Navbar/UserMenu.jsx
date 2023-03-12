import React from 'react'
import styles from '../../assets/css/UserMenu.module.css'
import useUserStore from '../../utils/userStore'
import NavItem from './NavItem';
import logoutSvg from '../../assets/media/logout.svg'
import revokeSvg from '../../assets/media/revoke.svg'
import '../../assets/css/UserMenu.module.css';

export default function UserMenu() {
    const user = useUserStore(state => state.user);
    const _maxLength = 12;

    return (
        <div className={styles.UserMenu}>
            <div id={styles.avatarBg} style={{'backgroundImage': `url('${user.avatar}')`}} tabIndex="0"></div>

            <div className={styles.Dropdown}>
                <div id={styles.userInfo}>
                    <h4>{user.username.length > _maxLength ? `${user.username.substring(0,_maxLength)}...` : user.username}#{user.discriminator}</h4>
                </div>
                <div id={styles.divider}></div>
                <NavItem icon={revokeSvg} label={"Revoke Access Token"} href={"/"} />
                <NavItem icon={logoutSvg} label={"Log out"} href={"/logout"} />
            </div>
            
        </div>
    )
}