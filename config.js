import firebase from 'firebase'
require('@firebase/firestore')


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCWKwv0_K1a5Q4cwqILyKEO1-zLaacjxU0",
    authDomain: "bartersystem-309e2.firebaseapp.com",
    projectId: "bartersystem-309e2",
    storageBucket: "bartersystem-309e2.appspot.com",
    messagingSenderId: "140608075193",
    appId: "1:140608075193:web:30c8d71e21e4dc6410f268"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore()