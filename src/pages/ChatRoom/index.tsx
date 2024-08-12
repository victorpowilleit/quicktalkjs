import {ChatMessagesTypeWithKey, UserType} from "../../@types.ts";
import {ChatStarter} from "../../components/ChatStarter";
import {ChatMessage} from "../../components/ChatMessage";
import styles from './styles.module.css'

interface ChatRoomProps {
  messages: {
    get: ChatMessagesTypeWithKey[],
  },
  user: UserType,
  openNewMessageModal: ()=>void
}

export function ChatRoom({messages, openNewMessageModal, user}: ChatRoomProps) {
  return (
    <>
      {messages.get.length > 0 ?
        <div className={styles.chat}>
          {messages.get.map(message => <ChatMessage key={message.key} message={message} user={user}/>)}
          <button className="shadow" onClick={openNewMessageModal}>Escrever Mensagem</button>
        </div>
        : <ChatStarter openNewMessageModal={openNewMessageModal}/>}
    </>
  )
}