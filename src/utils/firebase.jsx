import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCrekfmOv2xCfqw9Rp54YmfqwsSXFWvU4w",
  authDomain: "book-mern-7a84c.firebaseapp.com",
  projectId: "book-mern-7a84c",
  storageBucket: "book-mern-7a84c.appspot.com",
  messagingSenderId: "373614106464",
  appId: "1:373614106464:web:5bd5fbca6ddf3efe4fb005",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };
