export type dbData = {
  chats: dbDataChats
}

export type dbDataChats = {
  [key: string]: {
    message: string;
    author: string;
    likes: string[];
    time: string;
  }
}

export type ChatMessagesType = {
  message: string;
  time: string;
  author: string;
  likes: string[];
}

export interface ChatMessagesTypeWithKey extends ChatMessagesType {
  key: string;
}

export type UserType = {
  token: string | undefined;
  email: string | null;
} | null