importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-messaging.js');
// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

// Initialize Firebase
firebase.initializeApp( {
    apiKey: 'AIzaSyAv0CEqybFtZdhriMQO5LDVRUa-jff2hE4',
    authDomain: 'ordinal-mote-281302.firebaseapp.com',
    databaseURL: 'https://ordinal-mote-281302.firebaseio.com',
    projectId: 'ordinal-mote-281302',
    storageBucket: 'ordinal-mote-281302.appspot.com',
    messagingSenderId: '783178077367',
    appId: '1:783178077367:web:fd110e13313fa5694be932',
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});

self.addEventListener("notificationclick", function(event) {
    console.log(event);
});