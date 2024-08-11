import {Header} from "./components/Header";
import {ChatRoom} from "./pages/ChatRoom";
import {Footer} from "./components/Footer";
import {useState} from "react";
import {NewMessageModal} from "./components/NewMessageModal";
import {logOut, signInWithGoogle} from "./server/firebase.ts";
import {KeyRound, LogIn} from "lucide-react";

export type ChatMessagesType = {
  id: string;
  message: string;
  time: string;
  author: string | null;
  likes: string[];
}

export type UserType = {
  token: string | undefined;
  email: string | null;
} | null

export function App() {
  const [user, setUser] = useState<UserType | null>(null)
  const [chatRoomId, setChatRoomId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessagesType[]>([]);
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState<boolean>(false);

  // //Mock User Insertion → Dev Purposes Only
  //   const effectExecuted = useRef(false)
  //   useEffect(() => {
  //     if (!effectExecuted.current) {
  //       setUser(mockUser);
  //       effectExecuted.current = true
  //     }
  //   }, []);

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
      author: user!.email,
      likes: [],
    }
    setChatMessages(prevState => [...prevState, newMessage])
    setIsNewMessageModalOpen(false)
  }

  async function handleLogIn() {
    const login: UserType = await signInWithGoogle()
    setUser(login)
  }

  async function handleLogOut() {
    await logOut()
    setUser(null)
  }

  return (
    <div className="App">
      <Header logout={handleLogOut} user={!!user?.token} />
      {isNewMessageModalOpen &&
          <NewMessageModal closeModal={handleNewMessageModalClose} handleNewMessage={handleNewMessage}/>}
      <div className="content">
        {
          user?.token ?
            <ChatRoom messages={{get: chatMessages, set: setChatMessages}} user={user}
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
