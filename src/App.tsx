import {Header} from "./components/Header";
import {ChatRoom} from "./pages/ChatRoom";
import {Footer} from "./components/Footer";
import {useEffect, useRef, useState} from "react";
import {NewMessageModal} from "./components/NewMessageModal";

export type ChatMessagesType = {
  id: string;
  message: string;
  time: string;
  author: string;
  likes: string[];
}

export type UserType = {
  id: string;
  name: string;
  email: string;
} | null

const mockUser: UserType = {
  id: "b8723bdqb",
  name: "Victor",
  email: "victor.powilleit@gmail.com"
}

export function App() {
  const [user, setUser] = useState<UserType | null>(null)
  const [chatRoomId, setChatRoomId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessagesType[]>([]);
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState<boolean>(false);

  //Mock User Insertion → Dev Purposes Only
    const effectExecuted = useRef(false)
    useEffect(() => {
      if (!effectExecuted.current) {
        setUser(mockUser);
        effectExecuted.current = true
      }
    }, []);

  function handleNewMessageModalOpen() {
    setIsNewMessageModalOpen(true);
  }

  function handleNewMessageModalClose() {
    setIsNewMessageModalOpen(false);
  }

  function handleNewMessage(message: string) {
    const newMessage: ChatMessagesType = {
      id: `${Math.floor(Math.random() * 1000).toString()}`,
      message: message,
      time: new Date().toLocaleTimeString(),
      author: user!.name,
      likes: [],
    }
    setChatMessages(prevState => [...prevState, newMessage])
    setIsNewMessageModalOpen(false)
  }

  return (
    <div className="App">
      <Header/>
      {isNewMessageModalOpen &&
          <NewMessageModal closeModal={handleNewMessageModalClose} handleNewMessage={handleNewMessage}/>}
      <div className="content">
        <ChatRoom messages={{get: chatMessages, set: setChatMessages}} user={user}
                  openNewMessageModal={handleNewMessageModalOpen}/>
      </div>
      <Footer/>
    </div>
  )
}
