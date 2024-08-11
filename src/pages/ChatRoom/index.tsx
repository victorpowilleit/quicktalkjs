import {ChatMessagesType, UserType} from "../../App.tsx";
import {ChatStarter} from "../../components/ChatStarter";
import {ChatMessage} from "../../components/ChatMessage";
import styles from './styles.module.css'

interface ChatRoomProps {
  messages: {
    get: ChatMessagesType[],
    set: (messages: ChatMessagesType[]) => void,
  },
  user: UserType,
  openNewMessageModal: ()=>void
}

export function ChatRoom({messages, openNewMessageModal}: ChatRoomProps) {
  return (
    <>
      {messages.get.length > 0 ?
        <div className={styles.chat}>
          {messages.get.map(message => <ChatMessage key={message.id} message={message}/>)}
          <button className="shadow" onClick={openNewMessageModal}>Escrever Mensagem</button>
        </div>
        : <ChatStarter openNewMessageModal={openNewMessageModal}/>}
    </>
  )
}