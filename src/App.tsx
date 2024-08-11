import {Header} from "./components/Header";
import {ChatRoom} from "./pages/ChatRoom";
import {Footer} from "./components/Footer";
import {useEffect, useState} from "react";

export type ChatMessagesType = {
  id: number;
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

const mockUser:UserType = {
  id: "b8723bdqb",
  name: "Victor",
  email: "victor.powilleit@gmail.com"
}

const mockComment:ChatMessagesType = {
  id: 1,
  message: "Hello World!",
  time: "09:00",
  author: mockUser.name,
  likes: [],
}

export function App() {
  const [user, setUser] = useState<UserType|null>(null)
  const [chatRoomId, setChatRoomId] = useState<string|null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessagesType[]>([]);

  useEffect(() => {
    setUser(mockUser);
    setChatRoomId("123456789");
    setChatMessages(prevState => [...prevState, mockComment])
  }, []);

  console.log(chatRoomId);

  return (
    <div className="App">
      <Header/>
      <div className="content">
        <ChatRoom messages={{get:chatMessages, set:setChatMessages}} user={user}/>
      </div>
      <Footer/>
    </div>
  )
}
