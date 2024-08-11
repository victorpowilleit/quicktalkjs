import {ChatMessagesType, UserType} from "../../App.tsx";
import {ChatStarter} from "../../components/ChatStarter";
import {ChatMessage} from "../../components/ChatMessage";

interface ChatRoomProps {
  messages: {
    get: ChatMessagesType[],
    set: (messages: ChatMessagesType[]) => void,
  },
  user: UserType
}

export function ChatRoom({messages, user}: ChatRoomProps) {
  return (
    <>
      {messages.get.length > 0 ? <ChatMessage/> : <ChatStarter/>}
    </>
  )
}