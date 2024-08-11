import {useState} from "react";
import {CircleUser, Heart} from "lucide-react";
import styles from './styles.module.css'

export function ChatMessage() {
  const [hasBeenLiked, setHasBeenLiked] = useState(false);
  const [likeLimiter, setLikeLimiter] = useState(false);

  function handleUserLike() {
    if (!likeLimiter) {
      setHasBeenLiked(prev => !prev)
      setLikeLimiter(true)
      setTimeout(()=>{
        setLikeLimiter(false)
      },2000)
    }
  }

  return (
    <div className={`${styles.messageContainer} rounded`}>
      minha mensagem
      <div className={styles.messageFooter}>
        <div className={styles.likes} onClick={handleUserLike}>
          <Heart fill={hasBeenLiked ? "#FFF" : "none"}/>
          {5}
        </div>
        <div className={styles.author}>Victor<CircleUser/></div>
      </div>
    </div>
  )
}