import React, {useEffect, useState, useRef} from 'react'
import styles from '../../assets/css/UserMenu.module.css'
import useUserStore from '../../utils/userStore'
import NavItem from './NavItem';
import logoutSvg from '../../assets/media/logout.svg'
import revokeSvg from '../../assets/media/revoke.svg'
import { motion, AnimatePresence } from 'framer-motion';
import '../../assets/css/UserMenu.module.css';

const variants = {
    true: { opacity: 1, x: 0},
    false: { opacity: 0, x: "100%"},
  }

export default function UserMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const user = useUserStore(state => state.user);
    const _maxLength = 12;
    
    function toggleDropdown() {
        setIsOpen(!isOpen);
    }

    return (
        <div className={styles.UserMenu}>
            <div id={styles.avatarBg} style={{'backgroundImage': `url('${user.avatar}')`}} onClick={toggleDropdown}></div>
            <motion.div
                initial={{opacity: 0}}
                animate={`${isOpen}`}
                variants={variants}
                whileFocus={() => setIsMenuOpen(true)}
            >
            {
            isOpen ?
                <div className={styles.Dropdown} id="dr">
                    <div id={styles.userInfo}>
                        <h4>{user.username.length > _maxLength ? `${user.username.substring(0,_maxLength)}...` : user.username}#{user.discriminator}</h4>
                    </div>
                    <div id={styles.divider}></div>
                    <NavItem icon={revokeSvg} label={"Revoke Access Token"} href={"/"} />
                    <NavItem icon={logoutSvg} label={"Log out"} href={"/logout"} />
                </div>
            :
               null
            }
            </motion.div>
            
        </div>
    )
}