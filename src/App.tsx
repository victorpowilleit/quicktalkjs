import {useEffect, useRef, useState} from "react";
import {logOut, readChatData, signInWithGoogle, writeChatData} from "./server/firebase.ts";

import {Header} from "./components/Header";
import {ChatRoom} from "./pages/ChatRoom";
import {Footer} from "./components/Footer";
import {NewMessageModal} from "./components/NewMessageModal";

import {KeyRound, LogIn} from "lucide-react";

import {ChatMessagesType, ChatMessagesTypeWithKey, UserType} from "./@types.ts";

export function App() {
  const [user, setUser] = useState<UserType | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessagesTypeWithKey[]>([]);
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState<boolean>(false);

  const isListenerConfigured = useRef(false)
  function setIsListenerConfigured(){
    isListenerConfigured.current = true;
  }

  function handleNewMessageModalOpen() {
    setIsNewMessageModalOpen(true);
  }

  function handleNewMessageModalClose() {
    setIsNewMessageModalOpen(false);
  }

  async function handleNewMessage(message: string) {
    const newMessage: ChatMessagesType = {
      message: message,
      author: user!.email!,
      likes: [],
      time: new Date().toLocaleTimeString(),
    }
    const messageKey = await writeChatData(
      newMessage.message,
      newMessage.author,
      newMessage.likes,
      newMessage.time,
    )
    if (messageKey) {
      setIsNewMessageModalOpen(false)
    }
  }

  function insertMessage(data: ChatMessagesTypeWithKey){
    setChatMessages(prevState => [...prevState, data])
  }

  async function handleLogIn() {
    const login: UserType = await signInWithGoogle()
    setUser(login)
  }

  async function handleLogOut() {
    await logOut()
    setUser(null)
  }

  useEffect(() => {
    if(!isListenerConfigured.current) {
      readChatData(isListenerConfigured.current, setIsListenerConfigured, insertMessage).then()
    }
  }, []);

  return (
    <div className="App">
      <Header logout={handleLogOut} user={!!user?.token}/>
      {isNewMessageModalOpen &&
          <NewMessageModal closeModal={handleNewMessageModalClose} handleNewMessage={handleNewMessage}/>}
      <div className="content">
        {
          user?.token ?
            <ChatRoom messages={{get: chatMessages}} user={user}
                      openNewMessageModal={handleNewMessageModalOpen}/>
            :
            <button className="loginButton shadow" onClick={handleLogIn}>
              <KeyRound/>
              <span>
                ENTRE COM A SUA<br/>CONTA GOOGLE
              </span>
              <LogIn/>
            </button>
        }
      </div>
      <Footer/>
    </div>
  )
}
