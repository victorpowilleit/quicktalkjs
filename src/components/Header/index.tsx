import logo from "../../assets/QuickTalkJS_Logo.svg"
import styles from './styles.module.css'

export function Header() {
  return (
    <>
      <header className={styles.header}>
        <img src={logo} alt=""/>
      </header>
    </>
  )
}

