import {useState} from "react";
import {CircleUser, Heart} from "lucide-react";
import styles from './styles.module.css'
import {ChatMessagesType} from "../../App.tsx";

interface ChatMessageProps {
  message: ChatMessagesType
}

export function ChatMessage({message}:ChatMessageProps) {
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
      {message.message}
      <div className={styles.messageFooter}>
        <div className={styles.likes} onClick={handleUserLike}>
          <Heart fill={hasBeenLiked ? "#FFF" : "none"}/>
          {message.likes.length}
        </div>
        <div className={styles.author}>{message.author}<CircleUser/></div>
      </div>
    </div>
  )
}