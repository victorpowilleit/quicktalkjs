import styles from './styles.module.css'
import {ArrowUpRight, Github} from "lucide-react";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <a href="https://github.com/victorpowilleit/quicktalkjs" target="_blank">
        <Github/>
        <span>victorpowilleit</span>/quicktalkjs
        <ArrowUpRight/>
      </a>
    </footer>
  )
}