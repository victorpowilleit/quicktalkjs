import { LogOut } from "lucide-react"
import logo from "../../assets/QuickTalkJS_Logo.svg"
import styles from './styles.module.css'

interface HeaderProps {
  logout: ()=>void
  user: boolean
}

export function Header({logout, user}: HeaderProps) {
  return (
    <>
      <header className={styles.header}>
        <img src={logo} alt=""/>
        {user&&<div onClick={() => logout()} className={styles.logoutButton}>Logout <LogOut/></div>}
      </header>
    </>
  )
}

