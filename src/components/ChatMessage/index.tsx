import {useEffect, useRef, useState} from "react";
import {CircleUser, Heart} from "lucide-react";
import styles from './styles.module.css'
import {ChatMessagesTypeWithKey, UserType} from "../../@types.ts";
import {readLikeData, writeMessageLikes} from "../../server/firebase.ts";

interface ChatMessageProps {
  message: ChatMessagesTypeWithKey
  user: UserType
}

export function ChatMessage({message, user}: ChatMessageProps) {
  const [hasBeenLiked, setHasBeenLiked] = useState(false);
  const [likeLimiter, setLikeLimiter] = useState(false);
  const [likes, setLikes] = useState<string[]>([]);
  const isListenerConfigured = useRef(false)

  function updateLikes(newLikes: string[]) {
    setLikes(newLikes);
  }

  async function toggleLike() {
    let actualLikes = []
    if (likes.includes(user!.email!)) {
      actualLikes = likes.filter(email => email !== user!.email)
    } else {
      actualLikes = [...likes, user!.email!]
    }
    await writeMessageLikes(message.key, actualLikes)
  }

  async function handleUserLike() {
    if (!likeLimiter) {
      await toggleLike()
      setTimeout(() => {
        setLikeLimiter(false)
      }, 2000)
    }
  }

  useEffect(() => {
    if (!isListenerConfigured.current) {
      readLikeData(message.key, updateLikes).then()
      isListenerConfigured.current = true
    }
  }, []);

  useEffect(() => {
    setHasBeenLiked(likes.includes(user!.email!))
  }, [likes]);


  return (
    <div className={`${styles.messageContainer} rounded`}>
      {message.message}
      <div className={styles.messageFooter}>
        <div className={styles.likes} onClick={handleUserLike}>
          <Heart fill={hasBeenLiked ? "#FFF" : "none"}/>
          {likes.length}
        </div>
        <div className={styles.author}>{message.author}<CircleUser/></div>
      </div>
    </div>
  )
}