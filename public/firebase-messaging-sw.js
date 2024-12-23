importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAL7xitKquPEdjzfO5MRfnGieyVywEJYeA",
  authDomain: "storekode-11006.firebaseapp.com",
  projectId: "storekode-11006",
  storageBucket: "storekode-11006.firebasestorage.app",
  messagingSenderId: "282337359783",
  appId: "1:282337359783:web:f6e83d06db5cc580252882",
  measurementId: "G-7T9XP2G4PQ",
};


firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});