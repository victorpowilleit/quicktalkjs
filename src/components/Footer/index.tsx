import styles from './styles.module.css'
import {ArrowUpRight, Github} from "lucide-react";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <a href="">
        <Github/>
        <span>victorpowilleit</span>/quicktalkjs
        <ArrowUpRight/>
      </a>
    </footer>
  )
}