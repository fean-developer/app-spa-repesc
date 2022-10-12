importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyARPtF-ZXQGodx2hOrbRTbDoW7SbcEmQV4",
  authDomain: "notification-push-repescs.firebaseapp.com",
  projectId: "notification-push-repescs",
  storageBucket: "notification-push-repescs.appspot.com",
  messagingSenderId: "39927953051",
  appId: "1:39927953051:web:7964e61604662ab988383e",
  measurementId: "G-6TQ5P2N192",
});
//const messeging = getMessaging(firebaseApp);

const messaging = firebase.messaging();
