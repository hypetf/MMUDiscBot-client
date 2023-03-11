import { Link } from 'react-router-dom'
import styles from '../../assets/css/Navbar.module.css'
import useUserStore from '../../utils/userStore'
import UserMenu from './UserMenu';

export default function Navbar() {
  const user = useUserStore(state => state.user);
  return (
    <nav className={styles.Navbar}>
      <div id={styles.ul}>
        <Link to={"/"} className={styles.link}>
          About
        </Link>
        {
          user.username ?
            <Link to={"/upload"} className={styles.link}>
              Upload file
            </Link>
          :
            null
        }

        {
          user.username ? 
            <UserMenu />
          :
            <Link to={"http://localhost:5000/api/auth/login"} id={styles.DiscordLoginBtn}>
              Login with Discord
            </Link>
        }
      </div>
    </nav>
  )
}
