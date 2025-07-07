importScripts(
  "https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCrekfmOv2xCfqw9Rp54YmfqwsSXFWvU4w",
  authDomain: "book-mern-7a84c.firebaseapp.com",
  projectId: "book-mern-7a84c",
  storageBucket: "book-mern-7a84c.appspot.com",
  messagingSenderId: "373614106464",
  appId: "1:373614106464:web:5bd5fbca6ddf3efe4fb005",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Background Message Received: ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo.png", // optional
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
