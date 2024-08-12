import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getDatabase, ref, set, push, onChildAdded, onValue, update} from "firebase/database";
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";
import {ChatMessagesTypeWithKey} from "../@types.ts";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const database = getDatabase(app);


// LogIn & LogOut
export async function signInWithGoogle() {
  return await signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential!.accessToken;
      const user = result.user;
      return {token, email: user.email}
    })
    .catch((error) => {
      console.log(error.code)
      return null
    })
}

export async function logOut() {
  signOut(auth).then(() => {
  }).catch((error) => {
    console.log(error)
  });
}

// DATABASE

export async function writeChatData(message: string, author: string, likes: string[], time: string) {
  const db = getDatabase();
  const newMessageRef = await push(ref(db, 'chat/'));
  await set(newMessageRef, {
    key:newMessageRef.key,
    message,
    author,
    likes,
    time,
  })
  return newMessageRef.key
}

export async function writeMessageLikes(key: string, likes: string[]) {
  const db = getDatabase();
  const messageRef = ref(db, 'chat/' + key);
  await update(messageRef, {
    likes: likes,
  });
}

export async function readChatData(
  isListenerConfigured: boolean = false, setListenerConfig: () => void, setChatList: (data: ChatMessagesTypeWithKey) => void
){
  if (!isListenerConfigured) {
    const db = getDatabase();
    const chatRef = ref(db, 'chat/');
    onChildAdded(chatRef, (snapshot) => {
      const data = snapshot.val();
      setChatList({
        ...data
      })
    });
    setListenerConfig()
  }
}

export async function readLikeData(key: string, updateLikes: (likes: string[])=>void) {
  const db = getDatabase();
  const likesRef = ref(db, 'chat/' + key + '/likes');

  onValue(likesRef, (snapshot) => {
    const likes = snapshot.exists() ? snapshot.val() : [];
    updateLikes(likes)
  });
}

