import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAL7xitKquPEdjzfO5MRfnGieyVywEJYeA",
  authDomain: "storekode-11006.firebaseapp.com",
  projectId: "storekode-11006",
  storageBucket: "storekode-11006.firebasestorage.app",
  messagingSenderId: "282337359783",
  appId: "1:282337359783:web:f6e83d06db5cc580252882",
  measurementId: "G-7T9XP2G4PQ",
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
